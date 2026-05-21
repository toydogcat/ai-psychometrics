# 課程五：第 6 週 - Python 與 雲端 AI 平台概覽 (AI Ecosystem)

AI 開發不再需要購買昂貴的超級電腦。本週我們將了解 Python 為何能成為 AI 的「官方語言」，探索 Google Colab 等零配置雲端環境，並認識 Model-as-a-Service (MaaS) 如何大幅降低 AI 專案的導入門檻。

---

## 一、 單元講解 (Lecture) - 100 分鐘

### 1. 為什麼是 Python？AI 的母語
- **簡潔性**：讓工程師專注於演算法而非繁瑣的語法。
- **豐富的科學計算庫**：NumPy, Pandas (數據處理)、Matplotlib (視覺化)。
- **深度學習雙雄**：PyTorch 與 TensorFlow 的完美支援。

### 2. 零配置雲端環境：Google Colab
- **特性**：基於 Jupyter Notebook，免安裝、免付費、提供免費 GPU。
- **優勢**：適合快速原型 (Prototyping) 與教學分享。

### 3. Model-as-a-Service (MaaS) 時代
- **概念**：直接透過 API 呼叫大模型（如 GPT-4, Gemini, Claude），無需自己訓練。
- **雲端三巨頭**：Azure AI, Google Vertex AI, AWS SageMaker。

### 4. HuggingFace：AI 界的 GitHub
- **模型倉庫 (Models)**：下載數十萬個預訓練模型。
- **數據集 (Datasets)**：獲取高品質訓練素材。
- **空間 (Spaces)**：一鍵部署 AI 展示專案。

### 5. API 串接與 Token 經濟
- **運作**：Request -> API Key 驗證 -> Model 推理 -> Response。
- **計費**：理解什麼是 Token？（不是單字，是語義單元）。

---

## 二、 動手實作 (Lab) - 50 分鐘

### 任務：雲端 AI 工具串接體驗
1.  **Colab 初體驗**：
    - 在 Colab 執行一段 Python 程式碼，調用 `yfinance` 獲取股票數據並繪圖。
    - 體驗「掛載 Google 雲端硬碟」存取資料。
2.  **HuggingFace 探索**：
    - 進入 HuggingFace 官網，嘗試使用一個視覺模型（如影像去背或物體辨識）。
    - 觀察其 Model Card（模型說明書）中的指標與限制。
3.  **API 調用模擬**：
    - 練習在線上工具（如 OpenAI Playground）中調整「Temperature」與「Max Tokens」。
    - 觀察同樣的 Prompt，在不同 Temperature 下的輸出差異。
4.  **成本估算**：
    - 給定 10,000 字的文本，根據 API 計費標準，練習估算使用 GPT-4 進行總結的成本。

---

## 三 island 知識點回顧 (KP)

- **[KP 5.6.1] Python 生態價值**：理解各核心庫（NumPy, Pandas, Scikit-Learn）的分工。
- **[KP 5.6.2] GPU/TPU 的加速原理**：明白為什麼深度學習需要強大的平行運算。
- **[KP 5.6.3] MaaS 的商業決策**：能判斷何時該「自建模型」，何時該「租用 API」。
- **[KP 5.6.4] Token 計費邏輯**：掌握 LLM 商業應用中的成本控制核心。
- **[KP 5.6.5] 開源社群的重要性**：理解 HuggingFace 在加速產業 AI 化中的角色。

---

## 四、 課後測驗題庫 (Quiz) - 30 分鐘

### 1. 單選題 (Single Choice) - 10 題

1. **Q1**: Python 中專門用於「表格數據處理與分析」的核心庫是？
   - (A) NumPy (B) Pandas (C) Matplotlib (D) Flask
2. **Q2**: Google Colab 最吸引 AI 開發者的免費資源是？
   - (A) 免費的 GPU/TPU 算力 (B) 無限的存儲空間 (C) 免費的域名 (D) 永久的伺服器
3. **Q3**: 哪一個平台被公認為「AI 領域的 GitHub」，提供了海量的預訓練模型？
   - (A) GitHub (B) HuggingFace (C) Kaggle (D) Stack Overflow
4. **Q4**: 在大語言模型 (LLM) 的計費中，最常用的計量單位是？
   - (A) 字數 (B) 位元組 (C) Token (D) 執行次數
5. **Q5**: 模型作為服務 (MaaS) 的主要優點是？
   - (A) 可以完全控制底層代碼 (B) 降低了 AI 開發與部署的基礎建設門檻 (C) 數據永遠不會外流 (D) 模型準確率百分之百
6. **Q6**: 想要在 Python 中繪製數據圖表（如折線圖、散點圖），首選的庫是？
   - (A) OS (B) Requests (C) Matplotlib (D) TensorFlow
7. **Q7**: Jupyter Notebook 文件的副檔名是？
   - (A) .py (B) .ipynb (C) .txt (D) .exe
8. **Q8**: API Key 在 AI 服務中的主要作用是？
   - (A) 作為密碼加密數據 (B) 進行身份驗證與計費管理 (C) 提升模型運行速度 (D) 下載訓練數據
9. **Q9**: 下列哪家公司不屬於「雲端 AI 三巨頭」之一？
   - (A) Microsoft (Azure) (B) Google (GCP) (C) Amazon (AWS) (D) Netflix
