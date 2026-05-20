import { useEffect, useState } from 'react';
import type { Action, Screen } from '../types';
import { gameNames, gameDescriptions } from '../data/games';
import patternBreakerSplash from '../assets/games/pattern-breaker-splash.png';
import categoryClashSplash from '../assets/games/category-clash-splash.png';
import missingLinkSplash from '../assets/games/missing-link-splash.png';
import knowledgeDuelSplash from '../assets/games/knowledge-duel-splash.png';
import patternBlackoutSplash from '../assets/games/pattern-blackout-splash.png';

const screenToIndex: Record<string, number> = { game1: 0, game2: 1, game3: 2, game4: 3, game5: 4 };
const splashImages = [patternBreakerSplash, categoryClashSplash, missingLinkSplash, knowledgeDuelSplash, patternBlackoutSplash];

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
  const splashImage = idx !== undefined ? splashImages[idx] : undefined;

  return (
    <div className="relative flex min-h-screen cursor-pointer flex-col items-center justify-center overflow-hidden" onClick={() => dispatch({ type: 'TRANSITION_DONE' })}>
      {splashImage && (
        <img
          src={splashImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-65"
        />
      )}
      <div className="absolute inset-0 bg-background/55 backdrop-blur-[1px]" />
      {idx !== undefined ? (
        <div className="relative z-10 max-w-5xl rounded-3xl border border-border/70 bg-card/85 px-10 py-9 text-center shadow-2xl backdrop-blur-md animate-reveal">
          <p className="text-sm font-medium text-muted-foreground mb-3 tracking-widest uppercase">Game {idx + 1} of 5</p>
          <h1 className="text-5xl md:text-7xl font-black mb-3 text-foreground">{gameNames[idx]}</h1>
          <p className="text-lg text-muted-foreground mb-10">{gameDescriptions[idx]}</p>
          <div className="text-7xl font-black text-primary animate-countdown-pulse tabular-nums">{countdown > 0 ? countdown : 'GO'}</div>
          <p className="text-xs text-muted-foreground mt-8">Click anywhere to skip</p>
        </div>
      ) : (
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-black text-foreground mb-10">GET READY</h1>
          <div className="text-7xl font-black text-primary animate-countdown-pulse tabular-nums">{countdown > 0 ? countdown : 'GO'}</div>
          <p className="text-xs text-muted-foreground mt-8">Click anywhere to skip</p>
        </div>
      )}
    </div>
  );
}
