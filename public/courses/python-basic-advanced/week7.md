# 課程一：第 7 週 - 函數與模組 (Functions & Modules)

本文件包含了第 7 週完整的教學大綱、實作指南以及練習題庫。

---

## 一、 單元講解 (Lecture) - 總計 100 分鐘

### 1. 函數定義與參數傳遞 (20 min)
*   **基礎語法 (KP7.1)**：使用 `def` 關鍵字，縮進編寫代碼塊。
*   **參數類型**：
    *   **位置參數 (Positional)**：按順序傳入。
    *   **關鍵字參數 (Keyword)**：指定 `name=value`。
    *   **預設參數**：`def func(a=10):` (注意：不可變物件作為預設值的陷阱)。
*   **回傳值 (Return)**：可以回傳單一值、多個值 (Tuple) 或 `None`。

### 2. 不定長度參數 (*args, **kwargs) (20 min)
*   **`*args` (KP7.2)**：收集多餘的位置參數，封裝成 Tuple。
*   **`**kwargs`**：收集多餘的關鍵字參數，封裝成 Dictionary。
*   **參數解包 (Unpacking)**：呼叫函數時使用 `*` 或 `**` 將容器展開。

### 3. 變數作用域 (Scope) (20 min)
*   **LEGB 原則 (KP7.3)**：
    *   **L**ocal (區域), **E**nclosing (閉包外層), **G**lobal (全域), **B**uilt-in (內建)。
*   **`global` 與 `nonlocal`**：何時需要宣告這些關鍵字來修改外層變數。

### 4. 模組匯入與命名空間 (20 min)
*   **匯入方式 (KP7.4)**：
    *   `import module`
    *   `from module import function`
    *   `import module as alias`
*   **`__name__ == "__main__"`**：區分模組是被匯入還是直接執行。
*   **自定義模組**：建立 `.py` 檔案並在其他地方匯入。

### 5. 常用標準函數庫 (Standard Library) (20 min)
*   **`os`, `sys`**：系統操作與環境變數。
*   **`math`, `random`**：數學運算與隨機數生成。
*   **`datetime`**：日期與時間處理。
*   **`json`**：資料格式交換。

---

## 二、 動手實作 (Lab) - 總計 50 分鐘

### 實作一：多功能計算器模組 (20 min)
**任務目標**：練習函數定義與模組匯入。
1.  建立一個檔案 `my_math.py`，包含加、減、乘、除四個函數。
2.  在主程式 `main.py` 中匯入 `my_math` 並呼叫其功能。
3.  確保 `my_math.py` 中有測試代碼，且只有在直接執行時才會跑測試。

### 實作二：靈活的打招呼函數 (15 min)
**任務目標**：練習 `*args` 與 `**kwargs`。
1.  寫一個函數 `greet(*names, **details)`。
2.  `names` 可以接收多個名字，並對每個人說 Hello。
3.  `details` 接收如 `title="Manager"`, `location="Taipei"` 等資訊並印出。
4.  測試：`greet("Alice", "Bob", title="Engineers")`。

### 實作三：猜數字遊戲加強版 (15 min)
**任務目標**：練習 `random` 模組與作用域。
1.  使用 `random.randint(1, 100)` 生成目標數字。
2.  使用一個全域變數記錄「最高分」(最少次數)。
3.  建立函數進行遊戲，若打破記錄，使用 `global` 更新最高分。

---

## 三、 本週知識點回顧 (KP)
- **KP7.1**: 函數定義、參數型態 (位置、關鍵字、預設) 與回傳機制。
- **KP7.2**: 不定長度參數 `*args` 與 `**kwargs` 的打包與解包。
- **KP7.3**: 變數作用域 LEGB 原則與 `global` 關鍵字。
- **KP7.4**: 模組匯入機制 (`import`, `as`, `from`) 與 `if __name__ == "__main__"`。
- **KP7.5**: Python 常用標準庫 (`os`, `sys`, `math`, `random`, `datetime`)。

---