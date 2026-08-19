Context-Aware Hybrid Resume Evaluation System

An Explainable AI-based resume evaluation platform that combines semantic similarity, skill matching, and context-aware analysis to evaluate how well a resume fits a given job description.

📌 Overview

The Context-Aware Hybrid Resume Evaluation System is a full-stack AI application designed to evaluate resumes against job descriptions using a hybrid approach.

Current capabilities include:

Skill-based matching

Semantic similarity using Sentence Transformers

Hybrid compatibility scoring

Missing-skill identification

Personalized skill recommendations

Explainable evaluation results

PDF resume upload and text extraction

The project is being developed as a research-oriented implementation of a Context-Aware Hybrid Resume Evaluation System using Explainable AI (XAI).

🎯 Problem Statement

Traditional resume screening systems often depend heavily on exact keyword matching. This can cause relevant candidates to receive low scores when their resumes use different terminology from the job description.

For example:

Resume: "Built REST APIs using Spring"
Job:    "Spring Boot backend developer"

A keyword-only system may fail to recognize the contextual relationship between these terms.

This project aims to provide a more intelligent evaluation mechanism by combining explicit skill overlap with semantic similarity and interpretable results.

💡 Objectives

Analyze resumes against specific job descriptions.

Extract relevant technical skills from resume and job-description text.

Identify matched and missing skills.

Measure semantic similarity between resume and job description.

Generate a hybrid compatibility score.

Recommend learning areas for missing skills.

Support PDF resume uploads.

Provide interpretable explanations of evaluation results.

Provide a foundation for further Explainable AI and context-aware research.

🏗️ System Architecture

                    ┌──────────────────────┐
                    │     React Frontend   │
                    │ Resume + Job Input   │
                    │ PDF Upload            │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Spring Boot API    │
                    │ Request Routing      │
                    │ AI-Service Bridge    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    FastAPI AI Layer  │
                    │ Skill Extraction     │
                    │ Semantic Similarity  │
                    │ Hybrid Scoring       │
                    │ Recommendations      │
                    │ PDF Text Extraction  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Explainable Results  │
                    │ Score                │
                    │ Matched Skills       │
                    │ Missing Skills       │
                    │ Strengths / Weakness │
                    │ Recommendations      │
                    └──────────────────────┘

✨ Current Features

1. Resume and Job Description Analysis

Users can enter resume text and a job description. The system evaluates their compatibility.

2. Skill Extraction

The current implementation uses a controlled skill database containing skills such as:

Java
Spring Boot
SQL
Python
AWS
Docker
React
Machine Learning

The database can be expanded as development continues.

3. Skill Matching

The system identifies:

✅ Matched skills

❌ Missing skills

4. Semantic Similarity

The system uses Sentence Transformers — all-MiniLM-L6-v2 to generate embeddings for the resume and job description and calculate cosine similarity.

This allows the system to capture textual relationships beyond exact keyword overlap.

5. Hybrid Scoring

The current score combines:

Skill Matching Score
        +
Semantic Similarity Score
        ↓
Hybrid Compatibility Score

6. Skill Recommendations

When required skills are missing, the system provides recommendations.

Example:

Missing: AWS
Recommendation:
Learn AWS fundamentals including EC2 and S3.

7. Explainable Results

The system returns:

Final score

Semantic score

Matched skills

Missing skills

Strengths

Weaknesses

Recommendations

Explanation

8. PDF Resume Upload

Users can upload a PDF resume. The FastAPI service extracts text using pdfplumber, after which the extracted resume is passed through the same analysis pipeline.

🧠 AI/ML Components

Component

Technology

Semantic Embeddings

Sentence Transformers

Embedding Model

all-MiniLM-L6-v2

Similarity

Cosine Similarity

Skill Extraction

Controlled Skill Database

Hybrid Scoring

Skill + Semantic Score

PDF Text Extraction

pdfplumber

AI Service

FastAPI

Backend API

Spring Boot

Frontend

React

🛠️ Technology Stack

Frontend

React.js

JavaScript

HTML

CSS

Backend

Java

Spring Boot

Maven

REST APIs

AI/ML Service

Python

FastAPI

Sentence Transformers

PyTorch

pdfplumber

Pydantic

Development Tools

Visual Studio Code

Git

GitHub

npm

Uvicorn

📂 Project Structure

ContextAwareResumeSystem/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/example/backend/
│   │       │       ├── BackendApplication.java
│   │       │       └── ResumeController.java
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── ...
│   └── package.json
│
├── python_ai/
│   └── analyzer.py
│
├── database/
├── .gitignore
└── README.md

⚙️ Installation & Setup

Prerequisites

Install:

Java 17

Maven

Python 3.10+

Node.js and npm

Git

1. Clone the Repository

git clone https://github.com/Aliya-28/ContextAwareResumeSystem.git
cd ContextAwareResumeSystem

