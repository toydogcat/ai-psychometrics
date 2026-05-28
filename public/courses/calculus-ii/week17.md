# 課程：微積分中 - 第 17 週 - 多元連鎖律 (The Chain Rule for Several Variables) 🔥 高難度

本週我們將探討多元函數複合時的變化率規律。連鎖律是微積分中最核心的工具之一。在多元空間中，由於變數之間存在複雜的依賴路徑，我們需要一套系統化的方法（如**樹狀圖**）來追蹤每一個變量的貢獻。這不僅是數學上的美感，更是解決動態系統、流體力學及工程優化問題的必備技能。本週內容對應 **Stewart Calculus (Metric Edition) Chapter 14 Section 14.5**。

---

## 一、 單元講解 (Lecture) - 總計 100 分鐘

### 1. 基本連鎖律：單參數路徑 (20 min) (KP17.1)
*   **概念講解**：
    設 $z = f(x, y)$ 是可微函數，且 $x = g(t), y = h(t)$ 是可微函數，則 $z$ 對 $t$ 的變化率為：
    $$\frac{dz}{dt} = \frac{\partial z}{\partial x} \frac{dx}{dt} + \frac{\partial z}{\partial y} \frac{dy}{dt}$$
*   **物理直觀**：想像你在山上行走，$z$ 是高度，$(x, y)$ 是你在地圖上的位置。你在 $t$ 時刻的高度變化，取決於「地形的陡峭程度（偏導）」與「你行走的速度（座標導數）」的綜合影響。
*   **練習題與解答**：
    *   **練習題 17.1.1**：若 $z = x^2 y + 3xy^4$，且 $x = \sin 2t, y = \cos t$，求 $t=0$ 時的 $dz/dt$。
    *   **解答**：
        1. 計算偏導：$z_x = 2xy + 3y^4, z_y = x^2 + 12xy^3$。
        2. 當 $t=0$ 時，$x = \sin 0 = 0, y = \cos 0 = 1$。
        3. 故 $z_x(0, 1) = 3, z_y(0, 1) = 0$。
        4. 計算座標導數：$dx/dt = 2\cos 2t = 2, dy/dt = -\sin t = 0$ (於 $t=0$)。
        5. $dz/dt = (3)(2) + (0)(0) = 6$。

---

### 2. 通用連鎖律：多參數表面 (20 min) (KP17.2)
*   **概念講解**：
    若 $z = f(x, y)$，且 $x = g(u, v), y = h(u, v)$，則 $z$ 對 $u$ 的偏導數為：
    $$\frac{\partial z}{\partial u} = \frac{\partial z}{\partial x} \frac{\partial x}{\partial u} + \frac{\partial z}{\partial y} \frac{\partial y}{\partial u}$$
    同理可求 $\partial z / \partial v$。
*   **練習題與解答**：
    *   **練習題 17.2.1**：若 $z = e^x \sin y$，$x = st^2, y = s^2t$，求 $\partial z / \partial s$。
    *   **解答**：
        1. $\frac{\partial z}{\partial s} = \frac{\partial z}{\partial x} \frac{\partial x}{\partial s} + \frac{\partial z}{\partial y} \frac{\partial y}{\partial s}$。
        2. $\frac{\partial z}{\partial x} = e^x \sin y, \frac{\partial x}{\partial s} = t^2$。
        3. $\frac{\partial z}{\partial y} = e^x \cos y, \frac{\partial y}{\partial s} = 2st$。
        4. 結果：$\frac{\partial z}{\partial s} = (e^x \sin y)t^2 + (e^x \cos y)(2st)$。

---

