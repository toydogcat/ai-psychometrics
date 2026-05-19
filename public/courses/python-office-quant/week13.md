# 第 13 週：數據視覺化 (Matplotlib & Seaborn)

## 一、 單元講解 (Lecture)
本單元將學習如何將數據轉化為直觀的圖表，利用 Matplotlib 與 Seaborn 進行探索性數據分析 (EDA)。 (100 分鐘)

### 1. Matplotlib 基礎與畫布結構 (20 min)
- **面向對象接口**: 理解 Figure 與 Axes 的層級關係。
- **基礎圖表**: `plot()` (折線), `bar()` (柱狀), `scatter()` (散點), `hist()` (直方)。
- **樣式定製**: 顏色、線型、標記點與透明度設置。

### 2. 圖表輔助元素與中文處理 (20 min)
- **標註系統**: 設置標題 (title)、軸標籤 (xlabel/ylabel)、圖例 (legend) 與網格 (grid)。
- **中文字體解決方案**: 解決 Matplotlib 在 Windows/Mac 下中文顯示為方塊的問題。
- **座標軸控制**: 設置刻度範圍 (xlim/ylim) 與 刻度標籤 (xticks)。

### 3. Seaborn 進階統計繪圖 (20 min)
- **為什麼使用 Seaborn**: 簡潔的 API 與美觀的默認樣式。
- **分佈繪圖**: `displot()`, `kdeplot()`, `boxplot()` (箱線圖) 與 `violinplot()`。
- **分類數據**: `countplot()`, `barplot()` 與 `catplot()`。

### 4. 相關性與矩陣繪圖 (20 min)
- **熱力圖 (Heatmap)**: 視覺化相關係數矩陣。
- **成對關係**: `pairplot()` 快速觀察多維特徵間的關係。
- **線性回歸擬合**: `regplot()` 與 `lmplot()`。

### 5. 多子圖佈局與導出 (20 min)
- **subplots()**: 創建規則的網格佈局 (如 2x2)。
- **佈局優化**: `tight_layout()` 避免標籤重疊。
- **檔案保存**: `savefig()` 的解析度 (dpi) 與格式 (png, pdf, svg) 設置。

---

## 二、 動手實作 (Lab)
練習透過視覺化手段發現數據背後的規律。 (50 分鐘)

### 1. 房價影響因素分析 (20 min)
- **任務**: 讀取一份房價數據集，繪製房價與居住面積的散點圖。
- **要求**: 加上線性回歸擬合線，並設置圖表主題為 `darkgrid`。

### 2. 客戶特徵分佈 (15 min)
- **任務**: 繪製客戶年齡的直方圖與箱線圖，觀察是否存在異常值。
- **要求**: 使用子圖 (Subplots) 將兩張圖並行顯示。

### 3. 特徵相關性熱力圖 (15 min)
- **任務**: 計算所有數值型特徵的相關係數，並繪製帶數值標註的熱力圖。

---

## 三、 本週知識點回顧 (KP)
- **[KP 13.1]**: 掌握 Matplotlib 面向對象接口，理解畫布 (Figure) 與子圖 (Axes) 的調用邏輯。
- **[KP 13.2]**: 熟練設置圖表核心元素，解決中文字體顯示與樣式定製問題。
- **[KP 13.3]**: 掌握 Seaborn 熱力圖 (Heatmap) 的繪製與參數配置，用於相關性分析。
- **[KP 13.4]**: 理解箱線圖 (Boxplot) 的統計學意義，能用其識別數據分佈與異常值。
- **[KP 13.5]**: 熟練運用 `plt.subplots()` 進行多圖並行展示，實現專業的數據匯報佈局。

---

## 四、 課後測驗題庫 (Quiz)

### 1. 單選題 (Single Choice, SC)
1. 在 Seaborn 中，最適合用來展示多變量之間相關係數矩陣的圖表是？ (A) Scatter Plot (B) Box Plot (C) Heatmap (D) Violin Plot
2. Matplotlib 中創建一個 2 行 2 列的子圖佈局，應使用代碼？ (A) `plt.figure(2, 2)` (B) `plt.subplots(2, 2)` (C) `plt.grid(2, 2)` (D) `plt.add_axes(2, 2)`
3. 哪種圖表最適合用來觀察連續數組的分佈情況與是否存在異常值？ (A) Pie Chart (B) Box Plot (C) Line Chart (D) Bar Chart
4. 如何在畫圖後顯示圖表窗口？ (A) `plt.display()` (B) `plt.show()` (C) `plt.render()` (D) `plt.open()`
5. Seaborn 是基於哪個庫封裝而成的？ (A) Pandas (B) NumPy (C) Matplotlib (D) Plotly
6. 設置圖表標題的函數是？ (A) `plt.title()` (B) `plt.header()` (C) `plt.label()` (D) `plt.text()`
7. 在散點圖中，若要設置點的透明度，應調整哪個參數？ (A) `alpha` (B) `opacity` (C) `transparent` (D) `beta`
8. `sns.set_theme(style='whitegrid')` 的作用是？ (A) 清空畫布 (B) 設置全局圖表風格 (C) 修改背景顏色為白色 (D) 顯示網格線
9. 如何保存生成的圖表到本地？ (A) `plt.save()` (B) `plt.write_image()` (C) `plt.savefig()` (D) `plt.export()`
10. 箱線圖中的中心橫線代表什麼？ (A) 平均值 (B) 中位數 (C) 眾數 (D) 最大值

