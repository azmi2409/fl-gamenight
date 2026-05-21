import { useEffect, useState } from 'react';
import type { Player, ScoreEvent } from '../types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trophy, BookOpen, RotateCcw, TriangleAlert } from 'lucide-react';
import brainBattleMark from '../assets/brand/brain-battle-mark.png';
import leaderCrown from '../assets/stickers/leader-crown.png';
import scoreBurst from '../assets/stickers/score-burst.png';

function ScorePopup({ event }: { event: ScoreEvent }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => { const t = setTimeout(() => setVisible(false), 1000); return () => clearTimeout(t); }, []);
  if (!visible) return null;
  return (
    <span className={`absolute -top-3 right-0 flex items-center gap-0.5 text-sm font-black animate-float-up ${event.delta > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
      {event.delta > 0 && <img src={scoreBurst} alt="" className="h-5 w-5 object-contain" />}
      {event.delta > 0 ? `+${event.delta}` : event.delta}
    </span>
  );
}

function ScoreToast({ event, playerName }: { event: ScoreEvent; playerName: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed right-6 top-18 z-[90] animate-reveal">
      <div className={`flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur-md ${event.delta > 0 ? 'border-secondary/40 bg-card/95' : 'border-destructive/30 bg-card/95'}`}>
        {event.delta > 0 && <img src={scoreBurst} alt="" className="h-10 w-10 object-contain" />}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Points updated</p>
          <p className="text-base font-black text-foreground">{playerName}</p>
          <p className={`text-sm font-bold ${event.delta > 0 ? 'text-secondary' : 'text-destructive'}`}>{event.delta > 0 ? `+${event.delta}` : event.delta} applied</p>
        </div>
      </div>
    </div>
  );
}

export function Scoreboard({
  players, sortedPlayers, scoreEvents, onOpenRules, onReset,
}: {
  players: Player[]; sortedPlayers: Player[]; scoreEvents: ScoreEvent[]; onOpenRules: () => void; onReset: () => void;
}) {
  const [recentEvents, setRecentEvents] = useState<ScoreEvent[]>([]);
  const [standingsOpen, setStandingsOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [toastEvents, setToastEvents] = useState<ScoreEvent[]>([]);

  useEffect(() => {
    const existing = new Set(recentEvents.map((event) => event.id));
    const newEvents = scoreEvents.filter((event) => !existing.has(event.id));
    if (newEvents.length === 0) return;

    setRecentEvents((prev) => [...prev, ...newEvents]);
    setToastEvents((prev) => [...prev, ...newEvents]);

    const timers = newEvents.map((event) => window.setTimeout(() => {
      setRecentEvents((prev) => prev.filter((e) => e.id !== event.id));
      setToastEvents((prev) => prev.filter((e) => e.id !== event.id));
    }, 1800));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [scoreEvents.length]);

  const leaderId = sortedPlayers.length > 0 && sortedPlayers[0].score > 0 ? sortedPlayers[0].id : -1;

  return (
    <>
      <div className="pointer-events-none fixed right-6 top-18 z-[90] flex flex-col gap-3">
        {toastEvents.map((event) => (
          <ScoreToast key={event.id} event={event} playerName={players.find((p) => p.id === event.playerId)?.name || 'Player'} />
        ))}
      </div>
      <div className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border h-12 flex items-center px-4">
        <img src={brainBattleMark} alt="FL Brain Battle" className="mr-3 h-8 w-8 object-contain" />
        <div className="flex items-center gap-2 flex-1 overflow-x-auto">
          {players.map((p) => {
            const isLeader = p.id === leaderId;
            const playerEvents = recentEvents.filter((e) => e.playerId === p.id);
              return (
                <div key={p.id} className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs whitespace-nowrap transition-all ${isLeader ? 'bg-primary/10 ring-1 ring-primary/30' : ''}`}>
                {isLeader && <img src={leaderCrown} alt="Leader" className="h-5 w-5 object-contain" />}
                <span className="font-medium text-muted-foreground">{p.name}</span>
                <span className="font-black text-foreground tabular-nums">{p.score}</span>
                {playerEvents.map((e) => <ScorePopup key={e.id} event={e} />)}
              </div>
            );
          })}
        </div>
        <div className="flex gap-1.5 ml-3">
          <Button variant="ghost" size="sm" onClick={() => setStandingsOpen(true)} className="h-8 text-xs">
            <Trophy size={14} /> Standings
          </Button>
          <Button variant="ghost" size="sm" onClick={onOpenRules} className="h-8 text-xs">
            <BookOpen size={14} /> Rules
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setResetOpen(true)} className="h-8 text-xs text-red-400 hover:text-red-300">
            <RotateCcw size={14} /> Reset
          </Button>
        </div>
      </div>

      <Dialog open={standingsOpen} onClose={() => setStandingsOpen(false)}>
        <DialogContent onClose={() => setStandingsOpen(false)} className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Trophy size={20} className="text-primary" /> Standings</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {sortedPlayers.map((p, i) => {
              const medals = ['🥇', '🥈', '🥉'];
              return (
                <div key={p.id} className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${i === 0 && p.score > 0 ? 'bg-primary/5 border-primary/20' : 'bg-muted/30 border-border'}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-lg w-7 text-center">{i < 3 ? medals[i] : <span className="text-muted-foreground text-sm font-mono">#{i + 1}</span>}</span>
                    <span className="font-semibold">{p.name}</span>
                  </div>
                  <span className="font-black text-lg tabular-nums">{p.score}</span>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={resetOpen} onClose={() => setResetOpen(false)}>
        <DialogContent onClose={() => setResetOpen(false)} className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><TriangleAlert size={20} className="text-red-400" /> Reset Game</DialogTitle>
          </DialogHeader>
          <div className="space-y-5">
            <p className="text-sm text-muted-foreground">
              This will clear the current game state, scores, rounds, and saved local progress. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setResetOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setResetOpen(false);
                  onReset();
                }}
              >
                Confirm Reset
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
