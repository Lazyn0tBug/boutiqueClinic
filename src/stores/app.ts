import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Locale } from '@/types/locale'
import { AVAILABLE_LOCALES } from '@/types/locale'

export const useAppStore = defineStore('app', () => {
  // 状态
  const locale = ref<Locale>((localStorage.getItem('locale') as Locale) || 'zh-TW')

  // Getters
  const availableLocales = computed(() => AVAILABLE_LOCALES)
  const currentLocale = computed(() => {
    return AVAILABLE_LOCALES.find((l) => l.code === locale.value)
  })

  // Actions
  const setLocale = (newLocale: Locale) => {
    locale.value = newLocale
    localStorage.setItem('locale', newLocale)

    // 更新 i18n
    const { locale: i18nLocale } = useI18n()
    i18nLocale.value = newLocale

    // 更新 HTML lang 属性
    document.documentElement.lang = newLocale
  }

  // 初始化时设置 HTML lang
  document.documentElement.lang = locale.value

  return {
    locale,
    availableLocales,
    currentLocale,
    setLocale,
  }
})
