import ConditionError from '../errors/Condition';

// Process a list of function (forced as promise) and throw a ConditionError if one failed or
// return false
export default function (conditions, data) {
  if (!conditions || (conditions.constructor === Array && conditions.length === 0)) {
    return Promise.resolve();
  }

  const conditionsArr = conditions.constructor === Array ? conditions : [conditions];
  const conditionsPromisified = conditionsArr.map(func => new Promise((resolve, reject) => {
    try {
      Promise.all([func(data)])
        .then(res => (res[0] === false ? reject(false) : resolve(true)))
        .catch(error => reject(error));
    } catch (error) {
      reject(error);
    }
  }));

  return Promise.all(conditionsPromisified)
    .then((results) => {
      if (results.includes(false)) {
        throw new ConditionError('At least one condition failed silently');
      }
      return true;
    })
    .catch((error) => {
      throw new ConditionError(error.message);
    });
}
