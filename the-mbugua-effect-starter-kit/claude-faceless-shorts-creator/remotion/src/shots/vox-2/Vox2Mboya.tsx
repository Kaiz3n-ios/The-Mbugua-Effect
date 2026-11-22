import React from 'react';
import { AbsoluteFill, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import {
  ArchivalPhoto,
  CollageBoard,
  Cutout,
  Grain,
  LabelChip,
  PaperBG,
  RubberStamp,
  SerifStatement,
  SketchArrow,
  VOX,
  VoxCaptions,
} from '../../lib/collage';
import { FONT_BODY } from '../../fonts';
import { VOX2_CAPTIONS } from './captions';

// =============================================================================
// COMPOSITION CONFIG — "Who Ordered Tom Mboya's Murder?"
// Channel: The Mbugua Effect (Kenyan History · Classic Vox Paper-Collage)
// Synced to creator's real voiceover (creator_vo.wav · 69.0s -> 69.5s total).
// =============================================================================
export const compositionConfig = {
  id: 'Vox2Mboya',
  durationInSeconds: 69.5,
  fps: 30,
  width: 1080,
  height: 1920,
};

const W = 1080;
const H = 1920;
const asset = (f: string) => staticFile(`projects/vox-2-mboya/layers/${f}`);

// =============================================================================
// CUES (GLOBAL frames @ 30fps) — locked to real word timestamps in transcript.json
// =============================================================================
const CUE = {
  // Scene 1: HOOK (0.0s – 10.6s)
  hookEnd: 318,
  ageChip: 126,         // "39." 4.30s
  convictedStamp: 190,  // "convicted" 6.40s
  orderedChip: 254,     // "was he the one who ordered it?" 8.46s

  // Scene 2: THE RISE & INDEPENDENCE (10.6s – 25.4s)
  mapStart: 314,
  riseStart: 318,
  mboyaPhoto: 330,      // "Tom Mboya" 11.06s
  kenyaChip: 410,       // "Kenya's independence" 13.76s
  rallyPhoto: 425,      // "independence" 14.18s
  ministerChip: 595,    // "minister" 19.90s
  micIn: 618,           // "brilliant speaker" 20.74s
  speakerChip: 632,
  presidentChip: 710,   // "possible future president" 23.70s

  // Scene 3: JULY 5, 1969 · NAIROBI (25.4s – 42.1s)
  julyStart: 762,
  julyHeadline: 806,    // "July 5th, 1969" 26.92s
  nairobiArrow: 822,
  nairobiPin: 855,
  pharmacyPhoto: 956,   // "pharmacy" 32.28s
  daylightChip: 987,    // "Nairobi" 32.90s
  newspaperIn: 1090,    // "gunman opened fire" 36.44s
  fatalStamp: 1222,     // "didn't survive" 40.76s

  // Scene 4: ARREST & VERDICT (42.1s – 48.3s)
  verdictStart: 1263,
  arrestChip: 1278,     // "arrested" 43.06s
  njengaChip: 1335,     // "Nahashon Njenga" 44.58s
  gavelIn: 1348,
  guiltyStamp: 1400,    // "guilty" 46.72s
  hangedChip: 1424,     // "hanged" 47.46s

  // Scene 5: THE DARK TURN / "THE BIG MAN" (48.3s – 61.1s)
  darkStart: 1449,
  darkStatement: 1460,  // "But here's where things get dark." 48.68s
  dossierIn: 1538,      // "During the case" 50.98s
  shadowIn: 1598,       // "someone more powerful" 53.36s
  shadowArrow: 1622,
  higherChip: 1644,     // "ordered the killing" 54.80s
  unansweredStamp: 1754,// "gone" 58.50s

  // Scene 6: FINALE / SEAMLESS LOOP (61.1s – 69.5s)
  finaleStart: 1833,
  mboyaBack: 1844,      // "One of Kenya's most powerful men..." 61.68s
  deadChip: 1898,       // "dead." 64.08s
  hangedEndChip: 1962,  // "One man was hanged." 65.40s
  whoStatement: 2020,   // "But who was behind it?" 67.48s
} as const;

// Continuous virtual camera across the single CollageBoard (strictly increasing f)
const CAM = [
  { f: 0, x: 540, y: 960, z: 1.0 },
  { f: 290, x: 540, y: 940, z: 1.06 },
  { f: 345, x: 525, y: 920, z: 1.04 },
  { f: 730, x: 555, y: 900, z: 1.1 },
  { f: 815, x: 530, y: 845, z: 1.44 },   // dive onto Nairobi on the Kenya map
  { f: 935, x: 530, y: 845, z: 1.48 },
  { f: 985, x: 540, y: 920, z: 1.04 },   // widen for pharmacy photo + newspaper
  { f: 1245, x: 540, y: 930, z: 1.07 },
  { f: 1295, x: 550, y: 920, z: 1.05 },  // courtroom desk framing
  { f: 1440, x: 555, y: 920, z: 1.09 },
  { f: 1510, x: 540, y: 940, z: 1.04 },  // dark dossier framing
  { f: 1805, x: 540, y: 915, z: 1.1 },
  { f: 1875, x: 540, y: 960, z: 1.0 },   // pull back to page-1 wide framing (seamless loop)
  { f: 2084, x: 540, y: 960, z: 1.0 },
];

// Kenya map geometry: kenya-map.png is 16:9 (~1408x768), placed w=1220 centered (540, 810)
// Visually verified Nairobi position: fx=0.485, fy=0.625
const MAP = { cx: 540, cy: 810, w: 1220, h: 665 };
const mapPt = (fx: number, fy: number) => ({
  x: MAP.cx - MAP.w / 2 + fx * MAP.w,
  y: MAP.cy - MAP.h / 2 + fy * MAP.h,
});
const NAIROBI = mapPt(0.485, 0.625);
const ARROW_TO_NAIROBI = `M ${NAIROBI.x - 190} ${NAIROBI.y - 165} Q ${NAIROBI.x - 95} ${NAIROBI.y - 130} ${NAIROBI.x - 12} ${NAIROBI.y - 10}`;
const ARROW_TO_SHADOW = `M 615 1010 Q 805 885 755 645`;

// Fades a scene's layers out smoothly over its last `dur` local frames
const SceneFade: React.FC<{ out: number; dur?: number; children: React.ReactNode }> = ({ out, dur = 14, children }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [out - dur, out], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <div style={{ opacity: op }}>{children}</div>;
};

// Subtle mood darkening overlay for Scene 5 ("But here's where things get dark.")
const DarkMood: React.FC = () => {
  const frame = useCurrentFrame();
  const op = interpolate(
    frame,
    [CUE.darkStart, CUE.darkStart + 25, CUE.finaleStart - 18, CUE.finaleStart + 10],
    [0, 0.34, 0.34, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  if (op <= 0.001) return null;
  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 44%, rgba(28,16,10,0.18) 20%, rgba(16,10,6,0.88) 100%)',
        opacity: op,
      }}
    />
  );
};

