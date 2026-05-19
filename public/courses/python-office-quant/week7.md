# 第 7 週：動態網頁爬取 (Selenium 實踐)

## 一、 單元講解 (Lecture)
本單元將學習如何處理由 JavaScript 動態渲染的網頁，利用 Selenium 模擬真實瀏覽器操作。 (100 分鐘)

### 1. 動態網頁與 AJAX 原理 (20 min)
- **靜態 vs. 動態**: 為什麼 Requests 有時抓不到數據（查看網頁源碼與檢查元素的區別）。
- **AJAX 技術**: 了解網頁如何異步加載數據。
- **解決方案**: 介紹 Selenium, Playwright 等自動化工具。

### 2. Selenium 環境配置 (20 min)
- **WebDriver**: 下載與配置瀏覽器驅動 (Chrome, Edge, Firefox)。
- **基礎啟動**: 初始化 WebDriver 對象並打開網頁。
- **無頭模式 (Headless)**: 在後台運行瀏覽器以節省資源。

### 3. 元素定位進階 (20 min)
- **定位方式**: `find_element(By.ID, ...)` 等新版語法。
- **XPath 與 CSS Selector**: 學習如何精確定位複雜層級中的元素。
- **常用屬性**: 獲取文字、獲取屬性值 (`get_attribute`) 與判斷是否可見。

### 4. 模擬用戶交互 (20 min)
- **基本操作**: 點擊 (`click()`)、輸入文本 (`send_keys()`)、清空內容 (`clear()`)。
- **高級操作**: 滑鼠滾動、拖拽、鍵盤組合鍵處理。
- **窗口與框架**: 切換多個標籤頁 (Windows) 與處理嵌套框架 (iFrame)。

### 5. 等待機制與異常處理 (20 min)
- **為什麼需要等待**: 處理網絡延遲與 JS 渲染時間。
- **隱式等待 (Implicit)**: 全局設置最長等待時間。
- **顯式等待 (Explicit)**: `WebDriverWait` 配合 `expected_conditions` (EC) 的精確控制。
- **常見錯誤**: `NoSuchElementException`, `TimeoutException` 的捕捉與處理。

---

## 二、 動手實作 (Lab)
練習自動化操作複雜的現代網頁。 (50 分鐘)

### 1. 爬取電商搜索結果 (20 min)
- **任務**: 自動打開電商平台，在搜索框輸入「筆記型電腦」，並爬取第一頁所有產品的名稱與價格。
- **要求**: 處理網頁向下滾動加載數據的情況。

### 2. 自動化表單填寫 (15 min)
- **任務**: 模擬填寫一個多頁問卷調查表，並點擊最後的提交按鈕。

### 3. 抓取動態加載的評論 (15 min)
- **任務**: 爬取某影評網站的評論，點擊「加載更多」按鈕 3 次後，一次性獲取所有評論內容。

---

## 三、 本週知識點回顧 (KP)
- **[KP 7.1]**: 掌握 WebDriver 對象與瀏覽器驅動的通信原理，學會基礎環境配置。
- **[KP 7.2]**: 精通 XPath 與 CSS Selector 定位技術，解決複雜動態節點的查找問題。
- **[KP 7.3]**: 學習模擬用戶交互，掌握點擊、輸入、滾動及 iFrame 切換等操作。
- **[KP 7.4]**: 深入理解等待機制，熟練運用顯式等待 (`WebDriverWait`) 處理異步加載。
- **[KP 7.5]**: 學習處理多窗口、多標籤頁的切換邏輯與基本的自動化腳本優化技術。

---

## 四、 課後測驗題庫 (Quiz)

