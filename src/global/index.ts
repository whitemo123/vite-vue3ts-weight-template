import type { App } from "vue";
import "normalize.css"
import '@/assets/main.css'
import { createPinia } from 'pinia'
import router from '@/router'

export default (app: App) => {
  // 注册pinia
  app.use(createPinia())
  // 注册router
  app.use(router)
}
