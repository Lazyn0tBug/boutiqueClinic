# 醫療法人德智會 - 分步實施計劃

## 實施策略

本項目採用**增量開發**模式,將整個應用拆分為 8 個階段,每個階段都有明確的交付物和測試標準。每完成一個階段,需經過測試驗證和用戶確認後才進入下一階段。

---

## 階段 0: 基礎設施搭建 (已完成)

### 目標
✅ Vue 3 項目初始化
✅ Tailwind CSS + DaisyUI 配置
✅ TypeScript 配置
✅ 基礎路由結構

### 當前狀態
- 項目已初始化
- 依賴已安裝
- 原型 HTML 已完成 (proto.html)

---

## 階段 1: 全局佈局與導航系統

### 目標
構建整個應用的全局佈局框架,包括頂部導航、底部區域和多語言切換功能。

### 交付物

#### 1.1 組件開發
- `src/components/layout/AppHeader.vue` - 頂部導航欄
  - 響應式菜單 (桌面/移動端)
  - 語言切換下拉菜單
  - 用戶登錄入口
  - 品牌 Logo 和導航鏈接

- `src/components/layout/AppFooter.vue` - 底部區域
  - 自媒體展示區 (YouTube 視頻)
  - Google Maps 地圖組件
  - 聯絡方式和營業時間
  - 快速導航鏈接
  - 社交媒體鏈接

- `src/layouts/DefaultLayout.vue` - 默認佈局容器
  - 包含 Header + Router View + Footer
  - 提供統一的頁面結構

#### 1.2 國際化配置
- `src/locales/zh-CN.json` - 簡體中文
- `src/locales/zh-TW.json` - 繁體中文
- `src/locales/en.json` - 英文
- `src/locales/ja.json` - 日文
- `src/plugins/i18n.ts` - Vue-i18n 配置

#### 1.3 狀態管理
- `src/stores/app.ts` - 應用全局狀態
  - 當前語言狀態
  - 語言切換邏輯
  - LocalStorage 持久化

#### 1.4 路由配置
- 更新 `src/router/index.ts`
  - 添加語言前綴路由 (`/:locale/...`)
  - 配置路由守衛 (語言檢測和重定向)

### 測試標準

#### 單元測試
```typescript
// tests/components/layout/AppHeader.spec.ts
- 測試語言切換功能
- 測試移動端菜單展開/收起
- 測試導航鏈接渲染
```

#### 集成測試
```typescript
// tests/integration/i18n.spec.ts
- 測試語言切換後文案更新
- 測試 LocalStorage 持久化
- 測試路由語言前綴
```

#### 手動測試清單
- [ ] 桌面端導航菜單正常顯示
- [ ] 移動端漢堡菜單可展開/收起
- [ ] 語言切換功能正常 (4 種語言)
- [ ] 切換語言後頁面文案正確更新
- [ ] 刷新頁面後語言設置保持
- [ ] Footer 區域正確顯示
- [ ] 響應式佈局在不同屏幕尺寸下正常

### 完成標準
- 所有組件通過單元測試
- 集成測試全部通過
- 手動測試清單全部勾選
- 代碼通過 ESLint 檢查
- TypeScript 無類型錯誤

---

## 階段 2: 首頁開發

### 目標
開發首頁,包括英雄區、快捷入口卡片和服務概覽。

### 交付物

#### 2.1 頁面組件
- `src/views/HomeView.vue` - 首頁主組件

#### 2.2 功能組件
- `src/components/home/HeroSection.vue` - 英雄區
  - 背景圖片
  - 標題和描述
  - CTA 按鈕組

- `src/components/home/QuickAccessCards.vue` - 快捷入口卡片
  - 雲問診預約卡片
  - 精密體檢預約卡片
  - 緊急醫療援助卡片
  - Hover 動畫效果

- `src/components/home/ServicesPreview.vue` - 服務預覽
  - 展示 3 個特色醫療服務
  - 服務卡片組件復用

