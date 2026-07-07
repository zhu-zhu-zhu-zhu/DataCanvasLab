import type { LogEntry, LogTransport } from '../types'

export class ConsoleTransport implements LogTransport {
  log(entry: LogEntry): void {
    const time = new Date(entry.timestamp).toLocaleTimeString('zh-CN')
    const prefix = `[${time}] [${entry.level.toUpperCase()}]`
    const payload = entry.context ? [prefix, entry.message, entry.context] : [prefix, entry.message]
    switch (entry.level) {
      case 'debug':
        console.debug(...payload)
        break
      case 'info':
        console.info(...payload)
        break
      case 'warn':
        console.warn(...payload)
        break
      case 'error':
        console.error(...payload)
        break
    }
  }
}