### 3. 樹狀圖分析法 (Tree Diagrams) (20 min) (KP17.3)
*   **概念講解**：
    當變數層次變多（例如 $w$ 依賴 $x, y, z$，而 $x, y, z$ 又各自依賴 $r, s, t$），樹狀圖是防止遺漏項目的利器。
    - **規則 1**：從頂端變數（因變數）出發，畫出到中間變數的分支。
    - **規則 2**：從中間變數畫出到最終變數（自變數）的分支。
    - **規則 3**：要求對某自變數的導數，找尋所有通往該自變數的路徑。
    - **規則 4**：同一路徑上的偏導相乘，不同路徑的結果相加。
*   **練習題與解答**：
    *   **練習題 17.3.1**：繪製 $u = f(x, y, z)$ 且 $x(r, s), y(r, s), z(r, s)$ 的樹狀圖並寫出 $\partial u / \partial r$。
    *   **解答**：
        - 頂層 $u$ 分出三支到 $x, y, z$。
        - $x, y, z$ 各自再分出兩支到 $r, s$。
        - 通往 $r$ 的路徑有三條：$u \to x \to r, u \to y \to r, u \to z \to r$。
        - $\frac{\partial u}{\partial r} = \frac{\partial u}{\partial x} \frac{\partial x}{\partial r} + \frac{\partial u}{\partial y} \frac{\partial y}{\partial r} + \frac{\partial u}{\partial z} \frac{\partial z}{\partial r}$。

---

### 4. 隱函數微分定理的正式證明 (20 min) (KP17.4)
*   **概念講解**：
    設 $F(x, y) = 0$ 定義了 $y$ 為 $x$ 的隱函數。
    1. 兩邊對 $x$ 微分：$\frac{d}{dx} F(x, y) = \frac{d}{dx} (0)$。
    2. 應用連鎖律：$\frac{\partial F}{\partial x} \frac{dx}{dx} + \frac{\partial F}{\partial y} \frac{dy}{dx} = 0$。
    3. 因為 $dx/dx = 1$，解出：$\frac{dy}{dx} = -\frac{F_x}{F_y}$。
    這證明了我們之前使用的隱微分公式。
*   **練習題與解答**：
    *   **練習題 17.4.1**：若 $x^2 + \sin(xy) + y^2 = 5$，求 $dy/dx$。
    *   **解答**：
        1. 令 $F(x, y) = x^2 + \sin(xy) + y^2 - 5 = 0$。
        2. $F_x = 2x + y \cos(xy)$。
        3. $F_y = x \cos(xy) + 2y$。
        4. $dy/dx = -\frac{2x + y \cos(xy)}{x \cos(xy) + 2y}$。

---

### 5. 連鎖律在物理中的應用 (20 min) (KP17.5)
*   **概念講解**：
    在熱力學或流體力學中，壓力和體積常隨時間變化，我們需要知道某些導出量（如功或內能）的瞬時變化率。
*   **練習題與解答**：
    *   **練習題 17.5.1**：圓柱體的半徑 $r$ 以 $2 cm/s$ 增加，高度 $h$ 以 $3 cm/s$ 減少。當 $r=5, h=10$ 時，其體積 $V$ 的變化率為何？
    *   **解答**：
        1. $V = \pi r^2 h$。
        2. $\frac{dV}{dt} = \frac{\partial V}{\partial r} \frac{dr}{dt} + \frac{\partial V}{\partial h} \frac{dh}{dt}$。
        3. $\frac{\partial V}{\partial r} = 2\pi rh, \frac{\partial V}{\partial h} = \pi r^2$。
        4. 代入數據：$dV/dt = (2\pi \cdot 5 \cdot 10)(2) + (\pi \cdot 5^2)(-3)$。
        5. $dV/dt = 200\pi - 75\pi = 125\pi \approx 392.7 cm^3/s$。
        6. 體積正在增加。

---

## 二、 動手實作 (Lab) - 30 分鐘

### 實作：符號連鎖律與自動化路徑求導
我們將利用 Python 模擬樹狀圖邏輯，計算嵌套複合函數的導數。

