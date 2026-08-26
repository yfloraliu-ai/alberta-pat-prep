import { NextRequest, NextResponse } from "next/server";
import { getClient, MODEL, extractText, parseJsonResponse, apiErrorMessage } from "@/lib/anthropic";
import { SUBJECTS, type Question, type SubjectId } from "@/lib/pat-data";

export const maxDuration = 300;

interface GenerateRequest {
  subjectId: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  count: number;
}

const DEMO_QUESTIONS: Record<SubjectId, Question[]> = {
  math: [
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
  ],
  "ela-reading": [
    {
      question:
        'Read the passage: "Jenna stared at the empty bird feeder. Yesterday it had been full. She noticed tiny paw prints in the snow below it, leading toward the old spruce tree." What can the reader conclude?',
      options: [
        "The birds ate all the seeds",
        "A small animal likely took the seeds",
        "Jenna forgot to fill the feeder",
        "The wind blew the seeds away",
      ],
      answerIndex: 1,
      explanation:
        "The paw prints in the snow are evidence that a small animal, not birds or wind, took the seeds. Good readers use clues in the text to draw conclusions.",
    },
    {
      question:
        'In the sentence "The ancient truck wheezed up the hill," the word "wheezed" helps the reader understand that the truck was…',
      options: ["fast and new", "old and struggling", "quiet and smooth", "shiny and clean"],
      answerIndex: 1,
      explanation:
        "\"Wheezed\" is usually used for breathing with difficulty. The author uses it to show the old truck was struggling — this is an example of word choice creating a picture.",
    },
    {
      question:
        "An author writes an article listing facts about why school gardens help students learn. The author's main purpose is to…",
      options: ["entertain readers", "inform readers", "tell a personal story", "describe a character"],
      answerIndex: 1,
      explanation:
        "A factual article that explains benefits is written to inform. Texts that entertain usually tell stories; texts that persuade push you to act or agree.",
    },
  ],
  science: [
    {
      question: "Which of these is the best evidence that the Moon does not make its own light?",
      options: [
        "The Moon looks different on different nights",
        "We only see the part of the Moon lit by the Sun",
        "The Moon is smaller than Earth",
        "The Moon has craters on its surface",
      ],
      answerIndex: 1,
      explanation:
        "The Moon's phases happen because we see only the part reflecting sunlight. That shows its light comes from the Sun, not from the Moon itself.",
    },
    {
      question:
        "A student finds a footprint at the scene of a classroom 'mystery.' To identify whose shoe made it, the most useful thing to compare is the…",
      options: [
        "colour of the shoe",
        "price of the shoe",
        "tread pattern and size of the sole",
        "brand name printed on the box",
      ],
      answerIndex: 2,
      explanation:
        "In evidence and investigation, footprints are matched by tread pattern and size — physical evidence that can be compared directly, unlike colour or price.",
    },
    {
      question: "An airplane wing helps a plane fly mainly because its shape causes…",
      options: [
        "air to push equally on both sides",
        "faster airflow over the top, creating lift",
        "the plane to become lighter",
        "the engine to work harder",
      ],
      answerIndex: 1,
      explanation:
        "A wing's curved top makes air flow faster over it, lowering pressure above the wing so the higher pressure below pushes the plane up. This force is called lift.",
    },
  ],
  social: [
    {
      question: "In ancient Athens, who was allowed to vote in the Assembly?",
      options: [
        "All people living in Athens",
        "Adult male citizens only",
        "Women and children",
        "Enslaved people and foreigners",
      ],
      answerIndex: 1,
      explanation:
        "Athens was an early democracy, but only adult male citizens could vote. Women, enslaved people and foreigners were excluded — an important limit of Athenian democracy.",
    },
    {
      question:
        "In the Iroquois Confederacy, decisions were made when all the nations reached…",
      options: ["a majority vote", "consensus", "a royal decree", "a written contract"],
      answerIndex: 1,
      explanation:
        "The Confederacy's Grand Council talked until everyone could agree — decision by consensus, which is different from majority voting used in many governments today.",
    },
    {
      question: "Which level of government in Alberta is responsible for schools and health care?",
      options: ["Municipal (city) government", "Provincial government", "Federal government", "School patrol"],
      answerIndex: 1,
      explanation:
        "In Canada, provinces are responsible for education and health care. Cities handle local services like roads and parks; the federal government handles national matters.",
    },
  ],
};

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
