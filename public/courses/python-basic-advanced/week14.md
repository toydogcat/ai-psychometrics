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

## 四、 課後測驗題庫 (Quiz) - 30 分鐘

### 1. 單選題 (Single Choice) - 10 題

1. **Q1**: 執行 `python myscript.py input.txt output.txt`，`sys.argv[1]` 的值是？
   - (A) `myscript.py` (B) `input.txt` (C) `output.txt` (D) `python`
2. **Q2**: 下列哪一個方法可以用來獲取目前的執行目錄？
   - (A) `os.cwd()` (B) `os.getcwd()` (C) `sys.path` (D) `os.path.abspath('.')`
3. **Q3**: 想要安全地拼接路徑 `folder` 與 `file.txt`，應使用？
   - (A) `folder + "/" + file.txt` (B) `folder + "\\" + file.txt` (C) `os.path.join(folder, file.txt)` (D) `os.path.combine(folder, file.txt)`
4. **Q4**: 哪一個模組提供存取 Python 搜尋模組的路徑列表？
   - (A) `os` (B) `pathlib` (C) `sys` (D) `importlib`
5. **Q5**: 如何在 Python 中結束程式並回傳錯誤代碼 1？
   - (A) `exit(1)` (B) `sys.exit(1)` (C) `os.exit(1)` (D) `quit(1)`
6. **Q6**: 檢查路徑是否存在且為資料夾，應使用？
   - (A) `os.path.exists()` (B) `os.path.isfile()` (C) `os.path.isdir()` (D) `os.path.checkdir()`
7. **Q7**: 獲取檔案副檔名的最佳方法是？
   - (A) `filename.split('.')[-1]` (B) `os.path.splitext(filename)[1]` (C) `os.path.extension(filename)` (D) `sys.get_ext(filename)`
8. **Q8**: 若要獲取環境變數 `PATH` 的值，正確語法是？
   - (A) `os.environ['PATH']` (B) `os.get_env('PATH')` (C) `sys.env['PATH']` (D) `os.path.env('PATH')`
9. **Q9**: 下列哪一個指令可以建立多層嵌套目錄（如 `a/b/c`）？
   - (A) `os.mkdir()` (B) `os.mkdirs()` (C) `os.makedirs()` (D) `sys.mkdir()`
10. **Q10**: `os.path.abspath('..')` 的作用是？
    - (A) 刪除上一層目錄 (B) 獲取上一層目錄的絕對路徑 (C) 檢查上一層目錄是否存在 (D) 將目前路徑切換到上一層

### 2. 多選題 (Multiple Choice) - 10 題

11. **Q11**: 關於 `sys.argv`，哪些敘述正確？
    - (A) 它是一個串列 (List) (B) `sys.argv[0]` 是腳本路徑 (C) 它包含了 `python` 命令本身 (D) 參數皆以字串形式儲存
12. **Q12**: 哪些方法可以用於檔案或目錄的重新命名或搬移？
    - (A) `os.rename()` (B) `os.move()` (C) `os.replace()` (D) `os.copy()`
13. **Q13**: 下列哪些屬於 `os.path` 模組提供的功能？
    - (A) 檢查檔案大小 (B) 獲取路徑中的檔名 (C) 刪除目錄 (D) 判斷絕對路徑
14. **Q14**: 關於環境變數，哪些是正確的？
    - (A) 可以用來儲存敏感資訊 (B) 程式重啟後 `os.environ` 的修改會永久保存在作業系統中 (C) `os.environ.get()` 可以避免 `KeyError` (D) 它們是鍵值對結構
15. **Q15**: 若要遍歷一個資料夾下的所有子資料夾與檔案，可以使用？
    - (A) `os.listdir()` 配合遞迴 (B) `os.walk()` (C) `sys.walk()` (D) `glob.glob()`
16. **Q16**: 關於 `sys.path`，哪些正確？
    - (A) 它決定了 `import` 語句的搜尋範圍 (B) 第一個元素通常是目前的腳本目錄 (C) 它是唯讀的，不可修改 (D) 可以透過 `sys.path.append()` 新增路徑
17. **Q17**: 下列哪些操作涉及 `os` 模組？
    - (A) 獲取目前程序 ID (B) 獲取 CPU 核心數 (C) 獲取 Python 版本號 (D) 變更目前工作目錄
18. **Q18**: 關於跨平台開發，應注意？
    - (A) 路徑分隔符號的差異 (B) 換行符號的差異 (`\n` vs `\r\n`) (C) 檔案名稱的大小寫敏感度 (D) 命令列工具的可用性
19. **Q19**: 下列哪些是 `os.path.split()` 回傳的結果組成？
    - (A) 目錄部分 (B) 檔案部分 (C) 副檔名部分 (D) 磁碟代號部分
20. **Q20**: 關於 `sys.stdin`, `sys.stdout`, `sys.stderr`，哪些敘述正確？
    - (A) 它們是類檔案物件 (File-like objects) (B) `print()` 預設輸出到 `sys.stdout` (C) 它們可以被重導向 (Redirection) (D) 它們只能處理純文字

### 3. 填充題 (Fill-in-the-blank) - 10 題

21. `sys.argv` 的資料型別是 __________。
22. 若要檢查路徑是否存在，應呼叫 `os.path.__________`。
23. `os.path.__________` 方法可以將路徑拆分為「目錄」與「檔名」兩部分。
24. 在 Windows 上，路徑分隔符號通常是 `\`，在 Linux 上則是 `/`，我們應使用 `__________` 來取得目前的系統分隔符號。
25. `sys.__________` 屬性儲存了 Python 直譯器的版本資訊。
26. 刪除空資料夾應使用 `os.__________`。
27. 獲取檔案大小（位元組）可以使用 `os.path.__________`。
28. `os.environ` 的資料結構類似 Python 中的 __________。
29. `os.path.__________` 用於判斷一個路徑是否為絕對路徑。
30. 若要執行一條 Shell 指令並獲取其退出狀態碼，最簡單的方法是使用 `os.__________`。

---

## 五、 Q 矩陣 (Q-matrix)

| 題號 | KP 14.1 (argv) | KP 14.2 (路徑) | KP 14.3 (目錄) | KP 14.4 (環境) | KP 14.5 (系統/直譯器) |
|---|:---:|:---:|:---:|:---:|:---:|
| Q1 | 1 | | | | |
| Q2 | | | 1 | | |
| Q3 | | 1 | | | |
| Q4 | | | | | 1 |
| Q5 | | | | | 1 |
| Q6 | | 1 | | | |
| Q7 | | 1 | | | |
| Q8 | | | | 1 | |
| Q9 | | | 1 | | |
| Q10 | | 1 | | | |
| Q11 | 1 | | | | |
| Q12 | | | 1 | | |
| Q13 | | 1 | | | |
| Q14 | | | | 1 | |
| Q15 | | | 1 | | |
| Q16 | | | | | 1 |
| Q17 | | | | | 1 |
| Q18 | | 1 | | | |
| Q19 | | 1 | | | |
| Q20 | | | | | 1 |
| Q21 | 1 | | | | |
| Q22 | | 1 | | | |
| Q23 | | 1 | | | |
| Q24 | | 1 | | | |
| Q25 | | | | | 1 |
| Q26 | | | 1 | | |
| Q27 | | 1 | | | |
| Q28 | | | | 1 | |
| Q29 | | 1 | | | |
| Q30 | | | | | 1 |
