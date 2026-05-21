# 課程：微積分中 - 第 15 週 - 偏導數 (Partial Derivatives)

本週我們將探討多元函數的變化率。與單變數不同，多元函數可以沿著多個方向變化。最基本且最重要的變化率是沿著坐標軸方向的變化，這就是**偏導數 (Partial Derivatives)**。我們將學習其幾何意義、計算技巧，以及高階導數中一個有趣的對稱性質——克萊羅定理。本週內容對應 **Stewart Calculus (Metric Edition) Chapter 14 Section 14.3**。

---

## 一、 單元講解 (Lecture) - 總計 100 分鐘

### 1. 偏導數的定義與幾何意義 (20 min) (KP15.1)
*   **概念講解**：
    對於 $f(x, y)$，其對 $x$ 的偏導數定義為：
    $$f_x(x, y) = \lim_{h \to 0} \frac{f(x+h, y) - f(x, y)}{h}$$
    這代表**將 $y$ 視為常數**，觀察 $f$ 隨 $x$ 的變化。
*   **幾何意義**：
    $f_x(a, b)$ 是曲面 $z=f(x, y)$ 被平面 $y=b$ 所截得的曲線在點 $(a, b, f(a, b))$ 處的切線斜率。
*   **練習題與解答**：
    *   **練習題 15.1.1**：若 $f(x, y) = x^3 + x^2y^3 - 2y^2$，求 $f_x(2, 1)$。
    *   **解答**：
        1. 對 $x$ 微分，將 $y$ 視為常數：$f_x = 3x^2 + 2xy^3 - 0$。
        2. 代入 $(2, 1)$：$f_x(2, 1) = 3(2^2) + 2(2)(1^3) = 12 + 4 = 16$。

---

### 2. 計算法則與記號 (20 min) (KP15.2)
*   **概念講解**：
    - **記號**：$f_x, \frac{\partial f}{\partial x}, \frac{\partial z}{\partial x}$。注意使用 $\partial$ 而非 $d$。
    - **法則**：單變數的連鎖律、乘積律、商律在偏微分中完全適用，只要牢記「對誰微，誰就是變數；其餘皆常數」。
*   **練習題與解答**：
    *   **練習題 15.2.1**：求 $f(x, y) = \sin\left(\frac{x}{1+y}\right)$ 的偏導數 $f_x$ 與 $f_y$。
    *   **解答**：
        1. $f_x = \cos\left(\frac{x}{1+y}\right) \cdot \frac{\partial}{\partial x}\left(\frac{x}{1+y}\right) = \cos\left(\frac{x}{1+y}\right) \cdot \frac{1}{1+y}$。
        2. $f_y = \cos\left(\frac{x}{1+y}\right) \cdot \frac{\partial}{\partial y}\left(x(1+y)^{-1}\right) = \cos\left(\frac{x}{1+y}\right) \cdot (-x(1+y)^{-2}) = -\frac{x \cos(x/(1+y))}{(1+y)^2}$。

---

### 3. 高階偏導數與克萊羅定理 (20 min) (KP15.3)
*   **概念講解**：
    - **二階偏導**：$f_{xx}, f_{yy}, f_{xy}, f_{yx}$。
    - **混合偏導 (Mixed Partials)**：$f_{xy} = \frac{\partial}{\partial y}(\frac{\partial f}{\partial x})$，即先對 $x$ 微再對 $y$ 微。
