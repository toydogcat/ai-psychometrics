# 課程：微積分下 - 第 5 週 - 方向導數與梯度向量 (Directional Derivatives and Gradient Vectors)

本週將深入探討多變數函數在特定方向上的變化率，並引入向量微積分中最重要的概念之一：**梯度 (Gradient)**。我們將學習如何計算任意方向的變化率、尋找函數增加最快的方向，以及利用梯度求取曲面的切平面與法線。

本週教學內容對應 **Stewart Calculus Ch 14.6**。

---

## 一、 單元講解 (Lecture)

### 1. 方向導數的定義與幾何意義 (KP5.1)
*   **概念講解**：
    偏導數 $f_x$ 和 $f_y$ 分別衡量函數沿著 $x$ 軸和 $y$ 軸方向的變化率。然而，我們往往需要知道函數沿著**任意單位向量** $\mathbf{u} = \langle a, b \rangle$ 方向的變化率。
    *   **定義**：函數 $f(x, y)$ 在點 $(x_0, y_0)$ 沿單位向量 $\mathbf{u} = \langle a, b \rangle$ 的**方向導數 (Directional Derivative)** 定義為：
        $$D_{\mathbf{u}}f(x_0, y_0) = \lim_{h \to 0} \frac{f(x_0 + ha, y_0 + hb) - f(x_0, y_0)}{h}$$
    *   **幾何意義**：它是曲面 $z = f(x, y)$ 在點 $(x_0, y_0, f(x_0, y_0))$ 處，沿著 $\mathbf{u}$ 方向切線的斜率。
*   **練習題 5.1.1**：
    利用定義證明：若 $\mathbf{u} = \mathbf{i} = \langle 1, 0 \rangle$，則 $D_{\mathbf{u}}f = f_x$。
    *   **解答**：
        將 $a=1, b=0$ 代入定義：
        $$D_{\mathbf{i}}f = \lim_{h \to 0} \frac{f(x_0 + h, y_0) - f(x_0, y_0)}{h} = f_x(x_0, y_0)$$
        同理可證 $D_{\mathbf{j}}f = f_y$。

---

### 2. 梯度向量 (Gradient Vector) (KP5.2)
*   **概念講解**：
    梯度是一個向量場，包含了函數所有偏導數的資訊。
    *   **定義**：對於二元函數 $f(x, y)$，其梯度向量 $\nabla f$（讀作 "del f" 或 "gradient of f"）定義為：
        $$\nabla f(x, y) = \langle f_x(x, y), f_y(x, y) \rangle = \frac{\partial f}{\partial x} \mathbf{i} + \frac{\partial f}{\partial y} \mathbf{j}$$
    *   對於三元函數 $f(x, y, z)$：
        $$\nabla f(x, y, z) = \langle f_x, f_y, f_z \rangle$$
*   **練習題 5.2.1**：
    求 $f(x, y) = x^2 y + \sin(xy)$ 在點 $(1, 0)$ 的梯度向量。
    *   **解答**：
        1. 計算偏導：
           $f_x = 2xy + y\cos(xy)$
           $f_y = x^2 + x\cos(xy)$
        2. 代入點 $(1, 0)$：
           $f_x(1, 0) = 2(1)(0) + 0\cos(0) = 0$
           $f_y(1, 0) = 1^2 + 1\cos(0) = 2$
        3. 故 $\nabla f(1, 0) = \langle 0, 2 \rangle$。

---

### 3. 方向導數與梯度的關係 (KP5.3)
*   **定理與證明**：
    **定理**：若 $f$ 是可微函數，則 $f$ 沿單位向量 $\mathbf{u}$ 的方向導數為：
    $$D_{\mathbf{u}}f = \nabla f \cdot \mathbf{u}$$
    *   **證明概要**：
        令 $g(h) = f(x_0 + ha, y_0 + hb)$。則 $D_{\mathbf{u}}f = g'(0)$。
        根據連鎖律：
        $g'(h) = \frac{\partial f}{\partial x} \frac{dx}{dh} + \frac{\partial f}{\partial y} \frac{dy}{dh} = f_x(x, y) \cdot a + f_y(x, y) \cdot b$
        當 $h=0$ 時，$(x, y) = (x_0, y_0)$，故 $g'(0) = f_x a + f_y b = \langle f_x, f_y \rangle \cdot \langle a, b \rangle = \nabla f \cdot \mathbf{u}$。
