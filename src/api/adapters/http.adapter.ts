import type { DashboardAdapter } from './types'
import { apiClient } from '../client'

export class HttpDashboardAdapter implements DashboardAdapter {
  async getKpiOverview() {
    const { data } = await apiClient.get('/dashboard/kpi')
    return data
  }

  async getTrafficTrend() {
    const { data } = await apiClient.get('/dashboard/traffic-trend')
    return data
  }

  async getCategoryDistribution() {
    const { data } = await apiClient.get('/dashboard/category')
    return data
  }

  async getRanking() {
    const { data } = await apiClient.get('/dashboard/ranking')
    return data
  }

  async getAlerts() {
    const { data } = await apiClient.get('/dashboard/alerts')
    return data
  }
}
