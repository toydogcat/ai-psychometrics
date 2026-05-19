import os
import re
import json

def parse_markdown(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Define knowledge points for Week 1 (from week1.md)
    # - KP1.1: Python 直譯器 (Interpreter) 運作原理。
    # - KP1.2: 雲端環境 (Google Colab, Jupyter) 與 .ipynb 格式。
    # - KP1.3: 本地環境管理 (Anaconda, uv, venv)。
    # - KP1.4: uv 工具的高級應用 (Python 版本管理、專案初始化)。
    # - KP1.5: print() 進階格式化與 input() 互動。
    # - KP1.6: PEP 8 規範、註解與代碼縮進。
    kps = {
        "KP1.1": "Python 直譯器運作原理",
        "KP1.2": "雲端環境 (Colab, Jupyter)",
        "KP1.3": "本地環境管理 (Anaconda, venv)",
        "KP1.4": "uv 專案管理器高級應用",
        "KP1.5": "print 與 input 進階互動",
        "KP1.6": "PEP 8 規範與代碼縮進"
    }

    # 1. Parse Q-matrix
    q_matrix = {}
    q_matrix_matches = re.findall(r'\|\s*(Q\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|', content)
    for m in q_matrix_matches:
        q_id = m[0]
        q_matrix[q_id] = [int(x) for x in m[1:]]

    questions = []
    
    # 2. Parse Single Choice (Q1 - Q10)
    # Format:
    # 1. **Q1**: Python 是一種什麼類型的程式語言？
    #    - (A) 編譯式 (Compiled) (B) 直譯式 (Interpreted) (C) 組合語言 (D) 機器語言
    #    - *答案*: B (KP1.1)
    single_choice_sec = re.search(r'### 1\. 單選題.*?(?=### 2\. 多選題)', content, re.DOTALL)
    if single_choice_sec:
        items = re.findall(r'\d+\.\s*\*\*(Q\d+)\*\*:\s*(.*?)\n\s*-\s*\(A\)(.*?)\(B\)(.*?)\(C\)(.*?)\(D\)(.*?)\n\s*-\s*\*答案\*:\s*([A-D])\s*\((.*?)\)', single_choice_sec.group(0))
        for q_id, title, a, b, c, d, ans, kp in items:
            questions.append({
                "id": q_id,
                "type": "single",
                "title": title.strip(),
                "options": {
                    "A": a.strip(),
                    "B": b.strip(),
                    "C": c.strip(),
                    "D": d.strip()
                },
                "answer": ans.strip(),
                "kp": kp.strip(),
                "q_vector": q_matrix.get(q_id, [0]*6)
            })

    # 3. Parse Multiple Choice (Q11 - Q20)
    # Format:
    # 1. **Q11**: 關於 Google Colab 的優點，哪些描述正確？
    #    - (A) 免費提供 GPU/TPU 資源 (B) 無需配置本地環境 (C) 可與 Google Drive 整合 (D) 離線狀態下也能完美執行代碼
    #    - *答案*: A, B, C (KP1.2)
    multi_choice_sec = re.search(r'### 2\. 多選題.*?(?=### 3\. 填充題)', content, re.DOTALL)
    if multi_choice_sec:
        items = re.findall(r'\d+\.\s*\*\*(Q\d+)\*\*:\s*(.*?)\n\s*-\s*\(A\)(.*?)\(B\)(.*?)\(C\)(.*?)\(D\)(.*?)\n\s*-\s*\*答案\*:\s*([A-D,\s]+)\s*\((.*?)\)', multi_choice_sec.group(0))
        for q_id, title, a, b, c, d, ans, kp in items:
            ans_list = [x.strip() for x in ans.split(',')]
            questions.append({
                "id": q_id,
                "type": "multiple",
                "title": title.strip(),
                "options": {
                    "A": a.strip(),
                    "B": b.strip(),
                    "C": c.strip(),
                    "D": d.strip()
                },
                "answer": ans_list,
                "kp": kp.strip(),
                "q_vector": q_matrix.get(q_id, [0]*6)
            })

    # 4. Parse Fill-in-the-blank (Q21 - Q30)
    # Format:
    # 1. **Q21**: Python 官方推薦的編碼風格指南代號為 __________。
    #    - *答案*: PEP 8 (KP1.6)
    fill_sec = re.search(r'### 3\. 填充題.*?(?=## 五、 Q 矩陣)', content, re.DOTALL)
    if fill_sec:
        items = re.findall(r'\d+\.\s*\*\*(Q\d+)\*\*:\s*(.*?)\n\s*-\s*\*答案\*:\s*(.*?)\s*\((.*?)\)', fill_sec.group(0))
        for q_id, title, ans, kp in items:
            # clean up raw answer if it contains text like "(或 Interpreted)"
            # we will store the exact answer
            questions.append({
                "id": q_id,
                "type": "fill",
                "title": title.strip(),
                "answer": ans.strip(),
                "kp": kp.strip(),
                "q_vector": q_matrix.get(q_id, [0]*6)
            })

    return {
        "course": "python",
        "week": "week1",
        "title": "Python 環境生態、雲端開發與現代化工具鏈",
        "knowledge_points": kps,
        "questions": questions
    }

if __name__ == "__main__":
    src_file = "/home/toymsi/documents/python學習/course1/week1.md"
    output_dir = "/home/toymsi/documents/python學習/Github/ai-psychometrics/public/data"
    os.makedirs(output_dir, exist_ok=True)
    
    quiz_data = parse_markdown(src_file)
    output_file = os.path.join(output_dir, "python_week1.json")
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(quiz_data, f, ensure_ascii=False, indent=2)
        
    print(f" Successfully converted week1.md to {output_file}")
    print(f"Parsed {len(quiz_data['questions'])} questions.")
