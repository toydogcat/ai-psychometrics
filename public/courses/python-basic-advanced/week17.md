# 課程一：第 17 週 - 例外處理與日誌紀錄 (Exception Handling & Logging)

穩健的程式不僅要能正常運行，更要能優雅地處理錯誤。本週我們將學習如何捕捉與處理例外，建立自定義異常類別，並使用 Python 內建的 `logging` 模組取代傳統的 `print` 進行系統追蹤，這是邁向專業開發者的必經之路。

---

## 一、 單元講解 (Lecture) - 100 分鐘

### 1. 例外處理架構：`try...except...else...finally`
- **`try` 區塊**：放置可能出錯的程式碼。
- **`except` 區塊**：捕捉特定類型的錯誤（如 `ValueError`, `IOError`）。
- **`else` 區塊**：當沒有錯誤發生時執行的程式碼。
- **`finally` 區塊**：無論是否有錯誤發生，都一定會執行的清理工作（如關閉資料庫連線）。

### 2. 拋出例外與自定義異常 (Custom Exceptions)
- **`raise` 語句**：手動觸發一個例外。
- **例外鏈 (Exception Chaining)**：使用 `raise ... from ...` 傳遞錯誤。
- **自定義例外類別**：繼承自 `Exception` 類別，為特定業務邏輯定義專屬錯誤。

### 3. 日誌紀錄基礎 (Logging Basics)
- **為什麼不用 `print`？**：日誌的分級、格式化與持久化優點。
- **日誌等級**：`DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL`。
- **基礎配置**：使用 `logging.basicConfig()` 設定等級、輸出格式與存檔路徑。

### 4. 進階日誌架構 (Loggers, Handlers, Formatters)
- **Logger**：紀錄器的入口。
- **Handler**：決定日誌輸出到哪裡（控制台、檔案、甚至是 Email）。
- **Formatter**：定義日誌的排版風格。

### 5. 除錯最佳實踐 (Debugging Best Practices)
- **斷言 (Assertions)**：使用 `assert` 進行防禦性程式設計。
- **呼叫堆疊 (Call Stack)**：閱讀 `traceback` 資訊，精確定位錯誤發生位置。
- **除錯器簡介**：初探 `pdb` (Python Debugger) 的基本指令。

---

## 二、 動手實作 (Lab) - 50 分鐘

### 任務：開發「高可用性系統監控器」
1.  **實作「除以零與型別檢查器」**：
    - 撰寫一個計算器函式，能處理使用者輸入的各種異常情況。
    - 使用 `try...except` 捕捉 `ZeroDivisionError` 與 `TypeError`。
2.  **實作「自定義銀行提款異常」**：
    - 定義一個 `InsufficientFundsError` 類別。
    - 撰寫一個提款函式，若餘額不足則拋出該異常，並在主程式中妥善捕捉它。
3.  **建立「應用程式執行日誌」**：
    - 配置一個日誌系統，將 `INFO` 等級以上的資訊輸出到 `app.log`，而 `ERROR` 等級同時輸出到控制台。
    - 紀錄程式啟動、關鍵運算、錯誤捕捉的過程。
4.  **防禦性程式實踐**：
    - 在一個複雜的資料處理函式中使用 `assert` 檢查輸入參數的合法性。
    - 觀察當斷言失敗時，程式的行為。

---

## 三、 本週知識點回顧 (KP)

- **[KP 17.1] 精確捕捉**：永遠優先捕捉具體的異常（如 `FileNotFoundError`），避免盲目使用萬能的 `except Exception:`。
- **[KP 17.2] 資源清理**：`finally` 是確保資源釋放（檔案、連線）的最後一道防線。
- **[KP 17.3] 日誌等級權重**：掌握五個日誌等級的適用場景，確保日誌資訊具備過濾與搜尋價值。
- **[KP 17.4] 異常自定義化**：透過自定義類別，讓錯誤訊息具備更好的語義性。
- **[KP 17.5] Fail Fast 原則**：及早發現錯誤（如使用 `assert`），避免錯誤擴散到系統深處。

---

## 四、 課後測驗題庫 (Quiz) - 30 分鐘

### 1. 單選題 (Single Choice) - 10 題

1. **Q1**: 下列哪一個區塊不論是否發生錯誤都會執行？
   - (A) `try` (B) `else` (C) `finally` (D) `except`
2. **Q2**: 手動拋出一個例外的關鍵字是？
   - (A) `throw` (B) `raise` (C) `emit` (D) `trigger`
3. **Q3**: 自定義異常類別通常應該繼承自哪一個類別？
   - (A) `BaseException` (B) `Exception` (C) `Error` (D) `Object`
4. **Q4**: 預設情況下，`logging` 模組的過濾等級是？
   - (A) `DEBUG` (B) `INFO` (C) `WARNING` (D) `ERROR`
5. **Q5**: `logging.critical("System crash!")` 的權重比 `logging.error()` 來的？
   - (A) 高 (B) 低 (C) 相等 (D) 不確定
6. **Q6**: `try` 語句中的 `else` 區塊會在何時執行？
   - (A) 發生錯誤時 (B) 沒有發生錯誤時 (C) 程式結束前 (D) 每次都執行
7. **Q7**: 獲取完整的錯誤堆疊資訊，可以使用哪個模組？
   - (A) `sys` (B) `os` (C) `traceback` (D) `logging`
