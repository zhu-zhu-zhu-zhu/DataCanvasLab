import { describe, it, expect } from 'vitest'
import { formatNumber, formatPercent } from '@/utils/format'

describe('format utils', () => {
  it('formats number with thousand separators', () => {
    expect(formatNumber(128456)).toBe('128,456')
  })

  it('formats percent with one decimal', () => {
    expect(formatPercent(8.64)).toBe('8.6%')
  })
})
