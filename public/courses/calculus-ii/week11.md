# 課程：微積分中 - 第 11 週 - 級數導論 (Series Introduction)

本週將探討無窮級數 (Infinite Series) 的基本概念。級數是將數列的每一項無止境地相加，這聽起來可能導致無限大，但在特定條件下，這些無窮項的和會趨於一個有限值。本週的核心在於學習多種**收斂檢定法 (Convergence Tests)**，這對判斷物理模型或數值演算法的穩定性至關重要。本週內容對應 **Stewart Calculus (Metric Edition) Chapter 11 Section 11.2 - 11.6**。

---

## 一、 單元講解 (Lecture) - 總計 100 分鐘

### 1. 級數的定義與部分和 (20 min) (KP11.1)
*   **課本對應**：Stewart Calculus Section 11.2.
*   **概念講解**：
    給定數列 $\{a_n\}$，其無窮級數表示為 $\sum_{n=1}^{\infty} a_n = a_1 + a_2 + a_3 + \dots$。
    *   **部分和 (Partial Sums)**：$S_k = \sum_{n=1}^k a_n = a_1 + a_2 + \dots + a_k$。
    *   **收斂性**：若部分和數列 $\{S_k\}$ 收斂至 $S$ (即 $\lim_{k \to \infty} S_k = S$)，則稱該級數**收斂**，其和為 $S$。否則稱為**發散**。
*   **練習題與解答**：
    *   **練習題 11.1.1**：考慮望遠鏡級數 (Telescoping Series) $\sum_{n=1}^{\infty} \frac{1}{n(n+1)}$，求其部分和 $S_k$ 與總和。
    *   **解答**：
        1. 使用部分分式分解：$\frac{1}{n(n+1)} = \frac{1}{n} - \frac{1}{n+1}$。
        2. $S_k = (1 - \frac{1}{2}) + (\frac{1}{2} - \frac{1}{3}) + \dots + (\frac{1}{k} - \frac{1}{k+1}) = 1 - \frac{1}{k+1}$。
        3. $\lim_{k \to \infty} S_k = \lim_{k \to \infty} (1 - \frac{1}{k+1}) = 1$。
        該級數收斂至 1。

---

### 2. 幾何級數與發散檢定法 (20 min) (KP11.2)
*   **課本對應**：Stewart Calculus Section 11.2.
*   **概念講解**：
    *   **幾何級數 (Geometric Series)**：$\sum_{n=1}^{\infty} ar^{n-1} = a + ar + ar^2 + \dots$
        *   若 $|r| < 1$，收斂至 $S = \frac{a}{1-r}$。
        *   若 $|r| \ge 1$，發散。
    *   **發散檢定法 (Test for Divergence)**：若 $\lim_{n \to \infty} a_n \neq 0$ (或極限不存在)，則級數 $\sum a_n$ 必定發散。
*   **證明概要 (Divergence Test)**：
    1. 假設級數 $\sum a_n$ 收斂，其和為 $S$。
    2. 這意味著部分和 $S_n \to S$ 且 $S_{n-1} \to S$。
    3. 因為 $a_n = S_n - S_{n-1}$。
    4. 則 $\lim_{n \to \infty} a_n = \lim_{n \to \infty} (S_n - S_{n-1}) = S - S = 0$。
    5. 逆否命題即為：若 $\lim a_n \neq 0$，則級數必不收斂。
*   **練習題與解答**：
    *   **練習題 11.2.1**：判定 $\sum_{n=1}^{\infty} \frac{n^2}{5n^2+4}$ 的收斂性。
    *   **解答**：
        計算一般項極限：$\lim_{n \to \infty} \frac{n^2}{5n^2+4} = \frac{1}{5} \neq 0$。
        根據發散檢定法，該級數發散。

---

### 3. 積分檢定法與 P-級數 (20 min) (KP11.3)
*   **課本對應**：Stewart Calculus Section 11.3.
*   **概念講解**：
    *   **積分檢定法 (Integral Test)**：設 $f$ 是 $[1, \infty)$ 上連續、正項且遞減的函數，並令 $a_n = f(n)$。則 $\sum a_n$ 與 $\int_1^{\infty} f(x) dx$ 同時收斂或同時發散。
    *   **P-級數 (p-series)**：$\sum_{n=1}^{\infty} \frac{1}{n^p}$。
        *   若 $p > 1$，收斂。
        *   若 $p \le 1$，發散。 (特別地，$p=1$ 時稱為**調和級數 Harmonic Series**)。
*   **練習題與解答**：
    *   **練習題 11.3.1**：判定 $\sum_{n=1}^{\infty} \frac{1}{n^2+1}$ 是否收斂。
    *   **解答**：
        考慮 $f(x) = \frac{1}{x^2+1}$。
        計算瑕積分：$\int_1^{\infty} \frac{1}{x^2+1} dx = \lim_{t \to \infty} [\arctan x]_1^t = \frac{\pi}{2} - \frac{\pi}{4} = \frac{\pi}{4}$。
        積分收斂，故級數亦收斂。

---

