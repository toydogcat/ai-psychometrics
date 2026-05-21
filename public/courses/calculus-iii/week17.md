# 課程：微積分下 - 第 17 週 - Stokes 定理與 Divergence 定理 (Stokes' & Divergence Theorems)

本週是微積分下學期的巔峰，我們將學習向量分析中最偉大的兩個定理：**Stokes 定理**與**散度定理 (Divergence Theorem)**。這兩個定理將高維度的積分與其邊界的低維度積分聯繫起來，是物理學中場論的核心。
本週教學內容對應 **Stewart Calculus Ch 16.8-16.9**。

---

## 一、 單元講解 (Lecture) - 總計 100 分鐘

### 1. Stokes 定理 (20 min) (KP17.1)
*   **概念講解**：
    Stokes 定理是 Green 定理在三維曲面上的推廣。它聯繫了曲面 $S$ 上的旋度面積分與其邊界曲線 $C$ 的線積分：
    $$\oint_C \mathbf{F} \cdot d\mathbf{r} = \iint_S (\text{curl } \mathbf{F}) \cdot d\mathbf{S}$$
    其中 $C$ 是 $S$ 的正向邊界（遵循右手定則）。
*   **物理意義**：
    向量場沿閉曲線的環量等於旋度穿過由該曲線圍成曲面的總通量。
*   **例題 17.1.1**：
    求 $\oint_C \mathbf{F} \cdot d\mathbf{r}$，其中 $\mathbf{F} = \langle -y, x, z \rangle$，$C$ 是單位圓 $x^2+y^2=1$ 在 $z=1$ 平面。
    *   **解**：
        計算 $\text{curl } \mathbf{F} = \langle 0, 0, 1 - (-1) \rangle = \langle 0, 0, 2 \rangle$。
        取 $S$ 為平面圓盤 $x^2+y^2 \le 1, z=1$，法向量 $\mathbf{n} = \mathbf{k}$。
        $$\iint_S \langle 0, 0, 2 \rangle \cdot \langle 0, 0, 1 \rangle \, dS = \iint_S 2 \, dS = 2 \cdot (\text{Area}) = 2\pi$$

---

### 2. Stokes 定理的應用與環量 (20 min) (KP17.2)
*   **概念講解**：
    若兩個曲面 $S_1, S_2$ 具有相同的邊界 $C$，則穿過它們的旋度通量相等。這允許我們選擇最簡單的曲面進行積分。
*   **例題 17.2.1**：
    驗證 Stokes 定理於 $\mathbf{F} = \langle z, x, y \rangle$ 與上半球面 $z = \sqrt{1-x^2-y^2}$。
    *   **解**：
        邊界 $C$ 是 $xy$ 平面上的單位圓。
        線積分：$\oint_C \langle 0, x, y \rangle \cdot d\mathbf{r} = \int_0^{2\pi} \langle 0, \cos t, \sin t \rangle \cdot \langle -\sin t, \cos t, 0 \rangle dt = \int_0^{2\pi} \cos^2 t dt = \pi$。
        旋度積分：$\text{curl } \mathbf{F} = \langle 1, 1, 1 \rangle$。利用 Stokes 定理轉為對 $xy$ 平面圓盤的積分：$\iint_D \langle 1, 1, 1 \rangle \cdot \mathbf{k} dA = \iint_D 1 dA = \pi$。兩者相等。

---

### 3. 散度定理 (Divergence Theorem) (20 min) (KP17.3)
*   **概念講解**：
    散度定理（又稱 Gauss 定理）聯繫了體積 $E$ 上的散度積分與其邊界曲面 $S$ 的通量積分：
    $$\iint_S \mathbf{F} \cdot d\mathbf{S} = \iiint_E (\text{div } \mathbf{F}) \, dV$$
    其中 $S$ 是閉曲面，法向量向外。
*   **物理意義**：
    穿過閉曲面的淨流量等於區域內源與匯的總強度。
*   **例題 17.3.1**：
    求 $\mathbf{F} = \langle x, y, z \rangle$ 穿過單位球面的通量。
    *   **解**：
        $\text{div } \mathbf{F} = 1+1+1 = 3$。
        由散度定理，通量 $= \iiint_E 3 \, dV = 3 \cdot (\text{Volume}) = 3 \cdot \frac{4}{3}\pi(1)^3 = 4\pi$。

---

### 4. 散度定理的應用與流量 (20 min) (KP17.4)
*   **概念講解**：
    散度定理極大地簡化了複雜曲面的通量計算。只要曲面是閉合的，計算內部的三重積分通常比直接面積分容易。
*   **例題 17.4.1**：
    計算 $\mathbf{F} = \langle xy, yz, zx \rangle$ 穿過單位立方體 $0 \le x, y, z \le 1$ 表面的通量。
    *   **解**：
        $\text{div } \mathbf{F} = y + z + x$。
        $$\int_0^1 \int_0^1 \int_0^1 (x+y+z) \, dz dy dx = [ \frac{1}{2}x^2 + \frac{1}{2}y^2 + \frac{1}{2}z^2 ] = 3 \cdot \frac{1}{2} = 1.5$$

