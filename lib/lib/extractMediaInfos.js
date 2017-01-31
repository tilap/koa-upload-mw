'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _exif = require('exif');

var _exif2 = _interopRequireDefault(_exif);

var _fileType = require('file-type');

var _fileType2 = _interopRequireDefault(_fileType);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _readChunk = require('read-chunk');

var _readChunk2 = _interopRequireDefault(_readChunk);

var _imageSize = require('image-size');

var _imageSize2 = _interopRequireDefault(_imageSize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var IMAGES_MIMES = ['image/gif', 'image/jpeg', 'image/tiff', 'image/webp', 'image/png'];

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(filepath) {
    var output, _fs$statSync, size, headBuffer, _ref2, _ref2$mime, mime, _ref2$ext, ext, _sizeOf, height, width;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            output = {};


            (0, _assert2.default)(_fs2.default.existsSync(filepath), 'Cannot extract file infos: file not found in ' + filepath);

            output.path = filepath;

            // File size
            _fs$statSync = _fs2.default.statSync(filepath), size = _fs$statSync.size;

            output.size = size;

            // Mimetype
            headBuffer = _readChunk2.default.sync(filepath, 0, 4100);
            _ref2 = (0, _fileType2.default)(headBuffer) || {}, _ref2$mime = _ref2.mime, mime = _ref2$mime === undefined ? '' : _ref2$mime, _ref2$ext = _ref2.ext, ext = _ref2$ext === undefined ? '' : _ref2$ext;

            output.mime = mime;
            output.extension = ext;

            // Specific mimetype infos

            if (!IMAGES_MIMES.includes(mime)) {
              _context.next = 18;
              break;
            }

            _sizeOf = (0, _imageSize2.default)(filepath), height = _sizeOf.height, width = _sizeOf.width;

            output.height = height;
            output.width = width;

            _context.next = 15;
            return new Promise(function (resolve) {
              return new _exif2.default({ image: filepath }, function (err, data) {
                return resolve(err ? {} : data);
              });
            });

          case 15:
            output.exifs = _context.sent;
            _context.next = 19;
            break;

          case 18:
            throw new Error('cannot manage non image media... yet');

          case 19:
            return _context.abrupt('return', output);

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function extractMediaInfos(_x) {
    return _ref.apply(this, arguments);
  }

  return extractMediaInfos;
}();
//# sourceMappingURL=extractMediaInfos.js.map