### 4. 比較檢定法 (20 min) (KP11.4)
*   **課本對應**：Stewart Calculus Section 11.4.
*   **概念講解**：
    *   **直接比較檢定法 (Direct Comparison Test)**：若 $0 \le a_n \le b_n$：
        *   若 $\sum b_n$ 收斂，則 $\sum a_n$ 亦收斂。
        *   若 $\sum a_n$ 發散，則 $\sum b_n$ 亦發散。
    *   **極限比較檢定法 (Limit Comparison Test)**：若 $\lim_{n \to \infty} \frac{a_n}{b_n} = C > 0$，則兩級數行為一致。
*   **練習題與解答**：
    *   **練習題 11.4.1**：判定 $\sum_{n=1}^{\infty} \frac{2n^2+3n}{5n^4-7}$ 的收斂性。
    *   **解答**：
        當 $n$ 很大時，一般項約為 $\frac{2n^2}{5n^4} = \frac{2}{5n^2}$。
        取 $b_n = \frac{1}{n^2}$ (收斂的 p-級數)。
        $\lim_{n \to \infty} \frac{a_n}{b_n} = \lim_{n \to \infty} \frac{2n^4+3n^3}{5n^4-7} = \frac{2}{5} > 0$。
        故原級數收斂。

---

### 5. 交錯級數與絕對收斂 (20 min) (KP11.5)
*   **課本對應**：Stewart Calculus Section 11.5 - 11.6.
*   **概念講解**：
    *   **交錯級數檢定法 (Alternating Series Test)**：對於 $\sum (-1)^{n-1} b_n$ ($b_n > 0$)，若滿足 (1) $b_{n+1} \le b_n$ 且 (2) $\lim b_n = 0$，則級數收斂。
    *   **絕對收斂 (Absolute Convergence)**：若 $\sum |a_n|$ 收斂。
    *   **條件收斂 (Conditional Convergence)**：若 $\sum a_n$ 收斂但 $\sum |a_n|$ 發散。
*   **練習題與解答**：
    *   **練習題 11.5.1**：判定交錯調和級數 $\sum_{n=1}^{\infty} \frac{(-1)^{n-1}}{n}$ 是絕對收斂還是條件收斂？
    *   **解答**：
        1. 根據交錯級數檢定法，其項 $1/n$ 遞減且趨於 0，故級數收斂。
        2. 取絕對值後為 $\sum 1/n$ (調和級數)，發散。
        3. 因此該級數為**條件收斂**。

---

## 二、 動手實作 (Lab) - 30 分鐘

### 實作：級數部分和的數值逼近
我們將觀察幾何級數與調和級數的部分和增長趨勢。

```python
import numpy as np
import matplotlib.pyplot as plt

def plot_partial_sums(a_func, n_max, title):
    n_vals = np.arange(1, n_max + 1)
    a_vals = [a_func(n) for n in n_vals]
    s_vals = np.cumsum(a_vals)
    
    plt.figure(figsize=(10, 5))
    plt.step(n_vals, s_vals, where='mid', label='Partial Sum $S_k$')
    plt.title(title)
    plt.xlabel('k')
    plt.ylabel('Sum')
    plt.grid(True)
    plt.legend()
    plt.show()

# 1. 幾何級數: a = 1, r = 0.5 (收斂至 2)
plot_partial_sums(lambda n: 0.5**(n-1), 20, 'Geometric Series (r=0.5) Summation')

# 2. 調和級數: a_n = 1/n (發散)
plot_partial_sums(lambda n: 1/n, 100, 'Harmonic Series Summation (Divergent)')
```

---

## 三、 本週知識點回顧 (KP)
- **KP11.1**: 理解級數收斂的本質是其部分和數列的極限。
- **KP11.2**: 熟記幾何級數公式，並學會先用發散檢定法排除明顯不收斂的項。
- **KP11.3**: 學會將級數轉化為瑕積分，並掌握 $p$-級數這個基準工具。
- **KP11.4**: 掌握「找老大」的技巧進行比較檢定。
- **KP11.5**: 區分絕對收斂與條件收斂，並學會處理交錯號級數。

---

## 四、 課後測驗題庫 (Quiz)

### 1. 單選題 (Single Choice)
1. **Q1**: 級數 $\sum_{n=1}^{\infty} \frac{3^n}{2^n}$ 是收斂還是發散？
   - (A) 收斂至 3 (B) 收斂至 2 (C) 發散 (D) 條件收斂
2. **Q2**: 下列何者為發散級數？
   - (A) $\sum \frac{1}{n^2}$ (B) $\sum \frac{1}{\sqrt{n}}$ (C) $\sum e^{-n}$ (D) $\sum \frac{(-1)^n}{n^2}$
3. **Q3**: 若 $\sum a_n$ 收斂，則 $\lim_{n \to \infty} a_n$ 必定為？
   - (A) 1 (B) 0 (C) $\infty$ (D) 無法確定
4. **Q4**: 級數 $\sum_{n=1}^{\infty} 5 \cdot (0.8)^{n-1}$ 的和為？
   - (A) 25 (B) 20 (C) 6.25 (D) 40