2. Setup the AI Service

cd python_ai

Install dependencies:

pip install fastapi uvicorn sentence-transformers pdfplumber python-multipart pydantic

Start FastAPI:

uvicorn analyzer:app --reload --port 8000

Open:

http://127.0.0.1:8000/docs

3. Start Spring Boot Backend

Open another terminal:

cd backend
mvn spring-boot:run

The backend is configured to run on:

http://localhost:8081

If the port is occupied, stop the existing process or configure another port in application.properties.

4. Start React Frontend

Open another terminal:

cd frontend
npm install
npm start

The frontend normally runs at:

http://localhost:3000

🔌 API Endpoints

FastAPI

Analyze Resume

POST /analyze

Example request:

{
  "resume": "Java Spring Boot SQL developer",
  "job": "Looking for Java developer with Spring Boot, AWS and Docker"
}

Example response:

{
  "score": 40,
  "semanticScore": 46.87,
  "matchedSkills": [
    "java",
    "sql"
  ],
  "missingSkills": [
    "spring boot",
    "docker",
    "aws"
  ],
  "recommendations": [
    "Practice building REST APIs with Spring Boot",
    "Learn Docker for containerization",
    "Learn AWS (EC2, S3) for cloud deployment"
  ]
}

Upload Resume

POST /upload

Accepts a PDF resume and analyzes the extracted text against a supplied job description.

Swagger documentation:

http://127.0.0.1:8000/docs

🔬 Research Motivation

The project is designed around limitations of conventional resume screening approaches.

Research Gap

Many traditional systems primarily rely on:

Exact keyword matching

Basic ATS rules

Surface-level similarity

Limited explanations

These approaches can struggle with:

Synonyms

Contextual relationships

Different ways of expressing the same skill

Personalized skill gaps

Interpretability of the final score

Proposed Direction

This project explores a hybrid approach combining:

Explicit Skill Matching
          +
Semantic Representation
          +
Explainable Evaluation
          +
Skill-Gap Recommendations

🚀 Planned Advanced Features

The current implementation is a working foundation. Future development will focus on making the system more research-oriented.

Phase 1 — Advanced Resume Intelligence

Multi-factor resume scoring

Experience analysis

Education relevance analysis

Project relevance analysis

Keyword/ATS compatibility analysis

Section-level resume analysis

Phase 2 — Explainable AI

Feature-level contribution scores

Explanation of score changes

Matched-skill evidence

Missing-skill evidence

Explainable semantic similarity

Phase 3 — Context-Aware Analysis

Job-role classification

Context-aware skill importance

Skill dependency analysis

Synonym and related-skill detection

Domain-specific evaluation

Phase 4 — Personalized Recommendations

Skill-gap learning roadmap

Priority ranking of missing skills

Suggested learning sequence

Role-based recommendations

Phase 5 — Research Evaluation

Potential evaluation metrics include:

Precision

Recall

F1-score

Ranking metrics

Semantic similarity evaluation

Ablation studies

Human evaluation

Comparison with keyword-only baselines

🌟 Potential Research Contribution

The research direction focuses on combining multiple complementary signals instead of relying on a single resume-matching mechanism.

Resume
   │
   ├── Skill-Level Analysis
   ├── Semantic Analysis
   ├── Contextual Analysis
   ├── ATS/Keyword Analysis
   └── Evidence-Based Explanation
            │
            ▼
      Hybrid Evaluation
            │
            ▼
   Skill Gap + Recommendations

The final research contribution should be validated experimentally through suitable datasets, baselines, and evaluation metrics.

🔒 Privacy Considerations

Resumes may contain personal information. A production deployment should implement:

Secure file handling

Temporary PDF storage

Automatic deletion of uploaded files

Authentication and authorization

Encryption

No unnecessary retention of candidate data

📊 Example Workflow

1. User uploads resume PDF
              ↓
2. PDF text is extracted
              ↓
3. Job description is provided
              ↓
4. Skills are identified
              ↓
5. Resume and JD embeddings are generated
              ↓
6. Semantic similarity is calculated
              ↓
7. Skill overlap is calculated
              ↓
8. Hybrid score is generated
              ↓
9. Missing skills are identified
              ↓
10. Recommendations are generated
              ↓
11. Explainable evaluation is displayed

👩‍💻 Author

Aliya Sayyed

B.Tech Computer Science & Engineering

📜 License

This project is currently intended for academic and research purposes.

A formal open-source license can be added when the project is ready for public distribution.

⭐ Project Status

Status: Active Development 🚧

The current version implements the core hybrid evaluation pipeline, PDF processing, skill-gap recommendations, and explainable results. Advanced context-aware analysis, richer XAI, multi-factor scoring, and experimental validation are planned as the next stages of development.

⭐ Support the Project

If you find this project interesting, consider starring the repository and following its development as it evolves toward a research-oriented, explainable resume evaluation framework.
