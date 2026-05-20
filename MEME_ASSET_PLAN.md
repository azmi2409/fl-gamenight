# Meme Asset Plan — FL Brain Battle

This doc lists meme-style decorative assets to add on top of the current FutureLab-compatible visual system.

Goal:

- Make the game feel funnier and more alive on Zoom
- Keep memes as overlays/stickers, not the core UI language
- Preserve the bright, polished FutureLab base look
- Avoid turning the app into random internet-chaos collage

## Meme Style Rules

Keep all generated meme assets in the same visual family as the existing stickers:

- transparent PNG stickers
- rounded, readable, high contrast at Zoom size
- expressive but still clean
- blue/teal/green base with coral/red/yellow reaction accents
- no baked-in UI text unless noted

Use memes as reaction moments, not full-screen replacements.

If using Nano Banana:

- generate original meme-like sticker illustrations, not copyrighted meme screenshots
- if you want actual classic meme formats, do that as self-edit/composite work later

## Suggested Folder Structure

```txt
src/assets/memes/
  global/
  pattern-breaker/
  category-clash/
  missing-link/
  knowledge-duel/
  pattern-blackout/
  results/
```

## Priority 1 — Best ROI Memes

These will add the most personality with the least clutter.

| # | Asset | Filename | Size | Where it appears | Trigger | Best source |
|---|-------|----------|------|------------------|---------|-------------|
| 1 | Big brain win sticker | `src/assets/memes/global/big-brain-win.png` | 1024x1024 | Any correct answer reveal | When answer is smart/clean | Generate |
| 2 | Emotional damage sticker | `src/assets/memes/global/emotional-damage.png` | 1024x1024 | Wrong answer penalties | When host docks points | Self-edit or generate |
| 3 | Wait what sticker | `src/assets/memes/global/wait-what.png` | 1024x1024 | Hard reveal moments | Surprising answers | Generate |
| 4 | Sweating panic sticker | `src/assets/memes/category-clash/sweating-panic.png` | 1024x1024 | Category Clash | Last 5 seconds | Generate |
| 5 | Duplicate pain sticker | `src/assets/memes/category-clash/duplicate-pain.png` | 1024x1024 | Category Clash results | Same answer collision | Generate |
| 6 | Conspiracy wall sticker | `src/assets/memes/missing-link/conspiracy-wall.png` | 1024x1024 | Missing Link | Before reveal | Generate |
| 7 | Professor approval sticker | `src/assets/memes/knowledge-duel/professor-approval.png` | 1024x1024 | Knowledge Duel | Correct hard answer | Generate |
| 8 | Brain buffering sticker | `src/assets/memes/pattern-blackout/brain-buffering.png` | 1024x1024 | Pattern Blackout | After grid hides | Generate |
| 9 | Champion aura sticker | `src/assets/memes/results/champion-aura.png` | 1024x1024 | Results screen | 1st place reveal | Generate |
| 10 | it-is-what-it-is sticker | `src/assets/memes/results/it-is-what-it-is.png` | 1024x1024 | Last place reveal | Bottom player moment | Self-edit or generate |

## Priority 2 — Per-Game Meme Set

These give each game its own comic personality.

### 1. Pattern Breaker

Use case: smart guesses, chaotic wrong guesses, "how did you get that" moments.

| Asset | Filename | Placement | Trigger | Prompt direction |
|-------|----------|-----------|---------|------------------|
| Galaxy brain sticker | `src/assets/memes/pattern-breaker/galaxy-brain.png` | beside revealed answer | when answer is elegant | Big glowing brain with orbit rings, clean smart-team aesthetic, teal/green/coral highlights, transparent PNG |
| Math lady panic sticker | `src/assets/memes/pattern-breaker/math-lady-panic.png` | near sequence card | tough round before reveal | Friendly professional character with floating formulas and confused expression, meme-sticker style, transparent PNG |
| Wrong formula explosion | `src/assets/memes/pattern-breaker/wrong-formula-boom.png` | wrong answer row | after -2 penalty | Rounded formula card popping with coral impact burst, funny not harsh, transparent PNG |
| host side-eye sticker | `src/assets/memes/pattern-breaker/host-side-eye.png` | answer panel corner | after absurd guess | Mascot giving skeptical side-eye, transparent PNG |

