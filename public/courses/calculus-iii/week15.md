# 課程：微積分下 - 第 15 週 - 旋度與散度 (Curl and Divergence) 🔥 高難度

本週我們將學習向量分析中的兩個關鍵算子：**旋度 (Curl)** 與 **散度 (Divergence)**。這兩個概念是描述流體運動、電磁場（Maxwell 方程組）以及後續 Stokes 定理與散度定理的基礎。
本週教學內容對應 **Stewart Calculus Ch 16.5**。

---

## 一、 單元講解 (Lecture) - 總計 100 分鐘

### 1. 旋度 (Curl) 的定義與幾何意義 (20 min) (KP15.1)
*   **概念講解**：
    設 $\mathbf{F} = P\mathbf{i} + Q\mathbf{j} + R\mathbf{k}$ 是一個三維向量場。其旋度定義為：
    $$\text{curl } \mathbf{F} = \nabla \times \mathbf{F} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ \frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\ P & Q & R \end{vmatrix}$$
    展開後得到：
    $$\text{curl } \mathbf{F} = \left( \frac{\partial R}{\partial y} - \frac{\partial Q}{\partial z} \right) \mathbf{i} + \left( \frac{\partial P}{\partial z} - \frac{\partial R}{\partial x} \right) \mathbf{j} + \left( \frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} \right) \mathbf{k}$$
*   **物理意義**：
    旋度衡量向量場在某一點附近「旋轉」的趨向。若旋度為 $\mathbf{0}$，則稱該場為**無旋場 (Irrotational)**。
*   **例題 15.1.1**：
    求 $\mathbf{F} = \langle xz, xyz, -y^2 \rangle$ 的旋度。
    *   **解**：
        $$\text{curl } \mathbf{F} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ \partial_x & \partial_y & \partial_z \\ xz & xyz & -y^2 \end{vmatrix} = (-2y - xy)\mathbf{i} - (0 - x)\mathbf{j} + (yz - 0)\mathbf{k}$$
        $= \langle -2y-xy, x, yz \rangle$。

---

### 2. 散度 (Divergence) 的定義與幾何意義 (20 min) (KP15.2)
*   **概念講解**：
    設 $\mathbf{F} = P\mathbf{i} + Q\mathbf{j} + R\mathbf{k}$，其散度是一個**純量函數**，定義為：
    $$\text{div } \mathbf{F} = \nabla \cdot \mathbf{F} = \frac{\partial P}{\partial x} + \frac{\partial Q}{\partial y} + \frac{\partial R}{\partial z}$$
*   **物理意義**：
    散度衡量向量場從某一點「流出」或「匯入」的淨流量。若散度為正，該點為「源 (Source)」；若為負，該點為「匯 (Sink)」。若散度恆為 0，則稱該場為**無散場 (Solenoidal)**。
*   **例題 15.2.1**：
    求 $\mathbf{F} = \langle x^2, y^2, z^2 \rangle$ 的散度。
    *   **解**：
        $\text{div } \mathbf{F} = \frac{\partial}{\partial x}(x^2) + \frac{\partial}{\partial y}(y^2) + \frac{\partial}{\partial z}(z^2) = 2x + 2y + 2z$。

---

### 3. 旋度的性質與保守場判定 (20 min) (KP15.3)
*   **概念講解**：
    一個非常重要的定理：若 $f$ 具連續二階偏導數，則：
    $$\text{curl } (\nabla f) = \mathbf{0}$$
    這意味著**所有的梯度場（保守場）都是無旋的**。
    在簡單連通區域內，反之亦然：若 $\text{curl } \mathbf{F} = \mathbf{0}$，則 $\mathbf{F}$ 是保守場。
*   **例題 15.3.1**：
    判定 $\mathbf{F} = \langle e^x\sin y, e^x\cos y, z \rangle$ 是否為保守場。
    *   **解**：
        計算 $\text{curl } \mathbf{F}$：
        $\partial_y(z) - \partial_z(e^x\cos y) = 0 - 0 = 0$
        $\partial_z(e^x\sin y) - \partial_x(z) = 0 - 0 = 0$
        $\partial_x(e^x\cos y) - \partial_y(e^x\sin y) = e^x\cos y - e^x\cos y = 0$
        旋度為 $\mathbf{0}$，故為保守場。

---

