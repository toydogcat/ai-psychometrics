# 第 9 週：期中綜合測驗 (Midterm Comprehensive Exam)

本週為期中綜合測驗，包含 50 題單選題、50 題多選題及 50 題填充題，共計 150 題。測驗範圍涵蓋第 1 週至第 8 週（辦公自動化與網頁爬蟲）之核心知識點。

---

## 一、 單元講解 (Review)
本單元回顧前八週的核心技術路徑。 (100 分鐘)

### 1. 辦公自動化核心 (W1-W4) (25 min)
- **Pandas**: 數據處理的基石，重點在於 `loc/iloc` 與數據清洗。
- **Document Automation**: `python-docx` 與 `python-pptx` 的對象模型對比。
- **Communication**: SMTP 協議與 MIME 郵件構建。

### 2. 網頁爬蟲基礎 (W5-W6) (25 min)
- **Requests**: GET/POST 請求與 Headers 偽裝。
- **BeautifulSoup**: DOM 樹解析與 CSS 選擇器應用。
- **State Management**: Session 與 Cookies 的持久化。

### 3. 動態與高級爬蟲 (W7-W8) (25 min)
- **Selenium**: 解決 JS 渲染與自動化交互，等待機制是關鍵。
- **Anti-Scraping**: OCR 識別、字體加密處理與代理池維護。

### 4. 框架與工程化 (25 min)
- **Scrapy**: 異步架構、Middleware 與 Pipeline 的協作。
- **法律與倫理**: Robots.txt 與合理爬取頻率。

---

## 二、 動手實作 (Midterm Lab)
綜合應用所學技術完成一個小型端到端專案。 (50 分鐘)

### 任務：電商數據自動化簡報系統
1. **爬取**: 使用 Selenium 爬取某電商平台當前熱銷產品數據。
2. **處理**: 使用 Pandas 進行數據清洗，計算平均價格。
3. **報告**: 自動生成一份包含數據表格的 Word 報告與包含分析圖表的 PPT。
4. **通知**: 將生成的檔案作為附件，自動發送郵件給指定的收件人。

---

## 三、 本週知識點回顧 (KP)
- **[KP 9.1]**: 綜合掌握辦公自動化工具鏈（Excel/Word/PPT/Email）。
- **[KP 9.2]**: 精通各種網頁數據獲取手段（Requests/Selenium/Scrapy）。
- **[KP 9.3]**: 具備應對常見反爬蟲機制（Cookies/Headers/Proxy/OCR）的能力。
- **[KP 9.4]**: 理解異步爬蟲框架的開發流程與中間件配置。
- **[KP 9.5]**: 具備將數據抓取、處理與報表生成進行自動化整合的能力。

---
