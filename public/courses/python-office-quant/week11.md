# 第 11 週：Pandas 數據清洗與進階預處理

## 一、 單元講解 (Lecture)
本單元將學習如何使用 Pandas 進行深度數據清洗，將雜亂的原始數據轉化為適合分析的結構化格式。 (100 分鐘)

### 1. 索引重塑與重複值處理 (20 min)
- **索引操作**: `set_index()`, `reset_index()` 的應用。
- **重複值偵測**: `duplicated()` 與 `drop_duplicates()`。
- **數據映射**: 使用 `replace()` 與 `map()` 進行值替換。

### 2. 進階映射與函數應用 (20 min)
- **apply() 函數**: 作用於行或列的複雜邏輯處理。
- **transform() 與 applymap()**: 了解不同層級的函數應用範圍。
- **Lambda 配合**: 在數據處理中靈活運用匿名函數。

### 3. 字串與數值預處理 (20 min)
- **向量化字串操作**: `.str` 方法鏈（如 `contains`, `extract`, `replace`）。
- **數值離散化**: `pd.cut()` (等寬) 與 `pd.qcut()` (等頻) 分箱。
- **啞變量 (Dummy Variables)**: `pd.get_dummies()` 處理類別型數據。

### 4. 數據合併與連接 (20 min)
- **pd.merge()**: 實現資料庫風格的 Join (Left, Right, Inner, Outer)。
- **pd.concat()**: 靈活的軸向拼接。
- **join() 與 combine_first()**: 處理索引對齊與補缺。

### 5. 異常值與結構轉換 (20 min)
- **異常值偵測**: 基於分位數或標準差的過濾。
- **層級化索引 (MultiIndex)**: 處理多維數據結構。
- **堆疊與拆堆**: `stack()` 與 `unstack()` 的轉換邏輯。

---

## 二、 動手實作 (Lab)
練習處理真實世界中不完整的雜亂數據。 (50 分鐘)

### 1. 爬蟲數據清洗 (20 min)
- **任務**: 讀取一份包含「薪資範圍」、「工作地點」與「發布時間」的雜亂 CSV。
- **要求**: 將薪資字串 (如 50k-80k) 拆分為最低與最高薪資列，並將日期統一格式化。

### 2. 多表關聯分析 (15 min)
- **任務**: 合併「訂單表」、「產品表」與「客戶表」。
- **要求**: 使用 `merge` 獲取每個訂單的產品名稱與客戶所屬地區。

### 3. 用戶分級標籤 (15 min)
- **任務**: 根據用戶的消費頻次與金額，使用 `cut` 將其劃分為「普通」、「活躍」與「核心」三個等級。

---

## 三、 本週知識點回顧 (KP)
- **[KP 11.1]**: 熟練掌握多層索引 (MultiIndex) 的構建與基礎選取操作。
- **[KP 11.2]**: 精通 `merge` 函數進行不同類型的關聯（Left/Right/Inner/Outer）。
- **[KP 11.3]**: 掌握 `apply` 與 Lambda 配合處理無法向量化的複雜數據邏輯。
- **[KP 11.4]**: 學習異常值偵測技術，能基於統計規則清理數據噪點。
- **[KP 11.5]**: 熟練運用字串向量化方法與類別數據編碼 (Dummies/Cut)。

---

## 四、 課後測驗題庫 (Quiz)

### 1. 單選題 (Single Choice, SC)
1. 若要根據 `key` 欄位將 `df1` 與 `df2` 進行合併，保留 `df1` 的所有行（即左連接），代碼是？ (A) `pd.concat([df1, df2])` (B) `df1.merge(df2, on='key', how='left')` (C) `df1.join(df2)` (D) `pd.merge(df1, df2, how='outer')`
2. 將數值欄位 `score` 按指定邊界分為 0-60, 60-80, 80-100 三組，應使用？ (A) `pd.split()` (B) `pd.cut()` (C) `pd.qcut()` (D) `pd.divide()`
3. 如何將字串欄位 `name` 中的所有字母轉為大寫？ (A) `df['name'].upper()` (B) `df['name'].str.upper()` (C) `df['name'].apply(upper)` (D) `df['name'].to_upper()`
4. `df.drop_duplicates(subset=['id'], keep='last')` 代表什麼？ (A) 刪除所有重複行 (B) 保留 id 重複行中的最後一筆 (C) 只檢查最後一筆數據 (D) 刪除 id 相同的行
5. 下列哪個方法可以將類別型數據轉換為 One-Hot 編碼的 Dummy 變量？ (A) `pd.to_dummies()` (B) `pd.get_dummies()` (C) `df.encode()` (D) `df.categorical()`
6. `df.reset_index(drop=True)` 的作用是？ (A) 重置索引並丟棄舊索引 (B) 將索引變為第一列 (C) 刪除所有索引 (D) 清空數據
7. 關於 `df.apply()`，下列敘述何者錯誤？ (A) 支援自定義函數 (B) 只能作用於列 (C) 速度通常慢於原生向量化運算 (D) 可以傳遞參數給函數
8. 如何檢測 DataFrame 中是否有重複的行？ (A) `df.is_duplicate()` (B) `df.duplicated()` (C) `df.repeat()` (D) `df.check()`
9. `pd.concat([df1, df2], axis=1)` 會進行什麼方向的拼接？ (A) 垂直 (B) 水平 (C) 交叉 (D) 遞迴
10. 若要將 DataFrame 中的某個值 `NaN` 替換為該欄位的平均值，最簡便的方式是？ (A) `df.fillna(df.mean())` (B) `df.replace(nan, mean)` (C) `df.dropna()` (D) `df.update(mean)`

