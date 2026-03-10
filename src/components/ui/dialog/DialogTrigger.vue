<script setup lang="ts">
import type { DialogTriggerProps } from 'reka-ui'
import { DialogTrigger as DialogTriggerPrimitive } from 'reka-ui'

const props = defineProps<DialogTriggerProps>()
</script>

<template>
  <DialogTriggerPrimitive v-bind="props">
    <slot />
  </DialogTriggerPrimitive>
</template>