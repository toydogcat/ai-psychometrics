import os
import re

def verify_files():
    corrupted_files = []
    for c in [2, 3, 4, 5]:
        for w in range(1, 19):
            filepath = f"/home/toymsi/documents/python學習/course{c}/week{w}.md"
            if not os.path.exists(filepath):
                continue
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Look for "###" inside lines that are options or question titles
            lines = content.split('\n')
            for line in lines:
                if '###' in line and ('(A)' in line or 'Q' in line or '答案' in line or 'SC' in line or 'MC' in line):
                    print(f"Corrupted line in Course {c} Week {w}: {line}")
                    corrupted_files.append((c, w))
                    break
    print(f"Verification complete. Found {len(corrupted_files)} corrupted files.")
    return corrupted_files

if __name__ == "__main__":
    verify_files()
