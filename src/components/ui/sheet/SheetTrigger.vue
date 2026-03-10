<script setup lang="ts">
import type { DialogTriggerProps } from 'reka-ui'
import { DialogTrigger as SheetTriggerPrimitive } from 'reka-ui'

const props = defineProps<DialogTriggerProps>()
</script>

<template>
  <SheetTriggerPrimitive v-bind="props">
    <slot />
  </SheetTriggerPrimitive>
</template>