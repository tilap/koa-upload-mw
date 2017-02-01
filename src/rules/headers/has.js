import assert from 'assert';

export default function (headerId, errorMessage, callback = null) {
  assert(headerId, 'no headerId provided in configuration');
  assert(headerId.constructor === String, 'headerId must be a string');
  assert(!callback || callback.constructor === Function, 'Callback must be a function');

  return async ({ request }) => {
    if (
      request &&
      request.header &&
      request.header[headerId]
    ) {
      return callback ? callback(request.header[headerId]) : true;
    }

    throw new Error(errorMessage || `Header ${headerId} required`);
  };
}
