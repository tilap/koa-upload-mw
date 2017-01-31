'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Validation = require('../errors/Validation');

var _Validation2 = _interopRequireDefault(_Validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Process an ordered list of function (forced as promise) and throw a ValidationError on the first
// one failing or returning false
exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(validators, data) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, validator, res;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 3;
            _iterator = validators[Symbol.iterator]();

          case 5:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 21;
              break;
            }

            validator = _step.value;
            _context.prev = 7;
            _context.next = 10;
            return validator(data);

          case 10:
            res = _context.sent;

            if (!(res === false)) {
              _context.next = 13;
              break;
            }

            throw new Error('failed');

          case 13:
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](7);
            throw new _Validation2.default(_context.t0.message);

          case 18:
            _iteratorNormalCompletion = true;
            _context.next = 5;
            break;

          case 21:
            _context.next = 27;
            break;

          case 23:
            _context.prev = 23;
            _context.t1 = _context['catch'](3);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 27:
            _context.prev = 27;
            _context.prev = 28;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 30:
            _context.prev = 30;

            if (!_didIteratorError) {
              _context.next = 33;
              break;
            }

            throw _iteratorError;

          case 33:
            return _context.finish(30);

          case 34:
            return _context.finish(27);

          case 35:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 23, 27, 35], [7, 15], [28,, 30, 34]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=assertValidators.js.map