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

## 四、 課後測驗題庫 (Quiz) - 30 分鐘

### 1. 單選題 (Single Choice) - 10 題

1. **Q1**: BERT 模型主要由 Transformer 的哪個部分堆疊而成？
   - (A) Encoder (B) Decoder (C) Encoder-Decoder (D) Feed Forward
2. **Q2**: BERT 預訓練任務中，隨機遮蓋詞語讓模型預測的任務稱為？
   - (A) NSP (B) MLM (C) Seq2Seq (D) CNN
3. **Q3**: 在 BERT 的輸入中，用於代表整句話分類特徵的特殊符號是？
   - (A) [SEP] (B) [PAD] (C) [CLS] (D) [MASK]
4. **Q4**: BERT 相比於傳統 GPT-1 的最大區別在於其具備？
   - (A) 更多參數 (B) 雙向上下文理解能力 (C) 圖像處理能力 (D) 翻譯功能
5. **Q5**: 下列哪一個模型是 BERT 的蒸餾版本，參數量更少且速度更快？
   - (A) RoBERTa (B) DistilBERT (C) ALBERT (D) T5
6. **Q6**: 預訓練（Pre-training）通常在什麼樣的資料集上進行？
   - (A) 手動標註的小型資料集 (B) 大規模的無標籤語料庫 (如維基百科) (C) 加密數據 (D) 只有數字的數據
7. **Q7**: BERT 的 NSP 任務主要是為了讓模型理解？
   - (A) 詞的拼寫 (B) 句子之間的邏輯關係 (C) 標點符號 (D) 情感傾向
8. **Q8**: 在 HuggingFace 庫中，將文字轉化為模型可接受 ID 序列的工具是？
   - (A) Transformer (B) Tokenizer (C) Trainer (D) Pipeline
9. **Q9**: RoBERTa 相比 BERT 做了哪些改進？
   - (A) 移除 NSP 任務、使用更大的數據量 (B) 減少層數 (C) 增加權重 (D) 變為單向
10. **Q10**: 執行 BERT 微調時，我們通常會？
    - (A) 只訓練第一層 (B) 固定預訓練權重，只更新最後的新增層 (或更新全部) (C) 隨機打亂權重 (D) 不需要損失函數

### 2. 多選題 (Multiple Choice) - 10 題

11. **Q11**: BERT 預訓練時使用的輸入 Embeddings 包含哪些部分的加和？
    - (A) Token Embedding (B) Segment Embedding (C) Position Embedding (D) Color Embedding
12. **Q12**: BERT 可以應用於下游的哪些 NLP 任務？
    - (A) 情感分類 (B) 命名實體辨識 (NER) (C) 閱讀理解 (QA) (D) 文本生成 (雖然不擅長)
13. **Q13**: 關於遮蓋語言模型 (MLM)，正確的有？
    - (A) 隨機遮住 15% 的詞 (B) 80% 替換為 [MASK] (C) 10% 替換為隨機詞 (D) 10% 保持不變
14. **Q14**: 為什麼 BERT 是雙向的？
    - (A) 它使用了 Transformer Encoder (B) 自注意力機制允許關注序列中任意位置 (C) 它需要預測下一個詞 (D) 它的目標是深刻理解上下文
15. **Q15**: BERT 家族中追求「輕量化」的模型有？
    - (A) ALBERT (B) DistilBERT (C) TinyBERT (D) GPT-4
16. **Q16**: 預訓練 + 微調（Fine-tuning）模式的優點？
    - (A) 避免從零開始訓練 (B) 只需要少量標注數據即可獲得好效果 (C) 具有強大的知識遷移能力 (D) 運算量完全為零
17. **Q17**: 關於 BERT 中的 [SEP] 標記，正確的是？
    - (A) 用於區分兩個句子 (B) 置於句子末尾 (C) 輔助 NSP 任務 (D) 代表分類結果
18. **Q18**: BERT 模型在訓練中可能遇到的挑戰？
    - (A) 顯存消耗巨大 (B) 預訓練與微調的數據分佈不一致 (C) 無法並行 (D) 對短句子無效
19. **Q19**: 下列屬於 HuggingFace `transformers` 庫核心對象的有？
    - (A) `Config` (B) `Model` (C) `Tokenizer` (D) `Trainer`
20. **Q20**: BERT 預訓練任務 NSP 被部分後續研究（如 RoBERTa）認為？
    - (A) 不夠有效 (B) 是多餘的 (C) 可以被移除 (D) 是最重要的部分

### 3. 填充題 (Fill-in-the-blank) - 10 題

21. BERT 的全稱中，最後一個 B 代表 __________ (Bidirectional)。
22. BERT 使用 __________ (Encoder/Decoder) 作為基礎結構。
23. 隨機遮蓋詞語的任務全稱是 __________ Language Model。
24. BERT 的輸入由 Token、Segment 和 __________ 三種嵌入組成。
25. 用於微調 BERT 的主流 Python 函式庫名稱是 __________。
26. [CLS] 標記通常用於 __________ 任務。
27. BERT 在 2018 年由 __________ 團隊提出。
28. 將大模型的知識轉移給小模型的技術稱為模型 __________。
29. Tokenizer 負責將原始字串切分為最小的語義單元，這在 BERT 中通常是 __________ (Subwords)。
30. BERT 宣告了 NLP 領域 __________ 學習時代的全面到來。

---

## 五、 Q 矩陣 (Q-matrix)

| 題號 | KP 4.15.1 | KP 4.15.2 | KP 4.15.3 | KP 4.15.4 | KP 4.15.5 |
|---|:---:|:---:|:---:|:---:|:---:|
| Q1 | 1 | | | | |
| Q2 | | 1 | | | |
| Q3 | | | 1 | | |
| Q4 | 1 | | | | |
| Q5 | | | | | 1 |
| Q6 | | 1 | | | |
| Q7 | | 1 | | | |
| Q8 | | | | | 1 |
| Q9 | | | | | 1 |
| Q10 | | | | 1 | |
| Q11 | | | | | 1 |
| Q12 | | | 1 | 1 | |
| Q13 | | 1 | | | |
| Q14 | 1 | | | | |
| Q15 | | | | | 1 |
| Q16 | | | | 1 | |
| Q17 | | | | | 1 |
| Q18 | | | | 1 | |
| Q19 | | | | | 1 |
| Q20 | | 1 | | | |
| Q21 | 1 | | | | |
| Q22 | 1 | | | | |
| Q23 | | 1 | | | |
| Q24 | | | | | 1 |
| Q25 | | | | | 1 |
| Q26 | | | 1 | | |
| Q27 | | | | | 1 |
| Q28 | | | | | 1 |
| Q29 | | | | | 1 |
| Q30 | | | | 1 | |
