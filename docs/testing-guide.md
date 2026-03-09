# 測試規範與指南

## 測試策略

本項目採用多層次測試策略,確保代碼質量和功能正確性。

### 測試金字塔
```
        /\
       /  \      E2E 測試 (少量)
      /----\
     /      \    集成測試 (適量)
    /--------\
   /          \  單元測試 (大量)
  /____________\
```

---

## 單元測試

### 測試工具
- **Vitest**: 測試運行器
- **Vue Test Utils**: Vue 組件測試工具
- **@vitest/ui**: 測試 UI 界面

### 組件測試

#### 基礎組件測試
```typescript
// tests/components/common/Button.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '@/components/common/Button.vue'

describe('Button Component', () => {
  it('renders slot content', () => {
    const wrapper = mount(Button, {
      slots: {
        default: '點擊我',
      },
    })
    expect(wrapper.text()).toBe('點擊我')
  })

  it('applies correct variant class', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'primary',
      },
    })
    expect(wrapper.classes()).toContain('btn-primary')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('shows loading state', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
    })
    expect(wrapper.classes()).toContain('loading')
  })
})
```

#### 功能組件測試
```typescript
// tests/components/features/ServiceCard.spec.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ServiceCard from '@/components/features/ServiceCard.vue'
import type { Service } from '@/types/service'

describe('ServiceCard Component', () => {
  const mockService: Service = {
    id: 'service-1',
    name: {
      'zh-TW': '精密體檢',
      'zh-CN': '精密体检',
      'en': 'Health Checkup',
      'ja': '人間ドック',
    },
    description: {
      'zh-TW': '高精度全身檢查',
      'zh-CN': '高精度全身检查',
      'en': 'Comprehensive health screening',
      'ja': '高精度全身検査',
    },
    image: '/images/service-1.jpg',
    category: 'checkup',
    features: ['PET-CT', 'MRI', '血液檢查'],
  }

  it('renders service name in correct locale', () => {
    const wrapper = mount(ServiceCard, {
      props: {
        service: mockService,
        locale: 'zh-TW',
      },
    })
    expect(wrapper.text()).toContain('精密體檢')
  })

  it('renders service description', () => {
    const wrapper = mount(ServiceCard, {
      props: {
        service: mockService,
        locale: 'zh-TW',
      },
    })
    expect(wrapper.text()).toContain('高精度全身檢查')
  })

  it('displays service image', () => {
    const wrapper = mount(ServiceCard, {
      props: {
        service: mockService,
        locale: 'zh-TW',
      },
    })
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('/images/service-1.jpg')
    expect(img.attributes('alt')).toBe('精密體檢')
  })

  it('emits viewDetail event with service id', async () => {
    const wrapper = mount(ServiceCard, {
      props: {
        service: mockService,
        locale: 'zh-TW',
      },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('viewDetail')).toBeTruthy()
    expect(wrapper.emitted('viewDetail')?.[0]).toEqual(['service-1'])
  })

  it('changes language when locale prop changes', async () => {
    const wrapper = mount(ServiceCard, {
      props: {
        service: mockService,
        locale: 'zh-TW',
      },
    })
    expect(wrapper.text()).toContain('精密體檢')

    await wrapper.setProps({ locale: 'en' })
    expect(wrapper.text()).toContain('Health Checkup')
  })
})
```

### Composables 測試
```typescript
// tests/composables/useLocale.spec.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useLocale } from '@/composables/useLocale'

describe('useLocale', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('returns current locale', () => {
    const { locale } = useLocale()
    expect(locale.value).toBeDefined()
  })

  it('changes locale', () => {
    const { locale, changeLocale } = useLocale()
    changeLocale('en')
    expect(locale.value).toBe('en')
  })

  it('persists locale to localStorage', () => {
    const { changeLocale } = useLocale()
    changeLocale('ja')
    expect(localStorage.getItem('locale')).toBe('ja')
  })
})
```

