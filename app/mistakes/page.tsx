"use client";

import { useEffect, useState } from "react";
import { SUBJECTS } from "@/lib/pat-data";
import { addPracticeRecord } from "@/lib/history";
import {
  addMistake,
  clearMistakes,
  getMistakes,
  removeMistake,
  type MistakeEntry,
} from "@/lib/mistakes";

const QUIZ_CAP = 10;

function formatDate(when: number): string {
  return new Date(when).toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
  });
}

export default function MistakesPage() {
  const [entries, setEntries] = useState<MistakeEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState("all");
  const [quiz, setQuiz] = useState<MistakeEntry[] | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [mastered, setMastered] = useState(0);

  useEffect(() => {
    setEntries(getMistakes());
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  const subjectsPresent = SUBJECTS.filter((s) =>
    entries.some((e) => e.subjectId === s.id),
  );
  const filtered =
    filter === "all" ? entries : entries.filter((e) => e.subjectId === filter);

  function startQuiz() {
    setQuiz(filtered.slice(0, QUIZ_CAP));
    setAnswers({});
    setSubmitted(false);
    setMastered(0);
  }

  function checkQuiz() {
    if (!quiz) return;
    setSubmitted(true);
    let masteredCount = 0;
    quiz.forEach((entry, i) => {
      if (answers[i] === entry.question.answerIndex) {
        removeMistake(entry.id);
        masteredCount++;
      } else {
        addMistake({
          subjectId: entry.subjectId,
          subject: entry.subject,
          topic: entry.topic,
          question: entry.question,
          chosenIndex: answers[i] ?? entry.chosenIndex,
        });
      }
    });
    setMastered(masteredCount);
    addPracticeRecord({
      subjectId: "mistake-review",
      subject: "Mistake Book review",
      topic: `${quiz.length} questions retried`,
      difficulty: "review",
      total: quiz.length,
      correct: masteredCount,
    });
    setEntries(getMistakes());
  }

  function backToList() {
    setQuiz(null);
    setEntries(getMistakes());
  }

  function handleRemove(id: string) {
    removeMistake(id);
    setEntries(getMistakes());
  }

  function handleClear() {
    if (!window.confirm("Delete every question in the mistake book?")) return;
    clearMistakes();
    setEntries([]);
  }

  // ---------- Retry quiz view ----------
  if (quiz) {
    return (
      <>
        <h1>
          Retry your <span className="highlight">mistakes</span>
        </h1>
        <p className="subtitle">
          Answer each question again. Get it right and it graduates out of the
          book; get it wrong and it stays for another round.
        </p>
        <div className="card">
          {quiz.map((entry, qi) => {
            const q = entry.question;
            const chosen = answers[qi];
            return (
              <div className="question" key={entry.id}>
                <p className="pat-part" style={{ marginBottom: "0.2rem" }}>
                  {entry.subject} · {entry.topic}
                </p>
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
                    {chosen === q.answerIndex ? (
                      <p style={{ margin: 0 }}>
                        <strong>Mastered!</strong> This question has been
                        removed from your mistake book. ✓
                      </p>
                    ) : (
                      <p style={{ margin: 0 }}>
                        <strong>Not yet.</strong> It stays in the book for
                        another try.
                      </p>
                    )}
                    <p style={{ margin: "0.5rem 0 0" }}>
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
                  </div>
                )}
              </div>
            );
          })}

          {!submitted ? (
            <button
              onClick={checkQuiz}
              disabled={Object.keys(answers).length < quiz.length}
            >
              Check answers
            </button>
          ) : (
            <>
              <p className="result-summary">
                Mastered {mastered} of {quiz.length} — {mastered === quiz.length
                  ? "the whole set graduated!"
                  : "the rest stay in the book."}
              </p>
              <button className="secondary" onClick={backToList}>
                Back to the mistake book
              </button>
            </>
          )}
        </div>
      </>
    );
  }

  // ---------- List view ----------
  return (
    <>
      <h1>
        Your <span className="highlight">mistake book</span>
      </h1>
      <p className="subtitle">
        Every question you get wrong in practice lands here automatically.
        Retry them until they graduate.
      </p>

      {entries.length === 0 ? (
        <div className="card">
          <p style={{ margin: 0, color: "var(--body-muted)" }}>
            The book is empty — either you haven&apos;t practiced yet, or you
            got everything right.{" "}
            <span className="hand-note">Keep it that way!</span>
          </p>
        </div>
      ) : (
        <>
          <div className="card">
            <label htmlFor="filter">Show</label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All subjects ({entries.length})</option>
              {subjectsPresent.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({entries.filter((e) => e.subjectId === s.id).length})
                </option>
              ))}
            </select>
            <button onClick={startQuiz} disabled={filtered.length === 0}>
              Practice these again
              {filtered.length > QUIZ_CAP
                ? ` (first ${QUIZ_CAP} of ${filtered.length})`
                : ` (${filtered.length})`}
            </button>
          </div>

          <div className="card">
            {filtered.map((entry) => (
              <div className="question" key={entry.id} style={{ marginBottom: "1rem" }}>
                <div className="score-line">
                  <p className="pat-part" style={{ margin: 0 }}>
                    {entry.subject} · {entry.topic} · {formatDate(entry.when)} ·
                    wrong ×{entry.timesWrong}
                  </p>
                  <button
                    className="go"
                    style={{
                      background: "none",
                      border: "none",
                      font: "inherit",
                      cursor: "pointer",
                      padding: 0,
                      fontWeight: 600,
                    }}
                    onClick={() => handleRemove(entry.id)}
                  >
                    Remove
                  </button>
                </div>
                <p className="stem" style={{ marginTop: "0.2rem" }}>
                  {entry.question.question}
                </p>
              </div>
            ))}
          </div>

          <p className="pat-part">
            Saved on this device only.{" "}
            <button
              onClick={handleClear}
              className="go"
              style={{
                background: "none",
                border: "none",
                font: "inherit",
                cursor: "pointer",
                padding: 0,
                fontWeight: 600,
              }}
            >
              Clear the book
            </button>
          </p>
        </>
      )}
    </>
  );
}
