import type { Question, SubjectId } from "@/lib/pat-data";

// Sample question bank used in demo mode (no API key configured).
// Ten PAT-style questions per subject.
export const DEMO_QUESTIONS: Record<SubjectId, Question[]> = {
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
    {
      question:
        "In a class of 24 students, 15 walk to school. What is the ratio of students who walk to all students, in simplest form?",
      options: ["15:24", "5:8", "8:5", "3:5"],
      answerIndex: 1,
      explanation:
        "The ratio 15:24 can be simplified by dividing both numbers by 3, giving 5:8.",
    },
    {
      question: "A triangle has a base of 8 cm and a height of 5 cm. What is its area?",
      options: ["40 cm²", "20 cm²", "13 cm²", "26 cm²"],
      answerIndex: 1,
      explanation:
        "Area of a triangle = base × height ÷ 2, so 8 × 5 ÷ 2 = 20 cm².",
    },
    {
      question:
        "The temperature in Edmonton was −8 °C in the morning. By afternoon it had risen by 12 °C. What was the afternoon temperature?",
      options: ["−4 °C", "4 °C", "20 °C", "−20 °C"],
      answerIndex: 1,
      explanation:
        "Starting at −8 and moving up 12 on the number line: −8 + 12 = 4 °C.",
    },
    {
      question: "What is the next number in the pattern 3, 7, 11, 15, …?",
      options: ["18", "19", "20", "16"],
      answerIndex: 1,
      explanation: "The pattern rule is add 4 each time, so 15 + 4 = 19.",
    },
    {
      question: "If 4n = 32, what is the value of n?",
      options: ["8", "28", "36", "128"],
      answerIndex: 0,
      explanation:
        "To keep the equation balanced, divide both sides by 4: n = 32 ÷ 4 = 8.",
    },
    {
      question: "What is 25% of 80?",
      options: ["20", "25", "32", "60"],
      answerIndex: 0,
      explanation: "25% is one quarter, and one quarter of 80 is 80 ÷ 4 = 20.",
    },
    {
      question:
        "A bag holds 3 red, 2 blue and 5 green marbles. What is the probability of picking a blue marble?",
      options: ["1/5", "1/2", "2/8", "1/10"],
      answerIndex: 0,
      explanation:
        "There are 10 marbles in total and 2 are blue: 2/10 simplifies to 1/5.",
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
    {
      question:
        '"The wind whispered through the trees." Which type of figurative language is this?',
      options: ["Simile", "Metaphor", "Personification", "Alliteration"],
      answerIndex: 2,
      explanation:
        "Personification gives human actions, like whispering, to something that is not human — here, the wind.",
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
        "The whole passage explains how beaver dams create ponds that other animals live in. The other choices are single details, not the main idea.",
    },
    {
      question:
        "A student wants to quickly find the meaning of a bold word in a textbook. Where should the student look?",
      options: ["The index", "The glossary", "The table of contents", "The title page"],
      answerIndex: 1,
      explanation:
        "A glossary lists important words from the book with their meanings. The index shows page numbers, and the table of contents lists chapters.",
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
        "\"Most exciting\" is a personal judgment that cannot be proven — an opinion. The other statements are facts that can be checked.",
    },
    {
      question:
        '"The arid desert had not seen rain for many months, and the ground was cracked." Based on the sentence, "arid" means…',
      options: ["very cold", "very wet", "very dry", "very windy"],
      answerIndex: 2,
      explanation:
        "The clues \"had not seen rain\" and \"cracked ground\" show that arid means very dry.",
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
        "His careful preparations are clues that tomorrow matters to him. Inferring means using evidence in the text plus what you know.",
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
        "A simile compares two things using \"as\" or \"like.\" The thunder and leaves sentences are personification, not similes.",
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
        "Water evaporates from lakes and oceans, condenses into clouds, and then falls as precipitation (rain or snow).",
    },
    {
      question: "In the food chain grass → rabbit → hawk, the rabbit is a…",
      options: ["producer", "herbivore", "carnivore", "decomposer"],
      answerIndex: 1,
      explanation:
        "The rabbit eats plants (grass), which makes it a herbivore — the first consumer in this food chain. The grass is the producer and the hawk is a carnivore.",
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
        "Spines are an adaptation: they keep thirsty animals away and, unlike wide leaves, lose very little water.",
    },
    {
      question: "Which method would best separate salt from salt water?",
      options: ["Filtering", "Using a magnet", "Evaporation", "Stirring"],
      answerIndex: 2,
      explanation:
        "Salt is dissolved, so it passes through a filter. If the water evaporates, the salt is left behind.",
    },
    {
      question: "Which of these energy sources is renewable?",
      options: ["Coal", "Natural gas", "Wind", "Gasoline"],
      answerIndex: 2,
      explanation:
        "Wind keeps blowing and cannot be used up, so it is renewable. Coal, natural gas and gasoline are fossil fuels that take millions of years to form.",
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
        "Earth's tilted axis means each hemisphere gets more direct sunlight for part of the year (summer) and less for another part (winter).",
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
        "In a fair test, only one variable changes — the one being tested. Everything else (light, soil, pot size) must stay the same.",
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
        "Municipal governments look after local services such as snow removal, parks, garbage collection and local roads.",
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
        "The Charter protects fundamental freedoms such as freedom of expression, religion and peaceful assembly.",
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
        "A secret ballot means no one else knows how you voted, so voters can choose freely without being pressured or punished for their choice.",
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
        "Clan mothers held great responsibility: they selected the chiefs, advised them, and could remove a chief who did not serve the people well.",
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
        "Even though Athens invented ideas of democracy, participation was limited — only a small group of adult male citizens had a voice.",
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
        "Bylaws are local rules made by municipal councils — for example, rules about pets, parking or noise in a community.",
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
        "A primary source was created at the time being studied, by someone who was there. Textbooks, encyclopedias and modern movies are secondary sources.",
    },
  ],
};
