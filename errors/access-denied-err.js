const { ACCESS_DENIED_ERROR_CODE } = require('../utils/constants');

class AccessDeniedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ACCESS_DENIED_ERROR_CODE;
  }
}

module.exports = AccessDeniedError;
