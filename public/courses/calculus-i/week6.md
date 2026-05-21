# 微積分 (上) - 第 6 週：三角函數與連鎖律

## 1. 教學目標
- 掌握乘積法則 (Product Rule) 與商法則 (Quotient Rule)。
- 熟記六個基本三角函數的導數。
- 深刻理解並能熟練運用連鎖律 (Chain Rule)。
- 能結合上述所有法則解決複雜函數的微分問題。

## 2. 知識點 (KPs) 與理論推導

### KP 6.1: 乘積法則與商法則 (Product and Quotient Rules)
**理論與推導**：
1. **乘積法則**：$\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)$
   *證明想法*：增加並減去 $f(x+h)g(x)$ 項，利用極限分配。
2. **商法則**：$\frac{d}{dx}[\frac{f(x)}{g(x)}] = \frac{f'(x)g(x) - f(x)g'(x)}{[g(x)]^2}$
   *證明想法*：可由乘積法則與連鎖律推導，或由極限直接證明。

**課堂練習**：
**題目 1**：求 $y = x^2 e^x$ 的導數。
**解答**：使用乘積法則，$y' = (x^2)'e^x + x^2(e^x)' = 2xe^x + x^2e^x = xe^x(2+x)$。

**題目 2**：求 $y = \frac{e^x}{x}$ 的導數。
**解答**：使用商法則，$y' = \frac{(e^x)'x - e^x(x)'}{x^2} = \frac{xe^x - e^x}{x^2} = \frac{e^x(x-1)}{x^2}$。

### KP 6.2: 基本三角函數的導數 (Derivatives of Sine and Cosine)
**理論與推導**：
1. $\frac{d}{dx}(\sin x) = \cos x$
   *證明*：利用 $\lim_{h \to 0} \frac{\sin h}{h} = 1$ 與 $\lim_{h \to 0} \frac{\cos h - 1}{h} = 0$，
   $\sin(x+h) - \sin x = \sin x \cos h + \cos x \sin h - \sin x$。取極限得 $\cos x$。
2. $\frac{d}{dx}(\cos x) = -\sin x$。

**課堂練習**：
**題目 1**：求 $f(x) = x \sin x$ 的導數。
**解答**：乘積法則，$f'(x) = (1)\sin x + x(\cos x) = \sin x + x \cos x$。

### KP 6.3: 其他三角函數的導數 (Derivatives of Other Trig Functions)
**理論與推導**：
利用商法則推導：
- $\frac{d}{dx}(\tan x) = \frac{d}{dx}(\frac{\sin x}{\cos x}) = \frac{\cos x \cdot \cos x - \sin x(-\sin x)}{\cos^2 x} = \frac{1}{\cos^2 x} = \sec^2 x$
- 同理可得：
  $\frac{d}{dx}(\cot x) = -\csc^2 x$
  $\frac{d}{dx}(\sec x) = \sec x \tan x$
  $\frac{d}{dx}(\csc x) = -\csc x \cot x$

**課堂練習**：
**題目 1**：求 $y = e^x \tan x$ 的導數。
**解答**：$y' = e^x \tan x + e^x \sec^2 x = e^x(\tan x + \sec^2 x)$。

### KP 6.4: 連鎖律 (The Chain Rule)
**理論與推導**：
若 $y = f(u)$ 且 $u = g(x)$，則對 $x$ 的導數為：
$\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$
或者寫成 $F(x) = f(g(x))$，則 $F'(x) = f'(g(x))g'(x)$。
*概念*：變化率相乘。齒輪 A 轉速是 B 的 2 倍，B 是 C 的 3 倍，則 A 是 C 的 6 倍。

**課堂練習**：
**題目 1**：求 $y = \sin(x^2)$ 的導數。
**解答**：外函數 $f(u) = \sin u$，內函數 $g(x) = x^2$。
$y' = \cos(x^2) \cdot \frac{d}{dx}(x^2) = \cos(x^2) \cdot 2x = 2x \cos(x^2)$。

### KP 6.5: 連鎖律的進階應用與組合 (Combining Rules)
**理論與推導**：
連鎖律常與乘積、商法則結合。處理時應「由外而內」逐層剝開。

**課堂練習**：
**題目 1**：求 $y = e^{\sin x} \cdot \cos(2x)$ 的導數。
**解答**：
先用乘積法則：$y' = [e^{\sin x}]' \cdot \cos(2x) + e^{\sin x} \cdot [\cos(2x)]'$
利用連鎖律求各部分：
$[e^{\sin x}]' = e^{\sin x} \cdot \cos x$
$[\cos(2x)]' = -\sin(2x) \cdot 2 = -2\sin(2x)$
合併：$y' = e^{\sin x} \cos x \cos(2x) - 2e^{\sin x} \sin(2x)$。

## 3. Python 實驗室 (Python Lab)
使用 SymPy 處理三角函數與連鎖律的符號運算：
```python
import sympy as sp

x = sp.Symbol('x')
f = sp.sin(x**2) * sp.exp(x)

# 計算導數
df_dx = sp.diff(f, x)
print(f"導數: {df_dx}")
# 輸出: 2*x*exp(x)*cos(x**2) + exp(x)*sin(x**2)

# 化簡
simplified_df = sp.simplify(df_dx)
print(f"化簡後: {simplified_df}")
```

## 4. 測驗 (Quiz)

### 單選題 (10題)
1. $\frac{d}{dx}(\sin x) =$ ?
   (A) $\cos x$  (B) $-\cos x$  (C) $\sin x$  (D) $-\sin x$
2. 乘積法則 $\frac{d}{dx}(fg)$ 等於？
   (A) $f'g'$  (B) $f'g + fg'$  (C) $f'g - fg'$  (D) $\frac{f'g-fg'}{g^2}$
