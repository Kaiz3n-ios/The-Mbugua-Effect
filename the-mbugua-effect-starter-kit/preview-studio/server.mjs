import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const PORT = 3000;
const VIDEO_PATH = '/home/user/claude-faceless-shorts-creator/vox-shorts/vox-2-mboya/output/the-mbugua-effect-ep1-tom-mboya.mp4';
const DOWNLOAD_NAME = 'the-mbugua-effect-ep1-tom-mboya.mp4';

const HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>The Mbugua Effect — Live Studio Preview</title>
<style>
  :root {
    --paper: #efe6d3;
    --cream: #faf5ea;
    --ink: #282217;
    --ink-soft: #544a3a;
    --red: #c0392b;
    --yellow: #e8b73a;
    --teal: #33695d;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #1a1611;
    color: var(--cream);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 16px 36px;
  }
  .wrap {
    width: 100%;
    max-width: 1020px;
    display: grid;
    grid-template-columns: minmax(290px, 380px) 1fr;
    gap: 28px;
    align-items: start;
  }
  @media (max-width: 780px) {
    .wrap { grid-template-columns: 1fr; justify-items: center; }
  }
  .phone-shell {
    position: relative;
    width: 100%;
    max-width: 380px;
    aspect-ratio: 9 / 16;
    background: #000;
    border-radius: 26px;
    overflow: hidden;
    box-shadow: 0 24px 60px rgba(0,0,0,0.55), 0 0 0 2px rgba(250,245,234,0.14);
  }
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    background: #000;
  }
  .safe-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    display: none;
  }
  .safe-overlay.on { display: block; }
  .safe-top {
    position: absolute; top: 0; left: 0; right: 0; height: 7.8%;
    background: rgba(192, 57, 43, 0.28);
    border-bottom: 1px dashed rgba(255,255,255,0.6);
    font-size: 10px; padding: 4px 10px; color: #fff;
  }
  .safe-right {
    position: absolute; top: 38%; right: 0; width: 14.8%; bottom: 23%;
    background: rgba(192, 57, 43, 0.28);
    border-left: 1px dashed rgba(255,255,255,0.6);
    display: flex; align-items: center; justify-content: center;
    writing-mode: vertical-rl; font-size: 10px; color: #fff;
  }
  .safe-bottom {
    position: absolute; left: 0; right: 0; bottom: 0; height: 22.5%;
    background: rgba(192, 57, 43, 0.28);
    border-top: 1px dashed rgba(255,255,255,0.6);
    font-size: 10px; padding: 6px 10px; color: #fff;
  }
  .panel {
    background: #241f18;
    border: 1px solid rgba(250,245,234,0.12);
    border-radius: 16px;
    padding: 24px;
    width: 100%;
  }
  .kicker {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--yellow);
    margin-bottom: 8px;
  }
  .dot { width: 8px; height: 8px; background: var(--red); border-radius: 2px; }
  h1 {
    font-family: Georgia, serif;
    font-size: 28px;
    line-height: 1.2;
    margin-bottom: 8px;
    color: var(--cream);
  }
  .meta {
    font-size: 13px;
    color: #bfb5a3;
    margin-bottom: 20px;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 24px;
  }
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 16px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    border: none;
    transition: transform 0.12s ease, opacity 0.12s ease;
  }
  .btn:hover { opacity: 0.92; transform: translateY(-1px); }
  .btn-primary { background: var(--yellow); color: var(--ink); }
  .btn-secondary {
    background: rgba(250,245,234,0.1);
    color: var(--cream);
    border: 1px solid rgba(250,245,234,0.2);
  }
  .sec-title {
    font-size: 12px;
    letter-spacing: 1.6px;
    text-transform: uppercase;
    color: #a99e8b;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .chapters {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  @media (max-width: 520px) { .chapters { grid-template-columns: 1fr; } }
  .chap {
    background: rgba(250,245,234,0.05);
    border: 1px solid rgba(250,245,234,0.1);
    border-radius: 10px;
    padding: 10px 12px;
    text-align: left;
    color: var(--cream);
    cursor: pointer;
    transition: background 0.12s ease, border-color 0.12s ease;
  }
  .chap:hover { background: rgba(232,183,58,0.14); border-color: rgba(232,183,58,0.45); }
  .chap-t { font-size: 11px; color: var(--yellow); font-weight: 700; font-family: monospace; }
  .chap-name { font-size: 13px; font-weight: 600; margin-top: 2px; }
</style>
</head>
<body>
  <div class="wrap">
    <div class="phone-shell">
      <video id="vid" controls playsinline preload="metadata" src="/video.mp4"></video>
      <div id="safe" class="safe-overlay">
        <div class="safe-top">TikTok Top UI</div>
        <div class="safe-right">Like / Comment / Share</div>
        <div class="safe-bottom">TikTok Caption &amp; Audio Bar</div>
      </div>
    </div>

    <div class="panel">
      <div class="kicker"><span class="dot"></span>The Mbugua Effect · Vox Studio</div>
      <h1>Ep. 1 — Who Ordered Tom Mboya's Murder?</h1>
      <div class="meta">1080×1920 · 30 fps · 69.5s · Your VO + 30 Editorial SFX + Ducked Documentary Score</div>

      <div class="actions">
        <a class="btn btn-primary" href="/download">⬇ Download TikTok MP4</a>
        <button class="btn btn-secondary" id="toggleSafe" type="button">Toggle TikTok Safe Zones</button>
      </div>

      <div class="sec-title">Jump to Scene</div>
      <div class="chapters">
        <button class="chap" onclick="jump(0)"><div class="chap-t">00:00</div><div class="chap-name">1. Hook — Lost Leader</div></button>
        <button class="chap" onclick="jump(10.8)"><div class="chap-t">00:11</div><div class="chap-name">2. The Rise &amp; 1963</div></button>
        <button class="chap" onclick="jump(25.6)"><div class="chap-t">00:26</div><div class="chap-name">3. July 5, 1969 · Nairobi</div></button>
        <button class="chap" onclick="jump(42.2)"><div class="chap-t">00:42</div><div class="chap-name">4. Arrest &amp; Guilty Verdict</div></button>
        <button class="chap" onclick="jump(48.5)"><div class="chap-t">00:49</div><div class="chap-name">5. The Dark Turn · Case File</div></button>
        <button class="chap" onclick="jump(61.3)"><div class="chap-t">01:01</div><div class="chap-name">6. Finale &amp; Loop</div></button>
      </div>
    </div>
  </div>
  <script>
    const v = document.getElementById('vid');
    const safe = document.getElementById('safe');
    document.getElementById('toggleSafe').addEventListener('click', () => {
      safe.classList.toggle('on');
    });
    function jump(sec) {
      v.currentTime = sec;
      v.play().catch(() => {});
    }
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  const urlPath = (req.url || '/').split('?')[0];

  if (urlPath === '/' || urlPath === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(HTML);
    return;
  }

  if (urlPath === '/video.mp4' || urlPath === '/download') {
    if (!fs.existsSync(VIDEO_PATH)) {
      res.writeHead(404);
      res.end('Video not found');
      return;
    }
    const stat = fs.statSync(VIDEO_PATH);
    const total = stat.size;
    const isDownload = urlPath === '/download';

    if (isDownload) {
      res.writeHead(200, {
        'Content-Type': 'video/mp4',
        'Content-Length': total,
        'Content-Disposition': `attachment; filename="${DOWNLOAD_NAME}"`,
      });
      fs.createReadStream(VIDEO_PATH).pipe(res);
      return;
    }

    const range = req.headers.range;
    if (range) {
      const m = /bytes=(\d+)-(\d*)/.exec(range);
      const start = m ? parseInt(m[1], 10) : 0;
      const end = m && m[2] ? Math.min(parseInt(m[2], 10), total - 1) : total - 1;
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${total}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
        'Content-Type': 'video/mp4',
      });
      fs.createReadStream(VIDEO_PATH, { start, end }).pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': total,
        'Accept-Ranges': 'bytes',
        'Content-Type': 'video/mp4',
      });
      fs.createReadStream(VIDEO_PATH).pipe(res);
    }
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Live Studio Preview listening on http://0.0.0.0:${PORT}`);
});
