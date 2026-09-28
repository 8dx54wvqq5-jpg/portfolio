# Hyperframes Composition Brief: AI-Assisted Dispute Intake

## Objective
Create a short launch-style brag video for the AI-Assisted Dispute Intake case study (Fiserv card dispute product).

## Output
- Composition directory: `composition/`
- Rendered video: `brag.mp4`
- Format: vertical — 1080x1920
- Duration: 19 seconds

## Source Material
- Project root: /Users/abhikantnirbhavane/Portfolio
- Primary file read: AI-Dispute-Intake.dc.html (full file)
- Product name: AI-Assisted Dispute Intake
- Tagline / strongest claim: "A number tells you nothing. A label tells you what to do."
- Key UI moment to recreate: the three-tier confidence card system (HIGH/MEDIUM/LOW, color-coded status dot + headline + evidence + de-emphasized raw score) and the override → reason → confirm flow.
- Copy that must appear verbatim:
  - "LOW" / "Manual review recommended" / "The description supports more than one dispute type." / "raw · 0.38"
  - "12.6.1 · Duplicate processing"
  - "Overrides require a reason. That's evidence."
  - "The only moment anything is committed."
  - "The AI never submits."
  - "It proposes. A person decides."

## Creative Direction
- Tone preset: polished
- Creative direction: quiet, confident fintech product film — restraint over spectacle, real UI over metaphor
- Interpretation: 4 scenes, longer holds, soft crossfades/clean cuts only, no comic timing or chaotic cuts
- Angle: The AI never submits. Show the guided demo: a LOW-confidence field gets overridden with a logged reason, then the human presses Confirm — the one commit action in the flow.
- Hook: LOW confidence card fills frame — red dot, "LOW", "Manual review recommended" — with the raw score "raw · 0.38" small and gray beneath.
- Outro / punchline: "The AI never submits." / "It proposes. A person decides."
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals
  - Unrelated visual redesign — use the project's real card/chip/label styling

## Visual Identity
- Background: #FFFFFF (panel #FBFCFE)
- Text: #101828 primary, #4A5565 / #6A7282 secondary, #9AA0AC muted mono labels
- Accent: #155DFC, tint #EFF6FF, border #D6E4FF
- Confidence colors: HIGH #009966 on #E7F5EF · MEDIUM #B54708 on #FFFAEB · LOW #D92D20 on #FEF3F2
- Display font: Fraunces (serif headlines) — Google Fonts: `Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700`
- Body font: Manrope — Google Fonts: `Manrope:wght@400;500;600;700;800`
- Mono font: JetBrains Mono — Google Fonts: `JetBrains+Mono:wght@400;500;600`
- Visual references from the project: the LOW confidence card (red dot + label + evidence + raw score), the blue square "A" logo mark, the mono status-chip styling used throughout

## Storyboard
Use the storyboard in `brag-plan.md` as the creative contract.

Scene summary:
1. The flag — 4s — LOW confidence card, full-bleed, settled read
2. Override and log the reason — 6s — code select → reason field fills, sequential
3. Confirm — 5s — isolated Confirm button, simulated press, "only moment anything is committed"
4. Punchline / outro — 4s — "The AI never submits." + "It proposes. A person decides." + logo mark hold

## Audio
- Audio role: sparse professional accents over a restrained music bed
- Audio arc: low flat bed under scenes 1-2, single UI SFX on the override/reason beats, gentle swell starting into scene 3 with a distinct confirm chime, resolve and fade through scene 4
- Music: `assets/music/happy-beats-business-moves-vol-12-by-ende-dot-app.mp3` (already copied into composition/assets/music/)
- Music treatment: start at 0.0 at volume ~0.28, hold flat through scene 2, gentle swell into scene 3's confirm beat, fade to ~0.15 by the final second
- Music cue guidance: bundled preset at `assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.json` (109.96 BPM). Beat grid available for scenes 0-19s. Nearest beat-grid points to scene cuts: ~3.82s (near scene 1→2 cut at 4.00s), ~9.83s (near scene 2→3 cut at 10.00s), ~14.73s (near scene 3→4 cut at 15.00s). No strong cue lands close enough to the Confirm press (~13-14s) to lock within ±0.15s — use natural timing for that beat, tone-restraint takes priority over forcing a lock.
- Audio-reactive treatment: none — polished restraint, no glow/reactivity, no waveform
- Audio-coupled moments:
  - Scene 2, reason field fill — soft key-tick texture (2-3 ticks, not full typing), low volume
  - Scene 2, code selection — one light UI tap (`assets/sfx/ui/click1.ogg` or `assets/sfx/interface/click_002.ogg`, pick one)
  - Scene 3, Confirm press — one clear, slightly warmer confirm sound (`assets/sfx/interface/drop_002.ogg` or similar available soft/medium impact — choose the best-fitting file already available in the shared SFX library; avoid anything aggressive)
- SFX selection guidance: minimal — 2-3 total cues across the whole video, all soft/precise, nothing that reads as celebratory or chaotic. This is a compliance product.
- SFX analysis guidance: prefer low/medium high-frequency-risk files per `~/.claude/skills/brag/assets/sfx/sfx-analysis.md` if present, since these are repeated/polished moments, not accents.
- Exact SFX choice: Hyperframes should pick final filenames/timestamps/volumes based on the implemented animation; interface/ui click + drop files are already copied into `composition/assets/sfx/` as candidates.
- Audio files: music and candidate SFX already copied into `composition/assets/music/` and `composition/assets/sfx/`.

## Hyperframes Instructions
Load `hyperframes-core`, `hyperframes-animation`, `hyperframes-creative`, `hyperframes-keyframes`, `hyperframes-cli`. This is /brag's own workflow — do not enter the generic hyperframes intent interview.

Requirements:
- Show the real UI/copy above (confidence card system + override/confirm flow), styled with the project's actual colors, fonts, and card conventions.
- Keep all text readable in the final render (JetBrains Mono at small sizes needs contrast checked).
- Keep total duration 15-25s (target 19s).
- Include the planned music bed and the 2-3 planned SFX cues at restrained volumes (music ~0.28, SFX ~0.5-0.65, softer given `polished` tone).
- Treat the beat-grid points above as soft hints only — do not force scene cuts off natural pacing/readability for this tone.
- Run `npx hyperframes check` before render — the single gate.
