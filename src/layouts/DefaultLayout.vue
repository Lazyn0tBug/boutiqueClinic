<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <div class="min-h-[100dvh] flex flex-col page-container relative">
    
    <AppHeader />
    
    <main class="flex-1 flex flex-col w-full">
      <router-view />
    </main>
    
    <AppFooter />
    
  </div>
</template>