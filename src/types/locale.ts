export type Locale = 'zh-CN' | 'zh-TW' | 'en' | 'ja'

export interface LocaleOption {
  readonly code: Locale
  readonly name: string
  readonly flag: string
}

export const AVAILABLE_LOCALES = [
  { code: 'zh-CN', name: '简体中文', flag: 'CN' },
  { code: 'zh-TW', name: '繁體中文', flag: 'TW' },
  { code: 'en', name: 'English', flag: 'EN' },
  { code: 'ja', name: '日本語', flag: 'JP' },
] as const satisfies readonly LocaleOption[]

// 提取类型
export type AvailableLocaleCode = (typeof AVAILABLE_LOCALES)[number]['code']