3. $\frac{d}{dx}(\tan x) =$ ?
   (A) $\cot x$  (B) $\sec^2 x$  (C) $-\csc^2 x$  (D) $\sec x \tan x$
4. 若 $y = \cos(3x)$，則 $y'$ 為何？
   (A) $-\sin(3x)$  (B) $3\sin(3x)$  (C) $-3\sin(3x)$  (D) $\sin(3x)$
5. 連鎖律公式為 $\frac{dy}{dx} =$ ?
   (A) $\frac{dy}{du} + \frac{du}{dx}$  (B) $\frac{dy}{du} \cdot \frac{du}{dx}$  (C) $\frac{dy}{du} / \frac{du}{dx}$  (D) $\frac{du}{dy}$
6. $\frac{d}{dx}(\sec x) =$ ?
   (A) $\sec^2 x$  (B) $\tan^2 x$  (C) $\sec x \tan x$  (D) $-\csc x \cot x$
7. 求 $f(x) = e^{2x}$ 的導數。
   (A) $e^{2x}$  (B) $2e^{2x}$  (C) $e^x$  (D) $2xe^{2x}$
8. $\frac{d}{dx}(x \cos x) =$ ?
   (A) $\cos x - x \sin x$  (B) $-\sin x$  (C) $1 - \sin x$  (D) $\cos x + x \sin x$
9. 求 $\frac{d}{dx}(\sin^2 x)$。
   (A) $\cos^2 x$  (B) $2\sin x$  (C) $2\sin x \cos x$  (D) $-\cos^2 x$
10. 商法則中分母為？
    (A) $g(x)$  (B) $g'(x)$  (C) $[g(x)]^2$  (D) $f(x)$

### 多選題 (10題)
11. 關於基本三角函數的導數，下列哪些正確？
    (A) $(\sin x)' = \cos x$
    (B) $(\cos x)' = -\sin x$
    (C) $(\tan x)' = \sec^2 x$
    (D) $(\cot x)' = \csc^2 x$
12. 關於連鎖律，下列敘述哪些正確？
    (A) 用於處理合成函數的微分
    (B) 由外而內逐層微分並相乘
    (C) $(f(g(x)))' = f'(g'(x))$
    (D) $(f(g(x)))' = f'(g(x))g'(x)$
13. 若 $y = e^{f(x)}$，則：
    (A) $y' = e^{f(x)} \cdot f'(x)$
    (B) $y' = e^{f'(x)}$
    (C) 這是連鎖律的應用
    (D) 若 $f(x)=x$，則回退到 $y'=e^x$
14. 關於 $\sec x$ 與 $\csc x$ 的微分，哪些正確？
    (A) $(\sec x)' = \sec x \tan x$
    (B) $(\csc x)' = -\csc x \cot x$
    (C) 它們都可以用商法則從 $\cos x$ 和 $\sin x$ 推導出來
    (D) $(\sec x)' = \tan^2 x$
15. 考慮函數 $h(x) = \frac{\sin x}{x}$：
    (A) 其導數須使用商法則
    (B) $h'(x) = \frac{x \cos x - \sin x}{x^2}$
    (C) $h(x)$ 在 $x=0$ 處有定義
    (D) 當 $x \to 0$ 時，極限為 1
16. 下列哪些函数的导数包含 $\cos x$ 作为因子？
    (A) $\sin x$
    (B) $\sin^2 x$
    (C) $\sin(\sin x)$
    (D) $x \sin x$
17. 若 $f(x) = \sqrt{1+x^2}$，則：
    (A) $f(x) = (1+x^2)^{1/2}$
    (B) $f'(x) = \frac{1}{2}(1+x^2)^{-1/2} \cdot 2x$
    (C) $f'(x) = \frac{x}{\sqrt{1+x^2}}$
    (D) 需要用到連鎖律
18. 對於商法則 $[\frac{f}{g}]'$，分子部分是：
    (A) $f'g - fg'$
    (B) 與乘積法則的項相同，但符號為負
    (C) $f'g' - fg$
    (D) $f g' - f' g$
19. 哪些函數的二階導數是其本身的相反數（即 $f'' = -f$）？
    (A) $\sin x$
    (B) $\cos x$
    (C) $e^x$
    (D) $\tan x$
20. 計算 $\frac{d}{dx}(\sin(e^x))$ 時：
    (A) 外函數是 $\sin u$
    (B) 內函數是 $e^x$
    (C) 結果為 $\cos(e^x) \cdot e^x$
    (D) 結果為 $e^{\cos x}$

### 填充題 (10題)
21. $\frac{d}{dx}(\cos x) = \underline{-\sin x}$。
22. 連鎖律中，若 $y = u^3$ 且 $u = x^2+1$，則 $\frac{dy}{dx} = \underline{3(x^2+1)^2 \cdot 2x}$。
23. $\frac{d}{dx}(e^{-x}) = \underline{-e^{-x}}$。
24. $\frac{d}{dx}(x \sin x) = \underline{\sin x + x\cos x}$。
25. 函數 $y = \tan(5x)$ 的導數為 $\underline{5\sec^2(5x)}$。
26. $\frac{d}{dx}(\sqrt{x^2+1}) = \underline{\frac{x}{\sqrt{x^2+1}}}$。
27. $(\cot x)' = \underline{-\csc^2 x}$。
28. 商法則的分母是 $\underline{[g(x)]^2}$。
29. $\frac{d}{dx}(\cos^3 x) = \underline{-3\cos^2 x \sin x}$。
30. 若 $f(x) = \sin(\cos x)$，則 $f'(x) = \underline{-\cos(\cos x) \sin x}$。