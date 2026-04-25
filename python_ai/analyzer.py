print("🔥 NEW ANALYZER CODE RUNNING 🔥")

from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer, util
import pdfplumber

# Load AI model
model = SentenceTransformer('all-MiniLM-L6-v2')

app = FastAPI()

class InputData(BaseModel):
    resume: str
    job: str

# ✅ Skill Database
SKILLS_DB = [
    "java", "spring boot", "sql", "python",
    "aws", "docker", "react", "machine learning"
]

# ✅ Recommendations for missing skills
RECOMMENDATIONS = {
    "aws": "Learn AWS (EC2, S3) for cloud deployment",
    "docker": "Learn Docker for containerization",
    "react": "Learn React for frontend development",
    "sql": "Improve SQL for database management",
    "spring boot": "Practice building REST APIs with Spring Boot",
    "machine learning": "Explore ML algorithms and Python libraries like scikit-learn"
}

# ✅ Extract skills
def extract_skills(text):
    text = text.lower()
    return [skill for skill in SKILLS_DB if skill in text]

# 🔹 MAIN ANALYSIS FUNCTION
def perform_analysis(resume, job):

    resume = resume.lower()
    job = job.lower()

    # Skill extraction
    resume_skills = extract_skills(resume)
    job_skills = extract_skills(job)

    matched = list(set(resume_skills) & set(job_skills))
    missing = list(set(job_skills) - set(resume_skills))

    # Semantic similarity
    emb1 = model.encode(resume, convert_to_tensor=True)
    emb2 = model.encode(job, convert_to_tensor=True)

    similarity = float(util.cos_sim(emb1, emb2)[0][0])

    # Hybrid scoring
    skill_score = (len(matched) / (len(job_skills) + 1)) * 50
    semantic_score = similarity * 50

    final_score = int(skill_score + semantic_score)

    # Strength & weakness
    strength = f"Strong match in: {', '.join(matched) if matched else 'None'}"
    weakness = f"Missing important skills: {', '.join(missing) if missing else 'None'}"

    # 🔥 Recommendations
    recommendations = []
    for skill in missing:
        if skill in RECOMMENDATIONS:
            recommendations.append(RECOMMENDATIONS[skill])

    # 🔥 Explainable AI
    if final_score > 70:
        explanation = "The candidate is a strong match with high semantic similarity and most required skills present."
    elif final_score > 40:
        explanation = "The candidate partially matches the job. Some important skills are present, but there are gaps."
    else:
        explanation = "The candidate has low compatibility. Key skills are missing and semantic similarity is low."

    return {
        "score": final_score,
        "semanticScore": round(similarity * 100, 2),
        "matchedSkills": matched,
        "missingSkills": missing,
        "strength": strength,
        "weakness": weakness,
        "recommendations": recommendations,
        "explanation": explanation
    }

# 🔹 TEXT API
@app.post("/analyze")
def analyze(data: InputData):
    return perform_analysis(data.resume, data.job)

# 🔹 PDF UPLOAD API
@app.post("/upload")
async def upload_resume(file: UploadFile = File(...), job: str = ""):

    text = ""

    # Extract text from PDF
    with pdfplumber.open(file.file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""

    return perform_analysis(text, job)