# 組件設計規範

## 設計原則

### 1. 單一職責原則
每個組件只負責一個功能模塊,保持組件的簡潔和可維護性。

### 2. 可復用性
組件設計時考慮復用場景,通過 Props 和 Slots 提供靈活性。

### 3. 類型安全
使用 TypeScript 定義所有 Props、Emits 和內部狀態的類型。

### 4. 響應式優先
所有組件必須支持響應式佈局,使用 Tailwind 的響應式工具類。

---

## 組件分類

### Common 組件 (通用組件)
位於 `src/components/common/`,可在任何頁面使用。

#### Button 組件
```vue
<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    :class="[
      'btn',
      `btn-${variant}`,
      `btn-${size}`,
      { 'loading': loading }
    ]"
    :disabled="disabled || loading"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>
```

#### Card 組件
```vue
<script setup lang="ts">
interface Props {
  title?: string
  image?: string
  bordered?: boolean
  hoverable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  bordered: false,
  hoverable: false,
})
</script>

<template>
  <div
    :class="[
      'card bg-base-100',
      { 'border border-base-200': bordered },
      { 'hover:shadow-xl transition-shadow': hoverable }
    ]"
  >
    <figure v-if="image" class="overflow-hidden">
      <img :src="image" :alt="title" class="w-full h-full object-cover" />
    </figure>
    <div class="card-body">
      <h2 v-if="title" class="card-title">{{ title }}</h2>
      <slot />
      <div v-if="$slots.actions" class="card-actions justify-end">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
```

### Layout 組件 (佈局組件)
位於 `src/components/layout/`,定義頁面結構。

#### AppHeader 組件結構
```typescript
interface NavItem {
  label: string
  path: string
  children?: NavItem[]
}

interface Props {
  navItems: NavItem[]
  currentLocale: string
  availableLocales: Locale[]
}
```

#### AppFooter 組件結構
```typescript
interface FooterLink {
  label: string
  path: string
}

interface SocialLink {
  platform: 'youtube' | 'instagram' | 'twitter' | 'facebook'
  url: string
}

interface Props {
  quickLinks: FooterLink[]
  socialLinks: SocialLink[]
  contactInfo: ContactInfo
}
```

### Feature 組件 (功能組件)
位於 `src/components/features/`,特定功能的組件。

#### ServiceCard 組件
```vue
<script setup lang="ts">
import type { Service } from '@/types/service'

interface Props {
  service: Service
  locale: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  viewDetail: [serviceId: string]
}>()

const localizedName = computed(() => props.service.name[props.locale])
const localizedDescription = computed(() => props.service.description[props.locale])
</script>

<template>
  <div class="card bg-base-100 shadow-lg group overflow-hidden">
    <figure class="h-56 overflow-hidden">
      <img
        :src="service.image"
        :alt="localizedName"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title text-xl text-primary">{{ localizedName }}</h2>
      <p class="text-sm text-gray-600">{{ localizedDescription }}</p>
      <div class="card-actions justify-end mt-auto">
        <button
          class="btn btn-outline btn-sm btn-primary"
          @click="emit('viewDetail', service.id)"
        >
          {{ $t('common.viewDetail') }}
        </button>
      </div>
    </div>
  </div>
</template>
```

#### DoctorCard 組件
```vue
<script setup lang="ts">
import type { Doctor } from '@/types/doctor'

interface Props {
  doctor: Doctor
  locale: string
}

const props = defineProps<Props>()

const localizedName = computed(() => props.doctor.name[props.locale])
const localizedTitle = computed(() => props.doctor.title[props.locale])
const localizedBio = computed(() => props.doctor.bio[props.locale])
</script>

<template>
  <div class="card bg-white border border-slate-100 text-center py-8 hover:shadow-lg transition-shadow">
    <div class="avatar mx-auto mb-4">
      <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
        <img :src="doctor.avatar" :alt="localizedName" />
      </div>
    </div>
    <h3 class="font-bold text-lg text-gray-800">{{ localizedName }}</h3>
    <p class="text-sm text-primary font-medium mb-2">{{ localizedTitle }}</p>
    <p class="text-xs text-gray-500 px-4">{{ localizedBio }}</p>
  </div>
</template>
```

---

## 組合式函數 (Composables)

### useI18n 封裝
```typescript
// src/composables/useLocale.ts
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'

export function useLocale() {
  const { t, locale } = useI18n()
  const appStore = useAppStore()

  const changeLocale = (newLocale: string) => {
    locale.value = newLocale
    appStore.setLocale(newLocale)
  }

  return {
    t,
    locale,
    changeLocale,
  }
}
```

### useSEO
```typescript
// src/composables/useSEO.ts
import { useHead } from '@vueuse/head'

interface SEOOptions {
  title: string
  description: string
  keywords?: string[]
  image?: string
  locale?: string
}

export function useSEO(options: SEOOptions) {
  useHead({
    title: options.title,
    meta: [
      { name: 'description', content: options.description },
      { name: 'keywords', content: options.keywords?.join(', ') },
      { property: 'og:title', content: options.title },
      { property: 'og:description', content: options.description },
      { property: 'og:image', content: options.image },
      { property: 'og:locale', content: options.locale },
    ],
  })
}
```

