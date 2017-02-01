'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (conditions, data) {
  if (!conditions || conditions.constructor === Array && conditions.length === 0) {
    return Promise.resolve();
  }

  var conditionsArr = conditions.constructor === Array ? conditions : [conditions];
  var conditionsPromisified = conditionsArr.map(function (func) {
    return new Promise(function (resolve, reject) {
      try {
        Promise.all([func(data)]).then(function (res) {
          return res[0] === false ? reject(false) : resolve(true);
        }).catch(function (error) {
          return reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  });

  return Promise.all(conditionsPromisified).then(function (results) {
    if (results.includes(false)) {
      throw new _Condition2.default('At least one condition failed silently');
    }
    return true;
  }).catch(function (error) {
    throw new _Condition2.default(error.message);
  });
};

var _Condition = require('../errors/Condition');

var _Condition2 = _interopRequireDefault(_Condition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=assertConditions.js.map