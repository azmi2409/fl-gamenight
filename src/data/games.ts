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
  { category: 'Countries 🌍', letter: 'B' },
  { category: 'Foods 🍜', letter: 'P' },
  { category: 'Movies 🎬', letter: 'S' },
  { category: 'Famous People 🌟', letter: 'M' },
  { category: 'Songs 🎵', letter: 'L' },
];

export const missingLinkRounds = [
  { items: ['🦁 Lion', '🐯 Tiger', '🐆 Leopard'], connection: 'Big cats', type: 'normal' as const },
  { items: ['🪐 Mercury', '🪐 Venus', '🌍 Earth'], connection: 'First three planets from the Sun', type: 'normal' as const },
  { items: ['♜ Rook', '♝ Bishop', '♞ Knight'], connection: 'Chess pieces', type: 'normal' as const },
  { items: ['🌊 Amazon', '🌊 Nile', '🌊 Yangtze'], connection: 'Longest rivers', type: 'normal' as const },
  { items: ['🎨 Picasso', '🎨 Dali', '🎨 Goya'], connection: 'Spanish artists', type: 'reverse' as const },
  { items: ['⚙️ Iron', '🪙 Copper', '?'], connection: 'Zinc → Metals / chemical elements', type: 'missing' as const },
];

export const knowledgeDuelQuestions = [
  { q: '🧴 What is the largest organ in the human body?', a: 'Skin', difficulty: 'easy' as const },
  { q: '🇦🇺 What is the capital city of Australia?', a: 'Canberra', difficulty: 'easy' as const },
  { q: '🧂 Which chemical element has the symbol Na?', a: 'Sodium', difficulty: 'easy' as const },
  { q: '🌊 Which ocean lies between Africa and Australia?', a: 'Indian Ocean', difficulty: 'easy' as const },
  { q: '📚 Who wrote Pride and Prejudice?', a: 'Jane Austen', difficulty: 'easy' as const },
  { q: '🖼️ Who painted the Mona Lisa?', a: 'Leonardo da Vinci', difficulty: 'medium' as const },
  { q: '❄️ What is the largest desert in the world?', a: 'Antarctica', difficulty: 'medium' as const },
  { q: '🩸 Which blood type is known as the universal donor?', a: 'O negative', difficulty: 'medium' as const },
  { q: '🌐 What does HTTP stand for?', a: 'HyperText Transfer Protocol', difficulty: 'medium' as const },
  { q: '🕒 How many time zones does Russia have?', a: '11', difficulty: 'medium' as const },
  { q: '📱 In what year was the first iPhone released?', a: '2007', difficulty: 'hard' as const },
  { q: '🌍 Which is the only continent located in all four hemispheres?', a: 'Africa', difficulty: 'hard' as const },
  { q: '🔎 Which company was originally called "BackRub"?', a: 'Google', difficulty: 'hard' as const },
  { q: '🧪 Which element has atomic number 79?', a: 'Gold (Au)', difficulty: 'hard' as const },
  { q: '🇻🇦 What is the smallest country in the world by area?', a: 'Vatican City', difficulty: 'hard' as const },
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
      ['3', '6', '?', '18'],
      ['5', '8', '15', '24'],
      ['7', '10', '17', '28'],
    ],
    questions: [
      { q: '❓ What number replaces ?', a: '12' },
      { q: '🧠 What is the pattern in row 1?', a: 'Perfect squares: 1², 2², 3², 4²' },
      { q: '📈 What is the pattern in column 1?', a: 'Odd numbers increasing by +2' },
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