*   **練習題 5.3.1**：
    求 $f(x, y) = x^2 e^y$ 在點 $(2, 0)$ 沿著方向 $\mathbf{v} = \langle 3, 4 \rangle$ 的方向導數。
    *   **解答**：
        1. 單位向量 $\mathbf{u} = \frac{\mathbf{v}}{|\mathbf{v}|} = \frac{\langle 3, 4 \rangle}{\sqrt{3^2 + 4^2}} = \langle 0.6, 0.8 \rangle$。
        2. 梯度 $\nabla f = \langle 2xe^y, x^2 e^y \rangle$。
        3. 點 $(2, 0)$ 處梯度：$\nabla f(2, 0) = \langle 4, 4 \rangle$。
        4. $D_{\mathbf{u}}f = \langle 4, 4 \rangle \cdot \langle 0.6, 0.8 \rangle = 2.4 + 3.2 = 5.6$。

---

### 4. 梯度的性質與最大變化率 (KP5.4)
*   **概念講解**：
    由公式 $D_{\mathbf{u}}f = \nabla f \cdot \mathbf{u} = |\nabla f| |\mathbf{u}| \cos \theta = |\nabla f| \cos \theta$（其中 $\theta$ 為 $\nabla f$ 與 $\mathbf{u}$ 的夾角）。
    *   **最大增加率**：當 $\theta = 0$（即 $\mathbf{u}$ 與 $\nabla f$ 同向）時，$D_{\mathbf{u}}f$ 有最大值 $|\nabla f|$。
    *   **最大減少率**：當 $\theta = \pi$（即 $\mathbf{u}$ 與 $\nabla f$ 反向）時，$D_{\mathbf{u}}f$ 有最小值 $-|\nabla f|$。
    *   **變化率為零**：當 $\theta = \pi/2$（即 $\mathbf{u} \perp \nabla f$）時，$D_{\mathbf{u}}f = 0$。
*   **練習題 5.4.1**：
    若你在一個山上，高度函數為 $H(x, y) = 1000 - 0.01x^2 - 0.02y^2$。你在點 $(10, 10)$ 處，哪個方向最陡？最陡的坡度是多少？
    *   **解答**：
        1. $\nabla H = \langle -0.02x, -0.04y \rangle$。
        2. 在 $(10, 10)$ 處，$\nabla H = \langle -0.2, -0.4 \rangle$。
        3. 最陡的方向即為梯度方向 $\langle -0.2, -0.4 \rangle$（或單位化後 $\frac{1}{\sqrt{5}}\langle -1, -2 \rangle$）。
        4. 最大坡度為 $|\nabla H| = \sqrt{(-0.2)^2 + (-0.4)^2} = \sqrt{0.2} \approx 0.447$。

---

### 5. 梯度與等值線/面的正交性 (KP5.5)
*   **重要結論**：
    梯度向量 $\nabla f(x_0, y_0)$ 垂直於經過該點的等值線 $f(x, y) = k$。
    對於三元函數，梯度向量 $\nabla F(x_0, y_0, z_0)$ 垂直於等值面 $F(x, y, z) = k$。
    *   **切平面方程式**：
        $F_x(x_0, y_0, z_0)(x - x_0) + F_y(x_0, y_0, z_0)(y - y_0) + F_z(x_0, y_0, z_0)(z - z_0) = 0$
    *   **法線方程式**：
        $\frac{x - x_0}{F_x} = \frac{y - y_0}{F_y} = \frac{z - z_0}{F_z}$
