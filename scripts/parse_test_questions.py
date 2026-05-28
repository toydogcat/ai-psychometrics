import os
import re

def parse_questions_test(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.split('\n')
    questions = []
    current_q = None
    in_quiz = False
    
    for line in lines:
        line_stripped = line.strip()
        
        # Check if we enter the quiz section
        if ('## 四、' in line_stripped or '## 課後測驗' in line_stripped) and ('題庫' in line_stripped or 'Quiz' in line_stripped or '測驗' in line_stripped):
            in_quiz = True
            continue
            
        # Check if we leave the quiz section
        if in_quiz and (line_stripped.startswith('## 五、') or 'Q 矩陣' in line_stripped or 'Q-matrix' in line_stripped):
            if current_q:
                questions.append(current_q)
                current_q = None
            in_quiz = False
            continue
            
        if not in_quiz:
            continue
            
        # Match lines like "1. **Q1**:" or "1. 在..." or "11. **Q11**:" or "11. 關於..."
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
                "lines": [title_part],
                "answer_line": None
            }
        elif current_q:
            # If it's an answer line
            if '答案' in line_stripped:
                current_q["answer_line"] = line_stripped
            else:
                current_q["lines"].append(line_stripped)
                
    if current_q:
        questions.append(current_q)

    # Process each question
    opt_pattern = r'\((A|B|C|D)\)'
    parsed_qs = []
    for q in questions:
        # Filter out empty lines
        q_text = " ".join([l for l in q["lines"] if l.strip()])
        # Remove any markdown dashes or formatting
        q_text = re.sub(r'^\s*-\s*', '', q_text)
        
        q_type = "single" if q["num"] <= 10 else "multiple" if q["num"] <= 20 else "fill"
        
        parsed_q = {
            "id": q["id"],
            "num": q["num"],
            "type": q_type,
            "raw_text": q_text,
            "answer_line": q["answer_line"]
        }
        
        if q_type in ["single", "multiple"]:
            parts = re.split(opt_pattern, q_text)
            # We expect parts: [title, 'A', a_val, 'B', b_val, 'C', c_val, 'D', d_val]
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
            # Fill in the blank
            parsed_q["title"] = q_text
            
        parsed_qs.append(parsed_q)

    print(f"Total parsed questions: {len(parsed_qs)}")
    for q in parsed_qs[:3]:
        print(f"Q{q['num']} ({q['type']}): {q.get('title', q['raw_text'])}")
        if 'options' in q:
            print(f"  Options: {q['options']}")
        if q['answer_line']:
            print(f"  Answer Line: {q['answer_line']}")

if __name__ == "__main__":
    print("--- Course 3 Week 1 ---")
    parse_questions_test("/home/toymsi/documents/python學習/course3/week1.md")
    print("\n--- Course 2 Week 2 ---")
    parse_questions_test("/home/toymsi/documents/python學習/course2/week2.md")
