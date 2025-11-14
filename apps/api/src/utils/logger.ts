/**
 * Logging utility for API functions
 * In production, this would integrate with a logging service (e.g., Datadog, CloudWatch)
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV !== 'production';

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.debug(this.formatMessage('debug', message, context));
    }
  }

  info(message: string, context?: LogContext): void {
    console.info(this.formatMessage('info', message, context));
  }

  warn(message: string, context?: LogContext): void {
    console.warn(this.formatMessage('warn', message, context));
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorContext = {
      ...context,
      error:
        error instanceof Error
          ? {
              message: error.message,
              stack: error.stack,
              name: error.name,
            }
          : error,
    };
    console.error(this.formatMessage('error', message, errorContext));
  }

  /**
   * Log API request
   */
  logRequest(method: string, path: string, context?: LogContext): void {
    this.info(`${method} ${path}`, context);
  }

  /**
   * Log API response
   */
  logResponse(method: string, path: string, statusCode: number, duration: number): void {
    this.info(`${method} ${path} - ${statusCode}`, { duration: `${duration}ms` });
  }

  /**
   * Log webhook event
   */
  logWebhook(provider: string, event: string, context?: LogContext): void {
    this.info(`Webhook received: ${provider} - ${event}`, context);
  }

  /**
   * Log integration sync
   */
  logSync(integration: string, action: string, context?: LogContext): void {
    this.info(`Sync: ${integration} - ${action}`, context);
  }
}

// Export singleton instance
export const logger = new Logger();

/**
 * Middleware-style wrapper for timing API calls
 */
export function withLogging<T>(operation: string, fn: () => Promise<T>): Promise<T> {
  const startTime = Date.now();
  logger.info(`Starting: ${operation}`);

  return fn()
    .then((result) => {
      const duration = Date.now() - startTime;
      logger.info(`Completed: ${operation}`, { duration: `${duration}ms` });
      return result;
    })
    .catch((error) => {
      const duration = Date.now() - startTime;
      logger.error(`Failed: ${operation}`, error, { duration: `${duration}ms` });
      throw error;
    });
}
