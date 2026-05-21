import type { AppState, Action } from '../types';
import { knowledgeDuelQuestions } from '../data/games';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Eye, Flame } from 'lucide-react';
import waitWhat from '../assets/memes/wait-what.jpg';

const difficultyConfig = {
  easy: { label: 'Easy', points: 3, variant: 'success' as const },
  medium: { label: 'Medium', points: 4, variant: 'warning' as const },
  hard: { label: 'Hard', points: 6, variant: 'danger' as const },
};

export function KnowledgeDuel({ state, dispatch }: { state: AppState; dispatch: React.Dispatch<Action> }) {
  const question = knowledgeDuelQuestions[state.currentRound];

  if (!question) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-reveal">
        <h2 className="text-3xl font-bold mb-6">Knowledge Duel Complete</h2>
        <Button variant="glow" size="lg" onClick={() => dispatch({ type: 'NEXT_GAME' })}>Next Game <ChevronRight size={18} /></Button>
      </div>
    );
  }

  const config = difficultyConfig[question.difficulty];
  const awardKey = `g4-r${state.currentRound}-winner`;
  const hasWinner = state.usedAwardKeys.includes(awardKey);

  const handleCorrect = (playerId: number) => {
    const player = state.players.find((p) => p.id === playerId)!;
    let pts = config.points;
    const newStreak = player.streak + 1;
    if (newStreak >= 3 && newStreak % 3 === 0) pts += 3;
    dispatch({ type: 'AWARD_POINTS', playerId, points: pts, awardKey });
  };

  return (
    <div className="flex flex-col items-center px-6 py-8 animate-reveal">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-black text-foreground">KNOWLEDGE DUEL</h2>
        <Badge variant="secondary">Q{state.currentRound + 1}/15</Badge>
        <Badge variant={config.variant}>{config.label} +{config.points}</Badge>
      </div>

      <Card className="mb-8 w-full max-w-3xl bg-muted/30">
        <CardContent className="p-8 text-center">
          <p className="text-3xl md:text-4xl font-bold leading-relaxed">{question.q}</p>
        </CardContent>
      </Card>

      {!state.answerRevealed && (
        <Button variant="secondary" size="lg" onClick={() => dispatch({ type: 'REVEAL_ANSWER' })} className="mb-6">
          <Eye size={18} /> Show Answer
        </Button>
      )}

      {state.answerRevealed && (
        <Card className="mb-6 bg-secondary/10 border-secondary/40 animate-reveal">
          <CardContent className="p-5 text-center flex items-center justify-center gap-4">
            {question.difficulty === 'hard' && <img src={waitWhat} alt="" className="h-40 w-auto rounded-2xl object-cover" />}
            <p className="text-3xl font-black text-emerald-400">{question.a}</p>
          </CardContent>
        </Card>
      )}

      <div className="w-full max-w-3xl space-y-3">
        <p className="text-center text-xs text-muted-foreground">Click the player who answered correctly first</p>
        <div className="flex gap-2 justify-center flex-wrap">
          {state.players.map((p) => (
            <Button key={p.id} variant="outline" size="default" disabled={hasWinner} onClick={() => handleCorrect(p.id)}>
              {p.name} {p.streak >= 2 && <span className="text-amber-600 flex items-center gap-0.5"><Flame size={12} />{p.streak}</span>}
            </Button>
          ))}
        </div>
        <div className="flex justify-center pt-2">
          <Button variant="ghost" size="lg" onClick={() => dispatch({ type: 'NEXT_ROUND' })}>Next Question <ChevronRight size={18} /></Button>
        </div>
      </div>
    </div>
  );
}
