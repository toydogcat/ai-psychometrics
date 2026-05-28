# 課程：微積分下 - 第 8 週 - 雙重積分 (Double Integrals)

本週我們將進入多重積分的世界。雙重積分是計算曲面下方體積、平面區域面積以及物理量（如質量、重心）的核心工具。我們將學習如何將二維積分轉化為兩次連續的一維積分（逐次積分），並探討在不同座標系（直角座標與極座標）下的計算技巧。

本週教學內容對應 **Stewart Calculus Ch 15.1, 15.2, 15.3**。

---

## 一、 單元講解 (Lecture)

### 1. 雙重積分的定義與體積 (KP8.1)
*   **概念講解**：
    對於定義在矩形區域 $R = [a, b] \times [c, d]$ 上的函數 $f(x, y)$，其雙重積分定義為黎曼和的極限：
    $$\iint_R f(x, y) dA = \lim_{\Delta A \to 0} \sum_{i=1}^m \sum_{j=1}^n f(x_{ij}^*, y_{ij}^*) \Delta A$$
    *   **幾何意義**：若 $f(x, y) \geq 0$，則該積分代表曲面 $z = f(x, y)$ 下方與 $xy$ 平面區域 $R$ 上方所圍成的**體積**。
*   **練習題 8.1.1**：
    利用雙重積分定義，說明 $\iint_R 1 dA$ 代表什麼？
    *   **解答**：
        若 $f(x, y) = 1$，則積分代表高度為 1 的柱體體積，其數值等於底面積 $A(R)$。

---

