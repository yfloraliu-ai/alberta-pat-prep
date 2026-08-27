import { NextRequest, NextResponse } from "next/server";
import { getClient, MODEL, extractText, parseJsonResponse, apiErrorMessage } from "@/lib/anthropic";
import { SUBJECTS, type Question } from "@/lib/pat-data";
import { DEMO_QUESTIONS } from "@/lib/demo-questions";

export const maxDuration = 300;

interface GenerateRequest {
  subjectId: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  count: number;
}

export async function POST(request: NextRequest) {
  let body: GenerateRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const subject = SUBJECTS.find((s) => s.id === body.subjectId);
  if (!subject || !body.topic || !body.count) {
    return NextResponse.json({ error: "Missing subject, topic or count" }, { status: 400 });
  }
  const count = Math.min(Math.max(1, body.count), 10);
  const difficulty = body.difficulty ?? "medium";

  const client = getClient();
  if (!client) {
    // Demo mode: no API key configured on the server yet.
    return NextResponse.json({
      demoMode: true,
      questions: DEMO_QUESTIONS[subject.id].slice(0, count),
    });
  }

  const unit = subject.units.find((u) => u.topics.includes(body.topic));

  const prompt = `You are an expert Alberta Grade 6 teacher writing practice questions for the Provincial Achievement Test (PAT).

Subject: ${subject.name} (${subject.patPart})${unit ? `\nCurriculum unit: ${unit.name}` : ""}
Topic: ${body.topic}
Difficulty: ${difficulty}
Number of questions: ${count}

Write ${count} multiple-choice questions in authentic Grade 6 PAT style:
- Age-appropriate vocabulary and Canadian/Alberta context where natural
- Exactly 4 answer options each, one correct
- Plausible distractors that reflect common student misconceptions
- A brief explanation of the correct answer written for a Grade 6 student
- For reading questions, include a short passage inside the question text

For EVERY question, also provide teaching support written for a Grade 6 student:
- "optionNotes": exactly 4 strings, index-aligned with the options. For each WRONG option, explain the specific misconception or error that leads a student to pick it; for the correct option, briefly restate why it is right.
- "concept": the knowledge point this question tests, in one or two sentences, so a student who got it wrong knows what to review.
- "steps": a numbered step-by-step solution path showing how to work from the question to the answer. ALWAYS include steps for Mathematics; for other subjects include steps when a strategy helps (e.g. how to find evidence in the passage), otherwise use an empty array.

Reply with ONLY a JSON object in this exact shape:
{"questions": [{"question": "...", "options": ["...", "...", "...", "..."], "answerIndex": 0, "explanation": "...", "optionNotes": ["...", "...", "...", "..."], "concept": "...", "steps": ["..."]}]}`;

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 16000,
      messages: [{ role: "user", content: prompt }],
    });
    const parsed = parseJsonResponse<{ questions: Question[] }>(extractText(response));
    const questions = (parsed.questions ?? []).filter(
      (q) =>
        typeof q.question === "string" &&
        Array.isArray(q.options) &&
        q.options.length === 4 &&
        typeof q.answerIndex === "number" &&
        q.answerIndex >= 0 &&
        q.answerIndex < 4,
    );
    if (questions.length === 0) {
      return NextResponse.json({ error: "The model returned no usable questions. Please try again." }, { status: 502 });
    }
    return NextResponse.json({ demoMode: false, questions });
  } catch (error) {
    const { status, message } = apiErrorMessage(error);
    return NextResponse.json({ error: message }, { status });
  }
}
