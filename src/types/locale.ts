export type Locale = 'zh-TW' | 'zh-CN' | 'en' | 'ja'

export interface LocaleOption {
  code: Locale
  name: string
  flag: string
}

export const AVAILABLE_LOCALES: LocaleOption[] = [
  { code: 'zh-TW', name: '繁體中文', flag: 'TW' },
  { code: 'zh-CN', name: '简体中文', flag: 'CN' },
  { code: 'en', name: 'English', flag: 'EN' },
  { code: 'ja', name: '日本語', flag: 'JP' },
]
