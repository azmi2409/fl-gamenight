import { useState } from 'react';
import type { Action } from '../types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, X, Zap } from 'lucide-react';
import brainBattleWordmark from '../assets/brand/brain-battle-wordmark.png';
import hostMascot from '../assets/stickers/host-mascot.png';

export function SetupScreen({ dispatch }: { dispatch: React.Dispatch<Action> }) {
  const [names, setNames] = useState<string[]>(['', '', '', '', '', '']);

  const addPlayer = () => setNames([...names, '']);
  const removePlayer = (index: number) => {
    if (names.length <= 2) return;
    setNames(names.filter((_, i) => i !== index));
  };

  const handleStart = () => {
    const filled = names.map((n, i) => n.trim() || `Player ${i + 1}`);
    dispatch({ type: 'SET_PLAYERS', names: filled });
    dispatch({ type: 'START_GAME' });
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-8">
      <img
        src={hostMascot}
        alt="FutureLab Brain Battle host mascot"
        className="pointer-events-none absolute right-8 top-10 hidden w-44 drop-shadow-2xl xl:block"
      />
      <div className="mb-10 text-center">
        <img
          src={brainBattleWordmark}
          alt="FL Brain Battle"
          className="mx-auto mb-4 max-h-36 w-auto max-w-3xl drop-shadow-2xl"
        />
        <p className="text-lg text-muted-foreground">{names.length} Players · 5 Games · 1 Winner</p>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full max-w-xl mb-6">
        {names.map((name, i) => (
          <div key={i} className="relative group">
            <Input
              placeholder={`Player ${i + 1}`}
              value={name}
              onChange={(e) => {
                const copy = [...names];
                copy[i] = e.target.value;
                setNames(copy);
              }}
              className="pr-9 bg-card border-border"
            />
            {names.length > 2 && (
              <button
                onClick={() => removePlayer(i)}
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      <Button variant="ghost" size="sm" onClick={addPlayer} className="mb-8 text-muted-foreground">
        <Plus size={16} /> Add Player
      </Button>

      <Button variant="glow" size="xl" onClick={handleStart} disabled={names.length < 2} className="text-lg font-black tracking-wide">
        <Zap size={20} /> START GAME
      </Button>

      <Card className="mt-12 max-w-xl bg-muted/50 border-border">
        <CardContent className="p-6">
          <h3 className="text-base font-bold mb-3 text-foreground">How to Play</h3>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>• Host shares screen on Zoom and controls the app</li>
            <li>• Players answer in Zoom chat</li>
            <li>• 5 games testing patterns, knowledge, speed & memory</li>
            <li>• Points accumulate — highest score wins</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
