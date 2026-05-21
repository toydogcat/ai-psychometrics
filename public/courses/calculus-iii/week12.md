# 課程：微積分下 - 第 12 週 - 柱座標與球座標 (Cylindrical & Spherical Coordinates)

本文件包含了第 12 週的完整教學大綱、實作指南以及擴充版練習題庫。本週重點在於掌握三維空間中兩種最重要的非直角座標系統，這對於處理具有對稱性的實體積分（如圓柱、球體、圓錐）至關重要。
本週教學內容對應 **Stewart Calculus Ch 15.7-15.8**。

---

## 一、 單元講解 (Lecture) - 總計 100 分鐘

### 1. 柱座標系統與積分 (20 min) (KP12.1)
*   **概念講解**：
    柱座標系統 $(r, \theta, z)$ 是將 $xy$ 平面的極座標推廣到三維。
    轉換關係：$x = r \cos \theta, \quad y = r \sin \theta, \quad z = z$。
*   **體積元素 $dV$**：
    與極座標類似，面積元素 $dA = r dr d\theta$，故體積元素為：
    $$dV = r \, dz dr d\theta$$
*   **適用場景**：當物體對 $z$ 軸具有對稱性（如圓柱、拋物面）時。
*   **練習題**：
    *   **練習題 12.1.1**：計算 $\iiint_E \sqrt{x^2+y^2} \, dV$，其中 $E$ 是由 $x^2+y^2=16$ 且 $z=1$ 到 $z=5$ 圍成的圓柱體。
    *   **解答**：
        在柱座標中，$\sqrt{x^2+y^2} = r$。
        $$\int_0^{2\pi} \int_0^4 \int_1^5 (r) \cdot r \, dz dr d\theta = \int_0^{2\pi} d\theta \cdot \int_0^4 r^2 dr \cdot \int_1^5 dz = 2\pi \cdot \frac{64}{3} \cdot 4 = \frac{512\pi}{3}$$

---

### 2. 柱座標計算範例 (20 min) (KP12.2)
*   **概念講解**：
    處理交界區域，例如圓柱內部與球體內部的交集。
*   **練習題**：
    *   **練習題 12.2.1**：求由圓錐 $z = \sqrt{x^2+y^2}$ 與平面 $z = 2$ 圍成的實體體積。
    *   **解答**：
        柱座標下，圓錐為 $z = r$。$z$ 從 $r$ 到 $2$。$r$ 從 $0$ 到 $2$（因為 $r=z=2$）。
        $$V = \int_0^{2\pi} \int_0^2 \int_r^2 r \, dz dr d\theta = 2\pi \int_0^2 (2r - r^2) dr = 2\pi [r^2 - \frac{1}{3}r^3]_0^2 = 2\pi (4 - \frac{8}{3}) = \frac{8\pi}{3}$$

---

### 3. 球座標系統定義與雅可比 (20 min) (KP12.3)
*   **概念講解**：
    球座標系統 $(\rho, \phi, \theta)$：
    *   $\rho$：點到原點的距離 ($0 \le \rho < \infty$)。
    *   $\phi$：極徑與正 $z$ 軸的夾角 ($0 \le \phi \le \pi$)。
    *   $\theta$：在 $xy$ 平面上的投影角度 ($0 \le \theta \le 2\pi$)。
*   **轉換公式**：
    $x = \rho \sin \phi \cos \theta, \quad y = \rho \sin \phi \sin \theta, \quad z = \rho \cos \phi$。
    其中 $x^2 + y^2 + z^2 = \rho^2$。
*   **雅可比行列式推導**：
    $$dV = \rho^2 \sin \phi \, d\rho d\phi d\theta$$
    **核心提示：不要漏掉 $\rho^2 \sin \phi$！**

---

### 4. 球座標下的三重積分 (20 min) (KP12.4)
*   **概念講解**：
    球座標最適合邊界為球體或圓錐的區域。
*   **練習題**：
    *   **練習題 12.4.1**：計算單位球體 $x^2+y^2+z^2 \le 1$ 的體積。
    *   **解答**：
        $$\int_0^{2\pi} \int_0^{\pi} \int_0^1 (\rho^2 \sin \phi) \, d\rho d\phi d\theta = \int_0^{2\pi} d\theta \cdot \int_0^{\pi} \sin \phi \, d\phi \cdot \int_0^1 \rho^2 d\rho$$
        $$= 2\pi \cdot [-\cos \phi]_0^{\pi} \cdot [\frac{1}{3}\rho^3]_0^1 = 2\pi \cdot 2 \cdot \frac{1}{3} = \frac{4}{3}\pi$$

---

### 5. 座標系統選擇策略 (20 min) (KP12.5)
*   **策略總結**：
    1.  **直角座標**：區域為盒子、四面體或由平面圍成。
    2.  **柱座標**：區域繞 $z$ 軸對稱（圓柱、拋物面），被積函數含 $x^2+y^2$。
    3.  **球座標**：區域繞原點對稱（球體、圓錐），被積函數含 $x^2+y^2+z^2$。
