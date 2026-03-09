醫療法人德智會 - 系統與國際化架構設計方案
1. 專案概述
本專案旨在為「醫療法人德智會」構建一個現代化、高性能的跨國醫療服務平台。系統涵蓋資訊展示、在線預約（雲問診/體檢）、常用藥品展示及後台管理功能。

前端技術棧: Vue 3 + TypeScript + Tailwind CSS + DaisyUI + Pinia + Vue-i18n

後端技術棧: Rust + Axum/Actix-Web + SeaORM

數據庫: PostgreSQL (推薦，因其強大的 JSONB 支援)

支援語系: 簡體中文 (zh-CN)、繁體中文 (zh-TW)、英文 (en)、日文 (ja)

2. 系統整體架構
系統分為三個主要端點：

Web Portal (C端前台): 供全球患者訪問的響應式網站，支援多語言切換、SEO 優化。

Admin Dashboard (B端後台): 供醫院管理員與客服使用的管理面板，處理預約訂單、發佈多語言內容。

API Gateway / Backend (後端 API): 基於 Rust 的高性能服務，處理業務邏輯、權限校驗及多語言數據聚合。

3. 國際化 (i18n) 完整落地方案
國際化不僅僅是前端文字的翻譯，還涉及動態數據的存儲、API 傳輸以及搜索引擎優化 (SEO)。我們採用**「靜態文案前端處理 + 動態數據後端/數據庫處理」**的混合方案。

3.1 前端靜態文案多語言 (Vue-i18n)
網站的固定文本（如：導航欄「醫療服務」、按鈕「在線預約」、表單提示詞）將由前端統一管理。

資源文件結構:

locales/
├── zh-CN.json
├── zh-TW.json
├── en.json
└── ja.json
狀態與初始化: 使用 Pinia (useAppStore) 管理當前語言狀態。初始化時，按以下優先級加載語言：URL 路徑參數 > LocalStorage 緩存 > 瀏覽器默認語言 > 繁體中文(默認)。

3.2 數據庫動態內容多語言設計 (Database i18n)
對於數據庫中存儲的動態內容（如：醫生簡介、醫療服務介紹、醫療案例），基於 PostgreSQL 和 SeaORM，我們推薦兩種策略混合使用：

策略 A：JSONB 欄位擴展 (適用於短文本) 例如 MedicalService 表的 name 和 description，或 Doctor 表的 bio。在數據庫中將原本的 String 欄位改為 JSONB 類型，存儲如下格式：

{
  "zh-CN": "精密体检",
  "zh-TW": "精密體檢",
  "en": "Comprehensive Health Checkup",
  "ja": "人間ドック"
}
優點：無需額外建表，查詢簡單，非常適合 Rust (SeaORM) 結合 serde_json 進行序列化。

策略 B：獨立翻譯表 (適用於長文本/富文本) 對於 CaseStudy (醫療案例) 這種包含大量富文本和 SEO Meta 資訊的模塊，建議建立獨立的翻譯表。

主表：case_studies (記錄 ID, 點擊量, 創建時間, 圖片 URL 等通用屬性)

翻譯表：case_study_translations (包含 case_id, language_code, title, content, summary) 優點：擴展性強，文本過長時不會影響主表查詢效能。

3.3 後端 API 交互規範 (API Interaction)
後端需根據前端請求的語言，返回對應的數據。

Header 傳遞: 前端在所有 Axios 請求的 Header 中攜帶 Accept-Language: zh-TW。

Rust 後端攔截器: Rust 中間件解析 Accept-Language，並將上下文傳入具體的 Handler。

數據返回: 如果查詢某位醫生的名字，Rust 服務端會解析 JSONB 欄位，直接返回匹配當前語言的字符串（例如只返回 "張醫師"），而不是把包含 4 種語言的龐大 JSON 丟給前端，以減少網絡帶寬消耗。

3.4 路由與 SEO 優化 (Routing & SEO)
醫療網站對自然流量需求極高，國際化必須對搜索引擎友好 (Google, Baidu, Yahoo Japan)。

URL 結構: 將語言代碼整合到路由中。

https://sakura-hospital.jp/zh-tw/services/checkup

https://sakura-hospital.jp/en/services/checkup

Hreflang 標籤: 在頁面 <head> 動態插入多語言鏈接，告知 Google 該頁面的其他語言版本，避免被判定為重複內容。

<link rel="alternate" hreflang="zh-cn" href=".../zh-cn/..." />
<link rel="alternate" hreflang="ja" href=".../ja/..." />
4. 核心業務模塊細化
4.1 服務模塊 (Service)
特色醫療: 前端通過路由參數獲取不同語言的醫療套餐介紹。

在線預約:

體檢預約: 以選擇題和日曆組件為主。

雲問診預約: 涉及患者上傳病歷圖片。前端直接存储到数据库中

常用藥品展示: 預留了 price 和 stock 欄位，當前版本僅作圖文展示（多語言），隱藏購買按鈕。

4.2 信息模塊 (Information)
權威專家團隊: 支持後台手動設置 sort_order，將知名院長或主推專家排在首位。

醫療案例與合作機構: 後台發佈的內容實時同步到前端，增強患者信任感。

4.3 管理與核心模塊 (Management)
權限控制 (RBAC): User 表中的 role 劃分為：

admin: 擁有全站數據增刪改查、多語言內容發佈權限。

customer_service: 僅能查看和處理 appointments 預約訂單。

patient: 普通註冊用戶，僅能查看自己的歷史預約。

多語言數據錄入: 後台管理面板 (基於 DaisyUI) 的表單中，針對名稱、簡介等欄位，將提供 Tab 切換（簡/繁/英/日），強制管理員在發佈時填寫多語言內容（或集成 DeepL API 輔助機翻）。

5. 後續推進建議
這套方案為「醫療法人德智會」提供了極具擴展性的底層基建。若確認此架構方案，建議我們按以下步驟進入實質性開發：

第一階段 (基礎搭建): 構建 Rust + SeaORM 的底層數據庫遷移腳本 (Migration)，確立 JSONB 多語言存儲結構。

第二階段 (後端 API): 開發用戶鑑權 (JWT) 及核心模塊 (醫生、醫療服務) 的 RESTful API，並實作 Accept-Language 攔截器。

第三階段 (前台展示): 基於 Vue3 構建多語言響應式官網，對接接口完成數據渲染。

第四階段 (後台管理): 搭建 DaisyUI 後台面板，完成訂單處理與多語言內容發佈功能。
