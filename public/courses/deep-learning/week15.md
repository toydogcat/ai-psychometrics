# 課程四：第 15 週 - BERT 與預訓練模型：NLP 的 ImageNet 時刻 (BERT & Pre-training)

深度學習在視覺領域的成功源於遷移學習，而 NLP 領域則直到 2018 年 BERT 的出現才迎來了自己的「ImageNet 時刻」。本週我們將學習「預訓練+微調」的範式，解構 BERT 如何透過雙向 Transformer 深刻理解語言。

---

## 一、 單元講解 (Lecture) - 100 分鐘

### 1. NLP 的典範轉移
- **舊模式**：針對每個任務（分類、命名實體辨識）從零設計模型。
- **新模式**：在大規模語料上預訓練一個通用大模型，再到下游小任務微調。

### 2. BERT：雙向 Transformer 編碼器
- **定義**：Bidirectional Encoder Representations from Transformers。
- **核心優勢**：同時看見左邊與右邊的上下文（相對於 GPT 的單向）。

### 3. BERT 的兩大預訓練任務
- **遮蓋語言模型 (MLM)**：完形填空。隨機遮住 15% 的詞讓模型預測。
- **下一句預測 (NSP)**：句子對關係。預測 B 句是否緊跟在 A 句後面。

### 4. 特殊標記與輸入表示
- **[CLS]**：位於句首，用於分類任務的特徵匯總。
- **[SEP]**：句子分隔符。
- **Token + Segment + Position Embeddings**：三合一的輸入向量。

### 5. BERT 家族與生態
- **變體**：RoBERTa (去除 NSP, 更多數據)、DistilBERT (模型蒸餾)、ALBERT。
- **HuggingFace**：NLP 工程師的軍火庫。

---

## 二、 動手實作 (Lab) - 50 分鐘

### 任務：使用 BERT 進行情緒分析
1.  **HuggingFace 入門**：
    - 安裝 `transformers` 與 `datasets` 庫。
2.  **Tokenizer 實踐**：
    - 將文本轉為 `input_ids` 與 `attention_mask`。
    - 理解「子詞 (Subword)」切分的價值。
3.  **模型微調**：
    - 加載 `BertForSequenceClassification`。
    - 在 IMDB 影評資料集上進行一輪訓練。
4.  **推理預測**：
    - 輸入你自創的一句話，觀察模型判斷的正負面情緒。

---

## 三 island 知識點回顧 (KP)

- **[KP 4.15.1] 雙向表示的意義**：理解為什麼「看見兩側」對自然語言理解 (NLU) 至關重要。
- **[KP 4.15.2] 自監督學習 (Self-supervised)**：掌握如何利用無標籤文本透過 MLM 任務進行訓練。
- **[KP 4.15.3] CLS 向量的分類特權**：明白為什麼最後一層句首向量能代表整句的語義。
- **[KP 4.15.4] 微調 (Fine-tuning) 的操作細節**：理解固定骨幹與更新全權重的策略權衡。
- **[KP 4.15.5] HuggingFace 生態價值**：熟練掌握 `from_pretrained` 一鍵加載模型的標準化流程。

---