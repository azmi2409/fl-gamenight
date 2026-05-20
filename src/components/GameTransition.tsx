import { useEffect, useState } from 'react';
import type { Action, Screen } from '../types';
import { gameNames, gameDescriptions } from '../data/games';

const screenToIndex: Record<string, number> = { game1: 0, game2: 1, game3: 2, game4: 3, game5: 4 };

export function GameTransition({ target, dispatch }: { target: Screen | null; dispatch: React.Dispatch<Action> }) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(t);
    } else {
      dispatch({ type: 'TRANSITION_DONE' });
    }
  }, [countdown]);

  const idx = target ? screenToIndex[target] : undefined;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen cursor-pointer" onClick={() => dispatch({ type: 'TRANSITION_DONE' })}>
      {idx !== undefined ? (
        <div className="text-center animate-reveal">
          <p className="text-sm font-medium text-muted-foreground mb-3 tracking-widest uppercase">Game {idx + 1} of 5</p>
          <h1 className="text-5xl md:text-7xl font-black mb-3 text-foreground">{gameNames[idx]}</h1>
          <p className="text-lg text-muted-foreground mb-10">{gameDescriptions[idx]}</p>
        </div>
      ) : (
        <h1 className="text-6xl font-black text-foreground mb-10">GET READY</h1>
      )}
      <div className="text-7xl font-black text-primary animate-countdown-pulse tabular-nums">{countdown > 0 ? countdown : 'GO'}</div>
      <p className="text-xs text-muted-foreground mt-8">Click anywhere to skip</p>
    </div>
  );
}