### 4. 散度的性質與拉普拉斯算子 (20 min) (KP15.4)
*   **概念講解**：
    另一個重要恆等式：若 $\mathbf{F}$ 具連續二階偏導數，則：
    $$\text{div } (\text{curl } \mathbf{F}) = 0$$
    即**旋度場的散度恆為 0**。
*   **拉普拉斯算子 (Laplacian)**：
    若 $\mathbf{F} = \nabla f$，則 $\text{div } (\nabla f) = \nabla \cdot \nabla f = \nabla^2 f = \Delta f$。
    $$\nabla^2 f = \frac{\partial^2 f}{\partial x^2} + \frac{\partial^2 f}{\partial y^2} + \frac{\partial^2 f}{\partial z^2}$$
*   **例題 15.4.1**：
    證明 $\text{div}(\text{curl } \mathbf{F}) = 0$。
    *   **解**：
        由定義，$\text{div}(\text{curl } \mathbf{F}) = \frac{\partial}{\partial x}(R_y - Q_z) + \frac{\partial}{\partial y}(P_z - R_x) + \frac{\partial}{\partial z}(Q_x - P_y)$
        $= R_{yx} - Q_{zx} + P_{zy} - R_{xy} + Q_{xz} - P_{yz}$。
        根據 Clairaut 定理，混合偏導數相等，各項相互抵消，結果為 0。

---

### 5. 向量形式的微分算子恆等式 (20 min) (KP15.5)
*   **概念講解**：
    掌握 $\nabla$ 算子的代數運算規則：
    1.  $\nabla(fg) = f\nabla g + g\nabla f$
    2.  $\nabla \cdot (f\mathbf{F}) = f(\nabla \cdot \mathbf{F}) + \mathbf{F} \cdot \nabla f$
    3.  $\nabla \times (f\mathbf{F}) = f(\nabla \times \mathbf{F}) + (\nabla f) \times \mathbf{F}$
*   **視覺化參考**：
    ![旋度與散度示意圖](img/week15_kp15_1.webp)

---

## 二、 動手實作 (Lab) - 總計 50 分鐘

### 實作：向量分析工具包
**任務目標**：利用 Python 計算旋度與散度，並觀察向量場的物理特性。

```python
import sympy as sp

# 定義座標與函數
x, y, z = sp.symbols('x y z')
F = [x*y, y*z, z*x] # 向量場 F = <xy, yz, zx>

# 1. 定義散度計算函數
def divergence(F, vars):
    return sum(sp.diff(F[i], vars[i]) for i in range(len(vars)))

# 2. 定義旋度計算函數 (3D)
def curl(F, vars):
    i = sp.diff(F[2], vars[1]) - sp.diff(F[1], vars[2])
    j = sp.diff(F[0], vars[2]) - sp.diff(F[2], vars[0])
    k = sp.diff(F[1], vars[0]) - sp.diff(F[0], vars[1])
    return [i, j, k]

# 執行計算
div_F = divergence(F, [x, y, z])
curl_F = curl(F, [x, y, z])

print(f"向量場 F: {F}")
print(f"散度 div F: {div_F}")
print(f"旋度 curl F: {curl_F}")

# 4. 向量場視覺化 (Vector Field Visualization)
import matplotlib.pyplot as plt
import numpy as np

def visualize_field():
    x_v, y_v = np.meshgrid(np.linspace(-2, 2, 10), np.linspace(-2, 2, 10))
    # 以 F = <-y, x> 為例（旋轉場）
    u = -y_v
    v = x_v
    
    plt.figure(figsize=(6, 6))
    plt.quiver(x_v, y_v, u, v, color='blue')
    plt.title("Visualization of Vector Field $\mathbf{F} = \\langle -y, x \\rangle$")
    plt.xlabel("x")
    plt.ylabel("y")
    plt.grid(True)
    plt.show()

visualize_field()

# 5. 驗證 div(curl F) = 0
curl_F_res = curl(F, [x, y, z])
div_curl_F = divergence(curl_F_res, [x, y, z])
print(f"驗證 div(curl F) = {sp.simplify(div_curl_F)}")
```

---