### Store 測試
```typescript
// tests/stores/app.spec.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAppStore } from '@/stores/app'

describe('App Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('initializes with default locale', () => {
    const store = useAppStore()
    expect(store.locale).toBe('zh-TW')
  })

  it('sets locale', () => {
    const store = useAppStore()
    store.setLocale('en')
    expect(store.locale).toBe('en')
  })

  it('persists locale to localStorage', () => {
    const store = useAppStore()
    store.setLocale('ja')
    expect(localStorage.getItem('locale')).toBe('ja')
  })

  it('loads locale from localStorage', () => {
    localStorage.setItem('locale', 'zh-CN')
    const store = useAppStore()
    expect(store.locale).toBe('zh-CN')
  })

  it('returns available locales', () => {
    const store = useAppStore()
    expect(store.availableLocales).toEqual(['zh-TW', 'zh-CN', 'en', 'ja'])
  })
})
```

---

## 集成測試

### 路由測試
```typescript
// tests/integration/router.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import App from '@/App.vue'
import routes from '@/router/routes'

describe('Router Integration', () => {
  it('navigates to home page', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    })

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    await router.push('/')
    await router.isReady()

    expect(wrapper.html()).toContain('首頁內容')
  })

  it('navigates to services page', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    })

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    await router.push('/services')
    await router.isReady()

    expect(wrapper.html()).toContain('醫療服務')
  })

  it('redirects to 404 for unknown routes', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    })

    await router.push('/unknown-route')
    await router.isReady()

    expect(router.currentRoute.value.name).toBe('not-found')
  })
})
```

### 國際化測試
```typescript
// tests/integration/i18n.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import AppHeader from '@/components/layout/AppHeader.vue'
import zhTW from '@/locales/zh-TW.json'
import en from '@/locales/en.json'

describe('i18n Integration', () => {
  const i18n = createI18n({
    legacy: false,
    locale: 'zh-TW',
    messages: {
      'zh-TW': zhTW,
      'en': en,
    },
  })

  it('displays text in default locale', () => {
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [i18n],
      },
    })
    expect(wrapper.text()).toContain('醫療服務')
  })

  it('changes text when locale changes', async () => {
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [i18n],
      },
    })

    i18n.global.locale.value = 'en'
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Medical Services')
  })
})
```

### API 集成測試
```typescript
// tests/integration/api.spec.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useServicesStore } from '@/stores/services'
import * as api from '@/api/services'

vi.mock('@/api/services')

describe('Services API Integration', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('fetches services successfully', async () => {
    const mockServices = [
      { id: '1', name: { 'zh-TW': '服務1' } },
      { id: '2', name: { 'zh-TW': '服務2' } },
    ]

    vi.mocked(api.fetchServices).mockResolvedValue(mockServices)

    const store = useServicesStore()
    await store.fetchServices()

    expect(store.services).toEqual(mockServices)
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('handles API errors', async () => {
    const mockError = new Error('API Error')
    vi.mocked(api.fetchServices).mockRejectedValue(mockError)

    const store = useServicesStore()
    await store.fetchServices()

    expect(store.services).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBe(mockError)
  })
})
```

---

## 視覺測試

### 快照測試
```typescript
// tests/visual/ServiceCard.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ServiceCard from '@/components/features/ServiceCard.vue'

describe('ServiceCard Visual', () => {
  it('matches snapshot', () => {
    const wrapper = mount(ServiceCard, {
      props: {
        service: {
          id: '1',
          name: { 'zh-TW': '精密體檢' },
          description: { 'zh-TW': '高精度檢查' },
          image: '/test.jpg',
        },
        locale: 'zh-TW',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

---

## 手動測試清單

### 階段 1: 全局佈局測試
```markdown
#### 桌面端 (1920x1080)
- [ ] 導航欄正確顯示
- [ ] Logo 和品牌名稱可見
- [ ] 導航菜單項正確排列
- [ ] 語言切換下拉菜單正常
- [ ] 用戶圖標正確顯示
- [ ] Footer 區域正確顯示
- [ ] 所有鏈接可點擊

