# 課程：微積分下 - 第 4 週 - 空間中的運動學 (Motion in Space)

本文件包含了第 4 週完整的教學大綱、實作指南以及擴充版練習題庫。本週重點在於利用向量微積分分析質點在空間中的運動，包括速度、加速度的分解以及 Frenet-Serret 基底的應用。
本週教學內容對應 **Stewart Calculus Ch 13.4** 的核心內容。

---

## 一、 單元講解 (Lecture) - 總計 100 分鐘

### 1. 速度、速率與加速度 (20 min) (KP4.1)
*   **概念講解**：
    設 $\mathbf{r}(t)$ 為質點在空間中的位置向量。
    *   **速度向量 (Velocity)**：$\mathbf{v}(t) = \mathbf{r}'(t)$。其方向為運動的切線方向。
    *   **速率 (Speed)**：$v(t) = |\mathbf{v}(t)| = |\mathbf{r}'(t)| = \frac{ds}{dt}$。是一個標量。
    *   **加速度向量 (Acceleration)**：$\mathbf{a}(t) = \mathbf{v}'(t) = \mathbf{r}''(t)$。
*   **練習題**：
    *   **練習題 4.1.1**：若質點位置為 $\mathbf{r}(t) = \langle t^2, \sin t, \cos t \rangle$，求 $t=0$ 時的速度與加速度。
    *   **解答**：
        1. $\mathbf{v}(t) = \langle 2t, \cos t, -\sin t \rangle \implies \mathbf{v}(0) = \langle 0, 1, 0 \rangle$。
        2. $\mathbf{a}(t) = \langle 2, -\sin t, -\cos t \rangle \implies \mathbf{a}(0) = \langle 2, 0, -1 \rangle$。

---

### 2. 加速度的切線與法線分量 (20 min) (KP4.2)
*   **概念講解**：
    加速度 $\mathbf{a}$ 可以分解為沿著前進方向（切線）與垂直前進方向（法線）的兩個分量：
    $$\mathbf{a} = a_T \mathbf{T} + a_N \mathbf{N}$$
    *   **切線加速度 $a_T$**：改變速率的大小。$a_T = v' = \frac{\mathbf{v} \cdot \mathbf{a}}{v}$。
    *   **法線加速度 $a_N$**：改變運動的方向。$a_N = \kappa v^2 = \frac{|\mathbf{v} \times \mathbf{a}|}{v}$。
*   **練習題**：
    *   **練習題 4.2.1**：對於速率恆定的運動（等速圓周運動），其切線加速度 $a_T$ 為多少？
    *   **解答**：
        因為速率 $v$ 為常數，其導數 $v' = 0$。故 $a_T = 0$。此時加速度完全由法線分量（向心加速度）組成。

---

### 3. TNB 基底與密切平面 (20 min) (KP4.3)
*   **概念講解**：
    在曲線上的每一點，我們可以定義三個互相垂直的單位向量：
    *   **單位切向量 $\mathbf{T} = \mathbf{v}/v$**。
    *   **單位法向量 $\mathbf{N} = \mathbf{T}'/|\mathbf{T}'|$**。
    *   **單位副法向量 $\mathbf{B} = \mathbf{T} \times \mathbf{N}$**。
    這三個向量構成了 **Frenet-Serret 標架**。
    *   **密切平面 (Osculating Plane)**：由 $\mathbf{T}$ 與 $\mathbf{N}$ 構成的平面，是曲線在該點「最貼近」的平面。其法向量為 $\mathbf{B}$。
*   **練習題**：
    *   **練習題 4.3.1**：已知 $\mathbf{T} = \langle 1, 0, 0 \rangle, \mathbf{N} = \langle 0, 1, 0 \rangle$，求 $\mathbf{B}$。
    *   **解答**：
        $\mathbf{B} = \mathbf{T} \times \mathbf{N} = \mathbf{i} \times \mathbf{j} = \mathbf{k} = \langle 0, 0, 1 \rangle$。

---

### 4. 空間中的拋體運動 (20 min) (KP4.4)
*   **數學推導**：推導在重力 $\mathbf{g} = \langle 0, 0, -g \rangle$ 下，初速為 $\mathbf{v}_0$ 的位置方程式。
    *   **推導**：
        1. $\mathbf{a}(t) = \langle 0, 0, -g \rangle$。
        2. 積分一次得速度：$\mathbf{v}(t) = \int \mathbf{a} dt = \langle 0, 0, -gt \rangle + \mathbf{v}_0$。
        3. 再積分一次得位置：$\mathbf{r}(t) = \int \mathbf{v} dt = \langle 0, 0, -\frac{1}{2}gt^2 \rangle + \mathbf{v}_0 t + \mathbf{r}_0$。
        這說明拋體在水平方向（$x, y$）做等速運動，在垂直方向（$z$）做等加速運動。
