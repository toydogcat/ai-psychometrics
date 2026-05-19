# 第 5 週：網頁爬蟲入門 (Requests & BeautifulSoup)

## 一、 單元講解 (Lecture)
本單元將帶領學生進入網頁爬蟲的世界，學習如何合法且高效地從互聯網獲取非結構化數據。 (100 分鐘)

### 1. HTTP 請求與網頁原理 (20 min)
- **HTTP 基礎**: 理解 GET 與 POST 請求的區別。
- **狀態碼解析**: 200 (成功), 404 (未找到), 403 (禁止訪問), 500 (伺服器錯誤)。
- **網頁結構**: 了解 HTML, CSS 與 JavaScript 在網頁中的角色。

### 2. Requests 庫核心應用 (20 min)
- **發送請求**: `requests.get()` 的基本用法。
- **處理響應**: 獲取文本 (`text`)、二進制數據 (`content`) 與 JSON (`json()`)。
- **自定義 Headers**: 偽裝 User-Agent 以避免被簡單攔截。

### 3. HTML 解析與 DOM 樹 (20 min)
- **DOM 概念**: 理解網頁的層級結構。
- **BeautifulSoup 初始化**: 選擇解析器 (`html.parser`, `lxml`)。
- **標籤定位**: 使用標籤名、屬性、Class 或 ID 尋找節點。

### 4. 數據提取與導航 (20 min)
- **find() 與 find_all()**: 獲取單個或多個匹配項。
- **獲取內容**: 提取標籤內的文本 (`get_text()`) 與屬性 (`tag['href']`)。
- **父子與兄弟導航**: 在 DOM 樹中上下移動以精確定位。

### 5. 爬蟲倫理與實戰演練 (20 min)
- **Robots.txt**: 如何檢查網站的爬蟲協議。
- **爬取速度控制**: 使用 `time.sleep()` 模擬人類行為。
- **簡單存檔**: 將爬取的數據保存為 CSV 格式。

---

## 二、 動手實作 (Lab)
練習抓取真實網站數據並進行初步處理。 (50 分鐘)

### 1. 爬取新聞標題與連結 (20 min)
- **任務**: 爬取某新聞首頁的所有即時新聞標題與其對應的網址。
- **要求**: 將結果保存為一個 Pandas DataFrame 並導出 CSV。

### 2. 批量下載網頁圖片 (15 min)
- **任務**: 給定一個相簿網址，自動找出所有 `<img>` 標籤並下載圖片到本地資料夾。

### 3. 豆瓣電影 Top 250 (模擬) (15 min)
- **任務**: 爬取電影名稱、評分與評價人數。
- **要求**: 處理翻頁邏輯，獲取前 2 頁的數據。

---

## 三、 本週知識點回顧 (KP)
- **[KP 5.1]**: 掌握 HTTP 請求原理，學會構造 Headers 與處理 Params。
- **[KP 5.2]**: 熟練使用 Requests 處理不同類型的響應內容 (Encoding, JSON 反序列化)。
- **[KP 5.3]**: 理解 BeautifulSoup 對象初始化與不同解析器的選擇場景。
- **[KP 5.4]**: 精通定位 HTML 節點的各種方法 (Tag, ID, Class, 層級查找)。
- **[KP 5.5]**: 學習從節點中提取文本與屬性，並處理相對路徑與數據清洗。

---

## 四、 課後測驗題庫 (Quiz)

### 1. 單選題 (Single Choice, SC)
1. 執行 `requests.get(url)` 後返回對象為 `res`，若該 URL 返回的是 JSON 格式，最簡便的解析方法是？ (A) `json.loads(res.text)` (B) `res.json()` (C) `res.content.to_json()` (D) `BeautifulSoup(res.text)`
2. HTML 中用於唯一標識一個元素的屬性通常是？ (A) `class` (B) `id` (C) `name` (D) `src`
3. 在 BeautifulSoup 中，獲取標籤 `<a href="test.html">` 的連結地址，假設該標籤對象為 `tag`，代碼為？ (A) `tag.href` (B) `tag['href']` (C) `tag.get('link')` (D) `tag.url`
4. HTTP 狀態碼 403 代表什麼意思？ (A) 頁面不存在 (B) 伺服器內部錯誤 (C) 禁止訪問 (Forbidden) (D) 請求成功
5. 下列哪個參數可以用來偽裝瀏覽器？ (A) `timeout` (B) `proxies` (C) `headers` (D) `params`
6. `BeautifulSoup(html, 'lxml')` 中的 'lxml' 是什麼？ (A) 解析器 (B) 網址 (C) 數據格式 (D) 變數名
7. `requests.get(url, params={'id': 1})` 發送的實際 URL 是？ (A) `url?id=1` (B) `url/id/1` (C) `url` (D) `url#id=1`
8. `find_all()` 返回的對象型態是？ (A) 字串 (B) 列表 (ResultSet) (C) 字典 (D) 單個標籤對象
9. 如何獲取標籤內的所有純文本內容（去除 HTML 標籤）？ (A) `.string` (B) `.get_text()` (C) `.content` (D) `.val()`
10. Robots 協議通常存放在網站的哪個路徑？ (A) `/robots.txt` (B) `/admin/robots` (C) `/crawl/config` (D) `/security`