*   **練習題**：
    *   **練習題 12.5.1**：判定 $\iiint_E e^{(x^2+y^2+z^2)^{3/2}} \, dV$ 應使用何種座標？（$E$ 為球體）
    *   **解答**：球座標。

---

## 二、 動手實作 (Lab) - 總計 50 分鐘

### 實作：座標轉換函數編寫與視覺化
**任務目標**：編寫 Python 函數進行座標轉換，並計算不同座標下的積分。

```python
import numpy as np
from scipy.integrate import tplquad

# 1. 球座標轉換函數
def spherical_to_cartesian(rho, phi, theta):
    x = rho * np.sin(phi) * np.cos(theta)
    y = rho * np.sin(phi) * np.sin(theta)
    z = rho * np.cos(phi)
    return x, y, z

# 2. 計算由 z = sqrt(x^2 + y^2) 到 z = sqrt(3(x^2 + y^2)) 且在球 rho = 1 內的體積
# 圓錐 z = sqrt(x^2 + y^2) 對應 phi = pi/4
# 圓錐 z = sqrt(3(x^2 + y^2)) 對應 phi = pi/6 (因 tan(phi) = r/z = 1/sqrt(3))
# 積分: iint iint iint rho^2 sin(phi) drho dphi dtheta

def f_vol(rho, phi, theta):
    return rho**2 * np.sin(phi)

vol, err = tplquad(f_vol, 0, 2*np.pi, 
                   lambda t: np.pi/6, lambda t: np.pi/4, 
                   lambda t, p: 0, lambda t, p: 1)

print(f"特定圓錐間區域體積: {vol:.6f}")
```

---

## 三、 本週知識點回顧 (KP)
- **KP12.1**: 掌握柱座標定義與 $dV = r dz dr d\theta$。
- **KP12.2**: 應用柱座標解決圓柱對稱問題。
- **KP12.3**: 理解球座標 $(\rho, \phi, \theta)$ 及其幾何意義。
- **KP12.4**: 掌握球座標 $dV = \rho^2 \sin \phi d\rho d\phi d\theta$ 並能計算球形區域積分。
- **KP12.5**: 根據問題特徵選擇最有效率的座標系統。

---

## 四、 課後測驗題庫 (Quiz) - 30 分鐘

### 1. 單選題 (Single Choice) - 10 題
1. **Q1**: 柱座標中的 $r$ 代表什麼？
   (A) 到原點的距離 (B) 到 $z$ 軸的距離 (C) 到 $xy$ 平面的距離 (D) 角度
2. **Q2**: 球座標中的 $\phi$ 取值範圍是？
   (A) $0 \le \phi \le 2\pi$ (B) $0 \le \phi \le \pi/2$ (C) $0 \le \phi \le \pi$ (D) $-\pi/2 \le \phi \le \pi/2$
3. **Q3**: 下列何者是球座標下的體積元素 $dV$？
   (A) $\rho \sin \phi d\rho d\phi d\theta$ (B) $\rho^2 \sin \phi d\rho d\phi d\theta$ (C) $\rho^2 \cos \phi d\rho d\phi d\theta$ (D) $r dr d\theta dz$
4. **Q4**: 柱座標下，方程式 $r = 2$ 代表什麼？
   (A) 圓 (B) 球 (C) 圓柱 (D) 平面
5. **Q5**: 球座標下，方程式 $\phi = \pi/4$ 代表什麼？
   (A) 平面 (B) 圓錐 (C) 球面 (D) 圓柱
6. **Q6**: 點 $(0, 0, 1)$ 在球座標中的 $(\rho, \phi, \theta)$ 為？
   (A) $(1, 0, 0)$ (B) $(1, \pi/2, 0)$ (C) $(1, \pi, 0)$ (D) $(1, 0, \pi)$
7. **Q7**: 計算 $\iiint_E e^{x^2+y^2+z^2} dV$ 時，首選座標系為？
   (A) 直角 (B) 柱 (C) 球 (D) 極
8. **Q8**: 在柱座標轉直角座標中，$x^2+y^2$ 等於？
   (A) $r$ (B) $r^2$ (C) $\rho^2 \sin^2 \phi$ (D) $z^2$
9. **Q9**: $\iiint_E 1 dV$ 在球座標中，若區域是單位球，則對 $\rho$ 的積分限為？
   (A) $0 \to 1$ (B) $0 \to \pi$ (C) $0 \to 2\pi$ (D) $-1 \to 1$
10. **Q10**: 柱座標與球座標中，哪一個變數的定義是一樣的？
    (A) $r$ 與 $\rho$ (B) $\theta$ (C) $z$ (D) $\phi$