### useAsync
```typescript
// src/composables/useAsync.ts
import { ref } from 'vue'

export function useAsync<T>(asyncFn: () => Promise<T>) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)

  const execute = async () => {
    loading.value = true
    error.value = null
    try {
      data.value = await asyncFn()
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    error,
    loading,
    execute,
  }
}
```

---

## 樣式規範

### Tailwind 工具類使用
```vue
<!-- 響應式佈局 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- 內容 -->
</div>

<!-- 間距規範 -->
<div class="p-4 md:p-6 lg:p-8">  <!-- 內邊距 -->
<div class="mb-4 md:mb-6 lg:mb-8">  <!-- 外邊距 -->

<!-- 文字大小 -->
<h1 class="text-2xl md:text-3xl lg:text-4xl font-bold">
<p class="text-sm md:text-base">

<!-- 顏色使用 -->
<div class="bg-primary text-primary-content">  <!-- 主色 -->
<div class="bg-secondary text-secondary-content">  <!-- 次色 -->
<div class="bg-base-100 text-base-content">  <!-- 背景色 -->
```

### DaisyUI 組件使用
```vue
<!-- 按鈕 -->
<button class="btn btn-primary">主要按鈕</button>
<button class="btn btn-secondary">次要按鈕</button>
<button class="btn btn-outline btn-primary">輪廓按鈕</button>

<!-- 卡片 -->
<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">卡片標題</h2>
    <p>卡片內容</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">操作</button>
    </div>
  </div>
</div>

<!-- 導航欄 -->
<div class="navbar bg-base-100">
  <div class="navbar-start">...</div>
  <div class="navbar-center">...</div>
  <div class="navbar-end">...</div>
</div>
```

---

## 無障礙性 (Accessibility)

### 語義化 HTML
```vue
<!-- 使用正確的語義標籤 -->
<header>...</header>
<nav>...</nav>
<main>...</main>
<article>...</article>
<aside>...</aside>
<footer>...</footer>
```

### ARIA 屬性
```vue
<!-- 按鈕 -->
<button aria-label="關閉對話框" @click="closeDialog">
  <i class="ph ph-x"></i>
</button>

<!-- 導航 -->
<nav aria-label="主導航">
  <ul>...</ul>
</nav>

<!-- 表單 -->
<label for="email">電子郵件</label>
<input id="email" type="email" aria-required="true" />
```

### 鍵盤導航
```vue
<script setup>
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    // 處理鍵盤事件
  }
}
</script>

<template>
  <div
    role="button"
    tabindex="0"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    可點擊元素
  </div>
</template>
```

---

## 性能優化

### 圖片懶加載
```vue
<script setup>
import { useIntersectionObserver } from '@vueuse/core'

const imgRef = ref<HTMLImageElement>()
const isVisible = ref(false)

useIntersectionObserver(imgRef, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    isVisible.value = true
  }
})
</script>

<template>
  <img
    ref="imgRef"
    :src="isVisible ? actualSrc : placeholderSrc"
    alt="..."
  />
</template>
```

### 組件懶加載
```typescript
// 路由懶加載
const ServicesView = () => import('@/views/ServicesView.vue')

// 組件懶加載
const HeavyComponent = defineAsyncComponent(() =>
  import('@/components/HeavyComponent.vue')
)
```

---

## 測試規範

### 組件測試模板
```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ServiceCard from '@/components/features/ServiceCard.vue'

describe('ServiceCard', () => {
  const mockService = {
    id: '1',
    name: { 'zh-TW': '精密體檢' },
    description: { 'zh-TW': '高精度檢查' },
    image: '/test.jpg',
  }

  it('renders service name correctly', () => {
    const wrapper = mount(ServiceCard, {
      props: {
        service: mockService,
        locale: 'zh-TW',
      },
    })
    expect(wrapper.text()).toContain('精密體檢')
  })

  it('emits viewDetail event when button clicked', async () => {
    const wrapper = mount(ServiceCard, {
      props: {
        service: mockService,
        locale: 'zh-TW',
      },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('viewDetail')).toBeTruthy()
    expect(wrapper.emitted('viewDetail')?.[0]).toEqual(['1'])
  })
})
```

---

## 最佳實踐

### 1. 使用 Composition API
```vue
<script setup lang="ts">
// ✅ 推薦
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
</script>
```

### 2. Props 驗證
```typescript
// ✅ 推薦
interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
})
```

### 3. Emits 類型定義
```typescript
// ✅ 推薦
const emit = defineEmits<{
  update: [value: string]
  delete: [id: number]
}>()
```

### 4. 使用 Slots
```vue
<template>
  <div class="container">
    <slot name="header" />
    <slot />  <!-- 默認插槽 -->
    <slot name="footer" />
  </div>
</template>
```

### 5. 錯誤處理
```vue
<script setup>
const { data, error, loading, execute } = useAsync(fetchData)

onMounted(() => {
  execute()
})
</script>

<template>
  <div v-if="loading">載入中...</div>
  <div v-else-if="error">錯誤: {{ error.message }}</div>
  <div v-else>{{ data }}</div>
</template>
```
