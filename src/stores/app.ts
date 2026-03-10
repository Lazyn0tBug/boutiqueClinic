import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import i18n from '@/plugins/i18n'
import type { Locale } from '@/types/locale'
import { AVAILABLE_LOCALES } from '@/types/locale'
import { unifiedStorage, StorageKeys } from '@/utils/unifiedStorage'

export const useAppStore = defineStore('app', () => {
  // 状态
  const locale = ref<Locale>('zh-TW')
  const isInitialized = ref(false)

  // Getters
  const availableLocales = computed(() => AVAILABLE_LOCALES)
  const currentLocale = computed(() => {
    return AVAILABLE_LOCALES.find((l) => l.code === locale.value)
  })

  // Actions
  const setLocale = async (newLocale: Locale) => {
    locale.value = newLocale

    // 使用统一存储保存语言设置
    await unifiedStorage.set(StorageKeys.APP_LANGUAGE, newLocale)

    // 更新 i18n - 使用全局實例
    i18n.global.locale.value = newLocale

    // 更新 HTML lang 属性
    document.documentElement.lang = newLocale
  }

  // 初始化应用设置
  const initialize = async () => {
    if (isInitialized.value) return

    try {
      // 从统一存储读取语言设置
      const savedLocale = await unifiedStorage.get<Locale>(StorageKeys.APP_LANGUAGE)
      if (savedLocale && AVAILABLE_LOCALES.some((l) => l.code === savedLocale)) {
        locale.value = savedLocale
        i18n.global.locale.value = savedLocale
      }

      // 设置 HTML lang
      document.documentElement.lang = locale.value

      isInitialized.value = true
    } catch (error) {
      console.error('[AppStore] Failed to initialize:', error)
      // 使用默认值
      document.documentElement.lang = locale.value
    }
  }

  // 同步初始化 HTML lang（用于 SSR 或初始渲染）
  document.documentElement.lang = locale.value

  return {
    locale,
    isInitialized,
    availableLocales,
    currentLocale,
    setLocale,
    initialize,
  }
})