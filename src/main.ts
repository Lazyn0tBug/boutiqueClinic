import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router, { initializeRouterCache } from './router'
import i18n from './plugins/i18n'
import { useAppStore } from './stores/app'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(i18n)
app.use(router)

// 初始化应用存储和路由缓存
const appStore = useAppStore()
Promise.try(() => 
  Promise.all([appStore.initialize(), initializeRouterCache()])
).catch((error) => {
  console.error('[Main] Failed to initialize:', error)
})

app.mount('#app')
