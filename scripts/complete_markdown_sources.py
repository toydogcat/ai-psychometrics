import os
import re
import sys

# Ensure scripts directory is in python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from answer_keys import ANSWERS_COURSE2, ANSWERS_COURSE3, ANSWERS_COURSE4, ANSWERS_COURSE5

def complete_markdown(course_num, week_num):
    filepath = f"/home/toymsi/documents/python學習/course{course_num}/week{week_num}.md"
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.split('\n')
    
    # 1. Parse Q-matrix and map questions to KPs
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
            parts = parts[1:-1] # Remove outer '|' parts
            
            # Detect table headers (columns)
            if parts[0] in ['題號', '題目'] or parts[0].startswith('---') or parts[0].startswith(':---'):
                if not kp_headers and not parts[0].startswith('-') and not parts[0].startswith(':'):
                    # Extract KP names
                    for p in parts[1:]:
                        kp_match = re.search(r'(KP\s*\d+\.\d+(?:\.\d+)?)', p)
                        if kp_match:
                            kp_headers.append(kp_match.group(1))
                        else:
                            kp_headers.append(p.strip())
                continue
                
            q_id = parts[0]
            # Normalize q_id
            q_id_clean = q_id
            if q_id.startswith('SC'):
                q_id_clean = 'Q' + q_id[2:]
            elif q_id.startswith('MC'):
                q_id_clean = 'Q' + q_id[2:]
            elif q_id.startswith('Fill'):
                q_id_clean = 'Q' + q_id[4:]
            
            # Determine mapped KPs
            mapped_kps = []
            for i, p in enumerate(parts[1:]):
                val = p.strip()
                if val == '1' or val == '1.0' or val == '1':
                    if i < len(kp_headers):
                        mapped_kps.append(kp_headers[i])
            q_to_kps[q_id_clean] = mapped_kps

    # 2. Parse existing questions from quiz section
    questions = []
    current_q = None
    in_quiz = False
    quiz_start_idx = -1
    quiz_end_idx = -1
    
    for idx, line in enumerate(lines):
        line_stripped = line.strip()
        
        # Check if we enter the quiz section
        if ('## 四、' in line_stripped or '## 課後測驗' in line_stripped) and ('題庫' in line_stripped or 'Quiz' in line_stripped or '測驗' in line_stripped):
            in_quiz = True
            quiz_start_idx = idx
            continue
            
        # Check if we leave the quiz section
        if in_quiz and (line_stripped.startswith('## 五、') or 'Q 矩陣' in line_stripped or 'Q-matrix' in line_stripped):
            quiz_end_idx = idx
            in_quiz = False
            break
            
        if not in_quiz:
            continue
            
        # Parse question items
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
            # If we see a header, stop current_q
            if line_stripped.startswith('###') or line_stripped.startswith('##'):
                questions.append(current_q)
                current_q = None
                continue
            # Skip old answer lines if present
            if '答案' in line_stripped:
                continue
            current_q["lines"].append(line_stripped)
            
    if current_q:
        questions.append(current_q)

    # Process and build clean question dict
    opt_pattern = r'\((A|B|C|D)\)'
    parsed_qs = []
    for q in questions:
        q_text = " ".join([l for l in q["lines"] if l.strip()])
        q_text = re.sub(r'^\s*-\s*', '', q_text)
        q_type = "single" if q["num"] <= 10 else "multiple" if q["num"] <= 20 else "fill"
        
        parsed_q = {
            "id": q["id"],
            "num": q["num"],
            "type": q_type,
            "raw_text": q_text
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
                parsed_q["options"] = {}
        else:
            parsed_q["title"] = q_text
            
        parsed_qs.append(parsed_q)

    # Get course answer key dictionary
    ans_dict = {}
    if course_num == 2:
        ans_dict = ANSWERS_COURSE2.get(week_num, {})
    elif course_num == 3:
        ans_dict = ANSWERS_COURSE3.get(week_num, {})
    elif course_num == 4:
        ans_dict = ANSWERS_COURSE4.get(week_num, {})
    elif course_num == 5:
        ans_dict = ANSWERS_COURSE5.get(week_num, {})

    # Reconstruct the quiz section
    quiz_lines = []
    quiz_lines.append("## 四、 課後測驗題庫 (Quiz) - 30 分鐘\n")
    
    # 1. Single Choice
    quiz_lines.append("### 1. 單選題 (Single Choice) - 共 10 題\n")
    for q in parsed_qs:
        if q["type"] != "single":
            continue
        # Get answer
        sc_ans = ans_dict.get("SC", "")
        ans_val = sc_ans[q["num"]-1] if q["num"]-1 < len(sc_ans) else "A"
        # Get KP
        kps = q_to_kps.get(q["id"], [])
        kp_str = ", ".join(kps) if kps else f"KP{course_num}.{week_num}.1"
        
        quiz_lines.append(f"{q['num']}. **{q['id']}**: {q['title']}")
        # Format options
        opts = q.get("options", {})
        opt_str = f"   - (A) {opts.get('A', 'A')} (B) {opts.get('B', 'B')} (C) {opts.get('C', 'C')} (D) {opts.get('D', 'D')}"
        quiz_lines.append(opt_str)
        quiz_lines.append(f"   - *答案*: {ans_val} ({kp_str})\n")

    # 2. Multiple Choice
    quiz_lines.append("### 2. 多選題 (Multiple Choice) - 共 10 題\n")
    for q in parsed_qs:
        if q["type"] != "multiple":
            continue
        # Get answer
        mc_ans = ans_dict.get("MC", [])
        ans_val_list = mc_ans[q["num"]-11] if q["num"]-11 < len(mc_ans) else ["A"]
        ans_val = ", ".join(ans_val_list)
        # Get KP
        kps = q_to_kps.get(q["id"], [])
        kp_str = ", ".join(kps) if kps else f"KP{course_num}.{week_num}.2"
        
        quiz_lines.append(f"{q['num']}. **{q['id']}**: {q['title']}")
        # Format options
        opts = q.get("options", {})
        opt_str = f"   - (A) {opts.get('A', 'A')} (B) {opts.get('B', 'B')} (C) {opts.get('C', 'C')} (D) {opts.get('D', 'D')}"
        quiz_lines.append(opt_str)
        quiz_lines.append(f"   - *答案*: {ans_val} ({kp_str})\n")

    # 3. Fill-in-the-blank
    quiz_lines.append("### 3. 填空題 (Fill-in-the-blank) - 共 10 題\n")
    for q in parsed_qs:
        if q["type"] != "fill":
            continue
        # Get answer
        fill_ans = ans_dict.get("Fill", [])
        ans_val = fill_ans[q["num"]-21] if q["num"]-21 < len(fill_ans) else "N/A"
        # Get KP
        kps = q_to_kps.get(q["id"], [])
        kp_str = ", ".join(kps) if kps else f"KP{course_num}.{week_num}.3"
        
        quiz_lines.append(f"{q['num']}. **{q['id']}**: {q['title']}")
        quiz_lines.append(f"   - *答案*: {ans_val} ({kp_str})\n")

    reconstructed_quiz = "\n".join(quiz_lines)

    # 3. Assemble new file content
    before_quiz = "\n".join(lines[:quiz_start_idx])
    after_quiz = "\n".join(lines[quiz_end_idx:])
    
    new_content = before_quiz + "\n" + reconstructed_quiz + "\n" + after_quiz
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

if __name__ == "__main__":
    print("Completing raw markdown files for courses 2, 3, 4, 5...")
    for c in [2, 3, 4, 5]:
        for w in range(1, 19):
            complete_markdown(c, w)
    print("Done completing markdown files!")
