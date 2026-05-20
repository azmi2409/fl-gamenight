# FL Brain Battle

FL Brain Battle is a host-controlled team learning game built for screen-sharing on Zoom or Google Meet. The host runs the app, players answer in chat or verbally, and the host awards points directly in the UI.

Production URL: https://fl-gamenight.vercel.app

## Purpose

This project is designed for FutureLab-style team bonding: structured, smart, friendly, competitive, and easy to run in a live call. It should feel like a polished professional learning event, not a generic neon arcade quiz.

Core principles:

- readable at 1080p during video-call screen share
- host-controlled, no player login needed
- dynamic player count with a minimum of 2 players
- app-rendered questions, scores, names, timers, and rules
- decorative generated assets only where they improve clarity or energy
- bright FutureLab-compatible palette with off-white, blue-teal, mint, coral, and deep navy

## Tech Stack

| Area | Tooling |
|------|---------|
| Framework | Vite + React |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + PostCSS |
| UI primitives | shadcn-style local components |
| Icons | `lucide-react` |
| State | React `useReducer` + `localStorage` |
| Deploy | Vercel |

## Features

- 5 sequential games with transition screens
- dynamic player setup
- persistent game state via `localStorage`
- compact scoreboard bar with score popups
- standings modal
- rules modal
- reset confirmation modal
- host-controlled scoring buttons
- generated FutureLab-compatible brand assets
- meme reaction assets for key game moments
- Category Clash multi-answer entry using `;`
- Category Clash timer that does not auto-stop at zero, so the host stays in control
- Pattern Blackout memory grid that auto-hides after 10 seconds

## Game Flow

1. Setup player names
2. Pattern Breaker
3. Category Clash
4. The Missing Link
5. Knowledge Duel
6. Pattern Blackout
7. Final Results

## Game Rules

| Game | Rounds | Description | Scoring |
|------|--------|-------------|---------|
| Pattern Breaker | 8 | Players solve the next item in a sequence | 1st correct +5, 2nd +3, 3rd +1, wrong -2 |
| Category Clash | 6 | Players list unique answers for a category and starting letter | each unique +2, most unique +3 bonus, duplicates cancelled |
| The Missing Link | 6 | Players identify the connection between clues | correct +4, first answer +2 bonus |
| Knowledge Duel | 15 | Trivia across easy, medium, and hard questions | easy +3, medium +4, hard +6, 3-streak bonus +3 |
| Pattern Blackout | 3 | Players memorize a grid, then answer memory questions | correct +4, fastest +2 bonus |

## Visual System

The app uses a bright SaaS/event visual language aligned with `ASSET_GENERATION_PLAN.md`.

Palette direction:

- base: warm white, soft off-white, pale blue-gray
- primary: FutureLab-style blue-teal
- secondary: fresh green/mint
- accent: warm coral/orange
- text: deep navy
- celebration: teal, green, yellow, and coral

Avoid:

- purple neon
- cyberpunk styling
- casino/game-show clutter
- dark horror lighting
- fake FutureLab logos
- unreadable generated text inside images

## Current Assets

Brand, background, splash, sticker, result, social, and meme assets live under `src/assets/`.

```txt
src/assets/
  backgrounds/
  brand/
  games/
  memes/
  results/
  social/
  stickers/
```

Primary asset docs:

- `ASSET_GENERATION_PLAN.md` - FutureLab-compatible base image plan and prompts
- `MEME_ASSET_PLAN.md` - meme expansion plan, prompt directions, and rollout notes

Currently wired meme assets:

| Asset | Screen | Trigger |
|-------|--------|---------|
| `math-lady.jpg` | Pattern Breaker | before answer reveal |
| `galaxy-brain.jpg` | Pattern Breaker | answer revealed |
| `emotional-damage.jpg` | Pattern Breaker | wrong answer penalty button |
| `sweating-panic.jpg` | Category Clash | timer reaches 15 seconds or less |
| `conspiracy-board.jpg` | The Missing Link | before connection reveal |
| `wait-what.jpg` | Knowledge Duel | hard answer reveal |
| `brain-buffering.jpg` | Pattern Blackout | after the grid hides |
| `is-it-what-is-it-doggy.jpg` | Results | last-place reveal |

## Project Structure

```txt
src/
  App.tsx                    # app shell, reducer, persistence, screen routing
  types.ts                   # app state, actions, player, score event types
  index.css                  # Tailwind v4 theme tokens and animations
  data/
    games.ts                 # all game questions, rounds, categories, and grids
  components/
    SetupScreen.tsx          # player setup
    Scoreboard.tsx           # top scoreboard, standings, reset confirmation
    GameTransition.tsx       # countdown between games
    PatternBreaker.tsx       # game 1
    CategoryClash.tsx        # game 2
    MissingLink.tsx          # game 3
    KnowledgeDuel.tsx        # game 4
    PatternBlackout.tsx      # game 5
    ResultsScreen.tsx        # final podium
    RulesModal.tsx           # in-game rules modal
    ui/                      # local shadcn-style primitives
  lib/
    utils.ts                 # `cn()` helper
  assets/                    # generated visual assets
```

