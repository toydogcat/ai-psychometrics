# 課程：微積分下 - 第 14 週 - 線積分基本定理與 Green 定理 (FTC for Line Integrals & Green's Theorem)

本週將深入探討向量場積分的核心理論：線積分基本定理（Fundamental Theorem for Line Integrals）以及連通二重積分與線積分的強大工具：Green 定理。這些定理是物理學（如功、勢能、流體力學）的數學基石。
本週教學內容對應 **Stewart Calculus Ch 16.3-16.4**。

---

## 一、 單元講解 (Lecture) - 總計 100 分鐘

### 1. 線積分基本定理 (20 min) (KP14.1)
*   **概念講解**：
    在單變數微積分中，FTC 告訴我們積分可以透過反導數在端點的值來計算。在向量場中也有類似結論：
    若 $C$ 是由 $\mathbf{r}(t), a \le t \le b$ 表示的光滑曲線，且 $\mathbf{F} = \nabla f$ 是在 $C$ 所在區域連續的梯度場，則：
    $$\int_C \nabla f \cdot d\mathbf{r} = f(\mathbf{r}(b)) - f(\mathbf{r}(a))$$
*   **必要證明**：
    根據連鎖律：$\frac{d}{dt} f(\mathbf{r}(t)) = \nabla f(\mathbf{r}(t)) \cdot \mathbf{r}'(t)$。
    因此，$\int_C \nabla f \cdot d\mathbf{r} = \int_a^b \nabla f(\mathbf{r}(t)) \cdot \mathbf{r}'(t) \, dt = \int_a^b \frac{d}{dt} f(\mathbf{r}(t)) \, dt$。
    根據微積分基本定理，此式等於 $f(\mathbf{r}(b)) - f(\mathbf{r}(a))$。
*   **例題 14.1.1**：
    求 $\int_C \mathbf{F} \cdot d\mathbf{r}$，其中 $\mathbf{F} = \langle \sin y, x\cos y \rangle$，$C$ 是從 $(0,0)$ 到 $(2, \pi/2)$ 的任意路徑。
    *   **解**：
        觀察發現 $\mathbf{F} = \nabla(x\sin y)$。令 $f(x,y) = x\sin y$。
        由基本定理，積分值 $= f(2, \pi/2) - f(0, 0) = 2\sin(\pi/2) - 0 = 2$。

---

### 2. 路徑無關性與保守場判定 (20 min) (KP14.2)
*   **概念講解**：
    若線積分 $\int_C \mathbf{F} \cdot d\mathbf{r}$ 僅取決於端點，則稱該積分**與路徑無關 (Path Independence)**。這與 $\mathbf{F}$ 是否為**保守場 (Conservative Field)** 是等價的。
*   **判定定理**：
    若 $\mathbf{F} = P\mathbf{i} + Q\mathbf{j}$ 在開簡單連通區域 $D$ 上具有連續偏導數，則 $\mathbf{F}$ 為保守場的充要條件是：
    $$\frac{\partial P}{\partial y} = \frac{\partial Q}{\partial x}$$
*   **例題 14.2.1**：
    判定 $\mathbf{F} = \langle 3+2xy, x^2-3y^2 \rangle$ 是否為保守場？若是，求其位能函數。
    *   **解**：
        $P = 3+2xy, Q = x^2-3y^2$。
        $P_y = 2x, Q_x = 2x$。相等且區域為 $\mathbb{R}^2$（簡單連通），故為保守場。
        $f_x = 3+2xy \implies f = 3x + x^2y + g(y)$。
        $f_y = x^2 + g'(y) = x^2 - 3y^2 \implies g'(y) = -3y^2 \implies g(y) = -y^3 + C$。
        故 $f(x,y) = 3x + x^2y - y^3 + C$。

---

