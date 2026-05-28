import os
import re

def clean_corrupted_files():
    for c in [2, 3, 4, 5]:
        for w in range(1, 19):
            filepath = f"/home/toymsi/documents/python學習/course{c}/week{w}.md"
            if not os.path.exists(filepath):
                continue
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Pattern to match " ### 2. 多選題..." or " ### 3. 填空題..." or " ### 3. 填充題..."
            # inside a line (e.g. option D)
            lines = content.split('\n')
            new_lines = []
            for line in lines:
                if '### 2.' in line and not line.strip().startswith('###'):
                    line = line.split('### 2.')[0].rstrip()
                if '### 3.' in line and not line.strip().startswith('###'):
                    line = line.split('### 3.')[0].rstrip()
                if '## 五.' in line and not line.strip().startswith('##'):
                    line = line.split('## 五.')[0].rstrip()
                new_lines.append(line)
                
            new_content = '\n'.join(new_lines)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)

if __name__ == "__main__":
    clean_corrupted_files()
    print("Cleanup run complete!")