// Fast deterministic tiled film-grain overlay (avoids slow per-frame CPU SVG feTurbulence)
const FastGrain: React.FC<{ opacity?: number }> = ({ opacity = 0.08 }) => {
  const frame = useCurrentFrame();
  const step = Math.floor(frame / 2);
  const ox = (step * 73) % 256;
  const oy = (step * 139) % 256;
  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        mixBlendMode: 'multiply',
        opacity,
        backgroundImage: `url(${asset('grain-tile.png')})`,
        backgroundRepeat: 'repeat',
        backgroundPosition: `${ox}px ${oy}px`,
      }}
    />
  );
};

// Small understated archival channel header inside TikTok top safe zone
const ChannelMasthead: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      top: 138,
      left: 62,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      pointerEvents: 'none',
      zIndex: 55,
    }}
  >
    <div style={{ width: 10, height: 10, borderRadius: 2, background: VOX.red }} />
    <div
      style={{
        fontFamily: FONT_BODY,
        fontSize: 21,
        fontWeight: 700,
        letterSpacing: 3,
        textTransform: 'uppercase',
        color: VOX.inkSoft,
        background: 'rgba(250, 245, 234, 0.84)',
        padding: '6px 14px',
        boxShadow: '0 3px 10px rgba(40,28,12,0.12)',
      }}
    >
      THE MBUGUA EFFECT · ARCHIVE
    </div>
  </div>
);

