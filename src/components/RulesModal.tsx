import type { Screen } from '../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BookOpen } from 'lucide-react';

const rules: Record<string, { title: string; content: string[] }> = {
  game1: {
    title: 'GAME 1: PATTERN BREAKER (8 rounds)',
    content: [
      'A sequence is displayed — find the next item.',
      'Players type their answer in Zoom chat.',
      'Host awards points based on order of correct answers.',
      '', 'Scoring:', '  1st correct = +5', '  2nd correct = +3', '  3rd correct = +1', '  Wrong answer = -2',
    ],
  },
  game2: {
    title: 'GAME 2: CATEGORY CLASH (6 rounds)',
    content: [
      'A category + starting letter is shown.',
      '30 seconds to name as many items as possible.',
      'Players type in Zoom chat; host enters them.',
      '', 'Scoring:', '  Each UNIQUE answer = +2', '  Most unique answers = +3 bonus', '  Duplicate = CANCELLED',
    ],
  },
  game3: {
    title: 'GAME 3: THE MISSING LINK (6 rounds)',
    content: [
      '3 items shown — find what connects them.',
      'R5: connection shown, name items that fit.',
      'R6: 2 items — find 3rd AND connection.',
      '', 'Scoring:', '  Correct = +4', '  First to answer = +2 bonus',
    ],
  },
  game4: {
    title: 'GAME 4: KNOWLEDGE DUEL (15 questions)',
    content: [
      'Trivia at 3 difficulty levels.',
      'First correct answer wins the points.',
      '', 'Scoring:', '  Easy = +3', '  Medium = +4', '  Hard = +6', '  3-streak bonus = +3',
    ],
  },
  game5: {
    title: 'GAME 5: PATTERN BLACKOUT (3 rounds)',
    content: [
      'Grid shown for 10 seconds — memorize it.',
      'Grid disappears, questions asked about it.',
      'ALL points DOUBLED.',
      '', 'Scoring:', '  Correct = +4', '  Fastest = +2 bonus', '  Perfect round = +5 extra',
    ],
  },
};

const allRulesOrder = ['game1', 'game2', 'game3', 'game4', 'game5'];

export function RulesModal({ open, currentScreen, onClose }: { open: boolean; currentScreen: Screen; onClose: () => void }) {
  const currentKey = allRulesOrder.includes(currentScreen) ? currentScreen : null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent onClose={onClose} className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><BookOpen size={20} className="text-primary" /> Game Rules</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {allRulesOrder.map((key) => {
            const rule = rules[key];
            const isCurrent = key === currentKey;
            return (
              <div key={key} className={`rounded-lg p-4 border transition-all ${isCurrent ? 'bg-primary/5 border-primary/20' : 'bg-muted/20 border-border'}`}>
                <h3 className={`text-sm font-bold mb-2 ${isCurrent ? 'text-primary' : 'text-foreground'}`}>
                  {rule.title} {isCurrent && <span className="text-xs text-muted-foreground ml-1">(current)</span>}
                </h3>
                <div className="space-y-0.5">
                  {rule.content.map((line, i) =>
                    line === '' ? <div key={i} className="h-1.5" /> : (
                      <p key={i} className={`text-xs ${line.startsWith('  ') ? 'font-mono text-muted-foreground pl-3' : 'text-muted-foreground'}`}>{line}</p>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
