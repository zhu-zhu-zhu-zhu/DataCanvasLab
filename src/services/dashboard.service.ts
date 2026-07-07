import { dashboardAdapter } from '@/api'
import { logger } from '@/core/logger'

export const dashboardService = {
  fetchOverview() {
    return dashboardAdapter.getKpiOverview()
  },
  fetchTrafficTrend() {
    return dashboardAdapter.getTrafficTrend()
  },
  fetchCategoryDistribution() {
    return dashboardAdapter.getCategoryDistribution()
  },
  fetchRanking() {
    return dashboardAdapter.getRanking()
  },
  fetchAlerts() {
    return dashboardAdapter.getAlerts()
  },
  async refreshAll() {
    logger.info('Dashboard data refresh started')
    const start = performance.now()
    const [kpi, trend, category, ranking, alerts] = await Promise.all([
      this.fetchOverview(),
      this.fetchTrafficTrend(),
      this.fetchCategoryDistribution(),
      this.fetchRanking(),
      this.fetchAlerts(),
    ])
    const duration = Math.round(performance.now() - start)
    logger.info('Dashboard data refresh completed', { duration })
    if (duration > 800) {
      logger.warn('Data refresh slow', { duration })
    }
    return { kpi, trend, category, ranking, alerts }
  },
}
