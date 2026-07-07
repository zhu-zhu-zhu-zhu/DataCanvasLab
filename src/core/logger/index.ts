import { ConsoleTransport } from './transports/console.transport'
import { memoryTransport } from './transports/memory.transport'
import { LOG_LEVEL_WEIGHT, type LogEntry, type LogLevel, type LogTransport } from './types'

class Logger {
  private transports: LogTransport[] = [new ConsoleTransport(), memoryTransport]
  private minLevel: LogLevel = import.meta.env.PROD ? 'warn' : 'debug'

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVEL_WEIGHT[level] >= LOG_LEVEL_WEIGHT[this.minLevel]
  }

  private write(level: LogLevel, message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog(level)) return
    const entry: LogEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      level,
      message,
      timestamp: Date.now(),
      context,
    }
    this.transports.forEach((transport) => transport.log(entry))
  }

  debug(message: string, context?: Record<string, unknown>): void {
    this.write('debug', message, context)
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.write('info', message, context)
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.write('warn', message, context)
  }

  error(message: string, context?: Record<string, unknown>): void {
    this.write('error', message, context)
  }
}

export const logger = new Logger()
export { memoryTransport } from './transports/memory.transport'
