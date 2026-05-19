# 第 2 週：Word 報表生成與文檔自動化 (python-docx)

## 一、 單元講解 (Lecture)
本單元將學習如何使用 Python 控制 Word 文檔，實現批量生成報告、合約與邀請函。 (100 分鐘)

### 1. python-docx 基礎結構 (20 min)
- **層級關係**: Document > Paragraph > Run 的核心概念。
- **樣式與字體**: 了解內置樣式 (Styles) 與如何手動設置字體屬性。
- **文檔生命週期**: 新建、讀取、修改與保存。

### 2. 段落與文字處理 (20 min)
- **添加內容**: `add_heading()` 與 `add_paragraph()`。
- **Run 對象精細控制**: 在同一段落內設置不同顏色、加粗或傾斜的文字。
- **對齊與間距**: 設置段落的左對齊、置中、右對齊以及行高。

### 3. 表格自動化 (20 min)
- **表格構建**: `add_table()` 的行與列初始化。
- **數據填充**: 遍歷單元格 (Cell) 並寫入文字。
- **樣式設置**: 應用 Word 的表格樣式 (如 `Table Grid`)。

### 4. 圖片與頁面佈局 (20 min)
- **插入圖片**: `add_picture()` 並使用 `Inches` 或 `Cm` 控制尺寸。
- **分頁與換行**: `add_page_break()` 的應用。
- **節 (Section) 與頁碼**: 基礎的頁面邊距設置概念。

### 5. 模板化應用 (20 min)
- **佔位符技術**: 在現有 Word 模板中尋找特定文字並替換。
- **批量生成流程**: 結合 Pandas 數據源與 Word 模板實現自動化輸出。

---

## 二、 動手實作 (Lab)
練習如何從結構化數據轉化為排版優美的文檔。 (50 分鐘)

### 1. 自動化員工考核報告 (20 min)
- **任務**: 從 Excel 讀取員工成績，為每位員工生成一個 Word 報告，包含其各項得分與評價。
- **要求**: 標題需使用一級標題，得分需加粗顯示。

### 2. 批量邀請函生成 (15 min)
- **任務**: 準備一個邀請函模板，利用 Python 批量替換姓名與日期，生成 50 份 PDF (或 Word) 存檔。

### 3. 數據摘要表格 (15 min)
- **任務**: 讀取一個 CSV 銷售摘要，在 Word 中自動生成一個對應的摘要表格並插入公司 LOGO。

---

## 三、 本週知識點回顧 (KP)
- **[KP 2.1]**: 掌握 `python-docx` 的對象模型，理解 Document、Paragraph 與 Run 的關係。
- **[KP 2.2]**: 熟練操作 Paragraph 與 Run，實現複雜的文字格式排版。
- **[KP 2.3]**: 掌握 Word 表格的動態創建、單元格遍歷與樣式應用。
- **[KP 2.4]**: 了解如何插入圖片並精確控制其在文檔中的尺寸。
- **[KP 2.5]**: 學習文檔模板技術，實現結構化數據向非結構化文檔的批量轉換。

---

## 四、 課後測驗題庫 (Quiz)

### 1. 單選題 (Single Choice, SC)
1. 在 `python-docx` 中，若要在同一段落內設置不同的字體顏色（如部分紅字、部分黑字），應該如何操作？ (A) 創建多個 Paragraph (B) 在同一個 Paragraph 中創建多個 Run (C) 使用 HTML 標籤 (D) 無法實現
2. 下列哪個對象是 Word 文檔的最高層級？ (A) Section (B) Document (C) Paragraph (D) Body
3. 添加一級標題的正確語法是？ (A) `doc.add_title('Hello')` (B) `doc.add_heading('Hello', level=1)` (C) `doc.add_text('Hello', style='Heading1')` (D) `doc.add_header('Hello')`
4. 如何獲取文檔中的所有段落列表？ (A) `doc.paragraphs` (B) `doc.get_paragraphs()` (C) `doc.all_text` (D) `doc.sections`
5. 在表格操作中，`table.cell(0, 1).text = 'Data'` 代表？ (A) 第 0 行第 1 列 (B) 第 1 行第 0 列 (C) 第 1 行第 1 列 (D) 第 0 行第 0 列
6. 插入圖片時，若要設置寬度為 5 英吋，需要從哪個模組導入 `Inches`？ (A) `docx.enum` (B) `docx.shared` (C) `docx.text` (D) `docx.image`
7. 如何保存文檔？ (A) `doc.write('test.docx')` (B) `doc.save('test.docx')` (C) `doc.export('test.docx')` (D) `doc.close(save=True)`
8. 獲取現有文檔並進行修改的語法是？ (A) `Document.open('test.docx')` (B) `Document('test.docx')` (C) `docx.load('test.docx')` (D) `open_docx('test.docx')`
9. 下列哪個屬性可以控制 Run 對象的字體加粗？ (A) `run.bold = True` (B) `run.font.bold = True` (C) `run.style = 'Bold'` (D) `run.weight = 700`
10. 若要在文檔末尾添加一個新分頁，應使用？ (A) `doc.new_page()` (B) `doc.add_page_break()` (C) `doc.break_page()` (D) `doc.sections.add()`

