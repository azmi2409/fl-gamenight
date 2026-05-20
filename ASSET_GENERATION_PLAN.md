# Asset Generation Plan — FutureLab Brain Battle

This plan defines the assets to generate with GPT Image / Nano Banana for the FL Brain Battle app, aligned with the public FutureLab brand direction at `futurelab.my`.

The app should feel like a FutureLab team-learning experience: polished, structured, smart, friendly, and mentorship-driven. It should not feel like a generic neon arcade game.

## Brand Direction From FutureLab

Observed FutureLab cues from the public site:

- Positioning: structured mentorship, future leaders, career growth, learning, organizations, Southeast Asia.
- Tone: professional, optimistic, credible, approachable.
- Visual language: clean platform UI, rounded shapes, bright whitespace, soft illustrations, circle motifs, people/network/growth metaphors.
- Best asset mood: "smart team learning night" rather than "dark esports quiz battle".

## Visual Direction

Use one consistent visual system across all generated assets.

Style keywords:

- FutureLab-branded team quiz night
- Structured mentorship meets playful competition
- Clean SaaS platform illustration
- Southeast Asian professional learning community
- Friendly, bright, polished, high-trust
- Rounded geometric shapes and circle motifs
- Subtle network lines, mentor/mentee nodes, growth paths
- Crisp 3D/vector hybrid illustration
- Readable at 1080p over Zoom

Palette guidance:

- Base: warm white, soft off-white, light blue-gray
- Primary: FutureLab-style blue / blue-teal
- Secondary: fresh green / mint
- Accent: warm coral / orange for energy
- Dark text: deep navy
- Celebration: teal, green, yellow, coral confetti

Avoid:

- Generic purple neon
- Heavy cyberpunk
- Casino/game-show clutter
- Dark horror lighting
- Fake brand logos
- Overly childish clipart
- Random AI-generated typography

## Brand Usage Rules

- Do not ask the image model to recreate the official FutureLab logo from memory.
- If the actual FutureLab logo is needed, use the real logo asset from brand/source files, not generated artwork.
- Generated assets should be "FutureLab-compatible", not counterfeit FutureLab branding.
- App text, scores, questions, timers, and names should remain rendered in React, not baked into images.
- Only the wordmark/social preview prompts should include exact text.

## Recommended Folder Structure

```txt
src/assets/brand/
src/assets/backgrounds/
src/assets/games/
src/assets/stickers/
src/assets/results/
src/assets/social/
```

## Asset Checklist

| # | Asset | Filename | Size | Format | Usage |
|---|-------|----------|------|--------|-------|
| 1 | App logo mark | `src/assets/brand/brain-battle-mark.png` | 1024x1024 | PNG transparent | Setup screen, favicon source |
| 2 | Wordmark | `src/assets/brand/brain-battle-wordmark.png` | 2400x800 | PNG transparent | Setup screen hero |
| 3 | Main background | `src/assets/backgrounds/main-stage-bg.png` | 1920x1080 | PNG/JPG | Global app backdrop |
| 4 | Pattern overlay | `src/assets/backgrounds/subtle-grid-overlay.png` | 1920x1080 | PNG transparent | Low-opacity background texture |
| 5 | Game 1 splash | `src/assets/games/pattern-breaker-splash.png` | 1920x1080 | PNG/JPG | Transition screen |
| 6 | Game 2 splash | `src/assets/games/category-clash-splash.png` | 1920x1080 | PNG/JPG | Transition screen |
| 7 | Game 3 splash | `src/assets/games/missing-link-splash.png` | 1920x1080 | PNG/JPG | Transition screen |
| 8 | Game 4 splash | `src/assets/games/knowledge-duel-splash.png` | 1920x1080 | PNG/JPG | Transition screen |
| 9 | Game 5 splash | `src/assets/games/pattern-blackout-splash.png` | 1920x1080 | PNG/JPG | Transition screen |
| 10 | Host mascot | `src/assets/stickers/host-mascot.png` | 1024x1024 | PNG transparent | Setup/rules helper |
| 11 | Score burst sticker | `src/assets/stickers/score-burst.png` | 1024x1024 | PNG transparent | Score animation decoration |
| 12 | Wrong answer sticker | `src/assets/stickers/wrong-buzzer.png` | 1024x1024 | PNG transparent | Wrong answer feedback |
| 13 | Timer warning sticker | `src/assets/stickers/timer-panic.png` | 1024x1024 | PNG transparent | Category Clash countdown |
| 14 | Leader badge | `src/assets/stickers/leader-crown.png` | 1024x1024 | PNG transparent | Scoreboard leader state |
| 15 | Final podium art | `src/assets/results/final-podium-stage.png` | 1920x1080 | PNG/JPG | Results screen backdrop |
| 16 | Last place badge | `src/assets/results/one-brain-cell-badge.png` | 1024x1024 | PNG transparent | Funny final result badge |
| 17 | Confetti overlay | `src/assets/results/confetti-overlay.png` | 1920x1080 | PNG transparent | Results reveal effect |
| 18 | Social preview | `src/assets/social/og-image.png` | 1200x630 | PNG/JPG | Open graph / sharing image |

