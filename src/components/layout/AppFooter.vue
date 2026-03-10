<template>
  <footer class="bg-primary text-primary-foreground">
    <!-- 自媒體櫥窗區 -->
    <div class="border-b border-primary-foreground/10">
      <div class="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <div>
            <h4 class="text-base font-bold flex items-center gap-2 text-primary-foreground">
              <i class="ph-fill ph-youtube-logo text-red-400 text-xl"></i> 官方科普頻道
            </h4>
            <p class="text-xs text-primary-foreground/80 mt-1">關注 YouTube 和 Instagram，獲取醫療資訊。</p>
          </div>
          <div class="flex gap-3">
            <div class="relative w-28 h-16 bg-primary-foreground/10 rounded-md overflow-hidden group cursor-pointer border border-primary-foreground/20">
              <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=200" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-300" alt=""/>
              <i class="ph-fill ph-play-circle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-white shadow-sm drop-shadow-md"></i>
            </div>
            <div class="relative w-28 h-16 bg-primary-foreground/10 rounded-md overflow-hidden group cursor-pointer border border-primary-foreground/20 hidden sm:block">
              <img src="https://images.unsplash.com/photo-1551076805-e1869043e560?auto=format&fit=crop&q=80&w=200" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-300" alt=""/>
              <i class="ph-fill ph-play-circle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-white shadow-sm drop-shadow-md"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主 Footer 區域 -->
    <div class="max-w-7xl mx-auto px-4 py-8 md:py-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
       
        <!-- 品牌與聯繫方式 -->
        <div>
          <div class="flex items-center gap-2 font-bold text-xl mb-3 tracking-tight text-primary-foreground">
            <i class="ph-fill ph-cross text-white"></i> 醫療法人德智會
          </div>
          <p class="text-xs text-primary-foreground/80 mb-4 leading-relaxed">
            致力於為全球患者提供日本高水準的醫療服務。
          </p>
          <div class="space-y-2 text-xs font-medium text-primary-foreground/90">
            <p class="flex items-center gap-2"><i class="ph ph-phone text-base"></i> +81 03-1234-5678</p>
            <p class="flex items-center gap-2"><i class="ph ph-envelope-simple text-base"></i> contact@tokuchikai.jp</p>
            <p class="flex items-center gap-2"><i class="ph ph-clock text-base"></i> 週一至週六 09:00 - 18:00</p>
            <p class="flex items-center gap-2"><i class="ph ph-map-pin text-base"></i> 
              <button @click="showMapModal = true" class="hover:text-white underline decoration-dotted">查看地圖</button>
            </p>
          </div>
        </div>

        <!-- 快速鏈接 -->
        <div class="flex flex-col gap-2 text-xs">
          <h5 class="font-bold text-primary-foreground uppercase tracking-wider mb-1">快速導航</h5>
          <a href="#" class="text-primary-foreground/80 hover:text-primary-foreground transition-colors">雲問診預約</a>
          <a href="#" class="text-primary-foreground/80 hover:text-primary-foreground transition-colors">門診就醫指南</a>
          <a href="#" class="text-primary-foreground/80 hover:text-primary-foreground transition-colors">醫療簽證協助</a>
          <a href="#" class="text-primary-foreground/80 hover:text-primary-foreground transition-colors">隱私政策</a>
        </div>

        <!-- 社交媒體 -->
        <div>
          <h5 class="font-bold text-primary-foreground uppercase tracking-wider mb-3 text-xs">關注我們</h5>
          <div class="flex gap-4">
            <a href="#" class="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
              <i class="ph-fill ph-youtube-logo text-xl"></i>
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
              <i class="ph-fill ph-instagram-logo text-xl"></i>
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
              <i class="ph-fill ph-facebook-logo text-xl"></i>
            </a>
          </div>
        </div>
       
      </div>
     
      <div class="border-t border-primary-foreground/10 mt-6 md:mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-primary-foreground/70">
        <p>&copy; 2026 醫療法人德智會。</p>
        <div class="flex gap-4 mt-3 md:mt-0 text-sm">
          <a href="#" class="hover:text-primary-foreground transition-colors">Terms</a>
          <a href="#" class="hover:text-primary-foreground transition-colors">Privacy</a>
          <a href="#" class="hover:text-primary-foreground transition-colors">Cookies</a>
        </div>
      </div>
    </div>

    <!-- 地圖彈窗 -->
    <div v-if="showMapModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click="showMapModal = false">
      <div class="bg-background rounded-lg shadow-2xl max-w-4xl w-full mx-4 overflow-hidden" @click.stop>
        <div class="flex items-center justify-between p-4 border-b border-border">
          <h3 class="font-semibold text-lg">醫療法人德智會 - 位置</h3>
          <button @click="showMapModal = false" class="p-2 hover:bg-accent rounded-full transition-colors">
            <i class="ph ph-x text-xl"></i>
          </button>
        </div>
        <div class="aspect-video bg-muted flex items-center justify-center">
          <div class="text-center p-8">
            <i class="ph ph-map-pin text-5xl text-muted-foreground mb-4"></i>
            <p class="font-medium text-lg mb-2">Google Maps 地圖組件</p>
            <p class="text-muted-foreground">日本東京都港區櫻花大道 1-2-3</p>
            <a 
              href="https://maps.google.com" 
              target="_blank"
              class="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
            >
              <i class="ph ph-external-link"></i>
              在 Google Maps 中打開
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showMapModal = ref(false)
</script>