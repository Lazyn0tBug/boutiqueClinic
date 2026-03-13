import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HomeView from '../views/HomeView.vue'
import { unifiedStorage, StorageKeys } from '@/utils/unifiedStorage'
import type { Locale } from '@/types/locale'
import { LOCALE_MAP, LOCALE_REVERSE_MAP } from '@/types/locale'
import { useAppStore } from '@/stores/app'

const VALID_LOCALES = ['cn', 'tw', 'en', 'ja'] as const satisfies readonly Locale[]
const DEFAULT_LOCALE: Locale = 'cn'

// 类型守卫：检查是否为有效的语言
const isValidLocale = (locale: string): locale is Locale => VALID_LOCALES.includes(locale as Locale)

// 获取完整的语言代码（用于 i18n）
const getFullLocaleCode = (locale: Locale): string => LOCALE_MAP[locale]

// 内存缓存，用于同步读取语言设置
let cachedLocale: Locale = DEFAULT_LOCALE

// 初始化缓存（在应用启动时调用）
export const initializeRouterCache = async (): Promise<void> => {
  try {
    const savedLocale = await unifiedStorage.get<Locale>(StorageKeys.APP_LANGUAGE)
    if (savedLocale != null && isValidLocale(savedLocale)) {
      cachedLocale = savedLocale
    }
  } catch (error: unknown) {
    console.error('[Router] Failed to initialize router cache:', error)
  }
}

// 获取当前缓存的语言
export const getCachedLocale = (): Locale => cachedLocale

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 重定向根路径到默认语言
    {
      path: '/',
      redirect: () => `/${cachedLocale}`,
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
router.beforeEach(async (to: RouteLocationNormalized) => {
  const { locale } = to.params

  // 如果是带语言前缀的路由,验证语言参数
  if (typeof locale === 'string') {
    if (!isValidLocale(locale)) {
      // 无效语言,重定向到默认语言的等效路径
      const pathWithoutLocale = to.path.replace(`/${locale}`, '')
      return `/${cachedLocale}${pathWithoutLocale || '/'}`
    }

    // 有效语言，更新本地缓存标识
    cachedLocale = locale

    // 核心修改：确保在 URL 改变时（无论是手动修改还是代码 push），同步更新 Pinia store 的状态
    // setLocale 会自动帮你保存 Storage 并切换 i18n
    const appStore = useAppStore()
    if (appStore.locale !== locale) {
      await appStore.setLocale(locale)
    }
  }

  // 返回 true 表示允许导航
  return true
})

export default router
