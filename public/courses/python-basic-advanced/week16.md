# 課程一：第 16 週 - 檔案處理與資料格式 (File Handling & Data Formats)

本週我們將深入探討 Python 處理不同檔案格式的技巧。除了基礎的文字檔讀寫，還會涵蓋業界常用的 JSON 與 CSV 格式，以及如何正確使用上下文管理器 (Context Managers) 來確保資源的安全性。

---

## 一、 單元講解 (Lecture) - 100 分鐘

### 1. 上下文管理器 (Context Managers) 與 `with` 語句
- **資源管理**：為什麼需要自動關閉檔案。
- **`with open(...) as f:`**：內部運作機制（`__enter__` 與 `__exit__`）。
- **多檔案處理**：在一個 `with` 語句中開啟多個檔案。

### 2. JSON 資料格式處理
- **JSON 簡介**：JavaScript Object Notation，輕量級的資料交換格式。
- **序列化 (Serialization)**：使用 `json.dump()` 與 `json.dumps()` 將 Python 物件轉為 JSON。
- **反序列化 (Deserialization)**：使用 `json.load()` 與 `json.loads()` 將 JSON 轉回 Python 物件。
- **自定義編碼**：處理日期時間 (DateTime) 等非標準 JSON 型別。

### 3. CSV 檔案讀寫
- **`csv` 模組**：處理逗號分隔值檔案。
- **`csv.reader` 與 `csv.writer`**：基礎的列表式讀寫。
- **`csv.DictReader` 與 `csv.DictWriter`**：更直觀的字典式讀寫，適合處理具備標題列 (Header) 的資料。
- **分隔符號自定義**：處理 TSV (Tab Separated Values) 或其他特殊分隔符。

### 4. 二進位檔案 (Binary Files) 處理
- **模式 `rb` 與 `wb`**：處理圖片、音訊或加密檔案。
- **位元組物件 (Bytes Objects)**：了解 `b'...'` 前綴。
- **基礎編碼知識**：UTF-8, Big5 與位元組之間的轉換。

### 5. 高階檔案操作技巧
- **指標移動**：`f.seek()` 與 `f.tell()` 的應用。
- **快取與效能**：緩衝區 (Buffering) 的概念。
- **大檔案處理策略**：分塊讀取 (Chunking) 以避免記憶體溢位。

---

## 二、 動手實作 (Lab) - 50 分鐘

### 任務：開發「個人資料中心 (Data Hub)」
1.  **實作「學生成績管理系統」**：
    - 從一個 `students.csv` 檔案讀取學生名單與分數。
    - 計算平均分後，將結果儲存為一個 `report.json` 檔案。
2.  **實作「設定檔管理器 (Config Manager)」**：
    - 撰寫一個支援 JSON 格式的設定檔讀寫類別。
    - 支援「讀取設定」、「修改單項設定」與「儲存變更」。
3.  **實作「圖片拷貝工具」**：
    - 使用二進位模式 (`rb`, `wb`) 撰寫一個腳本，複製一個 `.png` 或 `.jpg` 檔案。
    - 透過 `with` 語句確保檔案正確關閉。
4.  **大檔案關鍵字搜尋**：
    - 模擬一個 1GB 的文字檔案（可手動建立一個較大的循環檔案）。
    - 實作分塊讀取邏輯，統計特定關鍵字出現的次數。

---

## 三、 本週知識點回顧 (KP)

- **[KP 16.1] Context Manager**：`with` 語句是 Python 處理外部資源的最佳實踐，能有效防止資源洩漏。
- **[KP 16.2] JSON 與 Python 對應**：掌握 JSON 陣列對應 List、JSON 物件對應 Dict 的轉換規則。
- **[KP 16.3] DictReader 的便利性**：在處理 CSV 時，`DictReader` 能讓程式碼更具備自定義性與可讀性。
- **[KP 16.4] 二進位 vs 文字**：區分文字模式 (Default) 與二進位模式 (`b`)，避免編碼解析錯誤。
- **[KP 16.5] 序列化安全性**：了解 JSON 只能處理基礎型別，複雜物件需要額外轉換。

---
