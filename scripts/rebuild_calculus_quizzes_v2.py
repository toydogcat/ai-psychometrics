import os
import re
import json

def parse_week_md(filepath):
    if not os.path.exists(filepath):
        return []
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Flexible Quiz section header
    quiz_patterns = [
        r'## .*?測驗.*?(?:\n|$)',
        r'## \d+\. 測驗.*?'
    ]
    
    quiz_content = None
    for pattern in quiz_patterns:
        match = re.search(pattern, content, re.IGNORECASE)
        if match:
            quiz_content = content[match.start():]
            break
            
    if not quiz_content:
        return []
    
    questions = []
    # Split by numbering like "1. ", "2. ", up to "50. " at the start of a line
    q_items = re.split(r'\n(?=\d+\.)', quiz_content)
    
    # If split failed (e.g. first item), try without newline
    if len(q_items) <= 1:
         q_items = re.split(r'(?=\d+\.)', quiz_content)

    for item in q_items:
        item = item.strip()
        if not item or not re.match(r'^\d+\.', item): continue
        
        num_match = re.match(r'^(\d+)\.\s*(.*)', item, re.DOTALL)
        if not num_match: continue
        
        num = int(num_match.group(1))
        text = num_match.group(2)
        
        # Determine type
        q_type = "single"
        if 11 <= num <= 20: q_type = "multiple"
        elif num > 20: q_type = "fill"
        
        options = {}
        # Pattern 1: (A) ... (B) ... (C) ... (D) ...
        # Pattern 2: A) ... B) ... C) ... D) ...
        # Pattern 3: A. ... B. ... C. ... D. ...
        
        # Try finding options
        opt_matches = re.findall(r'[\(\[\s]([A-D])[\)\]\s]\s*(.*?)(?=\s*[\(\[]?[A-D][\)\]\s]|$)', text, re.DOTALL)
        if not opt_matches:
            # Try without parentheses
            opt_matches = re.findall(r'(?:^|\n)\s*([A-D])[\)\.]\s*(.*?)(?=\s*[A-D][\)\.]|$)', text, re.DOTALL)
            
        if opt_matches:
            for opt_char, opt_val in opt_matches:
                options[opt_char] = opt_val.strip()
            # Clean title: stop at the first option
            title = re.sub(r'[\(\s][A-D][\)\.\s].*', '', text, flags=re.DOTALL).strip()
        else:
            title = text.strip()
            
        # Specific cleanup for fill-in-the-blank
        title = re.sub(r'=\s*\\underline\{.*?\}', '= _______', title)
        title = re.sub(r'為\s*\\underline\{.*?\}', '為 _______', title)
            
        questions.append({
            "num": num,
            "type": q_type,
            "title": title,
            "options": options
        })
    return questions

def parse_sol_md(filepath, questions_from_md):
    if not os.path.exists(filepath):
        return None
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    q_matrix = {}
    table_rows = re.findall(r'\|\s*(\d+)\s*\|\s*.*?\s*\|\s*(KP\s*[\d\.\/]+)\s*\|', content)
    for q_num, kp in table_rows:
        q_matrix[int(q_num)] = kp.replace(' ', '')

    results = {}
    # Find all "1. **B**" or similar
    # Sometimes it's "1. B" or "1. **ABCD**"
    for i in range(1, 101):
        # Improved regex for answers and explanations
        pattern = rf'(?:^|\n){i}\.\s*\*\*?([A-Z\d\/]+)\*\*?.*?(?:解析[：:]\s*(.*?))?(?=\n\d+\.|\n\n|###|---|$)'
        match = re.search(pattern, content, re.DOTALL)
        if match:
            ans = match.group(1)
            exp = match.group(2).strip() if match.group(2) else ""
            results[i] = {
                "answer": ans,
                "explanation": exp
            }
            
    final_questions = []
    for q in questions_from_md:
        num = q['num']
        res = results.get(num, {"answer": "", "explanation": ""})
        kp = q_matrix.get(num, "")
        
        # For multiple choice, ensure answer is a list or string of chars
        # Actually, QuizArena expects a string like "ABC" or an array. 
        # Looking at previous code, it seems it handles string.
        
        final_questions.append({
            "id": f"Q{num}",
            "type": q['type'],
            "title": q['title'],
            "options": q['options'],
            "answer": res['answer'],
            "kp": kp,
            "explanation": res['explanation']
        })
    
    return final_questions

def process_course(sub_dir, course_id):
    base_path = '/home/toymsi/documents/python學習/course微積分'
    output_dir = '/home/toymsi/documents/python學習/Github/ai-psychometrics/public/data'
    
    dir_path = os.path.join(base_path, sub_dir)
    if not os.path.exists(dir_path): return
    
    for i in range(1, 19):
        md_file = os.path.join(dir_path, f"week{i}.md")
        sol_file = os.path.join(dir_path, f"week{i}_sol.md")
        
        if i == 1 and sub_dir == '上': continue

        if os.path.exists(md_file) and os.path.exists(sol_file):
            questions = parse_week_md(md_file)
            if not questions:
                # print(f"No questions found in {md_file}")
                continue
            
            final_qs = parse_sol_md(sol_file, questions)
            if not final_qs:
                continue
            
            knowledge_points = {}
            # Try to extract KP definitions from the sol_file or md_file if possible
            # Or just use the KP IDs found in questions
            for q in final_qs:
                if q['kp']:
                    for kp_id in q['kp'].split('/'):
                         if kp_id not in knowledge_points:
                             knowledge_points[kp_id] = f"知識點 {kp_id}"
            
            kp_keys = sorted(list(knowledge_points.keys()))
            for q in final_qs:
                q['q_vector'] = [1 if k in q['kp'].split('/') else 0 for k in kp_keys]
            
            data = {
                "course_id": course_id,
                "week": i,
                "title": f"微積分 {sub_dir} 第 {i} 週測驗",
                "knowledge_points": knowledge_points,
                "questions": final_qs
            }
            
            output_file = os.path.join(output_dir, f"{course_id}_week{i}.json")
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print(f"Generated {output_file} with {len(final_qs)} questions")

process_course('上', 'calculus1')
process_course('中', 'calculus2')
process_course('下', 'calculus3')
