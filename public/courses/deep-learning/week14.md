# 課程四：第 14 週 - Transformer 震撼：Attention is All You Need (Transformer)

2017 年，一篇論文徹底改變了 AI。本週我們將解構 Transformer 的全架構，理解它如何透過「位置編碼」與「多頭自注意力」徹底取代循環結構，成為現代大語言模型 (LLM) 的唯一基石。

---

## 一、 單元講解 (Lecture) - 100 分鐘

### 1. 拋棄循環：Transformer 的誕生
- **問題**：RNN 無法並行運算，處理超長序列時力不從心。
- **哲學**：Attention is All You Need。完全基於注意力機制構建。

### 2. 位置編碼 (Positional Encoding)
- **挑戰**：注意力機制本身不具備語序資訊。
- **方案**：使用正弦 (Sine) 與 餘弦 (Cosine) 函數為每個詞注入位置標籤。

### 3. 編碼器 (Encoder) 結構
- **多頭自注意力 (Multi-head Self-Attention)**。
- **殘差連接與層歸一化 (Add & Norm)**。
- **前饋神經網路 (Feed Forward)**。

### 4. 解碼器 (Decoder) 結構
- **掩碼自注意力 (Masked Self-Attention)**：確保模型預測時看不到未來的詞。
- **交叉注意力 (Encoder-Decoder Attention)**：查詢來自解碼器，鍵值來自編碼器。

### 5. 為什麼 Transformer 更好？
- **並行化**：整句話一次輸入，適合 GPU 運算。
- **長距離建模**：序列中任意兩個詞的距離都是 1 步。

---

## 二、 動手實作 (Lab) - 50 分鐘

### 任務：拆解 Transformer 算子
1.  **位置編碼實作**：
    - 編寫代碼生成 Sin-Cos 矩陣並與詞嵌入相加。
2.  **PyTorch `nn.Transformer` 使用**：
    - 調用官方模組搭建一個簡單的語言模型。
    - 學習設置 `src_mask` 與 `tgt_mask`。
3.  **歸一化對比**：
    - 比較 `LayerNorm` 與 `BatchNorm` 在文本序列處理中的差異。
4.  **注意力分配圖觀察**：
    - 載入預訓練模型，觀察當模型處理「He is a good boy」時，每個詞對其他詞的關注度。

---

## 三 island 知識點回顧 (KP)

- **[KP 4.14.1] 位置編碼的幾何直覺**：明白如何透過週期性函數區分絕對位置與相對距離。
- **[KP 4.14.2] 殘差與歸一化的深度保護**：理解 Add & Norm 是訓練上百層 Transformer 的保障。
- **[KP 4.14.3] Masking 機制的因果邏輯**：掌握在生成式任務中屏蔽「未來資訊」的必要性。
- **[KP 4.14.4] Transformer 的複雜度分析**：理解 $O(L^2)$ 帶來的顯存挑戰與長度限制。
- **[KP 4.14.5] 跨模態的普適性**：明白 Transformer 是如何從 NLP 擴展到 CV (ViT) 與音訊的。

---

## 四、 課後測驗題庫 (Quiz) - 30 分鐘

### 1. 單選題 (Single Choice) - 10 題

1. **Q1**: Transformer 架構最初是在哪一篇著名的論文中提出的？
   - (A) Deep Residual Learning (B) Attention is All You Need (C) BERT: Pre-training of Deep Bidirectional Transformers (D) GPT-3
2. **Q2**: Transformer 中解決「注意力機制對語序不敏感」問題的組件是？
   - (A) 殘差連接 (B) 位置編碼 (Positional Encoding) (C) 層歸一化 (D) 激活函數
3. **Q3**: 在 Transformer 解碼器中，預防預測當前詞時看到「未來詞」的機制是？
   - (A) Dropout (B) Masked Self-Attention (C) Encoder-Decoder Attention (D) Linear Layer
4. **Q4**: Transformer 使用的是哪種歸一化方式？
   - (A) Batch Norm (B) Layer Norm (C) Group Norm (D) Instance Norm
5. **Q5**: 關於 Transformer 的並行化，正確的是？
   - (A) 它比 RNN 更難並行 (B) 它允許整句話的所有詞同時進行計算 (C) 它依賴串行處理 (D) 它只能在 CPU 運行
6. **Q6**: Transformer 中的前饋網路（Feed Forward）通常包含幾個線性層？
   - (A) 1 (B) 2 (中間夾一個激活函數) (C) 10 (D) 不固定
7. **Q7**: 自注意力機制（Self-Attention）的計算複雜度與序列長度 $L$ 的關係是？
   - (A) $O(L)$ (B) $O(L \log L)$ (C) $O(L^2)$ (D) $O(1)$
8. **Q8**: Transformer 解碼器中的 Cross-Attention，其 Query 來自？
   - (A) 編碼器 (B) 前一層解碼器的輸出 (C) 隨機初始化 (D) 外部文件
9. **Q9**: 位置編碼通常是透過什麼操作與 Embedding 合併的？
   - (A) 矩陣乘法 (B) 向量加法 (C) 卷積 (D) 拼接
