'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (minSize) {
  var errorMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return function (_ref) {
    var file = _ref.file;

    if (file.size > Number(minSize)) {
      return true;
    }
    throw new Error(errorMessage || 'File is too small, minimum is ' + (0, _prettyBytes2.default)(minSize));
  };
};

var _prettyBytes = require('pretty-bytes');

var _prettyBytes2 = _interopRequireDefault(_prettyBytes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=min.js.map