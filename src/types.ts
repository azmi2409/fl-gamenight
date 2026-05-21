export interface Player {
  id: number;
  name: string;
  score: number;
  streak: number;
}

export interface ScoreEvent {
  id: string;
  playerId: number;
  delta: number;
  timestamp: number;
}

export type Screen =
  | 'setup'
  | 'game1'
  | 'game2'
  | 'game3'
  | 'game4'
  | 'game5'
  | 'transition'
  | 'results';

export interface AppState {
  screen: Screen;
  players: Player[];
  currentRound: number;
  answerRevealed: boolean;
  scoreEvents: ScoreEvent[];
  usedAwardKeys: string[];
  transitionTarget: Screen | null;
  // Game 2 specific
  g2Answers: Record<number, string[]>;
  g2TimerActive: boolean;
  g2TimerEnded: boolean;
  // Game 5 specific
  g5GridVisible: boolean;
  g5QuestionIndex: number;
  // Game 1 specific
  g1Placements: number[];
}

export type Action =
  | { type: 'SET_PLAYERS'; names: string[] }
  | { type: 'START_GAME' }
  | { type: 'NEXT_ROUND' }
  | { type: 'REVEAL_ANSWER' }
  | { type: 'AWARD_POINTS'; playerId: number; points: number; awardKey?: string }
  | { type: 'NEXT_GAME' }
  | { type: 'TRANSITION_DONE' }
  | { type: 'RESET' }
  | { type: 'G1_PLACE'; playerId: number }
  | { type: 'G2_ADD_ANSWER'; playerId: number; answer: string }
  | { type: 'G2_EDIT_ANSWER'; fromPlayerId: number; answerIndex: number; nextPlayerId: number; nextAnswer: string }
  | { type: 'G2_REMOVE_ANSWER'; playerId: number; answerIndex: number }
  | { type: 'G2_START_TIMER' }
  | { type: 'G2_END_TIMER' }
  | { type: 'G2_SCORE' }
  | { type: 'G5_HIDE_GRID' }
  | { type: 'G5_NEXT_QUESTION' }
  | { type: 'G5_SHOW_GRID' };