### 2. 逐次積分與富比尼定理 (KP8.2)
*   **定理內容**：
    **富比尼定理 (Fubini's Theorem)**：若 $f(x, y)$ 在矩形 $R = [a, b] \times [c, d]$ 上連續，則：
    $$\iint_R f(x, y) dA = \int_a^b \left[ \int_c^d f(x, y) dy \right] dx = \int_c^d \left[ \int_a^b f(x, y) dx \right] dy$$
    這意味著積分順序不影響結果。
*   **練習題 8.2.1**：
    計算 $\iint_R (x + 2y^2) dA$，其中 $R = [0, 2] \times [0, 1]$。
    *   **解答**：
        1. 先對 $y$ 積分：$\int_0^1 (x + 2y^2) dy = [xy + \frac{2}{3}y^3]_0^1 = x + \frac{2}{3}$。
        2. 再對 $x$ 積分：$\int_0^2 (x + \frac{2}{3}) dx = [\frac{1}{2}x^2 + \frac{2}{3}x]_0^2 = 2 + \frac{4}{3} = \frac{10}{3}$。

---

### 3. 一般區域上的雙重積分 (KP8.3)
*   **概念講解**：
    對於非矩形區域 $D$，我們將其分類為：
    *   **Type I 區域**：$a \leq x \leq b, g_1(x) \leq y \leq g_2(x)$。
        $$\iint_D f dA = \int_a^b \int_{g_1(x)}^{g_2(x)} f(x, y) dy dx$$
    *   **Type II 區域**：$c \leq y \leq d, h_1(y) \leq x \leq h_2(y)$。
        $$\iint_D f dA = \int_c^d \int_{h_1(y)}^{h_2(y)} f(x, y) dx dy$$
*   **練習題 8.3.1**：
    計算 $\iint_D xy dA$，其中 $D$ 是由 $y=x^2$ 與 $y=x$ 圍成的區域。
    *   **解答**：
        1. 交點：$x^2 = x \implies x=0, 1$。區域為 $0 \leq x \leq 1, x^2 \leq y \leq x$。
        2. 積分：$\int_0^1 \int_{x^2}^x xy dy dx = \int_0^1 [x \frac{y^2}{2}]_{x^2}^x dx = \int_0^1 (\frac{x^3}{2} - \frac{x^5}{2}) dx$。
        3. 結果：$[\frac{x^4}{8} - \frac{x^6}{12}]_0^1 = \frac{1}{8} - \frac{1}{12} = \frac{3-2}{24} = \frac{1}{24}$。

---

### 4. 雙重積分的性質 (KP8.4)
*   **概念講解**：
    1. **線性**：$\iint (cf + g) = c \iint f + \iint g$。
    2. **區域可加性**：若 $D = D_1 \cup D_2$ 且無重疊，則 $\iint_D f = \iint_{D_1} f + \iint_{D_2} f$。
    3. **比較性**：若 $f \geq g$，則 $\iint f \geq \iint g$。

---

### 5. 極座標下的雙重積分 (KP8.5)
*   **重要公式推導**：
    在極座標下，$x = r \cos \theta, y = r \sin \theta$。面積元素 $dA$ 的變換為：
    $$dA = r dr d\theta$$
    （注意多了一個 $r$！）
    $$\iint_D f(x, y) dA = \iint_S f(r\cos\theta, r\sin\theta) r dr d\theta$$
*   **練習題 8.5.1**：
    求半徑為 $R$ 的圓面積。
    *   **解答**：
        1. 區域：$0 \leq \theta \leq 2\pi, 0 \leq r \leq R$。
        2. 積分：$\int_0^{2\pi} \int_0^R 1 \cdot r dr d\theta = \int_0^{2\pi} [\frac{1}{2}r^2]_0^R d\theta = \int_0^{2\pi} \frac{1}{2}R^2 d\theta = \pi R^2$。

---

## 二、 動手實作 (Lab) - 總計 50 分鐘

### 實作：利用 SciPy 進行數值雙重積分與視覺化
**任務目標**：對於無法解析求積的函數，利用數值方法求解。

```python
import numpy as np
from scipy import integrate
import matplotlib.pyplot as plt

# 1. 定義函數 f(y, x) -> 注意 SciPy 的順序是 f(y, x)
def f(y, x):
    return np.exp(-x**2 - y**2)

# 2. 定義積分範圍：單位圓內
# x 從 -1 到 1
# y 從 -sqrt(1-x^2) 到 sqrt(1-x^2)
def lower_y(x):
    return -np.sqrt(1 - x**2)
def upper_y(x):
    return np.sqrt(1 - x**2)

result, error = integrate.dblquad(f, -1, 1, lower_y, upper_y)
print(f"數值積分結果 (高斯積分): {result:.6f}")
print(f"解析解 (pi * (1 - e^-1)): {np.pi * (1 - np.exp(-1)):.6f}")

# 3. 視覺化
x_grid = np.linspace(-1.5, 1.5, 100)
y_grid = np.linspace(-1.5, 1.5, 100)
X, Y = np.meshgrid(x_grid, y_grid)
Z = np.exp(-X**2 - Y**2)

fig = plt.figure(figsize=(10, 7))
ax = fig.add_subplot(111, projection='3d')
surf = ax.plot_surface(X, Y, Z, cmap='coolwarm', alpha=0.8)
ax.set_title("Surface $z = e^{-(x^2+y^2)}$")
plt.colorbar(surf)
plt.show()
```

---

## 三、 本週知識點回顧 (KP)
- **KP8.1**: 雙重積分與體積的幾何聯繫。
- **KP8.2**: 矩形區域的逐次積分與順序互換。
- **KP8.3**: Type I ($dy dx$) 與 Type II ($dx dy$) 區域的描述與積分。
- **KP8.4**: 積分的線性與區域分解性質。
- **KP8.5**: 極座標變換公式 $dA = r dr d\theta$。

---

## 四、 課後測驗題庫 (Quiz)

### 1. 單選題 (Single Choice) - 10 題
1. **Q1**: 雙重積分 $\iint_D dA$ 的幾何意義是區域 $D$ 的？
   - (A) 體積 (B) 面積 (C) 周長 (D) 密度
2. **Q2**: 在極座標積分中，$dA$ 等於？
   - (A) $dr d\theta$ (B) $r dr d\theta$ (C) $r^2 dr d\theta$ (D) $dx dy$
3. **Q3**: 若 $f(x, y) = g(x)h(y)$，則在矩形 $R=[a,b]\times[c,d]$ 上的積分可拆為？
   - (A) $\int g + \int h$ (B) $\int g \cdot \int h$ (C) $\int (g+h)$ (D) 無法拆分
4. **Q4**: 富比尼定理適用於下列哪種函數？
   - (A) 任何函數 (B) 連續函數 (C) 僅正函數 (D) 僅線性函數
5. **Q5**: Type I 區域的積分順序通常是？
   - (A) 先 $x$ 後 $y$ (B) 先 $y$ 後 $x$ (C) 同時積分 (D) 隨機
6. **Q6**: 計算 $\int_0^1 \int_0^2 6xy^2 dy dx$ 的結果為？
   - (A) 4 (B) 8 (C) 6 (D) 12
7. **Q7**: 變更積分順序 $\int_0^1 \int_x^1 f dy dx$ 會變成？
   - (A) $\int_0^1 \int_0^y f dx dy$ (B) $\int_0^1 \int_y^1 f dx dy$ (C) $\int_0^x \int_0^1 f dx dy$ (D) 不變
8. **Q8**: 在極座標中，圓方程式 $x^2 + y^2 = 4$ 表示為？
   - (A) $r = 2$ (B) $r = 4$ (C) $\theta = 2$ (D) $r = \cos \theta$
9. **Q9**: 雙重積分具有區域可加性，這意味著區域重疊部分？
   - (A) 計算兩次 (B) 測度應為零 (C) 不能有重疊 (D) 隨意處理
10. **Q10**: $\iint_D (x^2 + y^2) dA$ 在極座標中最適合處理，因為被積函數變為？
    - (A) $r$ (B) $r^2$ (C) $\cos^2 \theta$ (D) $1$

### 2. 多選題 (Multiple Choice) - 10 題
11. **Q11**: 下列哪些關於雙重積分的敘述是正確的？
    - (A) 它是累次極限的結果 (B) 體積可以正也可以負 (C) 被積函數連續則積分必存在 (D) 積分區域必須是圓形
12. **Q12**: 在極座標下，哪些區域描述是正確的？
    - (A) 單位圓：$0 \leq r \leq 1, 0 \leq \theta \leq 2\pi$
    - (B) 第一象限圓心角：$0 \leq \theta \leq \pi/2$
    - (C) 射線：$\theta = \alpha$
    - (D) 圓環：$a \leq r \leq b$
13. **Q13**: 關於變更積分順序 (Change order of integration)：
    - (A) 有助於簡化計算 (B) 邊界常數不變，函數變界改變 (C) 必須繪製區域圖以求新邊界 (D) 只適用於矩形
14. **Q14**: 雙重積分的物理應用包括計算：
    - (A) 質心 (B) 轉動慣量 (C) 薄片的總質量 (D) 線密度
15. **Q15**: 哪些情況下建議使用極座標？
    - (A) 區域包含圓、扇形 (B) 函數包含 $x^2+y^2$ (C) 區域是長方形 (D) 函數是 $\sin(x+y)$
16. **Q16**: 下列性質正確的有：
    - (A) $\iint_D c dA = c \cdot Area(D)$
    - (B) $\iint_D (f-g) dA = \iint f - \iint g$
    - (C) $\iint_D f dA = 0 \implies f=0$
    - (D) 積分區域可以分解為有限個簡單區域
17. **Q17**: 關於逐次積分 $\int_a^b \int_c^d f(x, y) dy dx$：
    - (A) 內部積分將 $x$ 視為常數 (B) 外部積分的結果是常數 (C) 內部積分的限可以是 $x$ 的函數 (D) 外部積分的限必須是常數
18. **Q18**: 若 $D$ 對稱於 $x$ 軸，且 $f(x, -y) = -f(x, y)$（對 $y$ 為奇函數），則：
    - (A) $\iint_D f dA = 0$ (B) $\iint_D f dA = 2\iint_{D_{upper}} f dA$ (C) 積分抵消 (D) 必須使用極座標
19. **Q19**: 下列哪些是 Type II 區域的特徵？
    - (A) 積分順序是 $dx dy$ (B) 左邊界與右邊界是 $y$ 的函數 (C) 上邊界與下邊界是常數 (D) 左右邊界是垂直線
20. **Q20**: 極座標變換 $x=r\cos\theta, y=r\sin\theta$ 滿足：
    - (A) $x^2+y^2 = r^2$ (B) $\tan\theta = y/x$ (C) 雅可比行列式值為 $r$ (D) $r$ 可以為負

### 3. 填充題 (Fill-in-the-blank) - 10 題
21. **Q21**: 富比尼定理指出，在矩形上先對 $x$ 積分或先對 $y$ 積分 __________。
22. **Q22**: 計算 $\int_0^1 \int_0^1 1 dy dx = $ __________。
23. **Q23**: 極座標下，區域 $x^2+y^2 \leq a^2, y \geq 0$ 的 $\theta$ 範圍是 __________。
24. **Q24**: Type I 區域的內部積分限是 __________ 的函數。
25. **Q25**: 若 $f(x, y) = 5$，則 $\iint_D f dA = 5 \times $ __________。
26. **Q26**: 變更積分順序 $\int_0^1 \int_0^y dx dy = \int_0^1 \int_{?}^{1} dy dx$，其中問號處應填 __________。
27. **Q27**: 極座標面積元素 $dA$ 的比例因子 $r$ 源於 __________ 行列式。
28. **Q28**: 雙重積分定義中的 $\Delta A$ 通常取為 $\Delta x \cdot $ __________。
29. **Q29**: 計算 $\int_0^{\pi/2} \int_0^1 r dr d\theta = $ __________。
30. **Q30**: 雙重積分是二維的 __________ (填運算名稱)。

---

## 五、 Q 矩陣 (Q-matrix)

| 題號 | KP8.1 | KP8.2 | KP8.3 | KP8.4 | KP8.5 | |
|---|---|---|---|---|---|
| Q1 | 1 | 0 | 0 | 0 | 0 |
| Q2 | 0 | 0 | 0 | 0 | 1 |
| Q3 | 0 | 1 | 0 | 0 | 0 |
| Q4 | 0 | 1 | 0 | 0 | 0 |
| Q5 | 0 | 0 | 1 | 0 | 0 |
| Q6 | 0 | 1 | 0 | 0 | 0 |
| Q7 | 0 | 0 | 1 | 0 | 0 |
| Q8 | 0 | 0 | 0 | 0 | 1 |
| Q9 | 0 | 0 | 1 | 0 | 0 |
| Q10| 0 | 0 | 0 | 1 | 0 |
| Q11| 1 | 0 | 0 | 0 | 0 |
| Q12| 0 | 0 | 0 | 0 | 1 |
| Q13| 0 | 0 | 1 | 0 | 0 |
| Q14| 0 | 0 | 0 | 1 | 0 |
| Q15| 0 | 0 | 0 | 0 | 1 |
| Q16| 0 | 0 | 0 | 1 | 0 |
| Q17| 0 | 1 | 0 | 0 | 0 |
| Q18| 0 | 0 | 0 | 1 | 0 |
| Q19| 0 | 0 | 1 | 0 | 0 |
| Q20| 0 | 0 | 0 | 0 | 1 |
| Q21| 0 | 1 | 0 | 0 | 0 |
| Q22| 0 | 1 | 0 | 0 | 0 |
| Q23| 0 | 0 | 0 | 1 | 0 |
| Q24| 0 | 0 | 1 | 0 | 0 |
| Q25| 1 | 0 | 0 | 0 | 0 |
| Q26| 0 | 0 | 1 | 0 | 0 |
| Q27| 0 | 0 | 0 | 1 | 0 |
| Q28| 1 | 0 | 0 | 0 | 0 |
| Q29| 0 | 0 | 0 | 1 | 0 |
| Q30| 1 | 0 | 0 | 0 | 0 |

