<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'
import type { Locale } from '@/types/locale'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Container } from '@/components/ui/container'

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
const changeLanguage = async (locale: Locale) => {
  try {
    await appStore.setLocale(locale)
  } catch (error) {
    console.error('[AppHeader] Failed to change language:', error)
  }
}
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 site-header"
  >
    <Container class="flex items-center justify-between h-16">
      <!-- 左側：移動端菜單按鈕與 Logo -->
      <div class="flex items-center gap-3">
        <!-- 移動端菜單 -->
        <Sheet v-model:open="isMobileMenuOpen">
          <SheetTrigger as-child>
            <Button variant="ghost" size="icon" class="lg:hidden min-h-[44px] min-w-[44px]">
              <i class="ph ph-list text-2xl"></i>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" class="w-72">
            <SheetHeader>
              <SheetTitle class="flex items-center gap-2">
                <i class="ph-fill ph-cross text-primary text-xl"></i>
                {{ t('footer.brandName') }}
              </SheetTitle>
            </SheetHeader>
            <div class="flex flex-col gap-2 mt-6">
              <div class="font-semibold text-sm text-muted-foreground px-2 py-1 uppercase tracking-wider">
                {{ t('nav.services') }}
              </div>
              <a
                href="#services"
                class="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground min-h-[44px] flex items-center"
                @click="isMobileMenuOpen = false"
              >{{ t('nav.servicesMenu.featured') }}</a>
              <a
                href="#services"
                class="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground min-h-[44px] flex items-center"
                @click="isMobileMenuOpen = false"
              >{{ t('nav.servicesMenu.booking') }}</a>
              <Separator class="my-2" />
              <a
                href="#pharmacy"
                class="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground min-h-[44px] flex items-center"
                @click="isMobileMenuOpen = false"
              >{{ t('nav.pharmacy') }}</a>
              <a
                href="#partners"
                class="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground min-h-[44px] flex items-center"
                @click="isMobileMenuOpen = false"
              >{{ t('nav.partners') }}</a>
              <a
                href="#information"
                class="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground min-h-[44px] flex items-center"
                @click="isMobileMenuOpen = false"
              >{{ t('nav.cases') }}</a>
              <a
                href="#footer"
                class="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground min-h-[44px] flex items-center"
                @click="isMobileMenuOpen = false"
              >{{ t('nav.about') }}</a>
            </div>
          </SheetContent>
        </Sheet>

        <a
          class="flex items-center gap-2 font-bold text-lg md:text-xl tracking-tight hover:opacity-80 transition-opacity cursor-pointer"
        >
          <i class="ph-fill ph-cross text-primary text-2xl"></i>
          <span class="text-balance">{{ t('footer.brandName') }}</span>
          <span
            class="text-xs text-muted-foreground font-normal hidden xl:inline-block border-l border-border pl-2 ml-1 text-pretty"
          >{{ t('about.subtitle') }}</span>
        </a>
      </div>

      <!-- 中間：PC 端導航菜單 -->
      <nav class="hidden lg:flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="min-h-[44px]">{{ t('nav.services') }}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <a href="#services" class="min-h-[44px] flex items-center">{{ t('nav.servicesMenu.featured') }}</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href="#services" class="min-h-[44px] flex items-center">{{ t('nav.servicesMenu.booking') }}</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" as-child class="min-h-[44px]">
          <a href="#pharmacy">{{ t('nav.pharmacy') }}</a>
        </Button>
        <Button variant="ghost" as-child class="min-h-[44px]">
          <a href="#partners">{{ t('nav.partners') }}</a>
        </Button>
        <Button variant="ghost" as-child class="min-h-[44px]">
          <a href="#information">{{ t('nav.cases') }}</a>
        </Button>
        <Button variant="ghost" as-child class="min-h-[44px]">
          <a href="#footer">{{ t('nav.about') }}</a>
        </Button>
      </nav>

      <!-- 右側：功能按鈕 -->
      <div class="flex items-center gap-1 md:gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="gap-1 min-h-[44px]">
              <i class="ph ph-translate text-lg"></i>
              <span class="font-medium tracking-wide">{{ displayLangCode }}</span>
              <i class="ph ph-caret-down text-xs text-muted-foreground"></i>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              v-for="lang in languages"
              :key="lang.code"
              @click="changeLanguage(lang.code)"
              class="min-h-[44px]"
            >
              {{ lang.label }}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon" class="min-h-[44px] min-w-[44px]">
              <i class="ph ph-user text-lg"></i>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <a href="#admin" class="min-h-[44px] flex items-center">{{ t('footer.supportLinks.contact') }}</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Container>
  </header>
</template>