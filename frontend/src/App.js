import { useState } from "react";

function App() {
  const [resume, setResume] = useState("");
  const [job, setJob] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      let res;

      // =====================================================
      // CASE 1: PDF RESUME UPLOAD
      // =====================================================
      if (file) {
        const formData = new FormData();

        formData.append("file", file);
        formData.append("job", job);

        /*
         * IMPORTANT:
         * Spring Boot receives the PDF and forwards it to
         * FastAPI /upload.
         *
         * We will connect this endpoint in the next step.
         */

        res = await fetch("http://localhost:8081/api/upload", {
          method: "POST",
          body: formData
        });
      }

      // =====================================================
      // CASE 2: NORMAL TEXT RESUME
      // =====================================================
      else {
        res = await fetch("http://localhost:8081/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            resume,
            job
          })
        });
      }

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();

      setResult(data);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to connect to the backend. Please make sure Spring Boot and FastAPI are running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        maxWidth: "1000px",
        margin: "auto"
      }}
    >
      {/* =====================================================
          TITLE
      ====================================================== */}

      <h1 style={{ color: "#2c3e50" }}>
        AI Resume Evaluation System
      </h1>

      <p style={{ color: "#666" }}>
        Context-Aware Hybrid Resume Evaluation using Explainable AI
      </p>

      {/* =====================================================
          RESUME TEXT
      ====================================================== */}

      <textarea
        placeholder="Paste Resume here..."
        rows="7"
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        style={{
          width: "100%",
          marginBottom: "15px",
          padding: "10px",
          boxSizing: "border-box"
        }}
      />

      {/* =====================================================
          JOB DESCRIPTION
      ====================================================== */}

      <textarea
        placeholder="Paste Job Description here..."
        rows="7"
        value={job}
        onChange={(e) => setJob(e.target.value)}
        style={{
          width: "100%",
          marginBottom: "15px",
          padding: "10px",
          boxSizing: "border-box"
        }}
      />

      {/* =====================================================
          PDF UPLOAD
      ====================================================== */}

      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "2px dashed #3498db",
          borderRadius: "10px"
        }}
      >
        <h3>📄 Upload Resume PDF</h3>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setResult(null);
            setError("");
          }}
        />

        {file && (
          <p style={{ color: "#27ae60" }}>
            ✅ Selected: {file.name}
          </p>
        )}
      </div>

      {/* =====================================================
          ANALYZE BUTTON
      ====================================================== */}

      <button
        onClick={analyze}
        disabled={loading}
        style={{
          padding: "12px 25px",
          backgroundColor: loading ? "#95a5a6" : "#3498db",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "16px"
        }}
      >
        {loading ? "Analyzing Resume..." : "Analyze Resume"}
      </button>

      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#fdecea",
            color: "#c0392b",
            borderRadius: "8px"
          }}
        >
          ❌ {error}
        </div>
      )}

      {/* =====================================================
          RESULT
      ====================================================== */}

      {result && (
        <div
          style={{
            marginTop: "30px",
            background: "#f4f6f7",
            padding: "25px",
            borderRadius: "10px"
          }}
        >

          {/* SCORE */}

          <h2>
            🎯 Match Score: {result.score}/100
          </h2>

          {/* SEMANTIC SCORE */}

          {result.semanticScore !== undefined && (
            <p>
              <b>🧠 Semantic Similarity:</b>{" "}
              {result.semanticScore}%
            </p>
          )}

          <hr />

          {/* MATCHED SKILLS */}

          <p>
            <b>✅ Matched Skills:</b>{" "}
            {result.matchedSkills &&
            result.matchedSkills.length > 0
              ? result.matchedSkills.join(", ")
              : "None"}
          </p>

          {/* MISSING SKILLS */}

          <p>
            <b>❌ Missing Skills:</b>{" "}
            {result.missingSkills &&
            result.missingSkills.length > 0
              ? result.missingSkills.join(", ")
              : "None"}
          </p>

          {/* STRENGTH */}

          <p>
            <b>💪 Strengths:</b>{" "}
            {result.strength ||
              result.strengths ||
              "Not available"}
          </p>

          {/* WEAKNESS */}

          <p>
            <b>⚠️ Weakness:</b>{" "}
            {result.weakness || "Not available"}
          </p>

          <hr />

          {/* =================================================
              RECOMMENDATIONS
          ================================================== */}

          <h3>🚀 AI Recommendations</h3>

          {result.recommendations &&
          result.recommendations.length > 0 ? (
            <ul>
              {result.recommendations.map((recommendation, index) => (
                <li key={index} style={{ marginBottom: "8px" }}>
                  {recommendation}
                </li>
              ))}
            </ul>
          ) : (
            <p>
              🎉 No major skill gaps detected.
            </p>
          )}

          <hr />

          {/* =================================================
              AI EXPLANATION
          ================================================== */}

          <h3>🤖 Explainable AI Analysis</h3>

          <p>
            {result.explanation ||
              "The system analyzed semantic similarity and skill overlap between the resume and job description."}
          </p>

        </div>
      )}
    </div>
  );
}

export default App;