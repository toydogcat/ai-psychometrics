# Week 4: 無窮極限與導數入門 (Limits at Infinity and Introduction to Derivatives)

## 課程簡介
本週我們將延伸極限的概念，探討當 $x$ 趨向於無窮大時函數的行為（水平漸近線），以及函數值趨向於無窮大時的情況（垂直漸近線）。更重要的是，我們將運用極限正式定義微積分的核心概念之一：**導數 (Derivative)**。導數不僅能解決切線斜率問題，還能描述任何物理量的瞬時變化率。

---

## 知識點 (Key Points)

### KP 4.1: 無窮極限與垂直漸近線 (Infinite Limits & Vertical Asymptotes)

**理論解釋：**
當 $x$ 逼近某個有限實數 $a$ 時，如果函數值 $f(x)$ 無限制地增大（趨向 $\infty$）或無限制地減小（趨向 $-\infty$），我們稱之為「無窮極限」。
記為：$\lim_{x \to a} f(x) = \infty$ 或 $\lim_{x \to a} f(x) = -\infty$。
在這種情況下，直線 $x = a$ 被稱為函數圖形的**垂直漸近線 (Vertical Asymptote)**。

**練習 4.1.1：**
求函數 $f(x) = \frac{1}{(x-3)^2}$ 的垂直漸近線，並計算在該點的極限。
**解答：**
1. 觀察分母：當 $x = 3$ 時，分母為 0，且分子為 1（不為 0），故 $x = 3$ 是潛在的垂直漸近線。
2. 計算極限 $\lim_{x \to 3} \frac{1}{(x-3)^2}$：
   無論 $x$ 從左側 ($x < 3$) 還是右側 ($x > 3$) 逼近 3，$(x-3)^2$ 始終為一個極小的正數。
3. 因此，倒數 $\frac{1}{(x-3)^2}$ 會無限制地增大。
4. 結論：$\lim_{x \to 3} \frac{1}{(x-3)^2} = \infty$。垂直漸近線方程式為 $x = 3$。

### KP 4.2: 無窮遠處的極限與水平漸近線 (Limits at Infinity & Horizontal Asymptotes)

**理論解釋：**
我們也關心當自變數 $x$ 變得非常大（$x \to \infty$ 或 $x \to -\infty$）時，函數值的極限行為。如果 $\lim_{x \to \infty} f(x) = L$ 或 $\lim_{x \to -\infty} f(x) = L$（其中 $L$ 為有限實數），則直線 $y = L$ 被稱為函數圖形的**水平漸近線 (Horizontal Asymptote)**。
對於有理函數，常見的技巧是將分子和分母同除以分母中最高次方的 $x$。

**練習 4.2.1：**
求函數 $f(x) = \frac{3x^2 - x - 2}{5x^2 + 4x + 1}$ 的水平漸近線。
**解答：**
1. 我們需要計算 $\lim_{x \to \infty} f(x)$ 和 $\lim_{x \to -\infty} f(x)$。
2. 分母的最高次項為 $x^2$。將分子分母同除以 $x^2$：
   $f(x) = \frac{\frac{3x^2}{x^2} - \frac{x}{x^2} - \frac{2}{x^2}}{\frac{5x^2}{x^2} + \frac{4x}{x^2} + \frac{1}{x^2}} = \frac{3 - \frac{1}{x} - \frac{2}{x^2}}{5 + \frac{4}{x} + \frac{1}{x^2}}$
3. 當 $x \to \infty$ (或 $-\infty$) 時，所有形如 $\frac{c}{x^n}$ ($n>0$) 的項都會趨向於 0。
4. 極限值 $= \frac{3 - 0 - 0}{5 + 0 + 0} = \frac{3}{5}$。
5. 因此，水平漸近線為 $y = \frac{3}{5}$。

### KP 4.3: 導數的定義 (Definition of the Derivative)

**理論解釋：**
給定函數 $f(x)$，它在 $x = a$ 處的導數 (Derivative)，記為 $f'(a)$，定義為：
$f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$
（或等價地，$f'(a) = \lim_{x \to a} \frac{f(x) - f(a)}{x - a}$）
只要這個極限存在。
幾何意義：$f'(a)$ 是曲線 $y = f(x)$ 在點 $(a, f(a))$ 處的切線斜率。
物理意義：$f'(a)$ 是物理量 $f$ 在 $x=a$ 時的瞬時變化率。

