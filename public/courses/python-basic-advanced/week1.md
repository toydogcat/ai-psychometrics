# 課程一：第 1 週 - Python 環境生態、雲端開發與現代化工具鏈

本文件包含了第 1 週完整的教學大綱、實作指南以及擴充版練習題庫。

---

## 一、 單元講解 (Lecture) - 總計 100 分鐘

### 1. Python 語言特性與生態 (20 min)
*   **起源與歷史**：由 Guido van Rossum 於 1989 年底發明，以英國喜劇團體 Monty Python 命名。
*   **語言特性 (KP1.1)**：
    *   **直譯式語言 (Interpreted)**：不需要像 C/C++ 那樣編譯成 `.exe`，程式碼由 Python 直譯器逐行讀取並執行，跨平台性極佳。
    *   **動態強型別**：變數不需要事先宣告型態（動態），但不同型態間不能隨意相加（強型）。
*   **為什麼學 Python？**：語法簡潔、接近人類自然語言、擁有龐大的第三方庫（從 Web 到 AI 皆可勝任）。

### 2. 零配置雲端環境：Google Colab 與 Jupyter (20 min)
*   **Jupyter Notebook (KP1.2)**：
    *   副檔名為 `.ipynb`。
    *   核心概念是 **儲存格 (Cell)**，分為 `Code` (程式碼) 與 `Markdown` (文本)。
    *   優點：執行結果（包含圖表）會直接顯示在儲存格下方，非常適合資料分析與教學。
*   **Google Colab**：
    *   建立在雲端的 Jupyter 環境，背後運行的是 Linux 虛擬機。
    *   優勢：完全免安裝、提供免費的 GPU/TPU 加速計算、可與 Google Drive 無縫整合。

### 3. 本地開發環境：Anaconda vs. Vanilla Python (20 min)
*   **Anaconda (KP1.3)**：
    *   為資料科學家準備的「懶人包」，內建了 `conda` 包管理器與數百個科學計算套件（NumPy, Pandas）。
    *   缺點：體積龐大，常常安裝許多不需要的套件。
*   **Vanilla Python (官方原生 Python)**：
    *   最純淨的版本，僅包含標準庫。需要開發者自行安裝第三方套件。

### 4. 現代化管理：`uv` 與虛擬環境 (20 min)
*   **什麼是虛擬環境？**：為每個專案建立獨立的 Python 空間，避免 A 專案的套件升級導致 B 專案壞掉。
*   **認識 `uv` (KP1.4)**：
    *   由 Rust 語言編寫的極速 Python 包與專案管理器。
    *   取代了傳統緩慢的 `pip` 與複雜的 `venv` 配置。
    *   不僅能管理套件，還能直接幫你下載並切換 Python 版本 (e.g., `uv python install 3.12`)。

### 5. VS Code 配置與基礎語法 (20 min)
*   **VS Code 擴充功能**：必裝 `Python` 與 `Pylance`，提供自動補全與語法檢查。
*   **PEP 8 規範 (KP1.6)**：
    *   Python 不使用大括號 `{}` 來區分區塊，而是嚴格依賴 **縮進 (Indentation)**。
    *   標準縮進為 **4 個空格**。
    *   單行註解使用 `#`，多行註解使用 `"""` 或 `'''`。
*   **基本輸入輸出 (KP1.5)**：
    *   `print("Hello", end="")`：取消預設的換行。
    *   `input("請輸入：")`：獲取用戶終端輸入，返回的**永遠是字串**。
    *   **f-string**：現代 Python 最推薦的字串格式化方式，如 `f"你好，{name}"`。

---

## 二、 動手實作 (Lab) - 總計 50 分鐘

