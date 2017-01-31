import ValidationError from '../errors/Validation';

// Process an ordered list of function (forced as promise) and throw a ValidationError on the first
// one failing or returning false
export default async function (validators, data) {
  for (const validator of validators) { // eslint-disable-line no-restricted-syntax
    try {
      const res = await validator(data); // eslint-disable-line no-await-in-loop
      if (res === false) {
        throw new Error('failed');
      }
    } catch (error) {
      throw new ValidationError(error.message);
    }
  }
}
