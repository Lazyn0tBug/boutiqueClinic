<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

// 引入 CVA 与 工具函数
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const { t } = useI18n()
const showMapModal = ref(false)

// ==========================================
//  [重构核心 1] 全局 Footer 数据源
// ==========================================
const footerConfig = {
  socials: [
    { id: 'youtube', icon: 'ph-youtube-logo', href: '#' },
    { id: 'instagram', icon: 'ph-instagram-logo', href: '#' },
    { id: 'twitter', icon: 'ph-twitter-logo', href: '#' },
  ],
  legal: [
    { id: 'privacy', labelKey: 'footer.legal.privacy', href: '#' },
    { id: 'terms', labelKey: 'footer.legal.terms', href: '#' },
  ],
  medicalServices: [
    { id: 'featured', labelKey: 'nav.servicesMenu.featured', href: '#services' },
    { id: 'pharmacy', labelKey: 'nav.pharmacy', href: '#pharmacy' },
    { id: 'cases', labelKey: 'nav.cases', href: '#information' },
    { id: 'partners', labelKey: 'nav.partners', href: '#partners' },
  ],
}

// ==========================================
//  [重构核心 2] CVA 样式变体
// ==========================================
const footerLinkVariants = cva('transition-colors', {
  variants: {
    type: {
      social: 'text-white/70 hover:text-white text-2xl',
      legal: 'hover:text-white',
      nav: 'text-white/80 hover:text-white',
    },
  },
})
</script>

<template>
  <footer class="bg-primary text-primary-foreground border-t border-white/10">
    <Container class="py-10 md:py-16 lg:py-20">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div class="lg:col-span-5 flex flex-col items-start">
          <div class="flex items-center gap-3 font-bold text-xl md:text-2xl tracking-tight mb-5">
            <i class="ph-fill ph-cross text-white text-2xl md:text-3xl mt-0.5"></i>
            <span>{{ t('footer.brandName') }}</span>
          </div>

          <p class="text-sm leading-relaxed text-white/90 mb-6 max-w-sm">
            {{ t('footer.brandDescription') }}
          </p>

          <div class="flex gap-6 mb-8 lg:mb-12">
            <a
              v-for="social in footerConfig.socials"
              :key="social.id"
              :href="social.href"
              :class="cn(footerLinkVariants({ type: 'social' }))"
              :aria-label="social.id"
            >
              <i class="ph-fill" :class="social.icon"></i>
            </a>
          </div>

          <div class="mt-auto pt-6 border-t border-white/10 w-full lg:max-w-xs">
            <div class="flex flex-wrap gap-x-5 gap-y-1 text-xs font-bold text-white/60 mb-2">
              <a
                v-for="item in footerConfig.legal"
                :key="item.id"
                :href="item.href"
                :class="cn(footerLinkVariants({ type: 'legal' }))"
              >
                {{ t(item.labelKey) }}
              </a>
            </div>
            <p class="text-xxs font-bold tracking-widest text-white/40 uppercase">
              © 2026 {{ t('footer.brandName') }}. {{ t('common.allRightsReserved') }}
            </p>
          </div>
        </div>

        <div class="lg:col-span-7">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 md:gap-12">
            <div class="hidden lg:flex flex-col gap-6">
              <h5
                class="text-sm font-bold tracking-widest text-white border-b border-white/10 pb-3"
              >
                {{ t('footer.medicalServices') }}
              </h5>
              <ul class="space-y-4 text-sm font-medium">
                <li v-for="link in footerConfig.medicalServices" :key="link.id">
                  <a :href="link.href" :class="cn(footerLinkVariants({ type: 'nav' }))">
                    {{ t(link.labelKey) }}
                  </a>
                </li>
              </ul>
            </div>

            <div class="flex flex-col gap-6">
              <h5
                class="text-sm font-bold tracking-widest text-white border-b border-white/10 pb-3"
              >
                {{ t('footer.supportLinks.contact') }}
              </h5>
              <div class="space-y-5 text-sm">
                <div class="flex items-center gap-3 font-bold text-white">
                  <i class="ph ph-phone text-white/60 text-lg"></i>
                  <span>{{ t('footer.phone') }}</span>
                </div>

                <div class="flex items-start gap-3 text-white/90">
                  <i class="ph ph-map-pin text-white/60 text-lg mt-0.5"></i>
                  <div class="flex flex-col gap-3">
                    <span class="leading-relaxed">{{ t('footer.mapModal.address') }}</span>
                    <button
                      @click="showMapModal = true"
                      class="text-tiny font-bold w-fit py-1.5 px-4 rounded-full border border-white/20 hover:bg-white hover:text-primary transition-all uppercase tracking-wide"
                    >
                      {{ t('common.viewMap') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>

    <Dialog v-model:open="showMapModal">
      <DialogContent class="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{{ t('footer.mapModal.title') }}</DialogTitle>
        </DialogHeader>
        <div class="aspect-video bg-muted flex items-center justify-center">
          <div class="text-center p-8 text-muted-foreground">
            <i class="ph ph-map-pin text-5xl mb-4 opacity-20"></i>
            <p class="font-medium text-lg mb-2">{{ t('footer.mapModal.mapPlaceholder') }}</p>
            <p class="text-sm">{{ t('footer.mapModal.address') }}</p>
            <Button as-child class="mt-6 min-h-11 px-8">
              <a
                href="https://maps.google.com"
                target="_blank"
                class="inline-flex items-center gap-2"
              >
                <i class="ph ph-external-link"></i>
                {{ t('common.openInGoogleMaps') }}
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </footer>
</template>