#### 2.3 可復用組件
- `src/components/common/ServiceCard.vue` - 服務卡片
  - Props: title, description, image, link
  - Hover 效果
  - 響應式圖片

### 測試標準

#### 單元測試
```typescript
// tests/views/HomeView.spec.ts
- 測試首頁組件渲染
- 測試快捷入口卡片數量
- 測試服務預覽卡片數量

// tests/components/common/ServiceCard.spec.ts
- 測試 Props 傳遞
- 測試點擊事件
```

#### 視覺測試
- 截圖對比 (桌面端 1920x1080)
- 截圖對比 (移動端 375x667)
- 驗證與 proto.html 視覺一致性

#### 手動測試清單
- [ ] 英雄區背景圖片正確加載
- [ ] 英雄區文案支持多語言
- [ ] CTA 按鈕可點擊並跳轉
- [ ] 快捷入口卡片 Hover 效果正常
- [ ] 服務預覽卡片正確顯示
- [ ] 移動端佈局正常
- [ ] 圖片懶加載正常

### 完成標準
- 所有測試通過
- 視覺效果與原型一致
- 響應式佈局完美
- 性能指標達標 (Lighthouse > 90)

---

## 階段 3: 醫療服務頁面

### 目標
開發醫療服務頁面,展示特色醫療服務詳情。

### 交付物

#### 3.1 頁面組件
- `src/views/ServicesView.vue` - 醫療服務主頁

#### 3.2 功能組件
- `src/components/services/ServicesList.vue` - 服務列表
  - 網格佈局
  - 服務卡片展示

- `src/components/services/ServiceDetail.vue` - 服務詳情
  - 服務介紹
  - 適用人群
  - 服務流程
  - 預約按鈕

#### 3.3 數據模型
- `src/types/service.ts` - 服務類型定義
```typescript
interface Service {
  id: string
  name: Record<Locale, string>
  description: Record<Locale, string>
  image: string
  category: string
  features: string[]
}
```

#### 3.4 Mock 數據
- `src/data/services.ts` - 服務數據 (臨時 Mock)

### 測試標準

#### 單元測試
```typescript
// tests/views/ServicesView.spec.ts
- 測試服務列表渲染
- 測試服務篩選功能

// tests/components/services/ServiceDetail.spec.ts
- 測試服務詳情顯示
- 測試預約按鈕點擊
```

#### 手動測試清單
- [ ] 服務列表正確顯示
- [ ] 服務卡片圖片正確加載
- [ ] 點擊服務卡片可查看詳情
- [ ] 服務詳情頁面正確顯示
- [ ] 多語言切換正常
- [ ] 預約按鈕功能正常

### 完成標準
- 所有測試通過
- 數據結構清晰
- 組件可復用性高

---

## 階段 4: 合作機構與成功案例頁面

### 目標
開發合作機構展示頁面和成功案例頁面。

### 交付物

#### 4.1 頁面組件
- `src/views/PartnersView.vue` - 合作機構頁面
- `src/views/CasesView.vue` - 成功案例頁面

#### 4.2 功能組件
- `src/components/partners/PartnerCard.vue` - 合作機構卡片
- `src/components/cases/CaseCard.vue` - 案例卡片
- `src/components/cases/DoctorCard.vue` - 醫生卡片

#### 4.3 數據模型
- `src/types/partner.ts` - 合作機構類型
- `src/types/case.ts` - 案例類型
- `src/types/doctor.ts` - 醫生類型

#### 4.4 Mock 數據
- `src/data/partners.ts`
- `src/data/cases.ts`
- `src/data/doctors.ts`

### 測試標準

#### 單元測試
```typescript
// tests/views/PartnersView.spec.ts
- 測試合作機構列表渲染

// tests/views/CasesView.spec.ts
- 測試案例列表渲染
- 測試醫生團隊渲染
```

#### 手動測試清單
- [ ] 合作機構 Logo 正確顯示
- [ ] 案例卡片正確渲染
- [ ] 醫生卡片正確顯示
- [ ] 多語言支持正常

