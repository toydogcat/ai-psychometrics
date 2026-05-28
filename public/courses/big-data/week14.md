# 課程六：第 14 週 - MLOps：模型部署、版本與監控 (MLOps & Lifecycle)

模型上線才是真正挑戰的開始。本週將深入探討 MLOps (Machine Learning Operations) 的全生命週期，學習如何透過 CI/CD/CT 實現自動化部署，並掌握監控「模型衰退」的關鍵技術，確保 AI 服務在生產環境中長期穩定。

---

## 一、 單元講解 (Lecture) - 總計 100 分鐘

### 1. MLOps 成熟度模型 (20 min)
*   **MLOps 願景 (KP14.1)**：將 DevOps 原則應用於機器學習。
*   **等級劃分**：
    *   **Level 0 (手動流程)**：模型導出、手動上傳、無持續監控。
    *   **Level 1 (自動化訓練)**：實現 CT (Continuous Training)，當新數據到達時自動觸發訓練。
    *   **Level 2 (自動化流水線)**：CI/CD 完整整合，從數據處理到部署全鏈路自動化。

### 2. 模型管理：Registry 與 Feature Store (20 min)
*   **Model Registry (模型存儲庫) (KP14.2)**：集中管理模型的不同版本、標籤（Staging, Production）與元數據。
*   **特徵管理**：回顧 Feature Store 的重要性，解決訓練數據與推論數據的不一致（Training-Serving Skew）。

### 3. 進階部署策略 (20 min)
*   **藍綠部署 (Blue-Green) (KP14.3)**：同時運行舊版本（藍）與新版本（綠），確認無誤後切換流量。
*   **金絲雀部署 (Canary) (KP14.3)**：先切換 5% 流量給新模型，觀察穩定後再逐步擴大。
*   **A/B 部署**：在線上環境比較兩個模型對業務指標（如轉化率）的真實影響。

### 4. 模型衰退與偏移監控 (20 min)
*   **數據偏移 (Data Drift) (KP14.4)**：輸入數據的分佈隨時間發生變化（如：用戶畫像改變）。
*   **概念偏移 (Concept Drift) (KP14.4)**：輸入與輸出間的映射關係改變（如：因外部通膨，原有的消費預測邏輯失效）。
*   **偵測技術**：利用 PSI (Population Stability Index) 或 KL 散度進行量化。

### 5. 模型可觀察性與日誌 (20 min)
*   **系統指標監控 (KP14.5)**：CPU/GPU 使用率、內存、延遲 (Latency)、吞吐量。
*   **模型性能監控 (KP14.5)**：即時的準確率回饋、預測值的分布監控。
*   **日誌分析**：記錄每一筆 Request/Response 用於事後審計與故障排查。

---

## 二、 動手實作 (Lab) - 總計 50 分鐘

### 實作一：使用 MLflow 進行實驗追蹤 (25 min)
**任務目標**：掌握模型版本管理。
1.  安裝並啟動 MLflow Server。
2.  在訓練腳本中加入 `mlflow.log_params()` 與 `mlflow.log_metrics()`。
3.  訓練三個不同超參數的模型，並在 MLflow UI 面板中進行視覺化對比。
4.  將表現最好的模型註冊 (Register) 為 Production 版本。

### 實作二：模擬數據偏移 (Data Drift) 偵測 (25 min)
**任務目標**：實作監控預警。
1.  準備一份基準數據 (Baseline) 與一份分佈發生變化的現網數據。
2.  使用 `evidently` 或 `scipy` 計算特徵分佈的差異。
3.  撰寫一個簡單的 Python 腳本：當 PSI 指標超過 0.2 時發送郵件告警。

---

## 三 island 知識點回顧 (KP)
- **KP14.1**: MLOps 成熟度等級 (Level 0-2) 的核心差異。
- **KP14.2**: Model Registry 與 Feature Store 在全生命週期中的角色。
- **KP14.3**: 藍綠、金絲雀與 A/B 部署的技術原理與風險控管。
- **KP14.4**: 數據偏移 (Data Drift) 與概念偏移 (Concept Drift) 的成因與區別。
- **KP14.5**: 模型監控的兩大維度：系統健康度指標與模型預測效能。

---