### 1. 單選題 (Single Choice, SC)
1. 下列哪種等待方式是 Selenium 官方推薦，能有效減少腳本報錯且不浪費多餘時間的？ (A) `time.sleep(10)` (B) 隱式等待 `implicitly_wait` (C) 顯式等待 `WebDriverWait` (D) 不等待
2. Selenium 中，切換到 ID 為 'login_frame' 的 iframe 應使用哪段代碼？ (A) `driver.switch_to.frame('login_frame')` (B) `driver.get_frame('login_frame')` (C) `driver.find_element(By.ID, 'login_frame').click()` (D) `driver.focus('login_frame')`
3. 使用 `find_element` 時，若找不到元素，Selenium 預設會拋出什麼異常？ (A) `TimeoutException` (B) `NoSuchElementException` (C) `ElementNotVisibleException` (D) `ConnectionError`
4. 下列哪個方法可以用來在輸入框中按下「回車鍵」？ (A) `send_keys(Keys.ENTER)` (B) `press_enter()` (C) `click(Keys.RETURN)` (D) `input('\n')`
5. 如何獲取當前頁面的網址？ (A) `driver.url` (B) `driver.current_url` (C) `driver.get_url()` (D) `driver.location`
6. 在 Selenium 中實現「無頭模式」需要在哪個對象中進行配置？ (A) `DesiredCapabilities` (B) `Options` (C) `Service` (D) `DriverConfig`
7. 想要獲取標籤 `<div class="price">100</div>` 中的數字 100，應訪問？ (A) `elem.value` (B) `elem.text` (C) `elem.content` (D) `elem.get_attribute('text')`
8. `driver.back()` 的作用是？ (A) 關閉瀏覽器 (B) 瀏覽器後退一步 (C) 頁面刷新 (D) 最小化視窗
9. 下列定位方式中，哪一種最為強大且支援從下往上查找？ (A) `By.ID` (B) `By.CLASS_NAME` (C) `By.XPATH` (D) `By.TAG_NAME`
10. `implicitly_wait(10)` 代表什麼意思？ (A) 每次操作前休眠 10 秒 (B) 全局元素找尋的最長等待時間為 10 秒 (C) 頁面加載必須在 10 秒內完成 (D) 脚本執行總時長限制為 10 秒

### 2. 多選題 (Multiple Choice, MC)
11. Selenium 可以用於哪些場景？ (A) 爬取單頁應用 (SPA) 數據 (B) 自動化網頁功能測試 (C) 模擬真實用戶滑鼠軌跡 (D) 繞過所有圖形驗證碼
12. 關於 WebDriver，正確的有？ (A) 不同瀏覽器需要對應的驅動程序 (B) 驅動程序版本需與瀏覽器版本匹配 (C) 必須將驅動程序路徑加入環境變數或在代碼中指定 (D) 一個 WebDriver 對象可以同時控制多個不同的瀏覽器窗口
13. 下列哪些是 Selenium 支援的定位策略？ (A) `By.ID` (B) `By.XPATH` (C) `By.CSS_SELECTOR` (D) `By.PARTIAL_LINK_TEXT`
14. 關於顯式等待 (`WebDriverWait`)，正確的是？ (A) 可以針對特定元素設置等待條件 (B) 條件滿足時會立即繼續執行 (C) 支援「元素可見」、「元素可點擊」等多種條件 (D) 必須與 `time.sleep` 配合使用
15. 模擬用戶交互時，哪些操作是可行的？ (A) 雙擊 (Double Click) (B) 右鍵點擊 (Context Click) (C) 滑鼠懸停 (Hover) (D) 拖拽 (Drag and Drop)
16. 下列哪些是 Selenium 中的窗口管理操作？ (A) `driver.window_handles` 獲取所有窗口句柄 (B) `driver.switch_to.window()` 切換窗口 (C) `driver.close()` 關閉當前窗口 (D) `driver.quit()` 退出整個驅動並關閉所有窗口
17. 關於 Selenium 的優缺點，正確的是？ (A) 優點：能處理任何 JS 動態渲染內容 (B) 優點：操作直觀，模擬真實 (C) 缺點：運行速度比 Requests 慢很多 (D) 缺點：極度節省資源
18. 下列哪些 `expected_conditions` (EC) 是常用的？ (A) `presence_of_element_located` (B) `visibility_of_element_located` (C) `element_to_be_clickable` (D) `title_is`
19. 在 XPath 中，下列哪些語法是正確的？ (A) `//div[@id='test']` (B) `//a[contains(text(), '登入')]` (C) `//input/parent::div` (D) `/html/body/div[1]`
20. 使用 Selenium 爬蟲時，被識別為機器人的常見特徵包括？ (A) `window.navigator.webdriver` 屬性為 true (B) 操作速度過快且精確 (C) 請求頭中缺少常規瀏覽器資訊 (D) 固定不變的 IP 地址

