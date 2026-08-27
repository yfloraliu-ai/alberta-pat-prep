// Grade 6 PAT subjects, organized by curriculum unit ("organizing idea").
// Math follows the 2022 Alberta K-6 mathematics curriculum, Science the 2023
// K-6 science curriculum; ELA reading topics follow the PAT Part B skill
// areas, and Social Studies follows the Grade 6 program (democracy units)
// that the current PAT is based on. Refine against the Alberta Education
// subject bulletins as the question bank grows.

export type SubjectId = "ela-reading" | "math" | "science" | "social";

export interface Unit {
  name: string;
  topics: string[];
}

export interface Subject {
  id: SubjectId;
  name: string;
  patPart: string;
  units: Unit[];
}

export const SUBJECTS: Subject[] = [
  {
    id: "ela-reading",
    name: "English Language Arts — Reading",
    patPart: "ELA Part B: Reading (multiple choice)",
    units: [
      {
        name: "Literary texts (stories)",
        topics: [
          "Story elements: character, setting, plot",
          "Making inferences and predictions",
          "Theme and message of a story",
          "Sequence of events and cause/effect",
          "Character feelings and motivations",
        ],
      },
      {
        name: "Poetry",
        topics: [
          "Imagery and sensory language",
          "Figurative language: simile, metaphor, personification",
          "Rhyme, rhythm and form",
          "Interpreting a poem's meaning",
        ],
      },
      {
        name: "Nonfiction / informational texts",
        topics: [
          "Main idea and supporting details",
          "Text features: headings, captions, diagrams",
          "Summarizing informational text",
          "Fact versus opinion",
          "Following and interpreting instructions",
        ],
      },
      {
        name: "Visual and media texts",
        topics: [
          "Interpreting cartoons and comics",
          "Reading charts, maps and diagrams",
          "Advertisements and persuasive visuals",
        ],
      },
      {
        name: "Vocabulary and word study",
        topics: [
          "Vocabulary in context (context clues)",
          "Synonyms, antonyms and shades of meaning",
          "Root words, prefixes and suffixes",
        ],
      },
      {
        name: "Author's craft",
        topics: [
          "Author's purpose and point of view",
          "Word choice and tone",
          "Comparing texts and perspectives",
        ],
      },
    ],
  },
  {
    id: "math",
    name: "Mathematics",
    patPart: "Math Part A (no calculator) & Part B (calculator allowed)",
    units: [
      {
        name: "Number",
        topics: [
          "Place value and large numbers",
          "Standard algorithms: multiplication and division",
          "Mental math and estimation strategies",
          "Factors, multiples, prime and composite numbers",
          "Order of operations",
          "Integers and the number line",
          "Decimals: operations and rounding",
          "Fractions: equivalence and comparing",
          "Fractions, decimals and percents connections",
          "Ratios and rates",
          "Percentages in real situations",
        ],
      },
      {
        name: "Patterns and algebra",
        topics: [
          "Pattern rules and extending patterns",
          "Expressions and variables",
          "Solving one-step equations",
          "Preservation of equality",
        ],
      },
      {
        name: "Geometry and coordinate geometry",
        topics: [
          "Classifying triangles and quadrilaterals",
          "Angles: measuring and classifying",
          "Symmetry and congruence",
          "The Cartesian plane and plotting points",
          "Transformations: translations, reflections, rotations",
        ],
      },
      {
        name: "Measurement",
        topics: [
          "Area of rectangles, triangles and parallelograms",
          "Perimeter problems",
          "Volume of rectangular prisms",
          "Metric units and conversions",
          "Elapsed time problems",
        ],
      },
      {
        name: "Statistics and probability",
        topics: [
          "Collecting and organizing data",
          "Reading and creating graphs",
          "Relative frequency",
          "Misleading graphs and data interpretation",
          "Probability of simple events",
        ],
      },
    ],
  },
  {
    id: "science",
    name: "Science",
    patPart: "Science (multiple choice)",
    units: [
      {
        name: "Matter",
        topics: [
          "Properties and uses of materials",
          "Mixtures and solutions",
          "Physical and chemical changes",
        ],
      },
      {
        name: "Energy",
        topics: [
          "Light: sources, reflection and shadows",
          "Energy transfer and transformations",
          "Renewable and non-renewable energy",
          "Heat and temperature",
        ],
      },
      {
        name: "Earth systems",
        topics: [
          "Weather and climate",
          "The water cycle",
          "Natural resources and conservation",
          "Human impact on the environment",
        ],
      },
      {
        name: "Living systems",
        topics: [
          "Ecosystems and habitats",
          "Food chains and food webs",
          "Adaptations of plants and animals",
          "Biodiversity and interdependence",
        ],
      },
      {
        name: "Space",
        topics: [
          "The solar system and planets",
          "Day, night and the seasons",
          "Phases of the Moon",
          "Stars and constellations",
          "Space exploration and technology",
        ],
      },
      {
        name: "Scientific methods",
        topics: [
          "Fair tests and variables",
          "Observation, evidence and inference",
          "Reading scientific diagrams and data",
        ],
      },
      {
        name: "Classic PAT units (older practice exams)",
        topics: [
          "Air and aerodynamics",
          "Flight",
          "Sky science (astronomy)",
          "Evidence and investigation",
          "Trees and forests",
        ],
      },
    ],
  },
  {
    id: "social",
    name: "Social Studies",
    patPart: "Social Studies (multiple choice)",
    units: [
      {
        name: "Citizens participating in decision making",
        topics: [
          "Local government: municipalities, councils and bylaws",
          "Provincial government: MLAs and the legislature",
          "How laws and decisions are made",
          "Voting and elections",
          "Fairness, equity and justice in communities",
        ],
      },
      {
        name: "Rights and responsibilities",
        topics: [
          "Charter of Rights and Freedoms",
          "Rights and responsibilities of citizens",
          "Indigenous and Francophone perspectives in decision making",
        ],
      },
      {
        name: "Democracy in ancient Athens",
        topics: [
          "The Athenian assembly and citizenship",
          "Who could and could not participate in Athens",
          "Comparing Athens with Canada today",
        ],
      },
      {
        name: "The Iroquois Confederacy",
        topics: [
          "The Great Law of Peace",
          "Consensus decision making",
          "Roles in the Confederacy (clan mothers, chiefs)",
          "Comparing the Confederacy with Canada today",
        ],
      },
      {
        name: "Social studies skills",
        topics: [
          "Interpreting maps, charts and graphs",
          "Analyzing sources and evidence",
          "Current events and local issues",
        ],
      },
    ],
  },
];

export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  /** Per-option note: why each option is right or wrong (index-aligned with options). */
  optionNotes?: string[];
  /** The knowledge point / concept this question tests. */
  concept?: string;
  /** Step-by-step solution path (always present for math). */
  steps?: string[];
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