### 完成標準
- 所有測試通過
- 視覺效果符合設計

---

## 階段 5: 常用藥頁面 (預留電商功能)

### 目標
開發常用藥展示頁面,預留電商功能接口。

### 交付物

#### 5.1 頁面組件
- `src/views/PharmacyView.vue` - 常用藥主頁
- `src/views/MedicineDetailView.vue` - 藥品詳情頁

#### 5.2 功能組件
- `src/components/pharmacy/MedicineCard.vue` - 藥品卡片
- `src/components/pharmacy/MedicineFilter.vue` - 藥品篩選
- `src/components/pharmacy/MedicineDetail.vue` - 藥品詳情

#### 5.3 狀態管理 (預留)
- `src/stores/cart.ts` - 購物車狀態 (預留)
```typescript
interface CartState {
  items: CartItem[]
  addItem: (item: Medicine) => void
  removeItem: (id: string) => void
  // 當前版本不啟用,僅預留接口
}
```

#### 5.4 數據模型
- `src/types/medicine.ts` - 藥品類型
```typescript
interface Medicine {
  id: string
  name: Record<Locale, string>
  description: Record<Locale, string>
  category: string
  type: 'prescription' | 'otc' | 'supplement'
  image: string
  // 預留電商字段
  price?: number
  stock?: number
  sku?: string
}
```

### 測試標準

#### 單元測試
```typescript
// tests/views/PharmacyView.spec.ts
- 測試藥品列表渲染
- 測試藥品篩選功能

// tests/components/pharmacy/MedicineCard.spec.ts
- 測試藥品卡片渲染
- 測試類型標籤顯示
```

#### 手動測試清單
- [ ] 藥品列表正確顯示
- [ ] 藥品分類篩選正常
- [ ] 藥品詳情頁正確顯示
- [ ] 類型標籤 (處方藥/OTC/保健品) 正確
- [ ] "查看說明" 按鈕功能正常
- [ ] 預留的購物車接口不影響當前功能

### 完成標準
- 所有測試通過
- 電商接口預留完整
- 當前版本僅展示功能正常

---

## 階段 6: 關於頁面

### 目標
開發關於頁面,展示醫院概況、院長致辭和設備展示。

### 交付物

#### 6.1 頁面組件
- `src/views/AboutView.vue` - 關於頁面

#### 6.2 功能組件
- `src/components/about/HospitalIntro.vue` - 醫院介紹
- `src/components/about/DirectorMessage.vue` - 院長致辭
- `src/components/about/EquipmentShowcase.vue` - 設備展示
- `src/components/about/Timeline.vue` - 發展歷程時間軸

#### 6.3 數據模型
- `src/types/about.ts` - 關於頁面類型

### 測試標準

#### 單元測試
```typescript
// tests/views/AboutView.spec.ts
- 測試關於頁面渲染
- 測試各個區塊顯示
```

#### 手動測試清單
- [ ] 醫院介紹正確顯示
- [ ] 院長致辭正確顯示
- [ ] 設備展示圖片正確加載
- [ ] 時間軸動畫正常
- [ ] 多語言支持正常

### 完成標準
- 所有測試通過
- 視覺效果優秀

---

## 階段 7: 後台管理頁面 (基礎版)

### 目標
開發後台管理頁面的基礎框架和核心功能。

### 交付物

#### 7.1 頁面組件
- `src/views/admin/AdminLayout.vue` - 後台佈局
- `src/views/admin/DashboardView.vue` - 儀表板
- `src/views/admin/AppointmentsView.vue` - 預約管理
- `src/views/admin/MedicinesView.vue` - 藥品管理
- `src/views/admin/ContentView.vue` - 內容管理

#### 7.2 功能組件
- `src/components/admin/Sidebar.vue` - 側邊欄導航
- `src/components/admin/DataTable.vue` - 數據表格
- `src/components/admin/FormModal.vue` - 表單彈窗
- `src/components/admin/StatsCard.vue` - 統計卡片