### 3. Green 定理 (20 min) (KP14.3)
*   **概念講解**：
    Green 定理將二維區域 $D$ 上的二重積分與其邊界 $C$ 上的線積分聯繫起來。
    設 $C$ 為逐段光滑、簡單閉曲線，圍成區域 $D$。若 $\mathbf{F} = \langle P, Q \rangle$ 在 $D$ 上連續且具連續偏導數，則：
    $$\oint_C P \, dx + Q \, dy = \iint_D \left( \frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} \right) dA$$
    注意：$C$ 必須取**正向**（沿著 $C$ 走，區域 $D$ 在左側，即逆時針）。
*   **例題 14.3.1**：
    計算 $\oint_C xy \, dx + x^2 y^3 \, dy$，其中 $C$ 是由 $(0,0), (1,0), (1,2), (0,2)$ 組成的矩形邊界。
    *   **解**：
        $P = xy, Q = x^2 y^3$。
        $Q_x = 2xy^3, P_y = x$。
        $$\iint_D (2xy^3 - x) \, dA = \int_0^1 \int_0^2 (2xy^3 - x) \, dy dx = \int_0^1 [ \frac{1}{2}xy^4 - xy ]_0^2 \, dx$$
        $= \int_0^1 (8x - 2x) \, dx = \int_0^1 6x \, dx = [3x^2]_0^1 = 3$。

---

### 4. 使用 Green 定理計算面積 (20 min) (KP14.4)
*   **概念講解**：
    若我們令 $\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} = 1$，則 Green 定理右式即為面積。常見形式有：
    $$A = \oint_C x \, dy = -\oint_C y \, dx = \frac{1}{2} \oint_C x \, dy - y \, dx$$
*   **例題 14.4.1**：
    使用線積分求橢圓 $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$ 的面積。
    *   **解**：
        參數化：$x = a\cos t, y = b\sin t, 0 \le t \le 2\pi$。
        $dx = -a\sin t dt, dy = b\cos t dt$。
        $A = \frac{1}{2} \oint_C x \, dy - y \, dx = \frac{1}{2} \int_0^{2\pi} (a\cos t)(b\cos t dt) - (b\sin t)(-a\sin t dt)$
        $= \frac{1}{2} \int_0^{2\pi} ab (\cos^2 t + \sin^2 t) \, dt = \frac{1}{2} ab \cdot 2\pi = \pi ab$。

---

### 5. Green 定理的向量形式 (20 min) (KP14.5)
*   **概念講解**：
    Green 定理有兩種重要的向量改寫形式：
    1.  **旋度形式 (Circulation Form)**：
        $\oint_C \mathbf{F} \cdot d\mathbf{r} = \iint_D (\text{curl } \mathbf{F}) \cdot \mathbf{k} \, dA$
    2.  **散度形式 (Flux Form)**：
        $\oint_C \mathbf{F} \cdot \mathbf{n} \, ds = \iint_D \text{div } \mathbf{F} \, dA$
        這描述了流體穿過邊界 $C$ 的淨流量。
*   **視覺化參考**：
    ![Green 定理示意圖](img/week14_kp14_3.webp)

---

## 二、 動手實作 (Lab) - 總計 50 分鐘

### 實作：SymPy 驗證 Green 定理與向量場分析
**任務目標**：透過符號計算驗證 Green 定理，並繪製非保守場的旋轉性。