*   **練習題**：
    *   **練習題 4.4.1**：若初速 $\mathbf{v}_0 = \langle 3, 0, 4 \rangle$（單位 m/s），忽略空氣阻力，求 1 秒後的高度 $z$（設 $g=9.8, \mathbf{r}_0 = \mathbf{0}$）。
    *   **解答**：
        $z(1) = 4(1) - 0.5(9.8)(1^2) = 4 - 4.9 = -0.9$ (m)。

---

### 5. 克卜勒定律簡述 (20 min) (KP4.5)
*   **概念講解**：
    克卜勒定律描述了行星繞太陽的運動規律，可以透過向量微積分從牛頓萬有引力定律推導出來：
    1.  **軌道定律**：行星軌道是橢圓，太陽位於其中一個焦點。
    2.  **面積定律**：在相等時間內，行星與太陽連線掃過的面積相等（與角動量守恆有關）。
    3.  **週期定律**：週期平方與半長軸三次方成正比。

---

## 二、 動手實作 (Lab) - 總計 50 分鐘

### 實作：模擬拋體運動並分析加速度分解
**任務目標**：模擬一個 3D 拋體運動軌跡，並在軌跡上標註 $a_T$ 與 $a_N$。

```python
import matplotlib.pyplot as plt
import numpy as np

# 模擬參數
g = 9.8
v0 = np.array([5, 5, 20])
t = np.linspace(0, 4, 100)

# 位置計算
x = v0[0] * t
y = v0[1] * t
z = v0[2] * t - 0.5 * g * t**2

# 速度與加速度
v_t = np.array([np.full_like(t, v0[0]), np.full_like(t, v0[1]), v0[2] - g*t]).T
a_t = np.array([0, 0, -g])

# 計算 t=1 時的 a_T 與 a_N
idx = 25 # 對應 t=1 附近
v_1 = v_t[idx]
a_1 = a_t
speed_1 = np.linalg.norm(v_1)

a_T_val = np.dot(v_1, a_1) / speed_1
a_T_vec = (a_T_val / speed_1) * v_1
a_N_vec = a_1 - a_T_vec

print(f"在 t=1 時:")
print(f"切線加速度大小 a_T: {a_T_val:.2f}")
print(f"法線加速度大小 a_N: {np.linalg.norm(a_N_vec):.2f}")

# 繪圖
fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111, projection='3d')
ax.plot(x, y, z, label='Projectile Path')
ax.scatter(x[idx], y[idx], z[idx], color='red') # 當前位置
ax.quiver(x[idx], y[idx], z[idx], a_T_vec[0], a_T_vec[1], a_T_vec[2], color='blue', label='a_T')
ax.quiver(x[idx], y[idx], z[idx], a_N_vec[0], a_N_vec[1], a_N_vec[2], color='green', label='a_N')

ax.set_title("Decomposition of Acceleration")
ax.legend()
plt.show()
```

---

## 三、 本週知識點回顧 (KP)
- **KP4.1**: 速度、速率與加速度的向量定義與計算。
- **KP4.2**: 加速度的切線分量 $a_T$ 與法線分量 $a_N$ 的公式與物理意義。
- **KP4.3**: TNB 基底（Frenet 標架）與密切平面的幾何結構。
- **KP4.4**: 重力場下的 3D 拋體運動推導。
- **KP4.5**: 克卜勒定律在向量分析中的意義。

---

## 四、 課後測驗題庫 (Quiz) - 30 分鐘

### 1. 單選題 (Single Choice) - 共 10 題
1. **Q1**: 速率 $v(t)$ 是下列哪一項的長度？
   - (A) 位置向量 (B) 速度向量 (C) 加速度向量 (D) 法向量
2. **Q2**: 若加速度恆垂直於速度，則速率：
   - (A) 增加 (B) 減少 (C) 不變 (D) 變為 0
3. **Q3**: 切線加速度 $a_T$ 的計算公式為？
   - (A) $v'$ (B) $\kappa v^2$ (C) $|\mathbf{a}|$ (D) $\mathbf{a} \cdot \mathbf{N}$
4. **Q4**: 副法向量 $\mathbf{B}$ 等於？
   - (A) $\mathbf{N} \times \mathbf{T}$ (B) $\mathbf{T} \times \mathbf{N}$ (C) $\mathbf{T} \cdot \mathbf{N}$ (D) $\mathbf{a} \times \mathbf{v}$
5. **Q5**: 拋體運動在忽略阻力時，哪個方向的加速度為 0？
   - (A) 鉛直方向 (B) 水平方向 (C) 所有方向 (D) 運動切線方向
6. **Q6**: 密切平面的法向量是？
   - (A) $\mathbf{T}$ (B) $\mathbf{N}$ (C) $\mathbf{B}$ (D) $\mathbf{v}$
7. **Q7**: 若 $a_N = 0$，則質點的運動路徑為？
   - (A) 圓 (B) 螺旋線 (C) 直線 (D) 拋物線
8. **Q8**: 克卜勒第二定律（面積定律）實質上反映了什麼守恆？
   - (A) 能量 (B) 動量 (C) 角動量 (D) 質量
