import assert from 'assert';

export default function (fieldId, errorMessage, callback = null) {
  assert(fieldId, 'no fieldId provided in configuration for auth middleware');
  assert(fieldId.constructor === String, 'fieldId must be a string');
  assert(!callback || callback.constructor === Function, 'Callback must be a function');

  return async ({ request }) => {
    if (
      !request ||
      !request.method === 'POST' ||
      !request.body ||
      !request.body.fields ||
      !request.body.fields[fieldId]) {
      throw new Error(errorMessage || `missing field ${fieldId}`);
    }

    return callback ?
      callback(request.body.fields[fieldId]) :
      true;
  };
}
