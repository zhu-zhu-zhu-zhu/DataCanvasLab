import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@/styles/global.scss'
import { logger } from '@/core/logger'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')

logger.info('DataCanvasLab application started')