---

### 5. 向量積分定理的綜合比較 (20 min) (KP17.5)
*   **概念講解**：
    *   **FTC for Line Integrals**: $\int \nabla f \cdot d\mathbf{r} = f(B)-f(A)$ (點與線)
    *   **Green's Theorem**: $\oint Pdx+Qdy = \iint (Q_x-P_y)dA$ (線與面-2D)
    *   **Stokes' Theorem**: $\oint \mathbf{F} \cdot d\mathbf{r} = \iint (\text{curl } \mathbf{F}) \cdot d\mathbf{S}$ (線與面-3D)
    *   **Divergence Theorem**: $\iint \mathbf{F} \cdot d\mathbf{S} = \iiint (\text{div } \mathbf{F}) dV$ (面與體)
*   **視覺化參考**：
    ![Stokes 與散度定理示意圖](img/week17_kp17_1.webp)

---

## 二、 動手實作 (Lab) - 總計 50 分鐘

### 實作：三大定理的數值驗證
**任務目標**：使用 Python 驗證 Stokes 定理與散度定理。

```python
import sympy as sp

# 1. 驗證 Stokes 定理: F = <-y, x, 0>, S 為 z = 1-x^2-y^2 (z >= 0)
x, y, z = sp.symbols('x y z')
F = [-y, x, 0]

# 線積分 (左式): C 是 xy 平面單位圓
t = sp.symbols('t')
r = [sp.cos(t), sp.sin(t), 0]
dr = [sp.diff(ri, t) for ri in r]
F_on_C = [-sp.sin(t), sp.cos(t), 0]
lhs_stokes = sp.integrate(sum(F_on_C[i]*dr[i] for i in range(3)), (t, 0, 2*sp.pi))

# 旋度積分 (右式): curl F = <0, 0, 2>
# 轉為對 xy 圓域 D 的積分: \iint 2 dA
r_val, theta = sp.symbols('r_val theta')
rhs_stokes = sp.integrate(2 * r_val, (r_val, 0, 1), (theta, 0, 2*sp.pi))

print(f"Stokes LHS: {lhs_stokes}, RHS: {rhs_stokes}")

# 2. 驗證散度定理: F = <x, y, z>, E 為單位球
div_F = sp.diff(x, x) + sp.diff(y, y) + sp.diff(z, z) # = 3
# 三重積分 (右式): \iiint 3 dV = 3 * (4/3)*pi*1^3 = 4*pi
rho, phi, theta_s = sp.symbols('rho phi theta_s')
rhs_div = sp.integrate(3 * rho**2 * sp.sin(phi), (rho, 0, 1), (phi, 0, sp.pi), (theta_s, 0, 2*sp.pi))

print(f"Divergence Theorem RHS: {rhs_div} (應為 4*pi)")
```

---

## 三、 本週知識點回顧 (KP)
- **KP17.1**: 理解 Stokes 定理的陳述與方向規定。
- **KP17.2**: 掌握利用 Stokes 定理將線積分轉為面積分（或反之）。
- **KP17.3**: 理解散度定理的陳述與物理背景。
- **KP17.4**: 學會利用散度定理簡化閉曲面的通量計算。
- **KP17.5**: 建立所有積分定理的統一框架（廣義 Stokes 定理）。

---

## 四、 課後測驗題庫 (Quiz) - 30 題

### 1. 單選題 (10 題)
1. Stokes 定理聯繫了線積分與？ (A) 面積分 (B) 體積分 (C) 二重積分 (D) 梯度積分
2. 散度定理中的曲面 $S$ 必須是？ (A) 開曲面 (B) 閉曲面 (C) 平面 (D) 無限曲面
3. 在 Stokes 定理中，若曲面 $S$ 在 $xy$ 平面，則線積分等於 $\iint_S (\text{curl } \mathbf{F}) \cdot \underline{\quad\quad} dA$？ (A) $\mathbf{i}$ (B) $\mathbf{j}$ (C) $\mathbf{k}$ (D) $\mathbf{n}$
4. 散度定理將面積分轉換為？ (A) 線積分 (B) 體積分 (C) 旋度積分 (D) 面積分
5. 若 $\text{div } \mathbf{F} = 0$，則穿過任何閉曲面的淨通量為？ (A) 1 (B) $4\pi$ (C) 0 (D) $\mathbf{F}$ 的大小
6. Stokes 定理中，邊界曲線 $C$ 的方向與曲面法向量 $\mathbf{n}$ 遵循？ (A) 左手定則 (B) 右手定則 (C) 順時針定則 (D) 無特定定則
7. 計算 $\mathbf{F} = \langle x, 0, 0 \rangle$ 穿過單位球面的通量，利用散度定理被積函數為？ (A) $x$ (B) $1$ (C) $3$ (D) $x+y+z$
8. 若 $\mathbf{F} = \text{curl } \mathbf{A}$，則穿過閉曲面 $S$ 的通量 $\iint_S \mathbf{F} \cdot d\mathbf{S}$ 必為？ (A) $0$ (B) $\oint \mathbf{A} \cdot d\mathbf{r}$ (C) 區域體積 (D) 1
9. 下列哪位數學家與散度定理齊名？ (A) Newton (B) Gauss (C) Leibniz (D) Cauchy
10. Stokes 定理是哪個定理在 3D 的推廣？ (A) FTC (B) Green 定理 (C) 均值定理 (D) 泰勒定理