const Vox2Mboya: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: VOX.paper }}>
      <CollageBoard cam={CAM}>
        <PaperBG src={asset('paper.png')} w={W} h={H} />

        {/* ================================================================
            SCENE 1 — HOOK (0.0s – 10.6s)
            Frame 0 is ALREADY fully composed for TikTok cover / seamless loop.
           ================================================================ */}
        <Sequence from={0} durationInFrames={CUE.hookEnd} layout="none">
          <SceneFade out={CUE.hookEnd - 3}>
            <SerifStatement
              x={520}
              y={330}
              w={900}
              at={-25}
              size={84}
              words={[
                { t: "Kenya's" },
                { t: 'lost', hl: true },
                { t: 'leader.' },
              ]}
            />
            {/* Real archival Tom Mboya photo — rembg die-cut sticker */}
            <Cutout
              src={asset('mboya-cutout.png')}
              x={510}
              y={885}
              w={470}
              at={0}
              enter="none"
              rotate={-1.5}
              depth={0.09}
              sticker={7}
              shadow={3}
            />
            <LabelChip
              x={340}
              y={1145}
              at={CUE.ageChip}
              text="Age 39 · July 5, 1969"
              kicker="NAIROBI, KENYA"
              accent={VOX.red}
              size={30}
              rotate={-2}
              depth={0.04}
            />
            <RubberStamp
              text="Convicted"
              x={745}
              y={545}
              at={CUE.convictedStamp}
              size={50}
              rotate={-11}
              z={8}
            />
            <LabelChip
              x={525}
              y={1255}
              at={CUE.orderedChip}
              text="Who ordered it?"
              kicker="THE UNANSWERED QUESTION"
              accent={VOX.yellow}
              kickerColor={VOX.inkSoft}
              size={34}
              rotate={1.2}
              depth={0.05}
            />
          </SceneFade>
        </Sequence>

        {/* ================================================================
            PERSISTENT MAP SCENERY (Scenes 2 & 3: 10.5s – 42.1s)
           ================================================================ */}
        <Sequence from={CUE.mapStart} durationInFrames={CUE.verdictStart - CUE.mapStart} layout="none">
          <SceneFade out={CUE.verdictStart - CUE.mapStart - 4} dur={16}>
            <Cutout
              src={asset('kenya-map.png')}
              x={MAP.cx}
              y={MAP.cy}
              w={MAP.w}
              at={0}
              dur={15}
              enter="place"
              rotate={-0.8}
              sticker={0}
              shadow={3}
              drift={0.35}
            />
          </SceneFade>
        </Sequence>

        {/* ================================================================
            SCENE 2 — THE RISE & INDEPENDENCE (10.6s – 25.4s)
           ================================================================ */}
        <Sequence from={CUE.riseStart} durationInFrames={CUE.julyStart - CUE.riseStart} layout="none">
          <SceneFade out={CUE.julyStart - CUE.riseStart - 4}>
            {/* Real archival Tom Mboya portrait framed with tape */}
            <ArchivalPhoto
              src={asset('mboya-portrait.png')}
              x={295}
              y={510}
              w={370}
              at={CUE.mboyaPhoto - CUE.riseStart}
              enter="place"
              rotate={-3.5}
              depth={0.07}
              caption="Tom Mboya (1930–1969)"
            />
            <LabelChip
              x={NAIROBI.x + 35}
              y={NAIROBI.y + 45}
              at={CUE.kenyaChip - CUE.riseStart}
              text="Kenya · 1963"
              kicker="INDEPENDENCE"
              accent={VOX.teal}
              size={28}
              rotate={-1.5}
              depth={0.03}
            />
            <ArchivalPhoto
              src={asset('independence-rally.png')}
              x={680}
              y={555}
              w={460}
              at={CUE.rallyPhoto - CUE.riseStart}
              enter="slide-r"
              rotate={2.4}
              depth={0.05}
              caption="Independence Era · Nairobi"
            />
            {/* Power credentials stacking cleanly across lower-mid board */}
            <LabelChip
              x={320}
              y={940}
              at={CUE.ministerChip - CUE.riseStart}
              text="Cabinet Minister"
              kicker="ECONOMIC PLANNING"
              accent={VOX.teal}
              size={30}
              rotate={-1.8}
              depth={0.04}
            />
            <Cutout
              src={asset('mic.png')}
              x={790}
              y={1040}
              w={235}
              at={CUE.micIn - CUE.riseStart}
              enter="slide-r"
              rotate={4}
              depth={0.12}
              sticker={5}
              shadow={3}
            />
            <LabelChip
              x={350}
              y={1085}
              at={CUE.speakerChip - CUE.riseStart}
              text="Brilliant Speaker"
              kicker="NATIONAL VOICE"
              accent={VOX.ink}
              size={30}
              rotate={1.2}
              depth={0.05}
            />
            <LabelChip
              x={460}
              y={1225}
              at={CUE.presidentChip - CUE.riseStart}
              text="Possible Future President"
              kicker="LEADING CONTENDER"
              accent={VOX.yellow}
              kickerColor={VOX.inkSoft}
              size={32}
              rotate={-1}
              depth={0.06}
              z={6}
            />
          </SceneFade>
        </Sequence>

        {/* ================================================================
            SCENE 3 — JULY 5, 1969 · NAIROBI (25.4s – 42.1s)
           ================================================================ */}
        <Sequence from={CUE.julyStart} durationInFrames={CUE.verdictStart - CUE.julyStart} layout="none">
          <SceneFade out={CUE.verdictStart - CUE.julyStart - 4}>
            {/* Part A: Map Dive to Nairobi (f762 – f958) */}
            <Sequence from={0} durationInFrames={CUE.pharmacyPhoto - CUE.julyStart + 18} layout="none">
              <SceneFade out={CUE.pharmacyPhoto - CUE.julyStart + 14}>
                <SerifStatement
                  x={530}
                  y={520}
                  w={820}
                  at={CUE.julyHeadline - CUE.julyStart}
                  size={74}
                  backing
                  words={[
                    { t: 'July' },
                    { t: '5,' },
                    { t: '1969.', hl: true },
                  ]}
                />
                <SketchArrow
                  id="nairobi-route"
                  d={ARROW_TO_NAIROBI}
                  vb={{ w: W, h: H }}
                  at={CUE.nairobiArrow - CUE.julyStart}
                  dur={26}
                  dashed
                  color={VOX.red}
                  width={6}
                  z={4}
                />
                <LabelChip
                  x={NAIROBI.x + 20}
                  y={NAIROBI.y + 42}
                  at={CUE.nairobiPin - CUE.julyStart}
                  text="Nairobi"
                  kicker="GOVERNMENT ROAD"
                  accent={VOX.red}
                  size={28}
                  rotate={-1.5}
                  depth={0.03}
                  z={5}
                />
              </SceneFade>
            </Sequence>

            {/* Part B: Chhani's Pharmacy street photo + 1969 Newspaper clipping */}
            <ArchivalPhoto
              src={asset('pharmacy-street.png')}
              x={515}
              y={535}
              w={790}
              at={CUE.pharmacyPhoto - CUE.julyStart}
              enter="place"
              rotate={-1.8}
              depth={0.06}
              caption="Government Road, Nairobi — July 5, 1969"
              z={5}
            />
            <LabelChip
              x={340}
              y={845}
              at={CUE.daylightChip - CUE.julyStart}
              text="Chhani's Pharmacy"
              kicker="NAIROBI · BROAD DAYLIGHT"
              accent={VOX.red}
              size={28}
              rotate={1.4}
              depth={0.05}
              z={6}
            />
            <Cutout
              src={asset('newspaper.png')}
              x={515}
              y={1045}
              w={790}
              at={CUE.newspaperIn - CUE.julyStart}
              enter="rise"
              rotate={1.5}
              depth={0.09}
              sticker={0}
              shadow={3}
              z={7}
            />
            <RubberStamp
              text="Assassinated"
              x={600}
              y={1130}
              at={CUE.fatalStamp - CUE.julyStart}
              size={54}
              rotate={-8}
              z={10}
            />
          </SceneFade>
        </Sequence>

        {/* ================================================================
            SCENE 4 — ARREST & VERDICT (42.1s – 48.3s)
           ================================================================ */}
        <Sequence from={CUE.verdictStart} durationInFrames={CUE.darkStart - CUE.verdictStart} layout="none">
          <SceneFade out={CUE.darkStart - CUE.verdictStart - 4}>
            <LabelChip
              x={340}
              y={420}
              at={CUE.arrestChip - CUE.verdictStart}
              text="Suspect Arrested"
              kicker="NAIROBI · 1969"
              accent={VOX.ink}
              size={30}
              rotate={-2}
              depth={0.03}
            />
            <LabelChip
              x={480}
              y={605}
              at={CUE.njengaChip - CUE.verdictStart}
              text="Nahashon Njenga"
              kicker="THE CONVICTED GUNMAN"
              accent={VOX.red}
              size={40}
              rotate={1.2}
              depth={0.05}
              z={5}
            />
            <Cutout
              src={asset('gavel.png')}
              x={590}
              y={905}
              w={640}
              at={CUE.gavelIn - CUE.verdictStart}
              enter="slide-r"
              rotate={-4}
              depth={0.11}
              sticker={6}
              shadow={3}
              z={4}
            />
            <RubberStamp
              text="Guilty"
              x={485}
              y={815}
              at={CUE.guiltyStamp - CUE.verdictStart}
              size={84}
              rotate={-12}
              z={9}
            />
            <LabelChip
              x={475}
              y={1145}
              at={CUE.hangedChip - CUE.verdictStart}
              text="Found Guilty & Hanged"
              kicker="SENTENCE CARRIED OUT"
              accent={VOX.ink}
              size={32}
              rotate={-1.2}
              depth={0.04}
              z={7}
            />
          </SceneFade>
        </Sequence>

        {/* ================================================================
            SCENE 5 — THE DARK TURN / "THE BIG MAN" (48.3s – 61.1s)
           ================================================================ */}
        <Sequence from={CUE.darkStart} durationInFrames={CUE.finaleStart - CUE.darkStart} layout="none">
          <SceneFade out={CUE.finaleStart - CUE.darkStart - 4}>
            {/* Brief dramatic chapter card ("But here's where things get dark.") */}
            <Sequence from={0} durationInFrames={CUE.dossierIn - CUE.darkStart + 10} layout="none">
              <SceneFade out={CUE.dossierIn - CUE.darkStart + 6}>
                <SerifStatement
                  x={520}
                  y={760}
                  w={860}
                  at={CUE.darkStatement - CUE.darkStart}
                  size={78}
                  backing
                  words={[
                    { t: "Here's" },
                    { t: 'where' },
                    { t: 'things' },
                    { t: 'get' },
                    { t: 'dark.', hl: true },
                  ]}
                />
              </SceneFade>
            </Sequence>

            {/* Redacted 1969 Case File + Noir Shadow Silhouette */}
            <Cutout
              src={asset('dossier.png')}
              x={485}
              y={960}
              w={790}
              at={CUE.dossierIn - CUE.darkStart}
              enter="place"
              rotate={-1.6}
              depth={0.06}
              sticker={0}
              shadow={3}
              z={4}
            />
            <Cutout
              src={asset('shadow.png')}
              x={730}
              y={485}
              w={420}
              at={CUE.shadowIn - CUE.darkStart}
              enter="slide-r"
              rotate={2}
              depth={0.13}
              sticker={5}
              shadow={3}
              z={6}
            />
            <SketchArrow
              id="bigman-arrow"
              d={ARROW_TO_SHADOW}
              vb={{ w: W, h: H }}
              at={CUE.shadowArrow - CUE.darkStart}
              dur={24}
              dashed
              color={VOX.red}
              width={7}
              z={8}
            />
            <LabelChip
              x={315}
              y={520}
              at={CUE.higherChip - CUE.darkStart}
              text="Someone Higher?"
              kicker="WHO GAVE THE ORDER"
              accent={VOX.red}
              size={32}
              rotate={-2}
              depth={0.05}
              z={7}
            />
            <RubberStamp
              text="Unanswered"
              x={625}
              y={955}
              at={CUE.unansweredStamp - CUE.darkStart}
              size={52}
              rotate={-9}
              z={10}
            />
          </SceneFade>
        </Sequence>

        {/* ================================================================
            SCENE 6 — FINALE & SEAMLESS LOOP (61.1s – 69.5s)
            Returns to Frame-0 framing of Tom Mboya so replay feels seamless.
           ================================================================ */}
        <Sequence from={CUE.finaleStart} layout="none">
          <Cutout
            src={asset('mboya-cutout.png')}
            x={510}
            y={885}
            w={470}
            at={CUE.mboyaBack - CUE.finaleStart}
            enter="place"
            rotate={-1.5}
            depth={0.09}
            sticker={7}
            shadow={3}
          />
          <LabelChip
            x={305}
            y={1145}
            at={CUE.deadChip - CUE.finaleStart}
            text="One leader dead."
            kicker="TOM MBOYA"
            accent={VOX.red}
            size={28}
            rotate={-2}
            depth={0.04}
          />
          <LabelChip
            x={695}
            y={1145}
            at={CUE.hangedEndChip - CUE.finaleStart}
            text="One man hanged."
            kicker="NAHASHON NJENGA"
            accent={VOX.ink}
            size={28}
            rotate={2}
            depth={0.04}
          />
          <SerifStatement
            x={520}
            y={345}
            w={740}
            at={CUE.whoStatement - CUE.finaleStart}
            size={76}
            backing
            words={[
              { t: 'But' },
              { t: 'who', hl: true },
              { t: 'was' },
              { t: 'behind' },
              { t: 'it?' },
            ]}
          />
        </Sequence>
      </CollageBoard>

      <DarkMood />
      <ChannelMasthead />
      <VoxCaptions phrases={VOX2_CAPTIONS} y={1435} size={46} />
      <FastGrain opacity={0.08} />
    </AbsoluteFill>
  );
};

export default Vox2Mboya;
