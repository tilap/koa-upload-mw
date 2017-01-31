export default function (deniedMimes, errorMessage) {
  const mimes = deniedMimes.constructor === Array ? deniedMimes : [deniedMimes];
  return ({ file }) => {
    if (!mimes.includes(file.mime)) {
      return true;
    }
    throw new Error(errorMessage || 'File type not allow');
  };
}