## Master Prompt Template

Use this base in every prompt unless the individual prompt overrides it:

```txt
Create a polished visual asset for FutureLab Brain Battle, a team quiz and learning game for a professional mentoring/community platform. Align the style with FutureLab's public brand direction: clean SaaS platform illustration, structured mentorship, future leaders, career growth, Southeast Asian professional community, friendly and credible. Use warm white and soft blue-gray space, FutureLab-style blue/teal accents, fresh green/mint accents, and a small coral/orange energy accent. Rounded shapes, circle motifs, subtle network lines, growth paths, mentor/mentee node metaphors, clean vector/3D hybrid rendering. High contrast and readable at 1080p on Zoom. Avoid neon cyberpunk, casino game-show clutter, fake logos, celebrity likenesses, copyrighted characters, and messy AI text. No text unless explicitly requested.
```

## Negative Prompt

```txt
No generic neon purple, no cyberpunk city, no casino stage, no dark horror mood, no messy typography, no illegible text, no random letters, no fake logos, no real company logos, no celebrity likenesses, no copyrighted characters, no stock-photo people, no childish clipart, no cluttered UI panels, no blurry details, no low-resolution rendering.
```

## Prompts

### 1. App Logo Mark

Filename: `src/assets/brand/brain-battle-mark.png`

Size: `1024x1024`

Format: transparent PNG

Prompt:

```txt
Create a transparent PNG logo mark for FutureLab Brain Battle. Combine a stylized brain, a mentorship/growth spark, and connected circle nodes into one clean icon. The icon should feel compatible with a professional mentoring platform: optimistic, modern, rounded, credible, playful but not childish. Use FutureLab-style blue/teal, fresh green/mint, and a small coral/orange accent. No words, no letters, no background, no fake logo recreation.
```

### 2. Wordmark

Filename: `src/assets/brand/brain-battle-wordmark.png`

Size: `2400x800`

Format: transparent PNG

Prompt:

```txt
Create a transparent PNG wordmark that says exactly "FL BRAIN BATTLE". Style should be clean, modern, rounded, and compatible with FutureLab's professional mentoring-platform brand. Use deep navy lettering with blue/teal and green accent details, plus a small coral/orange energy mark. It should feel like a smart internal team-learning event, not an esports logo. Keep typography accurate and highly legible. No extra words, no background, no mascot.
```

### 3. Main Background

Filename: `src/assets/backgrounds/main-stage-bg.png`

Size: `1920x1080`

Format: PNG or JPG

Prompt:

```txt
Create a 16:9 background for a FutureLab-branded team quiz app. Clean light SaaS-style composition with soft off-white and pale blue-gray base, rounded abstract circles, subtle mentor/mentee network lines, growth-path arcs, and small teal/green/coral accents. Leave a calm, low-detail center area for app cards and text. Friendly, professional, optimistic, polished. No words, no people, no logos, no clutter.
```

### 4. Pattern Overlay

Filename: `src/assets/backgrounds/subtle-grid-overlay.png`

Size: `1920x1080`

Format: transparent PNG

Prompt:

```txt
Create a transparent PNG overlay texture for a FutureLab-style learning game UI. Very subtle rounded grid, dotted mentor-network nodes, small circles, and gentle growth-line paths. Use very low-opacity blue/teal/green/coral accents so it does not reduce text readability. No text, no icons, no heavy glow, no center focal point.
```

