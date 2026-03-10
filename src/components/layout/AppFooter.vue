<template>
  <footer class="bg-primary text-primary-foreground">
    <div class="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <!-- 主 Footer 區域 - 4欄佈局 -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
       
        <!-- 品牌與聯繫方式 -->
        <div class="col-span-2 md:col-span-1">
          <div class="flex items-center gap-2 font-bold text-lg mb-3 tracking-tight">
            <i class="ph-fill ph-cross text-white text-xl"></i> {{ t('footer.brandName') }}
          </div>
          <p class="text-xs text-primary-foreground/70 mb-4 leading-relaxed">
            {{ t('footer.brandDescription') }}
          </p>
          <div class="space-y-1.5 text-xs text-primary-foreground/80">
            <p class="flex items-center gap-2">
              <i class="ph ph-phone"></i> {{ t('footer.phone') }}
            </p>
            <p class="flex items-center gap-2">
              <i class="ph ph-envelope-simple"></i> {{ t('footer.email') }}
            </p>
            <p class="flex items-center gap-2">
              <i class="ph ph-clock"></i> {{ t('footer.hours') }}
            </p>
            <p class="flex items-center gap-2">
              <i class="ph ph-map-pin"></i> 
              <button @click="showMapModal = true" class="underline decoration-dotted hover:text-white">{{ t('common.viewMap') }}</button>
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
            <a href="#" class="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
              <i class="ph-fill ph-youtube-logo text-lg"></i>
            </a>
            <a href="#" class="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
              <i class="ph-fill ph-instagram-logo text-lg"></i>
            </a>
            <a href="#" class="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
              <i class="ph-fill ph-facebook-logo text-lg"></i>
            </a>
            <a href="#" class="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
              <i class="ph-fill ph-twitter-logo text-lg"></i>
            </a>
          </div>
          <!-- 官方頻道 -->
          <div class="text-xs text-primary-foreground/70">
            <p class="flex items-center gap-1.5 mb-2">
              <i class="ph-fill ph-youtube-logo text-red-400"></i> {{ t('footer.officialChannel') }}
            </p>
            <div class="flex gap-2">
              <div class="relative w-20 h-12 bg-primary-foreground/10 rounded overflow-hidden group cursor-pointer border border-primary-foreground/20">
                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=200" class="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" alt=""/>
                <i class="ph-fill ph-play-circle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg text-white drop-shadow"></i>
              </div>
              <div class="relative w-20 h-12 bg-primary-foreground/10 rounded overflow-hidden group cursor-pointer border border-primary-foreground/20">
                <img src="https://images.unsplash.com/photo-1551076805-e1869043e560?auto=format&fit=crop&q=80&w=200" class="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" alt=""/>
                <i class="ph-fill ph-play-circle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg text-white drop-shadow"></i>
              </div>
            </div>
          </div>
        </div>
       
      </div>
     
      <!-- 底部版權欄 -->
      <div class="border-t border-primary-foreground/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-primary-foreground/60">
        <p>{{ t('footer.copyright') }} {{ t('common.allRightsReserved') }}</p>
        <div class="flex gap-6 mt-3 md:mt-0">
          <a href="#" class="hover:text-primary-foreground transition-colors">{{ t('footer.legal.terms') }}</a>
          <a href="#" class="hover:text-primary-foreground transition-colors">{{ t('footer.legal.privacy') }}</a>
          <a href="#" class="hover:text-primary-foreground transition-colors">{{ t('footer.legal.cookies') }}</a>
        </div>
      </div>
    </div>

    <!-- 地圖彈窗 -->
    <div v-if="showMapModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click="showMapModal = false">
      <div class="bg-background rounded-lg shadow-2xl max-w-4xl w-full mx-4 overflow-hidden" @click.stop>
        <div class="flex items-center justify-between p-4 border-b border-border">
          <h3 class="font-semibold text-lg">{{ t('footer.mapModal.title') }}</h3>
          <button @click="showMapModal = false" class="p-2 hover:bg-accent rounded-full transition-colors">
            <i class="ph ph-x text-xl"></i>
          </button>
        </div>
        <div class="aspect-video bg-muted flex items-center justify-center">
          <div class="text-center p-8">
            <i class="ph ph-map-pin text-5xl text-muted-foreground mb-4"></i>
            <p class="font-medium text-lg mb-2">{{ t('footer.mapModal.mapPlaceholder') }}</p>
            <p class="text-muted-foreground">{{ t('footer.mapModal.address') }}</p>
            <a 
              href="https://maps.google.com" 
              target="_blank"
              class="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
            >
              <i class="ph ph-external-link"></i>
              {{ t('common.openInGoogleMaps') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const showMapModal = ref(false)
</script>