## State Model

The app is a single-page host tool with no backend.

State is managed in `src/App.tsx` with `useReducer` and persisted to `localStorage`.

Storage key:

```txt
zoom-brain-battle-state
```

Important state details:

- `players` stores names, scores, and streaks
- `screen` controls which game is shown
- `currentRound` controls the current round or question index
- `answerRevealed` controls answer cards
- `scoreEvents` drives score popup animations
- `g2Answers`, `g2TimerActive`, and `g2TimerEnded` handle Category Clash
- `g5GridVisible` and `g5QuestionIndex` handle Pattern Blackout
- `g1Placements` stores 1st, 2nd, and 3rd correct placements for Pattern Breaker

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | start local Vite dev server |
| `npm run build` | type-check with `tsc -b` and build with Vite |
| `npm run preview` | preview the production build locally |
| `npm run lint` | run ESLint |

## Contributing

Use small, focused changes. This app is run live on a shared screen, so readability and predictability matter more than adding complex features.

Recommended workflow:

1. Pull the latest `main`.
2. Create a branch for your change.
3. Make the smallest correct change.
4. Run `npm run build` before handing off.
5. Run `npm run lint` when touching TypeScript or React logic.
6. Check the app at desktop size and a narrower mobile/tablet width.
7. Commit with a concise message.

Contribution examples:

- `feat: add new category clash rounds`
- `fix: correct knowledge duel answer`
- `style: improve scoreboard readability`
- `feat: wire new meme sticker into results screen`

## Adding Questions

All game content lives in `src/data/games.ts`.

Guidelines:

- keep questions around average IQ difficulty, not obscure trivia traps
- prefer Southeast Asia culture/history, common world history, AI, SaaS, and startup themes
- verify factual answers before adding them
- keep answer text short enough to read over screen share
- avoid ambiguous prompts unless the host has clear scoring guidance
- avoid Japanese philosophy content unless specifically requested

After editing questions:

```bash
npm run build
```

## Adding Assets

Use `ASSET_GENERATION_PLAN.md` as the source of truth for brand-compatible generated assets.

Asset rules:

- keep app text rendered in React, not baked into generated images
- do not generate fake FutureLab logos
- use the real logo asset only if an official logo is intentionally added
- keep transparent PNGs clean around the edges
- keep background assets low-detail in the center so text stays readable
- prefer `src/assets/<category>/filename.png` or `.jpg`

When wiring assets:

- import assets from the component using relative paths
- use semantic Tailwind tokens where possible
- keep decorative `alt=""` for non-informative images
- use meaningful alt text only when the image carries content

## Adding Memes

Use `MEME_ASSET_PLAN.md` before generating or wiring more memes.

Meme rules:

- memes should support game timing and reactions
- avoid copyrighted screenshots or celebrity likenesses when generating new assets
- keep meme images large enough for Google Meet and Zoom
- avoid showing too many memes at once
- prefer one strong meme per state or screen
- preserve the FutureLab bright base style

Good meme placements:

- answer reveal cards
- countdown warning states
- wrong answer penalty controls
- hard question reveals
- final results reveals

## UI Guidelines

Use the existing local shadcn-style primitives in `src/components/ui/`.

Guidelines:

- prefer existing Button, Card, Dialog, Badge, and Input components
- preserve the light FutureLab palette in `src/index.css`
- use HSL theme tokens for core colors
- avoid hardcoded dark backgrounds unless there is a specific reason
- keep controls large enough for the host to click while screen sharing
- keep text high contrast and readable from a distance

TypeScript note:

- `verbatimModuleSyntax` is enabled, so type-only imports should use `import type`

## Deployment

The app is deployed on Vercel from the GitHub repository.

Production URL:

```txt
https://fl-gamenight.vercel.app
```

Before pushing deployment-facing changes, run:

```bash
npm run build
```

## Known Notes

- `RulesModal.tsx` mentions a Pattern Blackout perfect-round bonus, but the current UI does not automate that bonus yet.

## Troubleshooting

If the game resumes in the wrong place:

- use the Reset button in the top bar
- confirm the reset modal
- this clears the saved `localStorage` game state

If images look too small on a call:

- increase their Tailwind height class in the relevant component
- verify on Google Meet or Zoom screen share, not only in the local browser

If a generated image clashes with the app:

- compare it against `ASSET_GENERATION_PLAN.md`
- avoid neon, cyberpunk, dark game-show styling, and cluttered backgrounds

## Current Status

The app is playable end-to-end with all 5 games, generated FutureLab-compatible visuals, meme reaction assets, local persistence, host-controlled scoring, rules, standings, reset confirmation, and final results.
