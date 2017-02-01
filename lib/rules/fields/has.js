'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (fieldId, errorMessage) {
  var _this = this;

  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  (0, _assert2.default)(fieldId, 'no fieldId provided in configuration for auth middleware');
  (0, _assert2.default)(fieldId.constructor === String, 'fieldId must be a string');
  (0, _assert2.default)(!callback || callback.constructor === Function, 'Callback must be a function');

  return function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2) {
      var request = _ref2.request;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!request || !request.method === 'POST' || !request.body || !request.body.fields || !request.body.fields[fieldId])) {
                _context.next = 2;
                break;
              }

              throw new Error(errorMessage || 'missing field ' + fieldId);

            case 2:
              return _context.abrupt('return', callback ? callback(request.body.fields[fieldId]) : true);

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
//# sourceMappingURL=has.js.map