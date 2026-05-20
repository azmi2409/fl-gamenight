import type { AppState, Action } from '../types';
import { missingLinkRounds } from '../data/games';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Eye, Link } from 'lucide-react';

export function MissingLink({ state, dispatch }: { state: AppState; dispatch: React.Dispatch<Action> }) {
  const round = missingLinkRounds[state.currentRound];
  if (!round) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-reveal">
        <h2 className="text-3xl font-bold mb-6">The Missing Link Complete</h2>
        <Button variant="glow" size="lg" onClick={() => dispatch({ type: 'NEXT_GAME' })}>Next Game <ChevronRight size={18} /></Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-6 py-8 animate-reveal">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-black text-primary flex items-center gap-2"><Link size={20} /> THE MISSING LINK</h2>
        <Badge variant="secondary">Round {state.currentRound + 1}/6</Badge>
        {round.type === 'reverse' && <Badge variant="warning">REVERSE</Badge>}
        {round.type === 'missing' && <Badge variant="danger">FIND THE MISSING</Badge>}
      </div>

      {round.type === 'reverse' ? (
        <Card className="mb-8 w-full max-w-3xl bg-muted/30">
          <CardContent className="p-8 text-center">
            <p className="text-lg text-muted-foreground mb-3">Name items that fit:</p>
            <p className="text-4xl font-black text-primary">{round.connection.replace(' → ', ' — ')}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex gap-4 mb-8 flex-wrap justify-center">
          {round.items.map((item, i) => (
            <Card key={i} className="bg-muted/30 min-w-[160px]">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold">{item}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!state.answerRevealed && (
        <Button variant="default" size="lg" onClick={() => dispatch({ type: 'REVEAL_ANSWER' })} className="mb-6">
          <Eye size={18} /> Reveal Connection
        </Button>
      )}

      {state.answerRevealed && (
        <Card className="mb-6 bg-secondary/10 border-secondary/40 animate-reveal">
          <CardContent className="p-5 text-center">
            <p className="text-2xl font-black text-emerald-400">{round.connection}</p>
            {round.type === 'reverse' && <p className="text-sm text-muted-foreground mt-2">Items: {round.items.join(', ')}</p>}
          </CardContent>
        </Card>
      )}

      <div className="w-full max-w-3xl space-y-3">
        <p className="text-center text-xs text-muted-foreground">Correct = +4 · First to answer = +2 bonus</p>
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
              {p.name} 1st (+2)
            </Button>
          ))}
        </div>
        <div className="flex justify-center pt-2">
          <Button variant="ghost" size="lg" onClick={() => dispatch({ type: 'NEXT_ROUND' })}>Next Round <ChevronRight size={18} /></Button>
        </div>
      </div>
    </div>
  );
}