8. **Q8**: 關於 `assert` 語句，下列敘述何者正確？
   - (A) 它用於生產環境的錯誤處理 (B) 若條件為 False，拋出 `AssertionError` (C) 它會自動嘗試修復錯誤 (D) 它是 `try` 的替代方案
9. **Q9**: 在 `except` 區塊中，若想獲取例外物件本身，應寫為？
   - (A) `except ValueError(e):` (B) `except ValueError as e:` (C) `except e from ValueError:` (D) `except ValueError(get e):`
10. **Q10**: 哪一個日誌等級適合紀錄程式運行的詳細偵錯資訊？
    - (A) `DEBUG` (B) `INFO` (C) `WARNING` (D) `ERROR`

### 2. 多選題 (Multiple Choice) - 10 題

11. **Q11**: 關於 `try...except` 的使用建議，哪些正確？
    - (A) 應盡量縮小 `try` 區塊的範圍 (B) 應捕捉具體的異常類別 (C) 可以在一個 `try` 後接多個 `except` (D) 必須包含 `finally` 區塊
12. **Q12**: 哪些是 `logging` 模組的核心組件？
    - (A) Logger (B) Handler (C) Formatter (D) Filter
13. **Q13**: 關於自定義例外，哪些敘述正確？
    - (A) 可以包含自定義屬性與方法 (B) 名字通常以 `Error` 結尾 (C) 必須實作 `__init__` (D) 提升了程式碼的可讀性
14. **Q14**: 下列哪些屬於 Python 內建的例外？
    - (A) `KeyError` (B) `IndexError` (C) `AttributeError` (D) `LogicError`
15. **Q15**: 哪些方法可以用於配置日誌系統？
    - (A) `logging.basicConfig()` (B) 使用設定檔 (JSON/YAML) (C) 直接在程式中建立 Logger 物件 (D) `print` 重導向
16. **Q16**: `finally` 區塊常見的用途包括？
    - (A) 關閉檔案指標 (B) 釋放網路連線 (C) 回傳函式最終結果 (D) 重置全域變數
17. **Q17**: 關於 `raise` 語句，哪些正確？
    - (A) 可以不帶參數（在 except 中重新拋出） (B) 可以拋出一個異常類別 (C) 可以拋出一個異常實例 (D) 只能在函式內使用
18. **Q18**: 哪些情況會導致日誌訊息不顯示？
    - (A) 訊息等級低於 Logger 設定的等級 (B) 未配置任何 Handler (C) 程式崩潰太快 (D) Logger 名稱不正確
19. **Q19**: 防禦性程式設計 (Defensive Programming) 包含？
    - (A) 嚴格的輸入驗證 (B) 詳盡的日誌紀錄 (C) 適當的例外處理 (D) 使用斷言檢查程式狀態
20. **Q20**: 關於 `logging.StreamHandler()`，哪些正確？
    - (A) 它將日誌輸出到流（如 sys.stderr） (B) 它可以設定自己的格式 (Formatter) (C) 它可以設定獨立的過濾等級 (D) 它會自動將日誌寫入磁碟

### 3. 填充題 (Fill-in-the-blank) - 10 題

21. 在 `except` 區塊中使用單獨的 __________ 關鍵字可以將目前的錯誤重新拋出。
22. `logging.__________` 等級通常用於紀錄系統正常運作的里程碑事件。
23. 捕捉所有類型的例外通常會使用 `except __________:` (雖然不建議)。
24. 當 `try` 區塊中發生錯誤時，程式會跳過剩餘代碼並進入匹配的 __________ 區塊。
25. 執行 `python -O myscript.py` 會停用程式中的 __________ 語句。
26. 日誌格式字串 `%(asctime)s` 代表日誌產生的 __________。
27. 一個 Logger 可以擁有多個 __________，分別將訊息送到不同的目的地。
28. `ZeroDivisionError` 是繼承自 __________ 類別。
29. `with` 語句相較於 `try...finally` 在處理檔案時更加 __________ (簡潔/高效)。
30. 自定義例外類別的定義範例：`class MyError(__________): pass`。

---

## 五、 Q 矩陣 (Q-matrix)

| 題號 | KP 17.1 (try) | KP 17.2 (finally) | KP 17.3 (日誌) | KP 17.4 (自定義) | KP 17.5 (除錯) |
|---|:---:|:---:|:---:|:---:|:---:|
| Q1 | | 1 | | | |
| Q2 | 1 | | | | |
| Q3 | | | | 1 | |
| Q4 | | | 1 | | |
| Q5 | | | 1 | | |
| Q6 | 1 | | | | |
| Q7 | | | | | 1 |
| Q8 | | | | | 1 |
| Q9 | 1 | | | | |
| Q10 | | | 1 | | |
| Q11 | 1 | | | | |
| Q12 | | | 1 | | |
| Q13 | | | | 1 | |
| Q14 | 1 | | | | |
| Q15 | | | 1 | | |
| Q16 | | 1 | | | |
| Q17 | 1 | | | | |
| Q18 | | | 1 | | |
| Q19 | | | | | 1 |
| Q20 | | | 1 | | |
| Q21 | 1 | | | | |
| Q22 | | | 1 | | |
| Q23 | 1 | | | | |
| Q24 | 1 | | | | |
| Q25 | | | | | 1 |
| Q26 | | | 1 | | |
| Q27 | | | 1 | | |
| Q28 | 1 | | | | |
| Q29 | | 1 | | | |
| Q30 | | | | 1 | |
