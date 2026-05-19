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

## 四、 課後測驗題庫 (Midterm Quiz)

### 1. 單選題 (Single Choice, SC) - 共 50 題
1. Pandas 篩選銷售額大於 500 且客戶等級為 A 的正確寫法？ (A) `df[(df.sales > 500) & (df.level == 'A')]` (B) `df[df.sales > 500 and df.level == 'A']` (C) `df.query(sales > 500 & level == 'A')` (D) `df.filter(sales > 500, level == 'A')`
2. `python-docx` 中，調整段落縮進應操作哪個對象？ (A) Run (B) Paragraph (C) Document (D) Section
3. 發送帶有 Excel 附件的郵件時，應使用？ (A) MIMEText (B) MIMEMultipart (C) MIMEImage (D) MIMEAudio
4. 爬蟲中返回 403 狀態碼通常代表？ (A) 成功 (B) 禁止訪問 (C) 頁面未找到 (D) 伺服器錯誤
5. BeautifulSoup 中獲取 `<a href="...">` 的連結語法？ (A) `tag.href` (B) `tag['href']` (C) `tag.get_text()` (D) `tag.val()`
6. Selenium 官方推薦的等待方式是？ (A) `time.sleep` (B) 顯式等待 (C) 隱式等待 (D) 不等待
7. Scrapy 負責調度的組件是？ (A) Engine (B) Scheduler (C) Downloader (D) Pipeline
8. `pd.read_csv()` 出現亂碼時應調整？ (A) `sep` (B) `encoding` (C) `header` (D) `index_col`
9. `python-pptx` 中幻燈片內容的基本單位是？ (A) Slide (B) Shape (C) Frame (D) Layout
10. SMTP 發送郵件通常使用的加密方法是？ (A) `starttls()` (B) `encrypt()` (C) `md5()` (D) `base64()`
11. 執行 `requests.get(url, timeout=5)` 的作用是？ (A) 限制爬取速度 (B) 防止程序無限期卡死 (C) 定時任務 (D) 緩存過期
12. 如何獲取 DataFrame 的行數與列數？ (A) `df.size` (B) `df.shape` (C) `df.count` (D) `df.info`
13. `python-docx` 中添加內容的最高層級對象是？ (A) Document (B) Paragraph (C) Run (D) Section
14. Selenium 定位元素時，哪種方式最靈活？ (A) By.ID (B) By.NAME (C) By.XPATH (D) By.TAG_NAME
15. Scrapy 中將數據存入資料庫應在何處編寫？ (A) Spider (B) Middleware (C) Pipeline (D) Settings
16. 處理網頁自定義字體加密常用的庫是？ (A) BeautifulSoup (B) fontTools (C) Requests (D) NumPy
17. `requests.Session()` 的主要作用是？ (A) 提高下載速度 (B) 自動保持 Cookies (C) 隱藏 IP (D) 解析 HTML
18. PPT 自動化中，`prs.slides[0].shapes` 返回的是？ (A) 幻燈片列表 (B) 形狀集合 (C) 佈局集合 (D) 母版
19. 郵件附件中文檔名亂碼的原因通常是？ (A) 文件太大 (B) 未進行 Header 編碼 (C) 伺服器拒收 (D) 網路不穩定
20. `find_all()` 返回的是什麼類型？ (A) 單個標籤 (B) 列表 (C) 字典 (D) 字串
21. Selenium 的「無頭模式」是指？ (A) 不加載圖片 (B) 不彈出瀏覽器窗口 (C) 不執行 JS (D) 不保存 Cookies
22. Scrapy 框架基於哪個庫實現異步？ (A) asyncio (B) Twisted (C) Gevent (D) Flask
23. `df.dropna(how='all')` 的作用是？ (A) 刪除包含任一空值的行 (B) 刪除整行皆為空值的行 (C) 刪除所有空值 (D) 不執行任何操作
24. `python-docx` 中 `run.bold = True` 作用於？ (A) 段落 (B) 特定的文字塊 (C) 整個文檔 (D) 表格
25. 獲取 Response 對象的 JSON 數據應調用？ (A) `res.text` (B) `res.json()` (C) `res.content` (D) `res.data`
26. Selenium 切換 iframe 的指令？ (A) `switch_to.frame()` (B) `switch_to.window()` (C) `change_frame()` (D) `focus()`
27. Robots.txt 的主要作用是？ (A) 阻擋黑客 (B) 告知爬蟲許可範圍 (C) 加速網頁訪問 (D) 存儲密碼
28. `pd.concat([df1, df2], axis=1)` 代表？ (A) 垂直合併 (B) 水平合併 (C) 數據去重 (D) 數據排序
29. `MIMEText(html, 'html', 'utf-8')` 中第二個參數的作用是？ (A) 設置字元集 (B) 指定內容為 HTML 格式 (C) 設置主題 (D) 設置寄件人
30. XPath 中 `//` 代表？ (A) 根節點 (B) 任意位置的節點 (C) 當前節點 (D) 父節點
31. Scrapy 創建專案的指令是？ (A) `scrapy new` (B) `scrapy startproject` (C) `scrapy create` (D) `scrapy init`
32. Selenium 中按下鍵盤回車鍵應使用？ (A) `Keys.ENTER` (B) `Keys.RETURN` (C) 以上皆可 (D) 無法實現
33. `df.fillna(0)` 的作用是？ (A) 刪除空值 (B) 將空值替換為 0 (C) 統計空值個數 (D) 檢查空值
34. `python-pptx` 設置位置的單位通常是？ (A) Pt (B) Inches (C) Pixels (D) Cm
35. 爬蟲遇到驗證碼時，基礎的自動化識別方案是？ (A) 忽略 (B) OCR (C) 手動輸入 (D) 重啟程序
36. Requests 設置代理 IP 應使用參數？ (A) `proxy` (B) `proxies` (C) `agents` (D) `headers`
37. BeautifulSoup 的 `select()` 方法使用什麼語法？ (A) XPath (B) CSS 選擇器 (C) Regex (D) SQL
38. Scrapy 數據清洗應在哪個組件中進行？ (A) Pipeline (B) Downloader (C) Scheduler (D) Settings
39. `df.drop_duplicates()` 作用是？ (A) 刪除空值 (B) 刪除重複行 (C) 刪除指定列 (D) 數據合併
40. `python-docx` 中 `doc.save()` 之後？ (A) 檔案被關閉 (B) 內容被寫入磁碟 (C) 程序結束 (D) 檔案被加密
41. 如何獲取 Selenium 元素的 `href` 屬性？ (A) `.href` (B) `.get_attribute('href')` (C) `.text` (D) `.val()`
42. HTTP 狀態碼 302 代表？ (A) 成功 (B) 重定向 (C) 錯誤 (D) 禁止
43. `pd.read_excel(..., sheet_name=1)` 代表？ (A) 讀取第一個工作表 (B) 讀取第二個工作表 (C) 讀取名為 '1' 的工作表 (D) 不讀取
44. `msg['Subject']` 在郵件中代表？ (A) 主題 (B) 正文 (C) 收件人 (D) 附件
45. Scrapy 中 `yield scrapy.Request(url, callback=self.parse_detail)` 用於？ (A) 返回數據 (B) 發起下一個請求 (C) 結束程序 (D) 報錯
46. 處理圖片二值化常用的 Python 庫是？ (A) Pillow (B) NumPy (C) Pandas (D) Requests
47. `requests.post(url, data=payload)` 中 `data` 用於？ (A) URL 參數 (B) 表單數據 (C) JSON 數據 (D) Headers
48. BeautifulSoup 中的 `.parent` 作用是？ (A) 獲取子節點 (B) 獲取父節點 (C) 獲取兄弟節點 (D) 獲取自己
49. Selenium 的顯式等待通常配合哪個類別使用？ (A) `WebDriverWait` (B) `time` (C) `Thread` (D) `System`
50. `df.iloc[0:5]` 選取的是？ (A) 第 0 到 4 行 (B) 第 0 到 5 行 (C) 第 5 行 (D) 前 5 列

