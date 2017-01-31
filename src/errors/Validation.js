export default class ValidationError extends Error {
  constructor(...args) {
    super(...args);
    Object.defineProperty(this, 'name', { value: 'ValidationError' });
    Error.captureStackTrace(this, this.constructor);
  }
}
