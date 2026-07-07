import { env } from '@/core/config/env'
import { logger } from '@/core/logger'
import { HttpDashboardAdapter } from './adapters/http.adapter'
import { MockDashboardAdapter } from './adapters/mock.adapter'
import type { DashboardAdapter } from './adapters/types'

export function createDashboardAdapter(): DashboardAdapter {
  const adapter = env.useMock ? new MockDashboardAdapter() : new HttpDashboardAdapter()
  logger.info('Dashboard adapter initialized', { mode: env.useMock ? 'mock' : 'http' })
  return adapter
}

export const dashboardAdapter = createDashboardAdapter()
