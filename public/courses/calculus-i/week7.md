# 微積分 (上) - 第 7 週：隱函數微分與對數微分

## 1. 教學目標
- 了解隱函數的概念，並掌握隱函數微分法 (Implicit Differentiation)。
- 計算隱函數的高階導數及尋找切線方程式。
- 推導並熟記反三角函數的導數。
- 掌握對數函數的導數。
- 學會使用對數微分法 (Logarithmic Differentiation) 處理複雜函數的微分。

## 2. 知識點 (KPs) 與理論推導

### KP 7.1: 隱函數微分法 (Implicit Differentiation)
**理論與推導**：
當變數 $x$ 和 $y$ 之間的關係以方程式 $F(x,y)=0$ 給出，且 $y$ 無法輕易表示為 $x$ 的顯函數時，我們對方程式兩邊同時對 $x$ 微分。遇到包含 $y$ 的項時，因為 $y$ 是 $x$ 的函數，必須使用連鎖律乘上 $\frac{dy}{dx}$ (或 $y'$ )。

**課堂練習**：
**題目 1**：求圓方程式 $x^2 + y^2 = 25$ 的 $\frac{dy}{dx}$。
**解答**：
兩邊對 $x$ 微分：$\frac{d}{dx}(x^2) + \frac{d}{dx}(y^2) = \frac{d}{dx}(25)$
得：$2x + 2y \frac{dy}{dx} = 0$
解出：$\frac{dy}{dx} = -\frac{x}{y}$。

### KP 7.2: 隱函數的高階導數與切線 (Higher Derivatives and Tangents)
**理論與推導**：
求出 $\frac{dy}{dx}$ 後，可以將特定點 $(x_0, y_0)$ 代入求切線斜率 $m$。
若要計算二階導數 $\frac{d^2y}{dx^2}$，我們再次對 $\frac{dy}{dx}$ 求導，並在結果中代入已知的一階導數 $\frac{dy}{dx}$。

**課堂練習**：
**題目 1**：求橢圓 $x^2+y^2=25$ 在點 $(3,4)$ 的切線方程式。
**解答**：
斜率 $m = -\frac{x}{y} = -\frac{3}{4}$。
點斜式：$y - 4 = -\frac{3}{4}(x - 3)$，即 $3x + 4y = 25$。

### KP 7.3: 反三角函數的導數 (Derivatives of Inverse Trigonometric Functions)
**理論與推導**：
以 $y = \sin^{-1} x$ (或 $\arcsin x$) 為例：
這等價於 $\sin y = x$，且 $-\frac{\pi}{2} \le y \le \frac{\pi}{2}$。
兩邊對 $x$ 隱微分：$\cos y \frac{dy}{dx} = 1 \implies \frac{dy}{dx} = \frac{1}{\cos y}$。
因為 $\cos y = \sqrt{1 - \sin^2 y} = \sqrt{1-x^2}$（在該區間為正），
所以 $\frac{d}{dx}(\sin^{-1} x) = \frac{1}{\sqrt{1-x^2}}$。
同理：
$\frac{d}{dx}(\cos^{-1} x) = -\frac{1}{\sqrt{1-x^2}}$
$\frac{d}{dx}(\tan^{-1} x) = \frac{1}{1+x^2}$。

**課堂練習**：
**題目 1**：求 $y = \tan^{-1}(x^2)$ 的導數。
**解答**：利用連鎖律，$y' = \frac{1}{1+(x^2)^2} \cdot \frac{d}{dx}(x^2) = \frac{2x}{1+x^4}$。

### KP 7.4: 對數函數的導數 (Derivatives of Logarithmic Functions)
**理論與推導**：
已知 $y = \ln x$，這等價於 $e^y = x$。
兩邊對 $x$ 隱微分：$e^y \cdot \frac{dy}{dx} = 1 \implies \frac{dy}{dx} = \frac{1}{e^y} = \frac{1}{x}$。
因此 $\frac{d}{dx}(\ln x) = \frac{1}{x}$。
對於一般底數，$\frac{d}{dx}(\log_a x) = \frac{1}{x \ln a}$。

**課堂練習**：
**題目 1**：求 $y = \ln(x^3+1)$ 的導數。
**解答**：$y' = \frac{1}{x^3+1} \cdot 3x^2 = \frac{3x^2}{x^3+1}$。

### KP 7.5: 對數微分法 (Logarithmic Differentiation)
**理論與推導**：
當函數包含多個乘積、商或形如 $f(x)^{g(x)}$ 的指數形式時，可先取自然對數 $\ln$，利用對數律展開，再隱微分，最後乘上原函數 $y$。
步驟：
1. 兩邊取 $\ln$：$\ln y = \ln(f(x))$。
2. 利用對數律化簡。
3. 對 $x$ 隱微分：$\frac{1}{y}y' = \dots$。
4. 求解 $y'$。

**課堂練習**：
**題目 1**：求 $y = x^x$ 的導數。
**解答**：
1. $\ln y = \ln(x^x) = x \ln x$。
2. 對 $x$ 微分：$\frac{1}{y}y' = 1 \cdot \ln x + x \cdot \frac{1}{x} = \ln x + 1$。
3. $y' = y(\ln x + 1) = x^x(\ln x + 1)$。

## 3. Python 實驗室 (Python Lab)
使用 SymPy 進行對數微分與隱函數繪圖（可透過 matplotlib 達成，這裡以符號微分為主）：
```python
import sympy as sp

x, y = sp.symbols('x y')

# 反三角與對數函數的微分
f1 = sp.asin(x)
print("arcsin(x) 的導數:", sp.diff(f1, x))

f2 = sp.log(x) # 預設為 ln
print("ln(x) 的導數:", sp.diff(f2, x))

# 處理 x^x
f3 = x**x
print("x^x 的導數:", sp.diff(f3, x))

# 隱函數微分 (求 dy/dx for x^2 + y^2 - 25 = 0)
eq = x**2 + y**2 - 25
dy_dx = sp.idiff(eq, y, x)
print("隱函數微分 dy/dx:", dy_dx)
```

## 4. 測驗 (Quiz)

### 單選題 (10題)
1. 隱函數微分時，對 $y^2$ 對 $x$ 微分的結果為何？
   (A) $2y$  (B) $2y \frac{dy}{dx}$  (C) $2x$  (D) $0$
2. $\frac{d}{dx} (\ln x) =$ ?
   (A) $e^x$  (B) $\frac{1}{x}$  (C) $\ln x$  (D) $x$
3. 反正弦函數 $\sin^{-1} x$ 的導數為？
   (A) $\frac{1}{1+x^2}$  (B) $\frac{1}{\sqrt{1-x^2}}$  (C) $-\frac{1}{\sqrt{1-x^2}}$  (D) $\frac{1}{x}$
4. $\frac{d}{dx} (\tan^{-1} x) =$ ?
   (A) $\frac{1}{1+x^2}$  (B) $\frac{1}{1-x^2}$  (C) $\sec^2 x$  (D) $\frac{1}{\sqrt{1+x^2}}$
5. 計算 $\frac{d}{dx} (\ln(3x))$。
   (A) $\frac{3}{x}$  (B) $\frac{1}{x}$  (C) $\frac{1}{3x}$  (D) $3\ln x$
6. 若 $y = x^x$，則求 $y'$ 最佳的方法是？
   (A) 冪次法則  (B) 指數法則  (C) 對數微分法  (D) 商法則
7. 對於方程式 $xy = 1$，求 $\frac{dy}{dx}$。
   (A) $-\frac{y}{x}$  (B) $-\frac{x}{y}$  (C) $\frac{1}{x}$  (D) $-x^{-2}$
8. $\frac{d}{dx} (\log_{10} x) =$ ?
   (A) $\frac{1}{x}$  (B) $\frac{1}{x \ln 10}$  (C) $\frac{\ln 10}{x}$  (D) $10^x$
9. 已知 $y = \ln(x^2)$，則 $y' =$ ?
   (A) $\frac{2}{x}$  (B) $\frac{1}{x^2}$  (C) $\frac{2}{x^2}$  (D) $2x$
10. 計算 $f(x) = \sin^{-1}(2x)$ 的導數。
    (A) $\frac{2}{\sqrt{1-4x^2}}$  (B) $\frac{1}{\sqrt{1-2x^2}}$  (C) $\frac{2}{\sqrt{1-x^2}}$  (D) $\frac{4x}{\sqrt{1-4x^2}}$

### 多選題 (10題)
11. 關於隱函數微分法，下列哪些正確？
    (A) 適用於 $y$ 無法寫為 $x$ 的明確函數時
    (B) 需對等式兩邊同時對 $x$ 微分
    (C) 對含 $y$ 的項求導時必須使用連鎖律，乘上 $\frac{dy}{dx}$
    (D) $x$ 與 $y$ 不能同時出現在同一項中
12. 關於對數微分法，下列哪些情況適用？
    (A) 函數包含變數在底數與指數，例如 $x^x$
    (B) 函數為複雜的分式與乘積，例如 $\frac{\sqrt{x}(x+1)^2}{(x-2)^3}$
    (C) 任何常數函數
    (D) 多項式加減
13. 下列反三角函數的導數哪些正確？
    (A) $(\sin^{-1} x)' = \frac{1}{\sqrt{1-x^2}}$
    (B) $(\cos^{-1} x)' = -\frac{1}{\sqrt{1-x^2}}$
    (C) $(\tan^{-1} x)' = \frac{1}{1+x^2}$
    (D) $(\sec^{-1} x)' = \frac{1}{x\sqrt{x^2-1}}$
14. 若 $x^2 + y^2 = 1$，則：
    (A) 這是一個單一函數
    (B) 隱函數微分得 $2x + 2yy' = 0$
    (C) 在 $(0,1)$ 處斜率為 0
    (D) 二階導數 $y'' = -\frac{1}{y^3}$
15. 關於 $\ln |x|$ 的導數，下列何者正確？
    (A) 當 $x > 0$ 時為 $\frac{1}{x}$
    (B) 當 $x < 0$ 時為 $\frac{1}{x}$
    (C) $(\ln |x|)' = \frac{1}{x}$ 對所有 $x \neq 0$ 成立
    (D) 在 $x=0$ 處可微
16. 已知 $\ln y = x^2$，下列哪些正確？
    (A) $y = e^{x^2}$
    (B) $\frac{y'}{y} = 2x$
    (C) $y' = 2x e^{x^2}$
    (D) 此題不需要使用連鎖律
17. 使用對數微分法求 $y = (\sin x)^x$ 時，第一步 $\ln y$ 為何？
    (A) $x \ln(\sin x)$
    (B) $\sin x \ln x$
    (C) $x \sin x$
    (D) $x + \ln(\sin x)$
18. 對於 $y = \log_2(x^2+1)$，其導數包含哪些項？
    (A) $\frac{1}{x^2+1}$
    (B) $2x$
    (C) $\ln 2$ 在分母
    (D) $\ln 2$ 在分子
19. 隱函數求切線時，若算得 $\frac{dy}{dx}$ 分母為零，代表什麼？
    (A) 該點可能為垂直切線
    (B) 該點的斜率不存在
    (C) 函數在該點不連續
    (D) 該圖形沒有切線
20. 下列哪些組合可以消去（在合適的定義域內）？
    (A) $\sin(\sin^{-1} x) = x$
    (B) $\ln(e^x) = x$
    (C) $e^{\ln x} = x$
    (D) $\tan^{-1}(\tan x) = x$

### 填充題 (10題)
21. $\frac{d}{dx}(\tan^{-1} x) = \underline{\hspace{1cm}}$。
22. 若 $x y = 2$，則 $\frac{dy}{dx} = \underline{\hspace{1cm}}$。
23. $\frac{d}{dx}(\ln x) = \underline{\hspace{1cm}}$。
24. $\frac{d}{dx}(\sin^{-1} x) = \underline{\hspace{1cm}}$。
25. 函數 $y = \ln(5x)$ 的導數為 $\underline{\hspace{1cm}}$。
26. 若 $y = x^{\sin x}$，取自然對數後得 $\ln y = \underline{\hspace{1cm}}$。
27. 對 $y^3$ 關於 $x$ 微分，結果為 $\underline{\hspace{1cm}}$。
28. $\frac{d}{dx}(\ln(x^4)) = \underline{\hspace{1cm}}$。
29. 方程式 $x^2 + y^2 = 1$ 的 $y'$ 隱函數表示為 $\underline{\hspace{1cm}}$。
30. 反餘弦函數的導數 $\frac{d}{dx}(\cos^{-1} x) = \underline{\hspace{1cm}}$。