### 2. 多選題 (Multiple Choice, MC)
11. 下列哪些是常見的 HTTP 請求方法？ (A) GET (B) POST (C) DELETE (D) PUT
12. 關於 `requests.Response` 對象，正確的有？ (A) `status_code` 查看狀態碼 (B) `text` 獲取 Unicode 文本 (C) `content` 獲取字節流 (D) `headers` 獲取響應頭
13. BeautifulSoup 定位元素的方法包括？ (A) `find()` (B) `find_all()` (C) `select()` (CSS 選擇器) (D) `get_element_by_id()`
14. 下列哪些標籤特徵可以用來識別一個 HTML 元素？ (A) 標籤名 (B) Class 屬性 (C) ID 屬性 (D) 標籤內的文字
15. 爬蟲實戰中，為了防止被封禁，可以採取的措施有？ (A) 設置 User-Agent (B) 設置請求間隔 (C) 使用代理 IP (D) 同時開啟 1000 個線程爬取
16. 關於 HTML 屬性獲取，正確的有？ (A) `tag['class']` 通常返回列表 (B) `tag['id']` 返回字串 (C) 若屬性不存在會報錯 (D) 可以使用 `tag.get('attr')` 避免報錯
17. 下列哪些是 BeautifulSoup 的導航屬性？ (A) `.parent` (B) `.children` (C) `.next_sibling` (D) `.previous_sibling`
18. HTTP 200 狀態碼意味著？ (A) 請求成功 (B) 數據已緩存 (C) 伺服器正常響應 (D) 頁面已跳轉
19. 處理網頁編碼時，若 `res.text` 顯示亂碼，可以？ (A) 設置 `res.encoding = 'utf-8'` (B) 使用 `res.content` 自行解碼 (C) 換一個瀏覽器爬取 (D) 檢查 `res.apparent_encoding`
20. `requests.post()` 與 `requests.get()` 的區別包括？ (A) POST 的參數放在 Body 中 (B) GET 的參數顯示在 URL 中 (C) POST 更適合發送敏感數據 (D) GET 速度一定更快

### 3. 填充題 (Fill-in-the-blank, Fill)
21. 在 Requests 中，設置超時時間以防止程序卡死的參數是 __________。
22. BeautifulSoup 中使用 CSS 選擇器尋找元素的方法是 `soup.________()`。
23. 獲取 Response 對象狀態碼的屬性是 `res.________`。
24. 在 HTML 中，`<a>` 標籤的 __________ 屬性通常存放跳轉連結。
25. `requests.get(url).________` 可以獲取該響應對象的二進制內容。
26. BeautifulSoup 對象建立時，如果不指定解析器，Python 會使用內建的 "__________"。
27. 若要獲取標籤 `tag` 的 Class 列表，代碼為 `tag.get('________')`。
28. 在請求頭中，用來標識客戶端設備與瀏覽器版本的欄位是 __________。
29. `time.________(1)` 可以讓爬蟲暫停一秒。
30. URL 中 `?` 之後的部分通常被稱為 __________ (Query String)。

---

## 五、 Q 矩陣 (Q-matrix)
| 題目 | KP5.1 | KP5.2 | KP5.3 | KP5.4 | KP5.5 |
|---|---|---|---|---|---|
| SC1 | 0 | 1 | 0 | 0 | 0 |
| SC2 | 0 | 0 | 0 | 1 | 0 |
| SC3 | 0 | 0 | 0 | 0 | 1 |
| SC4 | 1 | 0 | 0 | 0 | 0 |
| SC5 | 1 | 0 | 0 | 0 | 0 |
| SC6 | 0 | 0 | 1 | 0 | 0 |
| SC7 | 1 | 0 | 0 | 0 | 0 |
| SC8 | 0 | 0 | 0 | 1 | 0 |
| SC9 | 0 | 0 | 0 | 0 | 1 |
| SC10| 1 | 0 | 0 | 0 | 0 |
| MC11| 1 | 0 | 0 | 0 | 0 |
| MC12| 0 | 1 | 0 | 0 | 0 |
| MC13| 0 | 0 | 0 | 1 | 0 |
| MC14| 0 | 0 | 0 | 1 | 0 |
| MC15| 1 | 0 | 0 | 0 | 0 |
| MC16| 0 | 0 | 0 | 0 | 1 |
| MC17| 0 | 0 | 0 | 1 | 0 |
| MC18| 1 | 0 | 0 | 0 | 0 |
| MC19| 0 | 1 | 0 | 0 | 0 |
| MC20| 1 | 0 | 0 | 0 | 0 |
| Fill21| 1 | 0 | 0 | 0 | 0 |
| Fill22| 0 | 0 | 0 | 1 | 0 |
| Fill23| 1 | 0 | 0 | 0 | 0 |
| Fill24| 0 | 0 | 0 | 0 | 1 |
| Fill25| 0 | 1 | 0 | 0 | 0 |
| Fill26| 0 | 0 | 1 | 0 | 0 |
| Fill27| 0 | 0 | 0 | 0 | 1 |
| Fill28| 1 | 0 | 0 | 0 | 0 |
| Fill29| 1 | 0 | 0 | 0 | 0 |
| Fill30| 1 | 0 | 0 | 0 | 0 |
