# Brand — The Mbugua Effect (Kenyan History · Vox Collage Track)

> Style contract for **The Mbugua Effect** TikTok channel. Every video built in this workspace
> reads this file so all episodes share one unmistakable documentary look, voice, and pacing.

## 1. Channel Identity & Audience

- **Channel:** **The Mbugua Effect** (TikTok)
- **Niche:** Kenyan history — untold stories, pivotal turning points, political mysteries, and the
  people who shaped modern Kenya.
- **Audience:** 86% aged **18–34** (53.1% 18–24 · 32.9% 25–34). Smart, mobile-first viewers who
  expect tight hooks, fast narrative momentum, and authoritative storytelling without textbook stiffness.
- **Language & Voice:** English. Warm, authoritative, and enthusiastic — narrator-led documentary
  energy (using the creator's own voiceover recordings by default).
- **Primary Track:** **Vox-style layered paper collage** (`/make-vox` · `remotion/src/lib/collage.tsx`).

## 2. Classic Vox Historical Palette (exact hex)

Kept faithful to the classic Vox archival aesthetic (`remotion/src/lib/collage.tsx` `VOX` tokens):

| Role | Name | Hex | Use in video |
|---|---|---|---|
| **Board surface** | paper | `#efe6d3` | warm kraft/parchment backdrop (`paper.png`) |
| Board shadow | paperDeep | `#e0d2b8` | vignette edges, secondary paper depth |
| **Primary ink** | ink | `#282217` | headlines, body text, strong archival contrast |
| Soft ink | inkSoft | `#544a3a` | captions, kickers, archival dates |
| **Drama / Alert** | red | `#c0392b` | rubber stamps, map pins, dashed routes, danger/turning points |
| **Highlight sweep** | yellow | `#e8b73a` | marker-highlight sweeps behind keywords, emphasis pops |
| **Archival accent** | teal | `#33695d` | secondary place chips, institutional/historical context |
| **Paper strip / sticker** | cream | `#faf5ea` | cutout sticker outlines, backing strips behind serif statements, photo borders |

## 3. Typography

- **Editorial Headlines:** **Source Serif 4** (weight 700, `FONT_EDITORIAL`) — classic Vox/Publico
  newspaper authority.
- **Chips, Dates, & Captions:** **Inter** (weight 500/600/700, `FONT_BODY`) + **Space Grotesk**
  (`FONT_DISPLAY`) for high-legibility emphasis captions.
- **Contrast rule (locked):** Any headline or caption placed over a busy archival photo or map MUST
  sit on a cream backing strip (`VOX.cream`) or warm dark archival ink plate (`rgba(40,34,23,0.92)`).
  Never float bare ink over sepia photography.

## 4. Visual Craft & Motion Language

- **Paper world:** Nothing is pure `#000` or `#fff`. Every frame sits on textured paper with subtle
  animated film grain (`Grain opacity={0.055}`).
- **Physical collage:** Archival photos get sepia/mono treatment, cream borders, tape strips, and
  slight hand-placed rotation (`ArchivalPhoto`). Props are die-cut stickers with cream outlines and
  soft drop shadows (`Cutout`).
- **Camera choreography:** One continuous `CollageBoard` across scene boundaries — slow push on the
  hook, map dives, pans across dossiers, and a pull-back to frame-0 composition for seamless loops.
- **Parallax & breathing:** Every layer carries `depth` (`-0.06` paper, `0–0.05` scenery, `0.08–0.15`
  foreground props) and subtle idle drift so no frame ever feels frozen.

## 5. Captions — Context-Synced & Keyword-Emphasized (TikTok Safe Zone)

- **Format:** Short 2–5 word phrases synced directly to real spoken word timestamps from the
  voiceover audio.
- **Keyword emphasis:** Historically significant names, dates, numbers, and tension words highlight
  with a **Vox yellow marker highlight (`#e8b73a`)** or **crimson punch (`#c0392b`)** on a warm
  editorial ink pill (`#282217`) so they remain razor-sharp on small phone screens.
- **TikTok Safe Zone (1080×1920 @ 30fps):**
  - Keep captions centered at **`y ≈ 1340–1400`** (safely above TikTok's bottom 480px caption/audio
    bar) and inset from the right **160px** (like/comment/share rail) and top **150px**.
  - Frame 0 must be fully composed (no fade-from-black) so it doubles as the TikTok cover.

## 6. Sound Design & Music

- **SFX (editorial, felt-not-heard):** Paper page turns (`page-flip`), soft thuds on cutouts landing
  (`impact-soft`), rubber stamp slams on turning points (`stamp-hit`), subtle camera-move air
  (`whoosh-soft` / `whoosh-wind`), tension swells (`riser-soft`), and pencil route scribbles
  (`pencil-scribble`). Always tucked cleanly under the creator's narration.
- **Music beds:** Sparse, documentary-appropriate underscore (`cinematic-min` for serious political
  mysteries/assassinations; `docu-pluck` for curious historical explainers), ducked smoothly under
  the narrator voice.
