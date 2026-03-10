<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Container } from '@/components/ui/container'

const { t } = useI18n()
const showMapModal = ref(false)
</script>

<template>
  <footer class="bg-primary text-primary-foreground">
    <Container class="py-8 md:py-12">
      <!-- 主 Footer 區域 - 4欄佈局 -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
       
        <!-- 品牌與聯繫方式 -->
        <div class="col-span-2 md:col-span-1">
          <div class="flex items-center gap-2 font-bold text-lg mb-3 tracking-tight">
            <i class="ph-fill ph-cross text-white text-xl"></i> {{ t('footer.brandName') }}
          </div>
          <p class="text-xs text-primary-foreground/70 mb-4 leading-relaxed text-pretty">
            {{ t('footer.brandDescription') }}
          </p>
          <div class="space-y-1.5 text-xs text-primary-foreground/80">
            <p class="flex items-center gap-2 min-h-[20px]">
              <i class="ph ph-phone"></i> {{ t('footer.phone') }}
            </p>
            <p class="flex items-center gap-2 min-h-[20px]">
              <i class="ph ph-envelope-simple"></i> {{ t('footer.email') }}
            </p>
            <p class="flex items-center gap-2 min-h-[20px]">
              <i class="ph ph-clock"></i> {{ t('footer.hours') }}
            </p>
            <p class="flex items-center gap-2 min-h-[20px]">
              <i class="ph ph-map-pin"></i> 
              <Button variant="link" class="h-auto p-0 text-xs underline decoration-dotted min-h-[20px]" @click="showMapModal = true">
                {{ t('common.viewMap') }}
              </Button>
            </p>
          </div>
        </div>

        <!-- 醫療服務 -->
        <div>
          <h5 class="font-semibold text-sm mb-3">{{ t('footer.medicalServices') }}</h5>
          <ul class="space-y-1.5 text-xs text-primary-foreground/70">
            <li><a href="#" class="hover:text-primary-foreground transition-colors">{{ t('footer.quickLinks.checkup') }}</a></li>
            <li><a href="#" class="hover:text-primary-foreground transition-colors">{{ t('footer.quickLinks.referral') }}</a></li>
            <li><a href="#" class="hover:text-primary-foreground transition-colors">{{ t('footer.quickLinks.stemCell') }}</a></li>
            <li><a href="#" class="hover:text-primary-foreground transition-colors">{{ t('footer.quickLinks.consultation') }}</a></li>
            <li><a href="#" class="hover:text-primary-foreground transition-colors">{{ t('footer.quickLinks.pharmacy') }}</a></li>
          </ul>
        </div>

        <!-- 幫助支持 -->
        <div>
          <h5 class="font-semibold text-sm mb-3">{{ t('footer.helpSupport') }}</h5>
          <ul class="space-y-1.5 text-xs text-primary-foreground/70">
            <li><a href="#" class="hover:text-primary-foreground transition-colors">{{ t('footer.supportLinks.guide') }}</a></li>
            <li><a href="#" class="hover:text-primary-foreground transition-colors">{{ t('footer.supportLinks.visa') }}</a></li>
            <li><a href="#" class="hover:text-primary-foreground transition-colors">{{ t('footer.supportLinks.fees') }}</a></li>
            <li><a href="#" class="hover:text-primary-foreground transition-colors">{{ t('footer.supportLinks.faq') }}</a></li>
            <li><a href="#" class="hover:text-primary-foreground transition-colors">{{ t('footer.supportLinks.contact') }}</a></li>
          </ul>
        </div>

        <!-- 關注我們 -->
        <div>
          <h5 class="font-semibold text-sm mb-3">{{ t('footer.followUs') }}</h5>
          <div class="flex gap-2 mb-4">
            <Button variant="ghost" size="icon" class="w-11 h-11 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 min-h-[44px] min-w-[44px]">
              <i class="ph-fill ph-youtube-logo text-lg"></i>
            </Button>
            <Button variant="ghost" size="icon" class="w-11 h-11 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 min-h-[44px] min-w-[44px]">
              <i class="ph-fill ph-instagram-logo text-lg"></i>
            </Button>
            <Button variant="ghost" size="icon" class="w-11 h-11 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 min-h-[44px] min-w-[44px]">
              <i class="ph-fill ph-facebook-logo text-lg"></i>
            </Button>
            <Button variant="ghost" size="icon" class="w-11 h-11 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 min-h-[44px] min-w-[44px]">
              <i class="ph-fill ph-twitter-logo text-lg"></i>
            </Button>
          </div>
          <!-- 官方頻道 -->
          <div class="text-xs text-primary-foreground/70">
            <p class="flex items-center gap-1.5 mb-2">
              <i class="ph-fill ph-youtube-logo text-red-400"></i> {{ t('footer.officialChannel') }}
            </p>
            <div class="flex gap-2">
              <div class="relative w-20 aspect-video bg-primary-foreground/10 rounded overflow-hidden group cursor-pointer border border-primary-foreground/20">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=200" 
                  srcset="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=100 100w, https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=200 200w, https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400 400w"
                  sizes="80px"
                  class="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" 
                  alt=""
                  loading="lazy"
                />
                <i class="ph-fill ph-play-circle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg text-white drop-shadow"></i>
              </div>
              <div class="relative w-20 aspect-video bg-primary-foreground/10 rounded overflow-hidden group cursor-pointer border border-primary-foreground/20">
                <img 
                  src="https://images.unsplash.com/photo-1551076805-e1869043e560?auto=format&fit=crop&q=80&w=200" 
                  srcset="https://images.unsplash.com/photo-1551076805-e1869043e560?auto=format&fit=crop&q=80&w=100 100w, https://images.unsplash.com/photo-1551076805-e1869043e560?auto=format&fit=crop&q=80&w=200 200w, https://images.unsplash.com/photo-1551076805-e1869043e560?auto=format&fit=crop&q=80&w=400 400w"
                  sizes="80px"
                  class="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" 
                  alt=""
                  loading="lazy"
                />
                <i class="ph-fill ph-play-circle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg text-white drop-shadow"></i>
              </div>
            </div>
          </div>
        </div>
       
      </div>
     
      <!-- 底部版權欄 -->
      <Separator class="mt-8 bg-primary-foreground/10" />
      <div class="pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-primary-foreground/60">
        <p>{{ t('footer.copyright') }} {{ t('common.allRightsReserved') }}</p>
        <div class="flex gap-6 mt-3 md:mt-0">
          <a href="#" class="hover:text-primary-foreground transition-colors min-h-[44px] flex items-center">{{ t('footer.legal.terms') }}</a>
          <a href="#" class="hover:text-primary-foreground transition-colors min-h-[44px] flex items-center">{{ t('footer.legal.privacy') }}</a>
          <a href="#" class="hover:text-primary-foreground transition-colors min-h-[44px] flex items-center">{{ t('footer.legal.cookies') }}</a>
        </div>
      </div>
    </Container>

    <!-- 地圖彈窗 -->
    <Dialog v-model:open="showMapModal">
      <DialogContent class="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{{ t('footer.mapModal.title') }}</DialogTitle>
        </DialogHeader>
        <div class="aspect-video bg-muted flex items-center justify-center scroll-container">
          <div class="text-center p-8">
            <i class="ph ph-map-pin text-5xl text-muted-foreground mb-4"></i>
            <p class="font-medium text-lg mb-2">{{ t('footer.mapModal.mapPlaceholder') }}</p>
            <p class="text-muted-foreground">{{ t('footer.mapModal.address') }}</p>
            <Button as-child class="mt-4 min-h-[44px]">
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