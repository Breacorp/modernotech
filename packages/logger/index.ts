export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export interface LogContext {
  requestId?: string;
  userId?: string;
  app?: string;
  [key: string]: unknown;
}

export class Logger {
  private appName: string;

  constructor(appName: string) {
    this.appName = appName;
  }

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const reqTrace = context?.requestId ? ` [Req: ${context.requestId}]` : '';
    const userTrace = context?.userId ? ` [User: ${context.userId}]` : '';
    const ctxString = context ? ` | Context: ${JSON.stringify(this.sanitize(context))}` : '';
    
    return `[${timestamp}] [${level.toUpperCase()}] [${this.appName}]${reqTrace}${userTrace}: ${message}${ctxString}`;
  }

  private sanitize(obj: Record<string, unknown>): Record<string, unknown> {
    const sanitized = { ...obj };
    const sensitiveKeys = ['password', 'secret', 'token', 'key', 'apiKey'];
    
    for (const key of Object.keys(sanitized)) {
      if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk))) {
        sanitized[key] = '[REDACTED]';
      }
    }
    return sanitized;
  }

  info(message: string, context?: LogContext) {
    console.log(`\x1b[32m${this.formatMessage('info', message, context)}\x1b[0m`);
  }

  warn(message: string, context?: LogContext) {
    console.warn(`\x1b[33m${this.formatMessage('warn', message, context)}\x1b[0m`);
  }

  error(message: string, context?: LogContext) {
    console.error(`\x1b[31m${this.formatMessage('error', message, context)}\x1b[0m`);
  }

  debug(message: string, context?: LogContext) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`\x1b[36m${this.formatMessage('debug', message, context)}\x1b[0m`);
    }
  }
}

export const log = new Logger('Ecosistema Moderno');
