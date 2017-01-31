import assert from 'assert';
import fs from 'fs';
import fsExtra from 'fs-extra';

import uuid from 'uuid/v4';

function generateUuidFilename(extension) {
  return `${uuid()}.${extension}`;
}

function generateNotExistingFilenameInDir(dir, extension) {
  let file = generateUuidFilename(extension);
  while (fs.existsSync(`${dir}/${file}`)) {
    file = generateUuidFilename(extension);
  }
  return file;
}

export default function ({ rootUrl, path: originalPath, logger = console }) {
  assert(rootUrl, 'No rootUrl provided');
  assert(originalPath, 'No path provided in options');

  const url = rootUrl.replace(/^(.*[^/])(\/*)$/, '$1');
  const distPath = originalPath.replace(/^(.*[^/])(\/*)$/, '$1');

  return (file) => {
    const filename = generateNotExistingFilenameInDir(distPath, file.extension);
    const distFile = `${distPath}/${filename}`;

    try {
      fsExtra.copySync(file.path, distFile);
    } catch (error) {
      logger.error('Error while moving file', { error });
      throw new Error('Error while moving file');
    }

    // Remove path
    const { path, ...otherProps } = file; // eslint-disable-line no-unused-vars
    return {
      url: `${url}/${filename}`,
      ...otherProps,
    };
  };
}
