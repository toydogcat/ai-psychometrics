# 課程六：第 1 週 - 大數據生態系與架構基礎 (Big Data Ecosystem)

本週將探討中級 AI 工程師必須具備的大數據視野。我們將從大數據的 4V 特性出發，理解數據生命週期管理 (DLM)，並深入剖析 Hadoop 與 Spark 等分散式計算架構如何支撐起現代 AI 的海量運算需求。

---

## 一、 單元講解 (Lecture) - 總計 100 分鐘

### 1. 大數據 4V 特性及其挑戰 (20 min)
*   **Volume (量) (KP1.1)**：TB 級至 PB 級數據的存儲與檢索。AI 模型（特別是 LLM）需要海量數據進行預訓練。
*   **Velocity (速)**：數據生成的即時性與流處理要求。例如即時推薦系統需要秒級響應。
*   **Variety (多樣性)**：結構化 (SQL)、半結構化 (JSON/XML) 與非結構化 (影像/語音/文本)。
*   **Veracity (真實性) (KP1.5)**：數據品質控管。垃圾進，垃圾出 (GIGO) 是 AI 專案失敗的主因。

### 2. 數據生命週期管理 (DLM) (20 min)
*   **採集與攝取**：從源頭（IoT, Logs, DBs）獲取原始數據。
*   **存儲與歸檔 (KP1.3)**：熱數據 (經常存取) vs. 冷數據 (備份) 的存儲策略。
*   **處理與分析**：數據清洗、轉換 (ETL) 與特徵工程。
*   **銷毀與合規**：符合隱私法規 (如 GDPR) 的數據刪除機制。

### 3. 分散式架構：Hadoop 生態 (20 min)
*   **HDFS (KP1.2)**：分散式文件系統。將大檔案切塊並儲存在多個節點，透過副本機制保證高容錯性。
*   **YARN**：資源調度中心，負責分配集群中的 CPU 與內存資源。
*   **MapReduce**：分散式運算的經典模型，核心思想是「分而治之」(Divide and Conquer)業。

### 4. 現代核心：Apache Spark 計算框架 (20 min)
*   **內存計算 (In-memory) (KP1.2)**：Spark 將中間結果保留在記憶體中，避免頻繁的磁碟 I/O，速度比傳統 MapReduce 快上百倍。
*   **RDD 與 DataFrame**：Spark 的核心抽象。DataFrame 提供類似 SQL 的結構化操作，更適合數據科學任務。
*   **Spark MLlib**：提供分散式機器學習演算法，支援大規模分類、回歸與聚類。

### 5. 雲端 AI 基礎建設 (20 min)
*   **雲端服務模式 (KP1.4)**：
    *   **IaaS**：租用伺服器、儲存與網路（如 AWS EC2）。
    *   **PaaS**：提供開發平台（如 Google App Engine）。
    *   **SaaS**：直接使用軟體（如 ChatGPT 網頁版）。
*   **Serverless AI**：如 AWS Lambda。開發者無需管理伺服器，由事件驅動觸發運算，適合模型推理場景。

---

## 二、 動手實作 (Lab) - 總計 50 分鐘

### 實作一：PySpark 環境搭建與大規模數據載入 (20 min)
**任務目標**：熟悉 Spark 的基本操作介面。
1.  在 Google Colab 中執行 `!pip install pyspark`。
2.  建立 SparkSession：
    ```python
    from pyspark.sql import SparkSession
    spark = SparkSession.builder.appName("Week1_BigData").getOrCreate()
    ```
3.  讀取一個 CSV 檔案並顯示前 5 行：
    ```python
    df = spark.read.csv("sample_data/california_housing_train.csv", header=True, inferSchema=True)
    df.show(5)
    ```

### 實作二：分散式統計分析與 Spark SQL (30 min)
**任務目標**：練習使用 DataFrame API 進行大數據彙整。
1.  執行基礎統計：`df.describe().show()`。
2.  進行分組彙整：計算每個區域 (housing_median_age) 的平均房價。
    ```python
    df.groupBy("housing_median_age").avg("median_house_value").orderBy("housing_median_age").show()
    ```
3.  觀察 Spark 的延遲執行 (Lazy Evaluation) 特性。

---

## 三、 本週知識點回顧 (KP)
- **KP1.1**: 大數據核心特徵 (Volume, Velocity, Variety, Veracity)。
- **KP1.2**: 分散式運算與內存計算原理 (Hadoop vs. Spark)。
- **KP1.3**: 資料倉儲 (Data Warehouse) 與 資料湖 (Data Lake) 的架構差異。
- **KP1.4**: 雲端 AI 平台架構 (IaaS, PaaS, SaaS, Serverless)。
- **KP1.5**: 數據品質 (Data Quality) 對 AI 專案的重要性。

---