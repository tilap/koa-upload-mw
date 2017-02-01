'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (count) {
  var errorMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return function (_ref) {
    var request = _ref.request;

    if (request.body && request.body.files && Object.keys(request.body.files).length === count) {
      return true;
    }
    throw new Error(errorMessage || 'File count must be ' + count);
  };
};
//# sourceMappingURL=is.js.map