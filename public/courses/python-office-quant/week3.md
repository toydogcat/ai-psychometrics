# 第 3 週：PPT 簡報自動化設計 (python-pptx)

## 一、 單元講解 (Lecture)
本單元將教授如何使用 Python 自動生成專業的幻燈片簡報，適用於定期數據彙報與批量產品介紹。 (100 分鐘)

### 1. python-pptx 對象模型 (20 min)
- **層級關係**: Presentation > Slides > Shapes。
- **幻燈片佈局 (Layouts)**: 理解母版 (Master) 與版式 (Slide Layout) 的索引關係。
- **座標系統**: 了解 PPT 中的位置與尺寸單位 (Emu, Inches)。

### 2. 形狀與文字框操作 (20 min)
- **Shape 類型**: 文字框、圖片、圖形等。
- **文字編輯**: 訪問 `text_frame` 並操作段落 (Paragraphs) 與文字塊 (Runs)。
- **格式美化**: 設置字體顏色、大小、粗細及對齊方式。

### 3. 圖表自動化 (20 min)
- **插入圖表**: `add_chart()` 並設置圖表類型 (XL_CHART_TYPE)。
- **數據綁定**: 使用 `CategoryChartData` 定義類別與數值序列。
- **圖表自定義**: 調整圖例位置、座標軸標題等屬性。

### 4. 表格與圖片 (20 min)
- **幻燈片表格**: `add_table()` 並進行單元格數據填充。
- **圖片處理**: 插入圖片並精確控制其在幻燈片上的座標 (Left, Top) 與尺寸。
- **層級管理**: 了解形狀的疊放次序 (Z-order)。

### 5. 批量生成實戰 (20 min)
- **循環生成**: 讀取數據源並為每一條數據生成一頁 Slide。
- **模板應用**: 基於現有 PPT 檔案進行內容追加或修改。

---

## 二、 動手實作 (Lab)
練習將枯燥的數據轉化為視覺化 PPT 報表。 (50 分鐘)

### 1. 自動化月度銷售分析 PPT (20 min)
- **任務**: 讀取 Excel 中的月度數據，自動生成一個包含標題頁、數據表頁與趨勢圖頁的 PPT。
- **要求**: 趨勢圖需顯示各產品線的增長情況。

### 2. 批量產品手冊 (15 min)
- **任務**: 從產品資料夾讀取圖片與說明，自動生成 10 頁產品介紹 PPT，每頁一張產品圖與對應文案。

### 3. 母版樣式應用 (15 min)
- **任務**: 加載一個公司標準 PPT 模板，並確保新生成的幻燈片符合母版設定的配色與 LOGO 位置。

---

## 三、 本週知識點回顧 (KP)
- **[KP 3.1]**: 掌握 `python-pptx` 對象模型，理解 Slides 與 Layouts 的層級結構。
- **[KP 3.2]**: 熟練操作 Shape 對象，特別是文字框 (TextFrame) 的內容填充與格式化。
- **[KP 3.3]**: 掌握圖表自動化技術，能根據動態數據生成柱狀圖、餅圖等。
- **[KP 3.4]**: 了解幻燈片母版 (Slide Master) 的應用，獲取正確的佈局 ID 以保持風格統一。
- **[KP 3.5]**: 學習批量操作技巧，實現從數據源到多頁 PPT 的高效自動化生成。

---

## 四、 課後測驗題庫 (Quiz)

### 1. 單選題 (Single Choice, SC)
1. 在 `python-pptx` 中，幻燈片的所有內容（文字、圖片、圖表）統一被視為哪種對象？ (A) Slide (B) Shape (C) Content (D) Layout
2. 如何創建一個新的 PPT 簡報對象？ (A) `ppt = Presentation()` (B) `ppt = PowerPoint()` (C) `ppt = NewSlide()` (D) `ppt = Document()`
3. 向 PPT 演示文稿添加一張新幻燈片，需要調用 `prs.slides.________(layout)`。 (A) `new()` (B) `append()` (C) `add_slide()` (D) `insert()`
4. 在 `python-pptx` 中，位置和尺寸的基礎單位是？ (A) Pixel (B) Point (C) Emu (D) Mm
5. 如何獲取幻燈片母版中第 1 個佈局？ (A) `prs.slide_layouts[0]` (B) `prs.master[0]` (C) `prs.templates[0]` (D) `prs.layouts.get(0)`
6. 若要在幻燈片中添加一個文字框，應使用哪個方法？ (A) `slide.shapes.add_textbox()` (B) `slide.add_text()` (C) `slide.shapes.new_text()` (D) `slide.insert_box()`
7. 修改文字框內容應訪問哪個屬性？ (A) `shape.content` (B) `shape.text` (C) `shape.value` (D) `shape.string`
8. 圖表數據對象通常使用哪個類別？ (A) `ChartData` (B) `TableData` (C) `DataPoint` (D) `SeriesData`
9. 下列哪個常量代表柱狀圖類型？ (A) `XL_CHART_TYPE.COLUMN_CLUSTERED` (B) `XL_CHART_TYPE.PIE` (C) `XL_CHART_TYPE.LINE` (D) `XL_CHART_TYPE.BAR`
10. 保存 PPT 檔案的方法是？ (A) `prs.save('test.pptx')` (B) `prs.write('test.pptx')` (C) `prs.export('test.pptx')` (D) `prs.close()`

