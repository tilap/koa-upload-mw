'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchPath) {
  var errorMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return function (_ref) {
    var request = _ref.request;

    if (request.url === matchPath) {
      return true;
    }
    throw new Error(errorMessage || 'Path not allowed');
  };
};
//# sourceMappingURL=is.js.map