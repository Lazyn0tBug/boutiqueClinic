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

const currentLocale = computed(() => appStore.locale)

const languages = [
  { code: 'zh-CN' as Locale, label: 'CN 简体中文' },
  { code: 'zh-TW' as Locale, label: 'TW 繁体中文' },
  { code: 'ja' as Locale, label: 'JP 日本語' },
  { code: 'en' as Locale, label: 'EN English' },
]

const displayLangCode = computed(() => {
  const map: Record<string, string> = {
    'zh-CN': 'CN',
    'zh-TW': 'TW',
    'ja': 'JP',
    'en': 'EN',
  }
  return map[currentLocale.value] || 'TW'
})

const changeLanguage = async (locale: Locale) => {
  try {
    await appStore.setLocale(locale)
  } catch (error) {
    console.error('[AppHeader] Failed to change language:', error)
  }
}
</script>

<template>
  <div class="h-16 md:h-[4.5rem] w-full shrink-0"></div>

  <header
    class="fixed top-0 inset-x-0 z-50 w-full border-b border-primary/10 bg-background/70 backdrop-blur-md shadow-sm shadow-primary/5 supports-[backdrop-filter]:bg-background/50"
  >
    <div class="absolute inset-0 bg-primary/5 pointer-events-none -z-10"></div>

    <Container class="flex items-center justify-between h-16 md:h-[4.5rem] transition-all duration-300">
      
      <div class="flex items-center gap-3">
        <Sheet v-model:open="isMobileMenuOpen">
          <SheetTrigger as-child>
            <Button variant="ghost" size="icon" aria-label="Toggle Menu" class="lg:hidden min-h-[44px] min-w-[44px]">
              <i class="ph ph-list text-2xl"></i>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" class="w-72 sm:w-80 border-r-primary/10 shadow-2xl shadow-primary/10">
            <SheetHeader>
              <SheetTitle class="flex items-center gap-2">
                <i class="ph-fill ph-cross text-primary text-xl"></i>
                {{ t('footer.brandName') }}
              </SheetTitle>
            </SheetHeader>
            <nav class="flex flex-col gap-1 mt-6">
              <div class="font-semibold text-xs text-muted-foreground px-3 py-2 uppercase tracking-wider">
                {{ t('nav.services') }}
              </div>
              <a
                href="#services"
                class="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors min-h-[44px] flex items-center"
                @click="isMobileMenuOpen = false"
              >{{ t('nav.servicesMenu.featured') }}</a>
              <a
                href="#services"
                class="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors min-h-[44px] flex items-center"
                @click="isMobileMenuOpen = false"
              >{{ t('nav.servicesMenu.booking') }}</a>
              
              <Separator class="my-3 opacity-50" />
              
              <a
                href="#pharmacy"
                class="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors min-h-[44px] flex items-center"
                @click="isMobileMenuOpen = false"
              >{{ t('nav.pharmacy') }}</a>
              <a
                href="#partners"
                class="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors min-h-[44px] flex items-center"
                @click="isMobileMenuOpen = false"
              >{{ t('nav.partners') }}</a>
              <a
                href="#information"
                class="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors min-h-[44px] flex items-center"
                @click="isMobileMenuOpen = false"
              >{{ t('nav.cases') }}</a>
              <a
                href="#footer"
                class="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors min-h-[44px] flex items-center"
                @click="isMobileMenuOpen = false"
              >{{ t('nav.about') }}</a>
            </nav>
          </SheetContent>
        </Sheet>

        <a
          href="/"
          class="flex items-center gap-2 font-bold text-lg md:text-xl tracking-tight hover:opacity-80 transition-opacity"
        >
          <i class="ph-fill ph-cross text-primary text-2xl"></i>
          <span class="text-balance">{{ t('footer.brandName') }}</span>
          <span
            class="text-xs text-muted-foreground font-normal hidden xl:inline-block border-l border-border pl-2 ml-1 text-pretty"
          >{{ t('about.subtitle') }}</span>
        </a>
      </div>

      <nav class="hidden lg:flex items-center gap-1.5">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="min-h-[44px] font-medium hover:bg-primary/10 hover:text-primary">{{ t('nav.services') }}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-48 bg-background/80 backdrop-blur-lg border-primary/10 shadow-xl shadow-primary/5">
            <DropdownMenuItem as-child>
              <a href="#services" class="w-full cursor-pointer md:min-h-0 md:h-10 flex items-center focus:bg-primary/10 focus:text-primary">{{ t('nav.servicesMenu.featured') }}</a>
            </DropdownMenuItem>
            <DropdownMenuItem as-child>
              <a href="#services" class="w-full cursor-pointer md:min-h-0 md:h-10 flex items-center focus:bg-primary/10 focus:text-primary">{{ t('nav.servicesMenu.booking') }}</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" as-child class="min-h-[44px] font-medium hover:bg-primary/10 hover:text-primary">
          <a href="#pharmacy">{{ t('nav.pharmacy') }}</a>
        </Button>
        <Button variant="ghost" as-child class="min-h-[44px] font-medium hover:bg-primary/10 hover:text-primary">
          <a href="#partners">{{ t('nav.partners') }}</a>
        </Button>
        <Button variant="ghost" as-child class="min-h-[44px] font-medium hover:bg-primary/10 hover:text-primary">
          <a href="#information">{{ t('nav.cases') }}</a>
        </Button>
        <Button variant="ghost" as-child class="min-h-[44px] font-medium hover:bg-primary/10 hover:text-primary">
          <a href="#footer">{{ t('nav.about') }}</a>
        </Button>
      </nav>

      <div class="flex items-center gap-1 md:gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="gap-1.5 min-h-[44px] hover:bg-primary/10 hover:text-primary">
              <i class="ph ph-translate text-xl"></i>
              <span class="font-medium tracking-wide hidden sm:inline-block">{{ displayLangCode }}</span>
              <i class="ph ph-caret-down text-xs text-muted-foreground opacity-70"></i>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-40 bg-background/80 backdrop-blur-lg border-primary/10 shadow-xl shadow-primary/5">
            <DropdownMenuItem
              v-for="lang in languages"
              :key="lang.code"
              @click="changeLanguage(lang.code)"
              class="cursor-pointer md:min-h-0 md:h-10 flex items-center justify-between focus:bg-primary/10 focus:text-primary"
            >
              {{ lang.label }}
              <i v-if="lang.code === currentLocale" class="ph-bold ph-check text-primary"></i>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon" aria-label="User Profile" class="min-h-[44px] min-w-[44px] hover:bg-primary/10 hover:text-primary">
              <i class="ph ph-user text-xl"></i>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-40 bg-background/80 backdrop-blur-lg border-primary/10 shadow-xl shadow-primary/5">
            <DropdownMenuItem as-child>
              <a href="#admin" class="w-full cursor-pointer md:min-h-0 md:h-10 flex items-center focus:bg-primary/10 focus:text-primary">{{ t('footer.supportLinks.contact') }}</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

    </Container>
  </header>
</template>