### 2. 多選題 (10 題)
11. 下列哪些關於 Stokes 定理的敘述是正確的？ (A) $S$ 可以是任何以 $C$ 為邊界的曲面 (B) $\text{curl } \mathbf{F}$ 是核心被積函數 (C) 適用於非閉合曲線 (D) 需要曲面是定向的
12. 散度定理可以用於： (A) 求閉曲面的通量 (B) 求區域體積（若 $\text{div } \mathbf{F}=1$） (C) 簡化複雜的面積分 (D) 求線積分
13. 若 $\text{div } \mathbf{F} = 3$，區域 $V$ 的體積為 10，則穿過 $V$ 表面的淨通量為？ (A) 30 (B) $\iiint 3 dV$ (C) 10 (D) 0
14. 關於廣義 Stokes 定理，哪些正確？ (A) $\int_{\partial \Omega} \omega = \int_{\Omega} d\omega$ (B) 它是所有積分定理的統一形式 (C) $\partial \Omega$ 代表邊界 (D) 僅適用於 2D
15. 哪些情況下 $\oint_C \mathbf{F} \cdot d\mathbf{r} = 0$？ (A) $\mathbf{F}$ 為保守場 (B) $\text{curl } \mathbf{F} = \mathbf{0}$ (C) $C$ 在一個 $\text{curl } \mathbf{F} \perp \mathbf{n}$ 的面上 (D) $C$ 是點
16. 散度定理的前提包括： (A) $S$ 是分段光滑閉曲面 (B) $\mathbf{F}$ 具連續偏導數 (C) 法向量向外 (D) 區域必須是球體
17. Stokes 定理與 Green 定理的關係： (A) Green 是 Stokes 的平面特例 (B) 兩者都涉及邊界積分 (C) 都涉及旋度 (D) 兩者完全無關
18. 若穿過閉曲面的通量為 0，則： (A) $\mathbf{F}$ 可能是無散場 (B) 內部源與匯抵消 (C) $\mathbf{F} = \mathbf{0}$ (D) 區域內無電荷（若為電場）
19. 向量積分定理中涉及的算子包括： (A) $\nabla$ (B) $\nabla \cdot$ (C) $\nabla \times$ (D) $\nabla^2$
20. 哪些是計算通量的有效途徑？ (A) 直接定義式 $\iint \mathbf{F} \cdot \mathbf{n} dS$ (B) 散度定理 $\iiint \text{div } \mathbf{F} dV$ (C) Stokes 定理（若 $\mathbf{F}$ 是旋度場） (D) 線積分基本定理

### 3. 填充題 (10 題)
21. Stokes 定理：$\oint_C \mathbf{F} \cdot d\mathbf{r} = \iint_S (\underline{\quad\quad}) \cdot d\mathbf{S}$。
22. 散度定理：$\iint_S \mathbf{F} \cdot d\mathbf{S} = \iiint_E (\underline{\quad\quad}) dV$。
23. 若 $\text{div } \mathbf{F} = 1$，則 $\iint_S \mathbf{F} \cdot d\mathbf{S}$ 等於區域 $E$ 的 $\underline{\quad\quad}$。
24. Stokes 定理中，若 $S$ 為平面，$d\mathbf{S} = \mathbf{n} dA$，$\mathbf{n}$ 是平面的 $\underline{\quad\quad}$ 向量。
25. 在散度定理中，若 $\mathbf{F} = \langle x, y, z \rangle$，則 $\text{div } \mathbf{F} = \underline{\quad\quad}$。
26. $\iint_S (\nabla \times \mathbf{F}) \cdot d\mathbf{S}$ 對於任何以 $C$ 為邊界的曲面 $S$ 都 $\underline{\quad\quad}$ (填相同或不同)。
27. 散度定理又稱為 $\underline{\quad\quad}$ 定理。
28. 單位球的體積為 $\underline{\quad\quad}$。
29. 若 $\mathbf{F} = \langle -y, x \rangle$，則 $\iint_D (Q_x - P_y) dA$ 為面積的 $\underline{\quad\quad}$ 倍。
30. 積分定理建立了一定維度積分與其 $\underline{\quad\quad}$ 積分的聯繫。

---

## 五、 Q 矩陣 (Q-matrix)
| 題號 | KP17.1 | KP17.2 | KP17.3 | KP17.4 | KP17.5 |
|---|---|---|---|---|---|
| Q1-Q10 | 1, 3, 6 | 8 | 2, 4, 5, 9 | 7 | 10 |
| Q11-Q20| 11 | 15 | 13, 16, 18 | 12 | 14, 17, 19, 20 |
| Q21-Q30| 21, 24, 26| | 22, 27 | 23, 25, 28, 29| 30 |
