"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SUBJECTS, type Question, type SubjectId } from "@/lib/pat-data";
import { addPracticeRecord } from "@/lib/history";
import { addMistake } from "@/lib/mistakes";

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

  type TutorMessage = { role: "user" | "assistant"; content: string };
  const [tutorOpen, setTutorOpen] = useState<Record<number, boolean>>({});
  const [tutorMsgs, setTutorMsgs] = useState<Record<number, TutorMessage[]>>({});
  const [tutorInput, setTutorInput] = useState<Record<number, string>>({});
  const [tutorLoading, setTutorLoading] = useState<Record<number, boolean>>({});

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
    setTutorOpen({});
    setTutorMsgs({});
    setTutorInput({});
    setTutorLoading({});
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

  async function sendTutor(qi: number) {
    if (!questions) return;
    const text = (tutorInput[qi] ?? "").trim();
    if (!text || tutorLoading[qi]) return;
    const q = questions[qi];
    const history = [...(tutorMsgs[qi] ?? []), { role: "user" as const, content: text }];
    setTutorMsgs((prev) => ({ ...prev, [qi]: history }));
    setTutorInput((prev) => ({ ...prev, [qi]: "" }));
    setTutorLoading((prev) => ({ ...prev, [qi]: true }));
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: subject.name,
          topic,
          question: q,
          studentAnswerIndex: answers[qi],
          messages: history,
        }),
      });
      const data: { reply?: string; error?: string } = await res.json();
      const reply =
        res.ok && data.reply
          ? data.reply
          : data.error ?? "Sorry, something went wrong. Please try again.";
      setTutorMsgs((prev) => ({
        ...prev,
        [qi]: [...(prev[qi] ?? []), { role: "assistant", content: reply }],
      }));
    } catch {
      setTutorMsgs((prev) => ({
        ...prev,
        [qi]: [
          ...(prev[qi] ?? []),
          { role: "assistant", content: "Network error — please try again." },
        ],
      }));
    } finally {
      setTutorLoading((prev) => ({ ...prev, [qi]: false }));
    }
  }

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
    questions.forEach((q, i) => {
      if (answers[i] !== q.answerIndex) {
        addMistake({
          subjectId,
          subject: subject.name,
          topic,
          question: q,
          chosenIndex: answers[i] ?? -1,
        });
      }
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
                {submitted && (
                  <div className="explanation">
                    {chosen !== undefined && chosen !== q.answerIndex && (
                      <p style={{ margin: "0 0 0.5rem" }}>
                        <strong>
                          Why {String.fromCharCode(65 + chosen)} is not correct:
                        </strong>{" "}
                        {q.optionNotes?.[chosen] ??
                          "Compare your thinking with the explanation below."}
                      </p>
                    )}
                    <p style={{ margin: 0 }}>
                      <strong>
                        Correct answer — {String.fromCharCode(65 + q.answerIndex)}:
                      </strong>{" "}
                      {q.explanation}
                    </p>
                    {q.steps && q.steps.length > 0 && (
                      <div style={{ margin: "0.5rem 0 0" }}>
                        <strong>How to solve it:</strong>
                        <ol style={{ margin: "0.2rem 0 0", paddingLeft: "1.4rem" }}>
                          {q.steps.map((s, si) => (
                            <li key={si}>{s}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                    {q.concept && (
                      <p className="concept-note">
                        <strong>Knowledge point:</strong> {q.concept}
                      </p>
                    )}
                    {!tutorOpen[qi] ? (
                      <button
                        className="secondary tutor-open"
                        onClick={() =>
                          setTutorOpen((prev) => ({ ...prev, [qi]: true }))
                        }
                      >
                        Ask the AI tutor about this question
                      </button>
                    ) : (
                      <div className="tutor-box">
                        <p className="tutor-title">AI Tutor</p>
                        {(tutorMsgs[qi] ?? []).map((m, mi) => (
                          <div className={`tutor-msg ${m.role}`} key={mi}>
                            {m.content}
                          </div>
                        ))}
                        {tutorLoading[qi] && (
                          <div className="tutor-msg assistant">Thinking…</div>
                        )}
                        <div className="tutor-input">
                          <input
                            value={tutorInput[qi] ?? ""}
                            onChange={(e) =>
                              setTutorInput((prev) => ({
                                ...prev,
                                [qi]: e.target.value,
                              }))
                            }
                            onKeyDown={(e) => e.key === "Enter" && sendTutor(qi)}
                            placeholder='Ask anything about this question, e.g. "Why do we multiply first?"'
                          />
                          <button
                            onClick={() => sendTutor(qi)}
                            disabled={
                              tutorLoading[qi] || !(tutorInput[qi] ?? "").trim()
                            }
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
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
                  {q.steps && q.steps.length > 0 && (
                    <> Steps: {q.steps.join(" → ")}</>
                  )}
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
