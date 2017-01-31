'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConditionError = function (_Error) {
  _inherits(ConditionError, _Error);

  function ConditionError() {
    var _ref;

    _classCallCheck(this, ConditionError);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = ConditionError.__proto__ || Object.getPrototypeOf(ConditionError)).call.apply(_ref, [this].concat(args)));

    Object.defineProperty(_this, 'name', { value: 'ConditionError' });
    Error.captureStackTrace(_this, _this.constructor);
    return _this;
  }

  return ConditionError;
}(Error);

exports.default = ConditionError;
//# sourceMappingURL=Condition.js.map