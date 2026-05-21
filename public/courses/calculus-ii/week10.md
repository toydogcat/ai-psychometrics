# 課程：微積分中 - 第 10 週 - 數列 (Sequences)

本週將深入探討無窮級數的基石——數列 (Sequences)。理解數列的極限性質、收斂條件以及如何判定數列的行為，是後續學習級數理論、函數逼近以及科學計算中誤差分析的關鍵基礎。本週教學內容對應 **Stewart Calculus (Metric Edition) Chapter 11: Infinite Sequences and Series** 的核心部分。

---

## 一、 單元講解 (Lecture) - 總計 100 分鐘

### 1. 數列的定義與表示法 (20 min) (KP10.1)
*   **課本對應**：Stewart Calculus Chapter 11 Section 11.1 - Sequences.
*   **概念講解**：
    數列 $\{a_n\}$ 可以看作是一個定義域為正整數集合 $\{1, 2, 3, \dots\}$ 的函數 $f(n) = a_n$。
    *   **表示法**：通常記作 $a_1, a_2, a_3, \dots, a_n, \dots$ 或簡寫為 $\{a_n\}$ 或 $\{a_n\}_{n=1}^{\infty}$。
    *   **顯式公式 (Explicit Formula)**：直接給出 $a_n$ 關於 $n$ 的運算式，如 $a_n = \frac{n}{n+1}$。
    *   **遞迴關係 (Recurrence Relation)**：給出首項及後項與前項的關係，如 $a_1=1, a_{n+1} = \sqrt{a_n + 2}$。
*   **練習題與解答**：
    *   **練習題 10.1.1**：寫出數列 $a_n = \frac{(-1)^n n}{2n+1}$ 的前四項，並觀察其正負號特徵。
    *   **解答**：
        1. $a_1 = \frac{(-1)^1 (1)}{2(1)+1} = -\frac{1}{3}$
        2. $a_2 = \frac{(-1)^2 (2)}{2(2)+1} = \frac{2}{5}$
        3. $a_3 = \frac{(-1)^3 (3)}{2(3)+1} = -\frac{3}{7}$
        4. $a_4 = \frac{(-1)^4 (4)}{2(4)+1} = \frac{4}{9}$
        該數列是一個**交錯數列 (Alternating Sequence)**，正負號交替出現。

---

### 2. 數列的收斂與發散 (20 min) (KP10.2)
*   **課本對應**：Stewart Calculus Chapter 11 Section 11.1 - Sequences.
*   **概念講解**：
    數列 $\{a_n\}$ 收斂至極限 $L$ 的嚴謹定義（$\epsilon-N$ 定義）：
    對於任何給定的 $\epsilon > 0$，都存在一個對應的整數 $N$，使得當 $n > N$ 時，$|a_n - L| < \epsilon$。
    *   **收斂 (Convergent)**：若 $\lim_{n \to \infty} a_n = L$ (有限值)。
    *   **發散 (Divergent)**：若極限不存在或趨於 $\pm \infty$。
*   **練習題與解答**：
    *   **練習題 10.2.1**：判定數列 $a_n = \cos(n\pi)$ 是否收斂？
    *   **解答**：
        1. 當 $n=1, a_1 = \cos(\pi) = -1$。
        2. 當 $n=2, a_2 = \cos(2\pi) = 1$。
        3. 當 $n=3, a_3 = \cos(3\pi) = -1$。
        該數列在 $-1$ 與 $1$ 之間不斷震盪，並不趨近於任何單一固定值，故此數列**發散**。

---

### 3. 數列的極限運算律與羅必達法則 (20 min) (KP10.3)
*   **課本對應**：Stewart Calculus Chapter 11 Section 11.1 - Sequences.
*   **概念講解**：
    若 $\{a_n\}$ 與 $\{b_n\}$ 為收斂數列，則加減乘除的極限等於極限的加減乘除。
    *   **連續函數定理**：若 $\lim_{n \to \infty} a_n = L$ 且函數 $f$ 在 $L$ 處連續，則 $\lim_{n \to \infty} f(a_n) = f(L)$。
    *   **關聯函數法則**：若存在一個定義在 $[1, \infty)$ 上的函數 $f(x)$ 使得 $f(n) = a_n$，且 $\lim_{x \to \infty} f(x) = L$，則 $\lim_{n \to \infty} a_n = L$。這允許我們對數列使用**羅必達法則**。
