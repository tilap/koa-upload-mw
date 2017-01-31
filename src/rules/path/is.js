export default function (matchPath, errorMessage = '') {
  return ({ request }) => {
    if (request.url === matchPath) {
      return true;
    }
    throw new Error(errorMessage || 'Path not allowed');
  };
}

