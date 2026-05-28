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