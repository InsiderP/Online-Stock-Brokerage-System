class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends ApiError {
  constructor(message) {
    super(message, 400);
    this.name = 'ValidationError';
  }
}

class AuthenticationError extends ApiError {
  constructor(message) {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

class AuthorizationError extends ApiError {
  constructor(message) {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

class NotFoundError extends ApiError {
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

class ConflictError extends ApiError {
  constructor(message) {
    super(message, 409);
    this.name = 'ConflictError';
  }
}

module.exports = {
  ApiError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError
}; 