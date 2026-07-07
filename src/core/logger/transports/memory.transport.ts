import type { LogEntry, LogTransport } from '../types'

type Listener = (entries: LogEntry[]) => void

export class MemoryTransport implements LogTransport {
  private entries: LogEntry[] = []
  private readonly maxSize: number
  private listeners = new Set<Listener>()

  constructor(maxSize = 100) {
    this.maxSize = maxSize
  }

  log(entry: LogEntry): void {
    this.entries = [entry, ...this.entries].slice(0, this.maxSize)
    this.listeners.forEach((listener) => listener(this.getEntries()))
  }

  getEntries(): LogEntry[] {
    return [...this.entries]
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener)
    listener(this.getEntries())
    return () => this.listeners.delete(listener)
  }
}

export const memoryTransport = new MemoryTransport(100)
