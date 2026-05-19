# 第 4 週：電子郵件自動化與排程 (smtplib/email)

## 一、 單元講解 (Lecture)
本單元將學習如何使用 Python 自動發送電子郵件，實現報表自動派送與系統異常警報。 (100 分鐘)

### 1. SMTP 協議與安全連接 (20 min)
- **協議原理**: 了解 SMTP (Simple Mail Transfer Protocol) 的運作流程。
- **伺服器連接**: 使用 `smtplib.SMTP` 與 `SMTP_SSL`。
- **認證機制**: 處理第三方郵件服務 (如 Gmail, Outlook) 的應用程式密碼與 TLS 加密。

### 2. MIME 郵件結構 (20 min)
- **email.mime 模組**: 理解 `MIMEMultipart`, `MIMEText`, `MIMEImage` 的用途。
- **郵件頭信息**: 設置 Subject (主題), From (寄件者), To (收件者) 與 CC (抄送)。

### 3. HTML 郵件與多媒體 (20 min)
- **HTML 格式**: 如何構建美觀的 HTML 郵件內容。
- **內嵌圖片**: 在 HTML 中使用 `cid` 引用郵件內的圖片資源。
- **樣式限制**: 了解郵件客戶端對 CSS 支援的局限性。

### 4. 附件處理 (20 min)
- **MIMEApplication**: 如何讀取二進制檔案 (Excel, PDF, Zip) 並附加到郵件。
- **編碼問題**: 處理附件檔名包含中文時的編碼與解碼技巧。

### 5. 批量發送與排程建議 (20 min)
- **多收件人**: 如何高效循環發送或使用列表發送。
- **異常處理**: 捕捉發送失敗的異常並記錄日誌。
- **排程簡介**: 配合 `schedule` 庫或作業系統任務排程器定時執行。

---

## 二、 動手實作 (Lab)
練習構建一個功能完備的自動化郵件派送系統。 (50 分鐘)

### 1. 自動化銷售報表派送 (20 min)
- **任務**: 腳本自動檢查特定資料夾，若有新的 Excel 報表生成，則自動發送給指定經理。
- **要求**: 郵件正文需包含簡單的 HTML 表格摘要。

### 2. 批量生日祝福郵件 (15 min)
- **任務**: 從 CSV 讀取當天生日的員工名單，自動發送帶有個性化稱呼與賀圖的郵件。

### 3. 系統監控報警器 (15 min)
- **任務**: 模擬一個監控程序，當某個數據指標異常時，立即發送一封緊急報警郵件。

---

## 三、 本週知識點回顧 (KP)
- **[KP 4.1]**: 熟練掌握 SMTP 伺服器連接、TLS 加密與應用程式密碼認證 (`smtplib`)。
- **[KP 4.2]**: 理解 `email.mime` 模組，學會構建多部分郵件 (Multipart) 容器。
- **[KP 4.3]**: 掌握 HTML 郵件內容構建，實現帶有樣式與內嵌圖片的精美排版。
- **[KP 4.4]**: 熟練處理不同類型的郵件附件，解決中文檔名亂碼問題。
- **[KP 4.5]**: 學習多人發送邏輯與基本的發送異常處理機制。

---

## 四、 課後測驗題庫 (Quiz)

### 1. 單選題 (Single Choice, SC)
1. 發送帶有 Excel 附件的郵件時，應該使用哪種 MIME 類型對象作為容器？ (A) MIMEText (B) MIMEMultipart (C) MIMEImage (D) MIMEAudio
2. 在 SMTP 發送郵件時，調用 `server.login(user, password)` 的 `password` 對於 Gmail 等服務，通常需要使用？ (A) 登入密碼 (B) 應用程式密碼 (C) 二次驗證碼 (D) 授權 Token
3. 下列哪個模組主要負責連接郵件伺服器？ (A) `smtplib` (B) `email` (C) `imaplib` (D) `requests`
4. 預設的 SMTP SSL 端口通常是？ (A) 25 (B) 465 (C) 587 (D) 80
5. 在 `email.mime.text` 中，發送 HTML 格式應設置第二個參數為？ (A) 'plain' (B) 'html' (C) 'xml' (D) 'text'
6. 如何向郵件中添加抄送人 (CC)？ (A) 在 `msg['Cc']` 中設置 (B) 在 `sendmail` 的第二個參數中包含 (C) 兩者皆需設置 (D) 無法實現
7. 附件內容在加入郵件前，通常需要進行哪種編碼？ (A) UTF-8 (B) Base64 (C) ASCII (D) Hex
8. 若要啟動 TLS 加密通信，應調用哪個方法？ (A) `server.starttls()` (B) `server.encrypt()` (C) `server.secure()` (D) `server.connect_ssl()`
9. `msg.as_string()` 的作用是？ (A) 保存郵件到本地 (B) 將郵件對象轉換為符合協議的字串 (C) 只提取正文 (D) 翻譯郵件內容
10. SMTP 協議的全稱是？ (A) Simple Mail Transfer Protocol (B) Smart Mail Text Process (C) Secure Mail Transfer Port (D) System Mail Type Program

