import os
import re
import json

def parse_sol_md(filepath, course_id, week_num):
    if not os.path.exists(filepath):
        return None
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    course_title_match = re.search(r'^#\s*(.*)', content)
    course_title = course_title_match.group(1) if course_title_match else f"Calculus {course_id} Week {week_num}"
    
    knowledge_points = {}
    kp_matches = re.findall(r'\*\*(KP\d+\.\d+)\*\*\s*\((.*?)\)', content)
    for kp_id, kp_name in kp_matches:
        knowledge_points[kp_id] = kp_name
    
    # Fallback to collect KPs from questions
    kp_refs = re.findall(r'知識點對應\s*[:：]\s*\*\*(KP\d+\.\d+)\*\*', content)
    for kp in set(kp_refs):
        if kp not in knowledge_points:
            knowledge_points[kp] = f"知識點 {kp}"

    # Refined splitting and matching
    q_blocks = re.split(r'###\s+Q\d+[:：]', content)[1:]
    questions = []
    
    kp_keys = sorted(list(knowledge_points.keys()))
    
    for i, block in enumerate(q_blocks):
        q_id = f"Q{i+1}"
        
        # Title: everything until the first bullet point
        title_match = re.search(r'^\s*(.*?)(?=\n\s*\*|$)', block, re.DOTALL)
        title = title_match.group(1).strip() if title_match else "Unknown Question"
        
        # Options
        options = {}
        opt_match = re.search(r'\*\s*\*\*選項\*\*\s*[:：]\s*\(A\)\s*(.*?)\s*\(B\)\s*(.*?)\s*\(C\)\s*(.*?)\s*\(D\)\s*(.*?)(?=\n|$)', block)
        if opt_match:
            options = {
                "A": opt_match.group(1).strip(),
                "B": opt_match.group(2).strip(),
                "C": opt_match.group(3).strip(),
                "D": opt_match.group(4).strip()
            }
            
        # Answer
        ans_match = re.search(r'\*\s*\*\*答案\*\*\s*[:：]\s*\*\*\(([A-D])\)\*\*', block)
        if not ans_match:
            ans_match = re.search(r'\*\s*\*\*答案\*\*\s*[:：]\s*\*\*([A-D])\*\*', block)
        answer = ans_match.group(1) if ans_match else ""
        
        # KP
        kp_match = re.search(r'知識點對應\s*[:：]\s*\*\*(KP\d+\.\d+)\*\*', block)
        kp = kp_match.group(1) if kp_match else ""
        
        # Explanation
        exp_match = re.search(r'\*\s*\*\*詳細解析\*\*\s*[:：]\s*(.*?)(?=$|###)', block, re.DOTALL)
        explanation = exp_match.group(1).strip() if exp_match else ""
        
        q_vector = [0] * len(kp_keys)
        if kp in kp_keys:
            q_vector[kp_keys.index(kp)] = 1
            
        questions.append({
            "id": q_id,
            "type": "single",
            "title": title,
            "options": options,
            "answer": answer,
            "kp": kp,
            "q_vector": q_vector,
            "explanation": explanation
        })
        
    return {
        "course_id": course_id,
        "week": week_num,
        "title": course_title,
        "knowledge_points": knowledge_points,
        "questions": questions
    }

base_path = '/home/toymsi/documents/python學習/course微積分'
output_dir = '/home/toymsi/documents/python學習/Github/ai-psychometrics/public/data'

courses = [('上', 'calculus1'), ('中', 'calculus2'), ('下', 'calculus3')]

for sub_dir, course_id in courses:
    dir_path = os.path.join(base_path, sub_dir)
    if not os.path.exists(dir_path): continue
    
    for i in range(1, 19):
        sol_file = os.path.join(dir_path, f"week{i}_sol.md")
        if os.path.exists(sol_file):
            data = parse_sol_md(sol_file, course_id, i)
            if data:
                output_file = os.path.join(output_dir, f"{course_id}_week{i}.json")
                with open(output_file, 'w', encoding='utf-8') as f:
                    json.dump(data, f, ensure_ascii=False, indent=2)
                print(f"Generated {output_file} with {len(data['questions'])} questions")