9. **Q9**: 法線加速度 $a_N$ 的物理意義是改變速度的？
   - (A) 大小 (B) 方向 (C) 能量 (D) 時間
10. **Q10**: 單位切向量 $\mathbf{T}$ 對弧長 $s$ 的變化率大小 $|d\mathbf{T}/ds|$ 是？
    - (A) 速率 (B) 曲率 (C) 加速度 (D) 扭率

### 2. 多選題 (Multiple Choice) - 共 10 題
11. **Q11**: 下列哪些關於加速度分解的描述是正確的？
    - (A) $\mathbf{a} = v' \mathbf{T} + \kappa v^2 \mathbf{N}$
    - (B) $a_T = \frac{\mathbf{v} \cdot \mathbf{a}}{v}$
    - (C) $a_N = \sqrt{|\mathbf{a}|^2 - a_T^2}$
    - (D) $a_T$ 永遠為正值
12. **Q12**: 關於 Frenet 標架 $\{\mathbf{T, N, B}\}$，下列哪些正確？
    - (A) 相互垂直 (B) 皆為單位向量 (C) 隨時間（位置）而變 (D) 是右手系
13. **Q13**: 在拋體運動中，位置向量 $\mathbf{r}(t)$ 與哪些量有關？
    - (A) 初速 (B) 初始位置 (C) 重力加速度 (D) 質點質量
14. **Q14**: 哪些運動狀態下，$a_T \neq 0$？
    - (A) 等速圓周運動 (B) 加速直線運動 (C) 變速曲線運動 (D) 自由落體
15. **Q15**: 密切平面（Osculating Plane）的特點包括：
    - (A) 包含切向量 (B) 包含法向量 (C) 與副法向量垂直 (D) 是曲線最貼近的平面
16. **Q16**: 關於速率 $v$ 與曲率 $\kappa$ 對法線加速度 $a_N$ 的影響：
    - (A) 速率越快，$a_N$ 越大 (B) 曲率越大，$a_N$ 越大 (C) $a_N$ 恆指向彎曲圓心 (D) $a_N$ 可能為負
17. **Q17**: 質點在空間中做勻速運動（速度向量為常數），則：
    - (A) $\mathbf{a} = \mathbf{0}$ (B) $\kappa = 0$ (C) $a_T = 0$ (D) $a_N = 0$
18. **Q18**: 向量 $\mathbf{B}$ 稱為副法向量，其性質有：
    - (A) $\mathbf{B} = \mathbf{T} \times \mathbf{N}$ (B) $|\mathbf{B}| = 1$ (C) $d\mathbf{B}/ds$ 與 $\mathbf{N}$ 平行 (D) $\mathbf{B}$ 垂直於 $\mathbf{T}$
19. **Q19**: 在研究行星運動時，我們通常假設：
    - (A) 太陽位於原點 (B) 引力指向中心 (C) 運動在一個平面內 (D) 速率恆定
20. **Q20**: 下列哪些量是「標量 (Scalar)」？
    - (A) 速率 (B) 曲率 (C) 切線加速度分量 $a_T$ (D) 速度

### 3. 填充題 (Fill-in-the-blank) - 共 10 題
21. **Q21**: 若 $\mathbf{v} = \langle 3, 4, 0 \rangle$，則速率 $v = $ __________。
22. **Q22**: 加速度向量 $\mathbf{a}$ 在 $\mathbf{N}$ 方向的分量大小稱為 __________ 加速度。
23. **Q23**: 在圓周運動中，若半徑為 2，速率為 4，則法線加速度 $a_N = $ __________。
24. **Q24**: 密切平面的方程式可以用點與法向量 __________ 來建立。
25. **Q25**: 拋體運動的水平軌跡在 $xy$ 平面上是一條 __________。
26. **Q26**: 若質點做直線運動，則其副法向量 $\mathbf{B}$ 是 __________ (填「確定的」或「不確定的」)。
27. **Q27**: $a_T$ 的正負取決於速率是 __________ 還是減小。
28. **Q28**: 單位切向量對時間的導數 $\mathbf{T}'(t)$ 的方向與向量 __________ 相同。
29. **Q29**: 克卜勒第一定律指出行星軌道形狀為 __________。
30. **Q30**: 加速度的長度平方滿足 $|\mathbf{a}|^2 = a_T^2 + $ __________。

---

## 五、 Q 矩陣 (Q-matrix)
| 題號 | KP4.1 | KP4.2 | KP4.3 | KP4.4 | KP4.5 |
|---|---|---|---|---|---|
| Q1-Q10 | 1, 2 | 3, 7, 9 | 4, 6, 10 | 5 | 8 |
| Q11-Q20| 14, 17, 20 | 11, 16 | 12, 15, 18 | 13 | 19 |
| Q21-Q30| 21 | 22, 23, 27, 30 | 24, 26, 28 | 25 | 29 |
