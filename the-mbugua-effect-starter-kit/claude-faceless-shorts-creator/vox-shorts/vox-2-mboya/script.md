# vox-2-mboya — "Who Ordered Tom Mboya's Murder?" (The Mbugua Effect · Vid 1)

Format: 1080×1920 @ 30fps · Classic Vox layered paper-collage · Creator's own voiceover (synced to real word timestamps) · Context-synced, keyword-emphasized captions in TikTok safe zone.

## Facts Verified

- **Thomas Joseph Odhiambo Mboya** (born Aug 15, 1930 – assassinated July 5, 1969): Kenyan trade unionist, independence leader, Minister for Economic Planning and Development, widely viewed as a leading contender to succeed President Jomo Kenyatta.
- **Assassination:** July 5, 1969, outside Chhani's Pharmacy on Government Road (now Moi Avenue) in central Nairobi. Shot in broad daylight; rushed to Nairobi Hospital where he did not survive. *(Note: script refers to his age as "just 39" — he was 38, six weeks short of 39; visual annotations use the exact verified date July 5, 1969.)*
- **Trial & Execution:** Nahashon Isaac Njenga Njoroge was arrested, convicted, and hanged. During the case he famously asked *"Why don't you go after the big man?"* — leaving the question of who ordered the assassination unanswered to this day.

## Scene Dissection & Beat Sheet (syncs to VO word timestamps on import)

| Scene | Script Line(s) | Camera | Layers & Annotations |
|---|---|---|---|
| **1. HOOK** | *"Kenya lost one of its most powerful future leaders at just 39. A man was convicted for his murder. But was he the one who ordered it?"* | Wide `z=1.0` → slow push `z=1.06` | `paper.png` · `mboya-portrait.png` (`ArchivalPhoto`, taped) · Editorial headline: **"Kenya's lost leader."** (yellow sweep on **lost**) · `LabelChip` (`NAIROBI · JULY 5, 1969`) |
| **2. RISE** | *"Tom Mboya was one of the men who helped fight for Kenya's independence. But after independence, he became even more powerful. He was a minister, a brilliant speaker, and many saw him as a possible future president."* | Dive to Kenya on `kenya-map.png` (`z=1.42`) | `kenya-map.png` · `independence-rally.png` (`ArchivalPhoto` top-left) · `mic.png` (`Cutout` right parallax) · `LabelChip`s: `KENYA · 1963`, `CABINET MINISTER`, `FUTURE PRESIDENT?` |
| **3. JULY 5, 1969** | *"Then, on July 5, 1969, everything changed. Mboya walked into a pharmacy in Nairobi. Minutes later, as he stepped outside, a gunman opened fire. Mboya was rushed to hospital, but he didn't survive."* | Pan/zoom into Nairobi pin (`fx=0.49, fy=0.62`), then pull for street + newspaper | `SketchArrow` pinning Nairobi · `LabelChip` (`NAIROBI · JULY 5, 1969`) · `pharmacy-street.png` (`ArchivalPhoto`, `"Government Road, Nairobi — 1969"`) · `newspaper.png` (`Cutout`) · `RubberStamp` (`FATAL`) |
| **4. THE VERDICT** | *"The killer was arrested. His name was Nahashon Njenga. He was found guilty and hanged."* | Pan right across board (`z=1.18`) | `gavel.png` (`Cutout` with sticker outline) · `LabelChip`s: `ARRESTED` · `NAHASHON NJENGA` · `CONVICTED & HANGED` · `RubberStamp` (`GUILTY`) |
| **5. THE DARK TURN** | *"But here's where things get dark. During the case, the question of whether someone more powerful had ordered the killing never went away. And the convicted man was gone before the public could get answers."* | Slow ominous push (`z=1.08 → 1.16`) | `dossier.png` (redacted case file with *"Why don't you go after the big man?"*) · `shadow.png` (`Cutout` noir silhouette right parallax) · Red `SketchArrow` curving from file to silhouette · `LabelChip` (`SOMEONE HIGHER?`) · `RubberStamp` (`UNANSWERED`) |
| **6. FINALE / LOOP** | *"One of Kenya's most powerful men was dead. One man was hanged. But who was behind it?"* | Pull smoothly back to page-1 wide (`z=1.0`) | `mboya-portrait.png` returns ≈ frame 0 · `LabelChip`s (`ONE LEADER DEAD` · `ONE MAN HANGED`) · Backed `SerifStatement`: **"But who was behind it?"** (yellow highlight on **who**) |

## Layers (`media/projects/vox-2-mboya/layers/`)

- `paper.png` (reused from engine)
- `mboya-portrait.png` (archival portrait)
- `kenya-map.png` (clean parchment atlas map, zero AI text)
- `independence-rally.png` (1963 Nairobi independence crowd)
- `pharmacy-street.png` (1969 Government Road pharmacy scene)
- `mic.png` (border-floodfilled chrome broadcast mic cutout)
- `gavel.png` (polished wooden courtroom gavel cutout)
- `shadow.png` (halftone noir silhouette cutout)
- `newspaper.png` (Playwright HTML→PNG 1969 Nairobi front-page clipping)
- `dossier.png` (Playwright HTML→PNG redacted 1969 case file)