**練習 4.3.1：**
使用導數定義計算 $f(x) = x^2 - 8x + 9$ 在 $x = 3$ 處的導數 $f'(3)$。
**解答：**
1. 根據定義：$f'(3) = \lim_{h \to 0} \frac{f(3+h) - f(3)}{h}$
2. 計算 $f(3) = 3^2 - 8(3) + 9 = 9 - 24 + 9 = -6$。
3. 計算 $f(3+h) = (3+h)^2 - 8(3+h) + 9 = (9 + 6h + h^2) - 24 - 8h + 9 = h^2 - 2h - 6$。
4. 代入極限式：
   $\lim_{h \to 0} \frac{(h^2 - 2h - 6) - (-6)}{h} = \lim_{h \to 0} \frac{h^2 - 2h}{h}$
5. 提出 $h$ 並約分 (因為 $h \neq 0$)：
   $\lim_{h \to 0} (h - 2)$
6. 代入 $h=0$，得到 $f'(3) = -2$。

### KP 4.4: 導數即函數 (The Derivative as a Function)

**理論解釋：**
如果我們不指定在某個特定的點 $a$，而是在任意點 $x$ 計算導數，那麼導數本身也是一個函數，記為 $f'(x)$ 或 $\frac{dy}{dx}$：
$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$
這個新函數 $f'$ 給出了原函數 $f$ 在任何點的切線斜率。其定義域是所有使該極限存在的 $x$ 的集合。

**練習 4.4.1：**
求函數 $f(x) = \sqrt{x}$ 的導數函數 $f'(x)$，並給出其定義域。
**解答：**
1. $f'(x) = \lim_{h \to 0} \frac{\sqrt{x+h} - \sqrt{x}}{h}$
2. 分子有理化，同乘 $\frac{\sqrt{x+h} + \sqrt{x}}{\sqrt{x+h} + \sqrt{x}}$：
   $= \lim_{h \to 0} \frac{(x+h) - x}{h(\sqrt{x+h} + \sqrt{x})}$
   $= \lim_{h \to 0} \frac{h}{h(\sqrt{x+h} + \sqrt{x})}$
3. 消去 $h$：
   $= \lim_{h \to 0} \frac{1}{\sqrt{x+h} + \sqrt{x}}$
4. 讓 $h \to 0$，得 $f'(x) = \frac{1}{2\sqrt{x}}$。
5. 定義域：原函數定義域為 $x \ge 0$。但導數分母不能為零，故導數的定義域為 $x > 0$ (即 $(0, \infty)$)。

### KP 4.5: 可微性與連續性的關係 (Differentiability vs. Continuity)

**理論解釋：**
如果 $f$ 在 $x=a$ 處可微 (Differentiable)（即 $f'(a)$ 存在），則 $f$ 在 $x=a$ 處必定連續。
**重要反例：** 連續不一定可微！函數圖形若有尖角 (corner/cusp) 或垂直切線，在該點連續但不可微。例如 $f(x) = |x|$ 在 $x=0$ 連續，但 $f'(0)$ 不存在。

**練習 4.5.1：**
證明 $f(x) = |x|$ 在 $x=0$ 處不可微。
**解答：**
1. 利用定義計算 $x=0$ 處的導數極限：
   $f'(0) = \lim_{h \to 0} \frac{|0+h| - |0|}{h} = \lim_{h \to 0} \frac{|h|}{h}$
2. 這個極限我們在 Week 2 算過：
   右極限 ($h \to 0^+$)：$\lim_{h \to 0^+} \frac{h}{h} = 1$
   左極限 ($h \to 0^-$)：$\lim_{h \to 0^-} \frac{-h}{h} = -1$
3. 因為左極限不等於右極限，所以雙側極限不存在。
4. 故 $f'(0)$ 不存在，$f(x) = |x|$ 在 $x=0$ 不可微。

---

## Python 實驗室 (Python Lab)

利用 SymPy 尋找漸近線，並使用定義與內建函數計算導數。