### 實作一：在 Google Colab 撰寫互動式問候程式 (20 min)
**任務目標**：熟悉 Colab 介面與基本 I/O。
1.  打開瀏覽器，進入 Google Colab (colab.research.google.com) 並登入。
2.  點擊「新增筆記本」。
3.  在第一個 Markdown 儲存格輸入標題：`# 我的第一個 Python 程式`。
4.  在下方新增一個 Code 儲存格，撰寫以下程式碼：
    ```python
    # 獲取用戶輸入並轉換型態
    name = input("請輸入你的名字：")
    age = int(input("請輸入你的年齡："))
    
    # 計算未來的年齡
    future_age = age + 10
    
    # 使用 f-string 輸出結果
    print(f"你好 {name}！")
    print(f"10 年後，你將會是 {future_age} 歲。")
    ```
5.  點擊儲存格左側的「播放」按鈕執行，並在下方提示框中輸入資料。
6.  觀察輸出結果。

### 實作二：使用 `uv` 與 VS Code 建立本地專案 (30 min)
**任務目標**：建立專業的本地開發環境流程。
1.  打開電腦的終端機 (Terminal / PowerShell)。
2.  安裝 `uv` (可參考官網指令，Windows 通常使用 PowerShell 腳本，Mac/Linux 使用 curl)。
3.  初始化一個新專案：
    ```bash
    mkdir my_first_app
    cd my_first_app
    uv init
    ```
    *(註：`uv init` 會自動幫你建立虛擬環境與基本的檔案結構)*
4.  使用 VS Code 打開該資料夾：
    ```bash
    code .
    ```
5.  在 VS Code 中打開 `hello.py`，輸入以下代碼：
    ```python
    print("Welcome to local Python development!", "powered by uv", sep=" | ")
    ```
6.  在 VS Code 的終端機執行程式：
    ```bash
    uv run hello.py
    ```

---

## 三、 本週知識點回顧 (KP)
- **KP1.1**: Python 直譯器 (Interpreter) 運作原理。
- **KP1.2**: 雲端環境 (Google Colab, Jupyter) 與 .ipynb 格式。
- **KP1.3**: 本地環境管理 (Anaconda, uv, venv)。
- **KP1.4**: `uv` 工具的高級應用 (Python 版本管理、專案初始化)。
- **KP1.5**: `print()` 進階格式化與 `input()` 互動。
- **KP1.6**: PEP 8 規範、註解與代碼縮進。

---

## 四、 課後測驗題庫 (Quiz) - 30 分鐘

### 1. 單選題 (Single Choice) - 共 10 題

1. **Q1**: Python 是一種什麼類型的程式語言？
   - (A) 編譯式 (Compiled) (B) 直譯式 (Interpreted) (C) 組合語言 (D) 機器語言
   - *答案*: B (KP1.1)

2. **Q2**: 在 Google Colab 中，儲存格 (Cell) 執行後的輸出會顯示在哪裡？
   - (A) 另一個瀏覽器分頁 (B) 儲存格下方 (C) 終端機 (D) 不會顯示
   - *答案*: B (KP1.2)

3. **Q3**: 下列哪一個工具是用 Rust 編寫，以速度極快著稱的現代 Python 包管理器？
   - (A) pip (B) Conda (C) uv (D) Poetry
   - *答案*: C (KP1.3, KP1.4)

4. **Q4**: 關於 PEP 8 規範，建議的一級縮進應使用幾個空格？
   - (A) 2 (B) 4 (C) 8 (D) 1 個 Tab
   - *答案*: B (KP1.6)

5. **Q5**: `print("Hello", "Python", sep="*")` 的輸出結果是？
   - (A) Hello Python (B) Hello*Python (C) Hello* Python (D) HelloPython*
   - *答案*: B (KP1.5)

6. **Q6**: 想要在本地電腦安裝多個不同版本的 Python，下列哪種工具**不適合**用來管理？
   - (A) uv (B) pyenv (C) Anaconda (D) 記事本 (Notepad)
   - *答案*: D (KP1.3, KP1.4)

7. **Q7**: Jupyter Notebook 文件的副檔名是？
   - (A) .py (B) .txt (C) .ipynb (D) .json
   - *答案*: C (KP1.2)

