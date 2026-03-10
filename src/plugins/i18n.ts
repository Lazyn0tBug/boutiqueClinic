import { createI18n } from 'vue-i18n'
import zhTW from '@/locales/zh-TW.json'
import zhCN from '@/locales/zh-CN.json'
import en from '@/locales/en.json'
import ja from '@/locales/ja.json'

export type Locale = 'zh-TW' | 'zh-CN' | 'en' | 'ja'

// 从 localStorage 或浏览器语言获取默认语言
function getDefaultLocale(): Locale {
  const stored = localStorage.getItem('locale') as Locale | null
  if (stored && ['zh-TW', 'zh-CN', 'en', 'ja'].includes(stored)) {
    return stored
  }

  // 从浏览器语言推断
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('zh-cn') || browserLang === 'zh-hans') {
    return 'zh-CN'
  }
  if (browserLang.startsWith('zh')) {
    return 'zh-TW'
  }
  if (browserLang.startsWith('ja')) {
    return 'ja'
  }
  if (browserLang.startsWith('en')) {
    return 'en'
  }

  return 'zh-TW' // 默认繁体中文
}

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: getDefaultLocale(),
  fallbackLocale: 'zh-TW',
  messages: {
    'zh-TW': zhTW,
    'zh-CN': zhCN,
    en,
    ja,
  },
})

export default i18n
