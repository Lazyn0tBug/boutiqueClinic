<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col scroll-container page-container">
    <AppHeader />
    <main class="flex-1 page-content">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
/* 页面级容器查询 - 响应式排版调整 */
.page-container {
  container-type: inline-size;
  container-name: page;
}

/* 大容器中的全局排版调整 */
@container page (min-width: 1280px) {
  .page-content {
    --page-spacing: 2rem;
  }
}

@container page (min-width: 1024px) and (max-width: 1279px) {
  .page-content {
    --page-spacing: 1.5rem;
  }
}

@container page (min-width: 768px) and (max-width: 1023px) {
  .page-content {
    --page-spacing: 1.25rem;
  }
}

@container page (min-width: 640px) and (max-width: 767px) {
  .page-content {
    --page-spacing: 1rem;
  }
}

@container page (max-width: 639px) {
  .page-content {
    --page-spacing: 0.75rem;
  }
}
</style>
