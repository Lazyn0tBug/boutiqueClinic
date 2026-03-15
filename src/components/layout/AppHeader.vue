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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Container } from '@/components/ui/container'

// 引入 CVA 与 工具函数
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const { t } = useI18n()
const appStore = useAppStore()
const route = useRoute()
const router = useRouter()

const isMobileMenuOpen = ref(false)

// 核心互动状态控制
const activeMenu = ref<string | null>(null)
const activeSubItem = ref<string | null>(null)

// ==========================================
//  [重构核心 1] 全局导航单一数据源
// ==========================================
const navConfig = [
  {
    id: 'services',
    labelKey: 'nav.services',
    href: '#services',
    isDropdown: true,
    subItems: [
      { id: 'checkup', icon: 'ph-heartbeat', labelKey: 'footer.quickLinks.checkup', href: '#services' },
      { id: 'stemCell', icon: 'ph-flask', labelKey: 'footer.quickLinks.stemCell', href: '#services' },
      { id: 'referral', icon: 'ph-stethoscope', labelKey: 'footer.quickLinks.referral', href: '#services' },
    ],
  },
  { id: 'pharmacy', labelKey: 'nav.pharmacy', href: '#pharmacy', isDropdown: false },
  { id: 'partners', labelKey: 'nav.partners', href: '#partners', isDropdown: false },
  { id: 'cases', labelKey: 'nav.cases', href: '#information', isDropdown: false },
  { id: 'about', labelKey: 'nav.about', href: '#footer', isDropdown: false },
]

// ==========================================
//  [重构核心 2] CVA 样式变体分层管理
// ==========================================

// 1. 桌面端主菜单项
const desktopMainLinkVariants = cva(
  "h-full flex items-center font-medium transition-colors duration-300 rounded-none cursor-pointer",
  {
    variants: {
      type: {
        normal: "px-5", 
        dropdownTrigger: "w-nav-item justify-center gap-1.5", 
      },
      state: {
        default: "hover:bg-muted/50 text-foreground", 
        active: "bg-primary/80 backdrop-blur-md text-primary-foreground", 
      }
    },
    defaultVariants: {
      type: "normal",
      state: "default"
    }
  }
)

// 2. 桌面端子菜单项
const desktopSubLinkVariants = cva(
  "h-16 w-nav-item flex justify-center items-center gap-2 text-sm font-semibold transition-colors duration-200 cursor-pointer rounded-none",
  {
    variants: {
      state: {
        default: "text-primary-foreground/90 hover:text-primary-foreground",
        active: "bg-background/85 backdrop-blur-md text-primary shadow-nav-glow relative z-20"
      }
    },
    defaultVariants: { state: "default" }
  }
)

// 3. 移动端菜单项
const mobileLinkVariants = cva(
  "w-full flex items-center gap-3 rounded-xl transition-colors",
  {
    variants: {
      type: {
        normal: "px-4 py-3 text-base font-medium text-foreground hover:bg-muted/50",
        subItem: "px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
      }
    },
    defaultVariants: { type: "normal" }
  }
)

// ==========================================
//  其他逻辑保留
// ==========================================
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
    class="fixed top-0 inset-x-0 w-full transition-colors duration-300 bg-background/80 backdrop-blur-md border-b border-border shadow-sm supports-[backdrop-filter]:bg-background/50 z-[99999]"
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
          <SheetContent side="left" class="w-72 sm:w-80 overflow-y-auto z-[100000]">
            <SheetHeader>
              <SheetTitle class="flex items-center gap-2">
                <i class="ph-fill ph-cross text-primary text-xl"></i>
                {{ t('footer.brandName') }}
              </SheetTitle>
              
              <SheetDescription class="sr-only">
                Mobile Navigation Menu
              </SheetDescription>
              
            </SheetHeader>
            <nav class="flex flex-col gap-2 mt-8">
              <template v-for="item in navConfig" :key="item.id">
                
                <div v-if="item.isDropdown" class="flex flex-col mb-2">
                  <div class="px-4 py-2 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                    {{ t(item.labelKey) }}
                  </div>
                  <div class="flex flex-col mt-1 space-y-1">
                    <a 
                      v-for="sub in item.subItems" 
                      :key="sub.id" 
                      :href="sub.href" 
                      :class="cn(mobileLinkVariants({ type: 'subItem' }))" 
                      @click="isMobileMenuOpen = false"
                    >
                      <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/50 text-foreground shrink-0">
                        <i :class="['ph-fill text-lg', sub.icon]"></i>
                      </div>
                      {{ t(sub.labelKey) }}
                    </a>
                  </div>
                </div>
                
                <Separator v-if="item.isDropdown" class="my-2 opacity-50" />

                <a 
                  v-else 
                  :href="item.href" 
                  :class="cn(mobileLinkVariants({ type: 'normal' }))" 
                  @click="isMobileMenuOpen = false"
                >
                  {{ t(item.labelKey) }}
                </a>
              </template>
            </nav>
          </SheetContent>
        </Sheet>

        <a href="/" class="flex items-center gap-2 font-bold text-lg md:text-xl tracking-tight">
          <i class="ph-fill ph-cross text-primary text-2xl"></i>
          <span>{{ t('footer.brandName') }}</span>
        </a>
      </div>

      <nav class="hidden lg:flex items-center h-full">
        
        <template v-for="item in navConfig" :key="item.id">
          
          <div v-if="item.isDropdown" class="relative h-full flex items-center" @mouseenter="activeMenu = item.id">
            
            <a
              :href="item.href"
              :class="cn(desktopMainLinkVariants({ type: 'dropdownTrigger', state: activeMenu === item.id ? 'active' : 'default' }))"
            >
              {{ t(item.labelKey) }}
              <i class="ph ph-caret-down text-xs transition-transform duration-300" :class="activeMenu === item.id ? 'rotate-180' : 'opacity-50'"></i>
            </a>

            <div
              class="absolute top-full left-0 h-16 flex items-center z-30 whitespace-nowrap min-w-max"
              :class="activeMenu === item.id ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'"
            >
              <a
                v-for="sub in item.subItems"
                :key="sub.id"
                :href="sub.href"
                @mouseenter="activeSubItem = sub.id"
                @mouseleave="activeSubItem = null"
                :class="cn(desktopSubLinkVariants({ state: activeSubItem === sub.id ? 'active' : 'default' }))"
              >
                <i class="ph-fill text-lg" :class="sub.icon"></i>
                {{ t(sub.labelKey) }}
              </a>
            </div>
          </div>

          <div v-else class="h-full flex items-center" @mouseenter="activeMenu = null">
            <a 
              :href="item.href" 
              :class="cn(desktopMainLinkVariants({ type: 'normal', state: 'default' }))"
            >
              {{ t(item.labelKey) }}
            </a>
          </div>

        </template>
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
          <DropdownMenuContent align="end" class="w-40 bg-background/95 backdrop-blur-xl z-[100000]">
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
          <DropdownMenuContent align="end" class="w-40 bg-background/95 backdrop-blur-xl z-[100000]">
            <DropdownMenuItem as-child>
              <a href="#admin" class="w-full cursor-pointer text-primary">{{ t('footer.supportLinks.contact') }}</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Container>

    <div
      class="absolute top-full left-0 w-full transition-all duration-300 z-10 border-b border-primary/20"
      :class="activeMenu ? 'h-16 opacity-100 bg-primary/80 backdrop-blur-md shadow-sm' : 'h-0 opacity-0 bg-transparent pointer-events-none border-transparent'"
    ></div>
  </header>
</template>