8. **Q8**: 下列哪一行代碼可以正確將字串型態的輸入轉換為整數？
   - (A) `str(input())` (B) `float(input())` (C) `int(input())` (D) `bool(input())`
   - *答案*: C (KP1.5)

9. **Q9**: Python 之父是誰？
   - (A) James Gosling (B) Guido van Rossum (C) Bjarne Stroustrup (D) Linus Torvalds
   - *答案*: B (KP1.1)

10. **Q10**: 在 `print()` 函數中，若不想在輸出末尾自動換行，應設定哪個參數？
    - (A) sep (B) end (C) newline (D) stop
    - *答案*: B (KP1.5)

### 2. 多選題 (Multiple Choice) - 共 10 題

1. **Q11**: 關於 Google Colab 的優點，哪些描述正確？
   - (A) 免費提供 GPU/TPU 資源 (B) 無需配置本地環境 (C) 可與 Google Drive 整合 (D) 離線狀態下也能完美執行代碼
   - *答案*: A, B, C (KP1.2)

2. **Q12**: 下列哪些是 Python 正確的註解方式？
   - (A) `# 這是單行註解` (B) `// 這是單行註解` (C) `""" 這是多行註解 """` (D) `''' 這是多行註解 '''`
   - *答案*: A, C, D (KP1.6)

3. **Q13**: 使用 `uv` 工具時，下列哪些指令是合法的 (假設已安裝 uv)？
   - (A) `uv python install 3.12` (B) `uv init my_project` (C) `uv add pandas` (D) `uv run main.py`
   - *答案*: A, B, C, D (KP1.4)

4. **Q14**: 下列哪些環境屬於「互動式」開發環境？
   - (A) Jupyter Notebook (B) Google Colab (C) Python 互動式終端 (REPL) (D) 靜態 .py 腳本文件
   - *答案*: A, B, C (KP1.2)

5. **Q15**: 關於變數命名的 PEP 8 建議，哪些正確？
   - (A) 應使用小寫字母與下劃線組合 (如 `user_name`) (B) 可以使用數字開頭 (C) 不建議使用 Python 保留字 (如 `if`, `for`) (D) 變數名應具有描述性
   - *答案*: A, C, D (KP1.6)

6. **Q16**: `print()` 函數的格式化輸出方法有哪些？
   - (A) f-string (如 `f"{x}"`) (B) `%` 操作符 (C) `.format()` 方法 (D) 只能使用 `+` 拼接
   - *答案*: A, B, C (KP1.5)

7. **Q17**: Anaconda 發行版通常包含哪些工具？
   - (A) Conda 包管理器 (B) Jupyter Notebook (C) 預裝的科學計算庫 (如 NumPy, Pandas) (D) Windows 操作系統
   - *答案*: A, B, C (KP1.3)

8. **Q18**: 為什麼要在開發中使用「虛擬環境」？
   - (A) 防止不同專案間的套件版本衝突 (B) 保持全局 Python 環境的整潔 (C) 讓程式執行得更快 (D) 方便導出依賴清單
   - *答案*: A, B, D (KP1.3, KP1.4)

9. **Q19**: 在 VS Code 中開發 Python，建議安裝哪些擴充功能 (Extensions)？
   - (A) Python (by Microsoft) (B) Pylance (C) Jupyter (D) Adobe Photoshop
   - *答案*: A, B, C (KP1.3)

10. **Q20**: 下列哪些行為會導致 Python 報出 `IndentationError` (縮進錯誤)？
    - (A) 同一層級的代碼縮進空格數不一致 (B) 在 if 語句後沒有縮進 (C) 混合使用 Tab 與空格 (D) 代碼行末尾多了一個空格
    - *答案*: A, B, C (KP1.6)

### 3. 填充題 (Fill-in-the-blank) - 共 10 題

1. **Q21**: Python 官方推薦的編碼風格指南代號為 __________。
   - *答案*: PEP 8 (KP1.6)