*   **練習題 5.5.1**：
    求橢球面 $\frac{x^2}{4} + y^2 + \frac{z^2}{9} = 3$ 在點 $(-2, 1, -3)$ 的切平面。
    *   **解答**：
        1. 令 $F(x, y, z) = \frac{x^2}{4} + y^2 + \frac{z^2}{9}$。
        2. $\nabla F = \langle \frac{x}{2}, 2y, \frac{2z}{9} \rangle$。
        3. 在點 $(-2, 1, -3)$，$\nabla F = \langle -1, 2, -\frac{2}{3} \rangle$。
        4. 切平面：$-1(x + 2) + 2(y - 1) - \frac{2}{3}(z + 3) = 0$。
        5. 化簡得：$-x + 2y - \frac{2}{3}z = 6$ 或 $3x - 6y + 2z = -18$。

---

## 二、 動手實作 (Lab) - 總計 50 分鐘

### 實作：利用 SymPy 計算梯度並使用 Matplotlib 繪製向量場
**任務目標**：透過程式視覺化梯度向量場與等值線的垂直關係。

```python
import numpy as np
import matplotlib.pyplot as plt
import sympy as sp

# 1. 使用 SymPy 進行符號運算
x, y = sp.symbols('x y')
f_sym = x**2 + y**2  # 簡單的拋物面
grad_f = [sp.diff(f_sym, var) for var in (x, y)]
print(f"函數 f 的梯度為: {grad_f}")

# 2. 準備數值繪圖
f_num = sp.lambdify((x, y), f_sym, 'numpy')
grad_x_num = sp.lambdify((x, y), grad_f[0], 'numpy')
grad_y_num = sp.lambdify((x, y), grad_f[1], 'numpy')

X_range = np.linspace(-2, 2, 20)
Y_range = np.linspace(-2, 2, 20)
X, Y = np.meshgrid(X_range, Y_range)
Z = f_num(X, Y)
U = grad_x_num(X, Y)
V = grad_y_num(X, Y)

# 3. 繪圖
plt.figure(figsize=(8, 6))
# 繪製等值線
cp = plt.contour(X, Y, Z, levels=15, cmap='viridis')
plt.clabel(cp, inline=True, fontsize=8)
# 繪製梯度向量場 (quiver)
plt.quiver(X, Y, U, V, color='red', alpha=0.6, label='Gradient $\nabla f$')

plt.title("Gradient Vector Field and Contour Lines")
plt.xlabel("x")
plt.ylabel("y")
plt.legend()
plt.grid(True)
plt.show()
```

---

## 三、 本週知識點回顧 (KP)
- **KP5.1**: 方向導數定義 $D_{\mathbf{u}}f = \lim_{h \to 0} \frac{f(\mathbf{x}+h\mathbf{u}) - f(\mathbf{x})}{h}$。
- **KP5.2**: 梯度向量 $\nabla f = \langle f_x, f_y, f_z \rangle$ 的定義。
- **KP5.3**: 重要公式 $D_{\mathbf{u}}f = \nabla f \cdot \mathbf{u}$。
- **KP5.4**: 梯度方向是函數增加最快的方向，其模長是最大變化率。
- **KP5.5**: 梯度垂直於等值曲線/曲面。

---

## 四、 課後測驗題庫 (Quiz)

### 1. 單選題 (Single Choice) - 10 題
1. **Q1**: 梯度向量 $\nabla f$ 的方向與等值線 $f(x, y) = k$ 的關係是？
   - (A) 平行 (B) 垂直 (C) 夾角 45 度 (D) 沒有固定關係
2. **Q2**: 函數 $f$ 在點 $P$ 沿單位向量 $\mathbf{u}$ 的方向導數最大值發生在？
   - (A) $\mathbf{u}$ 與 $\nabla f$ 同向 (B) $\mathbf{u}$ 與 $\nabla f$ 反向 (C) $\mathbf{u} \perp \nabla f$ (D) $\mathbf{u} = \mathbf{i}$
3. **Q3**: 若 $\nabla f(P) = \langle 3, 4 \rangle$，則 $f$ 在 $P$ 點的最大變化率為？
   - (A) 3 (B) 4 (C) 5 (D) 7
4. **Q4**: 方向導數 $D_{\mathbf{u}}f$ 是一個？
   - (A) 向量 (B) 標量 (C) 矩陣 (D) 函數
5. **Q5**: 若 $D_{\mathbf{u}}f(P) = 0$，則向量 $\mathbf{u}$ 與 $\nabla f(P)$ 的夾角為？
   - (A) 0 (B) $\pi/4$ (C) $\pi/2$ (D) $\pi$