## 三、 本週知識點回顧 (KP)
- **KP15.1**: 學會計算旋度 $\nabla \times \mathbf{F}$ 並理解其旋轉意義。
- **KP15.2**: 學會計算散度 $\nabla \cdot \mathbf{F}$ 並理解其源匯意義。
- **KP15.3**: 熟記 $\text{curl}(\nabla f) = \mathbf{0}$ 及其在保守場判定的應用。
- **KP15.4**: 熟記 $\text{div}(\text{curl } \mathbf{F}) = 0$。
- **KP15.5**: 靈活運用 $\nabla$ 算子的運算性質。

---

## 四、 課後測驗題庫 (Quiz) - 30 題

### 1. 單選題 (10 題)
1. 旋度 $\nabla \times \mathbf{F}$ 的結果是一個？ (A) 純量 (B) 向量 (C) 矩陣 (D) 常數
2. 若 $\text{div } \mathbf{F} > 0$，則該點被稱為？ (A) 匯 (B) 源 (C) 旋渦 (D) 節點
3. 下列哪個恆等式恆成立？ (A) $\nabla \cdot (\nabla f) = 0$ (B) $\nabla \times (\nabla f) = \mathbf{0}$ (C) $\nabla \cdot \mathbf{F} = \nabla \times \mathbf{F}$ (D) $\nabla^2 \mathbf{F} = 0$
4. 散度 $\nabla \cdot \mathbf{F}$ 的結果是一個？ (A) 純量 (B) 向量 (C) 矩陣 (D) 座標
5. 向量場 $\mathbf{F} = \langle y, z, x \rangle$ 的散度為？ (A) $0$ (B) $3$ (C) $x+y+z$ (D) $1$
6. 拉普拉斯算子 $\nabla^2$ 作用於純量函數得到？ (A) 向量 (B) 純量 (C) 旋度 (D) 梯度
7. 若 $\text{curl } \mathbf{F} = \mathbf{0}$，則 $\mathbf{F}$ 可能是？ (A) 旋轉場 (B) 梯度場 (C) 無源場 (D) 恆等場
8. $\text{div}(\text{curl } \mathbf{F})$ 等於？ (A) $\nabla^2 \mathbf{F}$ (B) $0$ (C) $\mathbf{F}$ (D) $\text{curl}(\text{div } \mathbf{F})$
9. 在 Maxwell 方程組中，$\nabla \cdot \mathbf{B} = 0$ 表示？ (A) 電荷守恆 (B) 無磁單極子 (C) 磁場由電流產生 (D) 電場隨時間變化
10. 若 $\mathbf{F} = \langle -y, x, 0 \rangle$，其旋度在原點的方向為？ (A) $x$ 軸 (B) $y$ 軸 (C) $z$ 軸 (D) 無方向

### 2. 多選題 (10 題)
11. 下列哪些關於旋度的敘述是正確的？ (A) 僅定義於三維空間 (B) 其大小代表旋轉強度 (C) 方程 $\text{curl } \mathbf{F} = \mathbf{0}$ 意指無旋 (D) 它是一個線性算子
12. 哪些場是無散場 ($\text{div } \mathbf{F} = 0$)？ (A) $\langle y, z, x \rangle$ (B) $\langle -y, x, 0 \rangle$ (C) $\langle x, y, z \rangle$ (D) $\langle e^y, e^z, e^x \rangle$
13. 下列哪些算子作用後結果為向量？ (A) $\text{grad } f$ (B) $\text{div } \mathbf{F}$ (C) $\text{curl } \mathbf{F}$ (D) $\nabla^2 f$
14. 若 $\mathbf{F} = \nabla f$，則下列哪些正確？ (A) $\mathbf{F}$ 是保守場 (B) $\int_C \mathbf{F} \cdot d\mathbf{r}$ 路徑無關 (C) $\text{curl } \mathbf{F} = \mathbf{0}$ (D) $\text{div } \mathbf{F} = \nabla^2 f$
15. 關於 $\nabla$ 算子的描述，正確的有： (A) 它是一個微分向量算子 (B) $\nabla = \langle \partial_x, \partial_y, \partial_z \rangle$ (C) 它服從乘積法則 (D) 它不滿足交換律
16. 下列哪些場在全空間均為無旋場？ (A) 重力場 (B) 靜電場 (C) 均勻流場 (D) 剛體旋轉流場
17. $\text{div}(f\mathbf{F}) =$ 哪些項的和？ (A) $f(\text{div } \mathbf{F})$ (B) $\mathbf{F} \cdot (\text{grad } f)$ (C) $f(\text{curl } \mathbf{F})$ (D) $\text{grad}(f\mathbf{F})$
18. 剛體以角速度 $\boldsymbol{\omega}$ 旋轉，速度場 $\mathbf{v} = \boldsymbol{\omega} \times \mathbf{r}$，則： (A) $\text{curl } \mathbf{v} = 2\boldsymbol{\omega}$ (B) $\text{div } \mathbf{v} = 0$ (C) 它是無旋場 (D) 它是無散場
19. 哪些場的散度處處為 1？ (A) $\langle x, 0, 0 \rangle$ (B) $\langle x/3, y/3, z/3 \rangle$ (C) $\langle x, y, z \rangle$ (D) $\langle 0, y, 0 \rangle$
20. 若 $f$ 滿足 $\nabla^2 f = 0$，則 $f$ 稱為： (A) 調和函數 (B) 位能函數 (C) 拉普拉斯函數 (D) 保守函數

