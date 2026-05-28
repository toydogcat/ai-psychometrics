# 課程一：第 11 週 - 物件導向程式設計 II：繼承、多型與方法

本週我們將探討物件導向的高階特性：如何透過繼承重用程式碼、如何處理複雜的多重繼承衝突，以及如何利用「多型」寫出最具彈性的程式碼。

---

## 一、 單元講解 (Lecture) - 100 分鐘

### 1. 繼承 (Inheritance) 的基礎與程式碼重用
- **父類別 (Base/Parent Class)** 與 **子類別 (Derived/Child Class)**。
- **Is-a 關係**：子類別「是一個」父類別的特殊化版本。
- **覆蓋 (Overriding)**：子類別重新定義父類別的方法以改變行為。

### 2. 多重繼承與 MRO (Method Resolution Order)
- **多重繼承的挑戰**：當多個父類別有同名方法時，Python 如何決定呼叫順序？
- **C3 線性化算法**：解析 Python 3 的 MRO 機制。
- **`cls.__mro__`**：查看方法的搜尋路徑。

### 3. `super()` 的深度解析
- **為什麼不直接用 `Parent.method(self)`？**：處理多重繼承時的協同呼叫。
- **`super()` 的工作原理**：它不是呼叫父類別，而是呼叫 MRO 中的下一個類別。
- **正確初始化**：在繼承鏈中確保所有層級都被正確初始化。

### 4. 多型 (Polymorphism) 與 鴨子型別 (Duck Typing)
- **多型概念**：同一個介面，不同實作。
- **鴨子型別 (Duck Typing)**："If it walks like a duck and quacks like a duck, it’s a duck."
- **實務應用**：只要物件有 `read()` 方法，它就能被當作檔案處理。

### 5. 方法型態：實體、類別與靜態方法
- **實體方法**：第一個參數是 `self`，存取實體狀態。
- **類別方法 (@classmethod)**：第一個參數是 `cls`，常作為「替代構造函式」(Factory Method)。
- **靜態方法 (@staticmethod)**：不接收 `self` 或 `cls`，純粹將邏輯封裝在類別命名空間內。

---

## 二、 動手實作 (Lab) - 50 分鐘

### 任務：開發「多功能動物園與支付系統」
1.  **建立繼承體系**：
    - 定義父類別 `Animal`，包含 `make_sound()` 方法（丟出 `NotImplementedError`）。
    - 建立子類別 `Dog` 與 `Cat` 覆蓋該方法。
    - 建立 `Flying` 混入類別 (Mixin)，提供 `fly()` 功能。
    - 建立 `Bat` 類別同時繼承 `Animal` 與 `Flying`。
2.  **觀察 MRO**：印出 `Bat.__mro__` 並分析搜尋順序。
3.  **實作多型函式**：
    - 撰寫 `zoo_concert(animals)`，接收物件列表，無論是什麼動物都呼叫 `make_sound()`。
4.  **類別方法應用**：
    - 在 `Animal` 中實作一個類別方法 `from_string(data)`，能將 "Dog-Buddy" 這種字串解析並回傳 `Dog` 實例。

---

## 三、 本週知識點回顧 (KP)

- **[KP 11.1] 繼承層級**：透過 `class Child(Parent)` 建立連結，子類別繼承父類別的所有非私有屬性。
- **[KP 11.2] MRO (搜尋路徑)**：Python 使用深度優先、從左至右的線性化順序解決方法衝突。
- **[KP 11.3] super() 協同機制**：在多重繼承中，`super()` 確保每個父類別的方法僅被執行一次。
- **[KP 11.4] 鴨子型別**：Python 不檢查型別，只檢查行為 (Behavior Over Type)。
- **[KP 11.5] 靜態與類別方法**：區分狀態相依性：實體狀態 (self)、類別狀態 (cls)、無狀態 (staticmethod)。

---