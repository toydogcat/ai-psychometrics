import os
import re
import json
import glob

def parse_week(course_id, week_num, md_dir, out_dir):
    md_file = os.path.join(md_dir, f"week{week_num}.md")
    sol_file = os.path.join(md_dir, f"week{week_num}_sol.md")
    
    if not os.path.exists(md_file) or not os.path.exists(sol_file):
        print(f"Skipping {course_id} week {week_num}: Files not found.")
        return None

    # Read contents
    with open(md_file, 'r', encoding='utf-8') as f:
        md_content = f.read()
    with open(sol_file, 'r', encoding='utf-8') as f:
        sol_content = f.read()

    # --- Extract Title ---
    title_match = re.search(r'^#\s*課程：.*?-\s*(.*?)\n', md_content)
    title = title_match.group(1).strip() if title_match else f"Week {week_num} Review"

    # --- Extract Knowledge Points ---
    kp_dict = {}
    kp_section_match = re.search(r'## 三、 本週知識點回顧 \(KP\)\n(.*?)(?=\n##|$)', md_content, re.DOTALL)
    if not kp_section_match:
        # Fallback to search throughout
        kp_lines = re.findall(r'- \*\*(KP\d+\.\d+)\*\*: (.*)', md_content)
        for kp, desc in kp_lines:
            kp_dict[kp] = desc.strip()
    else:
        for line in kp_section_match.group(1).strip().split('\n'):
            match = re.search(r'\*\*(KP\d+\.\d+)\*\*:?\s*(.*)', line)
            if match:
                kp_dict[match.group(1)] = match.group(2).strip()
                
    if not kp_dict and week_num in [9, 18]:
         # For midterms/finals, we might not have a dedicated KP section.
         # Will populate later from Q-matrix
         pass

    # --- Extract Questions ---
    questions = []
    
    # Split by numbers followed by a dot and a space at the beginning of a line
    # Need to be careful not to split inside options or other lists.
    # Look for \n\d+\.
    q_blocks = re.split(r'\n(?=\d+\.\s)', md_content)
    
    for block in q_blocks:
        # Match "1. Question title" or "1. **Q1**: Question title"
        q_match = re.search(r'^(\d+)\.\s*(?:\*\*(?:Q\d+)\*\*(?:[:：]\s*))?(.*?)(?=\n\s*[A-D][\)\.])', block, re.DOTALL)
        if not q_match:
            # Maybe it doesn't have A-D options, check if it just ends at double newline or next heading
            q_match = re.search(r'^(\d+)\.\s*(?:\*\*(?:Q\d+)\*\*(?:[:：]\s*))?(.*?)(?=\n\n|\n##|$)', block, re.DOTALL)
            if not q_match:
                 continue
                 
        q_num = q_match.group(1)
        q_id = f"Q{q_num}"
        q_title = q_match.group(2).strip()
        
        # Remove trailing answers if any
        q_title = re.sub(r'\n\s*\*答案\*.*', '', q_title, flags=re.DOTALL).strip()
        
        q_type = "single" # default
        # Adjust for midterms (15 SC, 15 MC, 10 Fill = 40)
        if "期中" in title or week_num == 9:
            if int(q_num) <= 15: q_type = "single"
            elif 15 < int(q_num) <= 30: q_type = "multiple"
            else: q_type = "fill"
        # Adjust for finals (20 SC, 20 MC, 10 Fill = 50)
        elif "期末" in title or week_num == 18:
            if int(q_num) <= 20: q_type = "single"
            elif 20 < int(q_num) <= 40: q_type = "multiple"
            else: q_type = "fill"
        else:
            if int(q_num) <= 10: q_type = "single"
            elif 10 < int(q_num) <= 20: q_type = "multiple"
            else: q_type = "fill"

        options = {}
        if q_type in ["single", "multiple"]:
            # Find options like "A) xxx" or "(A) xxx"
            opt_str_match = re.search(r'\n\s*\(?[A-D][\)\.](.*)', block, re.DOTALL)
            if opt_str_match:
                opts_str = block[opt_str_match.start():]
                opts_str = re.sub(r'\n\s*\*答案\*.*', '', opts_str, flags=re.DOTALL).strip()
                opts_str = re.sub(r'\n\n.*', '', opts_str, flags=re.DOTALL).strip() # Cut off next question or section if split failed
                
                # Extract A, B, C, D
                parts = re.split(r'\n\s*\(?([A-D])[\)\.]\s*', '\n' + opts_str)[1:]
                for j in range(0, len(parts), 2):
                    options[parts[j]] = parts[j+1].strip()

        questions.append({
            "id": q_id,
            "type": q_type,
            "title": q_title,
            "options": options if options else None,
            "answer": "", 
            "kp": "",     
            "q_vector": [] 
        })

    # --- Extract Answers and Explanations from Sol ---
    for q in questions:
        q["answer"] = ""
        q["explanation"] = ""
        
        # Find the block for this specific question in the solution file
        # It usually starts with "### Q1：" or "1. **Q1**"
        q_block_match = re.search(rf'(### {q["id"]}[：:].*?|{q["id"]}\..*?)(?=\n### Q\d+|\n\d+\. \*\*Q\d+|\n## |\Z)', sol_content, re.DOTALL | re.IGNORECASE)
        
        if q_block_match:
            sol_block = q_block_match.group(1)
            
            # Extract Answer
            ans_match = re.search(r'\*\*答案\*\*[：:]\s*(.*?)(?=\n|\*)', sol_block, re.IGNORECASE)
            if ans_match:
                ans = ans_match.group(1).strip()
                ans = re.sub(r'[\(\)\[\]]', '', ans).replace(' ', '')
                q["answer"] = ans
                
            # Extract Explanation
            # Look for "**詳細解析**：" or "**解析**："
            exp_match = re.search(r'\*\*(?:詳細)?解析\*\*[：:]\s*(.*)', sol_block, re.DOTALL | re.IGNORECASE)
            if exp_match:
                explanation = exp_match.group(1).strip()
                q["explanation"] = explanation
        else:
            # Fallback for answer if block not found properly
            ans_match = re.search(rf'{q["id"]}\..*?\*\*答案\*\*[：:]\s*(.*?)(?=\n)', sol_content, re.IGNORECASE)
            if ans_match:
                ans = ans_match.group(1).strip()
                ans = re.sub(r'[\(\)\[\]]', '', ans).replace(' ', '')
                q["answer"] = ans

    # --- Extract Q-matrix ---
    # Parse markdown table in sol_content
    # | 題目 | KP1.1 | KP1.2 | KP1.3 | KP1.4 | KP1.5 | 知識點 |
    # |---|---|---|---|---|---|---|
    # | Q1 | 1 | 0 | 0 | 0 | 0 | KP1.1 |
    q_matrix_section = re.search(r'## (?:[五四]、)? Q 矩陣.*?\n(\|.*?)\n\n', sol_content, re.DOTALL)
    if not q_matrix_section:
        q_matrix_section = re.search(r'## (?:[五四]、)? Q 矩陣.*?\n(\|.*)', sol_content, re.DOTALL)
        
    all_kps_in_matrix = []
    if q_matrix_section:
        lines = q_matrix_section.group(1).strip().split('\n')
        if len(lines) > 2:
            headers = [h.strip() for h in lines[0].split('|') if h.strip()]
            
            # Identify KP columns
            kp_cols = []
            for idx, h in enumerate(headers):
                if re.match(r'KP\d+\.\d+', h) or re.match(r'W\d+', h):
                    kp_cols.append((idx, h))
                    if h not in all_kps_in_matrix:
                         all_kps_in_matrix.append(h)
                         
            # Update kp_dict for midterms/finals if empty
            if not kp_dict:
                 for k in all_kps_in_matrix:
                      kp_dict[k] = f"Review {k}"

            for line in lines[2:]:
                cols = [c.strip() for c in line.split('|') if c.strip()]
                if not cols: continue
                q_id = cols[0]
                
                # Find matching question
                target_q = next((q for q in questions if q["id"] == q_id), None)
                if target_q:
                    vector = []
                    linked_kps = []
                    for idx, kp_name in kp_cols:
                        try:
                            val = int(cols[idx])
                            vector.append(val)
                            if val == 1:
                                linked_kps.append(kp_name)
                        except (ValueError, IndexError):
                            vector.append(0)
                    
                    target_q["q_vector"] = vector
                    target_q["kp"] = ", ".join(linked_kps)
                    
                    # Ensure vector length matches total KPs found in header
                    while len(target_q["q_vector"]) < len(kp_cols):
                         target_q["q_vector"].append(0)

    # Clean up empty options
    for q in questions:
        if q["options"] is not None and len(q["options"]) == 0:
            del q["options"]

    out_data = {
        "course": course_id,
        "week": f"week{week_num}",
        "title": title,
        "knowledge_points": kp_dict,
        "questions": questions
    }

    out_file = os.path.join(out_dir, f"{course_id}_week{week_num}.json")
    with open(out_file, 'w', encoding='utf-8') as f:
        json.dump(out_data, f, ensure_ascii=False, indent=2)
    print(f"Generated {out_file} with {len(questions)} questions.")
    return {
        "week": week_num,
        "title": title,
        "mdPath": f"week{week_num}.md",
        "quizPath": f"{course_id}_week{week_num}.json"
    }

def main():
    base_dir = "/home/toymsi/documents/python學習/Github/ai-psychometrics/public/courses"
    out_dir = "/home/toymsi/documents/python學習/Github/ai-psychometrics/public/data"
    os.makedirs(out_dir, exist_ok=True)
    
    courses = [
        ("calculus1", os.path.join(base_dir, "calculus-i")),
        ("calculus2", os.path.join(base_dir, "calculus-ii")),
        ("calculus3", os.path.join(base_dir, "calculus-iii"))
    ]
    
    all_syllabi = {}
    
    for course_id, md_dir in courses:
        print(f"Processing {course_id}...")
        syllabus = []
        for w in range(1, 19):
            res = parse_week(course_id, w, md_dir, out_dir)
            if res:
                syllabus.append(res)
        all_syllabi[course_id] = syllabus
        
    print("\nSyllabus extraction complete. To update courses.json, use the extracted data.")

if __name__ == "__main__":
    main()
