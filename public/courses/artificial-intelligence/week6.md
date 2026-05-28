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