### 2. 多選題 (Multiple Choice, MC)
11. 關於 `python-docx` 的表格處理，正確的有？ (A) 可以動態設置表格的行數和列數 (B) 支持讀取現有 Word 文檔中的表格內容 (C) 無法在表格中插入圖片 (D) 可以通過 `table.rows` 獲取所有行
12. 下列哪些屬於 Run 對象的常見屬性？ (A) `bold` (B) `italic` (C) `underline` (D) `font.size`
13. 關於段落對齊方式，下列哪些是有效的 `WD_ALIGN_PARAGRAPH` 常量？ (A) `LEFT` (B) `CENTER` (C) `RIGHT` (D) `JUSTIFY`
14. 使用 `python-docx` 批量生成報告的優勢包括？ (A) 格式統一 (B) 節省人工複製貼上時間 (C) 直接生成 PDF (需配合擴展) (D) 支援所有 Word 動畫效果
15. 關於 `add_heading` 的 `level` 參數，下列描述正確的有？ (A) 0 代表文檔標題 (B) 1 代表一級標題 (C) 最大支援到 9 級標題 (D) 不設置預設為 1
16. 下列哪些方法可以向文檔添加內容？ (A) `add_paragraph()` (B) `add_heading()` (C) `add_table()` (D) `add_picture()`
17. 處理 Word 模板時，常見的策略包括？ (A) 預先在 Word 中定義好樣式 (B) 使用特殊符號（如 `{{name}}`）作為佔位符 (C) 直接修改 XML 源碼 (D) 遍歷 Paragraphs 並檢查 text 屬性
18. 下列關於 `Sections` 的說法正確的有？ (A) 一個文檔可以有多個 Section (B) Section 控制頁面邊距 (C) Section 控制紙張方向 (橫向/縱向) (D) Paragraph 屬於 Section
19. 若要修改現有段落的樣式，可以？ (A) `p.style = 'Normal'` (B) `p.style = doc.styles['Heading 2']` (C) `p.set_style('Heading 2')` (D) 直接修改 `p.text_format`
20. `python-docx` 不支援的操作包括？ (A) 插入超連結 (API 支持度有限) (B) 修改頁眉頁腳 (支援但較複雜) (C) 自動更新目錄 (不支援，需 Word 打開時更新) (D) 插入浮水印

### 3. 填充題 (Fill-in-the-blank, Fill)
21. 向 Word 文檔添加一級標題的方法是：`doc.add_heading('標題內容', level=____)`。
22. 若要獲取表格的第三行，代碼為 `table.________[2]`。
23. 設置 Run 為斜體，應使用 `run.________ = True`。
24. 控制圖片寬度的單位 `Inches` 需要從 `docx.________` 導入。
25. 獲取段落中所有文本內容的屬性是 `p.________`。
26. 添加表格時，語法為 `doc.add_table(rows=____, cols=____)`。
27. 預設情況下，`add_paragraph()` 會將新段落添加到文檔的 __________。
28. 要將段落設為居中對齊，需設置 `p.alignment = WD_ALIGN_PARAGRAPH.________`。
29. `python-docx` 處理的檔案副檔名必須是 __________。
30. 遍歷單元格數據時，可以使用 `cell.________` 屬性獲取其中的文字。

---

## 五、 Q 矩陣 (Q-matrix)
| 題目 | KP2.1 | KP2.2 | KP2.3 | KP2.4 | KP2.5 |
|---|---|---|---|---|---|
| SC1 | 0 | 1 | 0 | 0 | 0 |
| SC2 | 1 | 0 | 0 | 0 | 0 |
| SC3 | 0 | 1 | 0 | 0 | 0 |
| SC4 | 1 | 0 | 0 | 0 | 0 |
| SC5 | 0 | 0 | 1 | 0 | 0 |
| SC6 | 0 | 0 | 0 | 1 | 0 |
| SC7 | 1 | 0 | 0 | 0 | 0 |
| SC8 | 1 | 0 | 0 | 0 | 0 |
| SC9 | 0 | 1 | 0 | 0 | 0 |
| SC10| 0 | 1 | 0 | 0 | 0 |
| MC11| 0 | 0 | 1 | 0 | 0 |
| MC12| 0 | 1 | 0 | 0 | 0 |
| MC13| 0 | 1 | 0 | 0 | 0 |
| MC14| 0 | 0 | 0 | 0 | 1 |
| MC15| 0 | 1 | 0 | 0 | 0 |
| MC16| 1 | 1 | 1 | 1 | 0 |
| MC17| 0 | 0 | 0 | 0 | 1 |
| MC18| 1 | 0 | 0 | 0 | 0 |
| MC19| 1 | 0 | 0 | 0 | 0 |
| MC20| 1 | 1 | 1 | 1 | 1 |
| Fill21| 0 | 1 | 0 | 0 | 0 |
| Fill22| 0 | 0 | 1 | 0 | 0 |
| Fill23| 0 | 1 | 0 | 0 | 0 |
| Fill24| 0 | 0 | 0 | 1 | 0 |
| Fill25| 0 | 1 | 0 | 0 | 0 |
| Fill26| 0 | 0 | 1 | 0 | 0 |
| Fill27| 1 | 0 | 0 | 0 | 0 |
| Fill28| 0 | 1 | 0 | 0 | 0 |
| Fill29| 1 | 0 | 0 | 0 | 0 |
| Fill30| 0 | 0 | 1 | 0 | 0 |
