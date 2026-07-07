import { describe, it, expect } from 'vitest'
import { MockDashboardAdapter } from '@/api/adapters/mock.adapter'

describe('MockDashboardAdapter', () => {
  const adapter = new MockDashboardAdapter()

  it('returns KPI overview with 4 items', async () => {
    const data = await adapter.getKpiOverview()
    expect(data.items).toHaveLength(4)
    expect(data.items[0].label).toBeTruthy()
    expect(data.updatedAt).toBeTruthy()
  })

  it('returns 24 traffic trend points', async () => {
    const data = await adapter.getTrafficTrend()
    expect(data).toHaveLength(24)
    expect(data[0].hour).toMatch(/^\d{2}:\d{2}$/)
  })

  it('returns ranking with 5 items', async () => {
    const data = await adapter.getRanking()
    expect(data).toHaveLength(5)
    expect(data[0].rank).toBe(1)
  })

  it('returns alerts with levels', async () => {
    const data = await adapter.getAlerts()
    expect(data.length).toBeGreaterThanOrEqual(5)
    expect(['info', 'warn', 'error']).toContain(data[0].level)
  })
})
