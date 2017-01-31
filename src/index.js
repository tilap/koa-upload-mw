import extractMediaInfos from './lib/extractMediaInfos';
import assertConditions from './lib/assertConditions';
import assertValidators from './lib/assertValidators';

export default function (middlewaresConfig, logger = console) {
  const config = middlewaresConfig.constructor === Array ? middlewaresConfig : [middlewaresConfig];

  return async (ctx, next) => {
    if (!ctx.request || !ctx.request.method || ctx.request.method !== 'POST') {
      logger.trace('Skip request, not a post request');
      return next();
    }

    if (!ctx.request.body) {
      logger.trace('Skip request, no body found in a post request');
      logger.trace('Is bodyparser setup?');
      return next();
    }

    if (!ctx.request.body.files || Object.keys(ctx.request.body.files).length === 0) {
      logger.info('Return error, no file received');
      throw new Error('No file submitted');
    }

    const mediaPromises = [];
    const fields = ctx.request.body.fields || {};
    const request = ctx.request;
    Object.keys(ctx.request.body.files).forEach((mediaKey) => {
      const tmpFilepath = ctx.request.body.files[mediaKey].path;
      mediaPromises.push(
        extractMediaInfos(tmpFilepath).then((file) => {
          const formFileData = { file, fields, request };
          return Promise.all(config.map((cfg, index) => {
            const { name = `uploader-${index + 1}`, storage, conditions = [], validators = [] } = cfg;
            return assertConditions(conditions, formFileData)
              .then(() => logger.trace('Conditions passed', { mediaKey, uploader: name }))
              .then(() => assertValidators(validators, formFileData))
              .then(() => logger.trace('Validation passed', { mediaKey, uploader: name }))
              .then(() => storage(file))
              .then(() => logger.trace('Storage passed', { mediaKey, uploader: name }))
              .then(storedFileData => ({ name, data: storedFileData }))
              .catch(error => ({ name, error: { type: error.name, message: error.message } }));
          })).then(res => ({ key: mediaKey, results: res }));
        }),
      );
    });

    Promise.all(mediaPromises).then((mediaResults) => {
      const json = { result: 'success', success: {} };
      mediaResults
        .map(({ key, results }) => ({
          key,
          results: results.filter(res => (!res.error || (res.error && res.error.type !== 'ConditionError'))),
        }))
        .filter(({ results }) => results.length > 0)
        .forEach((mediaResult) => {
          json.success[mediaResult.key] = mediaResult.results;
        });
      logger.info('Successfull json return', json);
      ctx.body = json; // eslint-disable-line no-param-reassign
    }).catch((error) => {
      logger.error('Huge error', error);
      ctx.body = { result: 'error', error }; // eslint-disable-line no-param-reassign
    });

    return true;
  };
}