### 3. 填充題 (Fill-in-the-blank, Fill)
21. Selenium 的核心作用是通過 __________ 來控制瀏覽器。
22. 在定位元素時，如果一個標籤有多個 Class，CSS Selector 中應使用「.」連接，例如 `.class1.________`。
23. 顯式等待中，用於指定條件的類別名稱縮寫通常是 __________ (Expected Conditions)。
24. `driver.execute_script("window.scrollTo(0, ________)")` 可用於滾動到頁面底部。
25. 獲取標籤屬性 `href` 的方法是 `elem.get_attribute('________')`。
26. 如果要操作一個在彈出警告框 (Alert) 中的「確定」按鈕，應使用 `driver.switch_to.________.accept()`。
27. 定義 XPath 時，`//` 代表從 __________ 節點開始選擇。
28. 要最大化瀏覽器窗口，應使用 `driver._________window()`。
29. Selenium 腳本執行完成後，必須調用 __________ 以關閉所有瀏覽器進程。
30. `By.LINK_TEXT` 定位方式僅適用於 __________ 標籤。

---

## 五、 Q 矩陣 (Q-matrix)
| 題目 | KP7.1 | KP7.2 | KP7.3 | KP7.4 | KP7.5 |
|---|---|---|---|---|---|
| SC1 | 0 | 0 | 0 | 1 | 0 |
| SC2 | 0 | 0 | 0 | 0 | 1 |
| SC3 | 1 | 1 | 0 | 0 | 0 |
| SC4 | 0 | 0 | 1 | 0 | 0 |
| SC5 | 1 | 0 | 0 | 0 | 0 |
| SC6 | 1 | 0 | 0 | 0 | 0 |
| SC7 | 0 | 0 | 1 | 0 | 0 |
| SC8 | 1 | 0 | 1 | 0 | 0 |
| SC9 | 0 | 1 | 0 | 0 | 0 |
| SC10| 0 | 0 | 0 | 1 | 0 |
| MC11| 1 | 1 | 1 | 1 | 0 |
| MC12| 1 | 0 | 0 | 0 | 0 |
| MC13| 0 | 1 | 0 | 0 | 0 |
| MC14| 0 | 0 | 0 | 1 | 0 |
| MC15| 0 | 0 | 1 | 0 | 0 |
| MC16| 1 | 0 | 0 | 0 | 1 |
| MC17| 1 | 0 | 0 | 0 | 0 |
| MC18| 0 | 0 | 0 | 1 | 0 |
| MC19| 0 | 1 | 0 | 0 | 0 |
| MC20| 1 | 0 | 0 | 0 | 1 |
| Fill21| 1 | 0 | 0 | 0 | 0 |
| Fill22| 0 | 1 | 0 | 0 | 0 |
| Fill23| 0 | 0 | 0 | 1 | 0 |
| Fill24| 0 | 0 | 1 | 0 | 0 |
| Fill25| 0 | 0 | 1 | 0 | 0 |
| Fill26| 0 | 0 | 0 | 0 | 1 |
| Fill27| 0 | 1 | 0 | 0 | 0 |
| Fill28| 1 | 0 | 1 | 0 | 0 |
| Fill29| 1 | 0 | 0 | 0 | 0 |
| Fill30| 0 | 1 | 0 | 0 | 0 |
