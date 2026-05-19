# 第 6 週：進階爬蟲技術：Cookies、Session 與反爬

## 一、 單元講解 (Lecture)
本單元將深入探討如何處理需要登入的網站、維持用戶狀態以及應對網站常見的反爬蟲策略。 (100 分鐘)

### 1. Cookies 原理與手動管理 (20 min)
- **Cookies 基礎**: 了解 HTTP 無狀態協議與 Cookies 如何解決狀態識別。
- **手動設置**: 在 Requests 請求中傳遞 `cookies` 參數（字典格式）。
- **過期與更新**: 了解 Cookies 的生命週期與失效處理。

### 2. requests.Session() 會話持久化 (20 min)
- **自動管理**: 使用 Session 對象自動保存並發送 Cookies。
- **性能優勢**: 底層連接池複用，提高請求效率。
- **全局設置**: 在 Session 層級設置通用的 Headers。

### 3. 模擬登入實戰 (20 min)
- **表單分析**: 使用瀏覽器開發者工具 (F12) 抓包分析登入接口。
- **POST 請求構造**: 準備登入所需的 Payload (Form Data 或 JSON)。
- **重定向處理**: 了解登入成功後的跳轉邏輯。

### 4. 爬蟲偽裝與反爬應對 (20 min)
- **User-Agent 池**: 構建隨機 UA 列表以降低被封禁風險。
- **Referer 與 Host**: 模擬真實的跳轉來源。
- **請求頻率控制**: 隨機休眠策略與併發限制。

### 5. 代理 IP (Proxy) 的應用 (20 min)
- **代理原理**: 了解如何通過中間伺服器隱藏真實 IP。
- **設置方式**: 在 Requests 中配置 `proxies` 參數。
- **代理池維護**: 檢測代理的有效性與響應速度。

---

## 二、 動手實作 (Lab)
練習處理具備安全防護與用戶狀態的網站。 (50 分鐘)

### 1. 模擬登入論壇 (20 min)
- **任務**: 模擬登入一個測試論壇，登入成功後抓取個人中心頁面的積分或用戶名。
- **要求**: 必須使用 `requests.Session()` 以維持登入後的存取權限。

### 2. 爬取動態 User-Agent 池 (15 min)
- **任務**: 從公開的 UA 網站爬取最新的瀏覽器標識符，並保存為 JSON 文件供後續使用。

### 3. 帶代理的批量抓取 (15 min)
- **任務**: 編寫一個循環請求腳本，每隔 5 次請求更換一次代理 IP（可使用免費代理接口）。

---

## 三、 本週知識點回顧 (KP)
- **[KP 6.1]**: 掌握 HTTP Session 對象的使用場景，理解其在自動化 Cookies 管理中的優勢。
- **[KP 6.2]**: 學會 Cookies 的手動獲取、存儲與在不同請求間的傳遞技巧。
- **[KP 6.3]**: 精通 User-Agent 偽裝技術，學會構建隨機化請求頭以降低被封概率。
- **[KP 6.4]**: 了解 HTTP 重定向與超時處理，學會配置代理 IP 繞過 IP 封鎖。
- **[KP 6.5]**: 掌握模擬登入的核心流程，能分辨並構造 POST 請求中的 Form Data 與 JSON Data。

---

## 四、 課後測驗題庫 (Quiz)

### 1. 單選題 (Single Choice, SC)
1. 當我們需要連續請求多個頁面，且希望自動攜帶上次請求獲取的 Cookies 時，應該使用 Requests 中的哪個對象？ (A) `requests.Request` (B) `requests.Response` (C) `requests.Session` (D) `requests.Cookies`
2. 下列哪個 HTTP 首部欄位通常用來表示請求的來源頁面？ (A) `User-Agent` (B) `Referer` (C) `Host` (D) `Cookie`
3. 執行登入操作時，瀏覽器通常發送哪種類型的 HTTP 請求？ (A) GET (B) POST (C) HEAD (D) OPTIONS
4. 在 Requests 中設置代理 IP 的正確語法是？ (A) `requests.get(url, proxy="...")` (B) `requests.get(url, proxies={"http": "..."})` (C) `requests.get(url, headers={"proxy": "..."})` (D) `requests.proxy_set("...")`
5. 若登入請求需要發送 JSON 數據而非表單數據，應使用哪個參數？ (A) `data=` (B) `json=` (C) `params=` (D) `files=`
6. HTTP 狀態碼 302 代表什麼？ (A) 永久移動 (B) 臨時重定向 (C) 語法錯誤 (D) 伺服器拒絕
7. Session 對象相比多次獨立的 `get()` 請求，主要優點不包括？ (A) 自動處理 Cookies (B) TCP 連接複用 (C) 繞過所有反爬蟲機制 (D) 代碼更簡潔
8. 如何在 Session 中設置全局的 User-Agent？ (A) `session.headers.update({'User-Agent': '...'})` (B) `session.ua = '...'` (C) `session.config('ua', '...')` (D) `requests.set_global_ua('...')`
9. 下列哪種反爬蟲手段是通過檢測 IP 請求頻率來實現的？ (A) UA 檢查 (B) 驗證碼 (C) IP 封禁 (D) JavaScript 渲染
10. 免費代理 IP 通常存在的主要問題是？ (A) 速度慢且不穩定 (B) 價格太貴 (C) 無法隱藏 IP (D) 必須使用 SSL