### 2. 多選題 (Multiple Choice) - 10 題
11. **Q11**: 下列關於球座標轉換公式，哪些正確？
    (A) $z = \rho \cos \phi$ (B) $r = \rho \sin \phi$ (C) $x = r \cos \theta$ (D) $x^2+y^2+z^2 = \rho^2$
12. **Q12**: 哪些區域適合使用柱座標處理？
    (A) $x^2+y^2 \le 4, 0 \le z \le 3$ (B) $z = x^2+y^2$ 下方的區域 (C) $x^2+y^2+z^2 \le 9$ (D) 矩形盒子
13. **Q13**: 關於球座標體積元素 $dV = \rho^2 \sin \phi d\rho d\phi d\theta$：
    (A) $\rho^2$ 來自於 Jacobian 行列式 (B) $\sin \phi$ 確保在極點附近體積元素縮小 (C) 它是標量 (D) 它可以寫成 $r dr d\theta dz$
14. **Q14**: 方程式 $\rho = 2\cos \phi$ 代表：
    (A) 球面 (B) 通過原點 (C) 圓心在 $(0, 0, 1)$ (D) 半徑為 1
15. **Q15**: 哪些物理量在非直角座標下計算更簡單？
    (A) 圓柱的轉動慣量 (B) 球對稱電荷分佈的電位 (C) 正方體的質量 (D) 圓錐的重心
16. **Q16**: 關於 $\theta$ 的取值範圍，哪些敘述正確？
    (A) 在柱座標中通常是 $0$ 到 $2\pi$ (B) 在球座標中通常是 $0$ 到 $2\pi$ (C) 它是方位角 (Azimuthal angle) (D) 它是天頂角 (Zenith angle)
17. **Q17**: 哪些變換會導致體積元素中出現 $r$？
    (A) 二重積分極座標 (B) 三重積分柱座標 (C) 三重積分球座標 (D) 線積分
18. **Q18**: 若區域對 $xy$ 平面對稱，則在球座標積分中：
    (A) $\phi$ 的範圍可能是 $0$ 到 $\pi/2$ 的兩倍 (B) 質心 $\bar{z}$ 可能為 0 (C) $\theta$ 範圍必為 $0 \to \pi$ (D) $\rho$ 恆為常數
19. **Q19**: 下列哪些函數在球座標下顯得簡潔？
    (A) $1/\sqrt{x^2+y^2+z^2}$ (B) $z$ (C) $x^2+y^2$ (D) $\exp(-(x^2+y^2+z^2))$
20. **Q20**: 在處理圓錐 $z = \sqrt{3(x^2+y^2)}$ 時：
    (A) 柱座標下 $z = \sqrt{3}r$ (B) 球座標下 $\phi = \pi/6$ (C) 球座標下 $\phi = \pi/3$ (D) $\theta$ 範圍為 $0 \to 2\pi$

### 3. 填充題 (Fill-in-the-blank) - 10 題
21. **Q21**: 直角座標 $(1, 1, \sqrt{2})$ 轉換為球座標 $(\rho, \phi, \theta)$ 為 $\underline{\quad\quad}$。
22. **Q22**: 柱座標體積元素 $dV = \underline{\quad\quad}$。
23. **Q23**: 球座標中，$\rho^2 = \underline{\quad\quad}$ (以 $x, y, z$ 表示)。
24. **Q24**: 積分 $\int_0^{2\pi} \int_0^{\pi} \int_0^R \rho^2 \sin \phi \, d\rho d\phi d\theta$ 的結果為 $\underline{\quad\quad}$。
25. **Q25**: 若 $\phi = \pi/2$，則點必位於 $\underline{\quad\quad}$ 平面上。
26. **Q26**: 柱座標下，$x = \underline{\quad\quad}$。
27. **Q27**: 球座標雅可比行列式的值為 $\underline{\quad\quad}$ (取絕對值)。
28. **Q28**: 圓柱 $x^2 + y^2 = 9$ 且 $0 \le z \le 5$ 的體積為 $\underline{\quad\quad}$。
29. **Q29**: 在球座標中，$\int_0^{\pi} \sin \phi \, d\phi = \underline{\quad\quad}$。
30. **Q30**: 若要計算球體 $x^2+y^2+z^2 \le 4$ 內在圓錐 $z \ge \sqrt{x^2+y^2}$ 上方的體積，球座標 $\phi$ 的上限為 $\underline{\quad\quad}$。

---

## 五、 Q 矩陣 (Q-matrix)
| 題號 | KP12.1 | KP12.2 | KP12.3 | KP12.4 | KP12.5 |
|---|---|---|---|---|---|
| Q1-Q10 | 1, 4, 8, 10 | 12 | 2, 3, 6 | 9 | 5, 7 |
| Q11-Q20| 11, 17 | 15 | 13, 16 | 14, 18, 19 | 20 |
| Q21-Q30| 22, 26, 28| | 21, 23, 25, 27 | 24, 29 | 30 |