### 2. Category Clash

Use case: time pressure, duplicate answers, chat spam energy.

| Asset | Filename | Placement | Trigger | Prompt direction |
|-------|----------|-----------|---------|------------------|
| keyboard smash panic | `src/assets/memes/category-clash/keyboard-smash-panic.png` | timer area | 5 seconds left | Friendly overworked office brain/host slamming keyboard in a playful way, coral urgency ring, transparent PNG |
| same answer pain | `src/assets/memes/category-clash/same-answer-pain.png` | duplicate answers panel | duplicate detected | Two identical answer cards bonking into each other with sad reaction, transparent PNG |
| chat flood chaos | `src/assets/memes/category-clash/chat-flood-chaos.png` | input area decoration | during active timer | Clean stack of fast-moving answer bubbles, energetic but readable, transparent PNG |
| clutch saver sticker | `src/assets/memes/category-clash/clutch-save.png` | score calc moment | player gets many unique answers | Heroic answer card surfing through chaos, teal/green victory energy |

### 3. The Missing Link

Use case: conspiracy energy, delayed realization, sudden connection click.

| Asset | Filename | Placement | Trigger | Prompt direction |
|-------|----------|-----------|---------|------------------|
| red-string detective board | `src/assets/memes/missing-link/red-string-board.png` | above or beside clue cards | before reveal | Meme-like detective cork board with red strings, but rendered in clean SaaS illustration style, transparent PNG |
| aha lightbulb face | `src/assets/memes/missing-link/aha-lightbulb.png` | after reveal | when connection lands | Cute smart reaction face with lightbulb spark and teal/coral burst |
| no no wait sticker | `src/assets/memes/missing-link/no-wait-i-see-it.png` | reveal transition | right before answer shown | Surprised realization pose, transparent PNG |
| cursed connection sticker | `src/assets/memes/missing-link/cursed-connection.png` | for bizarre rounds | when answer is funny | Friendly horrified reaction sticker, not dark/horror |

### 4. Knowledge Duel

Use case: nerd flex, streaks, hard-mode wins, wrong confident answers.

| Asset | Filename | Placement | Trigger | Prompt direction |
|-------|----------|-----------|---------|------------------|
| professor nod approval | `src/assets/memes/knowledge-duel/professor-nod.png` | answer reveal | hard question answered | Polished mentor/professor giving impressed nod, transparent PNG |
| nerd rage fact-check | `src/assets/memes/knowledge-duel/nerd-rage-fact-check.png` | wrong answer state | confidently wrong player | Friendly fact-check reaction with notes/cards flying, transparent PNG |
| unstoppable streak fire | `src/assets/memes/knowledge-duel/unstoppable-streak.png` | streak indicator area | streak >= 3 | Brain mascot with sporty flame trail, clean sticker style |
| history goblin sticker | `src/assets/memes/knowledge-duel/history-goblin.png` | world history questions | niche fact appears | Funny obsessed trivia creature hugging an old scroll/map |

### 5. Pattern Blackout

Use case: memory collapse, screen wipe, panic recall.

| Asset | Filename | Placement | Trigger | Prompt direction |
|-------|----------|-----------|---------|------------------|
| brain buffering | `src/assets/memes/pattern-blackout/brain-buffering.png` | after grid disappears | question starts | Cute brain with loading spinner and buffering wheel, transparent PNG |
| memory wiped sticker | `src/assets/memes/pattern-blackout/memory-wiped.png` | after bad miss | player forgets instantly | Clean comic wipe effect and shocked face, transparent PNG |
| one-second-ago sticker | `src/assets/memes/pattern-blackout/one-second-ago.png` | question panel corner | immediate forgetfulness joke | Tiny clock and vanished memory tiles, transparent PNG |
| laser-focus mode | `src/assets/memes/pattern-blackout/laser-focus.png` | grid visible phase | memorize mode | Focused mentor-brain with sharp highlight beams |

