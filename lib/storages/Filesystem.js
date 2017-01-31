'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (_ref) {
  var rootUrl = _ref.rootUrl,
      originalPath = _ref.path,
      _ref$logger = _ref.logger,
      logger = _ref$logger === undefined ? console : _ref$logger;

  (0, _assert2.default)(rootUrl, 'No rootUrl provided');
  (0, _assert2.default)(originalPath, 'No path provided in options');

  var url = rootUrl.replace(/^(.*[^/])(\/*)$/, '$1');
  var distPath = originalPath.replace(/^(.*[^/])(\/*)$/, '$1');

  return function (file) {
    var filename = generateNotExistingFilenameInDir(distPath, file.extension);
    var distFile = distPath + '/' + filename;

    try {
      _fsExtra2.default.copySync(file.path, distFile);
    } catch (error) {
      logger.error('Error while moving file', { error: error });
      throw new Error('Error while moving file');
    }

    // Remove path

    var path = file.path,
        otherProps = _objectWithoutProperties(file, ['path']); // eslint-disable-line no-unused-vars


    return _extends({
      url: url + '/' + filename
    }, otherProps);
  };
};

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function generateUuidFilename(extension) {
  return (0, _v2.default)() + '.' + extension;
}

function generateNotExistingFilenameInDir(dir, extension) {
  var file = generateUuidFilename(extension);
  while (_fs2.default.existsSync(dir + '/' + file)) {
    file = generateUuidFilename(extension);
  }
  return file;
}
//# sourceMappingURL=Filesystem.js.map