```python
import sympy as sp

x, h = sp.symbols('x h')

# 1. 尋找漸近線
f_asymp = (2*x**2 - 3) / (x**2 - x - 2)

# 水平漸近線 (x -> oo)
horiz_asymp = sp.limit(f_asymp, x, sp.oo)
print(f"水平漸近線: y = {horiz_asymp}")

# 垂直漸近線 (分母為0)
denom = sp.denom(sp.cancel(f_asymp))
roots = sp.solve(denom, x)
print(f"潛在垂直漸近線位置: x = {roots}")
for r in roots:
    limit_r = sp.limit(f_asymp, x, r)
    print(f"在 x={r} 的極限為: {limit_r}")

# 2. 導數計算
f_deriv = sp.sqrt(x)

# 透過極限定義計算
def_deriv = sp.limit((f_deriv.subs(x, x+h) - f_deriv) / h, h, 0)
print(f"\n從定義計算 sqrt(x) 的導數: {def_deriv}")

# 透過 sympy 內建函數計算
built_in_deriv = sp.diff(f_deriv, x)
print(f"內建函數計算 sqrt(x) 的導數: {built_in_deriv}")
```

---

## 測驗 (Quiz)

**單選題 (10題)**
1. 求 $\lim_{x \to \infty} \frac{4x^3 - 2x + 1}{5x^3 + 7x^2}$：
   A) 0
   B) $4/5$
   C) $\infty$
   D) $4/7$
2. 函數 $f(x) = \frac{1}{x-5}$ 在 $x=5$ 的圖形特徵是：
   A) 水平漸近線
   B) 垂直漸近線
   C) 可去不連續點 (空心圓)
   D) 轉折點
3. 下列何者是導數 $f'(a)$ 的定義？
   A) $\lim_{x \to a} \frac{f(x) + f(a)}{x + a}$
   B) $\lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$
   C) $\lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$
   D) $\lim_{x \to 0} \frac{f(x) - f(a)}{x - a}$
4. 求 $f(x) = x^2$ 的導數函數 $f'(x)$：
   A) $x$
   B) $2x$
   C) $x^2$
   D) $2$
5. 關於可微與連續，下列敘述何者恆真？
   A) 若連續則必可微
   B) 若可微則必連續
   C) 若不可微則必不連續
   D) 連續與可微無關
6. 求 $\lim_{x \to -\infty} e^x$：
   A) $\infty$
   B) 1
   C) 0
   D) 不存在
7. 函數 $y = \frac{\sin x}{x}$ 有沒有水平漸近線？
   A) 沒有
   B) 有，$y=1$
   C) 有，$y=0$
   D) 有，$y=\pi$
8. 如果 $f'(3) = 4$，這代表什麼幾何意義？
   A) 曲線在 $x=3$ 處的函數值為 4。
   B) 曲線在 $x=3$ 處的切線斜率為 4。
   C) 曲線在 $x=3$ 處的割線斜率為 4。
   D) 曲線在 $x=4$ 處有切線。
9. 計算極限 $\lim_{x \to \infty} \frac{x^2}{e^x}$：(提示：指數增長快於多項式)
   A) 0
   B) 1
   C) $\infty$
   D) $e$
10. $f(x) = \sqrt[3]{x}$ 在 $x=0$ 處是否可微？
    A) 是，導數為 0
    B) 是，導數為 1
    C) 否，因為函數在 $x=0$ 不連續
    D) 否，因為在 $x=0$ 處有垂直切線

**多選題 (10題)**
11. 關於漸近線，下列敘述哪些正確？
    A) 多項式函數沒有垂直漸近線。
    B) 有理函數的垂直漸近線必發生在分母為 0 處。
    C) 函數圖形可以與水平漸近線相交。
    D) 函數圖形最多只能有兩條水平漸近線 (對應 $x \to \infty$ 和 $x \to -\infty$)。
12. 下列哪些函數在 $x=0$ 處不可微？
    A) $y = |x|$
    B) $y = x^{1/3}$
    C) $y = \sin x$
    D) $y = \begin{cases} 0 & x < 0 \\ x & x \ge 0 \end{cases}$