### 5. Pattern Breaker Splash

Filename: `src/assets/games/pattern-breaker-splash.png`

Size: `1920x1080`

Format: PNG or JPG

Prompt:

```txt
Create a 16:9 splash illustration for a pattern-recognition round in FutureLab Brain Battle. Visuals: clean number sequences, connected nodes, color tiles, and puzzle paths arranged like a structured learning framework. Use light SaaS background, blue/teal/green accents, small coral/orange energy highlights, rounded shapes, and clear center negative space for app-rendered title. No words, no logos, no clutter.
```

### 6. Category Clash Splash

Filename: `src/assets/games/category-clash-splash.png`

Size: `1920x1080`

Format: PNG or JPG

Prompt:

```txt
Create a 16:9 splash illustration for a fast category-naming team game. Visuals: clean answer cards, a friendly countdown timer, duplicate cards gently colliding/cancelling, and team-learning energy. FutureLab-compatible style: bright, rounded, professional, blue/teal/green/coral accents, soft off-white background. Leave center negative space for app-rendered title. No readable text, no logos, no casino/game-show clutter.
```

### 7. Missing Link Splash

Filename: `src/assets/games/missing-link-splash.png`

Size: `1920x1080`

Format: PNG or JPG

Prompt:

```txt
Create a 16:9 splash illustration for a connection/lateral-thinking round. Visuals: three rounded cards connected by mentorship-style network lines into a central hidden insight node. One card can be a question-mark silhouette. Clean FutureLab-style platform illustration, soft off-white background, blue/teal/green accents, small coral/orange highlight. No words, no logos, no clutter.
```

### 8. Knowledge Duel Splash

Filename: `src/assets/games/knowledge-duel-splash.png`

Size: `1920x1080`

Format: PNG or JPG

Prompt:

```txt
Create a 16:9 splash illustration for a competitive knowledge round in a professional team-learning game. Visuals: two friendly quiz buzzers, learning cards, world-history map fragments, startup-growth chart shapes, and AI node diagrams. FutureLab-compatible clean SaaS illustration style, blue/teal/green palette with coral/orange energy accents, bright and credible. Leave center space for app-rendered title. No readable text, no real logos, no people.
```

### 9. Pattern Blackout Splash

Filename: `src/assets/games/pattern-blackout-splash.png`

Size: `1920x1080`

Format: PNG or JPG

Prompt:

```txt
Create a 16:9 splash illustration for a visual memory-grid round. Visuals: clean 4x4 rounded grid, some tiles fading softly, memory flash effect, subtle lightning/spark energy. FutureLab-compatible bright learning-platform style, off-white and pale blue-gray background, blue/teal/green/coral accents. Keep it fun but professional. Leave center space for app text. No words, no logos.
```

### 10. Host Mascot

Filename: `src/assets/stickers/host-mascot.png`

Size: `1024x1024`

Format: transparent PNG

Prompt:

```txt
Create a transparent PNG mascot for FutureLab Brain Battle: a friendly learning-lab host character inspired by a brain/lightbulb/mentor concept, holding a small quiz card or buzzer. It should feel professional, warm, and clever, suitable for a mentoring and career-growth brand. Rounded 3D/vector hybrid, blue/teal/green accents with a small coral/orange detail. No words, no background, no copyrighted references.
```

### 11. Score Burst Sticker

Filename: `src/assets/stickers/score-burst.png`

Size: `1024x1024`

Format: transparent PNG

Prompt:

```txt
Create a transparent PNG sticker for positive score gain in a FutureLab team quiz game. Visual: clean celebratory burst with teal, green, yellow, and coral shapes; small stars, circles, and growth-arrow motifs. Friendly professional sticker style, crisp edges. No text, no numbers, no background.
```

### 12. Wrong Buzzer Sticker

Filename: `src/assets/stickers/wrong-buzzer.png`

Size: `1024x1024`

Format: transparent PNG

Prompt:

```txt
Create a transparent PNG sticker for wrong-answer feedback. Visual: friendly red/coral buzzer with soft impact lines and rounded shapes, playful but not harsh. FutureLab-compatible clean illustration style with teal/blue supporting accents. No text, no letters, no background, not scary.
```