6. **Q6**: $f(x, y) = xy$ 在點 $(1, 1)$ 處的梯度為？
   - (A) $\langle 1, 1 \rangle$ (B) $\langle 1, 0 \rangle$ (C) $\langle 0, 1 \rangle$ (D) $\langle y, x \rangle$
7. **Q7**: 計算方向導數時，使用的向量 $\mathbf{u}$ 必須是？
   - (A) 零向量 (B) 單位向量 (C) 梯度向量 (D) 任意向量
8. **Q8**: 對於三元函數 $F(x, y, z) = k$，其在 $(x_0, y_0, z_0)$ 的切平面法向量為？
   - (A) $\langle 1, 1, 1 \rangle$ (B) $\langle x_0, y_0, z_0 \rangle$ (C) $\nabla F(x_0, y_0, z_0)$ (D) $\mathbf{0}$
9. **Q9**: 若 $\nabla f = \mathbf{0}$，則該點的方向導數在任何方向皆為？
   - (A) 1 (B) 變動的 (C) 0 (D) 無法定義
10. **Q10**: 梯度算子 $\nabla$ 在直角座標系中的形式為？
    - (A) $\frac{\partial}{\partial x} + \frac{\partial}{\partial y}$ (B) $\langle \frac{\partial}{\partial x}, \frac{\partial}{\partial y}, \frac{\partial}{\partial z} \rangle$ (C) $f_x + f_y$ (D) $dx + dy$

### 2. 多選題 (Multiple Choice) - 10 題
11. **Q11**: 下列關於梯度的描述哪些正確？
    - (A) 梯度是一個向量 (B) 梯度指向函數增加最快的方向 (C) 梯度的長度代表變化率的大小 (D) 梯度永遠指向原點
12. **Q12**: 若 $f(x, y)$ 在 $P$ 點可微，則 $D_{\mathbf{u}}f$ 可以透過哪些量計算？
    - (A) $\nabla f$ (B) $\mathbf{u}$ 的分量 (C) $f$ 的二階導數 (D) 內積運算
13. **Q13**: 關於等值面 $F(x, y, z) = C$，下列哪些敘述正確？
    - (A) 梯度 $\nabla F$ 與面上任何曲線的切線垂直
    - (B) $\nabla F$ 是切平面的法向量
    - (C) 面上點的函數值皆相等
    - (D) 梯度向量一定在等值面上
14. **Q14**: 哪些因素會影響方向導數 $D_{\mathbf{u}}f$ 的數值？
    - (A) 函數的偏導數 (B) 向量 $\mathbf{u}$ 的方向 (C) 所在點的座標 (D) 向量 $\mathbf{u}$ 的長度（若不限制為單位向量）
15. **Q15**: 函數 $f(x, y) = x^2 + y^2$ 在點 $(1, 1)$：
    - (A) 梯度為 $\langle 2, 2 \rangle$ (B) 向外輻射 (C) 等值線為圓 (D) 沿 $\langle -1, -1 \rangle$ 方向減少最快
16. **Q16**: 梯度的連鎖律性質包括：
    - (A) $\nabla(fg) = f\nabla g + g\nabla f$
    - (B) $\nabla(f/g) = \frac{g\nabla f - f\nabla g}{g^2}$
    - (C) $\nabla(u^n) = nu^{n-1}\nabla u$
    - (D) $\nabla(f+g) = \nabla f + \nabla g$
17. **Q17**: 關於切平面與法線：
    - (A) 法線垂直於切平面 (B) 法向量平行於梯度 (C) 切平面方程式是線性的 (D) 所有曲面在每一點都有切平面
18. **Q18**: 若 $D_{\mathbf{u}}f > 0$，則：
    - (A) 函數在該方向增加 (B) $\mathbf{u}$ 與 $\nabla f$ 的夾角小於 90 度 (C) 該點是極大值點 (D) 梯度不為零
19. **Q19**: 下列哪些函數的梯度場是常數向量場？
    - (A) $f = x + y$ (B) $f = x^2 + y^2$ (C) $f = 3x - 2y + 5z$ (D) $f = \sin x$
