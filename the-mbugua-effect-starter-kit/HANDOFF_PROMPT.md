# The Mbugua Effect — New Chat Handoff Prompt

Upload **`the-mbugua-effect-starter-kit.zip`** (plus your new episode's script and voiceover audio) into a new chat, then paste the prompt below:

---

```text
I'm continuing my Kenyan history TikTok channel **The Mbugua Effect** using the Vox-style layered-collage pipeline from https://github.com/hassancs91/claude-faceless-shorts-creator.

Please:
1. Clone https://github.com/hassancs91/claude-faceless-shorts-creator, install Remotion + ffmpeg + playwright/chromium + faster-whisper + rembg (using lightweight u2net_human_seg in /tmp so we stay within RAM limits).
2. Unzip my attached `the-mbugua-effect-starter-kit.zip` on top of the workspace — it contains my customized `brand.md`, `remotion/src/lib/collage.tsx` (with my TikTok-safe `VoxCaptions` component), my Episode 1 template (`Vox2Mboya.tsx` + `sfx-plan.json`), reusable paper/grain/Kenya-map layers, and my `preview-studio/server.mjs` live player.
3. Follow `brand.md` strictly:
   - Classic Vox archival documentary look (warm paper, sepia photos, die-cut stickers, rubber stamps, dashed arrows, subtle grain)
   - Source real archival photos from the web for real historical Kenyan figures and cut them out cleanly with `rembg`
   - Sync all visuals & context-synced, keyword-emphasized `VoxCaptions` (TikTok safe zone y=1435, right inset 148px) to real word-level timestamps from my attached voiceover
   - Mix editorial Vox SFX + subtle ducked documentary underscore (`cinematic-min` for serious/mystery episodes, `docu-pluck` for explainers)
   - Render at 1080×1920 @ 30fps (use disk-backed TMPDIR and chunked `--concurrency=1` so Chromium stays within RAM limits), optimize to ~5.5 Mbps H.264 `+faststart`, and spin up `preview-studio/server.mjs` for Live Preview + download.

Here is my next episode script and voiceover:
[PASTE SCRIPT + ATTACH OR LINK VO HERE]
```
