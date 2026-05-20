import { useEffect, useState } from 'react';
import type { Player, Action } from '../types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw } from 'lucide-react';
import finalPodiumStage from '../assets/results/final-podium-stage.png';
import confettiOverlay from '../assets/results/confetti-overlay.png';
import oneBrainCellBadge from '../assets/results/one-brain-cell-badge.png';

export function ResultsScreen({ players, dispatch }: { players: Player[]; dispatch: React.Dispatch<Action> }) {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (revealed < players.length) {
      const t = setTimeout(() => setRevealed((r) => r + 1), 700);
      return () => clearTimeout(t);
    }
  }, [revealed, players.length]);

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 py-12">
      <img src={finalPodiumStage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
      <img src={confettiOverlay} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-background/55" />
      <div className="relative z-10 flex flex-col items-center">
      <h1 className="text-5xl md:text-6xl font-black mb-12 text-foreground drop-shadow-xl">FINAL RESULTS</h1>

      {/* Podium */}
      <div className="flex items-end gap-4 mb-10">
        {[1, 0, 2].map((rank) => {
          const p = players[rank];
          if (!p || revealed <= rank) return <div key={rank} className="w-40" />;
          const heights = ['h-44', 'h-36', 'h-28'];
          const colors = ['from-primary/80 to-primary/40', 'from-secondary/60 to-secondary/30', 'from-muted-foreground/40 to-muted-foreground/20'];
          return (
            <div key={rank} className="flex flex-col items-center animate-reveal">
              <span className="text-4xl mb-2">{medals[rank]}</span>
              <p className="text-xl font-bold mb-1">{p.name}</p>
              <p className="text-2xl font-black text-primary tabular-nums mb-3">{p.score}</p>
              <div className={`${heights[rank]} w-40 rounded-t-xl bg-gradient-to-t ${colors[rank]}`} />
            </div>
          );
        })}
      </div>

      {/* Rest */}
      <div className="flex gap-4 mb-10 flex-wrap justify-center">
        {players.slice(3).map((p, i) => {
          if (revealed <= i + 3) return null;
          const isLast = i === players.length - 4;
          return (
            <Card key={p.id} className={`animate-reveal ${isLast ? 'animate-shake' : ''}`}>
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground">#{i + 4}</p>
                <p className="font-bold">{p.name}</p>
                <p className="text-lg font-black tabular-nums text-muted-foreground">{p.score}</p>
                {isLast && (
                  <div className="mt-2 flex flex-col items-center gap-1">
                    <img src={oneBrainCellBadge} alt="One brain cell badge" className="h-14 w-14 object-contain" />
                    <p className="text-xs text-muted-foreground">Brain Cell Count: 1</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Button variant="glow" size="xl" onClick={() => dispatch({ type: 'RESET' })} className="font-black">
        <RotateCcw size={18} /> Play Again
      </Button>
      </div>
    </div>
  );
}
