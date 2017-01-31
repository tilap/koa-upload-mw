import assert from 'assert';

export default function (fieldId, callback = null) {
  assert(fieldId, 'no fieldId provided in configuration for auth middleware');
  assert(fieldId.constructor === String, 'fieldId must be a string');
  assert(!callback || callback.constructor === Function, 'Callback must be a function');

  return async ({ fields, file, request }) => {
    if (
      !request ||
      !request.method === 'POST' ||
      !request.body ||
      !request.body.fields ||
      !request.body.fields[fieldId]) {
      throw new Error('you must provide a valid token');
    }

    return callback ?
      callback({ fields, file, request, token: request.body.fields[fieldId] }) :
      true;
  };
}
