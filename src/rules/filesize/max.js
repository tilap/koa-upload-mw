import prettyBytes from 'pretty-bytes';

export default function (maxSize, errorMessage = '') {
  return ({ file }) => {
    if (file.size < Number(maxSize)) {
      return true;
    }
    throw new Error(errorMessage || `File is too big, limited to ${prettyBytes(maxSize)}`);
  };
}
