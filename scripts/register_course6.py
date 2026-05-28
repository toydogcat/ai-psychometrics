import os
import re
import json

def register_course():
    courses_json_path = "/home/toymsi/documents/python學習/Github/ai-psychometrics/public/courses/courses.json"
    if not os.path.exists(courses_json_path):
        print(f"File not found: {courses_json_path}")
        return

    with open(courses_json_path, 'r', encoding='utf-8') as f:
        courses = json.load(f)

    # 1. Correct quizPath values for Course 1-5
    prefix_map = {
        "python-basic-advanced": "python",
        "python-office-quant": "quant",
        "machine-learning": "ml",
        "deep-learning": "dl",
        "artificial-intelligence": "ai"
    }
    
    for course in courses:
        cid = course["id"]
        if cid in prefix_map:
            prefix = prefix_map[cid]
            for idx, week_item in enumerate(course["syllabus"]):
                w = week_item["week"]
                week_item["quizPath"] = f"{prefix}_week{w}.json"

    # 2. Build syllabus for Course 6 (Big Data Ecosystem -> big-data)
    syllabus_c6 = []
    for w in range(1, 19):
        filepath = f"/home/toymsi/documents/python學習/course6/week{w}.md"
        if not os.path.exists(filepath):
            print(f"Course 6 Week {w} file not found!")
            continue
            
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
            
        # Get title from first line
        first_line = lines[0].strip()
        # format: # 課程六：第 1 週 - 大數據生態系與架構基礎 (Big Data Ecosystem)
        title_match = re.search(r'第\s*\d+\s*週\s*-\s*(.*)', first_line)
        title = title_match.group(1).strip() if title_match else f"第 {w} 週"
        
        # Get topics
        topics = []
        in_lecture_or_lab = False
        for line in lines:
            line_stripped = line.strip()
            if line_stripped.startswith('## 一、') or line_stripped.startswith('## 二、'):
                in_lecture_or_lab = True
                continue
            if line_stripped.startswith('## 三、') or line_stripped.startswith('## 四、'):
                in_lecture_or_lab = False
                continue
                
            if in_lecture_or_lab and line_stripped.startswith('###'):
                # Extract clean topic title
                # e.g. ### 1. 大數據 4V 特性及其挑戰 (20 min) or ### 實作一：...
                topic_title = re.sub(r'^###\s*(?:\d+\.|\w+一|實作\w+)?\s*', '', line_stripped).strip()
                # Remove duration like (20 min)
                topic_title = re.sub(r'\s*\(\s*\d+\s*(?:min|分鐘)\s*\)', '', topic_title).strip()
                if topic_title and topic_title not in topics:
                    topics.append(topic_title)
                    
        # Fallback topics if none found
        if not topics:
            topics = ["大數據架構", "分散式運算", "案例分析"]
            
        syllabus_c6.append({
            "week": w,
            "title": title,
            "topics": topics[:6], # Keep max 6 topics
            "mdPath": f"week{w}.md",
            "quizPath": f"bigdata_week{w}.json",
            "estimatedMinutes": 45
        })

    # Create Course 6 object
    course6_obj = {
        "id": "big-data",
        "title": "大數據生態系與分散式運算實踐",
        "description": "專為中級 AI 工程師設計的大數據架構課程。從 Hadoop HDFS、MapReduce 到 Apache Spark 記憶體分散式計算，並深入探討海量數據特徵工程與雲端 AI 基礎建設最佳實踐。",
        "category": "大數據開發",
        "tags": [
            "推薦",
            "中級證照",
            "分散式計算"
        ],
        "totalWeeks": 18,
        "totalQuestions": 540,
        "syllabus": syllabus_c6
    }

    # Check if big-data is already in the list; if yes, replace it; if no, insert at index 5 (after artificial-intelligence)
    found_idx = -1
    for idx, c in enumerate(courses):
        if c["id"] == "big-data":
            found_idx = idx
            break
            
    if found_idx != -1:
        courses[found_idx] = course6_obj
        print("Updated existing big-data course in courses.json.")
    else:
        # Find position after artificial-intelligence (typically index 5)
        ai_idx = -1
        for idx, c in enumerate(courses):
            if c["id"] == "artificial-intelligence":
                ai_idx = idx
                break
        if ai_idx != -1:
            courses.insert(ai_idx + 1, course6_obj)
        else:
            courses.append(course6_obj)
        print("Registered new big-data course in courses.json.")

    # Save to courses.json
    with open(courses_json_path, 'w', encoding='utf-8') as f:
        json.dump(courses, f, ensure_ascii=False, indent=2)
    print("courses.json updated successfully!")

if __name__ == "__main__":
    register_course()
