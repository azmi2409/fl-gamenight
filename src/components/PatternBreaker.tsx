import type { AppState, Action } from '../types';
import { patternBreakerRounds } from '../data/games';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Eye, XCircle } from 'lucide-react';
import galaxyBrain from '../assets/memes/galaxy-brain.jpg';
import mathLady from '../assets/memes/math-lady.jpg';
import emotionalDamage from '../assets/memes/emotional-damage.jpg';

export function PatternBreaker({ state, dispatch }: { state: AppState; dispatch: React.Dispatch<Action> }) {
  const round = patternBreakerRounds[state.currentRound];
  if (!round) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-reveal">
        <h2 className="text-3xl font-bold mb-6">Pattern Breaker Complete</h2>
        <Button variant="glow" size="lg" onClick={() => dispatch({ type: 'NEXT_GAME' })}>Next Game <ChevronRight size={18} /></Button>
      </div>
    );
  }

  const placementLabels = ['1st +5', '2nd +3', '3rd +1'];
  const getWrongKey = (playerId: number) => `g1-r${state.currentRound}-wrong-${playerId}`;

  return (
    <div className="flex flex-col items-center px-6 py-8 animate-reveal">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-black text-primary">PATTERN BREAKER</h2>
        <Badge variant="secondary">Round {state.currentRound + 1}/8</Badge>
      </div>

      <Card className="mb-8 w-full max-w-3xl bg-muted/30">
        <CardContent className="p-8 text-center">
          <p className="text-4xl md:text-5xl font-mono font-bold tracking-wider leading-relaxed text-foreground">{round.sequence}</p>
        </CardContent>
      </Card>

      {!state.answerRevealed && (
        <img src={mathLady} alt="" className="mb-4 h-48 w-auto rounded-2xl object-contain opacity-90" />
      )}

      {state.answerRevealed && (
        <Card className="mb-6 bg-secondary/10 border-secondary/40 animate-reveal">
          <CardContent className="p-5 text-center flex items-center justify-center gap-4">
            <img src={galaxyBrain} alt="" className="h-40 w-auto rounded-2xl object-cover" />
            <div>
              <p className="text-3xl font-black text-emerald-400">{round.answer}</p>
              <p className="text-sm text-muted-foreground mt-1">Hint: {round.hint}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {!state.answerRevealed && (
        <Button variant="secondary" size="lg" onClick={() => dispatch({ type: 'REVEAL_ANSWER' })} className="mb-6">
          <Eye size={18} /> Show Answer
        </Button>
      )}

      <div className="w-full max-w-3xl space-y-4">
        <div className="flex gap-2 justify-center flex-wrap">
          {state.players.map((p) => {
            const alreadyPlaced = state.g1Placements.includes(p.id);
            const canPlace = state.g1Placements.length < 3;
            const placement = state.g1Placements.indexOf(p.id);
            return (
              <Button
                key={p.id}
                disabled={alreadyPlaced || !canPlace}
                onClick={() => dispatch({ type: 'G1_PLACE', playerId: p.id })}
                variant={alreadyPlaced ? 'success' : 'outline'}
                size="default"
              >
                {p.name}
                {alreadyPlaced && <span className="ml-1 text-xs opacity-75">({placementLabels[placement]})</span>}
              </Button>
            );
          })}
        </div>

        <div className="flex gap-2 justify-center flex-wrap">
          {state.players.map((p) => {
            const wrongKey = getWrongKey(p.id);
            const wrongUsed = state.usedAwardKeys.includes(wrongKey);
            const alreadyPlaced = state.g1Placements.includes(p.id);
            return (
              <Button
                key={`w-${p.id}`}
                variant="destructive"
                size="sm"
                disabled={wrongUsed || alreadyPlaced}
                onClick={() => dispatch({ type: 'AWARD_POINTS', playerId: p.id, points: -2, awardKey: wrongKey })}
              >
                <img src={emotionalDamage} alt="" className="h-6 w-auto rounded-sm object-cover" />
                <XCircle size={14} /> {wrongUsed ? `${p.name} Penalized` : `${p.name} -2`}
              </Button>
            );
          })}
        </div>

        <div className="flex justify-center pt-2">
          <Button variant="ghost" size="lg" onClick={() => dispatch({ type: 'NEXT_ROUND' })}>
            Next Round <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
