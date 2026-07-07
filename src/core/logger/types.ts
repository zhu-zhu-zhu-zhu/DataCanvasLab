export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface LogEntry {
  id: string
  level: LogLevel
  message: string
  timestamp: number
  context?: Record<string, unknown>
}

export interface LogTransport {
  log(entry: LogEntry): void
}

export const LOG_LEVEL_WEIGHT: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}
