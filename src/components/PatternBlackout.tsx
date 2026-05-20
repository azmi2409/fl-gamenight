import { useEffect } from 'react';
import type { AppState, Action } from '../types';
import { patternBlackoutRounds } from '../data/games';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Eye, EyeOff, Zap } from 'lucide-react';

export function PatternBlackout({ state, dispatch }: { state: AppState; dispatch: React.Dispatch<Action> }) {
  const round = patternBlackoutRounds[state.currentRound];

  useEffect(() => {
    if (state.g5GridVisible && round) {
      const t = setTimeout(() => dispatch({ type: 'G5_HIDE_GRID' }), 10000);
      return () => clearTimeout(t);
    }
  }, [state.g5GridVisible, state.currentRound]);

  if (!round) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-reveal">
        <h2 className="text-3xl font-bold mb-6">Pattern Blackout Complete</h2>
        <Button variant="glow" size="lg" onClick={() => dispatch({ type: 'NEXT_GAME' })}>Final Results <ChevronRight size={18} /></Button>
      </div>
    );
  }

  const question = round.questions[state.g5QuestionIndex];

  return (
    <div className="flex flex-col items-center px-6 py-8 animate-reveal">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-black text-primary flex items-center gap-2"><Zap size={20} /> PATTERN BLACKOUT</h2>
        <Badge variant="secondary">Round {state.currentRound + 1}/3</Badge>
        <Badge variant="warning" className="font-black">2× POINTS</Badge>
      </div>

      {state.g5GridVisible && (
        <Card className="mb-6 border-primary/30 animate-glow">
          <CardContent className="p-6">
            <p className="text-center text-sm text-primary font-bold mb-3">MEMORIZE — auto-hides in 10s</p>
            <div className="grid gap-1.5">
              {round.grid.map((row, ri) => (
                <div key={ri} className="flex gap-1.5 justify-center">
                  {row.map((cell, ci) => (
                    <div key={ci} className="w-14 h-14 flex items-center justify-center bg-background rounded-md text-2xl font-mono font-bold border border-border">
                      {cell}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {state.g5GridVisible && (
        <Button variant="destructive" size="default" onClick={() => dispatch({ type: 'G5_HIDE_GRID' })}>
          <EyeOff size={16} /> Hide Grid Now
        </Button>
      )}

      {!state.g5GridVisible && question && (
        <>
          <Card className="mb-6 w-full max-w-3xl bg-muted/30">
            <CardContent className="p-8 text-center">
              <p className="text-xs text-muted-foreground mb-2">Question {state.g5QuestionIndex + 1}/{round.questions.length}</p>
              <p className="text-3xl font-bold">{question.q}</p>
            </CardContent>
          </Card>

          {!state.answerRevealed && (
            <Button variant="default" size="lg" onClick={() => dispatch({ type: 'REVEAL_ANSWER' })} className="mb-6">
              <Eye size={18} /> Show Answer
            </Button>
          )}

          {state.answerRevealed && (
            <Card className="mb-6 bg-emerald-950/30 border-emerald-500/30 animate-reveal">
              <CardContent className="p-5 text-center">
                <p className="text-2xl font-black text-emerald-400">{question.a}</p>
              </CardContent>
            </Card>
          )}

          <div className="w-full max-w-3xl space-y-3">
            <p className="text-center text-xs text-muted-foreground">Correct = +4 (doubled) · Fastest = +2 bonus</p>
            <div className="flex gap-2 justify-center flex-wrap">
              {state.players.map((p) => (
                <Button key={p.id} variant="outline" size="default" onClick={() => dispatch({ type: 'AWARD_POINTS', playerId: p.id, points: 4 })}>
                  {p.name} +4
                </Button>
              ))}
            </div>
            <div className="flex gap-2 justify-center flex-wrap">
              {state.players.map((p) => (
                <Button key={`b-${p.id}`} variant="ghost" size="sm" onClick={() => dispatch({ type: 'AWARD_POINTS', playerId: p.id, points: 2 })} className="text-primary">
                  {p.name} Fast (+2)
                </Button>
              ))}
            </div>
            <div className="flex justify-center pt-2">
              {state.g5QuestionIndex < round.questions.length - 1 ? (
                <Button variant="ghost" size="lg" onClick={() => dispatch({ type: 'G5_NEXT_QUESTION' })}>Next Question <ChevronRight size={18} /></Button>
              ) : (
                <Button variant="ghost" size="lg" onClick={() => dispatch({ type: 'NEXT_ROUND' })}>Next Round <ChevronRight size={18} /></Button>
              )}
            </div>
          </div>
        </>
      )}

      {!state.g5GridVisible && !question && (
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">All questions answered</p>
          <Button variant="ghost" size="lg" onClick={() => dispatch({ type: 'NEXT_ROUND' })}>Next Round <ChevronRight size={18} /></Button>
        </div>
      )}
    </div>
  );
}