### 2. 多選題 (Multiple Choice, MC)
11. 關於 Matplotlib 的中文字體顯示，下列哪些方法可行？ (A) 修改 `rcParams['font.sans-serif']` (B) 直接使用中文 (不設置字體) (C) 繪圖時指定 `fontproperties` (D) 使用英文標籤
12. 下列哪些屬於 Seaborn 的圖表類型？ (A) `sns.boxplot()` (B) `sns.heatmap()` (C) `sns.pairplot()` (D) `sns.kdeplot()`
13. 圖表構成元素包含哪些？ (A) Legend (圖例) (B) Ticks (刻度) (C) Grid (網格) (D) Label (標籤)
14. 關於 `sns.pairplot()`，正確的有？ (A) 快速生成特徵間的兩兩關係圖 (B) 對角線上通常顯示分佈圖 (C) 適合處理特徵數量極多的數據 (D) 支援按類別 (hue) 上色
15. 如何優化多子圖的間距？ (A) `plt.tight_layout()` (B) `plt.subplots_adjust()` (C) 手動調整每個子圖位置 (D) 縮小字體
16. 折線圖 `plt.plot()` 支援哪些樣式參數？ (A) `color` (B) `linestyle` (C) `marker` (D) `linewidth`
17. 關於箱線圖 (Boxplot) 的組成，正確的有？ (A) 箱子部分代表四分位距 (IQR) (B) 鬚線 (Whiskers) 通常延伸至 1.5 倍 IQR (C) 點狀物代表異常值 (Outliers) (D) 只能展示正數
18. 下列哪些操作屬於探索性數據分析 (EDA)？ (A) 繪製分佈直方圖 (B) 觀察變量間的相關性 (C) 清理異常數據 (D) 構建機器學習模型
19. 關於 Matplotlib 的 Figure 與 Axes，正確的有？ (A) Figure 是最大的容器 (畫布) (B) Axes 是具體的子圖區域 (C) 一個 Figure 可以包含多個 Axes (D) Axes 就是 Axis (座標軸)
20. `sns.countplot()` 的作用是？ (A) 統計每個類別的出現頻次 (B) 自動繪製柱狀圖 (C) 計算平均值 (D) 處理缺失值

### 3. 填充題 (Fill-in-the-blank, Fill)
21. 繪製散點圖的函數是 `plt.________()`。
22. 在 Seaborn 中，使用 __________ 參數可以根據類別對數據進行上色區分。
23. `plt.xlabel('____')` 用於設置 X 軸標籤。
24. 繪製熱力圖的 Seaborn 函數名稱是 `sns.________()`。
25. 想要在同一個子圖中顯示多條線，只需連續調用 __________ 函數。
26. 獲取當前畫布對象的函數是 `plt.________()`。
27. 設置圖例顯示的函數是 `plt.________()`。
28. Seaborn 繪圖時，傳入數據的參數通常是 `data=____`。
29. 箱線圖中，第一四分位數 (Q1) 與第三四分位數 (Q3) 之間的距離稱為 __________ (英文縮寫)。
30. 設置畫布尺寸的參數是 `figsize=(width, ________)`。

---

## 五、 Q 矩陣 (Q-matrix)
| 題目 | KP13.1 | KP13.2 | KP13.3 | KP13.4 | KP13.5 |
|---|---|---|---|---|---|
| SC1 | 0 | 0 | 1 | 0 | 0 |
| SC2 | 0 | 0 | 0 | 0 | 1 |
| SC3 | 0 | 0 | 0 | 1 | 0 |
| SC4 | 1 | 0 | 0 | 0 | 0 |
| SC5 | 0 | 0 | 0 | 0 | 0 |
| SC6 | 0 | 1 | 0 | 0 | 0 |
| SC7 | 0 | 1 | 0 | 0 | 0 |
| SC8 | 0 | 1 | 0 | 0 | 0 |
| SC9 | 1 | 0 | 0 | 0 | 0 |
| SC10| 0 | 0 | 0 | 1 | 0 |
| MC11| 0 | 1 | 0 | 0 | 0 |
| MC12| 0 | 0 | 1 | 1 | 0 |
| MC13| 0 | 1 | 0 | 0 | 0 |
| MC14| 0 | 0 | 1 | 0 | 0 |
| MC15| 0 | 0 | 0 | 0 | 1 |
| MC16| 0 | 1 | 0 | 0 | 0 |
| MC17| 0 | 0 | 0 | 1 | 0 |
| MC18| 0 | 0 | 0 | 1 | 0 |
| MC19| 1 | 0 | 0 | 0 | 1 |
| MC20| 0 | 0 | 0 | 0 | 0 |
| Fill21| 1 | 0 | 0 | 0 | 0 |
| Fill22| 0 | 1 | 0 | 0 | 0 |
| Fill23| 0 | 1 | 0 | 0 | 0 |
| Fill24| 0 | 0 | 1 | 0 | 0 |
| Fill25| 1 | 0 | 0 | 0 | 0 |
| Fill26| 1 | 0 | 0 | 0 | 0 |
| Fill27| 0 | 1 | 0 | 0 | 0 |
| Fill28| 0 | 0 | 1 | 0 | 0 |
| Fill29| 0 | 0 | 0 | 1 | 0 |
| Fill30| 1 | 0 | 0 | 0 | 0 |