#### 7.3 權限管理
- `src/stores/auth.ts` - 認證狀態管理
```typescript
interface AuthState {
  user: User | null
  token: string | null
  role: 'admin' | 'customer_service' | 'patient' | null
  login: (credentials) => Promise<void>
  logout: () => void
}
```

- `src/router/guards.ts` - 路由守衛
  - 登錄驗證
  - 權限驗證

#### 7.4 Mock 認證
- `src/api/mock/auth.ts` - Mock 登錄 API

### 測試標準

#### 單元測試
```typescript
// tests/stores/auth.spec.ts
- 測試登錄邏輯
- 測試登出邏輯
- 測試權限檢查

// tests/router/guards.spec.ts
- 測試路由守衛
- 測試未登錄重定向
```

#### 手動測試清單
- [ ] 登錄頁面正確顯示
- [ ] 登錄功能正常 (Mock)
- [ ] 登出功能正常
- [ ] 未登錄訪問後台自動重定向
- [ ] 側邊欄導航正常
- [ ] 儀表板統計數據顯示
- [ ] 預約管理列表顯示
- [ ] 藥品管理列表顯示
- [ ] 內容管理功能正常

### 完成標準
- 所有測試通過
- 權限系統完整
- 後台基礎功能可用

---

## 階段 8: 優化與部署準備

### 目標
性能優化、SEO 優化、錯誤處理和部署準備。

### 交付物

#### 8.1 性能優化
- 路由懶加載優化
- 圖片懶加載實現
- 組件按需導入
- 代碼分割優化
- 打包體積優化

#### 8.2 SEO 優化
- `src/composables/useSEO.ts` - SEO 組合式函數
- Meta 標籤動態更新
- Hreflang 標籤實現
- Sitemap 生成
- robots.txt 配置

#### 8.3 錯誤處理
- `src/components/common/ErrorBoundary.vue` - 錯誤邊界
- `src/views/NotFoundView.vue` - 404 頁面
- `src/views/ErrorView.vue` - 錯誤頁面
- 全局錯誤處理器

#### 8.4 部署配置
- `vite.config.ts` 生產環境優化
- 環境變量配置 (.env.production)
- Nginx 配置示例
- Docker 配置 (可選)

#### 8.5 文檔完善
- API 文檔
- 組件文檔
- 部署文檔
- 維護文檔

### 測試標準

#### 性能測試
- Lighthouse 評分 > 90
- 首屏加載時間 < 2s
- 打包體積 < 500KB (gzip)

#### SEO 測試
- Meta 標籤正確
- Hreflang 標籤正確
- Sitemap 可訪問
- 結構化數據正確

#### 手動測試清單
- [ ] 所有頁面 Lighthouse 評分 > 90
- [ ] 圖片懶加載正常
- [ ] 404 頁面正確顯示
- [ ] 錯誤頁面正確顯示
- [ ] 生產環境構建成功
- [ ] 部署後功能正常

### 完成標準
- 性能指標達標
- SEO 優化完成
- 部署文檔完整
- 項目可交付

---

## 總結

### 時間估算
- 階段 1: 3-4 天
- 階段 2: 2-3 天
- 階段 3: 2-3 天
- 階段 4: 2-3 天
- 階段 5: 3-4 天
- 階段 6: 2 天
- 階段 7: 4-5 天
- 階段 8: 3-4 天

**總計**: 約 21-28 天 (3-4 週)

### 里程碑
- **第 1 週末**: 完成階段 1-2 (全局佈局 + 首頁)
- **第 2 週末**: 完成階段 3-5 (服務、案例、藥品頁面)
- **第 3 週末**: 完成階段 6-7 (關於頁 + 後台管理)
- **第 4 週末**: 完成階段 8 (優化與部署)

### 下一步
請確認是否開始**階段 1: 全局佈局與導航系統**的開發。