10. **Q10**: 深度學習中的 GPU 運算主要優勢在於？
    - (A) 處理單個複雜邏輯 (B) 海量矩陣數據的平行運算 (C) 讀寫硬碟最快 (D) 網路連線最穩

### 2. 多選題 (Multiple Choice) - 10 題

11. **Q11**: Python 之所以成為 AI 首選語言的原因包括？
    - (A) 語法接近自然語言，易於學習。 (B) 具備龐大的第三方開源套件支持。 (C) 執行效率比 C++ 高 (其實較低)。 (D) 社群資源與範例極其豐富。
12. **Q12**: 關於 Google Colab，正確的描述有？
    - (A) 基於 Jupyter Notebook。 (B) 可以掛載 Google Drive。 (C) 支持 Python 以外的所有語言。 (D) 代碼可以直接在瀏覽器執行。
13. **Q13**: HuggingFace 平台提供的主要資源包括？
    - (A) Models (模型) (B) Datasets (數據集) (C) Spaces (應用展示空間) (D) 顯卡租借服務
14. **Q14**: 模型 API (如 OpenAI API) 的常見參數包括？
    - (A) Temperature (控制隨機性) (B) Max Tokens (限制輸出長度) (C) Stop Sequences (停止標記) (D) CPU 頻率
15. **Q15**: 哪些情境下建議「自建模型」而非使用 MaaS API？
    - (A) 數據極其敏感，不允許上雲。 (B) 需要在斷網環境（邊緣端）運行。 (C) 每日請求量極大，自建成本更低。 (D) 只需要快速測試一個概念。
16. **Q16**: Python AI 工具鏈中的「三劍客」通常指？
    - (A) NumPy (B) Pandas (C) Matplotlib (D) Windows
17. **Q17**: 關於 Token 的敘述，正確的有？
    - (A) 一個 Token 大約等於 0.75 個英文單詞。 (B) 中文字的 Token 計算通常比英文更耗量。 (C) 它是模型處理文本的最小單元。 (D) Token 越多，價格越貴。
18. **Q18**: 雲端 AI 平台提供的優化工具通常包含？
    - (A) 自動化機器學習 (AutoML)。 (B) 數據標注工具。 (C) 模型版本管理。 (D) 硬體過熱自動修復。
19. **Q19**: 使用 API 服務時，如何保證安全性？
    - (A) 不要將 API Key 直接寫在程式碼中上傳到 GitHub。 (B) 定期更換 Key。 (C) 設置預算上限警告。 (D) 將 Key 分享給所有同事共用。
20. **Q20**: Jupyter 筆記本的特色在於？
    - (A) 代碼與說明文字混排。 (B) 支持即時運行並看到結果。 (C) 非常適合撰寫技術報告。 (D) 只能在離線狀態下使用。

### 3. 填充題 (Fill-in-the-blank) - 10 題

21. Python 數據分析中最核心的矩陣運算庫是 __________。
22. Google 提供的免配置雲端 Python 筆記本服務名稱是 __________。
23. MaaS 的全稱是 Model as a __________。
24. __________ 是目前全球最大的開源 AI 模型社群與平台。
25. 用於調度雲端運算資源，專門用於深度學習的硬體縮寫是 GPU 或 __________。
26. LLM 輸出的隨機性可以透過 __________ (Temperature) 參數來控制。
27. 在 Python 中，使用 `import __________ as pd` 來引入數據分析庫。
28. 獲取大模型 API 服務時，必須使用的身份密鑰稱為 __________ Key。
29. 一個句子被切分成模型可理解的片段，這些片段稱為 __________。
30. NVIDIA 公司開發的平行計算架構縮寫為 __________，是深度學習加速的基礎。

---

## 五、 Q 矩陣 (Q-matrix)

| 題目 | KP 5.6.1 (Python) | KP 5.6.2 (Hardware) | KP 5.6.3 (MaaS) | KP 5.6.4 (Token) | KP 5.6.5 (Community) |
|---|:---:|:---:|:---:|:---:|:---:|
| Q1 | 1 | | | | |
| Q2 | | 1 | | | |
| Q3 | | | | | 1 |
| Q4 | | | | 1 | |
| Q5 | | | 1 | | |
| Q6 | 1 | | | | |
| Q7 | 1 | | | | |
| Q8 | | | 1 | | |
| Q9 | | | 1 | | |
| Q10 | | 1 | | | |
| Q11 | 1 | | | | |
| Q12 | | | | | 1 |
| Q13 | | | | | 1 |
| Q14 | | | 1 | 1 | |
| Q15 | | 1 | 1 | | |
| Q16 | 1 | | | | |
| Q17 | | | | 1 | |
| Q18 | | 1 | | | 1 |
| Q19 | | | 1 | | |
| Q20 | 1 | | | | |
| Q21 | 1 | | | | |
| Q22 | | 1 | | | |
| Q23 | | | 1 | | |
| Q24 | | | | | 1 |
| Q25 | | 1 | | | |
| Q26 | | | 1 | | |
| Q27 | 1 | | | | |
| Q28 | | | 1 | | |
| Q29 | | | | 1 | |
| Q30 | | 1 | | | |
