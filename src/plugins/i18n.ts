import { createI18n } from 'vue-i18n'
import zhCN from '@/locales/zh-CN.json'
import zhTW from '@/locales/zh-TW.json'
import en from '@/locales/en.json'
import ja from '@/locales/ja.json'

export type Locale = 'zh-CN' | 'zh-TW' | 'en' | 'ja'

// 从浏览器语言获取默认语言（仅作为初始值）
function getBrowserLocale(): Locale {
  // 测试环境中 navigator 可能不存在
  if (typeof navigator === 'undefined' || !navigator.language) {
    return 'zh-CN'
  }
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
  return 'zh-CN' // 默认简体中文
}

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: getBrowserLocale(), // 初始值，后续由 appStore.initialize() 从存储中恢复
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-TW': zhTW,
    'zh-CN': zhCN,
    en,
    ja,
  },
})

export default i18n
