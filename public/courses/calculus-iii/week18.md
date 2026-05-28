# 課程：微積分下 - 第 18 週 - 期末總複習與題庫 (Final Exam Review & Item Bank)

本文件為微積分（下）學期的期末總結，涵蓋了從多變數函數、偏導數、多重積分到向量微積分的全學期核心知識點。本週不引入新觀念，重點在於建立系統性的數學架構與解題技巧。

---

## 一、 全學期知識地圖 (Course Map)

### 1. 多變數函數與偏導數 (W1-W5)
*   **極限與連續**：掌握 $x, y$ 同時趨近的判定。
*   **偏導數與全微分**：線性逼近與切平面。
*   **連鎖律**：樹狀圖法處理複雜依賴關係。
*   **方向導數與梯度**：梯度向量指向函數增長最快的方向。
*   **極值問題**：二階導數判別法與 Lagrange 乘數法。

### 2. 多重積分 (W6-W10)
*   **二重積分**：矩形區域與一般區域的積分順序交換（Fubini 定理）。
*   **極座標轉換**：處理圓對稱區域。
*   **三重積分**：直角座標、柱座標（$\rho, \theta, z$）與球面座標（$\rho, \phi, \theta$）。
*   **變數代換 (Jacobian)**：$\iint f dA = \iint f |J| du dv$。

### 3. 向量微積分 (W11-W17)
*   **向量場與線積分**：做功、純量線積分（質量）。
*   **線積分基本定理**：保守場與位能函數。
*   **Green 定理**：2D 旋度與面積計算。
*   **旋度與散度**：無旋場與無散場的判定與物理意義。
*   **面積分與通量**：參數曲面、曲面積。
*   **Stokes 定理**：3D 旋度通量。
*   **散度定理**：體積積分與邊界通量的轉化。

---

## 二、 核心定理綜合練習 (Step-by-Step Exercises)

### 例題 1：Lagrange 乘數法
求 $f(x, y) = xy$ 在約束條件 $x^2 + y^2 = 8$ 下的最大值。
*   **解**：
    1.  建立方程組：$\nabla f = \lambda \nabla g \implies \langle y, x \rangle = \lambda \langle 2x, 2y \rangle$。
    2.  解得 $y = 2\lambda x$ 且 $x = 2\lambda y \implies y = 4\lambda^2 y$。
    3.  若 $y \neq 0$，則 $4\lambda^2 = 1 \implies \lambda = \pm 1/2$。
    4.  代入得 $x^2 = y^2$。代入約束條件 $2x^2 = 8 \implies x = \pm 2$。
    5.  可能點：$(2,2), (-2,-2), (2,-2), (-2,2)$。
    6.  最大值為 $f(2,2) = f(-2,-2) = 4$。

### 例題 2：散度定理
求 $\mathbf{F} = \langle z^2 x, \frac{1}{3}y^3 + \tan z, x^2 z + y^2 \rangle$ 穿過單位球面 $S$ 的向外通量。
*   **解**：
    1.  計算 $\text{div } \mathbf{F} = \partial_x(z^2 x) + \partial_y(\frac{1}{3}y^3 + \tan z) + \partial_z(x^2 z + y^2) = z^2 + y^2 + x^2$。
    2.  由散度定理，通量 $= \iiint_E (x^2+y^2+z^2) dV$。
    3.  轉球面座標：$\int_0^{2\pi} \int_0^\pi \int_0^1 (\rho^2) \rho^2 \sin\phi d\rho d\phi d\theta$。
    4.  $= 2\pi \cdot [-\cos\phi]_0^\pi \cdot [\frac{1}{5}\rho^5]_0^1 = 2\pi \cdot 2 \cdot \frac{1}{5} = \frac{4\pi}{5}$。

---

## 三、 Python 實驗室：期末視覺化挑戰
**任務目標**：繪製一組向量場，並同時展示其旋度向量與散度雲圖。

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-2, 2, 20)
y = np.linspace(-2, 2, 20)
X, Y = np.meshgrid(x, y)