### 2. 多選題 (Multiple Choice, MC)
11. 常見的反爬蟲手段包括哪些？ (A) 檢查 User-Agent (B) 監測單一 IP 請求頻率 (C) 通過驗證碼攔截 (D) 動態渲染數據 (JS)
12. 關於 `requests.Session()`，正確的有？ (A) 跨請求保持參數 (B) 支援 Context Manager (with 語法) (C) 只能發送 GET 請求 (D) 會自動處理 Cookie 的存儲與發送
13. 下列哪些是模擬登入時可能遇到的挑戰？ (A) 隱藏表單欄位 (如 CSRF Token) (B) 圖形驗證碼 (C) 加密的密碼傳輸 (D) 多因素驗證 (MFA)
14. 關於代理 IP 的類型，正確的有？ (A) 透明代理 (暴露真實 IP) (B) 匿名代理 (隱藏真實 IP) (C) 高匿代理 (完全隱藏) (D) 靜態代理 (IP 固定)
15. 爬蟲偽裝技術包括？ (A) 隨機 User-Agent (B) 隨機請求間隔 (C) 設置合理的 Referer (D) 使用多線程高壓爬取
16. 如何獲取 Session 對象中的 Cookies？ (A) `session.cookies` (B) `session.get_cookies()` (C) `requests.utils.dict_from_cookiejar(session.cookies)` (D) `session['cookies']`
17. 處理重定向時，Requests 的默認行為是？ (A) 自動跟隨 (B) 可以通過 `allow_redirects=False` 禁用 (C) 只跟隨 GET 請求 (D) 會在 `history` 屬性中保存跳轉紀錄
18. 下列哪些場景必須使用 Session 或手動處理 Cookies？ (A) 爬取購物車內容 (B) 訪問個人後台頁面 (C) 下載靜態壁紙 (D) 發表論壇回覆
19. 為什麼建議在請求間加入 `time.sleep()`？ (A) 防止伺服器過載 (B) 避免 IP 被識別為異常流量 (C) 讓網絡緩衝 (D) 節省本地 CPU
20. 關於 User-Agent 池，正確的是？ (A) 應包含不同瀏覽器核心 (Chrome, Firefox, Safari) (B) 應包含移動端與桌面端標識 (C) 越多越好 (D) 可以直接從網上獲取公開列表

### 3. 填充題 (Fill-in-the-blank, Fill)
21. 當一個網站需要登入才能訪問數據時，我們通常先發送一個 __________ 請求獲取會話狀態。
22. 在 Session 中維持登入狀態的核心技術是 __________。
23. 若要禁用 Requests 的自動重定向，應設置參數 `allow_redirects=__________`。
24. 通過開發者工具的 __________ 選項卡可以觀察網絡請求的詳細信息。
25. 用於隱藏真實 IP 地址的技術稱為 __________。
26. 如果密碼在傳輸前被 JS 加密，爬蟲需要找出加密 __________ 並在 Python 中實現。
27. `requests.utils.__________` 函數可以將 CookieJar 轉換為字典。
28. Session 對象在完成所有請求後，應調用 `session.________()` 釋放資源。
29. User-Agent 通常屬於 HTTP 請求頭 (Headers) 中的一個 __________。
30. 反爬蟲檢測中，如果在極短時間內發送大量請求，容易觸發伺服器的 __________ 保護機制。

---

## 五、 Q 矩陣 (Q-matrix)
| 題目 | KP6.1 | KP6.2 | KP6.3 | KP6.4 | KP6.5 |
|---|---|---|---|---|---|
| SC1 | 1 | 1 | 0 | 0 | 0 |
| SC2 | 0 | 0 | 1 | 0 | 0 |
| SC3 | 0 | 0 | 0 | 0 | 1 |
| SC4 | 0 | 0 | 0 | 1 | 0 |
| SC5 | 0 | 0 | 0 | 0 | 1 |
| SC6 | 0 | 0 | 0 | 1 | 0 |
| SC7 | 1 | 1 | 0 | 0 | 0 |
| SC8 | 1 | 0 | 1 | 0 | 0 |
| SC9 | 0 | 0 | 0 | 1 | 0 |
| SC10| 0 | 0 | 0 | 1 | 0 |
| MC11| 0 | 0 | 1 | 1 | 1 |
| MC12| 1 | 1 | 0 | 0 | 0 |
| MC13| 0 | 0 | 0 | 0 | 1 |
| MC14| 0 | 0 | 0 | 1 | 0 |
| MC15| 0 | 0 | 1 | 1 | 0 |
| MC16| 0 | 1 | 0 | 0 | 0 |
| MC17| 0 | 0 | 0 | 1 | 0 |
| MC18| 1 | 1 | 0 | 0 | 1 |
| MC19| 0 | 0 | 0 | 1 | 0 |
| MC20| 0 | 0 | 1 | 0 | 0 |
| Fill21| 0 | 0 | 0 | 0 | 1 |
| Fill22| 1 | 1 | 0 | 0 | 0 |
| Fill23| 0 | 0 | 0 | 1 | 0 |
| Fill24| 0 | 0 | 0 | 0 | 1 |
| Fill25| 0 | 0 | 0 | 1 | 0 |
| Fill26| 0 | 0 | 0 | 0 | 1 |
| Fill27| 0 | 1 | 0 | 0 | 0 |
| Fill28| 1 | 0 | 0 | 0 | 0 |
| Fill29| 0 | 0 | 1 | 0 | 0 |
| Fill30| 0 | 0 | 0 | 1 | 0 |
