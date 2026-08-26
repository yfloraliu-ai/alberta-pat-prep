import { NextRequest, NextResponse } from "next/server";
import { getClient, MODEL, extractText, parseJsonResponse, apiErrorMessage } from "@/lib/anthropic";
import { SUBJECTS, type Question } from "@/lib/pat-data";

export const maxDuration = 300;

interface GenerateRequest {
  subjectId: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  count: number;
}

const DEMO_QUESTIONS: Question[] = [
  {
    question:
      "Sarah buys 3 notebooks for $2.45 each and a pen for $1.20. How much change does she receive from a $10 bill?",
    options: ["$1.45", "$2.35", "$3.55", "$6.35"],
    answerIndex: 0,
    explanation:
      "3 × $2.45 = $7.35. Adding the pen: $7.35 + $1.20 = $8.55. Change from $10.00 is $10.00 − $8.55 = $1.45.",
  },
  {
    question: "Which fraction is equivalent to 0.75?",
    options: ["1/4", "2/3", "3/4", "7/5"],
    answerIndex: 2,
    explanation: "0.75 means 75 hundredths, which simplifies from 75/100 to 3/4.",
  },
  {
    question: "What is the value of the expression 6 + 4 × 3?",
    options: ["30", "18", "22", "13"],
    answerIndex: 1,
    explanation:
      "Order of operations: multiply first (4 × 3 = 12), then add 6 to get 18.",
  },
];

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
      questions: DEMO_QUESTIONS.slice(0, count),
    });
  }

  const prompt = `You are an expert Alberta Grade 6 teacher writing practice questions for the Provincial Achievement Test (PAT).

Subject: ${subject.name} (${subject.patPart})
Topic: ${body.topic}
Difficulty: ${difficulty}
Number of questions: ${count}

Write ${count} multiple-choice questions in authentic Grade 6 PAT style:
- Age-appropriate vocabulary and Canadian/Alberta context where natural
- Exactly 4 answer options each, one correct
- Plausible distractors that reflect common student misconceptions
- A brief explanation of the correct answer written for a Grade 6 student
- For reading questions, include a short passage inside the question text

Reply with ONLY a JSON object in this exact shape:
{"questions": [{"question": "...", "options": ["...", "...", "...", "..."], "answerIndex": 0, "explanation": "..."}]}`;

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
