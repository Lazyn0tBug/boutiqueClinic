import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 重定向根路径到默认语言
    {
      path: '/',
      redirect: () => {
        const locale = localStorage.getItem('locale') || 'zh-CN'
        return `/${locale}`
      },
    },

    // 前台路由 (带语言前缀)
    {
      path: '/:locale',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/AboutView.vue'),
        },
        // 后续阶段添加更多路由
        // { path: 'services', name: 'services', component: () => import('../views/ServicesView.vue') },
        // { path: 'pharmacy', name: 'pharmacy', component: () => import('../views/PharmacyView.vue') },
        // { path: 'partners', name: 'partners', component: () => import('../views/PartnersView.vue') },
        // { path: 'cases', name: 'cases', component: () => import('../views/CasesView.vue') },
      ],
    },

    // 后台路由 (不带语言前缀) - 阶段 7 实现
    // {
    //   path: '/admin',
    //   redirect: '/admin/dashboard',
    //   meta: { requiresAuth: true },
    // },
    // {
    //   path: '/admin/login',
    //   name: 'admin-login',
    //   component: () => import('../views/admin/LoginView.vue'),
    // },
  ],
})

// 路由守卫 - 验证语言参数
router.beforeEach((to) => {
  const locale = to.params.locale as string
  const validLocales = ['zh-CN', 'zh-TW', 'en', 'ja']

  // 如果是带语言前缀的路由,验证语言参数
  if (locale && !validLocales.includes(locale)) {
    // 无效语言,重定向到默认语言
    const defaultLocale = localStorage.getItem('locale') || 'zh-CN'
    return `/${defaultLocale}${to.path.replace(`/${locale}`, '')}`
  }

  // 如果是有效语言,更新 localStorage
  if (locale && validLocales.includes(locale)) {
    localStorage.setItem('locale', locale)
  }

  // 返回 true 表示允许导航
  return true
})

export default router