## Priority 3 — Setup / Transition / Results Memes

These help the whole app feel more alive between rounds.

### Setup Screen

| Asset | Filename | Placement | Trigger | Prompt direction |
|-------|----------|-----------|---------|------------------|
| host judging empty names | `src/assets/memes/global/host-judging-empty-names.png` | player setup area | if many default names later | Mascot with playful judgment expression |
| locked-in squad sticker | `src/assets/memes/global/locked-in-squad.png` | near start button | pre-game hype | Team of abstract rounded icons getting ready, subtle meme intensity |

### Transition Screens

| Asset | Filename | Placement | Trigger | Prompt direction |
|-------|----------|-----------|---------|------------------|
| here-we-go-again | `src/assets/memes/global/here-we-go-again.png` | countdown card corner | every new game | Tired but determined host reaction sticker |
| academic weapon sticker | `src/assets/memes/global/academic-weapon.png` | countdown card | harder games | Overpowered smart-brain sticker with confident energy |

### Results Screen

| Asset | Filename | Placement | Trigger | Prompt direction |
|-------|----------|-----------|---------|------------------|
| top-1 main character | `src/assets/memes/results/main-character-energy.png` | first place podium | winner reveal | Winner aura, spotlight circles, polished celebratory sticker |
| we-listen-we-dont-judge | `src/assets/memes/results/we-listen-we-dont-judge.png` | bottom 3 area | funny low-score reveal | Gentle sympathetic reaction sticker, transparent PNG |
| almost-there-bestie | `src/assets/memes/results/almost-there-bestie.png` | 2nd/3rd place | close finish | Friendly near-win reaction sticker |

## Suggested First Batch To Generate

If you want the fastest high-impact batch, do these 8 first:

1. `src/assets/memes/global/big-brain-win.png`
2. `src/assets/memes/global/emotional-damage.png`
3. `src/assets/memes/category-clash/same-answer-pain.png`
4. `src/assets/memes/category-clash/keyboard-smash-panic.png`
5. `src/assets/memes/missing-link/red-string-board.png`
6. `src/assets/memes/knowledge-duel/professor-nod.png`
7. `src/assets/memes/pattern-blackout/brain-buffering.png`
8. `src/assets/memes/results/main-character-energy.png`

## Self-Edit Candidates

These are better if you want stronger internet-meme energy:

- `emotional-damage.png`
- `it-is-what-it-is.png`
- `math-lady-panic.png`
- `here-we-go-again.png`
- `we-listen-we-dont-judge.png`

Reason:

- direct meme timing often works better with custom facial expressions or text treatment
- you may want to composite real reaction faces or typography manually

## Safe Prompt Template For Generated Meme Stickers

```txt
Create a transparent PNG reaction sticker for FL Brain Battle, a professional-but-playful team quiz game. Keep the style compatible with a bright FutureLab-like SaaS event visual system: rounded shapes, clean vector/3D hybrid rendering, deep navy detail lines, blue/teal and fresh green base accents, plus coral/yellow reaction highlights. The sticker should feel meme-like and expressive, readable over Zoom, funny without being chaotic or childish. No background. No copyrighted characters. No real celebrity likeness. No random text unless explicitly requested.
```

## Implementation Notes Later

When you start wiring these in, keep it simple:

- one meme asset per major state, not multiple at once
- use low-risk placements first: answer reveal cards, countdown warning area, results screen
- prefer conditional rendering over permanent decoration
- keep most meme stickers between `h-12` and `h-24`

## Recommended Rollout Order

1. Add one meme surface per game.
2. Add two results memes.
3. Add one reusable global reaction sticker for correct answers.
4. Test on Zoom screen share before adding more.

Too many meme stickers at once will reduce readability and make the UI feel messy.
