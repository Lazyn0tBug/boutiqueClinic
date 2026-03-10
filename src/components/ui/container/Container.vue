<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  /**
   * 容器大小
   * - sm: max-w-3xl (768px) - 窄容器，用于文章、详情页
   * - md: max-w-5xl (1024px) - 中等容器
   * - lg: max-w-7xl (1280px) - 标准容器，用于大多数页面区块
   * - xl: max-w-[1440px] - 宽容器，用于 Hero、大图展示
   * - full: 无最大宽度限制
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** 是否移除水平内边距 */
  noPadding?: boolean
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'lg',
  noPadding: false,
})

const sizeClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[1440px]',
  full: 'max-w-full',
}

const containerClass = computed(() =>
  cn(
    'mx-auto',
    sizeClasses[props.size],
    !props.noPadding && 'px-4 md:px-6 lg:px-8',
    props.class
  )
)
</script>

<template>
  <div :class="containerClass">
    <slot />
  </div>
</template>