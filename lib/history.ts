// Local student profile and practice history, stored in the browser's
// localStorage. This is per-device storage; when the app gains a database
// and real accounts, these records can be migrated/synced.

export interface Profile {
  name: string;
  createdAt: number;
}

export interface PracticeRecord {
  id: string;
  kind: "practice";
  when: number;
  subjectId: string;
  subject: string;
  topic: string;
  difficulty: string;
  total: number;
  correct: number;
}

export interface WritingRecord {
  id: string;
  kind: "writing";
  when: number;
  assignment: string;
  average: number; // average rubric score out of 5
}

export type HistoryRecord = PracticeRecord | WritingRecord;

const PROFILE_KEY = "pat-prep-profile";
const HISTORY_KEY = "pat-prep-history";
const HISTORY_LIMIT = 500;

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // storage unavailable (private mode, blocked) — history is best-effort
  }
}

export function getProfile(): Profile | null {
  const raw = safeGet(PROFILE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Profile;
    return parsed?.name ? parsed : null;
  } catch {
    return null;
  }
}

export function saveProfile(name: string): Profile {
  const profile: Profile = { name: name.trim(), createdAt: Date.now() };
  safeSet(PROFILE_KEY, JSON.stringify(profile));
  return profile;
}

export function getHistory(): HistoryRecord[] {
  const raw = safeGet(HISTORY_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as HistoryRecord[]) : [];
  } catch {
    return [];
  }
}

function newId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return String(Date.now()) + Math.random().toString(16).slice(2);
  }
}

function push(record: HistoryRecord): void {
  const history = getHistory();
  history.unshift(record);
  safeSet(HISTORY_KEY, JSON.stringify(history.slice(0, HISTORY_LIMIT)));
}

export function addPracticeRecord(
  data: Omit<PracticeRecord, "id" | "kind" | "when">,
): void {
  push({ ...data, id: newId(), kind: "practice", when: Date.now() });
}

export function addWritingRecord(
  data: Omit<WritingRecord, "id" | "kind" | "when">,
): void {
  push({ ...data, id: newId(), kind: "writing", when: Date.now() });
}

export function clearHistory(): void {
  try {
    window.localStorage.removeItem(HISTORY_KEY);
  } catch {
    // ignore
  }
}
