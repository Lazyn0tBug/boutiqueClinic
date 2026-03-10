<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DialogDescription as SheetDescriptionPrimitive, type DialogDescriptionProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes['class'] }>()
</script>

<template>
  <SheetDescriptionPrimitive
    v-bind="props"
    :class="cn('text-sm text-muted-foreground', props.class)"
  >
    <slot />
  </SheetDescriptionPrimitive>
</template>