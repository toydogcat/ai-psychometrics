# 課程一：第 14 週 - OS 與 Sys 模組 (OS & Sys Modules)

本週我們將學習如何與作業系統溝通。透過 Python 內建的 `os` 與 `sys` 模組，開發者可以進行檔案路徑處理、讀取環境變數、獲取命令列參數以及執行系統層級的操作，讓你的程式具備更高的靈活性與系統整合能力。

---

## 一、 單元講解 (Lecture) - 100 分鐘

### 1. `sys` 模組：與 Python 直譯器互動
- **`sys.argv`**：獲取從命令列傳遞給腳本的參數。
- **`sys.path`**：模組搜尋路徑的列表，了解如何動態新增搜尋路徑。
- **`sys.exit()`**：優雅地結束程式並回傳狀態碼。
- **`sys.stdin/stdout/stderr`**：標準輸入、輸出與錯誤流的控制。

### 2. `os` 模組：核心作業系統介面
- **目錄操作**：`os.getcwd()`, `os.chdir()`, `os.listdir()`, `os.mkdir()`, `os.makedirs()`。
- **檔案操作**：`os.remove()`, `os.rename()`, `os.stat()`（獲取檔案資訊）。
- **程序資訊**：`os.getpid()`, `os.cpu_count()`。

### 3. 路徑處理的藝術：`os.path` 與跨平台考量
- **路徑拼接**：`os.path.join()` 解決 Windows 與 Unix-like 系統斜線方向不同的問題。
- **路徑解析**：`os.path.basename()`, `os.path.dirname()`, `os.path.split()`, `os.path.splitext()`。
- **路徑檢查**：`os.path.exists()`, `os.path.isfile()`, `os.path.isdir()`。
- **絕對與相對路徑**：`os.path.abspath()`, `os.path.relpath()`。

### 4. 環境變數管理 (Environment Variables)
- **讀取環境變數**：`os.environ.get('KEY', default)`。
- **設定環境變數**：`os.environ['KEY'] = 'VALUE'`。
- **安全建議**：為何不應將敏感資訊（如 API Key）寫死在程式碼中。

### 5. 執行系統命令
- **`os.system()`**：執行簡單的殼層 (Shell) 命令。
- **`os.popen()`**：開啟管道並讀取命令輸出。
- **簡介 `subprocess` 模組**：為什麼現代 Python 推薦使用 `subprocess` 取代 `os.system`。

---

## 二、 動手實作 (Lab) - 50 分鐘

### 任務：開發「多功能系統工具箱」
1.  **實作「檔案分類器」**：
    - 指定一個資料夾，自動讀取其中所有檔案。
    - 根據副檔名將檔案搬移到對應的子資料夾（如：.jpg 移至 images/，.txt 移至 docs/）。
2.  **實作「命令列計算機」**：
    - 撰寫一個腳本 `calc.py`，支援 `python calc.py add 10 20` 這樣的呼叫。
    - 使用 `sys.argv` 解析運算子與運算元。
3.  **環境變數檢查器**：
    - 撰寫程式列出目前系統所有的環境變數。
    - 實作一個功能：若環境變數 `APP_DEBUG` 為 "True"，則列印詳細系統資訊。
4.  **跨平台路徑產生器**：
    - 撰寫一個函式，接收多個字串片段，產生一個能在目前作業系統正確執行的絕對路徑。

---

## 三、 本週知識點回顧 (KP)

- **[KP 14.1] sys.argv 基礎**：命令列參數的第一個元素 `sys.argv[0]` 始終是腳本名稱。
- **[KP 14.2] 跨平台路徑拼接**：永遠使用 `os.path.join` 而非手動串接字串，以確保程式具備移植性。
- **[KP 14.3] 目錄遍歷**：`os.listdir` 回傳檔案名稱列表，而 `os.walk` 可以進行遞迴遍歷。
- **[KP 14.4] 環境變數應用**：環境變數是程式與部署環境配置解耦合的關鍵技術。
- **[KP 14.5] 系統與直譯器的區別**：`os` 側重於檔案系統與作業系統，`sys` 側重於 Python 直譯器運行狀態。

---
