# 課程一：第 3 週 - 流程控制：條件判斷與邏輯分支

本文件包含了第 3 週完整的教學大綱、實作指南以及練習題庫。

---

## 一、 單元講解 (Lecture) - 總計 100 分鐘

### 1. 條件判斷基礎 (20 min)
*   **if / elif / else 結構 (KP3.1)**：
    *   Python 使用縮進來定義代碼塊，冒號 `:` 是語法的關鍵。
    *   `elif` 是 `else if` 的縮寫，可以有多個。
    *   `else` 為可選項，捕捉所有未被滿足的條件。
*   **縮進的重要性**：混用空格與 Tab 會導致毀滅性的 `IndentationError`。

### 2. 複雜條件與邏輯運算符 (20 min)
*   **比較運算符 (KP3.2)**：`==`, `!=`, `>`, `<`, `>=`, `<=`, `is`, `in`。
*   **組合條件**：使用 `and`, `or`, `not` 連接多個判斷。
*   **成員運算符**：`"a" in "apple"` 會返回 `True`。

### 3. 邏輯短路與運算順序 (20 min)
*   **短路求值 (Short-circuiting) (KP3.3)**：
    *   `and`：若第一個條件為 False，則不計算第二個。
    *   `or`：若第一個條件為 True，則不計算第二個。
    *   應用：可用於防止除以零或檢查 None 物件。
*   **優先級**：`not` > `and` > `or`。

### 4. 三元運算子 (Ternary Operator) (20 min)
*   **語法 (KP3.4)**：`值1 if 條件 else 值2`。
*   **特點**：簡潔，適合簡單的賦值操作。
*   **限制**：過於複雜的判斷不建議使用，會降低程式碼可讀性。

### 5. 結構化模式匹配 (match-case) (20 min)
*   **Python 3.10+ 新特性 (KP3.5)**：
    *   類似其他語言的 `switch-case`，但功能更強大。
    *   `case _`：代表預設情況 (wildcard)。
    *   支援解構 (Destructuring) 與條件過濾 (Guards)。
*   **巢狀條件的最佳實踐 (KP3.6)**：
    *   避免「末日金字塔」(過深的嵌套)。
    *   使用「衛句」(Guard Clauses) 提早回傳。

---

## 二、 動手實作 (Lab) - 總計 50 分鐘

### 實作一：進階 BMI 計算器 (15 min)
**任務目標**：練習多重 `elif` 與數值判斷。
1.  讓用戶輸入身高 (m) 與體重 (kg)。
2.  計算 BMI = weight / (height ** 2)。
3.  根據 BMI 輸出等級：
    - < 18.5: 體重過輕
    - 18.5 - 24: 正常
    - 24 - 27: 過重
    - \> 27: 肥胖
4.  額外挑戰：使用 `f-string` 格式化輸出，BMI 保留兩位小數。

### 實作二：登入系統模擬與邏輯短路 (15 min)
**任務目標**：理解短路求值與 `and/or`。
1.  定義正確的用戶名 `admin` 與密碼 `12345`。
2.  編寫判斷邏輯：
    ```python
    user = input("User: ")
    pwd = input("Pass: ")
    
    # 使用邏輯短路確保程式健壯
    if user == "admin" and pwd == "12345":
        print("Login Success")
    else:
        print("Access Denied")
    ```
3.  測試：如果 `user` 輸入錯誤，程式還會檢查 `pwd` 嗎？

### 實作三：使用 match-case 優化命令處理 (20 min)
**任務目標**：學習 Python 3.10+ 的新語法。
1.  模擬一個簡單的機器人控制系統。
2.  輸入指令 (up, down, left, right, quit)。
3.  使用 `match-case` 處理：
    ```python
    command = input("Enter direction: ").lower()
    match command:
        case "up" | "w":
            print("Moving North")
        case "down" | "s":
            print("Moving South")
        case "quit":
            print("Exiting...")
        case _:
            print("Unknown Command")
    ```

---

## 三、 本週知識點回顧 (KP)
- **KP3.1**: if/elif/else 的層級結構與縮進規範。
- **KP3.2**: 比較運算 (==, !=, in, is) 的應用。
- **KP3.3**: 邏輯短路 (Short-circuiting) 的原理與好處。
- **KP3.4**: 三元運算子 (Conditional Expression) 的寫法。
- **KP3.5**: match-case 結構化模式匹配。
- **KP3.6**: 巢狀條件 (Nested Conditions) 的優化技巧。

---