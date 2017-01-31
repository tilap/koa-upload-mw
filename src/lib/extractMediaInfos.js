import assert from 'assert';
import ExifImage from 'exif';
import fileType from 'file-type';
import fs from 'fs';
import readchunk from 'read-chunk';
import sizeOf from 'image-size';

const IMAGES_MIMES = ['image/gif', 'image/jpeg', 'image/tiff', 'image/webp', 'image/png'];

export default async function extractMediaInfos(filepath) {
  const output = {};

  assert(fs.existsSync(filepath), `Cannot extract file infos: file not found in ${filepath}`);

  output.path = filepath;

  // File size
  const { size } = fs.statSync(filepath);
  output.size = size;

  // Mimetype
  const headBuffer = readchunk.sync(filepath, 0, 4100);
  const { mime = '', ext = '' } = (fileType(headBuffer) || {});
  output.mime = mime;
  output.extension = ext;

  // Specific mimetype infos
  if (IMAGES_MIMES.includes(mime)) {
    const { height, width } = sizeOf(filepath);
    output.height = height;
    output.width = width;

    output.exifs = await new Promise(resolve =>
      new ExifImage({ image: filepath }, (err, data) => resolve(err ? {} : data)),
    );
  } else {
    throw new Error('cannot manage non image media... yet');
  }

  return output;
}