2. **Q22**: Google Colab 底層執行的環境是基於 __________ 系統的虛擬機。
   - *答案*: Linux (KP1.2)

3. **Q23**: 在 `print()` 函數中，預設的 `end` 參數值是 __________ (請填寫轉義字符)。
   - *答案*: \n (KP1.5)

4. **Q24**: 使用 `uv` 建立一個新專案的指令是 `uv __________ [專案名稱]`。
   - *答案*: init (KP1.4)

5. **Q25**: 將輸入內容轉化為浮點數應使用 __________ 函數。
   - *答案*: float() (KP1.5)

6. **Q26**: Jupyter Notebook 中的每一個可以寫程式的區塊被稱為一個 __________ (Cell)。
   - *答案*: 儲存格 (KP1.2)

7. **Q27**: Python 這種不需要編譯成二進位制文件即可執行的語言稱為 __________ 語言。
   - *答案*: 直譯式 (或 Interpreted) (KP1.1)

8. **Q28**: 在字串前面加上字母 __________ 即可定義一個 f-string 格式化字串。
   - *答案*: f (KP1.5)

9. **Q29**: 為代碼添加說明但不被執行的文字稱為 __________。
   - *答案*: 註解 (KP1.6)

10. **Q30**: 執行 `print(1, 2, 3, sep="-")` 後，控制台會顯示 __________。
    - *答案*: 1-2-3 (KP1.5)

---

## 五、 Q 矩陣 (Q-matrix)

| 題號 | KP1.1 | KP1.2 | KP1.3 | KP1.4 | KP1.5 | KP1.6 |
|---|---|---|---|---|---|---|
| Q1 | 1 | 0 | 0 | 0 | 0 | 0 |
| Q2 | 0 | 1 | 0 | 0 | 0 | 0 |
| Q3 | 0 | 0 | 1 | 1 | 0 | 0 |
| Q4 | 0 | 0 | 0 | 0 | 0 | 1 |
| Q5 | 0 | 0 | 0 | 0 | 1 | 0 |
| Q6 | 0 | 0 | 1 | 1 | 0 | 0 |
| Q7 | 0 | 1 | 0 | 0 | 0 | 0 |
| Q8 | 0 | 0 | 0 | 0 | 1 | 0 |
| Q9 | 1 | 0 | 0 | 0 | 0 | 0 |
| Q10| 0 | 0 | 0 | 0 | 1 | 0 |
| Q11| 0 | 1 | 0 | 0 | 0 | 0 |
| Q12| 0 | 0 | 0 | 0 | 0 | 1 |
| Q13| 0 | 0 | 0 | 1 | 0 | 0 |
| Q14| 0 | 1 | 0 | 0 | 0 | 0 |
| Q15| 0 | 0 | 0 | 0 | 0 | 1 |
| Q16| 0 | 0 | 0 | 0 | 1 | 0 |
| Q17| 0 | 0 | 1 | 0 | 0 | 0 |
| Q18| 0 | 0 | 1 | 1 | 0 | 0 |
| Q19| 0 | 0 | 1 | 0 | 0 | 0 |
| Q20| 0 | 0 | 0 | 0 | 0 | 1 |
| Q21| 0 | 0 | 0 | 0 | 0 | 1 |
| Q22| 0 | 1 | 0 | 0 | 0 | 0 |
| Q23| 0 | 0 | 0 | 0 | 1 | 0 |
| Q24| 0 | 0 | 0 | 1 | 0 | 0 |
| Q25| 0 | 0 | 0 | 0 | 1 | 0 |
| Q26| 0 | 1 | 0 | 0 | 0 | 0 |
| Q27| 1 | 0 | 0 | 0 | 0 | 0 |
| Q28| 0 | 0 | 0 | 0 | 1 | 0 |
| Q29| 0 | 0 | 0 | 0 | 0 | 1 |
| Q30| 0 | 0 | 0 | 0 | 1 | 0 |
