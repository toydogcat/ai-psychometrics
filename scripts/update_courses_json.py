import json
import os

courses_file = "/home/toymsi/documents/python學習/Github/ai-psychometrics/public/courses/courses.json"

with open(courses_file, 'r', encoding='utf-8') as f:
    courses = json.load(f)

# Ensure we don't duplicate if script is run twice
courses = [c for c in courses if not c["id"].startswith("calculus")]

def build_syllabus(course_prefix):
    syllabus = []
    for i in range(1, 19):
        # We don't have the exact title parsed here easily without re-reading JSONs, 
        # so we use a generic title or load it from the generated JSON
        json_path = f"/home/toymsi/documents/python學習/Github/ai-psychometrics/public/data/{course_prefix}_week{i}.json"
        title = f"Week {i}"
        topics = []
        if os.path.exists(json_path):
            try:
                with open(json_path, 'r', encoding='utf-8') as jf:
                    data = json.load(jf)
                    title = data.get("title", title)
                    topics = list(data.get("knowledge_points", {}).values())
            except Exception:
                pass
                
        syllabus.append({
            "week": i,
            "title": title,
            "topics": topics if topics else ["進階學習"],
            "mdPath": f"week{i}.md",
            "quizPath": f"{course_prefix}_week{i}.json",
            "estimatedMinutes": 60 if i in [9, 18] else 45
        })
    return syllabus

calculus1 = {
    "id": "calculus-i",
    "title": "微積分 上 (Calculus I)",
    "description": "基礎微積分課程，涵蓋極限、連續性、微分法則與基本積分。結合 SymPy 與 Matplotlib 進行視覺化與符號運算，並提供心理計量診斷。",
    "category": "數學與演算法",
    "tags": ["大學先修", "基礎數學", "Python實作"],
    "totalWeeks": 18,
    "totalQuestions": 580,
    "syllabus": build_syllabus("calculus1")
}

calculus2 = {
    "id": "calculus-ii",
    "title": "微積分 中 (Calculus II)",
    "description": "進階微積分課程，深入探討積分技巧、數值積分、無窮級數與多元函數極限。結合 Python SciPy 進行數值模擬。",
    "category": "數學與演算法",
    "tags": ["進階數學", "級數", "數值分析"],
    "totalWeeks": 18,
    "totalQuestions": 580,
    "syllabus": build_syllabus("calculus2")
}

calculus3 = {
    "id": "calculus-iii",
    "title": "微積分 下 (Calculus III)",
    "description": "多變數微積分與向量微積分，涵蓋空間幾何、多重積分、Green定理、Stokes定理與散度定理。著重於 3D 視覺化與物理應用。",
    "category": "數學與演算法",
    "tags": ["高等微積分", "向量分析", "3D視覺化"],
    "totalWeeks": 18,
    "totalQuestions": 580,
    "syllabus": build_syllabus("calculus3")
}

courses.extend([calculus1, calculus2, calculus3])

with open(courses_file, 'w', encoding='utf-8') as f:
    json.dump(courses, f, ensure_ascii=False, indent=2)

print(f"Successfully added 3 calculus courses to {courses_file}")
