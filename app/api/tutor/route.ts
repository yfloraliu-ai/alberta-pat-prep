import { NextRequest, NextResponse } from "next/server";
import { getClient, MODEL, extractText, apiErrorMessage } from "@/lib/anthropic";
import type { Question } from "@/lib/pat-data";

export const maxDuration = 300;

interface TutorMessage {
  role: "user" | "assistant";
  content: string;
}

interface TutorRequest {
  subject: string;
  topic: string;
  question: Question;
  studentAnswerIndex?: number;
  messages: TutorMessage[];
}

const letter = (i: number) => String.fromCharCode(65 + i);

function demoReply(question: Question, priorAssistantTurns: number): string {
  if (priorAssistantTurns === 0) {
    let reply = "";
    if (question.steps && question.steps.length > 0) {
      reply += `Here's how I'd work through it: ${question.steps.join(" Then ")}. `;
    } else {
      reply += `${question.explanation} `;
    }
    if (question.concept) {
      reply += `The key idea to remember: ${question.concept} `;
    }
    return (
      reply +
      "(Demo mode: once an API key is configured on the server, I can answer your exact question and keep the conversation going like a real tutor.)"
    );
  }
  return "In demo mode I can only share the worked solution above. Once an API key is configured on the server, I can answer follow-up questions like a real tutor.";
}

export async function POST(request: NextRequest) {
  let body: TutorRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const q = body.question;
  if (
    !q ||
    typeof q.question !== "string" ||
    !Array.isArray(q.options) ||
    typeof q.answerIndex !== "number" ||
    !Array.isArray(body.messages) ||
    body.messages.length === 0 ||
    body.messages.length > 20 ||
    body.messages.some(
      (m) =>
        (m.role !== "user" && m.role !== "assistant") ||
        typeof m.content !== "string" ||
        m.content.length > 2000,
    )
  ) {
    return NextResponse.json({ error: "Invalid tutor request" }, { status: 400 });
  }

  const client = getClient();
  if (!client) {
    const priorAssistantTurns = body.messages.filter(
      (m) => m.role === "assistant",
    ).length;
    return NextResponse.json({
      demoMode: true,
      reply: demoReply(q, priorAssistantTurns),
    });
  }

  const studentAnswer =
    typeof body.studentAnswerIndex === "number"
      ? body.studentAnswerIndex === q.answerIndex
        ? `The student answered ${letter(body.studentAnswerIndex)}, which is CORRECT.`
        : `The student answered ${letter(body.studentAnswerIndex)} ("${q.options[body.studentAnswerIndex] ?? ""}"), which is WRONG.`
      : "The student has not answered yet.";

  const system = `You are a warm, patient tutor helping an Alberta Grade 6 student (about 11-12 years old) understand one practice question for the Provincial Achievement Test.

The question being discussed:
Subject: ${body.subject ?? "unknown"} — Topic: ${body.topic ?? "unknown"}
Question: ${q.question}
Options: ${q.options.map((opt, i) => `${letter(i)}. ${opt}`).join(" | ")}
Correct answer: ${letter(q.answerIndex)}
${studentAnswer}
Explanation: ${q.explanation}${q.steps?.length ? `\nSolution steps: ${q.steps.join(" → ")}` : ""}${q.concept ? `\nKnowledge point: ${q.concept}` : ""}

How to tutor:
- Reply in 2-6 short sentences of simple, friendly English a Grade 6 student understands. Plain text only — no markdown headings or bullet lists.
- Answer the student's actual question; don't just restate the full solution.
- If they picked a wrong answer, gently address the specific misconception behind their choice.
- When it helps, end with ONE small guiding question so they think for themselves.
- Be encouraging and specific; never sarcastic, never fake praise.
- Stay on this question and its topic. If asked something unrelated to schoolwork, kindly steer back to the question.`;

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 16000,
      system,
      messages: body.messages,
    });
    const reply = extractText(response).trim();
    if (!reply) {
      return NextResponse.json(
        { error: "The tutor gave no reply. Please try again." },
        { status: 502 },
      );
    }
    return NextResponse.json({ demoMode: false, reply });
  } catch (error) {
    const { status, message } = apiErrorMessage(error);
    return NextResponse.json({ error: message }, { status });
  }
}
