"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SUBJECTS, type Question, type SubjectId } from "@/lib/pat-data";
import { addPracticeRecord } from "@/lib/history";

interface GenerateResponse {
  demoMode?: boolean;
  questions?: Question[];
  error?: string;
}

function PracticeInner() {
  const searchParams = useSearchParams();
  const initialSubject = (searchParams.get("subject") as SubjectId) || "math";

  const [subjectId, setSubjectId] = useState<SubjectId>(
    SUBJECTS.some((s) => s.id === initialSubject) ? initialSubject : "math",
  );
  const subject = SUBJECTS.find((s) => s.id === subjectId)!;
  const [topic, setTopic] = useState(subject.units[0].topics[0]);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [count, setCount] = useState(10);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  function changeSubject(id: SubjectId) {
    setSubjectId(id);
    const next = SUBJECTS.find((s) => s.id === id)!;
    setTopic(next.units[0].topics[0]);
  }

  async function generate() {
    setLoading(true);
    setError(null);
    setQuestions(null);
    setAnswers({});
    setSubmitted(false);
    try {
      const res = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjectId, topic, difficulty, count }),
      });
      const data: GenerateResponse = await res.json();
      if (!res.ok || !data.questions) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setDemoMode(Boolean(data.demoMode));
      setQuestions(data.questions);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const numCorrect = questions
    ? questions.filter((q, i) => answers[i] === q.answerIndex).length
    : 0;

  function submitAnswers() {
    if (!questions) return;
    setSubmitted(true);
    const correct = questions.filter((q, i) => answers[i] === q.answerIndex).length;
    addPracticeRecord({
      subjectId,
      subject: subject.name,
      topic,
      difficulty,
      total: questions.length,
      correct,
    });
  }

  return (
    <>
      <div className="screen-only">
      <h1>Practice Questions</h1>
      <p className="subtitle">
        Choose a subject and topic, and the AI will write PAT-style questions
        for you.
      </p>

      <div className="card">
        <label htmlFor="subject">Subject</label>
        <select
          id="subject"
          value={subjectId}
          onChange={(e) => changeSubject(e.target.value as SubjectId)}
        >
          {SUBJECTS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <label htmlFor="topic">Topic</label>
        <select id="topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
          {subject.units.map((unit) => (
            <optgroup key={unit.name} label={unit.name}>
              {unit.topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        <label htmlFor="difficulty">Difficulty</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as "easy" | "medium" | "hard")}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <label htmlFor="count">Number of questions</label>
        <select
          id="count"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        >
          {[3, 5, 8, 10].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <button onClick={generate} disabled={loading}>
          {loading ? "Generating…" : "Generate questions"}
        </button>
      </div>

      {error && <div className="notice error">{error}</div>}
      {demoMode && questions && (
        <div className="notice demo">
          Demo mode: showing sample questions because no API key is configured
          on the server yet.
        </div>
      )}

      {questions && (
        <div className="card">
          <p style={{ textAlign: "right", margin: 0 }}>
            <button
              className="secondary"
              style={{ marginTop: 0 }}
              onClick={() => window.print()}
            >
              Print worksheet
            </button>
          </p>
          {questions.map((q, qi) => {
            const chosen = answers[qi];
            return (
              <div className="question" key={qi}>
                <p className="stem">
                  {qi + 1}. {q.question}
                </p>
                {q.options.map((opt, oi) => {
                  let cls = "option";
                  if (submitted) {
                    if (oi === q.answerIndex) cls += " correct";
                    else if (chosen === oi) cls += " incorrect";
                  } else if (chosen === oi) {
                    cls += " selected";
                  }
                  return (
                    <div
                      key={oi}
                      className={cls}
                      onClick={() =>
                        !submitted && setAnswers({ ...answers, [qi]: oi })
                      }
                    >
                      <span>{String.fromCharCode(65 + oi)}.</span>
                      <span>{opt}</span>
                    </div>
                  );
                })}
                {submitted && <div className="explanation">💡 {q.explanation}</div>}
              </div>
            );
          })}

          {!submitted ? (
            <button
              onClick={submitAnswers}
              disabled={Object.keys(answers).length < questions.length}
            >
              Check answers
            </button>
          ) : (
            <>
              <p className="result-summary">
                Score: {numCorrect} / {questions.length}
              </p>
              <button className="secondary" onClick={generate} disabled={loading}>
                {loading ? "Generating…" : "Try another set"}
              </button>
            </>
          )}
        </div>
      )}
      </div>

      {questions && (
        <div className="print-sheet">
          <p className="ws-title">Alberta PAT Prep — Practice Worksheet</p>
          <p className="ws-meta">
            {subject.name} · {topic} · Difficulty: {difficulty} ·{" "}
            {questions.length} questions
          </p>
          <div className="ws-nameline">
            <span>Name: ______________________________</span>
            <span>Date: ______________________</span>
          </div>
          {questions.map((q, qi) => (
            <div className="ws-question" key={qi}>
              <p className="ws-stem">
                {qi + 1}. {q.question}
              </p>
              {q.options.map((opt, oi) => (
                <p className="ws-option" key={oi}>
                  <span className="ws-circle" /> {String.fromCharCode(65 + oi)}.{" "}
                  {opt}
                </p>
              ))}
            </div>
          ))}
          <div className="ws-key">
            <h2>Answer Key</h2>
            <ol>
              {questions.map((q, qi) => (
                <li key={qi}>
                  <strong>{String.fromCharCode(65 + q.answerIndex)}</strong> —{" "}
                  {q.explanation}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </>
  );
}

export default function PracticePage() {
  return (
    <Suspense>
      <PracticeInner />
    </Suspense>
  );
}