### 3. 填充題 (10 題)
21. $\text{div } \langle x, y, z \rangle = \underline{\quad\quad}$。
22. $\text{curl } \langle y, x, 0 \rangle = \underline{\quad\quad}$。
23. 若 $\text{div } \mathbf{F} = 0$，稱 $\mathbf{F}$ 為 $\underline{\quad\quad}$ 場。
24. 計算旋度使用的行列式第一列為 $\underline{\quad\quad}$。
25. 拉普拉斯算子的符號為 $\nabla^2$ 或 $\underline{\quad\quad}$。
26. $\text{curl}(\text{grad } f)$ 的結果是 $\underline{\quad\quad}$ 向量。
27. $\nabla \cdot (f\mathbf{F}) = f(\nabla \cdot \mathbf{F}) + \underline{\quad\quad}$。
28. 二維向量場 $\mathbf{F} = \langle P, Q \rangle$ 的旋度僅有 $\underline{\quad\quad}$ 分量。
29. 若向量場的散度在某區間恆為正，代表該區間有流體 $\underline{\quad\quad}$。
30. $\text{div}(\text{curl } \mathbf{F}) = \underline{\quad\quad}$。

---

## 五、 Q 矩陣 (Q-matrix)

| 題號 | KP15.1 | KP15.2 | KP15.3 | KP15.4 | KP15.5 | |
|---|---|---|---|---|---|
| Q1 | 1 | 0 | 0 | 0 | 0 |
| Q2 | 0 | 1 | 0 | 0 | 0 |
| Q3 | 0 | 0 | 1 | 0 | 0 |
| Q4 | 0 | 1 | 0 | 0 | 0 |
| Q5 | 0 | 1 | 0 | 0 | 0 |
| Q6 | 0 | 0 | 0 | 1 | 0 |
| Q7 | 0 | 0 | 1 | 0 | 0 |
| Q8 | 0 | 0 | 0 | 1 | 0 |
| Q9 | 0 | 1 | 0 | 0 | 0 |
| Q10| 1 | 0 | 0 | 0 | 0 |
| Q11| 1 | 0 | 0 | 0 | 0 |
| Q12| 0 | 1 | 0 | 0 | 0 |
| Q13| 0 | 0 | 0 | 0 | 1 |
| Q14| 0 | 0 | 1 | 0 | 0 |
| Q15| 0 | 0 | 0 | 0 | 1 |
| Q16| 0 | 0 | 1 | 0 | 0 |
| Q17| 0 | 0 | 0 | 0 | 1 |
| Q18| 0 | 0 | 0 | 0 | 1 |
| Q19| 0 | 1 | 0 | 0 | 0 |
| Q20| 0 | 0 | 0 | 1 | 0 |
| Q21| 0 | 1 | 0 | 0 | 0 |
| Q22| 1 | 0 | 0 | 0 | 0 |
| Q23| 0 | 1 | 0 | 0 | 0 |
| Q24| 1 | 0 | 0 | 0 | 0 |
| Q25| 0 | 0 | 0 | 1 | 0 |
| Q26| 0 | 0 | 1 | 0 | 0 |
| Q27| 0 | 0 | 0 | 0 | 1 |
| Q28| 1 | 0 | 0 | 0 | 0 |
| Q29| 0 | 1 | 0 | 0 | 0 |
| Q30| 0 | 0 | 0 | 1 | 0 |