*   **練習題與解答**：
    *   **練習題 10.3.1**：求 $\lim_{n \to \infty} \frac{\ln n}{n}$。
    *   **解答**：
        考慮連續函數 $f(x) = \frac{\ln x}{x}$。當 $x \to \infty$ 時，分子分母皆趨向 $\infty$，為 $\infty/\infty$ 型。
        套用羅必達法則：
        $$\lim_{x \to \infty} \frac{\ln x}{x} = \lim_{x \to \infty} \frac{1/x}{1} = 0$$
        因此，原數列極限 $\lim_{n \to \infty} \frac{\ln n}{n} = 0$。

---

### 4. 單調性與有界性 (20 min) (KP10.4)
*   **課本對應**：Stewart Calculus Chapter 11 Section 11.1 - Sequences.
*   **概念講解**：
    *   **單調數列 (Monotonic)**：若數列遞增 ($a_{n+1} \ge a_n$) 或遞減 ($a_{n+1} \le a_n$)。
    *   **有界數列 (Bounded)**：若存在 $M$ 使得 $|a_n| \le M$ 對所有 $n$ 成立。
    *   **單調收斂定理 (Monotone Convergence Theorem)**：一個數列若既是**單調**且又是**有界**的，則它必定**收斂**。這是證明許多遞迴數列收斂的核心工具。
*   **練習題與解答**：
    *   **練習題 10.4.1**：若 $a_1 = \sqrt{2}$ 且 $a_{n+1} = \sqrt{2 + a_n}$，已知此數列遞增且有上界 2，求其極限。
    *   **解答**：
        1. 根據單調收斂定理，極限 $L$ 存在。
        2. 對遞迴式兩邊取極限：$L = \sqrt{2 + L}$。
        3. 平方得 $L^2 = 2 + L \implies L^2 - L - 2 = 0 \implies (L-2)(L+1) = 0$。
        4. 因為 $a_n > 0$，故極限 $L = 2$。

---

### 5. 夾擠定理及其證明 (20 min) (KP10.5)
*   **課本對應**：Stewart Calculus Chapter 11 Section 11.1 - Sequences.
*   **概念講解**：
    **夾擠定理 (Squeeze Theorem)**：若存在整數 $N$ 使得對所有 $n > N$，滿足 $a_n \le b_n \le c_n$，且已知 $\lim_{n \to \infty} a_n = L$ 與 $\lim_{n \to \infty} c_n = L$，則 $\lim_{n \to \infty} b_n = L$。
*   **證明概要**：
    根據 $\epsilon-N$ 定義：
    1. 因為 $a_n \to L$，對於 $\epsilon > 0$，存在 $N_1$ 使得當 $n > N_1$ 時，$L - \epsilon < a_n$。
    2. 因為 $c_n \to L$，存在 $N_2$ 使得當 $n > N_2$ 時，$c_n < L + \epsilon$。
    3. 令 $N = \max(N_1, N_2, \text{夾擠開始的項})$，則當 $n > N$ 時：
       $$L - \epsilon < a_n \le b_n \le c_n < L + \epsilon$$
    4. 即 $|b_n - L| < \epsilon$，證明 $\lim b_n = L$。

    ![夾擠定理視覺化](img/week10_kp10_5.webp)

*   **練習題與解答**：
    *   **練習題 10.5.1**：求 $\lim_{n \to \infty} \frac{\sin^2 n}{2^n}$。
    *   **解答**：
        1. 我們知道 $0 \le \sin^2 n \le 1$。
        2. 因此，$0 \le \frac{\sin^2 n}{2^n} \le \frac{1}{2^n}$。
        3. 因為 $\lim_{n \to \infty} 0 = 0$ 且 $\lim_{n \to \infty} \frac{1}{2^n} = 0$。
        4. 根據夾擠定理，原式極限為 0。

---

## 二、 動手實作 (Lab) - 30 分鐘

### 實作：數列收斂性的視覺化與符號計算
本實作將使用 `SymPy` 進行極限計算，並利用 `Matplotlib` 繪製數列點圖以觀察收斂行為。

