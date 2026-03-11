<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

const { t } = useI18n()
const showMapModal = ref(false)
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
            <a href="#" class="text-white/70 hover:text-white transition-colors" aria-label="YouTube"><i class="ph-fill ph-youtube-logo text-2xl"></i></a>
            <a href="#" class="text-white/70 hover:text-white transition-colors" aria-label="Instagram"><i class="ph-fill ph-instagram-logo text-2xl"></i></a>
            <a href="#" class="text-white/70 hover:text-white transition-colors" aria-label="Twitter"><i class="ph-fill ph-twitter-logo text-2xl"></i></a>
          </div>

          <div class="mt-auto pt-6 border-t border-white/10 w-full lg:max-w-xs">
            <div class="flex flex-wrap gap-x-5 gap-y-1 text-xs font-bold text-white/60 mb-2">
              <a href="#" class="hover:text-white transition-colors">{{ t('footer.legal.privacy') }}</a>
              <a href="#" class="hover:text-white transition-colors">{{ t('footer.legal.terms') }}</a>
            </div>
            <p class="text-[10px] font-bold tracking-widest text-white/40 uppercase">
              © 2026 {{ t('footer.brandName') }}. {{ t('common.allRightsReserved') }}
            </p>
          </div>
        </div>

        <div class="lg:col-span-7">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 md:gap-12">
            
            <div class="hidden lg:flex flex-col gap-6">
              <h5 class="text-sm font-bold tracking-widest text-white border-b border-white/10 pb-3">
                {{ t('footer.medicalServices') }}
              </h5>
              <ul class="space-y-4 text-sm font-medium">
                <li><a href="#services" class="text-white/80 hover:text-white transition-colors">{{ t('nav.servicesMenu.featured') }}</a></li>
                <li><a href="#pharmacy" class="text-white/80 hover:text-white transition-colors">{{ t('nav.pharmacy') }}</a></li>
                <li><a href="#information" class="text-white/80 hover:text-white transition-colors">{{ t('nav.cases') }}</a></li>
                <li><a href="#partners" class="text-white/80 hover:text-white transition-colors">{{ t('nav.partners') }}</a></li>
              </ul>
            </div>

            <div class="flex flex-col gap-6">
              <h5 class="text-sm font-bold tracking-widest text-white border-b border-white/10 pb-3">
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
                      class="text-[11px] font-bold w-fit py-1.5 px-4 rounded-full border border-white/20 hover:bg-white hover:text-primary transition-all uppercase tracking-wide"
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
              <a href="https://maps.google.com" target="_blank" class="inline-flex items-center gap-2">
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