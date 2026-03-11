<template>
  <div class="about min-h-screen flex flex-col items-center justify-center p-8 scroll-container">
    <h1 class="text-balance">{{ t('about.title') }}</h1>
    <p class="text-muted-foreground mt-2 text-pretty max-w-2xl text-center">
      {{ t('about.subtitle') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
