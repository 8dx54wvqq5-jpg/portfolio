# Hyperframes Composition Brief: AI-Assisted Dispute Intake (Cinematic)

## Objective
Create a cinematic, story-driven brag video for AI-Assisted Dispute Intake: legacy pain → the turn (label, not a number) → proof (speed) → guardrail (AI never submits).

## Output
- Composition directory: `brag-output-2026-09-16-135927/composition/`
- Rendered video: `brag-output-2026-09-16-135927/brag.mp4`
- Format: vertical — 1080x1920
- Duration: 22 seconds

## Source Material
- Project root: /Users/abhikantnirbhavane/Portfolio
- Primary file read: AI-Dispute-Intake.dc.html
- Product name: AI-Assisted Dispute Intake
- Tagline / strongest claim: "The AI never submits."
- Key UI moment to recreate: the confidence-pill row (HIGH/MEDIUM/LOW) with paired action word, and the override → Confirm interaction on the LOW pill
- Copy that must appear verbatim:
  - "Intake was manual, error-prone, and impossible to trace"
  - "A fast answer with no visible reason is an answer no one uses"
  - "A number tells you nothing. A label tells you what to do."
  - "The AI never submits."

## Creative Direction
- Tone preset: cinematic
- Creative direction: a trailer for a compliance product — drama from the stakes of a regulated decision, not spectacle. Big type, wide dark-to-light contrast at the story's turn, restrained motion that earns its scale.
- Interpretation: 5 scenes, wide shots, big type, dramatic reveals; fewer cuts than a feature-demo edit, longer holds on the thesis lines.
- Angle: this is a legacy-vs-AI story, not a feature tour. Cold open on the cost of manual intake in a high-stakes decision. Turn on the label-not-number redesign. Prove it with a real override happening fast. Close on the guardrail that makes the speed trustworthy.
- Hook: black frame, mono case-number type ticks in, then "Every dispute starts the same way."
- Outro / punchline: three held lines — "The AI proposes." / "A person decides." / "The AI never submits." — then title card.
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals (no color-wash-only scenes)
  - Redesigning the product's real UI colors/labels — reuse the actual HIGH/MEDIUM/LOW values below

## Visual Identity
- Background (legacy half, Scenes 1-2): #101828
- Background (product half, Scenes 3-5): #FFFFFF / #F1F2F5
- Accent: #155DFC
- Confidence colors (use exactly): HIGH text #047857 on bg #E7F5EF · MEDIUM text #B54708 on bg #FFFAEB · LOW text #D92D20 on bg #FEF3F2
- Text: #101828 primary / #364153 secondary / #9AA0AC muted (on light bg); off-white on dark bg
- Display font: Fraunces (headline weight, serif)
- Body/label font: Manrope; data/mono accents: JetBrains Mono (used for the case number and confidence pill labels, matching the source site)
- Visual references from the project: the confidence-pill table row, the case field labels (Dispute type / Merchant / Sub-reason code), the override → reason → Confirm flow

## Storyboard
Use the full storyboard in `brag-plan.md` as the creative contract. Scene summary:

1. The old way — 5s — case number ticks in, "Every dispute starts the same way," a simulated dense transaction log scrolls with two cursor stalls, settles on "Intake was manual, error-prone, and impossible to trace."
2. The stakes — 4s — black bg continues, "One wrong code." / "One missed signal." land one at a time, then "A fast answer with no visible reason is an answer no one uses."
3. The turn — 6s — hard cut to light bg, blue accent line draws in, "A number tells you nothing. A label tells you what to do.", then HIGH/MEDIUM/LOW pills land one by one with their real field labels, then LOW's override: reason types in, Confirm is pressed.
4. The guardrail — 4s — light bg continues, three lines held individually with real pauses: "The AI proposes." → "A person decides." → "The AI never submits."
5. Outro — 3s — title card: "AI-Assisted Dispute Intake" / "Abhikant Nirbhavane", blue accent mark.

## Audio
- Audio role: cinematic support with a low swell
- Audio arc: near-silent under Scene 1 → building swell through Scene 2 → bright lift at the Scene 2→3 cut → settled under Scene 4 → near-silent under the three thesis lines with a single low hit on the final line → resolves and fades under Scene 5
- Music: choose a dark/restrained cinematic bed from available assets; none only if genuinely unavailable
- Music treatment: start near-silent, swell into the cut, brighten at Scene 3, drop to near-silence under Scene 4's three lines, final low hit under "The AI never submits.", fade out under the title card
- Music cue guidance: no bundled preset selected by /brag — detect at composition time (`analyze_music_cues.py` or `npx hyperframes beats`). Target strong-cue locks (within ±0.15s) at: (a) the Scene 2→3 hard cut to light, (b) the LOW-pill override/Confirm moment in Scene 3, (c) the final line "The AI never submits." in Scene 4. Sequential pill reveals in Scene 3 should land on alternating beats, not every beat.
- Audio-reactive treatment: subtle — bed presence/glow may breathe slightly under held text in Scenes 1-2 and around the blue accent line in Scene 3; nothing waveform-like or flashing
- Audio-coupled moments:
  - Scene 1 cursor stalls — soft low tone per stall
  - Scene 3 pill reveals — distinct soft tick per pill, alternating-beat spacing
  - Scene 3 typed override reason — light key-tick
  - Scene 3 Confirm press — clear, distinct confirm/commit sound
- SFX selection guidance: sparse and motion-matched; nothing generic (no stock whooshes); the Confirm sound should read as a real commit, not a UI chime
- SFX analysis guidance: use `skills/brag/assets/sfx/sfx-analysis.md` if present; prefer low high-frequency-risk sounds for the repeated pill-tick moments
- Exact SFX choice: Hyperframes selects filenames, timestamps, density, and volume based on the implemented animation
- Audio files: copy chosen music (and any Hyperframes-selected SFX) into `composition/assets/`

## Hyperframes Instructions
Load `hyperframes-core`, `hyperframes-animation`, `hyperframes-creative`, `hyperframes-keyframes`, `hyperframes-cli`. /brag is its own workflow — do not enter the generic `hyperframes` intent interview or promo/launch-video routing. Prefer native Hyperframes conventions over anything hardcoded in `/brag`.

Requirements:
- Show the real confidence-pill UI and copy listed above — verbatim lines must appear on screen.
- Keep all text readable: short lines ~0.8s settled minimum, sentences ~0.3s/word minimum, per the reading-time floor in `step-2-plan.md`.
- Total duration 15-25s (target 22s across 5 scenes as scoped above).
- Include the music/SFX layer as scoped; skip audio-reactive only if extraction is genuinely unavailable, and document why.
- Beat-lock 1-3 major moments to strong cues (±0.15s); snap sequential pill reveals to alternating beats (±0.10s) or use natural timing if beat sync would rush the reads — mark either choice inline.
- Run `hyperframes check` before render — this is brag's single gate.
