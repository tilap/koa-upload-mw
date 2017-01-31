export default function (acceptedMimes, errorMessage) {
  const mimes = acceptedMimes.constructor === Array ? acceptedMimes : [acceptedMimes];
  return ({ file }) => {
    if (mimes.includes(file.mime)) {
      return true;
    }
    throw new Error(errorMessage || 'File type not allow');
  };
}