```python
import sympy as sp

def symbolic_chain_rule():
    # 定義符號
    t = sp.symbols('t')
    x = sp.Function('x')(t)
    y = sp.Function('y')(t)
    
    # 定義 z = f(x, y) = x^2 + y^2
    z = x**2 + y**2
    
    # 對 t 求導 (自動應用連鎖律)
    dz_dt = sp.diff(z, t)
    print(f"z(x, y) = x^2 + y^2 對 t 的通用導數形式:")
    print(dz_dt)
    
    # 給定具體路徑：x = sin(t), y = cos(t)
    concrete_z = z.subs({x: sp.sin(t), y: sp.cos(t)})
    dz_dt_val = sp.diff(concrete_z, t)
    
    print(f"\n當 x=sin(t), y=cos(t) 時，z = {concrete_z}")
    print(f"dz/dt = {dz_dt_val} (符合 sin^2 + cos^2 = 1 的預期)")

if __name__ == "__main__":
    symbolic_chain_rule()
```

---

## 三、 本週知識點回顧 (KP)
- **KP17.1**: 掌握單變數路徑下的全導數 $\frac{dz}{dt}$ 結構。
- **KP17.2**: 理解多元參數下，偏導數是以「分支相加」的形式組成的。
- **KP17.3**: 熟練繪製樹狀圖，這是處理複雜連鎖律問題的標準 S.O.P.。
- **KP17.4**: 理解隱函數微分定理的來源，並能擴展至三元以上。
- **KP17.5**: 能將物理問題轉化為變數間的依賴關係並求解變化率。

---

## 四、 課後測驗題庫 (Quiz)

### 1. 單選題 (Single Choice)
1. **Q1**: $z = f(x, y)$，若 $x, y$ 均為 $t$ 的函數，則 $dz/dt$ 的項數為？
   - (A) 1 (B) 2 (C) 3 (D) 4
2. **Q2**: 在樹狀圖中，從 $z$ 到 $x$ 的路徑權重是？
   - (A) $dx/dz$ (B) $\partial z / \partial x$ (C) $\partial x / \partial z$ (D) $z/x$
3. **Q3**: 若 $F(x, y, z) = 0$，則 $\partial z / \partial x$ 等於？
   - (A) $F_x / F_z$ (B) $-F_x / F_z$ (C) $F_z / F_x$ (D) $-F_z / F_x$
4. **Q4**: 若 $z = x+y$ 且 $x=t, y=t^2$，則 $dz/dt$ 為？
   - (A) $1+2t$ (B) $1+t$ (C) $2t$ (D) 0
5. **Q5**: 通用連鎖律中，若 $z = f(x, y)$ 且 $x=x(u, v), y=y(u, v)$，求 $\partial z / \partial v$ 時應固定哪一個變數？
   - (A) $x$ (B) $y$ (C) $u$ (D) $z$
6. **Q6**: $w = f(x, y, z)$，其中 $x, y, z$ 是 $t$ 的函數，則 $dw/dt$ 是？
   - (A) 偏導數 (B) 全導數 (C) 方向導數 (D) 二階導數
7. **Q7**: 隱微分 $dy/dx = -F_x/F_y$ 要求前提為？
   - (A) $F_x \neq 0$ (B) $F_y \neq 0$ (C) $F = 1$ (D) $x=0$
8. **Q8**: 若一個變量依賴 3 個中間變量，每個中間變量依賴 2 個最終變量，則樹狀圖底部共有幾個端點？
   - (A) 3 (B) 2 (C) 6 (D) 5
9. **Q9**: 在 $PV=nRT$ 中，若 $T$ 固定，求 $dP/dt$ 與 $dV/dt$ 的關係。
   - (A) $V dP/dt + P dV/dt = 0$ (B) $dP/dt = dV/dt$ (C) $P dP/dt = V dV/dt$ (D) 無關
