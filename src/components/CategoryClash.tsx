import { useState, useEffect, useRef } from 'react';
import type { AppState, Action } from '../types';
import { categoryClashRounds } from '../data/games';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ChevronRight, Play, Square, Calculator, Pencil, Trash2, Check, X } from 'lucide-react';
import timerPanic from '../assets/stickers/timer-panic.png';
import sweatingPanic from '../assets/memes/sweating-panic.jpg';

export function CategoryClash({ state, dispatch }: { state: AppState; dispatch: React.Dispatch<Action> }) {
  const round = categoryClashRounds[state.currentRound];
  const [timeLeft, setTimeLeft] = useState(30);
  const [inputPlayer, setInputPlayer] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [editingAnswer, setEditingAnswer] = useState<{ playerId: number; answerIndex: number } | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scoreKey = `g2-r${state.currentRound}-score`;
  const hasScored = state.usedAwardKeys.includes(scoreKey);

  useEffect(() => {
    if (state.g2TimerActive && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
  }, [state.g2TimerActive, timeLeft]);

  useEffect(() => {
    setTimeLeft(30);
    setInputPlayer(null);
    setInputValue('');
    setEditingAnswer(null);
  }, [state.currentRound]);

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
  const totalAnswers = allAnswersFlat.length;

  const resetComposer = () => {
    setInputValue('');
    setEditingAnswer(null);
  };

  const submitAnswer = () => {
    if (inputPlayer !== null && inputValue.trim() && !hasScored) {
      if (editingAnswer) {
        dispatch({
          type: 'G2_EDIT_ANSWER',
          fromPlayerId: editingAnswer.playerId,
          answerIndex: editingAnswer.answerIndex,
          nextPlayerId: inputPlayer,
          nextAnswer: inputValue,
        });
        resetComposer();
        return;
      }

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

  const startEditing = (playerId: number, answerIndex: number, answer: string) => {
    if (hasScored) return;
    setEditingAnswer({ playerId, answerIndex });
    setInputPlayer(playerId);
    setInputValue(answer);
  };

  const removeAnswer = (playerId: number, answerIndex: number) => {
    if (hasScored) return;
    dispatch({ type: 'G2_REMOVE_ANSWER', playerId, answerIndex });
    if (editingAnswer?.playerId === playerId && editingAnswer.answerIndex === answerIndex) {
      resetComposer();
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
              <Button key={p.id} onClick={() => setInputPlayer(p.id)} variant={inputPlayer === p.id ? 'default' : 'outline'} size="sm" disabled={hasScored}>
                {p.name}
                {(state.g2Answers[p.id] || []).length > 0 && <span className="text-[10px] opacity-70">({(state.g2Answers[p.id] || []).length})</span>}
              </Button>
            ))}
          </div>
          {inputPlayer !== null && (
            <div className="rounded-2xl border border-border bg-card/70 p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                <div>
                  <p className="text-sm font-semibold text-foreground">{editingAnswer ? 'Edit answer' : 'Quick add answers'}</p>
                  <p className="text-xs text-muted-foreground">Selected player: {state.players.find((p) => p.id === inputPlayer)?.name}</p>
                </div>
                {editingAnswer && (
                  <Badge variant="warning">Editing existing answer</Badge>
                )}
              </div>
              <div className="flex gap-2 justify-center w-full flex-wrap">
                <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submitAnswer()} placeholder="Type one or many: apple; apricot; avocado" className="max-w-[420px] bg-card" disabled={hasScored} />
                <Button onClick={submitAnswer} size="default" disabled={hasScored || !inputValue.trim()}>
                  {editingAnswer ? <Check size={16} /> : null}
                  {editingAnswer ? 'Save' : 'Add'}
                </Button>
                {editingAnswer && (
                  <Button variant="outline" onClick={resetComposer} size="default">
                    <X size={16} /> Cancel
                  </Button>
                )}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Use <span className="font-mono">;</span> to add multiple answers at once. You can fix player mistakes or typos below before scoring.</p>
            </div>
          )}
        </div>
      )}

      {(state.g2TimerActive || state.g2TimerEnded) && (
        <div className="w-full max-w-4xl">
          <div className="mb-3 flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h3 className="text-lg font-bold text-foreground">Review answers</h3>
              <p className="text-sm text-muted-foreground">Edit, move, or remove anything before points are calculated.</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{totalAnswers} answers</Badge>
              {hasScored && <Badge variant="success">Scores locked in</Badge>}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {state.players.map((p) => {
              const answers = state.g2Answers[p.id] || [];
              const uniqueCount = answers.filter((a) => answerCounts[a.toLowerCase().trim()] === 1).length;
              return (
                <Card key={p.id} className="bg-muted/20">
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <h4 className="font-bold text-sm text-muted-foreground">{p.name}</h4>
                      <span className="text-[11px] text-muted-foreground">{uniqueCount} unique</span>
                    </div>
                    <div className="space-y-1">
                      {answers.length === 0 && <p className="text-xs text-muted-foreground">No answers yet</p>}
                      {answers.map((a, i) => {
                        const isDuplicate = answerCounts[a.toLowerCase().trim()] > 1;
                        return (
                          <div key={i} className={'flex items-center justify-between gap-2 rounded-md px-2 py-1 text-xs ' + (isDuplicate ? 'bg-red-500/10 text-red-600' : 'bg-secondary/10 text-secondary')}>
                            <span className={isDuplicate ? 'line-through' : ''}>{a}</span>
                            <div className="flex items-center gap-1">
                              {!hasScored && (
                                <>
                                  <Button variant="ghost" size="sm" className="h-6 px-2 text-[11px]" onClick={() => startEditing(p.id, i, a)}>
                                    <Pencil size={12} /> Edit
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-6 px-2 text-[11px] text-destructive" onClick={() => removeAnswer(p.id, i)}>
                                    <Trash2 size={12} /> Remove
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          {state.g2TimerEnded && (
            <div className="flex gap-3 justify-center">
              <Button variant="success" onClick={() => dispatch({ type: 'G2_SCORE' })} disabled={hasScored || totalAnswers === 0}>
                <Calculator size={16} /> {hasScored ? 'Scores Added' : 'Calculate Scores'}
              </Button>
              <Button variant="ghost" onClick={() => dispatch({ type: 'NEXT_ROUND' })}>Next Round <ChevronRight size={16} /></Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
