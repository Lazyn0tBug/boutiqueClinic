<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import type { Locale } from '@/types/locale'
import { AVAILABLE_LOCALES } from '@/types/locale'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Container } from '@/components/ui/container'

const { t } = useI18n()
const appStore = useAppStore()
const route = useRoute()
const router = useRouter()

const isMobileMenuOpen = ref(false)

// 核心交互状态控制
const activeMenu = ref<string | null>(null)
const activeSubItem = ref<string | null>(null)

const currentLocale = computed(() => appStore.locale)

const languages = AVAILABLE_LOCALES.map((l) => ({
  code: l.code,
  label: `${l.flag} ${l.name}`,
}))

const displayLangCode = computed(() => {
  const localeOpt = AVAILABLE_LOCALES.find((l) => l.code === currentLocale.value)
  return localeOpt ? localeOpt.flag : 'CN'
})

const changeLanguage = async (locale: Locale) => {
  try {
    if (route.params.locale && route.params.locale !== locale) {
      await router.push({ ...route, params: { ...route.params, locale } })
    } else {
      await appStore.setLocale(locale)
    }
  } catch (error) {
    console.error('[AppHeader] Failed to change language:', error)
  }
}
</script>

<template>
  <div class="h-16 md:h-[4.5rem] w-full shrink-0"></div>

  <header
    class="fixed top-0 inset-x-0 z-50 w-full transition-colors duration-300 bg-background/80 backdrop-blur-md border-b border-border shadow-sm supports-[backdrop-filter]:bg-background/50"
    @mouseleave="activeMenu = null; activeSubItem = null"
  >
    <Container class="flex items-center justify-between h-16 md:h-[4.5rem] relative z-20">
      
      <div class="flex items-center gap-3 h-full">
        <Sheet v-model:open="isMobileMenuOpen">
          <SheetTrigger as-child>
            <Button variant="ghost" size="icon" class="lg:hidden min-h-[44px] min-w-[44px]">
              <i class="ph ph-list text-2xl"></i>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" class="w-72 sm:w-80 overflow-y-auto z-[100]">
            <SheetHeader>
              <SheetTitle class="flex items-center gap-2">
                <i class="ph-fill ph-cross text-primary text-xl"></i>
                {{ t('footer.brandName') }}
              </SheetTitle>
            </SheetHeader>
            <nav class="flex flex-col mt-6">
              <div class="mb-4 bg-primary/5 rounded-2xl p-3 border border-primary/10">
                <div class="font-semibold text-sm text-primary px-2 pb-2">{{ t('nav.services') }}</div>
                <div class="flex flex-col gap-1.5">
                  <a href="#services" class="rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-primary/10 hover:text-primary flex items-center gap-3 bg-background border border-border/50" @click="isMobileMenuOpen = false">
                    <div class="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                    {{ t('footer.quickLinks.checkup') }}
                  </a>
                  <a href="#services" class="rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-primary/10 hover:text-primary flex items-center gap-3 bg-background border border-border/50" @click="isMobileMenuOpen = false">
                    <div class="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                    {{ t('footer.quickLinks.stemCell') }}
                  </a>
                  <a href="#services" class="rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-primary/10 hover:text-primary flex items-center gap-3 bg-background border border-border/50" @click="isMobileMenuOpen = false">
                    <div class="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                    {{ t('footer.quickLinks.referral') }}
                  </a>
                </div>
              </div>
              <Separator class="mb-4 opacity-50" />
              <a href="#pharmacy" class="rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-primary/5 hover:text-primary" @click="isMobileMenuOpen = false">{{ t('nav.pharmacy') }}</a>
              <a href="#partners" class="rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-primary/5 hover:text-primary" @click="isMobileMenuOpen = false">{{ t('nav.partners') }}</a>
              <a href="#information" class="rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-primary/5 hover:text-primary" @click="isMobileMenuOpen = false">{{ t('nav.cases') }}</a>
              <a href="#footer" class="rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-primary/5 hover:text-primary" @click="isMobileMenuOpen = false">{{ t('nav.about') }}</a>
            </nav>
          </SheetContent>
        </Sheet>

        <a href="/" class="flex items-center gap-2 font-bold text-lg md:text-xl tracking-tight">
          <i class="ph-fill ph-cross text-primary text-2xl"></i>
          <span>{{ t('footer.brandName') }}</span>
        </a>
      </div>

      <nav class="hidden lg:flex items-center h-full">
        
        <div class="relative h-full flex items-center" @mouseenter="activeMenu = 'services'">
          
          <a
            href="#services"
            class="h-full px-6 flex items-center gap-1.5 font-medium transition-colors duration-200"
            :class="activeMenu === 'services' ? 'bg-muted/80 backdrop-blur-xl bg-primary text-primary-foreground' : 'hover:bg-muted/50 text-foreground'"
          >
            {{ t('nav.services') }}
            <i class="ph ph-caret-down text-xs transition-transform duration-300" :class="activeMenu === 'services' ? 'rotate-180' : 'opacity-50'"></i>
          </a>

          <div
            class="absolute top-full left-0 h-16 flex items-center transition-opacity duration-200 z-30 whitespace-nowrap min-w-max"
            :class="activeMenu === 'services' ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'"
          >
            <a
              href="#services"
              @mouseenter="activeSubItem = 'checkup'"
              @mouseleave="activeSubItem = null"
              class="h-16 px-6 flex items-center gap-2 text-sm font-semibold transition-all cursor-pointer"
              :class="activeSubItem === 'checkup' ? 'bg-background text-primary shadow-[0_0_15px_rgba(0,0,0,0.05)] relative z-10' : 'text-primary-foreground hover:text-foreground'"
            >
              <i class="ph-fill ph-heartbeat text-lg"></i>
              {{ t('footer.quickLinks.checkup') }}
            </a>
            
            <a
              href="#services"
              @mouseenter="activeSubItem = 'stemCell'"
              @mouseleave="activeSubItem = null"
              class="h-16 px-6 flex items-center gap-2 text-sm font-semibold transition-all cursor-pointer"
              :class="activeSubItem === 'stemCell' ? 'bg-background text-primary shadow-[0_0_15px_rgba(0,0,0,0.05)] relative z-10' : 'text-primary-foreground hover:text-foreground'"
            >
              <i class="ph-fill ph-flask text-lg"></i>
              {{ t('footer.quickLinks.stemCell') }}
            </a>
            
            <a
              href="#services"
              @mouseenter="activeSubItem = 'referral'"
              @mouseleave="activeSubItem = null"
              class="h-16 px-6 flex items-center gap-2 text-sm font-semibold transition-all cursor-pointer"
              :class="activeSubItem === 'referral' ? 'bg-background text-primary shadow-[0_0_15px_rgba(0,0,0,0.05)] relative z-10' : 'text-primary-foreground hover:text-foreground'"
            >
              <i class="ph-fill ph-stethoscope text-lg"></i>
              {{ t('footer.quickLinks.referral') }}
            </a>
          </div>
        </div>

        <div class="h-full flex items-center" @mouseenter="activeMenu = null">
          <a href="#pharmacy" class="h-full px-5 flex items-center font-medium hover:bg-muted/50 text-foreground transition-colors">
            {{ t('nav.pharmacy') }}
          </a>
        </div>
        <div class="h-full flex items-center" @mouseenter="activeMenu = null">
          <a href="#partners" class="h-full px-5 flex items-center font-medium hover:bg-muted/50 text-foreground transition-colors">
            {{ t('nav.partners') }}
          </a>
        </div>
        <div class="h-full flex items-center" @mouseenter="activeMenu = null">
          <a href="#information" class="h-full px-5 flex items-center font-medium hover:bg-muted/50 text-foreground transition-colors">
            {{ t('nav.cases') }}
          </a>
        </div>
        <div class="h-full flex items-center" @mouseenter="activeMenu = null">
          <a href="#footer" class="h-full px-5 flex items-center font-medium hover:bg-muted/50 text-foreground transition-colors">
            {{ t('nav.about') }}
          </a>
        </div>
      </nav>

      <div class="flex items-center gap-1 md:gap-2 h-full" @mouseenter="activeMenu = null">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="gap-1.5 hover:bg-muted/50">
              <i class="ph ph-translate text-xl"></i>
              <span class="font-medium tracking-wide hidden sm:inline-block">{{ displayLangCode }}</span>
              <i class="ph ph-caret-down text-xs opacity-70"></i>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-40 bg-background/95 backdrop-blur-xl z-[60]">
            <DropdownMenuItem v-for="lang in languages" :key="lang.code" @click="changeLanguage(lang.code)" class="cursor-pointer flex justify-between">
              {{ lang.label }}
              <i v-if="lang.code === currentLocale" class="ph-bold ph-check text-primary"></i>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon" class="hover:bg-muted/50">
              <i class="ph ph-user text-xl"></i>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-40 bg-background/95 backdrop-blur-xl z-[60]">
            <DropdownMenuItem as-child>
              <a href="#admin" class="w-full cursor-pointer text-primary">{{ t('footer.supportLinks.contact') }}</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Container>

    <div
      class="absolute top-full left-0 w-full transition-all duration-200 border-border z-10"
      :class="activeMenu ? 'h-16 opacity-100 bg-muted/80 backdrop-blur-xl border-b shadow-sm bg-primary' : 'h-0 opacity-0 bg-transparent border-transparent pointer-events-none'"
    ></div>
  </header>
</template>