### 2. 多選題 (Multiple Choice, MC) - 共 50 題
51. 關於 Pandas 數據讀取，正確的有？ (A) 支援 CSV (B) 支援 Excel (C) 支援 SQL (D) 支援 JSON
52. `python-docx` 支援的操作包括？ (A) 添加段落 (B) 添加表格 (C) 添加圖片 (D) 修改頁首頁尾
53. 關於 `requests.Session()`，描述正確的有？ (A) 維持會話狀態 (B) 自動處理 Cookie (C) 跨請求複用連接 (D) 必須配合 Selenium
54. Selenium 的等待方式包括？ (A) 固定等待 (B) 隱式等待 (C) 顯式等待 (D) 隨機等待
55. Scrapy 的核心組件包括？ (A) Engine (B) Spider (C) Scheduler (D) Pipeline
56. 哪些因素會導致爬蟲被封？ (A) 請求頻率過快 (B) 缺少 User-Agent (C) 單一 IP 持續訪問 (D) 內容包含敏感詞
57. 關於 SMTP，正確的有？ (A) 用於發送郵件 (B) 預設端口 25 (C) 支援 TLS 加密 (D) 需要授權碼
58. BeautifulSoup 定位元素的方法有？ (A) `find()` (B) `select()` (C) `find_all()` (D) `xpath()`
59. 哪些是有效的 User-Agent 範例？ (A) Mozilla/5.0... (B) Chrome/91... (C) Python-requests... (D) robots.txt
60. Pandas 處理空值的方法有？ (A) `dropna()` (B) `fillna()` (C) `isnull()` (D) `drop()`
61. `python-pptx` 可以插入哪些內容？ (A) 文字框 (B) 圖表 (C) 圖片 (D) 表格
62. 關於 HTTP 狀態碼，正確的有？ (A) 200 成功 (B) 404 未找到 (C) 500 伺服器錯誤 (D) 403 禁止
63. 模擬登入常見的 Payload 格式有？ (A) Form Data (B) JSON (C) XML (D) Text
64. Selenium 模擬操作包含？ (A) `click()` (B) `send_keys()` (C) `submit()` (D) `scroll()`
65. Scrapy Middleware 可以實現？ (A) 設置代理 (B) 設置隨機 UA (C) 處理重定向 (D) 數據持久化
66. 關於 OCR，正確的有？ (A) 識別圖片文字 (B) 需要預處理圖片 (C) 準確率受噪點影響 (D) 只能識別數字
67. 郵件 MIME 類型包括？ (A) `MIMEText` (B) `MIMEMultipart` (C) `MIMEImage` (D) `MIMEApplication`
68. XPath 的定位語法包含？ (A) `@attr` (B) `text()` (C) `//` (D) `..`
69. 關於 `df.merge()`，描述正確的有？ (A) 類似 SQL Join (B) 支援 Left Join (C) 支援 Inner Join (D) 只能按索引合併
70. `python-docx` 的 `Run` 對象屬性有？ (A) `bold` (B) `italic` (C) `font.size` (D) `alignment`
71. 爬蟲合規性建議包括？ (A) 遵守 Robots.txt (B) 限制抓取速度 (C) 標明爬蟲身份 (UA) (D) 抓取個人隱私數據
72. Selenium 處理彈窗的方法有？ (A) `switch_to.alert` (B) `accept()` (C) `dismiss()` (D) `ignore()`
73. Scrapy Spider 內的屬性包含？ (A) `name` (B) `start_urls` (C) `parse` (D) `pipeline`
74. 關於代理 IP，正確的有？ (A) 隱藏真實 IP (B) 分為透明與匿名 (C) 免費代理通常不穩定 (D) 只能用於 GET 請求
75. 辦公自動化的優點？ (A) 減少重複勞動 (B) 降低出錯率 (C) 提高效率 (D) 不需要寫代碼
76. Pandas `df.info()` 可以看到？ (A) 每欄數據類型 (B) 空值數量 (C) 內存佔用 (D) 數據分佈情況
77. 關於 CSS 選擇器，正確的有？ (A) `#id` 定位 ID (B) `.class` 定位類名 (C) `div > p` 定位子元素 (D) `div p` 定位後代元素
78. Scrapy `ItemPipeline` 可以做？ (A) 數據清洗 (B) 數據驗證 (C) 存入數據庫 (D) 請求攔截
79. 如何防止被反爬？ (A) 隨機 User-Agent (B) 隨機延時 (C) 代理池 (D) 模擬登入
80. 關於 `requests.post()`，正確的有？ (A) 可以傳送 `data` (B) 可以傳送 `json` (C) 常用於提交表單 (D) 數據長度有限制
81. Selenium WebDriver 支援的瀏覽器？ (A) Chrome (B) Firefox (C) Edge (D) Safari
82. 哪些是 `MIMEMultipart` 的子類型？ (A) `mixed` (B) `alternative` (C) `related` (D) `single`
83. `pd.read_csv()` 的參數包括？ (A) `sep` (B) `header` (C) `names` (D) `usecols`
84. Word 表格操作包含？ (A) `add_table()` (B) `cell(r, c).text` (C) `rows` (D) `columns`
85. Scrapy 中的 `Settings` 可以配置？ (A) 併發數 (B) 延遲時間 (C) Middleware 權重 (D) 數據庫路徑
86. 網頁數據抓取的難點？ (A) 動態渲染 (B) 驗證碼 (C) 封 IP (D) 數據結構變化
87. `df.sort_values()` 支援？ (A) 單列排序 (B) 多列排序 (C) 升序降序 (D) 隨機排序
88. 關於 BeautifulSoup 解析器，正確的有？ (A) `html.parser` (B) `lxml` (C) `html5lib` (D) `json.parser`
89. Selenium 的高級交互功能？ (A) `ActionChains` (B) `Drag and drop` (C) `Double click` (D) `Context click`
90. Scrapy 項目目錄結構包含？ (A) `spiders/` (B) `items.py` (C) `pipelines.py` (D) `settings.py`
91. 關於郵件發送，正確的有？ (A) 主題需編碼 (B) 附件需編碼 (C) 收件人可是列表 (D) 內容可是 HTML
92. `df.groupby()` 常用的聚合函數？ (A) `sum()` (B) `mean()` (C) `count()` (D) `max()`
93. Selenium 切換標籤頁的方法？ (A) `window_handles` (B) `switch_to.window()` (C) `new_window()` (D) `close()`
94. 反爬蟲的技術手段？ (A) IP 限流 (B) 字體加密 (C) 驗證碼 (D) 封禁 User-Agent
95. Scrapy `Selector` 支援？ (A) XPath (B) CSS (C) 正則表達式 (D) SQL
96. `pd.DataFrame()` 可以從什麼轉化而來？ (A) 字典 (B) 列表 (C) NumPy 數組 (D) 另一個 DataFrame
97. Word 報表自動化的應用場景？ (A) 自動合同 (B) 定期報告 (C) 批量信封 (D) 在線遊戲
98. 哪些是爬蟲框架？ (A) Scrapy (B) PySpider (C) Requests (D) Selenium
99. Selenium 的等待條件 (EC) 有？ (A) `presence_of_element_located` (B) `element_to_be_clickable` (C) `title_is` (D) `text_to_be_present_in_element`
100. 辦公自動化的學習路徑？ (A) 基礎語法 (B) 數據處理 (C) 文檔控制 (D) 通信自動化