### 13. Timer Warning Sticker

Filename: `src/assets/stickers/timer-panic.png`

Size: `1024x1024`

Format: transparent PNG

Prompt:

```txt
Create a transparent PNG sticker for countdown warning in a team quiz app. Visual: rounded stopwatch/timer with coral/red urgency ring, teal and green supporting accents, small motion marks, friendly professional energy. No text, no numbers, no background.
```

### 14. Leader Badge

Filename: `src/assets/stickers/leader-crown.png`

Size: `1024x1024`

Format: transparent PNG

Prompt:

```txt
Create a transparent PNG leader badge for a FutureLab-style quiz scoreboard. Visual: polished crown or achievement badge made of rounded shapes, blue/teal base, green highlight, small yellow/coral celebration accents. Clean, modern, friendly, readable at small size. No text, no background.
```

### 15. Final Podium Stage

Filename: `src/assets/results/final-podium-stage.png`

Size: `1920x1080`

Format: PNG or JPG

Prompt:

```txt
Create a 16:9 final results background for FutureLab Brain Battle. Visual: clean rounded podium, soft spotlights, confetti, learning-community celebration, mentor-network circles in the background. Use off-white/pale blue-gray base, blue/teal/green accents, coral/yellow celebration details. Leave clear space above podium for app-rendered names and scores. No text, no logos, no people.
```

### 16. One Brain Cell Badge

Filename: `src/assets/results/one-brain-cell-badge.png`

Size: `1024x1024`

Format: transparent PNG

Prompt:

```txt
Create a transparent PNG funny last-place badge for a friendly team quiz game. Visual: one tiny cheerful brain cell with a small learning flag, kind and playful, not insulting. FutureLab-compatible sticker style, rounded shapes, teal/green/coral accents, clean edges. No text, no background.
```

### 17. Confetti Overlay

Filename: `src/assets/results/confetti-overlay.png`

Size: `1920x1080`

Format: transparent PNG

Prompt:

```txt
Create a transparent PNG confetti overlay for a FutureLab-style results screen. Confetti pieces in teal, green, yellow, coral, and soft blue. Denser near top edges, sparse in the center so text stays readable. Clean rounded paper shapes and small circles. No text, no background, no heavy blur.
```

### 18. Social Preview Image

Filename: `src/assets/social/og-image.png`

Size: `1200x630`

Format: PNG or JPG

Prompt:

```txt
Create a polished social preview image for FutureLab Brain Battle, a FutureLab-compatible team quiz and learning game. Clean SaaS-style event hero design with soft off-white background, blue/teal/green circles, mentorship network lines, quiz cards, buzzers, and subtle celebration confetti. Include exact readable text: "FL BRAIN BATTLE" and smaller text: "Team Learning Game Night". Professional, friendly, high contrast, no fake FutureLab logo, no real brand logos, no copyrighted characters.
```

## Implementation Plan

1. Generate brand assets first: logo mark, wordmark, social preview.
2. Generate the global background and subtle overlay.
3. Generate the five game splash images using the same FutureLab-compatible palette.
4. Generate stickers for feedback states: score burst, wrong buzzer, timer warning, leader badge, last-place badge.
5. Add assets into `src/assets/...` using the filenames above.
6. Update components incrementally:
   - Setup screen: wordmark + mascot
   - App shell: main background + subtle overlay
   - Game transition: per-game splash image
   - Scoreboard: leader badge / score burst
   - Results screen: podium background + confetti + one-brain-cell badge
7. Keep generated imagery decorative. App text, scores, timers, and questions stay rendered in React for accessibility and reliability.
8. After adding assets, run:

```bash
npm run build
```

## Quality Checklist

- Feels like FutureLab: professional, optimistic, mentorship/career-growth oriented.
- Consistent bright SaaS/event palette across all assets.
- No generic neon arcade/cyberpunk styling.
- No fake FutureLab logo generation.
- No unreadable AI-generated text except approved wordmark/social preview.
- Assets do not compete with question text.
- Transparent PNGs have clean edges.
- Splash screens leave center negative space.
- No real brand logos, celebrities, or copyrighted characters.
- Works at 1920x1080 and remains readable over Zoom.
