<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'
import type { Locale } from '@/types/locale'

const { t } = useI18n()
const appStore = useAppStore()

const isMobileMenuOpen = ref(false)

// 使用 computed 從 store 獲取當前語言
const currentLocale = computed(() => appStore.locale)

// 語言選項 - 使用正確的 i18n locale codes
const languages = [
  { code: 'zh-CN' as Locale, label: 'CN 简体中文' },
  { code: 'zh-TW' as Locale, label: 'TW 繁体中文' },
  { code: 'ja' as Locale, label: 'JP 日本語' },
  { code: 'en' as Locale, label: 'EN English' },
]

// 顯示用戶友好的語言代碼
const displayLangCode = computed(() => {
  const map: Record<string, string> = {
    'zh-CN': 'CN',
    'zh-TW': 'TW',
    'ja': 'JP',
    'en': 'EN',
  }
  return map[currentLocale.value] || 'TW'
})

// 切換語言
const changeLanguage = (locale: Locale) => {
  appStore.setLocale(locale)
}
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="flex items-center justify-between h-16 max-w-7xl mx-auto px-4 lg:px-8">
      <!-- 左側：移動端菜單按鈕與 Logo -->
      <div class="flex items-center gap-3">
        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="inline-flex lg:hidden items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <i class="ph ph-list text-2xl"></i>
        </button>

        <a
          class="flex items-center gap-2 font-bold text-lg md:text-xl tracking-tight hover:opacity-80 transition-opacity cursor-pointer"
        >
          <i class="ph-fill ph-cross text-primary text-2xl"></i>
          <span>{{ t('footer.brandName') }}</span>
          <span
            class="text-xs text-muted-foreground font-normal hidden xl:inline-block border-l border-border pl-2 ml-1"
            >{{ t('about.subtitle') }}</span
          >
        </a>
      </div>

      <!-- 中間：PC 端導航菜單 -->
      <nav class="hidden lg:flex items-center gap-1">
        <div class="relative group">
          <button
            class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
          >
            {{ t('nav.services') }}
          </button>
          <div class="absolute left-0 top-full hidden group-hover:block pt-2">
            <div
              class="w-40 rounded-md border border-border bg-popover p-1 shadow-md text-popover-foreground"
            >
              <a
                href="#services"
                class="block w-full rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                >{{ t('nav.servicesMenu.featured') }}</a
              >
              <a
                href="#services"
                class="block w-full rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                >{{ t('nav.servicesMenu.booking') }}</a
              >
            </div>
          </div>
        </div>

        <a
          href="#pharmacy"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
          >{{ t('nav.pharmacy') }}</a
        >
        <a
          href="#partners"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
          >{{ t('nav.partners') }}</a
        >
        <a
          href="#information"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
          >{{ t('nav.cases') }}</a
        >
        <a
          href="#footer"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
          >{{ t('nav.about') }}</a
        >
      </nav>

      <!-- 右側：功能按鈕 -->
      <div class="flex items-center gap-1 md:gap-2">
        <div class="relative group">
          <button
            class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 px-3 border border-transparent hover:border-border"
          >
            <i class="ph ph-translate text-lg"></i>
            <span class="font-medium mx-1 tracking-wide">{{ displayLangCode }}</span>
            <i class="ph ph-caret-down text-xs text-muted-foreground"></i>
          </button>
          <div class="absolute right-0 top-full hidden group-hover:block pt-2">
            <div
              class="w-36 rounded-md border border-border bg-popover p-1 shadow-md text-popover-foreground"
            >
              <button
                v-for="lang in languages"
                :key="lang.code"
                @click="changeLanguage(lang.code)"
                class="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors text-left"
              >
                {{ lang.label }}
              </button>
            </div>
          </div>
        </div>

        <div class="relative group inline-block">
          <a
            href="#admin"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 border border-transparent hover:border-border"
          >
            <i class="ph ph-user text-lg"></i>
          </a>
          <div
            class="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block z-50 pointer-events-none"
          >
            <div
              class="bg-popover text-popover-foreground text-xs rounded-md py-1.5 px-3 border border-border shadow-md whitespace-nowrap"
            >
              {{ t('footer.supportLinks.contact') }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 移動端下拉菜單 -->
    <div
      v-if="isMobileMenuOpen"
      class="lg:hidden border-t border-border bg-background p-4 flex flex-col gap-2 shadow-lg absolute w-full left-0"
    >
      <div class="font-semibold text-sm text-muted-foreground px-2 py-1 uppercase tracking-wider">
        {{ t('nav.services') }}
      </div>
      <a
        href="#services"
        class="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        @click="isMobileMenuOpen = false"
        >{{ t('nav.servicesMenu.featured') }}</a
      >
      <a
        href="#services"
        class="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        @click="isMobileMenuOpen = false"
        >{{ t('nav.servicesMenu.booking') }}</a
      >
      <div class="h-px bg-border my-1"></div>
      <a
        href="#pharmacy"
        class="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        @click="isMobileMenuOpen = false"
        >{{ t('nav.pharmacy') }}</a
      >
      <a
        href="#partners"
        class="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        @click="isMobileMenuOpen = false"
        >{{ t('nav.partners') }}</a
      >
      <a
        href="#information"
        class="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        @click="isMobileMenuOpen = false"
        >{{ t('nav.cases') }}</a
      >
      <a
        href="#footer"
        class="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        @click="isMobileMenuOpen = false"
        >{{ t('nav.about') }}</a
      >
    </div>
  </header>
</template>