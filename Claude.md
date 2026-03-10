# 醫療法人德智會 - Vue 3 應用開發指南

## 項目概述

本項目為「醫療法人德智會」構建現代化跨國醫療服務平台的前端應用。

**技術棧**: Vue 3 + TypeScript + Tailwind CSS + DaisyUI + Pinia + Vue Router + Vue-i18n

**支援語系**: 簡體中文 (zh-CN)、繁體中文 (zh-TW)、英文 (en)、日文 (ja)

## 核心頁面結構

1. **首頁 (Home)** - 英雄區、快捷入口、服務概覽
2. **關於頁 (About)** - 醫院概況、院長致辭、設備展示
3. **醫療服務頁 (Services)** - 特色醫療、在線預約
4. **合作機構頁 (Partners)** - 合作醫院與機構展示
5. **成功案例頁 (Cases)** - 醫療案例與專家團隊
6. **常用藥頁 (Pharmacy)** - 藥品展示(預留電商功能)
7. **後台管理頁 (Admin)** - 訂單管理、內容維護

## 開發原則

### 組件化設計
- 遵循 Vue 3 Composition API 最佳實踐
- 使用 TypeScript 進行類型安全
- 組件職責單一,可復用性高
- Props 和 Emits 明確定義類型

### 國際化策略
- 靜態文案使用 Vue-i18n 管理
- 動態內容通過 API 獲取對應語言版本
- URL 路由包含語言代碼 (如: `/zh-tw/services`)
- 實現 SEO 友好的 hreflang 標籤

### 狀態管理
- 使用 Pinia 管理全局狀態
- 語言切換狀態 (useAppStore)
- 用戶認證狀態 (useAuthStore)
- 購物車狀態預留 (useCartStore)

### 樣式規範
- 使用 Tailwind CSS 工具類
- DaisyUI 組件庫提供基礎組件
- 響應式設計優先 (Mobile First)
- 保持設計系統一致性

## 可用的 Skills

項目中已配置以下 skills,開發時可直接調用:

- `vue-best-practices` - Vue 3 最佳實踐
- `vue-router-best-practices` - Vue Router 最佳實踐
- `vue-pinia-best-practices` - Pinia 狀態管理最佳實踐
- `typescript-advanced-types` - TypeScript 高級類型
- `modern-javascript-patterns` - 現代 JavaScript 模式
- `code-review-expert` - 代碼審查專家
- `tailwindcss-advanced-layouts` - Tailwind CSS 高級佈局
- `axum` - Axum

## 開發流程

### 分步實施策略

本項目採用**增量開發 + 測試驅動**的方式,每個階段完成後需經過測試驗證和用戶確認才進入下一階段。

詳細的實施計劃請參考: `docs/implementation-plan.md`

### 測試策略

每個階段都包含:
1. **單元測試** - 組件邏輯測試 (Vitest + Vue Test Utils)
2. **集成測試** - 路由和狀態管理測試
3. **視覺測試** - UI 組件渲染測試
4. **手動測試** - 瀏覽器功能驗證

### 代碼質量

- 使用 ESLint + Oxlint 進行代碼檢查
- 使用 TypeScript 嚴格模式
- 遵循 Vue 3 官方風格指南
- 每次提交前運行 `bun run lint`

## 項目命令

```bash
# 開發服務器
bun run dev

# 類型檢查
bun run type-check

# 代碼檢查和修復
bun run lint

# 代碼格式化
bun run format

# 單元測試
bun run test:unit

# 構建生產版本
bun run build

# 預覽生產構建
bun run preview
```

## 文件結構

```
src/
├── assets/          # 靜態資源
├── components/      # 可復用組件
│   ├── common/     # 通用組件 (Button, Card, Modal)
│   ├── layout/     # 佈局組件 (Header, Footer, Sidebar)
│   └── features/   # 功能組件 (ServiceCard, DoctorCard)
├── views/          # 頁面組件
├── router/         # 路由配置
├── stores/         # Pinia 狀態管理
├── composables/    # 組合式函數
├── utils/          # 工具函數
├── types/          # TypeScript 類型定義
├── locales/        # 國際化文件
└── App.vue         # 根組件
```

## 注意事項

1. **不要運行長時間命令** - 避免使用 `bun run dev` 等阻塞命令,建議手動在終端運行
2. **保持組件簡潔** - 單個組件不超過 300 行代碼
3. **類型安全** - 所有 API 響應和組件 Props 都要定義類型
4. **無障礙性** - 確保組件符合 WCAG 基本標準 (使用語義化 HTML、ARIA 屬性)
5. **性能優化** - 使用路由懶加載、圖片懶加載、組件按需導入

## 相關文檔

- [業務架構設計](./docs/design.md) - 業務模塊和功能設計
- [技術架構設計](./docs/arch.md) - 技術選型和系統架構
- [實施計劃](./docs/implementation-plan.md) - 分步實施詳細計劃
- [組件設計規範](./docs/component-design.md) - 組件設計指南
- [測試規範](./docs/testing-guide.md) - 測試編寫指南

## 聯繫方式

如有問題,請參考項目文檔或聯繫開發團隊。
