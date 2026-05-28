import os
import re

def test_parse(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Parse Q-matrix
    q_matrix = {}
    lines = content.split('\n')
    in_q_matrix = False
    for line in lines:
        if 'Q 矩陣' in line or 'Q-matrix' in line:
            in_q_matrix = True
            continue
        if in_q_matrix and line.strip().startswith('|'):
            parts = [p.strip() for p in line.split('|')]
            if len(parts) < 3:
                continue
            # Remove first and last elements since they are from outer '|'
            parts = parts[1:-1]
            q_id = parts[0]
            if not q_id or q_id == '題號' or q_id == '題目' or q_id.startswith('---') or q_id.startswith(':---'):
                continue
            
            q_id_clean = q_id
            if q_id.startswith('SC'):
                q_id_clean = 'Q' + q_id[2:]
            elif q_id.startswith('MC'):
                q_id_clean = 'Q' + q_id[2:]
            elif q_id.startswith('Fill'):
                q_id_clean = 'Q' + q_id[4:]
            
            # Vector values
            q_vec = []
            for p in parts[1:]:
                val = p.strip()
                if val == '1' or val == '1.0' or val == '1':
                    q_vec.append(1)
                elif val == '0' or val == '' or val == '0.0':
                    q_vec.append(0)
                else:
                    try:
                        q_vec.append(float(val))
                    except:
                        q_vec.append(0)
            q_matrix[q_id_clean] = q_vec

    print(f"Parsed {len(q_matrix)} Q-matrix rows.")
    for k, v in list(q_matrix.items())[:5]:
        print(f"  {k}: {v}")

if __name__ == "__main__":
    test_parse("/home/toymsi/documents/python學習/course3/week1.md")
    test_parse("/home/toymsi/documents/python學習/course2/week2.md")
