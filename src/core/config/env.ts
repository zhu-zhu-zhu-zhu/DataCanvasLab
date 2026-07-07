export const env = {
  useMock: import.meta.env.VITE_USE_MOCK === 'true',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
}