10. **Q10**: 連鎖律的本質是什麼？
    - (A) 導數的乘法規律 (B) 導數的加法規律 (C) 函數複合的變化率傳遞 (D) 座標轉換

### 2. 多選題 (Multiple Choice)
11. **Q11**: 下列關於連鎖律的敘述，正確的有？
    - (A) 它可以用於計算高階偏導數 (B) 樹狀圖對任何層次的複合都有效 (C) 中間變數必須是可微的 (D) 結果與變數命名無關
12. **Q12**: 若 $z = f(x, y)$，其中 $x=r\cos\theta, y=r\sin\theta$（極座標轉換），則 $\partial z / \partial r$ 包含？
    - (A) $f_x \cos\theta$ (B) $f_y \sin\theta$ (C) $f_x (-r\sin\theta)$ (D) $f_y (r\cos\theta)$
13. **Q13**: 隱微分公式 $\partial z / \partial x = -F_x/F_z$ 適用的場景包括？
    - (A) 球面方程式 $x^2+y^2+z^2=R^2$ (B) 平面方程式 $Ax+By+Cz=D$ (C) 顯函數 $z = x^2+y^2$ (D) 任何形如 $F(x,y,z)=0$ 的關係
14. **Q14**: 多元連鎖律常見的錯誤包括？
    - (A) 遺漏某條路徑 (B) 混淆全導數與偏導數符號 (C) 忘了將路徑上的項相乘 (D) 忘了將不同路徑的項相加
15. **Q15**: 在物理應用中，連鎖律可以用來計算？
    - (A) 流體中質點的加速度 (B) 氣體受壓縮時的壓力變化率 (C) 機械臂末端的運動速度 (D) 迴路中的電流變化

### 3. 填充題 (Fill-in-the-blank)
16. **Q16**: $\frac{\partial}{\partial u} f(x(u,v), y(u,v)) = f_x \frac{\partial x}{\partial u} + $ __________。
17. **Q17**: 若 $x=e^t, y=t^2$，則 $dx/dt = $ __________。
18. **Q18**: $F(x, y) = x^2 - y^2 = 0$ 定義的隱函數在 $(1, 1)$ 處的 $dy/dx = $ __________。
19. **Q19**: 在樹狀圖法中，自因變數到最終自變數的每一條線段代表一個 __________。
20. **Q20**: $w = f(x, y, z, t)$ 的全微分 $dw$ 共有 __________ 項。
21. **Q21**: 若 $z = xy$，而 $x, y$ 隨時間變化，則 $dz/dt = y \frac{dx}{dt} + $ __________。
22. **Q22**: 隱函數定理中，分母不能為零的條件是為了確保 __________ 定理成立。
23. **Q23**: $\frac{\partial}{\partial \theta} (r \cos \theta) = $ __________。
24. **Q24**: 連鎖律反映了微積分的 __________ 性質。
25. **Q25**: 若 $\frac{\partial z}{\partial x} = 2, \frac{\partial z}{\partial y} = 3$ 且 $\frac{dx}{dt} = 1, \frac{dy}{dt} = -1$，則 $\frac{dz}{dt} = $ __________。
26. **Q26**: 繪製樹狀圖時，中間變數位於圖的 __________ 層。
27. **Q27**: $\frac{d}{dt} f(\mathbf{r}(t))$ 稱為函數沿曲線的 __________。
28. **Q28**: 二階偏導 $z_{uu}$ 的計算通常需要對一階偏導再次使用 __________。
29. **Q29**: $x^y = e^{y \ln x}$ 對 $y$ 的偏導數為 __________。
30. **Q30**: 多元微積分的核心目標之一是理解多變數間的 __________ 變化。

---

## 五、 Q 矩陣 (Q-matrix)

| 題號 | KP17.1 | KP17.2 | KP17.3 | KP17.4 | KP17.5 | | |
|---|---|---|---|---|---|
| Q1 | 1 | 1 | 1 | 1 | 1 |
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


