import { describe, it, expect } from 'vitest'
import { logger, memoryTransport } from '@/core/logger'

describe('Logger', () => {
  it('stores logs in memory transport', () => {
    const before = memoryTransport.getEntries().length
    logger.info('Test info message', { module: 'test' })
    logger.warn('Test warn message')
    const entries = memoryTransport.getEntries()
    expect(entries.length).toBeGreaterThan(before)
    expect(entries[0].level).toBe('warn')
    expect(entries[0].message).toBe('Test warn message')
  })

  it('creates log entries with id and timestamp', () => {
    logger.debug('Debug entry', { key: 'value' })
    const entry = memoryTransport.getEntries()[0]
    expect(entry.id).toBeTruthy()
    expect(entry.timestamp).toBeGreaterThan(0)
    expect(entry.context).toEqual({ key: 'value' })
  })
})
