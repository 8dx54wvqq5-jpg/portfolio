# Brag Plan: AI-Assisted Dispute Intake

## What is this app?
A Fiserv case study/product where AI pre-fills card dispute fields from a cardholder's own words, but a human agent verifies or overrides every field before anything is submitted — the AI proposes, it never disposes.

## The angle
The AI never submits. Show the actual guided demo: the AI flags a LOW-confidence field (guessing between two dispute reason codes), the agent overrides it, has to type a reason to save the correction, then presses Confirm — the one moment anything is committed. The punchline is the design principle stated as fact, not a slogan.

## Hook (first 2-3 seconds)
Full-bleed LOW confidence chip (red dot, "LOW" mono label) slams in with "Manual review recommended" beneath it. Cut immediately to the raw score "raw · 0.38" fading to gray — the number that used to be the whole answer, now demoted to a footnote.

## Key moments (the middle)
- The three-tier confidence system: HIGH (green, "Review and accept") → MEDIUM (amber, "Verify before continuing") → LOW (red, "Manual review recommended"), each with its evidence line and de-emphasized raw score.
- The override: agent taps the LOW field, picks the correct code (12.6.1, duplicate processing), and a reason field appears and must be filled before saving.
- The Confirm button — highlighted as the singular act of commitment in the whole flow.

## Outro / punchline
Big serif line: "The AI never submits." Beat. Smaller mono line underneath: "It proposes. A person decides." Logo mark (blue "A" square) holds on last frame.

## User flow worth showing
1. Entry: AI has pre-filled a dispute case; one field shows LOW confidence with a red dot.
2. Key action: agent presses Override, selects the correct code, types a one-line reason, saves.
3. Result: agent presses Confirm — the only commit action in the workflow — and the correction logs to the audit trail.

## Tone
- Preset: polished
- Creative direction: quiet, confident fintech product film — restraint over spectacle, real UI over metaphor
- Interpretation: fewer scenes (3-4), longer holds, soft crossfades, no comic timing or chaotic cuts. Confidence is communicated through calm pacing, not loud motion.

## Format: vertical — 1080x1920
## Duration: 19s target

## Visual identity (from the project)
- Background: #FFFFFF (cards on #FBFCFE panel)
- Accent: #155DFC (brand blue), tint #EFF6FF / border #D6E4FF
- Text: #101828 (primary), #4A5565 / #6A7282 (secondary), #9AA0AC (muted labels)
- Confidence colors: HIGH #009966 on #E7F5EF · MEDIUM #B54708 on #FFFAEB · LOW #D92D20 on #FEF3F2
- Display font: Fraunces (serif, headlines)
- Body font: Manrope
- Mono font: JetBrains Mono (labels, data, evidence tags)
- Strongest visual element: the three-tier HIGH/MEDIUM/LOW confidence card row with color-coded status dots and de-emphasized raw scores

## Share copy (draft)
Replaced "85% confident" with a label and a next step — and made sure the AI still can't be the one who hits submit.

## Audio direction
- Role: sparse professional accents, restrained
- Music: warm, low, minimal corporate bed — soft piano/pad, no percussion drive
- Music treatment: starts under the hook at low volume, holds flat through the middle, single gentle swell into the outro line, fades out over the last second
- Music cue guidance: no bundled track picked yet — detect cues at composition time via `npx hyperframes beats`; target 2 strong cues: (1) LOW chip hook hit at 0:00, (2) Confirm button press near 0:14. No dense beat-grid needed given low scene count.
- Audio-reactive treatment: none — polished restraint, no waveform/glow reactivity
- SFX posture: sparse; one soft UI-tap on Override, one distinct "save" click, one slightly heavier "confirm" click/chime to mark it as the commit moment
- Audio-coupled moments: reason field typing (soft key ticks, 2-3 characters worth, not full typing), Confirm button press (single clear click/chime)
- Restraint rule: no music drops, no glitch/whoosh transitions, no beat-synced text confetti — this is a compliance product, not a game

## Storyboard

### Scene 1 — The flag — 4s
LOW confidence card fills the frame: red dot + "LOW" label, "Manual review recommended," evidence line "The description supports more than one dispute type." Raw score "raw · 0.38" sits small and gray at the bottom, visibly de-emphasized.
Sequential/interaction: none — one full card, settled
Audio intent: quiet, slightly tense hold — this is the moment before a decision
Audio-coupled idea: none
Music: low bed starts under this scene
Transition mood: soft crossfade → Scene 2

### Scene 2 — Override and log the reason — 6s
Cut to the intake field: agent taps "Override," a code picker appears, "12.6.1 · Duplicate processing" is selected, then a reason input appears and fills with a short logged reason. Small mono caption beneath: "Overrides require a reason. That's evidence."
Sequential/interaction: yes — code select, then reason field appears and fills, in sequence (not simultaneous)
Audio intent: focused, deliberate — each step lands with a small confirming sound
Audio-coupled idea: soft key-tick sounds as the reason fills; one light tap sound on code selection
Transition mood: clean cut → Scene 3

### Scene 3 — Confirm — 5s
The Confirm button is isolated and highlighted (only element with full color/weight on screen). Cursor presses it. Small mono line appears beside it: "The only moment anything is committed." Card edge briefly picks up the accent blue to mark the commit.
Sequential/interaction: yes — simulated button press
Audio intent: the release — this is the payoff beat, slightly warmer than scenes 1-2
Audio-coupled idea: single clear confirm click/chime timed to the press; small music swell starts here
Transition mood: soft crossfade → Scene 4

### Scene 4 — Punchline / outro — 4s
Full-bleed serif line "The AI never submits." on white, small mono line beneath "It proposes. A person decides." Blue "A" logo mark settles bottom-center on hold.
Sequential/interaction: none
Audio intent: settled, confident close
Audio-coupled idea: none
Music: swell resolves, fades out over final second
Transition mood: hold → end

**Music mood for this video:** quiet, restrained, confident corporate — no drums, no build-drop structure
**Audio summary:** A low, warm bed sits under all four scenes with two sparse UI-matched SFX (code select, reason typing ticks) and one clear confirm chime at the payoff beat, swelling gently into the punchline and fading out on hold.