*   **克萊羅定理 (Clairaut's Theorem)**：
    若 $f$ 在包含 $(a, b)$ 的區域內定義，且 $f_{xy}$ 與 $f_{yx}$ 均為**連續**，則：
    $$f_{xy}(a, b) = f_{yx}(a, b)$$
*   **練習題與解答**：
    *   **練習題 15.3.1**：驗證 $f(x, y) = e^x \sin y$ 的混合偏導數相等。
    *   **解答**：
        1. $f_x = e^x \sin y \Rightarrow f_{xy} = e^x \cos y$。
        2. $f_y = e^x \cos y \Rightarrow f_{yx} = e^x \cos y$。
        3. 兩者相等，驗證成功。

---

### 4. 偏微分方程簡介 (20 min) (KP15.4)
*   **概念講解**：
    許多物理現象由偏微分方程 (PDE) 描述：
    - **拉普拉斯方程 (Laplace's Eq)**：$\frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2} = 0$。滿足此方程的函數稱為**調和函數 (Harmonic Functions)**。
    - **波動方程 (Wave Eq)**：$\frac{\partial^2 u}{\partial t^2} = a^2 \frac{\partial^2 u}{\partial x^2}$。
*   **練習題與解答**：
    *   **練習題 15.4.1**：證明 $u(x, y) = \ln\sqrt{x^2+y^2}$ 滿足拉普拉斯方程（原點除外）。
    *   **解答**：
        1. $u = \frac{1}{2} \ln(x^2+y^2)$。
        2. $u_x = \frac{x}{x^2+y^2}$；$u_{xx} = \frac{(x^2+y^2) - x(2x)}{(x^2+y^2)^2} = \frac{y^2-x^2}{(x^2+y^2)^2}$。
        3. 由對稱性，$u_{yy} = \frac{x^2-y^2}{(x^2+y^2)^2}$。
        4. $u_{xx} + u_{yy} = \frac{y^2-x^2+x^2-y^2}{(x^2+y^2)^2} = 0$。證畢。

---

### 5. 隱函數微分 (20 min) (KP15.5)
*   **概念講解**：
    若方程式 $F(x, y, z) = k$ 定義了 $z$ 是 $x, y$ 的隱函數，則：
    $$\frac{\partial z}{\partial x} = -\frac{F_x}{F_z}, \quad \frac{\partial z}{\partial y} = -\frac{F_y}{F_z}$$
*   **推導概要**：對 $F(x, y, z) = k$ 兩邊對 $x$ 偏微分（利用多元連鎖律，下週詳述）：$F_x \cdot \frac{\partial x}{\partial x} + F_y \cdot \frac{\partial y}{\partial x} + F_z \cdot \frac{\partial z}{\partial x} = 0 \Rightarrow F_x + 0 + F_z \frac{\partial z}{\partial x} = 0$。
*   **練習題與解答**：
    *   **練習題 15.5.1**：若 $x^3 + y^3 + z^3 + 6xyz = 1$，求 $\frac{\partial z}{\partial x}$。
    *   **解答**：
        1. 令 $F(x, y, z) = x^3 + y^3 + z^3 + 6xyz - 1 = 0$。
        2. $F_x = 3x^2 + 6yz$。
        3. $F_z = 3z^2 + 6xy$。
        4. $\frac{\partial z}{\partial x} = -\frac{3x^2 + 6yz}{3z^2 + 6xy} = -\frac{x^2 + 2yz}{z^2 + 2xy}$。

---

## 二、 動手實作 (Lab) - 30 分鐘

### 實作：利用 SymPy 進行符號偏微分與調和函數驗證
我們將學習如何使用 Python 自動化繁瑣的偏微分計算。

```python
import sympy as sp

def symbolic_partial_derivatives():
    x, y = sp.symbols('x y')
    f = sp.exp(x) * sp.sin(y)

    # 計算偏導數
    fx = sp.diff(f, x)
    fy = sp.diff(f, y)
    fxy = sp.diff(fx, y)
    fyx = sp.diff(fy, x)

    print(f"函數: {f}")
    print(f"df/dx: {fx}")
    print(f"df/dy: {fy}")
    print(f"df/dxdy: {fxy}")
    print(f"df/dydx: {fyx}")
    print(f"克萊羅定理成立 (fxy == fyx): {fxy == fyx}")

    # 驗證拉普拉斯方程
    u = sp.atan2(y, x) # u = arctan(y/x)
    laplacian = sp.diff(u, x, 2) + sp.diff(u, y, 2)
    print(f"\nu = arctan(y/x) 的拉普拉斯算子結果: {sp.simplify(laplacian)}")

if __name__ == "__main__":
    symbolic_partial_derivatives()
```

---

## 三、 本週知識點回顧 (KP)
- **KP15.1**: 牢記偏導數是「凍結其餘變數」後的變化率。
- **KP15.2**: 熟練掌握複合函數（如 $\sin(x/y)$）的偏微分技巧。
- **KP15.3**: 理解混合偏導相等的前提是二階導數必須連續。
- **KP15.4**: 了解調和函數滿足 $u_{xx} + u_{yy} = 0$。
- **KP15.5**: 掌握隱函數微分公式 $\frac{\partial z}{\partial x} = -F_x/F_z$。

---

## 四、 課後測驗題庫 (Quiz)

### 1. 單選題 (Single Choice)
1. **Q1**: $f(x, y) = xy^2$，則 $f_x(1, 2)$ 等於？
   - (A) 1 (B) 2 (C) 4 (D) 0
2. **Q2**: 下列何者代表 $f$ 先對 $y$ 微分再對 $x$ 微分的記號？
   - (A) $f_{xy}$ (B) $f_{yx}$ (C) $\frac{\partial^2 f}{\partial y \partial x}$ (D) $\frac{\partial^2 f}{\partial x^2}$
3. **Q3**: 若 $u = e^{x^2+y^2}$，則 $u_x$ 為？
   - (A) $e^{x^2+y^2}$ (B) $2xe^{x^2+y^2}$ (C) $2ye^{x^2+y^2}$ (D) $2x$
4. **Q4**: 關於克萊羅定理，若 $f_{xy} \neq f_{yx}$，則代表？
   - (A) 計算錯誤 (B) 函數不連續 (C) 二階偏導數在該點不連續 (D) 函數不是多項式
5. **Q5**: 拉普拉斯方程 $\Delta u = 0$ 在二維中是指？
   - (A) $u_x + u_y = 0$ (B) $u_{xx} + u_{yy} = 0$ (C) $u_{xy} = 0$ (D) $u_x u_y = 0$
6. **Q6**: $f(x, y) = x^y$，求 $f_x$。
   - (A) $yx^{y-1}$ (B) $x^y \ln x$ (C) $y \ln x$ (D) $x^y/y$
7. **Q7**: 隱函數 $x^2 + y^2 + z^2 = 1$ 的 $\partial z / \partial x$ 為？
   - (A) $-x/z$ (B) $-y/z$ (C) $x/z$ (D) $-x/y$
8. **Q8**: 若 $f(x, y)$ 是 $x$ 的三次多項式，$y$ 的二次多項式，則 $f_{xxx}$ 是？
   - (A) 0 (B) 常數 (C) 關於 $y$ 的函數 (D) 關於 $x$ 的函數
9. **Q9**: $f(x, y) = \sin x \cos y$，則 $f_{xy}$ 等於？
   - (A) $\cos x \sin y$ (B) $-\cos x \sin y$ (C) $\sin x \cos y$ (D) $-\sin x \sin y$
10. **Q10**: 偏導數 $f_y(a, b)$ 在幾何上代表什麼平面的切線斜率？
    - (A) $y=b$ (B) $x=a$ (C) $z=0$ (D) $x+y=a+b$

### 2. 多選題 (Multiple Choice)
11. **Q11**: 下列哪些函數滿足拉普拉斯方程 $u_{xx} + u_{yy} = 0$？
    - (A) $u = x^2 - y^2$ (B) $u = xy$ (C) $u = e^x \cos y$ (D) $u = \sin x \sin y$
12. **Q12**: 對於 $f(x, y, z)$，三階偏導 $f_{xyz}$ 等價於？（假設連續）
    - (A) $f_{zyx}$ (B) $f_{xzy}$ (C) $f_{yxz}$ (D) $f_{zxy}$
13. **Q13**: 關於偏導數的敘述，正確的有？
    - (A) 偏導數存在不代表函數連續 (B) 偏導數描述沿軸向的斜率 (C) 計算 $f_x$ 時必須將 $y$ 視為常數 (D) 偏導數記號必須用 $\partial$
14. **Q14**: 若 $f(x, y) = \sqrt{x^2+y^2}$，在 $(0, 0)$ 處：
    - (A) $f_x$ 存在 (B) $f_x$ 不存在 (C) 函數連續 (D) 函數不連續
15. **Q15**: 隱函數微分 $\frac{\partial z}{\partial x} = -F_x/F_z$ 要求：
    - (A) $F$ 可微 (B) $F_z \neq 0$ (C) $F = 0$ (D) $z$ 必須能寫成解析式

### 3. 填充題 (Fill-in-the-blank)
16. **Q16**: $f(x, y) = x^2 y + y^3$，則 $f_{yy} = $ __________。
17. **Q17**: 波動方程 $\frac{\partial^2 u}{\partial t^2} = a^2 \frac{\partial^2 u}{\partial x^2}$ 中，$a$ 代表波的 __________。
18. **Q18**: 若 $f_x = 2x+y$ 且 $f_y = x+2y$，則 $f_{xy} = $ __________。
19. **Q19**: $f(x, y) = e^{xy}$，則 $f_{xy}(0, 1) = $ __________。
20. **Q20**: 調和函數在物理上常用於描述 __________ 狀態下的溫度分佈。
21. **Q21**: $\frac{\partial}{\partial y}(\ln x) = $ __________。
22. **Q22**: 對於 $z = f(x, y)$，其全微分 $dz$ 與偏導數的關係為 $dz = f_x dx + $ __________。
23. **Q23**: 若 $f_{xy}$ 連續，則 $f_{xy} - f_{yx} = $ __________。
24. **Q24**: $f(x, y) = \cos(x^2 y)$，則 $f_x = $ __________。
25. **Q25**: 理想氣體定律 $PV = nRT$，若 $n, R$ 為常數，則 $\frac{\partial P}{\partial V} = $ __________。
26. **Q26**: 三元函數 $f(x, y, z)$ 共有 __________ 個一階偏導數。
27. **Q27**: $f(x, y) = \tan^{-1}(y/x)$ 的 $f_x = $ __________。
28. **Q28**: 偏微分中的「偏」字（Partial）強調了只對 __________ 個變數求導。
29. **Q29**: 二階偏導 $f_{xx}$ 的萊布尼茲記號為 __________。
30. **Q30**: 隱函數 $z + \ln z = x + y$ 中，$\frac{\partial z}{\partial y} = $ __________。

---

## 五、 Q 矩陣 (Q-matrix)

| 題號 | KP15.1 | KP15.2 | KP15.3 | KP15.4 | KP15.5 |
|---|---|---|---|---|---|
| Q1-Q5 | 1,0,0,0,0 | 0,1,1,0,0 | 0,1,0,0,0 | 0,0,1,1,0 | 0,0,0,1,0 |
| Q6-Q10 | 1,1,0,0,0 | 0,0,0,0,1 | 0,1,0,0,0 | 0,0,1,0,0 | 1,0,0,0,0 |
| Q11-Q30| ... | ... | ... | ... | ... |
