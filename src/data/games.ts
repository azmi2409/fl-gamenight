export const patternBreakerRounds = [
  { sequence: '2, 5, 8, 11, ?', answer: '14', hint: '+3 each step' },
  { sequence: '1, 4, 9, 16, 25, ?', answer: '36', hint: 'Perfect squares' },
  { sequence: 'A, C, F, J, O, ?', answer: 'U', hint: '+2, +3, +4, +5...' },
  { sequence: 'J, F, M, A, M, J, ?', answer: 'J', hint: 'Months of the year' },
  { sequence: '1, 1, 2, 3, 5, 8, ?', answer: '13', hint: 'Fibonacci sequence' },
  { sequence: '2, 5, 10, 17, 26, ?', answer: '37', hint: '+3, +5, +7, +9...' },
  { sequence: '🔴🟢 🔴🔴🟢 🔴🔴🔴🟢 🔴🔴🔴🔴 ?', answer: '🟢', hint: '1 red 1 green, 2 red 1 green, 3 red 1 green...' },
  { sequence: 'A=1, B=2... 🐱 CAT = 24, 🐶 DOG = ?', answer: '26', hint: '4 + 15 + 7' },
];

export const categoryClashRounds = [
  { category: 'Animals 🐾', letter: 'C' },
  { category: 'Countries 🌍', letter: 'C' },
  { category: 'Foods 🍕', letter: 'P' },
  { category: 'Movies 🎬', letter: 'S' },
  { category: 'Brands 🛍️', letter: 'A' },
  { category: 'Famous People 🌟', letter: 'M' },
];

export const missingLinkRounds = [
  { items: ['🍢 Satay', '🍛 Rendang', '🍜 Laksa'], connection: 'Iconic Southeast Asian dishes', type: 'normal' as const },
  { items: ['🇲🇾 Tunku Abdul Rahman', '🇮🇩 Sukarno', '🇸🇬 Lee Kuan Yew'], connection: 'Founding-era national leaders in Southeast Asia', type: 'normal' as const },
  { items: ['📈 ARR', '📉 Churn', '💸 CAC'], connection: 'SaaS business metrics', type: 'normal' as const },
  { items: ['🧠 RAG', '🔎 Embeddings', '🗄️ Vector database'], connection: 'AI retrieval stack', type: 'normal' as const },
  { items: ['侘寂 Wabi-sabi', '物の哀れ Mono no aware', '改善 Kaizen'], connection: 'Japanese cultural/philosophical concepts', type: 'reverse' as const },
  { items: ['🇲🇾 Kuala Lumpur', '🇮🇩 Jakarta', '?'], connection: 'Bandar Seri Begawan → Southeast Asian capitals', type: 'missing' as const },
];

export const knowledgeDuelQuestions = [
  { q: '🇸🇬 Singapore left Malaysia and became fully independent in what year?', a: '1965', difficulty: 'easy' as const },
  { q: '🇮🇩 Indonesia’s motto “Bhinneka Tunggal Ika” is usually translated as what?', a: 'Unity in Diversity', difficulty: 'easy' as const },
  { q: '🌊 Which strait forms the historic sea lane between Peninsular Malaysia and Sumatra?', a: 'Strait of Malacca', difficulty: 'easy' as const },
  { q: '📈 In SaaS, what does MRR stand for?', a: 'Monthly Recurring Revenue', difficulty: 'easy' as const },
  { q: '🤖 In modern AI, what does LLM stand for?', a: 'Large Language Model', difficulty: 'easy' as const },
  { q: '🇧🇳 Brunei shares the island of Borneo with which two countries?', a: 'Malaysia and Indonesia', difficulty: 'medium' as const },
  { q: '🚕 Which Southeast Asian superapp began in Malaysia as MyTeksi?', a: 'Grab', difficulty: 'medium' as const },
  { q: '🇮🇩 The 2021 merger of Gojek and Tokopedia created which Indonesian tech group?', a: 'GoTo Group', difficulty: 'medium' as const },
  { q: '🏛️ Which two Malaysian cities are jointly listed by UNESCO as the Historic Cities of the Straits of Malacca?', a: 'Melaka and George Town', difficulty: 'medium' as const },
  { q: '🧠 What is the common term for when an AI model confidently produces false information?', a: 'Hallucination', difficulty: 'medium' as const },
  { q: '⚓ Portuguese forces captured the Malacca Sultanate’s capital in what year?', a: '1511', difficulty: 'hard' as const },
  { q: '🇫🇷 The French Revolution began in what year?', a: '1789', difficulty: 'hard' as const },
  { q: '🕊️ World War I began in what year?', a: '1914', difficulty: 'hard' as const },
  { q: '🧱 The Berlin Wall fell in what year?', a: '1989', difficulty: 'hard' as const },
  { q: '🏰 The Byzantine Empire’s capital, Constantinople, fell to which empire in 1453?', a: 'Ottoman Empire', difficulty: 'hard' as const },
];

export const patternBlackoutRounds = [
  {
    type: 'memory' as const,
    grid: [
      ['🔴', '🟢', '🔵', '🟡'],
      ['🟡', '🔴', '🟢', '🔵'],
      ['🔵', '🟡', '🔴', '🟢'],
      ['🟢', '🔵', '🟡', '🔴'],
    ],
    questions: [
      { q: '🎯 What color was in the top-right corner?', a: '🟡 Yellow' },
      { q: '📍 What was at Row 3, Column 2?', a: '🟡 Yellow' },
      { q: '🔢 How many 🔴 red circles were there in total?', a: '4' },
      { q: '↘️ Which diagonal had all the same color?', a: 'Main diagonal = 🔴 🔴 🔴 🔴' },
    ],
  },
  {
    type: 'logic' as const,
    grid: [
      ['1', '4', '9', '16'],
      ['2', '5', '10', '17'],
      ['3', '6', '?', '18'],
      ['4', '7', '12', '19'],
    ],
    questions: [
      { q: '❓ What number replaces ?', a: '11' },
      { q: '🧠 What is the left-to-right pattern in each row?', a: 'Add +3, then +5, then +7' },
      { q: '📈 What is the top-to-bottom pattern in each column?', a: 'Each column increases by +1' },
    ],
  },
  {
    type: 'sequence' as const,
    grid: [
      ['🐱🐶', '🌟🌙', '🔥💧', '🎵🎬'],
      ['🌸🌺', '⚡🌈', '🍕🍔', '🎮🕹️'],
    ],
    questions: [
      { q: '👀 Which pair appeared at position 3?', a: '🔥💧' },
      { q: '🎬 At what position did 🎵🎬 appear?', a: 'Position 4' },
      { q: '🌿 How many pairs used nature-themed emojis?', a: '2 pairs: 🌟🌙 and 🌸🌺' },
    ],
  },
];

export const gameNames = [
  'PATTERN BREAKER',
  'CATEGORY CLASH',
  'THE MISSING LINK',
  'KNOWLEDGE DUEL',
  'PATTERN BLACKOUT',
];

export const gameDescriptions = [
  'Pattern recognition, logic, speed',
  'Knowledge breadth, speed, strategy',
  'Lateral thinking, connections',
  'General knowledge, trivia depth',
  '⚡ DOUBLE POINTS ⚡ Visual memory, logic grids',
];
