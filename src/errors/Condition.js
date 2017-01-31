export default class ConditionError extends Error {
  constructor(...args) {
    super(...args);
    Object.defineProperty(this, 'name', { value: 'ConditionError' });
    Error.captureStackTrace(this, this.constructor);
  }
}
