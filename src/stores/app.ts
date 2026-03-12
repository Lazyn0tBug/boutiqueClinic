import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import i18n from '@/plugins/i18n'
import type { Locale, LocaleOption } from '@/types/locale'
import { AVAILABLE_LOCALES, LOCALE_MAP, LOCALE_REVERSE_MAP } from '@/types/locale'
import { unifiedStorage, StorageKeys } from '@/utils/unifiedStorage'

// 类型守卫：检查是否为有效的语言代码
const isValidLocaleCode = (code: string): code is Locale =>
  AVAILABLE_LOCALES.some((l) => l.code === code)

export const useAppStore = defineStore('app', () => {
  // 状态 - 使用简化代码 (cn, tw, en, ja)
  const locale = ref<Locale>('cn')
  const isInitialized = ref(false)

  // Getters
  const availableLocales = readonly(AVAILABLE_LOCALES)
  const currentLocale = computed((): LocaleOption | undefined =>
    AVAILABLE_LOCALES.find((l) => l.code === locale.value),
  )

  // Actions
  const setLocale = (newLocale: Locale): Promise<void> =>
    Promise.try(async () => {
      locale.value = newLocale

      // 使用统一存储保存简化语言代码
      await unifiedStorage.set(StorageKeys.APP_LANGUAGE, newLocale)

      // 获取完整语言代码用于 i18n
      const fullCode = LOCALE_MAP[newLocale]
      i18n.global.locale.value = fullCode

      // 更新 HTML lang 属性（使用完整代码）
      document.documentElement.lang = fullCode
    })

  // 初始化应用设置
  const initialize = (): Promise<void> =>
    Promise.try(async () => {
      if (isInitialized.value) return

      // 从统一存储读取语言设置（可能是简化代码或完整代码）
      const savedLocale = await unifiedStorage.get<string>(StorageKeys.APP_LANGUAGE)

      if (savedLocale != null) {
        // 检查是否为简化代码
        if (isValidLocaleCode(savedLocale)) {
          locale.value = savedLocale
          i18n.global.locale.value = LOCALE_MAP[savedLocale]
        } else if (LOCALE_REVERSE_MAP[savedLocale]) {
          // 兼容旧的完整代码
          const simplifiedCode = LOCALE_REVERSE_MAP[savedLocale]
          locale.value = simplifiedCode
          i18n.global.locale.value = savedLocale
        }
      } else {
        // 没有保存的语言设置时，使用 i18n 检测到的浏览器语言
        const detectedLocale = i18n.global.locale.value
        if (LOCALE_REVERSE_MAP[detectedLocale]) {
          locale.value = LOCALE_REVERSE_MAP[detectedLocale]
        }
      }

      // 设置 HTML lang（使用完整代码）
      document.documentElement.lang = LOCALE_MAP[locale.value]

      isInitialized.value = true
    }).catch((error: unknown) => {
      console.error('[AppStore] Failed to initialize:', error)
      // 使用默认值
      document.documentElement.lang = LOCALE_MAP[locale.value]
    })

  // 同步初始化 HTML lang（用于 SSR 或初始渲染）
  document.documentElement.lang = LOCALE_MAP[locale.value]

  return {
    locale: readonly(locale),
    isInitialized: readonly(isInitialized),
    availableLocales,
    currentLocale,
    setLocale,
    initialize,
  }
})
