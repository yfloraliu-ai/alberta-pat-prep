// Grade 6 PAT subjects and topics, aligned with the Alberta Programs of Study.
// Topic lists are a starting point — refine them against the current
// Alberta Education subject bulletins as the question bank grows.

export type SubjectId = "ela-reading" | "math" | "science" | "social";

export interface Subject {
  id: SubjectId;
  name: string;
  patPart: string;
  topics: string[];
}

export const SUBJECTS: Subject[] = [
  {
    id: "ela-reading",
    name: "English Language Arts — Reading",
    patPart: "ELA Part B: Reading (multiple choice)",
    topics: [
      "Narrative fiction comprehension",
      "Poetry comprehension",
      "Non-fiction / informational text",
      "Visual texts (cartoons, diagrams, ads)",
      "Vocabulary in context",
      "Author's purpose and point of view",
    ],
  },
  {
    id: "math",
    name: "Mathematics",
    patPart: "Math Part A (no calculator) & Part B (calculator allowed)",
    topics: [
      "Whole number operations and mental math",
      "Fractions, decimals and percents",
      "Ratios and rates",
      "Patterns and algebraic thinking",
      "Geometry: angles, triangles and polygons",
      "Measurement: area, perimeter and volume",
      "Data analysis and graphs",
      "Probability",
    ],
  },
  {
    id: "science",
    name: "Science",
    patPart: "Science (multiple choice)",
    topics: [
      "Air and aerodynamics",
      "Flight",
      "Sky science (astronomy)",
      "Evidence and investigation",
      "Trees and forests",
      "Scientific inquiry skills",
    ],
  },
  {
    id: "social",
    name: "Social Studies",
    patPart: "Social Studies (multiple choice)",
    topics: [
      "Citizens participating in decision making",
      "Local and provincial government in Alberta",
      "Historical models of democracy: Ancient Athens",
      "Historical models of democracy: Iroquois Confederacy",
      "Charter of Rights and Freedoms",
      "Interpreting maps, charts and sources",
    ],
  },
];

export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

// ELA Part A writing assignments as defined in the PAT.
export type WritingAssignment = "narrative" | "functional";

export const WRITING_ASSIGNMENTS: Record<
  WritingAssignment,
  { name: string; description: string }
> = {
  narrative: {
    name: "Narrative / Essay Writing",
    description:
      "A story or personal narrative in response to a picture and text prompt, scored on Content, Organization, Sentence Structure, Vocabulary and Conventions.",
  },
  functional: {
    name: "Functional Writing (Letter)",
    description:
      "A short letter with a clear purpose and audience, scored on Content (ideas and development) and Content Management (conventions).",
  },
};

export interface RubricScore {
  category: string;
  score: number; // 1-5
  comment: string;
}

export interface EssayFeedback {
  scores: RubricScore[];
  overallComment: string;
  strengths: string[];
  improvements: string[];
}