```python
import sympy as sp
import numpy as np
import matplotlib.pyplot as plt

# 1. SymPy 驗證：F = < -y^3, x^3 > 在單位圓上的積分
x, y, t = sp.symbols('x y t')
P = -y**3
Q = x**3

# 左式：線積分
# x = cos(t), y = sin(t)
lhs = sp.integrate(P.subs({x: sp.cos(t), y: sp.sin(t)}) * (-sp.sin(t)) + 
                   Q.subs({x: sp.cos(t), y: sp.sin(t)}) * (sp.cos(t)), (t, 0, 2*sp.pi))

# 右式：二重積分 (dQ/dx - dP/dy)
integrand = sp.diff(Q, x) - sp.diff(P, y) # 3x^2 + 3y^2
# 轉極座標 r, theta
r, theta = sp.symbols('r theta')
integrand_polar = (3*r**2) * r # dA = r dr dtheta
rhs = sp.integrate(integrand_polar, (r, 0, 1), (theta, 0, 2*sp.pi))

print(f"線積分結果: {lhs}")
print(f"二重積分結果: {rhs}")

# 2. 向量場視覺化
X, Y = np.meshgrid(np.linspace(-2, 2, 20), np.linspace(-2, 2, 20))
U = -Y**3
V = X**3

plt.figure(figsize=(7,7))
plt.streamplot(X, Y, U, V, color=np.sqrt(U**2+V**2), cmap='autumn')
plt.title("Vector Field $\mathbf{F} = \langle -y^3, x^3 \rangle$ (Non-conservative)")
plt.colorbar(label='Speed')
plt.show()
```

---

## 三、 本週知識點回顧 (KP)
- **KP14.1**: 掌握線積分基本定理 $\int_C \nabla f \cdot d\mathbf{r} = f(B) - f(A)$。
- **KP14.2**: 理解保守場判定條件 $P_y = Q_x$。
- **KP14.3**: 運用 Green 定理簡化封閉路徑的線積分。
- **KP14.4**: 應用 $\frac{1}{2} \oint x dy - y dx$ 計算平面圖形面積。
- **KP14.5**: 理解 Green 定理的旋度與散度物理意義。

---

## 四、 課後測驗題庫 (Quiz) - 30 題

### 1. 單選題 (10 題)
1. 若 $\mathbf{F} = \nabla f$，則 $\oint_C \mathbf{F} \cdot d\mathbf{r}$ 對任何閉路徑 $C$ 必為？ (A) $2\pi$ (B) $\pi$ (C) $0$ (D) $f(C)$
2. Green 定理將線積分轉換為？ (A) 三重積分 (B) 二重積分 (C) 弧長積分 (D) 表面積分
3. 判定 $\mathbf{F} = \langle P, Q \rangle$ 是否保守，需檢查？ (A) $P_x = Q_y$ (B) $P_y = Q_x$ (C) $P_y = -Q_x$ (D) $P_x = -Q_y$
4. 在 Green 定理中，正向路徑是指？ (A) 順時針 (B) 逆時針 (C) 沿 $x$ 軸正向 (D) 沿 $z$ 軸正向
5. 勢函數 $f$ 與 $\mathbf{F}$ 的關係是？ (A) $\mathbf{F} = f$ (B) $\mathbf{F} = \nabla f$ (C) $f = \nabla \cdot \mathbf{F}$ (D) $\mathbf{F} = \nabla \times f$
6. 使用 Green 定理計算面積時，被積函數 $Q_x - P_y$ 應為？ (A) $0$ (B) $1$ (C) $x+y$ (D) $r$
7. 若 $\mathbf{F} = \langle y, -x \rangle$，其沿單位圓逆時針旋轉的積分值為？ (A) $0$ (B) $2\pi$ (C) $-2\pi$ (D) $\pi$
8. 線積分基本定理要求場必須是？ (A) 旋轉場 (B) 保守場 (C) 常數場 (D) 連續場
9. 簡單連通區域是指？ (A) 沒有洞的區域 (B) 凸集 (C) 圓形區域 (D) 無界區域
10. $\int_C (2x dx + 2y dy)$ 的值？ (A) 必為 0 (B) 與路徑無關 (C) 僅與起點有關 (D) 取決於速度