13. 要尋找函數 $f(x) = \frac{P(x)}{Q(x)}$ 的漸近線 ($P, Q$ 為多項式，無公因式)：
    A) 若 $P$ 次數等於 $Q$ 次數，有水平漸近線 $y \neq 0$。
    B) 若 $P$ 次數小於 $Q$ 次數，水平漸近線為 $y = 0$。
    C) 若 $P$ 次數大於 $Q$ 次數，必無水平漸近線。
    D) 使 $Q(x)=0$ 的 $x$ 值為垂直漸近線的位置。
14. 對於導數 $f'(x)$ 的理解，哪些是正確的？
    A) $f'(x)$ 也是一個函數。
    B) $f'(x)$ 的定義域與 $f(x)$ 必相同。
    C) $f'(x)$ 描述了 $f(x)$ 變化率的分布。
    D) 若 $f(x)$ 是常數，則 $f'(x) = 0$。
15. 下列哪些極限運算是正確的？
    A) $\lim_{x \to \infty} \frac{1}{x} = 0$
    B) $\lim_{x \to 0^+} \ln x = -\infty$
    C) $\lim_{x \to \infty} \sin x$ 存在
    D) $\lim_{x \to \pi/2^-} \tan x = \infty$
16. 若極限 $\lim_{h \to 0} \frac{f(2+h) - f(2)}{h}$ 存在，我們可以推論：
    A) $f(x)$ 在 $x=2$ 可微。
    B) $f(x)$ 在 $x=2$ 連續。
    C) $\lim_{x \to 2} f(x) = f(2)$。
    D) 該極限值等於 $f(2)$。
17. 考慮 $f(x) = \frac{x^2 - 1}{x^2 - x - 2}$，下列敘述哪些正確？
    A) $f(x)$ 有水平漸近線 $y = 1$。
    B) $x = 2$ 是垂直漸近線。
    C) $x = -1$ 是垂直漸近線。
    D) $x = -1$ 處有可去不連續點。
18. 下列哪些符號可以表示 $y = f(x)$ 對 $x$ 的導數？
    A) $f'(x)$
    B) $\frac{dy}{dx}$
    C) $y'$
    D) $\frac{d}{dx}[f(x)]$
19. 對於有理函數，當 $x \to \infty$ 時：
    A) 若分子最高次項為 $ax^n$，分母最高次項為 $bx^n$，極限為 $a/b$。
    B) 永遠需要用羅必達法則計算。
    C) 極限可以為 $\infty$ 或 $-\infty$。
    D) 若分母次數較高，極限為 0。
20. 由定義求 $f(x) = c$ (常數) 的導數：
    A) $f(x+h) = c$
    B) $f(x+h) - f(x) = c - c = 0$
    C) $\lim_{h \to 0} \frac{0}{h} = 0$
    D) 證明了常數的變化率為 0。

**填空題 (10題)**
21. $\lim_{x \to \infty} \frac{7x^2 - 3x}{2x^2 + 5} = \underline{\hspace{1cm}}$。
22. 函數 $y = \frac{3}{x-4} + 2$ 的垂直漸近線為 $x = \underline{\hspace{1cm}}$。
23. 同上題，水平漸近線為 $y = \underline{\hspace{1cm}}$。
24. 利用定義計算 $f(x) = 3x$ 的導數 $f'(x) = \underline{\hspace{1cm}}$。
25. $\lim_{x \to \infty} e^{-x} = \underline{\hspace{1cm}}$。
26. 如果 $f(x)$ 在 $x=a$ 可微，則 $\lim_{x \to a} f(x) = \underline{\hspace{1cm}}$。
27. 若物體位置函數為 $s(t) = t^2$，則 $t=3$ 時的瞬時速度為 $\underline{\hspace{1cm}}$。
28. 函數 $f(x) = \ln(x-1)$ 的垂直漸近線是 $x = \underline{\hspace{1cm}}$。
29. $\lim_{x \to -\infty} \frac{x}{\sqrt{x^2+1}} = \underline{\hspace{1cm}}$ (注意正負號)。
30. 極限 $\lim_{h \to 0} \frac{(5+h)^3 - 5^3}{h}$ 代表函數 $f(x) = x^3$ 在 $x= \underline{\hspace{1cm}}$ 處的導數。
