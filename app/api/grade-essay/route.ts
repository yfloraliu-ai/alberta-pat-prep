import { NextRequest, NextResponse } from "next/server";
import { getClient, MODEL, extractText, parseJsonResponse, apiErrorMessage } from "@/lib/anthropic";
import { WRITING_ASSIGNMENTS, type EssayFeedback, type WritingAssignment } from "@/lib/pat-data";

export const maxDuration = 300;

interface GradeRequest {
  assignment: WritingAssignment;
  prompt: string;
  essay: string;
}

const DEMO_FEEDBACK: EssayFeedback = {
  scores: [
    { category: "Content", score: 4, comment: "Ideas are creative and stay on topic; add more specific detail in the middle of the story." },
    { category: "Organization", score: 4, comment: "Clear beginning, middle and end. Transitions between paragraphs could be smoother." },
    { category: "Sentence Structure", score: 3, comment: "Sentences are correct but many start the same way — vary your openings." },
    { category: "Vocabulary", score: 4, comment: "Good word choices like 'reluctantly'. Replace repeated words such as 'said'." },
    { category: "Conventions", score: 3, comment: "A few comma and dialogue punctuation errors; proofread aloud to catch them." },
  ],
  overallComment:
    "This is sample feedback (demo mode). Configure ANTHROPIC_API_KEY on the server to get real AI grading of the submitted essay.",
  strengths: ["Engaging story idea", "Clear three-part structure"],
  improvements: ["Vary sentence openings", "Check dialogue punctuation"],
};

export async function POST(request: NextRequest) {
  let body: GradeRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const assignment = WRITING_ASSIGNMENTS[body.assignment];
  if (!assignment || !body.essay?.trim()) {
    return NextResponse.json({ error: "Missing assignment type or essay text" }, { status: 400 });
  }
  if (body.essay.length > 40000) {
    return NextResponse.json({ error: "Essay is too long" }, { status: 400 });
  }

  const client = getClient();
  if (!client) {
    return NextResponse.json({ demoMode: true, feedback: DEMO_FEEDBACK });
  }

  const rubric =
    body.assignment === "narrative"
      ? `Score each of these five categories from 1 (Poor) to 5 (Excellent), matching the Alberta ELA Part A narrative rubric:
Content (ideas, development, connection to the prompt), Organization (beginning/middle/end, coherence, transitions), Sentence Structure (variety, control), Vocabulary (word choice, precision), Conventions (spelling, punctuation, grammar).`
      : `Score each of these two categories from 1 (Poor) to 5 (Excellent), matching the Alberta ELA Part A functional writing rubric:
Content (purpose, audience awareness, ideas and development), Content Management (sentence construction, vocabulary, spelling, punctuation, grammar).`;

  const prompt = `You are an experienced Alberta Grade 6 teacher marking a practice ${assignment.name} for the ELA Part A Provincial Achievement Test.

Writing prompt given to the student:
${body.prompt || "(no prompt provided)"}

Student's writing:
---
${body.essay}
---

${rubric}

Be encouraging but honest, and write all comments so a Grade 6 student can understand and act on them. Quote short examples from the student's own writing where helpful.

Reply with ONLY a JSON object in this exact shape:
{"scores": [{"category": "...", "score": 1, "comment": "..."}], "overallComment": "...", "strengths": ["..."], "improvements": ["..."]}`;

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 16000,
      messages: [{ role: "user", content: prompt }],
    });
    const feedback = parseJsonResponse<EssayFeedback>(extractText(response));
    if (!Array.isArray(feedback.scores) || feedback.scores.length === 0) {
      return NextResponse.json({ error: "The model returned no usable feedback. Please try again." }, { status: 502 });
    }
    return NextResponse.json({ demoMode: false, feedback });
  } catch (error) {
    const { status, message } = apiErrorMessage(error);
    return NextResponse.json({ error: message }, { status });
  }
}
