import { createSSRApp } from 'vue'
import 'virtual:uno.css'
import uviewPlus from 'uview-plus'
import router from '@/router'
import App from '@/App.vue'
import setupStore from '@/store'
import setupRequest from '@/utils/request'

export function createApp() {
  const app = createSSRApp(App)
  app.use(router) // 路由管理
  app.use(uviewPlus) // 全局引入组件库
  setupStore(app)
  setupRequest()
  return { app }
}
