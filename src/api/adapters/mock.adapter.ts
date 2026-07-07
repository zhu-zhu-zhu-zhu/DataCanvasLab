import type { DashboardAdapter } from './types'
import {
  alertsData,
  categoryDistributionData,
  kpiOverviewData,
  rankingData,
  trafficTrendData,
} from '@/mock/data/dashboard.data'
import { delay, randomDelta } from '@/utils/format'
import { logger } from '@/core/logger'

export class MockDashboardAdapter implements DashboardAdapter {
  private async simulate<T>(label: string, data: T): Promise<T> {
    const start = performance.now()
    await delay(200 + Math.random() * 200)
    logger.debug(`Mock API: ${label}`, { duration: Math.round(performance.now() - start) })
    return structuredClone(data)
  }

  async getKpiOverview() {
    const data = structuredClone(kpiOverviewData)
    data.items = data.items.map((item) => ({
      ...item,
      value: item.unit === '%' ? randomDelta(item.value, 0.02) : randomDelta(item.value, 0.04),
    }))
    data.updatedAt = new Date().toISOString()
    return this.simulate('getKpiOverview', data)
  }

  async getTrafficTrend() {
    const data = trafficTrendData.map((point) => ({
      ...point,
      value: randomDelta(point.value, 0.08),
    }))
    return this.simulate('getTrafficTrend', data)
  }

  async getCategoryDistribution() {
    return this.simulate('getCategoryDistribution', categoryDistributionData)
  }

  async getRanking() {
    return this.simulate('getRanking', rankingData)
  }

  async getAlerts() {
    return this.simulate('getAlerts', alertsData)
  }
}
