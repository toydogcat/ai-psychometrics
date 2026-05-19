# 第 1 週：Excel 與 CSV 自動化處理 (Pandas 核心應用)

## 一、 單元講解 (Lecture)
本單元將深入探討如何利用 Pandas 進行高效的 Excel 與 CSV 處理，這是辦公自動化的核心基礎。 (100 分鐘)

### 1. Pandas 基礎結構 (20 min)
- **Series 與 DataFrame**: 理解 Pandas 的一維與二維數據結構。
- **Index 與 Columns**: 掌握索引的標記作用與列名的操作。
- **數據類型 (dtypes)**: 了解浮點數、整數、字串在 Pandas 中的表現。

### 2. 數據讀取與寫入 (20 min)
- **read_csv() 與 read_excel()**: 掌握各項參數如 `header`, `index_col`, `usecols`, `nrows` 等。
- **編碼問題處理**: 解決讀取中文 CSV 時常見的 `utf-8` 或 `cp950` 報錯。
- **to_csv() 與 to_excel()**: 導出數據並配置索引排除與工作表命名。

### 3. 數據選取與篩選 (20 min)
- **loc 與 iloc**: 基於標籤與基於位置的精確選取。
- **布林篩選**: 多重條件 `&` (and), `|` (or), `~` (not) 的邏輯組合。
- **query() 方法**: 使用類 SQL 語法簡化篩選邏輯。

### 4. 數據清理與缺失值處理 (20 min)
- **缺失值偵測**: `isnull()`, `isna()`。
- **刪除與填充**: `dropna()` 的 `how` 與 `thresh` 參數；`fillna()` 的填充策略。
- **重複值處理**: `drop_duplicates()`。

### 5. 批量處理與合併 (20 min)
- **多表整合**: 使用 `pd.concat()` 進行垂直或水平拼接。
- **遍歷資料夾**: 配合 `os.listdir()` 或 `glob` 實現批量 Excel 讀取。

---

## 二、 動手實作 (Lab)
透過實際案例強化 Pandas 操作能力。 (50 分鐘)

### 1. 年度銷售報表合併 (20 min)
- **任務**: 讀取 `raw-data` 資料夾中 12 個月份的銷售 CSV 檔案，將其合併為一個 `annual_sales.xlsx`。
- **要求**: 統一日期格式，並在合併後重置索引。

### 2. 高價值客戶篩選 (15 min)
- **任務**: 從年度報表中篩選出年度累計消費在前 10% 的客戶。
- **要求**: 計算消費總額並導出為 `VIP_customers.csv`。

### 3. 庫存異常警示 (15 min)
- **任務**: 檢查庫存 Excel，找出庫存數量為空值或小於預警線的品項。
- **要求**: 填充空值為 0，並將結果標記後另存新檔。

---

## 三、 本週知識點回顧 (KP)
- **[KP 1.1]**: 理解 DataFrame 核心概念：Index, Columns 與數據對齊。
- **[KP 1.2]**: 掌握使用 `pd.read_csv()` 與 `pd.read_excel()` 加載不同編碼與結構的數據。
- **[KP 1.3]**: 精通基於標籤 (`loc`) 與位置 (`iloc`) 的數據切片技術。
- **[KP 1.4]**: 靈活運用多重條件布林過濾進行複雜數據篩選。
- **[KP 1.5]**: 熟練處理缺失值：`isnull()`, `dropna()`, `fillna()`。
- **[KP 1.6]**: 掌握數據導出技術，優化 Excel 工作表佈局。

---

## 四、 課後測驗題庫 (Quiz)

### 1. 單選題 (Single Choice, SC)
1. 在 Pandas 中，若要選取 DataFrame `df` 中第 0 到 5 行、第 2 欄的數據，最合適的方法是？ (A) `df.loc[0:5, 2]` (B) `df.iloc[0:6, 2]` (C) `df.head(5)[2]` (D) `df.select(0:5, 2)`
2. 若要讀取一個使用 Tab 鍵分隔的文本檔案，應在 `read_csv` 中設置哪個參數？ (A) `delim='\t'` (B) `sep='\t'` (C) `tab=True` (D) `format='tsv'`
3. 下列哪個方法可以用來查看 DataFrame 的前 10 筆數據？ (A) `df.show(10)` (B) `df.top(10)` (C) `df.head(10)` (D) `df.display(10)`
4. Pandas 中，`df.shape` 回傳的是什麼？ (A) 總元素個數 (B) 行數與列數的元組 (C) 數據類型列表 (D) 內存佔用大小
5. 若要將某欄位設為 DataFrame 的索引，應使用？ (A) `df.reindex()` (B) `df.set_index()` (C) `df.index_set()` (D) `df.add_index()`
6. 處理中文亂碼時，常用的編碼參數不包括？ (A) `utf-8` (B) `gbk` (C) `cp950` (D) `base64`
7. `df.iloc[:3, :2]` 選取的是？ (A) 前 3 行前 2 欄 (B) 第 3 行第 2 欄 (C) 第 4 行第 3 欄 (D) 前 2 行前 3 欄
8. 如何獲取 DataFrame 中所有列的名稱？ (A) `df.names` (B) `df.columns` (C) `df.headers` (D) `df.fields`
9. 下列哪個方法可以用來重命名列名？ (A) `df.rename()` (B) `df.replace()` (C) `df.name_change()` (D) `df.update()`
10. 若要刪除包含任何空值的行，應使用？ (A) `df.dropna(axis=1)` (B) `df.dropna(how='any')` (C) `df.dropna(how='all')` (D) `df.fill_null()`