### 2. 多選題 (10 題)
11. 下列哪些場是保守場？ (A) $\langle x, y \rangle$ (B) $\langle y, x \rangle$ (C) $\langle -y, x \rangle$ (D) $\langle 1, 1 \rangle$
12. 關於 Green 定理的前提條件，哪些正確？ (A) $C$ 為簡單閉曲線 (B) $C$ 為正向 (C) $P, Q$ 具連續偏導數 (D) 區域必須是圓形
13. 哪些公式可求面積 $A$？ (A) $\oint x dy$ (B) $-\oint y dx$ (C) $\frac{1}{2} \oint (x dy - y dx)$ (D) $\iint 1 dA$
14. 若 $\mathbf{F}$ 是保守場，則： (A) $\oint_C \mathbf{F} \cdot d\mathbf{r} = 0$ (B) $\int_C \mathbf{F} \cdot d\mathbf{r}$ 路徑無關 (C) $\text{curl } \mathbf{F} = \mathbf{0}$ (D) $\text{div } \mathbf{F} = 0$
15. 關於線積分基本定理，哪些敘述正確？ (A) 它是 FTC 的推廣 (B) 適用於任何向量場 (C) 勢函數不唯一（差一常數） (D) 可求重力作功
16. 若 $Q_x - P_y = 2$，則 $\oint_C P dx + Q dy$ 為？ (A) 面積的兩倍 (B) $2 \iint_D dA$ (C) $0$ (D) $\iint_D 2 dA$
17. 哪些因素會改變 $\int_C \mathbf{F} \cdot d\mathbf{r}$ 的符號？ (A) 改變 $C$ 的方向 (B) $\mathbf{F}$ 變為 $-\mathbf{F}$ (C) 改變參數化的起點 (D) 改變座標系
18. 簡單閉曲線 $C$ 的特性包括： (A) 端點重合 (B) 不自交 (C) 必須是光滑的 (D) 有明確的內部區域
19. 梯度場 $\nabla f$ 的旋度 $\nabla \times (\nabla f)$： (A) 恆為 $\mathbf{0}$ (B) 取決於 $f$ (C) 代表無旋性 (D) 說明場是保守的
20. Green 定理可用於計算： (A) 流量 (B) 環量 (C) 面積 (D) 功

### 3. 填充題 (10 題)
21. 若 $\mathbf{F} = \langle 2x+y, x+2y \rangle$，其位能函數 $f(x,y) = \underline{\quad\quad}$。
22. Green 定理：$\oint_C P dx + Q dy = \iint_D (\underline{\quad\quad}) dA$。
23. 沿路徑 $\mathbf{r}(t)$ 從 $t=0$ 到 $t=1$ 的線積分 $\int_C \nabla f \cdot d\mathbf{r} = f(\mathbf{r}(1)) - \underline{\quad\quad}$。
24. 計算面積的線積分公式 $\frac{1}{2} \oint_C x dy - y dx$ 對應的 $P = \underline{\quad\quad}$。
25. 向量場 $\mathbf{F} = \langle y, -x \rangle$ 在 Green 定理中的 $Q_x - P_y = \underline{\quad\quad}$。
26. 若 $\mathbf{F}$ 為保守場，則其在任意閉曲線上的環量（Circulation）為 $\underline{\quad\quad}$。
27. 一個區域如果任何閉曲線都能在其中縮成一點，稱為 $\underline{\quad\quad}$ 區域。
28. 功的單位在 SI 制中是 $\underline{\quad\quad}$。
29. $\oint_C dy$ 對於任何閉曲線 $C$ 的結果為 $\underline{\quad\quad}$。
30. 若 $\mathbf{F} = \nabla f$，則 $\mathbf{F}$ 稱為 $\underline{\quad\quad}$ 向量場。

---

## 五、 Q 矩陣 (Q-matrix)
| 題號 | KP14.1 | KP14.2 | KP14.3 | KP14.4 | KP14.5 |
|---|---|---|---|---|---|
| Q1-Q10 | 1, 8 | 3, 5, 9, 10 | 2, 4 | 6 | 7 |
| Q11-Q20| 15 | 11, 14, 19 | 12, 18, 20 | 13, 16 | 17 |
| Q21-Q30| 23 | 21, 26, 27, 30 | 22, 29 | 24 | 25, 28 |
