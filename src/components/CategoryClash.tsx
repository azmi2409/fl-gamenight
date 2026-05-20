import { useState, useEffect, useRef } from 'react';
import type { AppState, Action } from '../types';
import { categoryClashRounds } from '../data/games';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ChevronRight, Play, Square, Calculator } from 'lucide-react';
import timerPanic from '../assets/stickers/timer-panic.png';
import sweatingPanic from '../assets/memes/sweating-panic.jpg';

export function CategoryClash({ state, dispatch }: { state: AppState; dispatch: React.Dispatch<Action> }) {
  const round = categoryClashRounds[state.currentRound];
  const [timeLeft, setTimeLeft] = useState(30);
  const [inputPlayer, setInputPlayer] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (state.g2TimerActive && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
  }, [state.g2TimerActive, timeLeft]);

  useEffect(() => { setTimeLeft(30); }, [state.currentRound]);

  if (!round) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-reveal">
        <h2 className="text-3xl font-bold mb-6">Category Clash Complete</h2>
        <Button variant="glow" size="lg" onClick={() => dispatch({ type: 'NEXT_GAME' })}>Next Game <ChevronRight size={18} /></Button>
      </div>
    );
  }

  const allAnswersFlat: { playerId: number; answer: string; normalized: string }[] = [];
  Object.entries(state.g2Answers).forEach(([pid, answers]) => {
    answers.forEach((a) => allAnswersFlat.push({ playerId: Number(pid), answer: a, normalized: a.toLowerCase().trim() }));
  });
  const answerCounts: Record<string, number> = {};
  allAnswersFlat.forEach(({ normalized }) => { answerCounts[normalized] = (answerCounts[normalized] || 0) + 1; });

  const addAnswer = () => {
    if (inputPlayer !== null && inputValue.trim()) {
      const answers = inputValue
        .split(';')
        .map((answer) => answer.trim())
        .filter(Boolean);

      answers.forEach((answer) => {
        dispatch({ type: 'G2_ADD_ANSWER', playerId: inputPlayer, answer });
      });

      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col items-center px-6 py-8 animate-reveal">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-black text-secondary">CATEGORY CLASH</h2>
        <Badge variant="secondary">Round {state.currentRound + 1}/6</Badge>
      </div>

      <Card className="mb-6 w-full max-w-3xl bg-muted/30">
        <CardContent className="p-8 text-center">
          <p className="text-3xl font-bold">{round.category} starting with</p>
          <p className="text-6xl font-black text-secondary mt-2">{round.letter}</p>
        </CardContent>
      </Card>

      {/* Timer controls */}
      {!state.g2TimerActive && !state.g2TimerEnded && (
        <Button variant="secondary" size="lg" onClick={() => dispatch({ type: 'G2_START_TIMER' })} className="mb-6">
          <Play size={18} /> Start Timer (30s)
        </Button>
      )}

      {state.g2TimerActive && (
        <div className="flex flex-col items-center mb-6">
          {timeLeft <= 15 && (
            <div className="mb-2 flex items-center gap-3">
              <img src={timerPanic} alt="Timer warning" className="h-32 w-32 animate-countdown-pulse object-contain" />
              <img src={sweatingPanic} alt="" className="h-52 w-auto rounded-2xl object-cover animate-countdown-pulse" />
            </div>
          )}
          <div className={`text-6xl font-black tabular-nums mb-4 transition-colors ${timeLeft <= 0 ? 'text-destructive animate-countdown-pulse' : timeLeft <= 5 ? 'text-destructive animate-countdown-pulse' : timeLeft <= 10 ? 'text-amber-600' : 'text-secondary'}`}>
            {timeLeft <= 0 ? '0' : timeLeft}s
          </div>
          <Button variant="destructive" size="default" onClick={() => dispatch({ type: 'G2_END_TIMER' })}>
            <Square size={16} /> Stop Timer
          </Button>
        </div>
      )}

      {state.g2TimerEnded && (
        <Badge variant="danger" className="mb-4 text-base px-4 py-1">TIME'S UP</Badge>
      )}

      {/* Answer input */}
      {(state.g2TimerActive || state.g2TimerEnded) && (
        <div className="w-full max-w-3xl mb-6">
          <div className="flex gap-1.5 justify-center flex-wrap mb-3">
            {state.players.map((p) => (
              <Button key={p.id} onClick={() => setInputPlayer(p.id)} variant={inputPlayer === p.id ? 'default' : 'outline'} size="sm">
                {p.name}
              </Button>
            ))}
          </div>
          {inputPlayer !== null && (
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-2 justify-center w-full">
                <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addAnswer()} placeholder="Type one or many: apple; apricot; avocado" className="max-w-[420px] bg-card" />
                <Button onClick={addAnswer} size="default">Add</Button>
              </div>
              <p className="text-xs text-muted-foreground">Use <span className="font-mono">;</span> to add multiple answers at once.</p>
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {state.g2TimerEnded && (
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {state.players.map((p) => {
              const answers = state.g2Answers[p.id] || [];
              return (
                <Card key={p.id} className="bg-muted/20">
                  <CardContent className="p-4">
                    <h4 className="font-bold text-sm mb-2 text-muted-foreground">{p.name}</h4>
                    <div className="space-y-1">
                      {answers.map((a, i) => {
                        const isDuplicate = answerCounts[a.toLowerCase().trim()] > 1;
                        return (
                          <div key={i} className={'text-xs px-2 py-0.5 rounded ' + (isDuplicate ? 'text-red-600 line-through bg-red-500/10' : 'text-secondary bg-secondary/10')}>
                            {a}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="flex gap-3 justify-center">
            <Button variant="success" onClick={() => dispatch({ type: 'G2_SCORE' })}><Calculator size={16} /> Calculate Scores</Button>
            <Button variant="ghost" onClick={() => dispatch({ type: 'NEXT_ROUND' })}>Next Round <ChevronRight size={16} /></Button>
          </div>
        </div>
      )}
    </div>
  );
}