```python
import numpy as np
import matplotlib.pyplot as plt
import sympy as sp

# 1. 符號計算部分
n = sp.symbols('n')
a_n_expr = (3*n**2 + 5) / (2*n**2 - n)
limit_val = sp.limit(a_n_expr, n, sp.oo)
print(f"數列 (3n^2+5)/(2n^2-n) 當 n->oo 的極限為: {limit_val}")

# 2. 視覺化部分
def plot_sequence(formula_func, n_range, title, limit=None):
    n_vals = np.arange(1, n_range + 1)
    a_vals = [formula_func(nv) for nv in n_vals]
    
    plt.figure(figsize=(10, 5))
    plt.scatter(n_vals, a_vals, color='blue', label='a_n')
    if limit is not None:
        plt.axhline(y=limit, color='red', linestyle='--', label=f'Limit = {limit}')
    plt.title(title)
    plt.xlabel('n')
    plt.ylabel('Value')
    plt.legend()
    plt.grid(True)
    plt.show()

# 定義要繪製的數列函數
f1 = lambda n: (3*n**2 + 5) / (2*n**2 - n)
plot_sequence(f1, 50, r'Convergence of $a_n = \frac{3n^2+5}{2n^2-n}$', limit=1.5)

# 交錯數列範例
f2 = lambda n: ((-1)**n) / n
plot_sequence(f2, 50, r'Convergence of $a_n = \frac{(-1)^n}{n}$', limit=0)
```

---

## 三、 本週知識點回顧 (KP)
- **KP10.1**: 掌握數列的顯式公式與遞迴定義，學會列舉前幾項觀察規律。
- **KP10.2**: 理解收斂與發散的定義，特別是 $\epsilon-N$ 的邏輯概念。
- **KP10.3**: 熟練運用極限運算律與羅必達法則（需先轉化為連續函數）。
- **KP10.4**: 掌握單調性與有界性的判定方法，並能運用單調收斂定理求遞迴數列極限。
- **KP10.5**: 學會尋找適當的夾擠函數來解決包含震盪項或階乘項的數列極限。

---

## 四、 課後測驗題庫 (Quiz)

### 1. 單選題 (Single Choice)
1. **Q1**: 數列 $a_n = \frac{n!}{n^n}$ 當 $n \to \infty$ 時的極限為何？
   - (A) 1 (B) $e$ (C) 0 (D) $\infty$
2. **Q2**: 下列哪一個數列是單調遞增的？
   - (A) $a_n = 1/n$ (B) $a_n = \cos n$ (C) $a_n = \frac{n}{n+1}$ (D) $a_n = (-1)^n$
3. **Q3**: 若 $\lim_{n \to \infty} a_n = L$ 且 $L > 0$，則 $\lim_{n \to \infty} \ln(a_n)$ 等於？
   - (A) $\ln L$ (B) $L$ (C) $1/L$ (D) 不存在
4. **Q4**: $\lim_{n \to \infty} \frac{5^n}{n!}$ 的值為？
   - (A) 5 (B) 0 (C) $\infty$ (D) $1$
5. **Q5**: 數列 $a_n = (-1)^n \frac{n}{n+1}$ 的性質為何？
   - (A) 收斂至 1 (B) 收斂至 0 (C) 發散（震盪） (D) 發散至 $\infty$
6. **Q6**: 根據單調收斂定理，若數列 $a_n$ 遞減且有下界，則數列：
   - (A) 必定發散 (B) 必定收斂 (C) 趨向於 0 (D) 可能不存在極限
7. **Q7**: $\lim_{n \to \infty} \sqrt[n]{n}$ 的值為？
   - (A) 0 (B) 1 (C) $e$ (D) $\infty$
8. **Q8**: 數列 $a_n = \frac{\sin n}{n^2}$ 的極限可由何種定理求得？
   - (A) 羅必達法則 (B) 單調收斂定理 (C) 夾擠定理 (D) 積分檢定法
9. **Q9**: 若 $r = -0.5$，則幾何數列 $a_n = r^n$：
   - (A) 收斂至 0 (B) 收斂至 1 (C) 發散 (D) 收斂至 -0.5
10. **Q10**: 數列 $a_n = \frac{n^2 + \sin n}{2n^2 + 1}$ 的極限為？
    - (A) 0 (B) 1 (C) 1/2 (D) 2