#### 平板端 (768x1024)
- [ ] 導航欄響應式佈局正常
- [ ] 菜單項正確顯示
- [ ] Footer 佈局調整正確

#### 移動端 (375x667)
- [ ] 漢堡菜單圖標顯示
- [ ] 點擊漢堡菜單展開側邊欄
- [ ] 側邊欄菜單項正確顯示
- [ ] 語言切換功能正常
- [ ] Footer 移動端佈局正確

#### 功能測試
- [ ] 切換到簡體中文,文案更新
- [ ] 切換到英文,文案更新
- [ ] 切換到日文,文案更新
- [ ] 刷新頁面,語言設置保持
- [ ] 清除 LocalStorage,恢復默認語言
```

### 階段 2: 首頁測試
```markdown
#### 視覺測試
- [ ] 英雄區背景圖片正確加載
- [ ] 英雄區文字清晰可讀
- [ ] CTA 按鈕樣式正確
- [ ] 快捷入口卡片對齊
- [ ] 服務預覽卡片網格佈局正確

#### 交互測試
- [ ] CTA 按鈕 Hover 效果
- [ ] 快捷入口卡片 Hover 動畫
- [ ] 服務卡片 Hover 效果
- [ ] 點擊按鈕跳轉正確

#### 響應式測試
- [ ] 桌面端佈局正確
- [ ] 平板端佈局調整
- [ ] 移動端單列佈局
- [ ] 圖片在不同尺寸下正確顯示
```

### 階段 3-8: 其他頁面測試
(類似的測試清單,根據具體頁面調整)

---

## 性能測試

### Lighthouse 測試
```bash
# 運行 Lighthouse 測試
npm run build
npm run preview
# 在 Chrome DevTools 中運行 Lighthouse
```

#### 評分標準
- **Performance**: > 90
- **Accessibility**: > 90
- **Best Practices**: > 90
- **SEO**: > 90

### 打包體積測試
```bash
# 構建並分析打包體積
npm run build
# 檢查 dist 目錄大小
du -sh dist/
```

#### 體積標準
- 總體積 (gzip): < 500KB
- 首屏 JS: < 200KB
- 首屏 CSS: < 50KB

---

## 測試命令

```bash
# 運行所有測試
npm run test:unit

# 運行測試並生成覆蓋率報告
npm run test:unit -- --coverage

# 運行測試 UI
npm run test:unit -- --ui

# 運行特定測試文件
npm run test:unit tests/components/common/Button.spec.ts

# 監聽模式
npm run test:unit -- --watch
```

---

## 測試覆蓋率目標

- **整體覆蓋率**: > 80%
- **組件覆蓋率**: > 85%
- **Store 覆蓋率**: > 90%
- **Composables 覆蓋率**: > 85%
- **Utils 覆蓋率**: > 90%

---

## 持續集成 (CI)

### GitHub Actions 配置示例
```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test:unit -- --coverage
      - run: npm run build
```

---

## 最佳實踐

### 1. 測試命名
```typescript
// ✅ 好的命名
it('renders service name in correct locale', () => {})
it('emits viewDetail event when button clicked', () => {})

// ❌ 不好的命名
it('test 1', () => {})
it('works', () => {})
```

### 2. 測試隔離
```typescript
// ✅ 每個測試獨立
beforeEach(() => {
  // 重置狀態
  setActivePinia(createPinia())
  localStorage.clear()
})
```

### 3. Mock 使用
```typescript
// ✅ Mock 外部依賴
vi.mock('@/api/services', () => ({
  fetchServices: vi.fn(),
}))
```

### 4. 異步測試
```typescript
// ✅ 正確處理異步
it('fetches data', async () => {
  await store.fetchData()
  expect(store.data).toBeDefined()
})
```

### 5. 測試覆蓋關鍵路徑
- 用戶交互流程
- 錯誤處理
- 邊界條件
- 多語言切換
- 響應式佈局
