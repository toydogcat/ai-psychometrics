import os
import re
import json

# Course mapping
COURSE_MAP = {
    1: {"prefix": "python", "slug": "python-basic-advanced"},
    2: {"prefix": "quant", "slug": "python-office-quant"},
    3: {"prefix": "ml", "slug": "machine-learning"},
    4: {"prefix": "dl", "slug": "deep-learning"},
    5: {"prefix": "ai", "slug": "artificial-intelligence"},
    6: {"prefix": "bigdata", "slug": "big-data"}
}

def parse_course_week(course_num, week_num):
    info = COURSE_MAP[course_num]
    filepath = f"/home/toymsi/documents/python學習/course{course_num}/week{week_num}.md"
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.split('\n')

    # 1. Parse reading material (everything before Section IV)
    reading_lines = []
    quiz_start_idx = -1
    for idx, line in enumerate(lines):
        line_stripped = line.strip()
        if ('## 四、' in line_stripped or '## 課後測驗' in line_stripped) and ('題庫' in line_stripped or 'Quiz' in line_stripped or '測驗' in line_stripped):
            quiz_start_idx = idx
            break
        reading_lines.append(line)

    reading_content = "\n".join(reading_lines).strip()
    
    # Save reading material
    dest_dir = f"/home/toymsi/documents/python學習/Github/ai-psychometrics/public/courses/{info['slug']}"
    os.makedirs(dest_dir, exist_ok=True)
    with open(f"{dest_dir}/week{week_num}.md", 'w', encoding='utf-8') as f:
        f.write(reading_content)

    # 2. Parse Q-matrix
    kp_headers = []
    q_to_kps = {}
    in_q_matrix = False
    
    for line in lines:
        line_stripped = line.strip()
        if 'Q 矩陣' in line_stripped or 'Q-matrix' in line_stripped:
            in_q_matrix = True
            continue
        if in_q_matrix and line_stripped.startswith('|'):
            parts = [p.strip() for p in line.split('|')]
            if len(parts) < 3:
                continue
            parts = parts[1:-1]
            
            if parts[0] in ['題號', '題目'] or parts[0].startswith('---') or parts[0].startswith(':---'):
                if not kp_headers and not parts[0].startswith('-') and not parts[0].startswith(':'):
                    for p in parts[1:]:
                        kp_match = re.search(r'(KP\s*\d+\.\d+(?:\.\d+)?)', p)
                        if kp_match:
                            kp_headers.append(kp_match.group(1))
                        else:
                            kp_headers.append(p.strip())
                continue
                
            q_id = parts[0]
            q_id_clean = q_id
            if q_id.startswith('SC'):
                q_id_clean = 'Q' + q_id[2:]
            elif q_id.startswith('MC'):
                q_id_clean = 'Q' + q_id[2:]
            elif q_id.startswith('Fill'):
                q_id_clean = 'Q' + q_id[4:]
                
            mapped_kps = []
            for i, p in enumerate(parts[1:]):
                val = p.strip()
                if val == '1' or val == '1.0' or val == '1':
                    if i < len(kp_headers):
                        mapped_kps.append(kp_headers[i])
            q_to_kps[q_id_clean] = mapped_kps

    # 3. Parse questions and answers from quiz section
    questions = []
    current_q = None
    in_quiz = False
    
    for idx in range(quiz_start_idx, len(lines)):
        line = lines[idx]
        line_stripped = line.strip()
        
        # Stop at Q-matrix section
        if 'Q 矩陣' in line_stripped or 'Q-matrix' in line_stripped or line_stripped.startswith('## 五、'):
            break
            
        q_match = re.match(r'^(\d+)\.\s*(?:\*\*(Q\d+)\*\*:)?\s*(.*)', line_stripped)
        if q_match:
            if current_q:
                questions.append(current_q)
            q_num = int(q_match.group(1))
            q_id = q_match.group(2) if q_match.group(2) else f"Q{q_num}"
            title_part = q_match.group(3)
            current_q = {
                "num": q_num,
                "id": q_id,
                "lines": [title_part]
            }
        elif current_q:
            if line_stripped.startswith('###') or line_stripped.startswith('##'):
                questions.append(current_q)
                current_q = None
                continue
            current_q["lines"].append(line_stripped)
            
    if current_q:
        questions.append(current_q)

    # Convert to structured JSON schema
    opt_pattern = r'\((A|B|C|D)\)'
    quiz_questions = []
    
    for q in questions:
        # Reconstruct clean text lines
        q_lines = [l.strip() for l in q["lines"] if l.strip()]
        
        # Find and parse answer line
        ans_val = None
        ans_line_idx = -1
        for i, l in enumerate(q_lines):
            if '答案' in l:
                ans_line_idx = i
                ans_match = re.search(r'\*\s*答案\s*\*:\s*(.*?)\s*(?:\((KP.*?)\))?$', l)
                if ans_match:
                    ans_raw = ans_match.group(1).strip()
                    # Clean any trailing garbage
                    ans_raw = re.sub(r'\s*\(\s*KP.*?\)\s*$', '', ans_raw).strip()
                    
                    q_type = "single" if q["num"] <= 10 else "multiple" if q["num"] <= 20 else "fill"
                    if q_type == "single":
                        ans_val = ans_raw
                    elif q_type == "multiple":
                        ans_val = [x.strip() for x in ans_raw.split(',') if x.strip()]
                    elif q_type == "fill":
                        ans_val = [x.strip() for x in re.split(r'或|/|,', ans_raw) if x.strip()]
                break
                
        # Remove answer line from the question text
        if ans_line_idx != -1:
            q_lines = q_lines[:ans_line_idx] + q_lines[ans_line_idx+1:]
            
        q_text = " ".join(q_lines).strip()
        q_text = re.sub(r'^\s*-\s*', '', q_text)
        
        q_type = "single" if q["num"] <= 10 else "multiple" if q["num"] <= 20 else "fill"
        kps = q_to_kps.get(q["id"], [])
        if not kps:
            kps = [f"KP{course_num}.{week_num}.{1 if q_type=='single' else 2 if q_type=='multiple' else 3}"]

        parsed_q = {
            "id": q["id"],
            "num": q["num"],
            "type": q_type,
            "kps": kps,
            "answer": ans_val
        }
        
        if q_type in ["single", "multiple"]:
            parts = re.split(opt_pattern, q_text)
            if len(parts) >= 9:
                title = parts[0].strip().rstrip('-').strip()
                options = {}
                for i in range(1, len(parts), 2):
                    if i + 1 < len(parts):
                        options[parts[i]] = parts[i+1].strip().rstrip('-').strip()
                parsed_q["title"] = title
                parsed_q["options"] = options
            else:
                parsed_q["title"] = q_text
                parsed_q["options"] = {"A": "A", "B": "B", "C": "C", "D": "D"}
        else:
            parsed_q["title"] = q_text
            
        quiz_questions.append(parsed_q)

    # Save to JSON
    json_data = {
        "courseId": info["slug"],
        "week": week_num,
        "questions": quiz_questions
    }
    
    json_dir = "/home/toymsi/documents/python學習/Github/ai-psychometrics/public/data"
    os.makedirs(json_dir, exist_ok=True)
    with open(f"{json_dir}/{info['prefix']}_week{week_num}.json", 'w', encoding='utf-8') as f:
        json.dump(json_data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    print("Parsing all 108 markdown weekly files...")
    for c in range(1, 7):
        for w in range(1, 19):
            parse_course_week(c, w)
    print("Parsing complete!")