5. **Q5**: 使用極限比較檢定法判斷 $\sum \frac{n+1}{n^3-n}$ 時，最適合選取哪個比較對象？
   - (A) $\sum 1/n$ (B) $\sum 1/n^2$ (C) $\sum 1/n^3$ (D) $\sum (1.1)^n$
6. **Q6**: 對於級數 $\sum \frac{(-1)^n}{\ln n}$ ($n \ge 2$)：
   - (A) 絕對收斂 (B) 條件收斂 (C) 發散 (D) 以上皆非
7. **Q7**: 積分檢定法要求函數 $f(x)$ 必須滿足：
   - (A) 正項、連續、遞增 (B) 正項、連續、遞減 (C) 震盪 (D) 無界
8. **Q8**: 下列哪一個級數的收斂性質與 $\sum \frac{1}{n^2}$ 相同？
   - (A) $\sum \frac{1}{n}$ (B) $\sum \frac{n}{n^3+1}$ (C) $\sum \frac{1}{\sqrt{n}}$ (D) $\sum \frac{\ln n}{n}$
9. **Q9**: 比值檢定法 (Ratio Test) 中，若 $\lim |a_{n+1}/a_n| = 1$，則：
   - (A) 級數收斂 (B) 級數發散 (C) 無法判定 (D) 絕對收斂
10. **Q10**: 級數 $\sum_{n=1}^{\infty} \frac{1}{n!}$：
    - (A) 發散 (B) 收斂 (C) 條件收斂 (D) 震盪

### 2. 多選題 (Multiple Choice)
11. **Q11**: 下列哪些級數是收斂的？
    - (A) $\sum \frac{\sin n}{n^2}$ (B) $\sum \frac{1}{n^{1.001}}$ (C) $\sum \frac{n!}{10^n}$ (D) $\sum (-1)^n \frac{1}{\sqrt{n}}$
12. **Q12**: 關於絕對收斂，哪些敘述正確？
    - (A) 若級數絕對收斂，則它本身一定收斂 (B) 絕對收斂級數的項可以任意重排而不改變和 (C) 調和級數是絕對收斂的 (D) 幾何級數 $|r|<1$ 是絕對收斂的
13. **Q13**: 哪些方法可用於判定正項級數的發散？
    - (A) 發散檢定法 (B) 積分檢定法 (C) 交錯級數檢定法 (D) 比較檢定法
14. **Q14**: 考慮級數 $\sum a_n$，若 $\lim a_n = 0$，則：
    - (A) 級數一定收斂 (B) 級數可能收斂 (C) 級數可能發散 (D) 級數一定發散
15. **Q15**: 哪些級數的和可以用公式直接算出？
    - (A) 幾何級數 (B) 望遠鏡級數 (C) 調和級數 (D) 任意交錯級數

### 3. 填充題 (Fill-in-the-blank)
16. **Q16**: $\sum_{n=1}^{\infty} \frac{1}{3^n}$ 的和為 __________。
17. **Q17**: 級數 $\sum \frac{1}{n^p}$ 在 $p \le 1$ 時 __________。
18. **Q18**: 若 $\sum a_n$ 絕對收斂，則 $\sum a_n \sin n$ 必定 __________。
19. **Q19**: 使用比值檢定法，$\sum \frac{2^n}{n!}$ 的極限比值 $\rho = $ __________。
20. **Q20**: 交錯調和級數 $1 - 1/2 + 1/3 - \dots$ 是 __________ 收斂的。
21. **Q21**: $\sum_{n=1}^{\infty} \frac{4}{n(n+2)}$ 的和為 __________。
22. **Q22**: 根據發散檢定法，$\lim_{n \to \infty} \frac{n}{n+1} = 1 \neq 0$，故 $\sum \frac{n}{n+1}$ __________。
23. **Q23**: 級數 $\sum_{n=1}^{\infty} \frac{\ln n}{n}$ 的收斂性可透過 __________ 檢定法輕易判定。
24. **Q24**: 若 $\sum b_n$ 收斂且 $0 \le a_n \le b_n$，則 $\sum a_n$ __________。
25. **Q25**: 若 $\sum a_n$ 與 $\sum b_n$ 均收斂，則 $\sum (2a_n - 3b_n)$ __________。
26. **Q26**: $\sum_{n=1}^{\infty} \frac{1}{n^{1/2}}$ 被稱為 __________ 級數，它是發散的。
27. **Q27**: $\sum_{n=1}^{\infty} (-1)^{n+1} \frac{1}{n^2}$ 是 __________ 收斂的。
28. **Q28**: $\sum_{n=1}^{\infty} \frac{2^n + 3^n}{4^n}$ 的和為 __________。
29. **Q29**: 調和級數的前 $10^{10}$ 項之和是有限的，但無窮項之和為 __________。
30. **Q30**: 比值檢定法主要適用於包含 __________ 或指數函數的級數。

---

## 五、 Q 矩陣 (Q-matrix)

| 題號 | KP11.1 | KP11.2 | KP11.3 | KP11.4 | KP11.5 | | |
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


