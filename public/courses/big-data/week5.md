# 課程六：第 5 週 - 進階機器學習：集成學習與模型融合 (Advanced Ensemble Learning)

「群眾的智慧」通常優於單一專家。本週我們將深入探討集成學習的高級原理，從權衡偏差與方差出發，解構三大 Boosting 框架（XGBoost, LightGBM, CatBoost）的技術細節，並掌握多層模型融合 (Stacking) 的實務技巧。

---

## 一、 單元講解 (Lecture) - 總計 100 分鐘

### 1. 集成學習核心思想與偏差-方差權衡 (20 min)
*   **誤差來源 (KP5.1)**：偏差 (Bias) 代表欠擬合，方差 (Variance) 代表過擬合。
*   **Bagging (降低方差)**：並行集成。透過對樣本進行自助抽樣 (Bootstrap) 並訓練多個獨立模型（如隨機森林）。
*   **Boosting (降低偏差)**：序列集成。模型按順序訓練，每一棵樹都在嘗試修正前一棵樹的殘差。

### 2. GBDT 與 XGBoost 的數學優化 (20 min)
*   **梯度提升 (KP5.2)**：利用損失函數的負梯度方向來更新模型。
*   **XGBoost 的突破 (KP5.2)**：
    *   **二階泰勒展開**：利用二階導資訊使損失函數擬合更精確，收斂更快。
    *   **正則化項**：在損失函數中加入樹的複雜度懲罰，有效防止過擬合。
    *   **預排序與分塊存儲**：大幅提升尋找分裂點的速度。

### 3. 三大 Boosting 框架技術對抗 (20 min)
*   **LightGBM (KP5.3)**：
    *   **基於直方圖的算法**：減少計算增益的次數。
    *   **GOSS & EFB**：對樣本與特徵進行抽樣與綑綁，解決大數據量下的效率問題。
    *   **Leaf-wise 生長**：相比 Level-wise，能更快降低損失但需注意深度控制。
*   **CatBoost (KP5.3)**：
    *   **Ordered Boosting**：解決訓練數據的偏移問題。
    *   **自動化類別特徵處理**：無需 One-Hot，內置高效的類別轉換算法。

### 4. 模型融合策略：Stacking 與 Blending (20 min)
*   **Stacking 流程 (KP5.4)**：
    *   **第一層 (Base Models)**：使用多樣化的模型進行預測。
    *   **OOF (Out-of-fold) 預測**：透過交叉驗證生成預測值作為下一層的特徵，**嚴格防止數據滲漏**。
    *   **第二層 (Meta Model)**：通常使用簡單的模型（如邏輯回歸）來融合第一層的輸出。
*   **Blending**：使用簡單的留出集進行融合，實作簡單但數據利用率較低。

### 5. 自動化超參數調優 (20 min)
*   **貝氏優化 (Bayesian Optimization) (KP5.5)**：利用高斯過程或 TPE 建立目標函數的代理模型，比隨機搜索更聰明地尋找最優解。
*   **Optuna 實踐 (KP5.5)**：支援剪枝 (Pruning) 技術，若某組參數表現明顯不佳則提前停止訓練，大幅節省時間。

---

## 二、 動手實作 (Lab) - 總計 50 分鐘

### 實作一：實作多層 Stacking 模型融合 (20 min)
**任務目標**：掌握 OOF 預測的生成邏輯。
1.  選擇三個基模型：XGBoost, Random Forest, SVM。
2.  使用 `KFold` 產出每個模型對訓練集的 OOF 預測。
3.  將預測值作為特徵訓練一個 `LogisticRegression` 作為 Meta-model。
4.  對比 Stacking 後的效能是否優於單一模型。

### 實作二：使用 Optuna 進行自動化調參 (30 min)
**任務目標**：自動化尋找最佳超參數。
1.  定義一個目標函數 `objective`，內部訓練一個 LightGBM。
2.  設定超參數搜尋範圍（如 `learning_rate`, `num_leaves`, `feature_fraction`）。
3.  啟動 `study.optimize` 執行 50 次試驗。
4.  分析視覺化圖表（重要性圖、優化歷史圖）。

---

## 三、 本週知識點回顧 (KP)
- **KP5.1**: 集成學習核心思想 (Bagging vs. Boosting) 與偏差-方差權衡。
- **KP5.2**: GBDT 原理與 XGBoost 的二階導優化及正則化。
- **KP5.3**: LightGBM (GOSS/EFB) 與 CatBoost 的技術特性對比。
- **KP5.4**: 模型融合架構 (Stacking/Blending) 與 OOF 防止滲漏機制。
- **KP5.5**: 自動化超參數調優 (貝氏優化) 與 Optuna 應用。

---