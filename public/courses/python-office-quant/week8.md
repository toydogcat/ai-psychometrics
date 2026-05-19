# 第 8 週：反爬蟲攻防、驗證碼處理與 Scrapy 初探

## 一、 單元講解 (Lecture)
本單元將挑戰爬蟲界的高級難題，包括圖形驗證碼識別、自定義字體加密，並初步接觸工業級爬蟲框架 Scrapy。 (100 分鐘)

### 1. 驗證碼識別與 OCR (20 min)
- **驗證碼類型**: 數字字母、滑動拼圖、點擊文字。
- **OCR 技術**: 介紹 Tesseract OCR 與其 Python 封裝 `pytesseract`。
- **第三方平台**: 了解打碼平台 API 的集成方式。

### 2. 數據隱藏技術應對 (20 min)
- **字體加密**: 處理網頁顯示與源碼不一致的情況（`.woff` 字體解析）。
- **CSS 偏移與 SVG 映射**: 了解前端開發者如何通過樣式隱藏真實數據。
- **應對策略**: 使用 `fontTools` 解析字體坐標或使用 OCR 直接識別。

### 3. Scrapy 框架架構 (20 min)
- **核心組件**: Engine, Spiders, Scheduler, Item Pipeline, Downloader Middleware。
- **數據流向**: 理解異步高併發的爬取機制。
- **Twisted 引擎**: 了解 Scrapy 為什麼快。

### 4. Scrapy 專案實踐 (20 min)
- **指令行工具**: `scrapy startproject`, `scrapy genspider`。
- **數據定義**: 在 `items.py` 中定義抓取欄位。
- **Spider 編寫**: 實現解析邏輯並發送下一個請求。

### 5. Middleware 與 Pipeline (20 min)
- **Downloader Middleware**: 統一設置 User-Agent 或 代理 IP。
- **Item Pipeline**: 實現數據去重、清洗與自動存入資料庫。

---

## 二、 動手實作 (Lab)
練習突破網頁防線並構建高效爬蟲系統。 (50 分鐘)

### 1. 破解簡單數字驗證碼 (20 min)
- **任務**: 下載驗證碼圖片，使用 `pytesseract` 進行預處理（灰度、二值化）並識別出正確數字。
- **要求**: 識別準確率需達到 70% 以上。

### 2. 建立首個 Scrapy 爬蟲 (15 min)
- **任務**: 創建一個 Scrapy 專案，爬取一個靜態圖書網站的所有書名與價格。

### 3. Middleware 應用 (15 min)
- **任務**: 在 Scrapy 專案中編寫一個 Middleware，讓每一個請求都隨機帶上不同的 User-Agent。

---

## 三、 本週知識點回顧 (KP)
- **[KP 8.1]**: 了解圖片預處理與 OCR 基礎知識，學會使用 `pytesseract` 識別簡單驗證碼。
- **[KP 8.2]**: 掌握應對高級反爬的技巧，學會初步解析網頁字體映射 (`woff` 處理)。
- **[KP 8.3]**: 深入理解 Scrapy 的異步架構及其與 Requests 的本質區別。
- **[KP 8.4]**: 熟練使用 Scrapy 指令行工具進行專案管理、Spider 創建與數據定義。
- **[KP 8.5]**: 學習 Scrapy Middleware 與 Pipeline 的配置，實現高可定制化的數據處理流程。

---
