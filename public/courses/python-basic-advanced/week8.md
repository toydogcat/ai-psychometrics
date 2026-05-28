# 課程一：第 8 週 - 函式設計範式 (Functional Programming)

本文件包含了第 8 週完整的教學大綱、實作指南以及練習題庫。

---

## 一、 單元講解 (Lecture) - 總計 100 分鐘

### 1. 匿名函數 (Lambda Functions) (20 min)
*   **概念與語法 (KP8.1)**：`lambda arguments: expression`。
*   **特性**：
    *   無名、單行、自動回傳表達式的結果。
    *   常用於需要臨時小函數的場景，如排序 `key`。
*   **限制**：不能包含多行邏輯或複雜語句（如 `if-elif-else` 的完整形式，僅限三元運算子）。

### 2. 高階函數：Map & Filter (20 min)
*   **Map (KP8.2)**：將一個函數應用到序列的所有元素。
    *   `map(func, iterable)`
*   **Filter (KP8.3)**：過濾出序列中符合條件（函數回傳為 True）的元素。
    *   `filter(func, iterable)`
*   **特性**：在 Python 3 中，這兩者都回傳「疊代器」(Iterator)，節省記憶體。

### 3. Reduce 與偏函數 (Partial Functions) (20 min)
*   **Reduce (KP8.4)**：對序列進行累計運算。
    *   需要從 `functools` 匯入。
    *   `reduce(func, iterable[, initializer])`
*   **Partial**：固定函數的部分參數，產生一個新函數。

### 4. 產生器表達式 (Generator Expressions) (20 min)
*   **語法 (KP8.5)**：`(expression for item in iterable if condition)`。
*   **List vs Generator**：
    *   List Comprehension: 立即生成完整串列，佔用記憶體。
    *   Generator: 延遲計算 (Lazy Evaluation)，一次產生一個值，適合處理大數據。
*   **`next()` 函數**：手動獲取產生器的下一個值。

### 5. 閉包與裝飾器基礎 (20 min)
*   **閉包 (Closure)**：內層函數引用了外層函數的變數。
*   **裝飾器 (Decorator)**：修改或增強函數功能的強大工具。
    *   基礎語法：`@decorator_name`。
    *   原理：函數作為一等公民 (First-class citizen) 的應用。

---

## 二、 動手實作 (Lab) - 總計 50 分鐘

### 實作一：資料清理管道 (20 min)
**任務目標**：綜合運用 map, filter 與 lambda。
1.  給定一份原始資料 `raw_data = [" 123 ", "abc", " 456", "789 ", "def"]`。
2.  使用 `filter` 移除所有包含字母的字串（僅保留數字字串）。
3.  使用 `map` 將剩餘字串去除空格並轉為整數。
4.  將結果轉為串列並印出。

### 實作二：自定義排序邏輯 (15 min)
**任務目標**：練習 Lambda 在排序中的應用。
1.  建立一個包含字典的串列，代表學生成績：`students = [{"name": "A", "score": 80}, {"name": "B", "score": 95}, {"name": "C", "score": 80}]`。
2.  任務：
    - 先按分數由高到低排序。
    - 若分數相同，則按名字字母順序排序。
    - 使用 `lambda` 作為 `key` 參數。

### 實作三：無限序列產生器概念 (15 min)
**任務目標**：理解產生器的延遲計算。
1.  建立一個產生器表達式，計算 1 到 100 萬的平方值。
2.  觀察記憶體佔用（與 List Comprehension 比較）。
3.  使用 `for` 迴圈印出前 10 個結果，並說明為什麼它不會讓電腦當機。

---

## 三、 本週知識點回顧 (KP)
- **KP8.1**: Lambda 匿名函數的定義與應用場景。
- **KP8.2**: `map()` 函數的運作原理與疊代器特性。
- **KP8.3**: `filter()` 函數的過濾機制。
- **KP8.4**: `functools.reduce()` 的累計運算邏輯。
- **KP8.5**: 產生器表達式 (Generator) 與串列生成式的差異 (Lazy Evaluation)。

---