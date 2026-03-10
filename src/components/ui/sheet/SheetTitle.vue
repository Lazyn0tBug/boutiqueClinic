<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DialogTitle as SheetTitlePrimitive, type DialogTitleProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes['class'] }>()
</script>

<template>
  <SheetTitlePrimitive
    v-bind="props"
    :class="cn('text-lg font-semibold text-foreground', props.class)"
  >
    <slot />
  </SheetTitlePrimitive>
</template>