import { useReducer, useEffect, useState } from 'react';
import type { AppState, Action } from './types';
import { SetupScreen } from './components/SetupScreen';
import { Scoreboard } from './components/Scoreboard';
import { PatternBreaker } from './components/PatternBreaker';
import { CategoryClash } from './components/CategoryClash';
import { MissingLink } from './components/MissingLink';
import { KnowledgeDuel } from './components/KnowledgeDuel';
import { PatternBlackout } from './components/PatternBlackout';
import { ResultsScreen } from './components/ResultsScreen';
import { GameTransition } from './components/GameTransition';
import { RulesModal } from './components/RulesModal';

const STORAGE_KEY = 'zoom-brain-battle-state';

const initialState: AppState = {
  screen: 'setup',
  players: [],
  currentRound: 0,
  answerRevealed: false,
  scoreEvents: [],
  transitionTarget: null,
  g2Answers: {},
  g2TimerActive: false,
  g2TimerEnded: false,
  g5GridVisible: true,
  g5QuestionIndex: 0,
  g1Placements: [],
};

function loadState(): AppState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as AppState;
      if (parsed.screen === 'transition') {
        parsed.screen = (parsed.transitionTarget as AppState['screen']) || 'setup';
        parsed.transitionTarget = null;
      }
      parsed.g2TimerActive = false;
      parsed.scoreEvents = [];
      return parsed;
    }
  } catch { /* ignore */ }
  return initialState;
}

function saveState(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* ignore */ }
}

const nextScreen: Record<string, AppState['screen']> = {
  game1: 'game2',
  game2: 'game3',
  game3: 'game4',
  game4: 'game5',
  game5: 'results',
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_PLAYERS':
      return { ...state, players: action.names.map((name, i) => ({ id: i, name, score: 0, streak: 0 })) };
    case 'START_GAME':
      return { ...state, screen: 'transition', transitionTarget: 'game1', currentRound: 0, answerRevealed: false };
    case 'NEXT_ROUND':
      return { ...state, currentRound: state.currentRound + 1, answerRevealed: false, g1Placements: [], g2Answers: {}, g2TimerActive: false, g2TimerEnded: false, g5GridVisible: true, g5QuestionIndex: 0 };
    case 'REVEAL_ANSWER':
      return { ...state, answerRevealed: true };
    case 'AWARD_POINTS': {
      const evt = { id: `${Date.now()}-${action.playerId}`, playerId: action.playerId, delta: action.points, timestamp: Date.now() };
      return { ...state, players: state.players.map((p) => p.id === action.playerId ? { ...p, score: p.score + action.points } : p), scoreEvents: [...state.scoreEvents, evt] };
    }
    case 'NEXT_GAME': {
      const target = nextScreen[state.screen] || 'results';
      return { ...state, screen: 'transition', transitionTarget: target, currentRound: 0, answerRevealed: false, g1Placements: [], g2Answers: {}, g2TimerActive: false, g2TimerEnded: false, g5GridVisible: true, g5QuestionIndex: 0 };
    }
    case 'TRANSITION_DONE':
      return { ...state, screen: state.transitionTarget || 'results', transitionTarget: null };
    case 'RESET': {
      localStorage.removeItem(STORAGE_KEY);
      return initialState;
    }
    case 'G1_PLACE': {
      const placement = state.g1Placements.length;
      const pts = placement === 0 ? 5 : placement === 1 ? 3 : 1;
      const evt = { id: `${Date.now()}-${action.playerId}`, playerId: action.playerId, delta: pts, timestamp: Date.now() };
      return { ...state, g1Placements: [...state.g1Placements, action.playerId], players: state.players.map((p) => p.id === action.playerId ? { ...p, score: p.score + pts } : p), scoreEvents: [...state.scoreEvents, evt] };
    }
    case 'G2_ADD_ANSWER':
      return { ...state, g2Answers: { ...state.g2Answers, [action.playerId]: [...(state.g2Answers[action.playerId] || []), action.answer] } };
    case 'G2_START_TIMER':
      return { ...state, g2TimerActive: true, g2TimerEnded: false };
    case 'G2_END_TIMER':
      return { ...state, g2TimerActive: false, g2TimerEnded: true };
    case 'G2_SCORE': {
      const allAnswers: { playerId: number; answer: string }[] = [];
      Object.entries(state.g2Answers).forEach(([pid, answers]) => { answers.forEach((a) => allAnswers.push({ playerId: Number(pid), answer: a.toLowerCase().trim() })); });
      const answerCounts: Record<string, number> = {};
      allAnswers.forEach(({ answer }) => { answerCounts[answer] = (answerCounts[answer] || 0) + 1; });
      const uniqueCounts: Record<number, number> = {};
      allAnswers.forEach(({ playerId, answer }) => { if (answerCounts[answer] === 1) uniqueCounts[playerId] = (uniqueCounts[playerId] || 0) + 1; });
      const maxUnique = Math.max(0, ...Object.values(uniqueCounts));
      const events: AppState['scoreEvents'] = [];
      const updatedPlayers = state.players.map((p) => {
        const unique = uniqueCounts[p.id] || 0;
        let pts = unique * 2;
        if (unique > 0 && unique === maxUnique) pts += 3;
        if (pts > 0) events.push({ id: `${Date.now()}-${p.id}`, playerId: p.id, delta: pts, timestamp: Date.now() });
        return { ...p, score: p.score + pts };
      });
      return { ...state, players: updatedPlayers, scoreEvents: [...state.scoreEvents, ...events] };
    }
    case 'G5_HIDE_GRID':
      return { ...state, g5GridVisible: false };
    case 'G5_SHOW_GRID':
      return { ...state, g5GridVisible: true };
    case 'G5_NEXT_QUESTION':
      return { ...state, g5QuestionIndex: state.g5QuestionIndex + 1, answerRevealed: false };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);
  const [rulesOpen, setRulesOpen] = useState(false);

  useEffect(() => { saveState(state); }, [state]);

  const sortedPlayers = [...state.players].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-background">
      {state.screen !== 'setup' && state.screen !== 'transition' && (
        <Scoreboard
          players={state.players}
          sortedPlayers={sortedPlayers}
          scoreEvents={state.scoreEvents}
          onOpenRules={() => setRulesOpen(true)}
          onReset={() => dispatch({ type: 'RESET' })}
        />
      )}

      <div className={state.screen !== 'setup' && state.screen !== 'transition' ? 'pt-14' : ''}>
        {state.screen === 'setup' && <SetupScreen dispatch={dispatch} />}
        {state.screen === 'game1' && <PatternBreaker state={state} dispatch={dispatch} />}
        {state.screen === 'game2' && <CategoryClash state={state} dispatch={dispatch} />}
        {state.screen === 'game3' && <MissingLink state={state} dispatch={dispatch} />}
        {state.screen === 'game4' && <KnowledgeDuel state={state} dispatch={dispatch} />}
        {state.screen === 'game5' && <PatternBlackout state={state} dispatch={dispatch} />}
        {state.screen === 'results' && <ResultsScreen players={sortedPlayers} dispatch={dispatch} />}
        {state.screen === 'transition' && <GameTransition target={state.transitionTarget} dispatch={dispatch} />}
      </div>

      <RulesModal open={rulesOpen} currentScreen={state.screen} onClose={() => setRulesOpen(false)} />
    </div>
  );
}

export default App;
