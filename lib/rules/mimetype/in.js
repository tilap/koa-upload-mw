'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (acceptedMimes, errorMessage) {
  var mimes = acceptedMimes.constructor === Array ? acceptedMimes : [acceptedMimes];
  return function (_ref) {
    var file = _ref.file;

    if (mimes.includes(file.mime)) {
      return true;
    }
    throw new Error(errorMessage || 'File type not allow');
  };
};
//# sourceMappingURL=in.js.map