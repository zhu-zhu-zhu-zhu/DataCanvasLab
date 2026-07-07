export interface KpiItem {
  key: string
  label: string
  value: number
  unit: string
  trend: number
}

export interface KpiOverview {
  items: KpiItem[]
  updatedAt: string
}

export interface TrendPoint {
  hour: string
  value: number
}

export interface CategoryItem {
  name: string
  value: number
}

export interface RankItem {
  rank: number
  name: string
  value: number
  unit: string
}

export type AlertLevel = 'info' | 'warn' | 'error'

export interface AlertItem {
  id: string
  level: AlertLevel
  time: string
  message: string
}

export interface DashboardAdapter {
  getKpiOverview(): Promise<KpiOverview>
  getTrafficTrend(): Promise<TrendPoint[]>
  getCategoryDistribution(): Promise<CategoryItem[]>
  getRanking(): Promise<RankItem[]>
  getAlerts(): Promise<AlertItem[]>
}
