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

## 四、 課後測驗題庫 (Quiz)

### 1. 單選題 (Single Choice, SC)
1. 在 Scrapy 架構中，負責過濾重複 URL 並管理待爬取隊列的組件是？ (A) Engine (B) Spider (C) Scheduler (D) Item Pipeline
2. 下列哪種技術常用於識別圖片中的文字內容？ (A) NLP (B) OCR (C) CNN (D) SQL
3. Scrapy 框架底層是基於哪個異步網絡庫開發的？ (A) asyncio (B) Twisted (C) Gevent (D) Tornado
4. 在 Scrapy 中，保存爬取結果到資料庫或檔案的組件是？ (A) Item Pipeline (B) Downloader (C) Middleware (D) Engine
5. 如果網頁顯示的數字是 '123'，但在 HTML 源碼中對應的是亂碼，這通常是遇到了？ (A) JavaScript 加密 (B) 自定義字體加密 (C) CSS 隱藏 (D) 圖片偽裝
6. `scrapy startproject myproject` 指令的作用是？ (A) 運行爬蟲 (B) 創建一個新的 Scrapy 專案 (C) 部署爬蟲到雲端 (D) 查看 Scrapy 版本
7. 處理 OCR 識別前，將圖片轉換為只有黑白兩色的過程稱為？ (A) 灰度化 (B) 二值化 (C) 去噪 (D) 銳化
8. 在 Scrapy 中，Spider 返回的數據對象通常被稱為？ (A) Result (B) Data (C) Item (D) Entry
9. 負責在請求發送到伺服器前修改請求頭信息的 Scrapy 組件是？ (A) Downloader Middleware (B) Spider Middleware (C) Engine (D) Scheduler
10. `scrapy crawl myspider` 指令中的 `myspider` 指的是？ (A) 專案名稱 (B) 檔案名稱 (C) Spider 類別中的 `name` 屬性 (D) 類別名稱

### 2. 多選題 (Multiple Choice, MC)
11. 處理網頁字體加密的常用步驟包括哪些？ (A) 下載 `.woff` 字體文件 (B) 使用 `fontTools` 解析字體映射 (C) 直接用 OCR 識別網頁截圖 (D) 重新整理頁面 100 次
12. Scrapy 的主要優點包括？ (A) 異步高併發，速度快 (B) 模組化設計，易於維護 (C) 內建強大的選擇器 (Selectors) (D) 自動處理 Cookies 與 Session
13. 下列哪些是常見的驗證碼類型？ (A) 文字輸入式 (B) 滑動拼圖式 (C) 點選特定物品式 (D) 語音驗證碼
14. Scrapy 的數據流向中，哪些組件會參與其中？ (A) Engine (B) Scheduler (C) Downloader (D) Spiders
15. 進行 OCR 識別時，為了提高準確率，可以對圖片進行哪些預處理？ (A) 調整大小 (B) 去除背景干擾線 (C) 提高對比度 (D) 旋轉糾偏
16. 關於 Scrapy 的 Item，正確的有？ (A) 類似於 Python 字典 (B) 可以進行數據驗證 (C) 定義在 `items.py` 中 (D) 必須繼承 `scrapy.Item`
17. Scrapy Middleware 可以實現的功能包括？ (A) 設置隨機 User-Agent (B) 自動切換代理 IP (C) 處理特定的 HTTP 錯誤碼 (D) 將數據存入資料庫
18. 下列哪些庫與 OCR 或驗證碼處理相關？ (A) `pytesseract` (B) `PIL` (Pillow) (C) `onnxruntime` (D) `pandas`
19. 關於 Scrapy 與 Selenium 的結合，正確的有？ (A) 可以通過 Middleware 調用 Selenium (B) 適合處理 Scrapy 無法直接抓取的動態頁面 (C) 會顯著降低爬取速度 (D) 不需要安裝任何驅動
20. 反爬蟲技術不斷演進，目前較難處理的包括？ (A) 行為軌跡檢測 (B) 指紋瀏覽器識別 (C) 複雜的加密算法 (D) 限制請求速度

### 3. 填充題 (Fill-in-the-blank, Fill)
21. 在 Scrapy 中，提取數據主要使用 __________ (或 XPath) 選擇器。
22. `pytesseract` 需要依賴本地安裝的 __________ 引擎才能運行。
23. Scrapy 中設置並發請求數量的參數是 `CONCURRENT_________`。
24. 字體加密的核心是通過修改字體文件中的 __________ 碼點與字符的映射。
25. 在 Spider 中，`parse` 方法通常使用 `________` 關鍵字回傳 Item 或 Request。
26. 如果要將爬取結果保存為 JSON，可以使用指令 `scrapy crawl spider -o result.________`。
27. Scrapy 專案的全局配置文件名稱是 __________。
28. 處理圖片的 Python 核心庫通常使用 __________ (原名 PIL)。
29. Scrapy 異步機制的核心是基於事件驅動的 __________ 模型。
30. 當 Item 被 Spider 拋出後，首先進入的是 __________ 組件。

---

## 五、 Q 矩陣 (Q-matrix)
| 題目 | KP8.1 | KP8.2 | KP8.3 | KP8.4 | KP8.5 |
|---|---|---|---|---|---|
| SC1 | 0 | 0 | 1 | 0 | 0 |
| SC2 | 1 | 0 | 0 | 0 | 0 |
| SC3 | 0 | 0 | 1 | 0 | 0 |
| SC4 | 0 | 0 | 1 | 0 | 1 |
| SC5 | 0 | 1 | 0 | 0 | 0 |
| SC6 | 0 | 0 | 0 | 1 | 0 |
| SC7 | 1 | 0 | 0 | 0 | 0 |
| SC8 | 0 | 0 | 0 | 1 | 0 |
| SC9 | 0 | 0 | 0 | 0 | 1 |
| SC10| 0 | 0 | 0 | 1 | 0 |
| MC11| 0 | 1 | 0 | 0 | 0 |
| MC12| 0 | 0 | 1 | 1 | 0 |
| MC13| 1 | 0 | 0 | 0 | 0 |
| MC14| 0 | 0 | 1 | 0 | 0 |
| MC15| 1 | 0 | 0 | 0 | 0 |
| MC16| 0 | 0 | 0 | 1 | 0 |
| MC17| 0 | 0 | 0 | 0 | 1 |
| MC18| 1 | 0 | 0 | 0 | 0 |
| MC19| 0 | 0 | 0 | 0 | 1 |
| MC20| 1 | 1 | 0 | 0 | 0 |
| Fill21| 0 | 0 | 0 | 1 | 0 |
| Fill22| 1 | 0 | 0 | 0 | 0 |
| Fill23| 0 | 0 | 1 | 0 | 0 |
| Fill24| 0 | 1 | 0 | 0 | 0 |
| Fill25| 0 | 0 | 0 | 1 | 0 |
| Fill26| 0 | 0 | 0 | 1 | 0 |
| Fill27| 0 | 0 | 0 | 1 | 0 |
| Fill28| 1 | 0 | 0 | 0 | 0 |
| Fill29| 0 | 0 | 1 | 0 | 0 |
| Fill30| 0 | 0 | 1 | 0 | 1 |