### 2. 多選題 (Multiple Choice, MC)
11. 下列哪些是發送郵件自動化時常見的安全隱患？ (A) 代碼中明文保存密碼 (B) 頻繁發送導致 IP 被封禁 (C) 使用 `starttls()` (D) 傳輸敏感數據未加密
12. 關於 `MIMEMultipart` 的子類型，正確的有？ (A) `mixed`: 用於包含附件 (B) `related`: 用於內嵌資源 (C) `alternative`: 用於同時包含純文本與 HTML (D) `simple`: 用於單一部分
13. 下列哪些郵件服務商通常需要特定的 SMTP 設置？ (A) Gmail (B) Outlook (C) Yahoo (D) 私有公司郵箱
14. 附件處理時，哪些步驟是必要的？ (A) 讀取檔案二進制內容 (B) 創建 `MIMEApplication` 對象 (C) 設置 `Content-Disposition` (D) 必須壓縮檔案
15. HTML 郵件中引用圖片的常見方式包括？ (A) 使用遠端圖片 URL (B) 使用 Base64 編碼內嵌 (C) 使用 `cid` 引用附件圖片 (D) 直接插入二進制流
16. `smtplib` 可能拋出的異常包括？ (A) `SMTPAuthenticationError` (B) `SMTPConnectError` (C) `SMTPSenderRefused` (D) `FileNotFoundError`
17. 關於多收件人發送，下列描述正確的有？ (A) `msg['To']` 應為逗號分隔的字串 (B) `sendmail` 的收件人參數應為列表 (C) CC 與 BCC 都不會出現在 `sendmail` 參數中 (D) BCC 收件人不會出現在郵件頭中
18. 下列哪些是防止郵件被歸類為垃圾郵件的建議？ (A) 設置正確的寄件者名稱 (B) 避免過度頻繁發送 (C) 內容不要包含大量敏感詞 (D) 隱藏真實 IP
19. 郵件主題 (Subject) 若包含中文，應？ (A) 直接寫入 (B) 使用 `Header` 對象編碼 (C) 轉換為拼音 (D) 使用 `utf-8` 設置
20. `email` 模組可以幫助我們？ (A) 解析郵件 (B) 構建郵件 (C) 管理聯絡人 (D) 搜索郵件伺服器

### 3. 填充題 (Fill-in-the-blank, Fill)
21. 在 Python 中發送郵件的核心標準庫模組是 __________。
22. SMTP 預設的不加密端口是 __________。
23. 若要發送帶有附件的郵件，必須使用 `MIME________` 作為根容器。
24. 添加郵件主題的語法是 `msg['________'] = "主題內容"`。
25. `server.________()` 應在郵件發送完畢後調用以關閉連接。
26. 對於 Gmail 服務，通常需要在 Google 帳戶設置中開啟 __________ 以獲取專用密碼。
27. `MIMEText(content, 'html', '________')` 建議指定字符集。
28. 附件的 `Content-Disposition` 通常設置為 "attachment; filename=____"。
29. `sendmail(from, to, msg.________())` 是發送郵件的關鍵調用。
30. SMTP 加密通信中，常用的兩種方式是 SSL 和 __________。

---

## 五、 Q 矩陣 (Q-matrix)
| 題目 | KP4.1 | KP4.2 | KP4.3 | KP4.4 | KP4.5 |
|---|---|---|---|---|---|
| SC1 | 0 | 1 | 0 | 0 | 0 |
| SC2 | 1 | 0 | 0 | 0 | 0 |
| SC3 | 1 | 0 | 0 | 0 | 0 |
| SC4 | 1 | 0 | 0 | 0 | 0 |
| SC5 | 0 | 1 | 1 | 0 | 0 |
| SC6 | 0 | 0 | 0 | 0 | 1 |
| SC7 | 0 | 0 | 0 | 1 | 0 |
| SC8 | 1 | 0 | 0 | 0 | 0 |
| SC9 | 0 | 1 | 0 | 0 | 0 |
| SC10| 1 | 0 | 0 | 0 | 0 |
| MC11| 1 | 0 | 0 | 0 | 0 |
| MC12| 0 | 1 | 0 | 0 | 0 |
| MC13| 1 | 0 | 0 | 0 | 0 |
| MC14| 0 | 0 | 0 | 1 | 0 |
| MC15| 0 | 0 | 1 | 0 | 0 |
| MC16| 1 | 0 | 0 | 0 | 0 |
| MC17| 0 | 0 | 0 | 0 | 1 |
| MC18| 0 | 0 | 0 | 0 | 1 |
| MC19| 0 | 1 | 0 | 0 | 0 |
| MC20| 0 | 1 | 0 | 0 | 0 |
| Fill21| 1 | 0 | 0 | 0 | 0 |
| Fill22| 1 | 0 | 0 | 0 | 0 |
| Fill23| 0 | 1 | 0 | 0 | 0 |
| Fill24| 0 | 1 | 0 | 0 | 0 |
| Fill25| 1 | 0 | 0 | 0 | 0 |
| Fill26| 1 | 0 | 0 | 0 | 0 |
| Fill27| 0 | 1 | 0 | 0 | 0 |
| Fill28| 0 | 0 | 0 | 1 | 0 |
| Fill29| 1 | 1 | 0 | 0 | 0 |
| Fill30| 1 | 0 | 0 | 0 | 0 |
