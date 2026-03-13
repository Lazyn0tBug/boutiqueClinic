/* eslint-disable-next-line import/no-unassigned-import */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router, { initializeRouterCache } from './router'
import i18n from './plugins/i18n'
import { useAppStore } from './stores/app'


const bootstrap = async () => {
  const app = createApp(App)
  const pinia = createPinia()

  app.use(pinia)
  app.use(i18n)

  // 必须先初始化 store 和 router 缓存
  const appStore = useAppStore()
  try {
    await Promise.all([appStore.initialize(), initializeRouterCache()])
  } catch (error) {
    console.error('[Main] Failed to initialize:', error)
  }

  app.use(router)

  // 核心修改：等待路由初始导航解析完成 (这会触发 beforeEach 守卫同步初始 URL 中的语言)
  await router.isReady()

  app.mount('#app')
}

void bootstrap()