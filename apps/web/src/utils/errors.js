/**
 * Error handling utilities for the web application
 */
export class AppError extends Error {
  constructor(message, code, statusCode, details) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
export class AuthenticationError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, 'AUTH_ERROR', 401);
    this.name = 'AuthenticationError';
  }
}
export class AuthorizationError extends AppError {
  constructor(message = 'You do not have permission to perform this action') {
    super(message, 'AUTHORIZATION_ERROR', 403);
    this.name = 'AuthorizationError';
  }
}
export class ValidationError extends AppError {
  constructor(message, details) {
    super(message, 'VALIDATION_ERROR', 400, details);
    this.name = 'ValidationError';
  }
}
export class NotFoundError extends AppError {
  constructor(resource) {
    super(`${resource} not found`, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}
export class NetworkError extends AppError {
  constructor(message = 'Network request failed') {
    super(message, 'NETWORK_ERROR', 0);
    this.name = 'NetworkError';
  }
}
export class RateLimitError extends AppError {
  constructor(message = 'Too many requests. Please try again later.') {
    super(message, 'RATE_LIMIT_ERROR', 429);
    this.name = 'RateLimitError';
  }
}
/**
 * Handle and format errors for user display
 */
export function formatErrorMessage(error) {
  if (error instanceof AppError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred';
}
/**
 * Check if error is a specific type
 */
export function isAuthError(error) {
  return error instanceof AuthenticationError;
}
export function isValidationError(error) {
  return error instanceof ValidationError;
}
export function isNetworkError(error) {
  return error instanceof NetworkError;
}
/**
 * Log error to console in development, send to monitoring service in production
 */
export function logError(error, context) {
  if (import.meta.env.DEV) {
    console.error('Error:', error);
    if (context) {
      console.error('Context:', context);
    }
  } else {
    // In production, send to error monitoring service (e.g., Sentry)
    // This would integrate with your monitoring service
    console.error('Production error:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      context,
      timestamp: new Date().toISOString(),
    });
  }
}
/**
 * Error boundary handler
 */
export function handleErrorBoundary(error, errorInfo) {
  logError(error, {
    componentStack: errorInfo.componentStack,
    errorBoundary: true,
  });
}
//# sourceMappingURL=errors.js.map
