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