### 2. 多選題 (Multiple Choice, MC)
11. 關於自動化生成 PPT，下列哪些是正確的應用？ (A) 定時抓取股市數據並生成每日分析 PPT (B) 將 Excel 信息轉化為多頁產品手冊 (C) 自動修改現有 PPT 的動畫效果 (D) 根據模板快速生成會議邀請
12. `slide.shapes` 集合中可能包含哪些類型的 Shape？ (A) AutoShape (B) Picture (C) GraphicFrame (包含圖表) (D) GroupShape
13. 關於文字格式設置，正確的有？ (A) `run.font.size = Pt(24)` (B) `run.font.bold = True` (C) `run.font.color.rgb = RGBColor(255, 0, 0)` (D) `run.alignment = CENTER`
14. 下列哪些單位可以用來設置尺寸？ (A) `Inches` (B) `Cm` (C) `Pt` (D) `Emu`
15. 關於 PPT 表格操作，正確的有？ (A) `slide.shapes.add_table()` (B) 可以通過 `table.cell(r, c)` 訪問單元格 (C) 單元格內部的文字通過 `cell.text_frame` 操作 (D) 不支援合併單元格
16. 如何向幻燈片添加圖片？ (A) 需要指定圖片路徑 (B) 可以設置 left, top 座標 (C) 可以設置 width, height 尺寸 (D) 圖片會自動拉伸以填滿幻燈片
17. 幻燈片母版 (Slide Master) 的作用包括？ (A) 定義背景圖案 (B) 定義默認字體樣式 (C) 定義佔位符位置 (D) 保存具體的幻燈片數據
18. 下列關於圖表的操作正確的有？ (A) 可以動態更新數據 (B) 支援設置圖表標題 (C) 支援顯示數據標籤 (D) 支援所有 3D 圖表效果
19. 關於 `python-pptx` 的依賴與環境，正確的有？ (A) 需要安裝 `lxml` (B) 支援 `.pptx` 格式 (C) 支援舊版 `.ppt` 格式 (D) 跨平台支持 (Win/Mac/Linux)
20. `text_frame` 對象可以？ (A) 設置垂直對齊方式 (B) 設置文字自動換行 (C) 包含多個 Paragraph (D) 設置文字旋轉角度

### 3. 填充題 (Fill-in-the-blank, Fill)
21. 向 PPT 演示文稿添加一張新幻燈片，需要調用 `prs.slides.________(layout)`。
22. 訪問幻燈片中所有形狀的集合是 `slide.________`。
23. 設置文字顏色為紅色，應使用 `RGBColor(255, ____, ____)`。
24. 在 `python-pptx` 中，設置寬度為 10 英吋需要使用 `________(10)`。
25. 要清除幻燈片上的某個形狀，應調用 `shape.________()`。
26. 圖表對象在 Shape 集合中的類型是 `________`。
27. 表格的行數在創建時通過參數 `________` 指定。
28. 獲取當前簡報中幻燈片的總數：`len(prs.________)`。
29. 修改段落對齊方式需設置 `paragraph.________ = PP_ALIGN.CENTER`。
30. `python-pptx` 主要是基於 __________ 格式標準開發的。

---

## 五、 Q 矩陣 (Q-matrix)
| 題目 | KP3.1 | KP3.2 | KP3.3 | KP3.4 | KP3.5 |
|---|---|---|---|---|---|
| SC1 | 1 | 1 | 0 | 0 | 0 |
| SC2 | 1 | 0 | 0 | 0 | 0 |
| SC3 | 1 | 0 | 0 | 0 | 0 |
| SC4 | 1 | 0 | 0 | 0 | 0 |
| SC5 | 0 | 0 | 0 | 1 | 0 |
| SC6 | 0 | 1 | 0 | 0 | 0 |
| SC7 | 0 | 1 | 0 | 0 | 0 |
| SC8 | 0 | 0 | 1 | 0 | 0 |
| SC9 | 0 | 0 | 1 | 0 | 0 |
| SC10| 1 | 0 | 0 | 0 | 0 |
| MC11| 0 | 0 | 0 | 0 | 1 |
| MC12| 1 | 1 | 0 | 0 | 0 |
| MC13| 0 | 1 | 0 | 0 | 0 |
| MC14| 1 | 0 | 0 | 0 | 0 |
| MC15| 0 | 1 | 0 | 0 | 0 |
| MC16| 1 | 0 | 0 | 0 | 0 |
| MC17| 0 | 0 | 0 | 1 | 0 |
| MC18| 0 | 0 | 1 | 0 | 0 |
| MC19| 1 | 0 | 0 | 0 | 0 |
| MC20| 0 | 1 | 0 | 0 | 0 |
| Fill21| 1 | 0 | 0 | 0 | 0 |
| Fill22| 1 | 1 | 0 | 0 | 0 |
| Fill23| 0 | 1 | 0 | 0 | 0 |
| Fill24| 1 | 0 | 0 | 0 | 0 |
| Fill25| 0 | 1 | 0 | 0 | 0 |
| Fill26| 1 | 0 | 1 | 0 | 0 |
| Fill27| 0 | 1 | 0 | 0 | 0 |
| Fill28| 1 | 0 | 0 | 0 | 0 |
| Fill29| 0 | 1 | 0 | 0 | 0 |
| Fill30| 1 | 0 | 0 | 0 | 0 |