### 3. 填充題 (Fill-in-the-blank, Fill) - 共 50 題
101. Pandas 中合併兩個 DataFrame 且依據共通欄位對齊的方法是 __________。
102. `python-docx` 中獲取段落內容的屬性是 `p.________`。
103. 在 SMTP 中，用於加密傳輸的指令通常是 `server.________()`。
104. 獲取 HTTP 響應文本內容的屬性是 `res.________`。
105. BeautifulSoup 中使用 CSS 選擇器查找所有匹配項的方法是 `soup.________()`。
106. Selenium 中全局最長等待時間的設置方法是 `implicitly_________(seconds)`。
107. Scrapy 中負責過濾 URL 的組件是 __________。
108. 將 DataFrame 保存為 Excel 的函數是 `to_________()`。
109. `python-pptx` 中幻燈片母版的英文是 Slide __________。
110. 發送 HTML 格式郵件，`MIMEText` 的第二個參數應設為 '________'。
111. `requests.get()` 的預設超時是 __________（無限制）。
112. 檢查 DataFrame 前 5 行的函數是 `df.________()`。
113. 向 Word 文檔添加圖片的方法是 `doc.add_________()`。
114. Selenium 定位元素的新版語法需要導入 __________ 類別。
115. Scrapy 的數據定義檔案通常名為 __________。
116. `df.isnull().________()` 可以統計每一列的空值數量。
117. 郵件附件中文檔名亂碼，應對檔名進行 __________ 編碼。
118. XPath 中選取父節點的語法是 __________。
119. `requests.Session()` 物件會自動保存 __________。
120. `BeautifulSoup(html, '________')` 推薦使用速度較快的解析器。
121. Selenium 切換到 iframe 的方法是 `switch_to.________()`。
122. Scrapy 運行爬蟲的指令是 `scrapy ________ spider_name`。
123. 處理圖片 OCR 前，通常先進行 __________ 化以提高對比。
124. `pd.read_csv()` 忽略首行的參數是 `header=________`。
125. `python-pptx` 中設置寬度為 5 英吋需使用 `________(5)`。
126. 爬蟲中 Robots 協議檔案的完整名稱是 __________。
127. `df.dropna()` 預設刪除包含空值的 __________。
128. `python-docx` 中設置字體為斜體的屬性是 `run.________ = True`。
129. `requests.post()` 的 Payload 參數名是 __________ 或 json。
130. BeautifulSoup 中獲取標籤屬性的方法是 `tag['________']`。
131. Selenium 驅動瀏覽器需要對應的 __________ 程式。
132. Scrapy 中負責將數據保存到資料庫的組件是 Item __________。
133. 處理加密字體時，需要解析 __________ 檔案（副檔名）。
134. `df.drop_duplicates(inplace=________)` 可以直接修改原對象。
135. `MIMEMultipart()` 的對象需要調用 `________()` 方法來添加部分。
136. XPath 中 `@` 符號用於選取 __________。
137. `requests.get()` 的狀態碼屬性是 `status_________`。
138. BeautifulSoup 中獲取標籤內所有純文本的方法是 `get_________()`。
139. Selenium 模擬滑鼠懸停需要使用 __________ 類別。
140. Scrapy 專案的配置文件是 __________。
141. `df.groupby('col').________()` 可以計算各組的平均值。
142. `python-docx` 添加表格的方法是 `add_________()`。
143. 設置郵件的主題，代碼是 `msg['________'] = "Subject"`。
144. `pd.concat()` 垂直堆疊時，`axis` 參數應設為 __________。
145. Selenium 獲取當前頁面標題的屬性是 `driver.________`。
146. Scrapy Spider 中，預設的回調方法名是 __________。
147. OCR 引擎 Tesseract 的 Python 封裝庫名是 __________。
148. `df.shape` 返回一個元組，第一個元素代表 __________ 數。
149. `python-pptx` 中添加一張幻燈片的方法是 `add_________()`。
150. 當我們需要模擬人為點擊按鈕，Selenium 應調用 `.________()` 方法。

---

## 五、 Q 矩陣 (Q-matrix)
*(略，參考各週詳細 Q 矩陣)*
