export type Locale = 'cn' | 'tw' | 'en' | 'ja'

export interface LocaleOption {
  readonly code: Locale
  readonly name: string
  readonly flag: string
  // 完整语言代码（用于 i18n 和存储）
  readonly fullCode: string
}

export const AVAILABLE_LOCALES = [
  { code: 'cn', name: '简体中文', flag: 'CN', fullCode: 'zh-CN' },
  { code: 'tw', name: '繁體中文', flag: 'TW', fullCode: 'zh-TW' },
  { code: 'en', name: 'English', flag: 'EN', fullCode: 'en' },
  { code: 'ja', name: '日本語', flag: 'JP', fullCode: 'ja' },
] as const satisfies readonly LocaleOption[]

// 映射表：简化代码 -> 完整代码
export const LOCALE_MAP: Record<Locale, string> = {
  cn: 'zh-CN',
  tw: 'zh-TW',
  en: 'en',
  ja: 'ja',
}

// 完整代码 -> 简化代码
export const LOCALE_REVERSE_MAP: Record<string, Locale> = {
  'zh-CN': 'cn',
  'zh-TW': 'tw',
  en: 'en',
  ja: 'ja',
}

// 提取类型
export type AvailableLocaleCode = (typeof AVAILABLE_LOCALES)[number]['code']