10. **Q10**: 現代 LLM（如 GPT-4）主要採用的是 Transformer 的哪個部分？
    - (A) 只有 Encoder (B) 只有 Decoder (C) 完整的 Encoder-Decoder (D) 只有全連接層

### 2. 多選題 (Multiple Choice) - 10 題

11. **Q11**: Transformer 編碼器（Encoder）的一個層級組件包含？
    - (A) Multi-head Self-Attention (B) Add & Norm (C) Position-wise Feed Forward (D) Masked Attention
12. **Q12**: 關於多頭注意力（Multi-head Attention），描述正確的有？
    - (A) 它可以同時關注不同位置的信息 (B) 它將 Q, K, V 投影到多個子空間 (C) 它是 Transformer 唯一的非線性來源 (D) 它可以增加模型的魯棒性
13. **Q13**: Transformer 相比於 RNN 的優勢包括？
    - (A) 訓練速度更快（高度並行） (B) 解決了長距離依賴問題 (C) 推理時顯存佔用更小 (其實更大) (D) 參數利用率更高
14. **Q14**: 殘差連接（Residual Connection）在 Transformer 中的作用？
    - (A) 防止梯度消失 (B) 加速收斂 (C) 允許模型訓練得更深 (D) 增加計算時間
15. **Q15**: 位置編碼可以使用哪些方式實現？
    - (A) 固定函數式（Sine/Cosine） (B) 可學習式（Learned Positional Embeddings） (C) 隨機設置 (D) 不需要編碼
16. **Q16**: Transformer 解碼器包含哪幾種注意力？
    - (A) Masked Self-Attention (B) Encoder-Decoder Attention (C) 雙向 Attention (D) 卷積 Attention
17. **Q17**: 哪些因素會限制 Transformer 處理超長文本（如一本書）？
    - (A) 顯存隨長度平方增長 (B) 注意力權重變得過於稀疏 (C) 計算時間 (D) 硬碟容量
18. **Q18**: 關於 Layer Normalization，正確的是？
    - (A) 對單個樣本的所有特徵進行歸一化 (B) 不依賴 Batch Size (C) 非常適合變長的 NLP 任務 (D) 必須在 GPU 運算
19. **Q19**: Transformer 的應用現在擴展到了哪些非 NLP 領域？
    - (A) 電腦視覺 (ViT) (B) 音訊處理 (C) 蛋白質結構預測 (D) 推薦系統
20. **Q20**: 在 PyTorch 中構建 Transformer 時，通常需要考慮？
    - (A) `d_model` (維度) (B) `nhead` (頭數) (C) `num_layers` (D) `dim_feedforward`

### 3. 填充題 (Fill-in-the-blank) - 10 題

21. Transformer 是完全捨棄了 __________ 結構而僅使用注意力機制的模型。
22. 標題為《__________ is All You Need》的論文定義了 Transformer。
23. 為了區分序列中的位置，Transformer 使用了 __________ 編碼。
24. 解碼器中的 __________ 機制防止模型在生成時偷看未來的資訊。
25. __________ Connection 是將輸入直接跳過某層加到輸出的技術。
26. Transformer 每層包含多頭注意力和 __________ 前饋網絡。
27. 注意力計算中的 $d_k$ 通常是為了保證點積結果不要過 __________。
28. __________ 歸一化是在特徵維度上進行的，而非樣本維度。
29. Transformer 編碼器的輸出被作為解碼器的 __________ 與 Value。
30. Transformer 成功的一個關鍵原因是它在現代 __________ 硬體上具備極高的運算效率。

---

## 五、 Q 矩陣 (Q-matrix)

| 題號 | KP 4.14.1 | KP 4.14.2 | KP 4.14.3 | KP 4.14.4 | KP 4.14.5 |
|---|:---:|:---:|:---:|:---:|:---:|
| Q1 | | | | | 1 |
| Q2 | 1 | | | | |
| Q3 | | | 1 | | |
| Q4 | | 1 | | | |
| Q5 | | | | | 1 |
| Q6 | | | | 1 | |
| Q7 | | | | 1 | |
| Q8 | | | 1 | | |
| Q9 | 1 | | | | |
| Q10 | | | | | 1 |
| Q11 | | 1 | | | |
| Q12 | | | | | 1 |
| Q13 | | | | 1 | 1 |
| Q14 | | 1 | | | |
| Q15 | 1 | | | | |
| Q16 | | | 1 | | |
| Q17 | | | | 1 | |
| Q18 | | 1 | | | |
| Q19 | | | | | 1 |
| Q20 | | | | 1 | |
| Q21 | | | | | 1 |
| Q22 | | | | | 1 |
| Q23 | 1 | | | | |
| Q24 | | | 1 | | |
| Q25 | | 1 | | | |
| Q26 | | | | 1 | |
| Q27 | | | | 1 | |
| Q28 | | 1 | | | |
| Q29 | | | 1 | | |
| Q30 | | | | | 1 |
