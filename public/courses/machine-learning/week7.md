# 課程三：第 7 週 - 集成學習 II：Boosting 與 XGBoost/LightGBM 簡介 (Boosting Techniques)

Boosting 採用「循序漸進」的策略，每一棵新樹都在修正前一棵樹的錯誤。本週我們將探討這種降低偏差的強大技術，並認識現代競賽與工業界的神器：XGBoost 與 LightGBM。

---

## 一、 單元講解 (Lecture) - 100 分鐘

### 1. Boosting 核心原理
- **加法模型 (Additive Model)**：模型是多個弱學習器的線性組合。
- **前向分步算法 (Forward Stepwise)**：每一步訓練一個新學習器，專注於解決目前模型的不足。
- **目標**：有效降低偏差 (Bias)。

### 2. AdaBoost：權重調整
- **策略**：提高被錯分樣本的權重，降低正確分類樣本的權重。
- **組合**：根據每個學習器的準確率給予不同的投票話語權。

### 3. 梯度提升樹 (GBDT)：擬合殘差
- **核心思想**：利用損失函數的「負梯度」作為殘差的近似值，讓新樹去擬合這個殘差。
- **優化**：一步步逼近真實標籤。

### 4. XGBoost：工業級改進
- **二階導數**：利用泰勒展開式 (Taylor Expansion)，計算更精準。
- **正則化**：損失函數中加入 $L1/L2$ 項，控制模型複雜度。
- **缺失值處理**：內建自動處理缺失值的邏輯。

### 5. LightGBM：追求極速
- **直方圖算法 (Histogram)**：降低計算增益的成本。
- **GOSS 與 EFB**：對樣本與特徵進行過濾與綑綁，大幅提升大規模資料下的速度。

---

## 二、 動手實作 (Lab) - 50 分鐘

### 任務：GBDT 與參數微調
1.  **環境安裝**：
    - `pip install xgboost lightgbm`。
2.  **模型實驗**：
    - 使用 `sklearn.ensemble.GradientBoostingClassifier` 處理經典資料集。
    - 比較不同 `learning_rate`（學習率）下的收斂速度。
3.  **XGBoost 實踐**：
    - 使用 `XGBClassifier` 訓練模型。
    - 體驗「早停機制 (Early Stopping)」：當驗證集分數不再提升時自動停止訓練。
4.  **視覺化**：
    - 繪製 Boosting 過程中樹的數量與準確率的關係圖。

---

## 三 island 知識點回顧 (KP)

- **[KP 3.7.1] 偏差抑制機制**：理解 Boosting 如何透過迭代讓模型越來越強。
- **[KP 3.7.2] 殘差擬合直覺**：明白 GBDT 的每棵樹不是在預測 $y$，而是在預測 $y - \hat{y}$。
- **[KP 3.7.3] 學習率的作用**：掌握 `learning_rate` 與樹的數量之間的權衡（Shrinkage）。
- **[KP 3.7.4] 序列化特性**：理解為什麼 Boosting 難以像 Bagging 那樣完美並行。
- **[KP 3.7.5] 現代框架差異**：區分 XGBoost (Level-wise) 與 LightGBM (Leaf-wise) 的生長策略。

---