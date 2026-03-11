<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import {
  DialogDescription as DialogDescriptionPrimitive,
  type DialogDescriptionProps,
} from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes['class'] }>()
</script>

<template>
  <DialogDescriptionPrimitive
    v-bind="props"
    :class="cn('text-sm text-muted-foreground', props.class)"
  >
    <slot />
  </DialogDescriptionPrimitive>
</template>
