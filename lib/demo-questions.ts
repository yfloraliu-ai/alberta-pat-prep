import type { Question, SubjectId } from "@/lib/pat-data";

// Sample question bank used in demo mode (no API key configured).
// Ten PAT-style questions per subject, each with per-option notes,
// the knowledge point tested, and (for math) a step-by-step solution.
export const DEMO_QUESTIONS: Record<SubjectId, Question[]> = {
  math: [
    {
      question:
        "Sarah buys 3 notebooks for $2.45 each and a pen for $1.20. How much change does she receive from a $10 bill?",
      options: ["$1.45", "$2.35", "$3.55", "$6.35"],
      answerIndex: 0,
      explanation:
        "The total cost is 3 × $2.45 + $1.20 = $8.55, so the change is $10.00 − $8.55 = $1.45.",
      optionNotes: [
        "Correct: 3 × $2.45 = $7.35, plus $1.20 = $8.55, and $10.00 − $8.55 = $1.45.",
        "This usually comes from a regrouping (borrowing) slip in $10.00 − $8.55 — line up the decimal points and borrow carefully.",
        "This forgets one of the three notebooks. The question says 3 notebooks, so multiply $2.45 by 3 first.",
        "This is the change if Sarah bought only ONE notebook and the pen ($10.00 − $3.65). Read how many of each item she buys.",
      ],
      steps: [
        "Cost of the notebooks: 3 × $2.45 = $7.35",
        "Add the pen: $7.35 + $1.20 = $8.55",
        "Subtract from what she paid: $10.00 − $8.55 = $1.45",
      ],
      concept:
        "Multi-step money problems: multiply to find the cost of equal items, add all the costs, then subtract the total from the amount paid.",
    },
    {
      question: "Which fraction is equivalent to 0.75?",
      options: ["1/4", "2/3", "3/4", "7/5"],
      answerIndex: 2,
      explanation: "0.75 means 75 hundredths; 75/100 simplifies to 3/4.",
      optionNotes: [
        "1/4 equals 0.25, not 0.75 — that is one quarter, but 0.75 is three quarters.",
        "2/3 is about 0.67. It is close to 0.75 but not equal — check by dividing 2 ÷ 3.",
        "Correct: 0.75 = 75/100 = 3/4.",
        "7/5 is greater than 1 (it equals 1.4), but 0.75 is less than 1. The digits 7 and 5 don't simply become the fraction.",
      ],
      steps: [
        "Read the decimal by place value: 0.75 means 75 hundredths, or 75/100",
        "Find a common factor of 75 and 100: both divide by 25",
        "75 ÷ 25 = 3 and 100 ÷ 25 = 4, so 0.75 = 3/4",
      ],
      concept:
        "Connecting decimals and fractions: read the decimal by place value, write it over 100, then simplify by dividing by a common factor.",
    },
    {
      question: "What is the value of the expression 6 + 4 × 3?",
      options: ["30", "18", "22", "13"],
      answerIndex: 1,
      explanation: "Multiply first (4 × 3 = 12), then add 6 to get 18.",
      optionNotes: [
        "30 comes from adding first (6 + 4 = 10) and then multiplying by 3. Order of operations says multiply BEFORE adding.",
        "Correct: 4 × 3 = 12 first, then 6 + 12 = 18.",
        "Check the multiplication: 4 × 3 = 12, not 16.",
        "13 comes from adding all three numbers (6 + 4 + 3). The × sign means multiply, not add.",
      ],
      steps: [
        "Order of operations: multiplication and division come before addition and subtraction",
        "Multiply: 4 × 3 = 12",
        "Add: 6 + 12 = 18",
      ],
      concept:
        "Order of operations (BEDMAS): Brackets, Exponents, Division/Multiplication left to right, then Addition/Subtraction left to right.",
    },
    {
      question:
        "In a class of 24 students, 15 walk to school. What is the ratio of students who walk to all students, in simplest form?",
      options: ["15:24", "5:8", "8:5", "3:5"],
      answerIndex: 1,
      explanation: "15:24 simplifies to 5:8 after dividing both terms by 3.",
      optionNotes: [
        "15:24 is the right comparison, but the question asks for simplest form — both numbers can still be divided by 3.",
        "Correct: 15 ÷ 3 = 5 and 24 ÷ 3 = 8, so the ratio is 5:8.",
        "8:5 reverses the order. The question asks walkers to ALL students, so the walkers' number comes first.",
        "Check the division: 15 ÷ 3 = 5 and 24 ÷ 3 = 8. 3:5 would compare walkers to non-walkers (15:9 is not 3:5 either).",
      ],
      steps: [
        "Write the ratio in the order asked: walkers to all students = 15:24",
        "Find the greatest common factor of 15 and 24: it is 3",
        "Divide both terms by 3: 15:24 = 5:8",
      ],
      concept:
        "Ratios compare quantities in a set order; simplify a ratio by dividing both terms by their greatest common factor.",
    },
    {
      question: "A triangle has a base of 8 cm and a height of 5 cm. What is its area?",
      options: ["40 cm²", "20 cm²", "13 cm²", "26 cm²"],
      answerIndex: 1,
      explanation: "Area of a triangle = base × height ÷ 2 = 8 × 5 ÷ 2 = 20 cm².",
      optionNotes: [
        "40 cm² is base × height without dividing by 2 — that's the area of a RECTANGLE with these measurements.",
        "Correct: 8 × 5 = 40, then 40 ÷ 2 = 20 cm².",
        "13 comes from adding 8 + 5. Area needs multiplication, not addition.",
        "26 looks like perimeter-style thinking (8 + 5 doubled). Area of a triangle is base × height ÷ 2.",
      ],
      steps: [
        "Write the formula: Area of a triangle = base × height ÷ 2",
        "Multiply: 8 × 5 = 40",
        "Divide by 2: 40 ÷ 2 = 20, so the area is 20 cm²",
      ],
      concept:
        "A triangle is half of a rectangle (or parallelogram) with the same base and height, so its area is base × height ÷ 2.",
    },
    {
      question:
        "The temperature in Edmonton was −8 °C in the morning. By afternoon it had risen by 12 °C. What was the afternoon temperature?",
      options: ["−4 °C", "4 °C", "20 °C", "−20 °C"],
      answerIndex: 1,
      explanation: "Rising 12 degrees from −8 °C: −8 + 12 = 4 °C.",
      optionNotes: [
        "−4 keeps a negative sign by mistake. From −8, moving UP 12 crosses zero into positive numbers.",
        "Correct: −8 + 12 = 4. Moving up 8 reaches 0, then 4 more reaches 4 °C.",
        "20 treats both numbers as positive (8 + 12). The morning temperature was BELOW zero.",
        "−20 moves DOWN 12 degrees instead of up. 'Rose' means the temperature increased.",
      ],
      steps: [
        "Start at −8 on the number line",
        "'Rose by 12' means add 12: −8 + 12",
        "Split the jump at zero: −8 + 8 = 0, then 0 + 4 = 4 °C",
      ],
      concept:
        "Adding integers on a number line: a rise moves toward positive numbers; splitting the jump at zero makes it easy to compute.",
    },
    {
      question: "What is the next number in the pattern 3, 7, 11, 15, …?",
      options: ["18", "19", "20", "16"],
      answerIndex: 1,
      explanation: "The pattern rule is add 4 each time, so 15 + 4 = 19.",
      optionNotes: [
        "18 would mean adding 3 — but check the gaps: 7 − 3 = 4.",
        "Correct: each term goes up by 4, and 15 + 4 = 19.",
        "20 would mean adding 5. Test the rule on the terms you already have: 3 + 4 = 7 works; 3 + 5 = 8 does not.",
        "16 adds only 1. Compare neighbouring terms to find the real gap.",
      ],
      steps: [
        "Find the difference between neighbouring terms: 7 − 3 = 4",
        "Check the rule holds: 11 − 7 = 4 and 15 − 11 = 4 ✓",
        "Apply the rule to the last term: 15 + 4 = 19",
      ],
      concept:
        "Increasing patterns: find the constant difference between terms, verify it on every pair, then extend the pattern.",
    },
    {
      question: "If 4n = 32, what is the value of n?",
      options: ["8", "28", "36", "128"],
      answerIndex: 0,
      explanation: "4n means 4 × n, so n = 32 ÷ 4 = 8.",
      optionNotes: [
        "Correct: dividing both sides by 4 keeps the equation balanced, and 32 ÷ 4 = 8.",
        "28 subtracts 4 from 32 — but 4n means 4 TIMES n, so you must divide, not subtract.",
        "36 adds 4 to 32. To undo multiplication, use the opposite operation: division.",
        "128 multiplies 32 by 4 — that goes the wrong way. If 4 × n = 32, n must be SMALLER than 32.",
      ],
      steps: [
        "4n means 4 × n",
        "Undo multiplying by 4 with dividing by 4 — on BOTH sides, to keep the equation equal",
        "n = 32 ÷ 4 = 8. Check: 4 × 8 = 32 ✓",
      ],
      concept:
        "Preservation of equality: an equation stays true when you do the same operation to both sides; undo an operation with its inverse.",
    },
    {
      question: "What is 25% of 80?",
      options: ["20", "25", "32", "60"],
      answerIndex: 0,
      explanation: "25% is one quarter, and 80 ÷ 4 = 20.",
      optionNotes: [
        "Correct: 25% = 1/4, and one quarter of 80 is 20.",
        "25 just repeats the percent number. 25% OF 80 means a quarter of 80, not 25 itself.",
        "32 is 40% of 80. Remember the benchmark: 25% = one quarter.",
        "60 is what is LEFT after taking 25% away (80 − 20). The question asks for the part taken, not the remainder.",
      ],
      steps: [
        "25% means 25 out of every 100 — the same as the fraction 1/4",
        "Find one quarter of 80: 80 ÷ 4",
        "80 ÷ 4 = 20",
      ],
      concept:
        "Percent means 'out of 100'. Benchmark percents (25% = 1/4, 50% = 1/2, 10% = 1/10) turn percent problems into easy division.",
    },
    {
      question:
        "A bag holds 3 red, 2 blue and 5 green marbles. What is the probability of picking a blue marble?",
      options: ["1/5", "1/2", "2/8", "1/10"],
      answerIndex: 0,
      explanation: "There are 10 marbles and 2 are blue: 2/10 = 1/5.",
      optionNotes: [
        "Correct: 2 blue out of 3 + 2 + 5 = 10 marbles gives 2/10, which simplifies to 1/5.",
        "1/2 might come from comparing blue to just one other colour. Probability compares blue to ALL the marbles.",
        "2/8 leaves the 2 blue marbles out of the total. The total must count every marble: 3 + 2 + 5 = 10.",
        "1/10 counts only 1 blue marble, but there are 2.",
      ],
      steps: [
        "Count all possible outcomes: 3 + 2 + 5 = 10 marbles",
        "Count favourable outcomes: 2 blue marbles",
        "Probability = favourable ÷ total = 2/10 = 1/5",
      ],
      concept:
        "Probability of an event = favourable outcomes ÷ total possible outcomes, written as a fraction in simplest form.",
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
        "The paw prints in the snow are evidence that a small animal took the seeds.",
      optionNotes: [
        "The text never mentions birds at the feeder — and birds don't leave paw prints in the snow.",
        "Correct: paw prints leading away are direct evidence of an animal visitor.",
        "The passage says the feeder was full yesterday, so it was filled — not forgotten.",
        "Wind might scatter seeds, but it can't explain the paw prints — the strongest clue in the text.",
      ],
      concept:
        "Drawing conclusions (inference): combine the clues the author gives with what you know. The best conclusion is the one the evidence supports.",
    },
    {
      question:
        'In the sentence "The ancient truck wheezed up the hill," the word "wheezed" helps the reader understand that the truck was…',
      options: ["fast and new", "old and struggling", "quiet and smooth", "shiny and clean"],
      answerIndex: 1,
      explanation:
        "\"Wheezed\" describes strained, difficult breathing — the author uses it to show the old truck struggling.",
      optionNotes: [
        "A fast, new truck would be described with smooth, powerful words — not a breathing-with-difficulty word.",
        "Correct: \"wheezed\" (plus \"ancient\") paints a truck that is old and working hard.",
        "Wheezing is a noisy, strained sound — the opposite of quiet and smooth.",
        "The sentence says nothing about how the truck looks — \"wheezed\" is about how it moves and sounds.",
      ],
      concept:
        "Word choice (connotation): authors pick vivid verbs to create a picture. Ask what feeling the word carries, not just its dictionary meaning.",
    },
    {
      question:
        "An author writes an article listing facts about why school gardens help students learn. The author's main purpose is to…",
      options: ["entertain readers", "inform readers", "tell a personal story", "describe a character"],
      answerIndex: 1,
      explanation: "A factual article that explains benefits is written to inform.",
      optionNotes: [
        "Texts written to entertain usually tell stories or make you laugh — this one lists facts.",
        "Correct: facts and explanations signal that the purpose is to inform.",
        "A personal story would use \"I\" and tell events in order; this is an article of facts.",
        "Describing a character belongs to fiction — there is no character here.",
      ],
      concept:
        "Author's purpose: to inform (facts and explanations), to entertain (stories), or to persuade (convince you to act or agree). Ask what the text mostly does.",
    },
    {
      question:
        '"The wind whispered through the trees." Which type of figurative language is this?',
      options: ["Simile", "Metaphor", "Personification", "Alliteration"],
      answerIndex: 2,
      explanation:
        "Personification gives a human action — whispering — to something non-human, the wind.",
      optionNotes: [
        "A simile compares using \"like\" or \"as\" (\"the wind was like a whisper\") — there is no like/as here.",
        "A metaphor says one thing IS another (\"the wind was a whisper\"). Here the wind is DOING a human action instead.",
        "Correct: whispering is a human action given to the wind — that's personification.",
        "Alliteration repeats beginning sounds (\"wild windy woods\") — this sentence doesn't.",
      ],
      concept:
        "Figurative language: simile (like/as), metaphor (is), personification (human actions for non-human things), alliteration (repeated first sounds).",
    },
    {
      question:
        'Read the passage: "Beavers are nature\'s engineers. They cut down trees with their strong teeth, drag branches into streams, and build dams that create ponds. These ponds become homes for fish, ducks and many other animals." What is the main idea?',
      options: [
        "Beavers have strong teeth",
        "Ponds are full of fish",
        "Beavers' dam building creates homes for many animals",
        "Trees grow near streams",
      ],
      answerIndex: 2,
      explanation:
        "The whole passage explains how beaver dams create ponds where other animals live.",
      optionNotes: [
        "Strong teeth is one detail from one sentence — the passage is about more than teeth.",
        "Fish appear only in the last sentence, as an example — a detail, not the big idea.",
        "Correct: every sentence supports this one idea — beavers build dams, and the dams create homes.",
        "Trees are mentioned only as building material — the passage isn't about where trees grow.",
      ],
      concept:
        "Main idea vs. details: the main idea covers the WHOLE passage; details support it. If a choice matches only one sentence, it's a detail.",
    },
    {
      question:
        "A student wants to quickly find the meaning of a bold word in a textbook. Where should the student look?",
      options: ["The index", "The glossary", "The table of contents", "The title page"],
      answerIndex: 1,
      explanation: "A glossary lists a book's important words with their meanings.",
      optionNotes: [
        "The index lists topics with PAGE NUMBERS — useful for finding where a topic appears, not what a word means.",
        "Correct: bold words in textbooks are usually defined in the glossary at the back.",
        "The table of contents lists chapters and sections — no definitions there.",
        "The title page gives the book's title and author only.",
      ],
      concept:
        "Text features: glossary = word meanings; index = page numbers by topic; table of contents = chapter list. Each feature has a job.",
    },
    {
      question: "Which of these sentences states an opinion?",
      options: [
        "The game starts at 7:00 p.m.",
        "Hockey is the most exciting sport in Canada",
        "The arena holds 500 people",
        "Tickets cost ten dollars",
      ],
      answerIndex: 1,
      explanation:
        "\"Most exciting\" is a personal judgment that cannot be proven — an opinion.",
      optionNotes: [
        "A start time can be checked on a schedule — that makes it a fact.",
        "Correct: words like \"most exciting\", \"best\" and \"should\" signal opinions — judgments people can disagree about.",
        "The arena's capacity can be counted and verified — a fact.",
        "A ticket price can be checked — a fact.",
      ],
      concept:
        "Fact vs. opinion: a fact can be checked and proven; an opinion is a judgment. Signal words for opinions: best, worst, most, should, believe.",
    },
    {
      question:
        '"The arid desert had not seen rain for many months, and the ground was cracked." Based on the sentence, "arid" means…',
      options: ["very cold", "very wet", "very dry", "very windy"],
      answerIndex: 2,
      explanation:
        "The clues \"no rain for months\" and \"cracked ground\" show that arid means very dry.",
      optionNotes: [
        "Nothing in the sentence mentions temperature — the clues are all about rain and dryness.",
        "\"Had not seen rain for many months\" is the opposite of wet.",
        "Correct: no rain plus cracked ground point to dryness.",
        "There are no clues about wind — always match your answer to the clues actually given.",
      ],
      concept:
        "Context clues: when you meet an unknown word, the nearby words often reveal its meaning. Find the clues, then test each choice against them.",
    },
    {
      question:
        '"Marcus checked his backpack three times, laid out his clothes, and set two alarms before bed." The reader can infer that Marcus…',
      options: [
        "does not care about tomorrow",
        "has something important happening tomorrow",
        "plans to stay up all night",
        "has lost his backpack",
      ],
      answerIndex: 1,
      explanation:
        "His careful preparations are clues that tomorrow matters a lot to him.",
      optionNotes: [
        "Someone who didn't care wouldn't check a backpack three times — the actions show the opposite.",
        "Correct: triple-checking, preparing clothes and setting two alarms all point to an important day ahead.",
        "Setting alarms means he plans to SLEEP and wake up on time.",
        "He is checking his backpack, so he clearly has it.",
      ],
      concept:
        "Inferring about characters: actions are clues to feelings and plans. Ask what all the actions have in common.",
    },
    {
      question: "Which sentence contains a simile?",
      options: [
        "Her smile was as bright as the morning sun.",
        "The thunder grumbled all night.",
        "The leaves danced in the wind.",
        "He hurried home before dark.",
      ],
      answerIndex: 0,
      explanation:
        "A simile compares two things using \"as\" or \"like\" — here, a smile and the sun.",
      optionNotes: [
        "Correct: \"as bright as the morning sun\" uses AS to compare — the mark of a simile.",
        "Thunder \"grumbling\" gives a human action to thunder — that's personification.",
        "Leaves \"dancing\" is also personification, not a comparison with like/as.",
        "This sentence is literal — no figurative language at all.",
      ],
      concept:
        "A simile always uses \"like\" or \"as\" to compare. If a non-human thing does a human action instead, that's personification.",
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
        "We only ever see the sunlit part of the Moon — its light is reflected sunlight.",
      optionNotes: [
        "Phases show the Moon changes appearance, but on their own don't explain WHERE the light comes from — B does.",
        "Correct: the bright part always faces the Sun, which shows the light is reflected, not produced.",
        "Size has nothing to do with whether something produces light.",
        "Craters tell us about impacts, not about light.",
      ],
      concept:
        "The Moon reflects sunlight. Its phases happen because, as the Moon orbits Earth, we see different amounts of its sunlit half.",
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
        "Footprints are matched by tread pattern and size — measurable physical evidence.",
      optionNotes: [
        "A print doesn't record colour — colour can't be compared to a footprint.",
        "Price leaves no mark on the ground.",
        "Correct: the tread pattern and sole size are recorded IN the print and can be compared shoe by shoe.",
        "The box never touched the floor — only the sole leaves evidence.",
      ],
      concept:
        "Evidence and investigation: useful evidence is something recorded at the scene that can be observed, measured and compared — like tread patterns.",
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
        "Air moves faster over the curved top, lowering pressure there; higher pressure below pushes the wing up — lift.",
      optionNotes: [
        "If air pushed equally on both sides, there would be no upward force at all.",
        "Correct: the curved top speeds up the airflow, lowering pressure above the wing, so the wing is pushed up.",
        "The plane's weight doesn't change — lift OVERCOMES weight; it doesn't remove it.",
        "Engines provide thrust (forward force); the wing's shape is what turns moving air into lift.",
      ],
      concept:
        "Four forces of flight: lift (up, from the wings), gravity (down), thrust (forward, from engines), drag (backward). Wing shape creates lift.",
    },
    {
      question: "Which sequence shows the correct order of steps in the water cycle?",
      options: [
        "Precipitation → evaporation → condensation",
        "Evaporation → condensation → precipitation",
        "Condensation → evaporation → precipitation",
        "Evaporation → precipitation → condensation",
      ],
      answerIndex: 1,
      explanation:
        "Water evaporates from lakes and oceans, condenses into clouds, then falls as precipitation.",
      optionNotes: [
        "This starts with rain falling — but the rain has to get into the sky first, by evaporation and condensation.",
        "Correct: liquid water rises as vapour (evaporation), forms clouds (condensation), and falls back (precipitation).",
        "Condensation needs water vapour in the air first — evaporation must come before it.",
        "Vapour can't fall as rain before it condenses into droplets — condensation comes before precipitation.",
      ],
      concept:
        "The water cycle: the Sun's heat evaporates water → vapour cools and condenses into clouds → water falls as precipitation → collects and repeats.",
    },
    {
      question: "In the food chain grass → rabbit → hawk, the rabbit is a…",
      options: ["producer", "herbivore", "carnivore", "decomposer"],
      answerIndex: 1,
      explanation: "The rabbit eats plants, which makes it a herbivore.",
      optionNotes: [
        "Producers make their own food using sunlight — that's the grass, not the rabbit.",
        "Correct: the rabbit eats only plants (grass), so it is a herbivore — the first consumer in this chain.",
        "A carnivore eats other animals — that's the hawk in this chain.",
        "Decomposers (like fungi and bacteria) break down dead material — they aren't shown in this chain.",
      ],
      concept:
        "Food chain roles: producers make food from sunlight; herbivores eat plants; carnivores eat animals; decomposers break down dead things. Arrows mean 'is eaten by'.",
    },
    {
      question: "How do the spines on a cactus help it survive in the desert?",
      options: [
        "They attract insects for pollination",
        "They protect the plant and reduce water loss",
        "They make food through photosynthesis",
        "They soak up rain like roots",
      ],
      answerIndex: 1,
      explanation:
        "Spines keep thirsty animals away and, unlike wide leaves, lose very little water.",
      optionNotes: [
        "Flowers attract pollinators; spines do the opposite job — keeping visitors away.",
        "Correct: spines are modified leaves — they defend the plant and their tiny surface loses almost no water.",
        "Photosynthesis happens in the green stem of a cactus, not in the spines.",
        "Water is absorbed by the roots underground; spines can't soak up rain.",
      ],
      concept:
        "Adaptations are body features or behaviours that help a living thing survive in its habitat. Desert plants are adapted to save water and deter animals.",
    },
    {
      question: "Which method would best separate salt from salt water?",
      options: ["Filtering", "Using a magnet", "Evaporation", "Stirring"],
      answerIndex: 2,
      explanation:
        "When the water evaporates, the dissolved salt is left behind.",
      optionNotes: [
        "Dissolved salt is spread through the water in particles too small for a filter to catch — filtering works for UNdissolved solids like sand.",
        "Salt is not magnetic, so a magnet does nothing here.",
        "Correct: evaporate the water (by heat or time) and the salt crystals stay behind.",
        "Stirring mixes things MORE — it doesn't separate them.",
      ],
      concept:
        "Separating mixtures: choose the method that matches the mixture — filtering for undissolved solids, evaporation for dissolved solids, magnets for magnetic metals.",
    },
    {
      question: "Which of these energy sources is renewable?",
      options: ["Coal", "Natural gas", "Wind", "Gasoline"],
      answerIndex: 2,
      explanation:
        "Wind keeps blowing and cannot be used up, so it is renewable.",
      optionNotes: [
        "Coal is a fossil fuel that took millions of years to form — once burned, it's gone.",
        "Natural gas is also a fossil fuel — non-renewable.",
        "Correct: wind is replenished naturally and constantly — using it today doesn't reduce tomorrow's supply.",
        "Gasoline is made from oil, another fossil fuel.",
      ],
      concept:
        "Renewable energy (wind, solar, moving water) is replenished naturally; fossil fuels (coal, oil, natural gas) take millions of years to form, so they are non-renewable.",
    },
    {
      question: "The main reason Earth has seasons is…",
      options: [
        "Earth moves closer to and farther from the Sun",
        "the tilt of Earth's axis as it orbits the Sun",
        "the phases of the Moon",
        "changes in cloud cover",
      ],
      answerIndex: 1,
      explanation:
        "Earth's tilted axis means each hemisphere gets more direct sunlight for part of the year.",
      optionNotes: [
        "A common misconception! Earth is actually CLOSEST to the Sun in January — winter in Alberta — so distance can't be the cause.",
        "Correct: the 23.5° tilt means the northern hemisphere leans toward the Sun in summer (direct light, long days) and away in winter.",
        "The Moon's phases don't change how much sunlight Earth receives.",
        "Clouds change day-to-day weather, not the yearly pattern of seasons.",
      ],
      concept:
        "Seasons come from Earth's tilted axis: the hemisphere tilted toward the Sun gets more direct light and longer days — summer; tilted away — winter.",
    },
    {
      question:
        "A student is testing whether the amount of water affects how fast bean plants grow. To make it a fair test, the student should…",
      options: [
        "use a different type of soil for each plant",
        "put some plants in the sun and some in the shade",
        "keep everything the same except the amount of water",
        "measure only the plant that grows fastest",
      ],
      answerIndex: 2,
      explanation:
        "In a fair test, only the variable being tested changes — everything else stays the same.",
      optionNotes: [
        "Different soils add a second changing variable — you couldn't tell if soil or water caused the difference.",
        "Different light adds another changing variable — same problem.",
        "Correct: change ONLY the water; keep light, soil, pot and seed type identical so any difference must come from the water.",
        "Measuring only one plant ignores the comparison — a test needs all results, not just the best one.",
      ],
      concept:
        "Fair test: change one variable, keep all other conditions constant, and measure the result for every trial. That's how you know what caused the difference.",
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
        "Only adult male citizens could vote — a major limit of Athenian democracy.",
      optionNotes: [
        "Most people in Athens could NOT vote — citizenship was narrow.",
        "Correct: voting belonged to free adult men born of Athenian parents.",
        "Women and children were excluded from the Assembly.",
        "Enslaved people and foreigners (metics) had no political rights at all.",
      ],
      concept:
        "Athens invented direct democracy — citizens voted on laws themselves — but 'citizen' meant only adult males, excluding most of the population.",
    },
    {
      question:
        "In the Iroquois Confederacy, decisions were made when all the nations reached…",
      options: ["a majority vote", "consensus", "a royal decree", "a written contract"],
      answerIndex: 1,
      explanation:
        "The Grand Council discussed until everyone could agree — decision by consensus.",
      optionNotes: [
        "Majority voting lets a larger group outvote a smaller one — the Confederacy instead talked until agreement.",
        "Correct: consensus means discussing an issue until all the nations accept the decision.",
        "There was no king or royal decree — leadership was shared among the nations.",
        "The Great Law of Peace was passed on orally (with wampum belts), not as a signed contract.",
      ],
      concept:
        "The Iroquois Confederacy's Grand Council made decisions by consensus under the Great Law of Peace — all member nations discussed until they agreed.",
    },
    {
      question: "Which level of government in Alberta is responsible for schools and health care?",
      options: ["Municipal (city) government", "Provincial government", "Federal government", "School patrol"],
      answerIndex: 1,
      explanation: "In Canada, provinces are responsible for education and health care.",
      optionNotes: [
        "Cities look after local services — roads, parks, garbage — not schools or hospitals.",
        "Correct: the provincial government runs education and health care.",
        "The federal government handles national matters like defence and currency.",
        "School patrols help students cross the street — they aren't a level of government!",
      ],
      concept:
        "Canada's three levels of government: federal (national matters), provincial (education, health care), municipal (local services). Each has its own responsibilities.",
    },
    {
      question: "Which of these is usually the responsibility of a municipal (city or town) government?",
      options: [
        "Running hospitals",
        "Clearing snow from city streets",
        "Printing money",
        "National defence",
      ],
      answerIndex: 1,
      explanation:
        "Municipal governments handle local services such as snow removal, parks and local roads.",
      optionNotes: [
        "Hospitals are run by the provincial government.",
        "Correct: snow clearing on local streets is a classic municipal service.",
        "Only the federal government (through the Bank of Canada) controls money.",
        "Defence is a federal responsibility.",
      ],
      concept:
        "Municipal governments provide day-to-day local services: streets and snow removal, parks and recreation, garbage collection, fire protection, and local bylaws.",
    },
    {
      question: "Which right is protected by the Canadian Charter of Rights and Freedoms?",
      options: [
        "The right to free movie tickets",
        "Freedom of expression",
        "The right to never pay taxes",
        "The right to drive at any age",
      ],
      answerIndex: 1,
      explanation:
        "The Charter protects fundamental freedoms such as freedom of expression.",
      optionNotes: [
        "The Charter protects freedoms and fair treatment — not free products or services.",
        "Correct: freedom of expression, religion, and peaceful assembly are fundamental freedoms in the Charter.",
        "Paying taxes is a responsibility of citizens; the Charter doesn't remove it.",
        "Driving is licensed by age and skill for safety — not a Charter right.",
      ],
      concept:
        "The Charter of Rights and Freedoms (1982) protects fundamental freedoms — expression, religion, peaceful assembly — plus democratic, legal and equality rights.",
    },
    {
      question: "Why are votes in Canadian elections cast by secret ballot?",
      options: [
        "To make counting faster",
        "So people can vote freely without pressure or fear",
        "To keep the results secret forever",
        "Because it is a tradition from ancient Athens",
      ],
      answerIndex: 1,
      explanation:
        "A secret ballot means no one can pressure or punish you for your choice.",
      optionNotes: [
        "Secrecy doesn't speed up counting — that's not its purpose.",
        "Correct: when nobody can see your vote, nobody can bully, bribe or punish you for it — the vote stays free.",
        "Only each person's individual vote is secret; the overall RESULTS are public.",
        "Athenians actually voted openly by show of hands most of the time — the secret ballot is a modern protection.",
      ],
      concept:
        "The secret ballot protects voter freedom: because nobody knows how you voted, your choice can't be pressured, bought or punished.",
    },
    {
      question: "In the Iroquois Confederacy, what important role did clan mothers have?",
      options: [
        "They led the armies in battle",
        "They chose and guided the chiefs",
        "They built the longhouses",
        "They collected taxes from the nations",
      ],
      answerIndex: 1,
      explanation:
        "Clan mothers selected the chiefs, advised them, and could remove a chief who served poorly.",
      optionNotes: [
        "War leadership belonged to war chiefs, not clan mothers.",
        "Correct: clan mothers held real political power — choosing, advising, and if necessary removing chiefs.",
        "Longhouses were built by the community; it wasn't the clan mothers' defining role.",
        "The Confederacy had no tax system like this.",
      ],
      concept:
        "In the Iroquois Confederacy, women held political authority: clan mothers chose and advised the chiefs — an example of shared, balanced decision making.",
    },
    {
      question:
        "Women, enslaved people and foreigners could not vote in ancient Athens. This shows that Athenian democracy…",
      options: [
        "included everyone equally",
        "was limited to a small part of the population",
        "was exactly the same as Canada's democracy today",
        "had no rules at all",
      ],
      answerIndex: 1,
      explanation:
        "Only a small group of adult male citizens had a political voice.",
      optionNotes: [
        "The question itself lists the many groups who were excluded — the opposite of everyone.",
        "Correct: 'democracy' in Athens applied to a minority — most residents had no vote.",
        "Canada today gives every adult citizen the vote, regardless of gender or background — a key difference.",
        "Athens had many rules; the issue was WHO the rules allowed to participate.",
      ],
      concept:
        "Evaluating historical democracies: ask WHO could participate. Athens pioneered democratic ideas but limited participation to adult male citizens.",
    },
    {
      question: "What is a bylaw?",
      options: [
        "A law made by the federal government",
        "A rule made by a city or town government",
        "A rule that applies only in schools",
        "An unwritten custom",
      ],
      answerIndex: 1,
      explanation:
        "Bylaws are local rules made by municipal councils — about pets, parking, noise and more.",
      optionNotes: [
        "Federal laws are passed by Parliament and apply across Canada — bylaws are local.",
        "Correct: municipal councils pass bylaws that apply within their own community.",
        "School rules are set by schools and divisions, not by a municipal council.",
        "Bylaws are written and officially passed by an elected council.",
      ],
      concept:
        "Bylaws: local laws made by elected municipal councils, covering community matters like pets, parking, noise and building rules.",
    },
    {
      question:
        "A student is researching what life was like in ancient Athens. Which of these is a primary source?",
      options: [
        "A modern textbook chapter",
        "An encyclopedia article",
        "A diary written by someone living in Athens at the time",
        "A movie about Athens made last year",
      ],
      answerIndex: 2,
      explanation:
        "A primary source was created at the time being studied, by someone who was there.",
      optionNotes: [
        "A textbook is written long afterwards, using other sources — a secondary source.",
        "Encyclopedias summarize other people's research — also secondary.",
        "Correct: a diary from the time is first-hand evidence — a primary source.",
        "A recent movie is a modern retelling — secondary (and possibly fictionalized).",
      ],
      concept:
        "Primary sources come from the time and place being studied (diaries, letters, artifacts); secondary sources describe or explain it later (textbooks, encyclopedias).",
    },
  ],
};
