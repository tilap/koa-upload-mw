export default function (count, errorMessage = '') {
  return ({ request }) => {
    if (request.body && request.body.files && Object.keys(request.body.files).length === count) {
      return true;
    }
    throw new Error(errorMessage || `File count must be ${count}`);
  };
}
