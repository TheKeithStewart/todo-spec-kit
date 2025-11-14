/**
 * Error handling utilities for the web application
 */
export declare class AppError extends Error {
  code?: string | undefined;
  statusCode?: number | undefined;
  details?: unknown | undefined;
  constructor(
    message: string,
    code?: string | undefined,
    statusCode?: number | undefined,
    details?: unknown | undefined
  );
}
export declare class AuthenticationError extends AppError {
  constructor(message?: string);
}
export declare class AuthorizationError extends AppError {
  constructor(message?: string);
}
export declare class ValidationError extends AppError {
  constructor(message: string, details?: unknown);
}
export declare class NotFoundError extends AppError {
  constructor(resource: string);
}
export declare class NetworkError extends AppError {
  constructor(message?: string);
}
export declare class RateLimitError extends AppError {
  constructor(message?: string);
}
/**
 * Handle and format errors for user display
 */
export declare function formatErrorMessage(error: unknown): string;
/**
 * Check if error is a specific type
 */
export declare function isAuthError(error: unknown): error is AuthenticationError;
export declare function isValidationError(error: unknown): error is ValidationError;
export declare function isNetworkError(error: unknown): error is NetworkError;
/**
 * Log error to console in development, send to monitoring service in production
 */
export declare function logError(error: unknown, context?: Record<string, unknown>): void;
/**
 * Error boundary handler
 */
export declare function handleErrorBoundary(error: Error, errorInfo: React.ErrorInfo): void;
//# sourceMappingURL=errors.d.ts.map