20. **Q20**: 在 3D 空間中，$D_{\mathbf{u}}f$ 的計算涉及：
    - (A) $f_x, f_y, f_z$ (B) $u_1, u_2, u_3$ (C) 加法與乘法 (D) 外積 (Cross Product)

### 3. 填充題 (Fill-in-the-blank) - 10 題
21. **Q21**: 若 $f(x, y) = e^{xy}$，則 $\nabla f = $ __________。
22. **Q23**: 向量 $\mathbf{u} = \langle \cos \theta, \sin \theta \rangle$，則 $D_{\mathbf{u}}f = f_x \cos \theta + $ __________。
23. **Q23**: 函數 $f$ 在點 $P$ 沿梯度相反方向的方向導數為 __________ (用 $|\nabla f|$ 表示)。
24. **Q24**: 曲面 $z = f(x, y)$ 可以看作三元函數 $F(x, y, z) = f(x, y) - z = 0$ 的 __________。
25. **Q25**: 若 $\nabla f = \langle 2, -1 \rangle$ 且 $\mathbf{u} = \langle 0.6, 0.8 \rangle$，則 $D_{\mathbf{u}}f = $ __________。
26. **Q26**: 梯度向量 $\nabla f$ 的幾何意義是：垂直於 __________ 線。
27. **Q27**: 若 $f(x, y, z) = x^2 + y^2 + z^2$，則在 $(1, 2, 3)$ 的梯度長度為 __________。
28. **Q28**: 切平面的通用方程式為 $n_1(x-x_0) + n_2(y-y_0) + n_3(z-z_0) = 0$，其中 $\langle n_1, n_2, n_3 \rangle$ 為 __________。
29. **Q29**: 方向導數 $D_{\mathbf{u}}f$ 達到最小值的方向是 __________。
30. **Q30**: 梯度場中，積分曲線（流線）總是與等值線 __________。

---

## 五、 Q 矩陣 (Q-matrix)

| 題號 | KP5.1 | KP5.2 | KP5.3 | KP5.4 | KP5.5 | |
|---|---|---|---|---|---|
| Q1 | 0 | 0 | 0 | 0 | 1 |
| Q2 | 0 | 0 | 0 | 1 | 0 |
| Q3 | 0 | 0 | 0 | 1 | 0 |
| Q4 | 1 | 0 | 0 | 0 | 0 |
| Q5 | 0 | 0 | 1 | 0 | 0 |
| Q6 | 0 | 1 | 0 | 0 | 0 |
| Q7 | 1 | 0 | 0 | 0 | 0 |
| Q8 | 0 | 0 | 0 | 0 | 1 |
| Q9 | 0 | 0 | 1 | 0 | 0 |
| Q10| 0 | 1 | 0 | 0 | 0 |
| Q11| 0 | 1 | 0 | 0 | 0 |
| Q12| 0 | 0 | 1 | 0 | 0 |
| Q13| 0 | 0 | 0 | 0 | 1 |
| Q14| 1 | 0 | 0 | 0 | 0 |
| Q15| 0 | 0 | 0 | 1 | 0 |
| Q16| 0 | 1 | 0 | 0 | 0 |
| Q17| 0 | 0 | 0 | 0 | 1 |
| Q18| 0 | 0 | 1 | 0 | 0 |
| Q19| 0 | 1 | 0 | 0 | 0 |
| Q20| 0 | 0 | 1 | 0 | 0 |
| Q21| 0 | 1 | 0 | 0 | 0 |
| Q22| 1 | 0 | 0 | 0 | 0 |
| Q23| 0 | 0 | 0 | 1 | 0 |
| Q24| 0 | 0 | 0 | 0 | 1 |
| Q25| 0 | 0 | 1 | 0 | 0 |
| Q26| 0 | 0 | 0 | 0 | 1 |
| Q27| 0 | 0 | 0 | 1 | 0 |
| Q28| 0 | 0 | 0 | 0 | 1 |
| Q29| 0 | 0 | 0 | 1 | 0 |
| Q30| 0 | 0 | 0 | 0 | 1 |

