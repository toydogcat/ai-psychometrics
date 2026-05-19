# 課程一：第 4 週 - 迴圈控制與自動化任務

本文件包含了第 4 週完整的教學大綱、實作指南以及練習題庫。

---

## 一、 單元講解 (Lecture) - 總計 100 分鐘

### 1. `for` 迴圈與 `range` 函數 (20 min)
*   **迭代器概念 (KP4.1)**：`for` 迴圈用於遍歷序列（字串、列表、range）。
*   **`range()` 詳解**：
    *   `range(stop)`：從 0 到 stop-1。
    *   `range(start, stop)`：從 start 到 stop-1。
    *   `range(start, stop, step)`：包含步長，支援遞減（如 `range(10, 0, -1)`）。
*   **遍歷字串**：逐字元處理。

### 2. `while` 迴圈與條件控制 (20 min)
*   **運作原理 (KP4.2)**：只要條件為 `True` 就持續執行。
*   **無限迴圈 (Infinite Loop)**：
    *   成因：忘記更新循環變數。
    *   應對：使用 `Ctrl+C` (本地) 或停止按鈕 (Colab) 強制結束。
*   **適用場景**：未知循環次數的情況（如：等待用戶正確輸入）。

### 3. 迴圈中斷與跳過 (break/continue) (20 min)
*   **`break` (KP4.3)**：立即終止整個迴圈，跳出循環體。
*   **`continue` (KP4.3)**：跳過本次剩餘代碼，直接進入下一次迭代。
*   **對比**：`break` 是「結束」，`continue` 是「換下一個」。

### 4. 迴圈與 `else` 區塊 (20 min)
*   **獨特語法 (KP4.4)**：
    *   `for...else` / `while...else`。
    *   **觸發條件**：迴圈「正常完成」（沒有被 `break` 中斷）時執行。
*   **應用場景**：搜尋任務。若找到目標並 `break`，則不執行 `else`；若找遍了都沒找到，則執行 `else`。

### 5. 巢狀迴圈與自動化邏輯 (20 min)
*   **巢狀迴圈 (KP4.5)**：迴圈裡面還有迴圈（如：處理二維矩陣、九九乘法表）。
*   **基礎自動化 (KP4.6)**：
    *   批量重命名概念。
    *   數據過濾與累加。
*   **效能注意**：過深的嵌套會導致執行時間呈幾何級數增長。

---

## 二、 動手實作 (Lab) - 總計 50 分鐘

### 實作一：九九乘法表產生器 (15 min)
**任務目標**：練習巢狀迴圈與 `print` 格式控制。
1.  使用兩層 `for` 迴圈。
2.  輸出 1x1 到 9x9 的結果。
3.  格式要求：使用 `end="\t"` 讓結果整齊排列。
    ```python
    for i in range(1, 10):
        for j in range(1, 10):
            print(f"{i}x{j}={i*j}", end="\t")
        print() # 換行
    ```

### 實作二：猜數字遊戲 (20 min)
**任務目標**：綜合運用 `while`、`if` 與 `break`。
1.  電腦隨機產生一個 1-100 的數字。
2.  用戶不斷輸入猜測，直到猜中為止。
3.  提示用戶「太大了」或「太小了」。
4.  猜中後輸出總共猜了幾次。
    ```python
    import random
    target = random.randint(1, 100)
    count = 0
    while True:
        guess = int(input("猜一個數字: "))
        count += 1
        if guess == target:
            print(f"賓果！共猜了 {count} 次")
            break
        elif guess < target:
            print("再大一點")
        else:
            print("再小一點")
    ```

### 實作三：質數判斷器 (15 min)
**任務目標**：練習 `for...else` 語法。
1.  用戶輸入一個大於 1 的整數。
2.  判斷是否為質數 (Prime Number)。
3.  利用 `else` 區塊簡化邏輯。
    ```python
    num = int(input("輸入數字: "))
    for i in range(2, int(num**0.5) + 1):
        if num % i == 0:
            print(f"{num} 不是質數")
            break
    else:
        print(f"{num} 是質數")
    ```

---

## 三、 本週知識點回顧 (KP)
- **KP4.1**: `for` 迴圈與 `range(start, stop, step)` 的各種用法。
- **KP4.2**: `while` 迴圈的布林控制與無限迴圈預防。
- **KP4.3**: `break` (終止) 與 `continue` (跳過) 的行為差異。
- **KP4.4**: 迴圈後接 `else` 區塊的觸發機制。
- **KP4.5**: 巢狀迴圈 (Nested Loops) 的邏輯與執行順序。
- **KP4.6**: 使用迴圈處理簡單的自動化與數據過濾任務。

---
