"use client";

import { useState } from "react";
import {
  WRITING_ASSIGNMENTS,
  type EssayFeedback,
  type WritingAssignment,
} from "@/lib/pat-data";
import { addWritingRecord } from "@/lib/history";

interface GradeResponse {
  demoMode?: boolean;
  feedback?: EssayFeedback;
  error?: string;
}

const SAMPLE_PROMPTS: Record<WritingAssignment, string> = {
  narrative:
    "Write a story about a time when an unexpected discovery changed everything. Your story may be real or imagined.",
  functional:
    "Your class wants to organize a fundraiser for the local food bank. Write a letter to your principal explaining your idea and asking for permission.",
};

export default function WritingPage() {
  const [assignment, setAssignment] = useState<WritingAssignment>("narrative");
  const [prompt, setPrompt] = useState(SAMPLE_PROMPTS.narrative);
  const [essay, setEssay] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [feedback, setFeedback] = useState<EssayFeedback | null>(null);

  function changeAssignment(a: WritingAssignment) {
    setAssignment(a);
    setPrompt(SAMPLE_PROMPTS[a]);
  }

  async function grade() {
    setLoading(true);
    setError(null);
    setFeedback(null);
    try {
      const res = await fetch("/api/grade-essay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignment, prompt, essay }),
      });
      const data: GradeResponse = await res.json();
      if (!res.ok || !data.feedback) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setDemoMode(Boolean(data.demoMode));
      setFeedback(data.feedback);
      if (data.feedback.scores.length > 0) {
        const average =
          data.feedback.scores.reduce((sum, s) => sum + s.score, 0) /
          data.feedback.scores.length;
        addWritingRecord({
          assignment: WRITING_ASSIGNMENTS[assignment].name,
          average: Math.round(average * 10) / 10,
        });
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1>Writing Coach</h1>
      <p className="subtitle">
        Practice ELA Part A writing and get feedback scored the way the PAT
        markers score it.
      </p>

      <div className="card">
        <label htmlFor="assignment">Assignment type</label>
        <select
          id="assignment"
          value={assignment}
          onChange={(e) => changeAssignment(e.target.value as WritingAssignment)}
        >
          {(Object.keys(WRITING_ASSIGNMENTS) as WritingAssignment[]).map((key) => (
            <option key={key} value={key}>
              {WRITING_ASSIGNMENTS[key].name}
            </option>
          ))}
        </select>
        <p className="pat-part">{WRITING_ASSIGNMENTS[assignment].description}</p>

        <label htmlFor="prompt">Writing prompt</label>
        <input
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <label htmlFor="essay">Your writing</label>
        <textarea
          id="essay"
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          placeholder="Type or paste your story or letter here…"
        />

        <button className="accent" onClick={grade} disabled={loading || !essay.trim()}>
          {loading ? "Marking…" : "Get feedback"}
        </button>
      </div>

      {error && <div className="notice error">{error}</div>}
      {demoMode && feedback && (
        <div className="notice demo">
          Demo mode: showing sample feedback because no API key is configured on
          the server yet.
        </div>
      )}

      {feedback && (
        <div className="card">
          <h2>Feedback</h2>
          {feedback.scores.map((s) => (
            <div className="question" key={s.category}>
              <div className="score-line">
                <p className="stem">{s.category}</p>
                <span className="score-badge">{s.score} / 5</span>
              </div>
              <div className="explanation">{s.comment}</div>
            </div>
          ))}
          <p>{feedback.overallComment}</p>
          <p className="stem">What you did well</p>
          <ul className="tight">
            {feedback.strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <p className="stem">Next steps</p>
          <ul className="tight">
            {feedback.improvements.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
