# 課程四：第 4 週 - PyTorch 實戰：張量運算與自動微分 (PyTorch Mastery)

紙上談兵結束，實戰開始！本週我們將進入業界最主流的深度學習框架之一：PyTorch。我們將理解什麼是張量，並掌握自動微分引擎 Autograd，這是深度學習自動化訓練的心臟。

---

## 一、 單元講解 (Lecture) - 100 分鐘

### 1. 深度學習框架之王：為什麼選擇 PyTorch？
- **動態圖 (Dynamic Graph)**：程式碼即圖，調試方便。
- **Pythonic 體驗**：與 Python 語法高度一致。
- **強大的生態**：HuggingFace, Torchvision 的支撐。

### 2. 張量 (Tensor) 基礎
- **定義**：多維數組。
- **屬性**：Shape, Dtype, Device。
- **運算**：矩陣乘法、廣播機制、索引與切片。

### 3. Autograd：自動微分引擎
- **`requires_grad`**：告訴 PyTorch 追蹤這顆變數。
- **計算圖的構建**：底層是如何紀錄運算過程的。
- **`.backward()`**：一鍵求導。

### 4. PyTorch 建模核心三部曲
- **`nn.Module`**：定義網路結構。
- **`optim`**：選擇優化器（SGD, Adam）。
- **訓練循環**：Forward -> Loss -> Zero_grad -> Backward -> Step。

### 5. GPU 加速與 CPU 交互
- **CUDA**：如何將運算從處理器移至顯卡。

---

## 二、 動手實作 (Lab) - 50 分鐘

### 任務：手寫線性回歸器 (PyTorch 版)
1.  **張量操縱**：
    - 建立 1D 到 4D 的張量。
    - 練習 `view()`, `reshape()`, `transpose()` 等重塑操作。
2.  **自動微分測試**：
    - 定義一個複雜函數 $y = x^2 + \sin(x)$。
    - 計算 $x=1$ 時的導數並與解析解對比。
3.  **線性回歸實作**：
    - 不使用高級封裝，僅使用 Tensor 和 Autograd 實現一個線性回歸訓練。
4.  **模型封裝**：
    - 學習繼承 `nn.Module` 構建模型。
    - 跑通一個簡單的 MNIST 分類流程。

---

## 三 island 知識點回顧 (KP)

- **[KP 4.4.1] Tensor 與 Numpy 的互操作性**：掌握底層內存共享的轉換機制。
- **[KP 4.4.2] 動態計算圖生命週期**：理解圖是在前向傳播時構建，後向傳播後銷毀（預設）。
- **[KP 4.4.3] 梯度清零的必要性**：明白 PyTorch 預設會累加梯度的設計初衷。
- **[KP 4.4.4] nn.Module 的層級設計**：理解 Parameter 與 Buffer 的管理方式。
- **[KP 4.4.5] 硬件部署意識**：掌握 `.to(device)` 進行設備切換的標準化代碼。

---