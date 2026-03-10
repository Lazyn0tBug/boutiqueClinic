<template>
  <footer class="bg-primary text-primary-foreground">
    <!-- 自媒體櫥窗區 -->
    <div class="border-b border-primary-foreground/10">
      <div class="max-w-7xl mx-auto px-4 py-10">
        <div class="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h4 class="text-lg font-bold flex items-center gap-2 text-primary-foreground">
              <i class="ph-fill ph-youtube-logo text-red-400 text-2xl"></i> 官方科普頻道
            </h4>
            <p class="text-sm text-primary-foreground/80 mt-2">關注我們的 YouTube 和 Instagram，獲取最新前沿醫療資訊。</p>
          </div>
          <div class="flex gap-4">
            <div class="relative w-36 h-20 bg-primary-foreground/10 rounded-md overflow-hidden group cursor-pointer border border-primary-foreground/20">
              <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=200" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-300" alt=""/>
              <i class="ph-fill ph-play-circle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-white shadow-sm drop-shadow-md"></i>
            </div>
            <div class="relative w-36 h-20 bg-primary-foreground/10 rounded-md overflow-hidden group cursor-pointer border border-primary-foreground/20 hidden sm:block">
              <img src="https://images.unsplash.com/photo-1551076805-e1869043e560?auto=format&fit=crop&q=80&w=200" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-300" alt=""/>
              <i class="ph-fill ph-play-circle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-white shadow-sm drop-shadow-md"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主 Footer 區域 -->
    <div class="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12">
       
        <!-- 品牌與聯繫方式 -->
        <div class="md:col-span-5 lg:col-span-4">
          <div class="flex items-center gap-2 font-bold text-2xl mb-6 tracking-tight text-primary-foreground">
            <i class="ph-fill ph-cross text-white"></i> 醫療法人德智會
          </div>
          <p class="text-sm text-primary-foreground/80 mb-8 leading-relaxed max-w-sm">
            致力於為全球患者提供日本高水準的醫療服務。涵蓋門診、急診、重症轉診、高端體檢及常用藥諮詢。
          </p>
          <div class="space-y-4 text-sm font-medium text-primary-foreground/90">
            <p class="flex items-center gap-3"><i class="ph ph-phone text-lg"></i> +81 03-1234-5678 (支持中文)</p>
            <p class="flex items-center gap-3"><i class="ph ph-envelope-simple text-lg"></i> contact@tokuchikai.jp</p>
            <p class="flex items-center gap-3"><i class="ph ph-clock text-lg"></i> 門診時間：週一至週六 09:00 - 18:00</p>
          </div>
        </div>

        <!-- 快速鏈接 -->
        <div class="md:col-span-3 lg:col-span-2 flex flex-col gap-4 text-sm">
          <h5 class="font-bold text-primary-foreground uppercase tracking-wider mb-2">快速導航</h5>
          <a href="#" class="text-primary-foreground/80 hover:text-primary-foreground transition-colors">雲問診預約</a>
          <a href="#" class="text-primary-foreground/80 hover:text-primary-foreground transition-colors">門診就醫指南</a>
          <a href="#" class="text-primary-foreground/80 hover:text-primary-foreground transition-colors">醫療簽證協助</a>
          <a href="#" class="text-primary-foreground/80 hover:text-primary-foreground transition-colors">隱私政策</a>
        </div>

        <!-- 地圖區域 -->
        <div class="md:col-span-4 lg:col-span-6 rounded-lg overflow-hidden bg-primary-foreground/10 relative min-h-[200px] border border-primary-foreground/20">
          <div class="absolute inset-0 flex flex-col items-center justify-center bg-primary/80 backdrop-blur-sm z-10">
            <i class="ph ph-map-pin text-3xl text-white mb-2"></i>
            <p class="font-medium text-primary-foreground">Google Maps 地圖組件</p>
            <p class="text-xs text-primary-foreground/80 mt-1">日本東京都港區櫻花大道 1-2-3</p>
          </div>
          <!-- 混色效果修改為更符合 Shadcn 亮色模式的感覺 -->
          <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover opacity-30 mix-blend-overlay grayscale" alt="">
        </div>
       
      </div>
     
      <div class="border-t border-primary-foreground/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/70">
        <p>&copy; 2026 醫療法人德智會. All rights reserved.</p>
        <div class="flex gap-5 mt-4 md:mt-0 text-xl">
          <a href="#" class="hover:text-primary-foreground transition-colors"><i class="ph-fill ph-instagram-logo"></i></a>
          <a href="#" class="hover:text-primary-foreground transition-colors"><i class="ph-fill ph-twitter-logo"></i></a>
          <a href="#" class="hover:text-primary-foreground transition-colors"><i class="ph-fill ph-facebook-logo"></i></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer 無需任何 JS 邏輯，純粹依靠 Tailwind CSS 控制樣式
</script>