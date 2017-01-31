import prettyBytes from 'pretty-bytes';

export default function (minSize, errorMessage = '') {
  return ({ file }) => {
    if (file.size > Number(minSize)) {
      return true;
    }
    throw new Error(errorMessage || `File is too small, minimum is ${prettyBytes(minSize)}`);
  };
}
