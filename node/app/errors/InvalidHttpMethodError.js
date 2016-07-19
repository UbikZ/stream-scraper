'use strict';

/**
 * Error class
 */
class InvalidHttpMethodError extends Error {
  constructor(message) {
    super(message);
    this.message = `Invalid HTTP method : ${message}`;
  }
}

module.exports = InvalidHttpMethodError;
