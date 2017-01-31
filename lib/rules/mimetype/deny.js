'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (deniedMimes, errorMessage) {
  var mimes = deniedMimes.constructor === Array ? deniedMimes : [deniedMimes];
  return function (_ref) {
    var file = _ref.file;

    if (!mimes.includes(file.mime)) {
      return true;
    }
    throw new Error(errorMessage || 'File type not allow');
  };
};
//# sourceMappingURL=deny.js.map