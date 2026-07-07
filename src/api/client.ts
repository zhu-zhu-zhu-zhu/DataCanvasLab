import axios from 'axios'
import { env } from '@/core/config/env'
import { logger } from '@/core/logger'

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 10000,
})

apiClient.interceptors.request.use((config) => {
  const traceId = crypto.randomUUID().slice(0, 8)
  config.headers['X-Trace-Id'] = traceId
  logger.info('API Request', {
    method: config.method?.toUpperCase(),
    url: config.url,
    traceId,
  })
  return config
})

apiClient.interceptors.response.use(
  (response) => {
    logger.info('API Response', {
      url: response.config.url,
      status: response.status,
      traceId: response.config.headers['X-Trace-Id'],
    })
    return response
  },
  (error) => {
    logger.error('API Error', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
    })
    return Promise.reject(error)
  },
)
