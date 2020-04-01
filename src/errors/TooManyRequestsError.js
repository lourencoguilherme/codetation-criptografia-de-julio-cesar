// TooManyRequestsError.js
const ApplicationError = require('./ApplicationError'); 
class TooManyRequestsError extends ApplicationError {
  constructor(status, name, error, message) {
    super(status || 429, name || 'Too many requests', error || 'invalid',  message || 'Too many requests');
  }
}
module.exports = TooManyRequestsError;