### 2. 多選題 (Multiple Choice, MC)
11. 關於 `pd.read_excel()` 的描述，下列哪些正確？ (A) 可以通過 `sheet_name` 參數讀取特定的工作表。 (B) 它能自動識別所有數據類型，不需要手動調整。 (C) 可以通過 `usecols` 參數只讀取特定的欄位以節省內存。 (D) 必須安裝 `openpyxl` 或 `xlrd` 等引擎才能支持 xlsx。
12. 下列哪些是 Pandas 的數據結構？ (A) Series (B) DataFrame (C) Panel (D) Array (NumPy)
13. 關於 `loc` 與 `iloc` 的區別，正確的是？ (A) `loc` 是基於標籤 (B) `iloc` 是基於整數索引 (C) `loc` 切片包含結束邊界 (D) `iloc` 切片不包含結束邊界
14. 合併數據時，`pd.concat()` 的優點包括？ (A) 簡單垂直堆疊 (B) 支援不同欄位的自動對齊 (C) 速度比 merge 快 (D) 可以同時合併多個對象
15. 處理缺失值時，`fillna()` 可以填充什麼內容？ (A) 固定數值 (B) 該欄位的平均值 (C) 前一行的值 (ffill) (D) 後一行的值 (bfill)
16. 篩選數據時，下列語法正確的有？ (A) `df[df['age'] > 20]` (B) `df[(df['A']>0) & (df['B']<0)]` (C) `df[df['A']>0 | df['B']<0]` (D) `df.query('age > 20')`
17. 導出 Excel 時，`to_excel()` 支援的參數有？ (A) `index=False` (B) `sheet_name='Data'` (C) `columns=['A', 'B']` (D) `encoding='utf-8'`
18. 下列哪些方法可以用來檢查 DataFrame 的基本資訊？ (A) `df.info()` (B) `df.describe()` (C) `df.check()` (D) `df.dtypes`
19. 對數據進行排序時，`sort_values()` 支援？ (A) 單欄位排序 (B) 多欄位排序 (C) 升序與降序配置 (D) 就地修改 (inplace=True)
20. 刪除重複數據時，`drop_duplicates()` 可以？ (A) 指定特定欄位 (B) 保留最後一筆 (keep='last') (C) 保留第一筆 (keep='first') (D) 刪除所有重複項

### 3. 填充題 (Fill-in-the-blank, Fill)
21. 若要刪除 DataFrame `df` 中所有包含空值的行，應調用的方法是：__________。
22. 在 `loc` 篩選中，`&` 代表 __________ 邏輯運算。
23. `pd.read_csv()` 若讀取時出現 UnicodeDecodeError，通常需要調整 __________ 參數。
24. 查看 DataFrame 最後 5 筆數據的函數是 __________。
25. 要獲取 DataFrame 的行數，可以使用內建函數 `len(df)` 或屬性 `df.________[0]`。
26. 將 DataFrame 保存為 Excel 檔案的函數是 __________。
27. 若要在不讀取整張表的情況下只讀取前 100 行，應設置參數 `nrows=__________`。
28. 篩選某欄位是否在給定列表中的方法是 `isin()`，例如 `df[df['ID'].________([1, 2, 3])]`。
29. `df.reset_index(________=True)` 可以避免將舊索引變為新的一欄。
30. `df.isna().________()` 可以統計每一欄各有多少個缺失值。

---

## 五、 Q 矩陣 (Q-matrix)
| 題目 | KP1.1 | KP1.2 | KP1.3 | KP1.4 | KP1.5 | KP1.6 |
|---|---|---|---|---|---|---|
| SC1 | 0 | 0 | 1 | 0 | 0 | 0 |
| SC2 | 0 | 1 | 0 | 0 | 0 | 0 |
| SC3 | 1 | 0 | 0 | 0 | 0 | 0 |
| SC4 | 1 | 0 | 0 | 0 | 0 | 0 |
| SC5 | 1 | 0 | 0 | 0 | 0 | 0 |
| SC6 | 0 | 1 | 0 | 0 | 0 | 0 |
| SC7 | 0 | 0 | 1 | 0 | 0 | 0 |
| SC8 | 1 | 0 | 0 | 0 | 0 | 0 |
| SC9 | 1 | 0 | 0 | 0 | 0 | 0 |
| SC10| 0 | 0 | 0 | 0 | 1 | 0 |
| MC11| 0 | 1 | 0 | 0 | 0 | 0 |
| MC12| 1 | 0 | 0 | 0 | 0 | 0 |
| MC13| 0 | 0 | 1 | 0 | 0 | 0 |
| MC14| 0 | 0 | 0 | 0 | 0 | 1 |
| MC15| 0 | 0 | 0 | 0 | 1 | 0 |
| MC16| 0 | 0 | 0 | 1 | 0 | 0 |
| MC17| 0 | 0 | 0 | 0 | 0 | 1 |
| MC18| 1 | 0 | 0 | 0 | 0 | 0 |
| MC19| 1 | 0 | 0 | 0 | 0 | 0 |
| MC20| 0 | 0 | 0 | 0 | 1 | 0 |
| Fill21| 0 | 0 | 0 | 0 | 1 | 0 |
| Fill22| 0 | 0 | 0 | 1 | 0 | 0 |
| Fill23| 0 | 1 | 0 | 0 | 0 | 0 |
| Fill24| 1 | 0 | 0 | 0 | 0 | 0 |
| Fill25| 1 | 0 | 0 | 0 | 0 | 0 |
| Fill26| 0 | 0 | 0 | 0 | 0 | 1 |
| Fill27| 0 | 1 | 0 | 0 | 0 | 0 |
| Fill28| 0 | 0 | 0 | 1 | 0 | 0 |
| Fill29| 1 | 0 | 0 | 0 | 0 | 0 |
| Fill30| 0 | 0 | 0 | 0 | 1 | 0 |
