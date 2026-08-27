// Mistake book: wrongly-answered questions saved for later review.
// Stored in localStorage (per-device), same as the practice history.

import type { Question } from "@/lib/pat-data";

export interface MistakeEntry {
  id: string;
  when: number; // last time it was answered wrong
  subjectId: string;
  subject: string;
  topic: string;
  question: Question;
  chosenIndex: number; // the wrong option chosen most recently
  timesWrong: number;
}

const KEY = "pat-prep-mistakes";
const LIMIT = 200;

function safeGet(): MistakeEntry[] {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) || "[]");
    return Array.isArray(parsed) ? (parsed as MistakeEntry[]) : [];
  } catch {
    return [];
  }
}

function safeSet(entries: MistakeEntry[]): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(entries.slice(0, LIMIT)));
  } catch {
    // storage unavailable — mistake book is best-effort
  }
}

function newId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return String(Date.now()) + Math.random().toString(16).slice(2);
  }
}

export function getMistakes(): MistakeEntry[] {
  return safeGet();
}

export function addMistake(
  data: Omit<MistakeEntry, "id" | "when" | "timesWrong">,
): void {
  const entries = safeGet();
  // The same question (by text) answered wrong again updates the existing entry.
  const existingIndex = entries.findIndex(
    (e) => e.question.question === data.question.question,
  );
  if (existingIndex >= 0) {
    const existing = entries[existingIndex];
    entries.splice(existingIndex, 1);
    entries.unshift({
      ...existing,
      when: Date.now(),
      chosenIndex: data.chosenIndex,
      timesWrong: existing.timesWrong + 1,
    });
  } else {
    entries.unshift({ ...data, id: newId(), when: Date.now(), timesWrong: 1 });
  }
  safeSet(entries);
}

export function removeMistake(id: string): void {
  safeSet(safeGet().filter((e) => e.id !== id));
}

export function clearMistakes(): void {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