### 2. 多選題 (Multiple Choice, MC)
11. 關於 `df.apply()`，正確的有？ (A) 可以作用於行 (axis=1) 或列 (axis=0) (B) 適合執行複雜邏輯 (C) 執行速度比向量化快 (D) 返回值可以是標量或序列
12. 數據合併時，`merge` 的 `how` 參數可選值包括？ (A) `left` (B) `right` (C) `inner` (D) `outer`
13. 下列哪些是 `.str` 方法鏈提供的功能？ (A) `contains()` (B) `extract()` (C) `split()` (D) `replace()`
14. 關於 `pd.cut` 與 `pd.qcut` 的區別，正確的有？ (A) `cut` 基於數值邊界 (B) `qcut` 基於數據分位數 (C) `cut` 每組寬度相同 (D) `qcut` 每組樣本數量基本相同
15. 處理異常值時，常用的判斷標準包括？ (A) 超過 3 倍標準差 (B) 位於 [Q1 - 1.5IQR, Q3 + 1.5IQR] 範圍外 (C) 數值為 0 (D) 數值為空
16. 關於 `MultiIndex` (多層索引)，正確的有？ (A) 可以有多個層級 (B) 支援 `stack()` 與 `unstack()` 轉換 (C) 適合展示透視後的數據 (D) 只能在行上設置
17. 下列哪些操作會修改原始 DataFrame (若不指定 inplace)？ (A) `drop()` (B) `rename()` (C) `fillna()` (D) `replace()`
18. 合併多個 DataFrame 的方法有？ (A) `pd.concat()` (B) `df.append()` (已棄用但仍常見) (C) `pd.merge()` (D) `df.join()`
19. 關於 `transform()` 方法，正確的有？ (A) 返回與原對象形狀相同的對象 (B) 常用於分組後的數據填充 (C) 比 `apply` 更受限但有時更快 (D) 可以同時聚合多個指標
20. 清洗數據時常見的步驟包括？ (A) 處理缺失值 (B) 去除重複項 (C) 數據類型轉換 (D) 異常值處理

### 3. 填充題 (Fill-in-the-blank, Fill)
21. 將 DataFrame 中的 `NaN` 填充為 0 的函數是 `df.________(0)`。
22. `df.rename(columns={'old': '________'})` 可以修改列名。
23. 若要刪除含有空值的行，應調用 `df.________()`。
24. 在 Pandas 中，使用正則表達式提取字串應調用 `df['col'].str.________(regex)`。
25. `pd.merge(df1, df2, on='ID')` 預設執行的是 __________ 連接 (Inner Join)。
26. `df['price'].apply(lambda x: x * ________)` 可將價格翻倍。
27. 將數據按 10% 分位數切分為 10 組，應使用 `pd.________(df['data'], 10)`。
28. `df.index` 返回的是行索引，`df.________` 返回的是列名。
29. `df.astype('________')` 可以將整數欄位轉換為浮點數。
30. `MultiIndex.from_________()` 是創建多層索引常用的類方法之一。

---

## 五、 Q 矩陣 (Q-matrix)
| 題目 | KP11.1 | KP11.2 | KP11.3 | KP11.4 | KP11.5 |
|---|---|---|---|---|---|
| SC1 | 0 | 1 | 0 | 0 | 0 |
| SC2 | 0 | 0 | 0 | 0 | 1 |
| SC3 | 0 | 0 | 0 | 0 | 1 |
| SC4 | 1 | 0 | 0 | 0 | 0 |
| SC5 | 0 | 0 | 0 | 0 | 1 |
| SC6 | 1 | 0 | 0 | 0 | 0 |
| SC7 | 0 | 0 | 1 | 0 | 0 |
| SC8 | 1 | 0 | 0 | 0 | 0 |
| SC9 | 0 | 1 | 0 | 0 | 0 |
| SC10| 0 | 0 | 0 | 1 | 0 |
| MC11| 0 | 0 | 1 | 0 | 0 |
| MC12| 0 | 1 | 0 | 0 | 0 |
| MC13| 0 | 0 | 0 | 0 | 1 |
| MC14| 0 | 0 | 0 | 0 | 1 |
| MC15| 0 | 0 | 0 | 1 | 0 |
| MC16| 1 | 0 | 0 | 0 | 0 |
| MC17| 1 | 0 | 0 | 0 | 0 |
| MC18| 0 | 1 | 0 | 0 | 0 |
| MC19| 0 | 0 | 1 | 0 | 0 |
| MC20| 1 | 1 | 1 | 1 | 1 |
| Fill21| 0 | 0 | 0 | 1 | 0 |
| Fill22| 1 | 0 | 0 | 0 | 0 |
| Fill23| 0 | 0 | 0 | 1 | 0 |
| Fill24| 0 | 0 | 0 | 0 | 1 |
| Fill25| 0 | 1 | 0 | 0 | 0 |
| Fill26| 0 | 0 | 1 | 0 | 0 |
| Fill27| 0 | 0 | 0 | 0 | 1 |
| Fill28| 1 | 0 | 0 | 0 | 0 |
| Fill29| 1 | 0 | 0 | 0 | 0 |
| Fill30| 1 | 0 | 0 | 0 | 0 |
