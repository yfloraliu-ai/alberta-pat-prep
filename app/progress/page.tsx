"use client";

import { useEffect, useState } from "react";
import { SUBJECTS } from "@/lib/pat-data";
import {
  clearHistory,
  getHistory,
  getProfile,
  saveProfile,
  type HistoryRecord,
  type PracticeRecord,
  type Profile,
} from "@/lib/history";

function formatDate(when: number): string {
  return new Date(when).toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ProgressPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [nameInput, setNameInput] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProfile(getProfile());
    setHistory(getHistory());
    setLoaded(true);
  }, []);

  function createProfile() {
    if (!nameInput.trim()) return;
    setProfile(saveProfile(nameInput));
  }

  function handleClear() {
    if (!window.confirm("Delete all practice history on this device?")) return;
    clearHistory();
    setHistory([]);
  }

  if (!loaded) return null;

  if (!profile) {
    return (
      <>
        <h1>
          Set up your <span className="highlight">student profile</span>
        </h1>
        <p className="subtitle">
          Create a profile to start tracking your practice history — every
          question set and writing score gets recorded so you can watch
          yourself improve.
        </p>
        <div className="card">
          <label htmlFor="name">Your first name</label>
          <input
            id="name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createProfile()}
            placeholder="e.g. Maya"
          />
          <button onClick={createProfile} disabled={!nameInput.trim()}>
            Create profile
          </button>
          <p className="pat-part" style={{ marginTop: "0.9rem", marginBottom: 0 }}>
            Your profile and history are saved on this device. Online accounts
            that sync across devices are on the roadmap.
          </p>
        </div>
      </>
    );
  }

  const practice = history.filter(
    (r): r is PracticeRecord => r.kind === "practice",
  );
  const writing = history.filter((r) => r.kind === "writing");

  const bySubject = SUBJECTS.map((s) => {
    const records = practice.filter((r) => r.subjectId === s.id);
    const total = records.reduce((sum, r) => sum + r.total, 0);
    const correct = records.reduce((sum, r) => sum + r.correct, 0);
    return {
      subject: s,
      attempts: records.length,
      percent: total > 0 ? Math.round((correct / total) * 100) : null,
    };
  });

  const writingAvg =
    writing.length > 0
      ? (
          writing.reduce((sum, r) => sum + (r.kind === "writing" ? r.average : 0), 0) /
          writing.length
        ).toFixed(1)
      : null;

  return (
    <>
      <h1>
        {profile.name}&apos;s <span className="highlight">progress</span>
      </h1>
      <p className="subtitle">
        Every practice set and writing submission on this device is recorded
        here.
      </p>

      <p className="section-label">By subject</p>
      <div className="card">
        {bySubject.map((row, i) => (
          <div className="index-row" key={row.subject.id}>
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
            <span className="index-name">{row.subject.name}</span>
            <span className="leader" />
            <span className="go" style={{ color: "var(--ink)" }}>
              {row.attempts === 0
                ? "no practice yet"
                : `${row.attempts} ${row.attempts === 1 ? "set" : "sets"} · avg ${row.percent}%`}
            </span>
          </div>
        ))}
        <div className="index-row" style={{ borderBottom: "none" }}>
          <span className="num">05</span>
          <span className="index-name">Writing (ELA Part A)</span>
          <span className="leader" />
          <span className="go" style={{ color: "var(--ink)" }}>
            {writing.length === 0
              ? "no submissions yet"
              : `${writing.length} ${writing.length === 1 ? "submission" : "submissions"} · avg ${writingAvg}/5`}
          </span>
        </div>
      </div>

      <p className="section-label">Recent activity</p>
      <div className="card">
        {history.length === 0 ? (
          <p style={{ margin: 0, color: "var(--body-muted)" }}>
            Nothing recorded yet — finish a practice set or submit a piece of
            writing and it will show up here.{" "}
            <span className="hand-note">Off you go!</span>
          </p>
        ) : (
          history.slice(0, 20).map((r) => (
            <div className="index-row" key={r.id}>
              <span
                className="num"
                style={{ width: "7.5rem", fontSize: "0.8rem", color: "var(--muted)" }}
              >
                {formatDate(r.when)}
              </span>
              {r.kind === "practice" ? (
                <>
                  <span style={{ fontWeight: 600 }}>{r.subject}</span>
                  <span style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                    {r.topic} · {r.difficulty}
                  </span>
                  <span className="leader" />
                  <span className="score-badge">
                    {r.correct}/{r.total}
                  </span>
                </>
              ) : (
                <>
                  <span style={{ fontWeight: 600 }}>Writing — {r.assignment}</span>
                  <span className="leader" />
                  <span className="score-badge">{r.average.toFixed(1)}/5</span>
                </>
              )}
            </div>
          ))
        )}
      </div>

      <p className="pat-part">
        History is saved on this device only.{" "}
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
          Clear history
        </button>
      </p>
    </>
  );
}