### 2. 多選題 (Multiple Choice)
11. **Q11**: 下列關於數列的敘述，哪些正確？
    - (A) 收斂數列必有界 (B) 有界數列必收斂 (C) 單調且有界數列必收斂 (D) 若 $\lim a_n = 0$，則 $\lim |a_n| = 0$
12. **Q12**: 下列哪些數列發散？
    - (A) $a_n = \frac{(-1)^n n}{n+1}$ (B) $a_n = \ln n$ (C) $a_n = 0.9^n$ (D) $a_n = \sin(n\pi/2)$
13. **Q13**: 關於羅必達法則在數列極限的應用，正確的是？
    - (A) 可直接對 $a_n$ 的 $n$ 進行微分 (B) 需先假設存在對應的連續函數 $f(x)$ (C) 適用於 $0 \cdot \infty$ 型的轉化 (D) 只能用於正項數列
14. **Q14**: 哪些數列收斂至 0？
    - (A) $\frac{100^n}{n!}$ (B) $\frac{\ln n}{n^2}$ (C) $(1.01)^n$ (D) $\frac{\sin(n)}{n}$
15. **Q15**: 對於遞迴數列 $a_{n+1} = f(a_n)$，若已知其收斂至 $L$，則：
    - (A) $L$ 必須滿足 $L = f(L)$ (B) $f$ 必須在 $L$ 處連續 (C) 數列必須是單調的 (D) $L$ 可能是複數

### 3. 填充題 (Fill-in-the-blank)
16. **Q16**: 數列 $a_n = \frac{2n^3 - 1}{5n^3 + n^2}$ 的極限為 __________。
17. **Q17**: $\lim_{n \to \infty} (1 + \frac{2}{n})^n$ 的值為 __________。
18. **Q18**: 若 $a_n = \sqrt{n^2 + n} - n$，則其極限為 __________。
19. **Q19**: 數列 $a_n = \arctan(n)$ 當 $n \to \infty$ 時收斂至 __________。
20. **Q20**: 數列 $a_n = \frac{n^2}{e^n}$ 的極限為 __________。
21. **Q21**: 利用夾擠定理，可求得 $\lim_{n \to \infty} \frac{n!}{n^n}$ 為 __________。
22. **Q22**: 數列 $a_n = \ln(n+1) - \ln(n)$ 的極限為 __________。
23. **Q23**: 若數列 $a_n = r^n$ 收斂至非零常數，則 $r$ 必須等於 __________。
24. **Q24**: 數列 $\{1, 0, 1, 0, \dots\}$ 的一般項可寫為 $a_n = \frac{1 + (-1)^{n+?}}{2}$，其中 $?$ 為 __________。
25. **Q25**: 若 $a_n = \frac{\sin n}{n}$，則 $\lim_{n \to \infty} a_n = $ __________。
26. **Q26**: $\lim_{n \to \infty} \frac{3^n + 4^n}{5^n}$ 的值為 __________。
27. **Q27**: 單調收斂定理指出，一個數列若遞增且有 __________ 界，則必收斂。
28. **Q28**: $\lim_{n \to \infty} \sqrt[n]{3^n + 2^n}$ 的值為 __________。
29. **Q29**: 數列 $a_n = \frac{(n+1)!}{n!}$ 的極限為 __________。
30. **Q30**: 根據 $\epsilon-N$ 定義，極限 $L$ 代表當 $n$ 足夠大時，$a_n$ 與 $L$ 的 __________ 可以任意小。

---

## 五、 Q 矩陣 (Q-matrix)

| 題號 | KP10.1 | KP10.2 | KP10.3 | KP10.4 | KP10.5 |
|---|---|---|---|---|---|
| Q1-Q5 | 1,1,0,0,1 | 0,0,1,0,1 | 0,0,1,1,0 | 0,1,0,0,0 | 1,0,0,0,0 |
| Q6-Q10 | 0,0,0,0,0 | 1,1,0,1,0 | 0,0,0,0,1 | 1,0,0,0,0 | 0,0,1,0,1 |
| Q11-Q15| 0,0,1,0,1 | 1,1,0,1,0 | 0,0,1,1,1 | 1,0,0,0,0 | 0,0,0,0,0 |
| Q16-Q30| ...隨題目分佈... | | | | |
*(註：詳細對應請參閱教師手冊)*
