import { useState } from "react";

function App() {
  const [resume, setResume] = useState("");
  const [job, setJob] = useState("");
  const [result, setResult] = useState(null);

  const analyze = async () => {
    const res = await fetch("http://localhost:8081/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ resume, job })
    });

    const data = await res.json();
    setResult(data);
  };

 return (
  <div style={{ padding: "30px", fontFamily: "Arial" }}>
    <h1 style={{ color: "#2c3e50" }}>AI Resume Evaluation System</h1>

    <textarea
      placeholder="Paste Resume here..."
      rows="6"
      style={{ width: "100%", marginBottom: "15px", padding: "10px" }}
      onChange={(e) => setResume(e.target.value)}
    />

    <textarea
      placeholder="Paste Job Description here..."
      rows="6"
      style={{ width: "100%", marginBottom: "15px", padding: "10px" }}
      onChange={(e) => setJob(e.target.value)}
    />

    <button
      onClick={analyze}
      style={{
        padding: "10px 20px",
        backgroundColor: "#3498db",
        color: "white",
        border: "none",
        cursor: "pointer"
      }}
    >
      Analyze Resume
    </button>

    {result && (
      <div style={{ marginTop: "30px", background: "#f4f6f7", padding: "20px", borderRadius: "10px" }}>
        
        <h2>Match Score: {result.score}/100</h2>

        <p><b>✅ Matched Skills:</b> {result.matchedSkills.join(", ")}</p>
        <p><b>❌ Missing Skills:</b> {result.missingSkills.join(", ")}</p>

        <p><b>💪 Strengths:</b> {result.strengths}</p>
        <p><b>⚠️ Weakness:</b> {result.weakness}</p>

        <hr />

        <h3>🤖 AI Explanation</h3>
        <p>
          The system analyzed semantic similarity between resume and job description.
          Skills like <b>{result.matchedSkills.join(", ")}</b> contributed positively,
          while missing skills such as <b>{result.missingSkills.join(", ")}</b> reduced the score.
        </p>

      </div>
    )}
  </div>
);
}

export default App;