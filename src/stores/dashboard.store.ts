import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AlertItem, CategoryItem, KpiOverview, RankItem, TrendPoint } from '@/api/adapters/types'
import { dashboardService } from '@/services/dashboard.service'
import { logger } from '@/core/logger'

export const useDashboardStore = defineStore('dashboard', () => {
  const loading = ref(false)
  const kpi = ref<KpiOverview | null>(null)
  const trend = ref<TrendPoint[]>([])
  const category = ref<CategoryItem[]>([])
  const ranking = ref<RankItem[]>([])
  const alerts = ref<AlertItem[]>([])

  async function loadAll() {
    loading.value = true
    try {
      const data = await dashboardService.refreshAll()
      kpi.value = data.kpi
      trend.value = data.trend
      category.value = data.category
      ranking.value = data.ranking
      alerts.value = data.alerts
    } catch (error) {
      logger.error('Failed to load dashboard', {
        error: error instanceof Error ? error.message : String(error),
      })
    } finally {
      loading.value = false
    }
  }

  return { loading, kpi, trend, category, ranking, alerts, loadAll }
})
