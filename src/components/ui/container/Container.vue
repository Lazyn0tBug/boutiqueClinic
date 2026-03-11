<script setup lang="ts">
import { computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  /**
   * 渲染的 HTML 标签，默认为 div (增强语义化与无障碍性)
   * @example as="section" | as="main" | as="article" | as="header"
   */
  as?: string
  /**
   * 容器大小 (全部基于 rem 相对单位)
   * - sm: max-w-3xl (48rem) - 窄容器，用于文章、详情页
   * - md: max-w-5xl (64rem) - 中等容器
   * - lg: max-w-7xl (80rem) - 标准容器，用于大多数页面区块
   * - xl: max-w-[90rem] - 宽容器，等同于 1440px，用于 Hero、大图展示
   * - full: 无最大宽度限制
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** 是否移除水平内边距 */
  noPadding?: boolean
  /**
   * 自定义类名
   */
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  size: 'lg',
  noPadding: false,
})

const sizeClasses = {
  sm: 'max-w-3xl',      // 48rem
  md: 'max-w-5xl',      // 64rem
  lg: 'max-w-7xl',      // 80rem
  xl: 'max-w-[90rem]',  // 90rem (完美替换了 1440px)
  full: 'max-w-full',
}

const containerClass = computed(() =>
  cn(
    // 基础布局：满宽且居中
    'w-full mx-auto',
    // 注入最大宽度限制
    sizeClasses[props.size],
    // ✨ 核心优化：直接使用我们在 main.css 写的无级缩放流体边距！
    // 彻底抛弃 px-4 md:px-6 lg:px-8 这种阶梯式断点
    !props.noPadding && 'page-padding-x', 
    // 合并外部传入的 class
    props.class
  )
)
</script>

<template>
  <component :is="as" :class="containerClass">
    <slot />
  </component>
</template>