# 向量場 F = <sin(x), cos(y)>
U = np.sin(X)
V = np.cos(Y)

# 計算散度 div F = cos(x) - sin(y)
div = np.cos(X) - np.sin(Y)

plt.figure(figsize=(8, 6))
# 繪製散度背景圖
cp = plt.contourf(X, Y, div, cmap='RdBu_r', alpha=0.6)
plt.colorbar(cp, label='Divergence')
# 繪製向量場
plt.quiver(X, Y, U, V, color='black')
plt.title("Vector Field and Divergence Map")
plt.show()
```

---

## 四、 期末考試題庫 (Final Exam Item Bank) - 50 題

### 1. 單選題 (20 題)
1.  若 $f(x,y) = \frac{xy}{x^2+y^2}$，在 $(0,0)$ 處的極限？ (A) $0$ (B) $1$ (C) 不存在 (D) $1/2$
2.  $\nabla f$ 與 $f$ 的等位線（Level Curve）？ (A) 平行 (B) 垂直 (C) 夾角 45 度 (D) 無關
3.  二重積分中 $dA$ 在極座標下是？ (A) $dr d\theta$ (B) $r dr d\theta$ (C) $r^2 dr d\theta$ (D) $d\rho d\theta$
4.  若 $\text{curl } \mathbf{F} = \mathbf{0}$，則 $\oint_C \mathbf{F} \cdot d\mathbf{r} =$？ (A) 面積 (B) 體積 (C) $0$ (D) $2\pi$
5.  哪種座標系最適合計算球體一部分的體積？ (A) 直角 (B) 柱 (C) 球面 (D) 參數
6.  Lagrange 乘數法中，$\lambda$ 的物理意義常與什麼相關？ (A) 速度 (B) 影子價格/靈敏度 (C) 功 (D) 密度
7.  $\text{div}(\text{curl } \mathbf{F})$ 恆等於？ (A) $0$ (B) $\nabla^2 \mathbf{F}$ (C) 1 (D) 無窮大
8.  Green 定理中的被積函數 $Q_x - P_y$ 代表？ (A) 散度 (B) 2D 旋度的 $z$ 分量 (C) 梯度 (D) 切向加速度
9.  若 $\mathbf{F} = \langle 2, 3, 4 \rangle$，其散度為？ (A) 9 (B) 0 (C) 24 (D) 向量
10. 曲面 $z = \sqrt{x^2+y^2}$ 是什麼形狀？ (A) 球 (B) 柱 (C) 錐 (D) 拋物面
11. 方向導數在梯度方向取？ (A) 最小值 (B) 最大值 (C) 0 (D) 平均值
12. 面積分 $\iint_S 1 dS$ 的結果是？ (A) 體積 (B) 曲面面積 (C) 通量 (D) 長度
13. 哪一個定理將三重積分轉為面積分？ (A) Stokes (B) Green (C) 散度定理 (D) FTC
14. 若 $P_y = Q_x$，則場是？ (A) 保守的 (B) 旋轉的 (C) 無源的 (D) 發散的
15. 重力場是哪種場？ (A) 旋轉場 (B) 保守場 (C) 非梯度場 (D) 無界場
16. 三重積分在柱座標下 $dV = $？ (A) $r dr d\theta dz$ (B) $\rho^2 \sin\phi d\rho d\phi d\theta$ (C) $dx dy dz$ (D) $r dz dr d\theta$
17. $\oint_C x dy$ 的幾何意義是？ (A) 長度 (B) 面積 (C) 功 (D) 流量
18. 莫比烏斯帶具有幾個面？ (A) 1 (B) 2 (C) 0 (D) 無數個
19. 若 $f$ 滿足 $\Delta f = 0$，則稱其為？ (A) 調和函數 (B) 解析函數 (C) 奇異函數 (D) 保守函數
20. 斯托克斯定理（Stokes' Theorem）的核心是？ (A) 散度 (B) 旋度 (C) 梯度 (D) 全微分

### 2. 多選題 (15 題)
21. 哪些場是無旋場？ (A) $\langle x, y, z \rangle$ (B) $\langle y, x, 0 \rangle$ (C) $\langle -y, x, 0 \rangle$ (D) $\langle 1, 2, 3 \rangle$
22. 多重積分可以用來求： (A) 面積 (B) 體積 (C) 質量 (D) 質心
23. 關於梯度的敘述，正確的有： (A) 指向增長最快方向 (B) 大小等於方向導數的最大值 (C) 垂直於等位面 (D) 是一個標量
24. 散度定理的條件包括： (A) 封閉曲面 (B) 區域有洞 (C) 場具連續偏導 (D) 法向量向外
25. 下列哪些是向量恆等式？ (A) $\nabla \times (\nabla f) = 0$ (B) $\nabla \cdot (\nabla \times \mathbf{F}) = 0$ (C) $\nabla \cdot (\nabla f) = \nabla^2 f$ (D) $\nabla \times \mathbf{F} = \mathbf{F} \times \nabla$
26. 哪些座標變換的 Jacobian $|J|$ 正確？ (A) 極座標 $r$ (B) 球面座標 $\rho^2 \sin\phi$ (C) 柱座標 $r$ (D) 線性變換 $\text{det}(A)$
27. 關於線積分，哪些正確？ (A) $\int_C \mathbf{F} \cdot d\mathbf{r}$ 代表功 (B) $\int_C f ds$ 與方向無關 (C) 保守場的閉路徑積分為 0 (D) 單位是牛頓
28. 哪些函數在 $(0,0)$ 連續？ (A) $x+y$ (B) $x^2+y^2$ (C) $xy/(x^2+y^2)$ (D) $\sin(x^2+y^2)$
29. 曲面的表示法有： (A) 參數式 $\mathbf{r}(u,v)$ (B) 顯函數 $z=f(x,y)$ (C) 隱函數 $F(x,y,z)=0$ (D) 極座標 $r = \theta$
30. 積分定理的共同點： (A) 降維 (B) 邊界與內部的聯繫 (C) 必須是線性場 (D) 與物理守恆律相關
31. 哪些場是無散場？ (A) 剛體旋轉流場 (B) 磁場 (C) 均勻流場 (D) 點電荷電場（原點外）
32. 拉格朗日乘數法可用於： (A) 約束極值 (B) 求切平面 (C) 經濟學最優化 (D) 無約束極值
33. 關於二階偏導數 $f_{xy}$ 與 $f_{yx}$： (A) 通常相等 (B) 若函數連續則相等 (C) 總是不相等 (D) 稱為混合偏導
34. 面積分的應用包括： (A) 通量 (B) 殼層質量 (C) 表面壓力 (D) 曲線長度
35. 向量場的視覺化工具包括： (A) 向量箭頭圖 (B) 流線 (C) 等位面 (D) 散度雲圖

### 3. 填充題 (15 題)
36. 若 $\mathbf{F} = \nabla f$，則 $\int_C \mathbf{F} \cdot d\mathbf{r} = f(B) - \underline{\quad\quad}$。
37. 半徑為 $a$ 的球體積為 $\underline{\quad\quad}$。
38. $\text{div } \langle x^2, y^2, z^2 \rangle$ 在 $(1,1,1)$ 的值為 $\underline{\quad\quad}$。
39. 二維 Green 定理中，$Q_x - P_y$ 被稱為區域 $D$ 上的 $\underline{\quad\quad}$。
40. 球面座標中 $\phi$ 的取值範圍是 $\underline{\quad\quad}$。
41. 若 $\mathbf{F} = \langle -y, x \rangle$，則沿單位圓逆時針旋轉一圈的功為 $\underline{\quad\quad}$。
42. 曲面 $z = x^2+y^2$ 在點 $(1,1,2)$ 的法向量可取為 $\underline{\quad\quad}$。
43. 雅可比行列式的符號為 $\underline{\quad\quad}$。
44. 在保守場中，勢函數 $f$ 加上任何 $\underline{\quad\quad}$ 仍為位能函數。
45. 散度定理中，閉曲面面積分等於內部 $\underline{\quad\quad}$ 的三重積分。
46. $\iint_D 1 dA$ 的結果等於區域 $D$ 的 $\underline{\quad\quad}$。
47. Stokes 定理將 $\underline{\quad\quad}$ 積分與 $\underline{\quad\quad}$ 積分聯繫起來。
48. $\nabla f$ 的方向代表函數 $\underline{\quad\quad}$ 最快的方向。
49. 若 $\nabla^2 f = 0$，則 $\iint_S \nabla f \cdot d\mathbf{S} = \underline{\quad\quad}$。
50. 本學期微積分的主要核心是從「數」的微積分跨越到「$\underline{\quad\quad}$」的微積分。

---

## 知識點依賴地圖 (KP Dependency Map)

| 核心起點 | 延伸應用 | 關鍵連結點 |
|---|---|---|
| **KP1.1-1.5** (向量基礎) | **KP5.1-5.5** (偏導數/梯度) | 內積與外積是理解梯度 (5.4) 與定向導數的幾何支柱 |
| **KP3.1-3.4** (向量函數) | **KP15-17** (向量微積分定理) | 線積分 (15.1) 的路徑參數化依賴於向量函數 (3.1) 的定義 |
| **KP10-14** (多重積分) | **KP16-17** (面積分/散度定理) | 三重積分的座標變換 (14.5) 是計算體積通量的核心計算引擎 |
| **Green / Stokes / Divergence** | **全學期綜合應用** | 三大定理建立了邊界積分與區域積分之間的終極聯繫 |

---

## 五、 Q 矩陣 (Q-matrix)

| 題號 | KP涵蓋 KP 範圍 | |
|---|---|---|---|---|---|
| Q1 | 0 | 0 | 0 | 0 | 0 |
| Q2 | 0 | 0 | 0 | 0 | 0 |
| Q3 | 0 | 0 | 0 | 0 | 0 |
| Q4 | 0 | 0 | 0 | 0 | 0 |
| Q5 | 0 | 0 | 0 | 0 | 0 |
| Q6 | 0 | 0 | 0 | 0 | 0 |
| Q7 | 0 | 0 | 0 | 0 | 0 |
| Q8 | 0 | 0 | 0 | 0 | 0 |
| Q9 | 0 | 0 | 0 | 0 | 0 |
| Q10| 0 | 0 | 0 | 0 | 0 |
| Q11| 0 | 0 | 0 | 0 | 0 |
| Q12| 0 | 0 | 0 | 0 | 0 |
| Q13| 0 | 0 | 0 | 0 | 0 |
| Q14| 0 | 0 | 0 | 0 | 0 |
| Q15| 0 | 0 | 0 | 0 | 0 |
| Q16| 0 | 0 | 0 | 0 | 0 |
| Q17| 0 | 0 | 0 | 0 | 0 |
| Q18| 0 | 0 | 0 | 0 | 0 |
| Q19| 0 | 0 | 0 | 0 | 0 |
| Q20| 0 | 0 | 0 | 0 | 0 |
| Q21| 0 | 0 | 0 | 0 | 0 |
| Q22| 0 | 0 | 0 | 0 | 0 |
| Q23| 0 | 0 | 0 | 0 | 0 |
| Q24| 0 | 0 | 0 | 0 | 0 |
| Q25| 0 | 0 | 0 | 0 | 0 |
| Q26| 0 | 0 | 0 | 0 | 0 |
| Q27| 0 | 0 | 0 | 0 | 0 |
| Q28| 0 | 0 | 0 | 0 | 0 |
| Q29| 0 | 0 | 0 | 0 | 0 |
| Q30| 0 | 0 | 0 | 0 | 0 |

