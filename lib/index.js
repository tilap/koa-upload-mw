'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (middlewaresConfig) {
  var _this = this;

  var logger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : console;

  var config = middlewaresConfig.constructor === Array ? middlewaresConfig : [middlewaresConfig];

  return function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
      var mediaPromises, fields, request;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!ctx.request || !ctx.request.method || ctx.request.method !== 'POST')) {
                _context.next = 3;
                break;
              }

              logger.trace('Skip request, not a post request');
              return _context.abrupt('return', next());

            case 3:
              if (ctx.request.body) {
                _context.next = 7;
                break;
              }

              logger.trace('Skip request, no body found in a post request');
              logger.trace('Is bodyparser setup?');
              return _context.abrupt('return', next());

            case 7:
              if (!(!ctx.request.body.files || Object.keys(ctx.request.body.files).length === 0)) {
                _context.next = 10;
                break;
              }

              logger.info('Return error, no file received');
              throw new Error('No file submitted');

            case 10:
              mediaPromises = [];
              fields = ctx.request.body.fields || {};
              request = ctx.request;

              Object.keys(ctx.request.body.files).forEach(function (mediaKey) {
                var tmpFilepath = ctx.request.body.files[mediaKey].path;
                mediaPromises.push((0, _extractMediaInfos2.default)(tmpFilepath).then(function (file) {
                  var formFileData = { file: file, fields: fields, request: request };
                  return Promise.all(config.map(function (cfg, index) {
                    var _cfg$name = cfg.name,
                        name = _cfg$name === undefined ? 'uploader-' + (index + 1) : _cfg$name,
                        storage = cfg.storage,
                        _cfg$conditions = cfg.conditions,
                        conditions = _cfg$conditions === undefined ? [] : _cfg$conditions,
                        _cfg$validators = cfg.validators,
                        validators = _cfg$validators === undefined ? [] : _cfg$validators;

                    return (0, _assertConditions2.default)(conditions, formFileData).then(function () {
                      logger.trace('Conditions passed', { mediaKey: mediaKey, uploader: name });
                      return (0, _assertValidators2.default)(validators, formFileData);
                    }).then(function () {
                      logger.trace('Validation passed', { mediaKey: mediaKey, uploader: name });
                      return storage(file);
                    }).then(function (storedFileData) {
                      logger.trace('Storage passed', { mediaKey: mediaKey, uploader: name });
                      return { name: name, data: storedFileData };
                    }).catch(function (error) {
                      return { name: name, error: { type: error.name, message: error.message } };
                    });
                  })).then(function (res) {
                    return { key: mediaKey, results: res };
                  });
                }));
              });

              // eslint-disable-next-line no-return-assign,no-param-reassign
              _context.next = 16;
              return Promise.all(mediaPromises).then(function (mediaResults) {
                var json = { result: 'success', success: {} };
                mediaResults.map(function (_ref2) {
                  var key = _ref2.key,
                      results = _ref2.results;
                  return {
                    key: key,
                    results: results.filter(function (res) {
                      return !res.error || res.error && res.error.type !== 'ConditionError';
                    })
                  };
                }).filter(function (_ref3) {
                  var results = _ref3.results;
                  return results.length > 0;
                }).forEach(function (mediaResult) {
                  json.success[mediaResult.key] = mediaResult.results;
                });
                logger.info('Successfull json return', json);
                return json;
              }).catch(function (error) {
                logger.error('Huge error', error);
                return { result: 'error', error: error }; // eslint-disable-line no-param-reassign
              });

            case 16:
              return _context.abrupt('return', ctx.body = _context.sent);

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
};

var _extractMediaInfos = require('./lib/extractMediaInfos');

var _extractMediaInfos2 = _interopRequireDefault(_extractMediaInfos);

var _assertConditions = require('./lib/assertConditions');

var _assertConditions2 = _interopRequireDefault(_assertConditions);

var _assertValidators = require('./lib/assertValidators');

var _assertValidators2 = _interopRequireDefault(_assertValidators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
//# sourceMappingURL=index.js.map