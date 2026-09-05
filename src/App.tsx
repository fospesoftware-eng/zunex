import { useRef, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Logotype, Monogram, Mark, ScrollProgress, Counter, Reveal, RevealWords, CustomCursor, MeshBG } from './components/Brand';
import { useMousePosition, useScrollProgress, useMagnetic } from './hooks/usePremium';
import { useChargeCycle } from './hooks/useChargeCycle';
import FastCharge, { MARK_PATHS } from './components/FastChargeDemo';
import OwnerPage from './pages/Owner';
import FastChargePage from './pages/FastChargePage';
import AdvertisePage from './pages/Advertise';
import EnterprisePage from './pages/Enterprise';
import RoiPage from './pages/Roi';

/* ═══════════════════════════════════════════════════════════
   MAGNETIC LINK
   ═══════════════════════════════════════════════════════════ */
function MagneticLink({ children, href, primary = false }: { children: React.ReactNode; href: string; primary?: boolean }) {
  const { ref, offset } = useMagnetic(0.25);
  return (
    <a
      ref={ref}
      href={href}
      data-hover
      className={`group inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-500 ${
        primary ? 'bg-paper text-ink hover:bg-steel hover:text-paper' : 'text-paper-soft hover:text-paper'
      }`}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
    >
      {children}
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO — Full screen, massive type, floating monogram
   ═══════════════════════════════════════════════════════════ */
function Hero() {
  const mouse = useMousePosition();
  const { ref: scrollRef, progress } = useScrollProgress<HTMLDivElement>();
  const [videoReady, setVideoReady] = useState(false);

  // Parallax transforms
  const textX = mouse.x * 6;
  const textY = mouse.y * 6 + (1 - progress) * 40;
  const monoX = mouse.x * 30;
  const monoY = mouse.y * 30 - progress * 100;
  const monoScale = 1 - progress * 0.3;
  const monoOpacity = 1 - progress * 1.5;

  return (
    <section id="top" ref={scrollRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise-bg">
      {/* Cinematic brand film — self-hosted, muted, looping, auto-fade on load */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src="/media/hero-bg.mp4"
        poster="/media/hero-bg-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        onCanPlay={() => setVideoReady(true)}
        style={{ opacity: videoReady ? 1 : 0, transition: 'opacity 1.4s var(--ease-lux)' }}
      />
      {/* Dark scrim — keeps the massive type legible over the film */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(8,8,10,0.8) 0%, rgba(8,8,10,0.55) 45%, rgba(8,8,10,0.88) 100%)' }}
      />
      <MeshBG variant="steel" />

      {/* Faint flat mark watermark — no container, no orbits */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ transform: `translate(${monoX}px, ${monoY}px) scale(${monoScale})`, opacity: monoOpacity, transition: 'transform 0.2s ease-out, opacity 0.3s' }}
      >
        <Mark size={220} color="rgba(244,243,239,0.07)" />
      </div>

      {/* Content */}
      <div
        className="relative z-10 text-center px-6"
        style={{ transform: `translate(${textX}px, ${textY}px)`, transition: 'transform 0.2s ease-out' }}
      >
        <Reveal delay={0.2}>
          <div className="inline-flex items-center gap-2 mb-10">
            <span className="w-1 h-1 rounded-full bg-steel" style={{ animation: 'pulse-soft 2s ease-in-out infinite' }} />
            <span className="text-[10px] font-medium text-paper-dim tracking-[0.25em] uppercase">Charging · Plus · Beyond</span>
          </div>
        </Reveal>

        {/* Massive headline */}
        <div style={{ overflow: 'hidden' }}>
          <Reveal delay={0.3} y={50}>
            <h1 className="font-display font-bold tracking-[-0.04em] leading-[0.9] text-paper" style={{ fontSize: 'clamp(3rem, 11vw, 10rem)' }}>
              Beyond the
            </h1>
          </Reveal>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <Reveal delay={0.45} y={50}>
            <h1 className="font-display font-bold tracking-[-0.04em] leading-[0.9] text-shimmer" style={{ fontSize: 'clamp(3rem, 11vw, 10rem)' }}>
              expected.
            </h1>
          </Reveal>
        </div>

        <Reveal delay={0.65}>
          <p className="mt-10 text-base md:text-lg text-paper-soft max-w-md mx-auto font-light leading-relaxed">
            Engineered for a world that moves beyond convention.
          </p>
        </Reveal>

        <Reveal delay={0.8}>
          <div className="mt-12 flex items-center justify-center gap-4">
            <MagneticLink href="#product" primary>
              Explore
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </MagneticLink>
          </div>
        </Reveal>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30 z-10">
        <span className="text-[9px] tracking-[0.3em] uppercase text-paper-dim">Scroll</span>
        <div className="w-[1px] h-10 bg-paper-dim" style={{ animation: 'scroll-line 2.5s ease-in-out infinite' }} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   MARQUEE — Icon-based dual-band with logotype weave
   ═══════════════════════════════════════════════════════════ */

/* Thin-line brand icons — 1.5px stroke, steel */
const Ico = {
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 5 13.5h6L11 22l8-11.5h-6L13 2Z" />
    </svg>
  ),
  usbc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="9" width="18" height="6.5" rx="3.25" />
      <circle cx="8" cy="12.2" r="0.4" fill="currentColor" />
      <circle cx="16" cy="12.2" r="0.4" fill="currentColor" />
    </svg>
  ),
  battery: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="8" width="16" height="8.5" rx="2" />
      <path d="M21.5 11v2.5" />
      <path d="m10.7 9.8-1.9 2.6h2.6l-1.9 2.5" />
    </svg>
  ),
  display: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4.5" width="18" height="13" rx="2" />
      <path d="m10.3 8.6 4.2 2.4-4.2 2.4V8.6Z" />
      <path d="M9 21h6" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3.8 8.5 4.4L12 12.6 3.5 8.2 12 3.8Z" />
      <path d="m4.6 12.4 7.4 3.8 7.4-3.8" />
      <path d="m4.6 16.4 7.4 3.8 7.4-3.8" />
    </svg>
  ),
  etch: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 21 12l-9 9-9-9 9-9Z" />
      <path d="M12 7.5 16.5 12 12 16.5 7.5 12 12 7.5Z" />
    </svg>
  ),
  plug: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3v5M15 3v5" />
      <path d="M6.5 8h11v3.5a5.5 5.5 0 0 1-11 0V8Z" />
      <path d="M12 17v4" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h15" />
      <path d="m13.5 6.5 5.5 5.5-5.5 5.5" />
    </svg>
  ),
};

function Marquee() {
  /* Icon + label chips */
  const chips = [
    { icon: Ico.bolt, label: '65W CHARGING' },
    { icon: Ico.usbc, label: 'USB-C PD' },
    { icon: Ico.plug, label: '12V OUTPUT' },
    { icon: Ico.layers, label: 'ANODISED ALUMINIUM' },
    { icon: Ico.etch, label: 'LASER-ETCHED' },
    { icon: Ico.display, label: 'AD NETWORK' },
    { icon: Ico.battery, label: 'ALWAYS ON' },
    { icon: Ico.arrow, label: 'BEYOND THE EXPECTED' },
  ];

  const chipSeq = [...chips, ...chips];

  return (
    <div className="relative py-10 overflow-hidden hairline-t hairline-b bg-ink-elevated marquee-paused">
      {/* ── Row 1: icon chips + logotype weave ── */}
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track items-center gap-14 pr-14" style={{ '--marquee-duration': '42s' } as React.CSSProperties}>
          {chipSeq.map((chip, i) => (
            <div key={i} className="flex items-center gap-14 shrink-0">
              {/* every 4th slot: the real wordmark instead of text */}
              {i % 4 === 3 ? (
                <Logotype className="h-4 md:h-5 opacity-70" />
              ) : (
                <span className="font-display text-lg md:text-xl font-semibold tracking-[0.08em] text-paper-dim">
                  {chip.label}
                </span>
              )}
              <span className="text-steel text-paper-dim" style={{ width: 22, height: 22 }}>
                <span className="block w-full h-full [&>svg]:w-full [&>svg]:h-full">{chip.icon}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Row 1 only: icon chips + logotype weave ── */}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FAST CHARGE — Phone + cable energy-flow animation
   ═══════════════════════════════════════════════════════════ */

/** Charge state machine: idle → (tap QR) → charging → charged → idle */
/* ═══════════════════════════════════════════════════════════
   PLUS MEDIA HERO — ZUNEX PLUS with its live screen.
   The LCD is ALWAYS in play mode: the embedded video renders
   from load with no text or controls. Charging is started by
   tapping the QR code on the device body — same flow as the
   FastCharge hub hero.
   ═══════════════════════════════════════════════════════════ */

/** Glass corners of the PLUS photo (plus-full-cutout.png 1700×1073), asset px:
 *  A(95,305) B(1095,55) C(1475,375) D(345,685). The control band runs along the
 *  near edge only — the black glass fills the rest of the top surface.
 *  Image placement in SVG user units: x=70 y=118 w=560 h=354; viewBox 0 60 1480 450
 *  (left edge extended to 0 so the device keeps safe padding from the viewport edge).
 *  The 1000×620 HTML overlay is perspective-mapped onto the glass via a homography
 *  computed in live CSS px (matrix3d values are px, not percentages). */
const PLUS_GLASS_QUAD_PX = [[95, 305], [1095, 55], [1475, 375], [345, 685]] as const;
const PLUS_IMG_RECT = { x: 70, y: 118, w: 560, h: 354, assetW: 1700, assetH: 1073 };

function solveHomography(src: number[][], dst: number[][]): string {
  const rows: number[][] = [];
  const vec: number[] = [];
  for (let i = 0; i < 4; i++) {
    const [X, Y] = dst[i], [u, v] = src[i];
    rows.push([-u, -v, -1, 0, 0, 0, X * u, X * v]);
    vec.push(-X);
    rows.push([0, 0, 0, -u, -v, -1, Y * u, Y * v]);
    vec.push(-Y);
  }
  // Gaussian elimination on 8x8
  const A = rows.map((r, i) => [...r, vec[i]]);
  for (let c = 0; c < 8; c++) {
    let p = c;
    for (let r = c + 1; r < 8; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    [A[c], A[p]] = [A[p], A[c]];
    for (let r = 0; r < 8; r++) {
      if (r === c) continue;
      const f = A[r][c] / A[c][c];
      for (let k = c; k <= 8; k++) A[r][k] -= f * A[c][k];
    }
  }
  const x = Array.from({ length: 8 }, (_, i) => A[i][8] / A[i][i]);
  const H = [x[0], x[1], x[2], x[3], x[4], x[5], x[6], x[7], 1];
  // CSS matrix3d is column-major: x'=a*x+e*y+m ; y'=b*x+f*y+n ; w'=d*x+h*y+p
  const f3 = (n: number) => Number(n.toFixed(5));
  return `matrix3d(${f3(H[0])},${f3(H[3])},0,${f3(H[6])},${f3(H[1])},${f3(H[4])},0,${f3(H[7])},0,0,1,0,${f3(H[2])},${f3(H[5])},0,${H[8]})`;
}

/** Measures the live scene and builds the px-based matrix3d for the screen overlay. */
function usePlusScreenMatrix() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [matrix, setMatrix] = useState('');
  useEffect(() => {
    const compute = () => {
      const wrap = wrapRef.current, svg = svgRef.current;
      if (!wrap || !svg) return;
      const wr = wrap.getBoundingClientRect();
      const sr = svg.getBoundingClientRect();
      const ox = sr.left - wr.left, oy = sr.top - wr.top;
      const { x, y, w, h, assetW, assetH } = PLUS_IMG_RECT;
      const sx = w / assetW, sy = h / assetH;
      const dst = PLUS_GLASS_QUAD_PX.map(([qx, qy]) => [
        ox + (x + qx * sx) / 1480 * sr.width,
        oy + (y + qy * sy - 60) / 450 * sr.height,
      ]);
      setMatrix(solveHomography([[0, 0], [1000, 0], [1000, 620], [0, 620]], dst));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(wrapRef.current!);
    window.addEventListener('resize', compute);
    return () => { ro.disconnect(); window.removeEventListener('resize', compute); };
  }, []);
  return { wrapRef, svgRef, matrix };
}

function PlusMediaHero() {
  /* 150ms/step → ~15s charging: enough for the embedded video to load and play */
  const { phase, pct, start } = useChargeCycle(150);
  const { wrapRef, svgRef, matrix } = usePlusScreenMatrix();
  const charging = phase === 'charging';
  const charged = phase === 'charged';
  const fillH = (pct * 1.02).toFixed(1);
  /* Cable starts tucked inside the plug boot (x≈428) and ends hidden behind the iPhone body */
  const cablePath = 'M 428 426.6 C 630 450, 860 468, 985 478 C 1090 488, 1175 486, 1235 462';
  const sceneRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onTilt = (e: React.MouseEvent) => {
    const r = sceneRef.current?.getBoundingClientRect();
    if (!r) return;
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: ny * -5, y: nx * 7 });
  };

  return (
    <section id="plus-media" className="relative flex flex-col justify-center py-16 lg:py-24 overflow-hidden noise-bg">
      <MeshBG variant="steel" />

      {/* tiny header label */}
      <div className="relative max-w-container mx-auto px-6 lg:px-8 text-center mb-4">
        <Reveal>
          <div className="text-[10px] font-semibold text-steel-bright tracking-[0.28em] uppercase">Smart media — charge · pay · play</div>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div
          ref={sceneRef}
          className="relative w-full max-w-[1500px] mx-auto px-4"
          style={{ perspective: '1600px' }}
          onMouseMove={onTilt}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        >
          {/* giant background text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
            <span className="font-display font-bold whitespace-nowrap leading-[0.94]"
              style={{
                fontSize: 'clamp(80px, 11vw, 170px)',
                letterSpacing: '-0.03em',
                color: 'transparent',
                backgroundImage: 'linear-gradient(180deg, rgba(244,243,239,0.13) 0%, rgba(244,243,239,0.045) 78%, rgba(244,243,239,0.02) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}>
              PLUG IN.
            </span>
            <span className="font-display font-bold whitespace-nowrap leading-[0.94]"
              style={{
                fontSize: 'clamp(80px, 11vw, 170px)',
                letterSpacing: '-0.03em',
                color: 'transparent',
                backgroundImage: 'linear-gradient(180deg, rgba(244,243,239,0.11) 0%, rgba(244,243,239,0.04) 78%, rgba(244,243,239,0.015) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}>
              PLAY ON.
            </span>
          </div>

          {/* editorial corner marks + vertical edge labels */}
          <span className="absolute top-4 left-5 text-paper/25 text-base font-thin select-none pointer-events-none">+</span>
          <span className="absolute top-4 right-5 text-paper/25 text-base font-thin select-none pointer-events-none">+</span>
          <span className="absolute bottom-4 left-5 text-paper/25 text-base font-thin select-none pointer-events-none">+</span>
          <span className="absolute bottom-4 right-5 text-paper/25 text-base font-thin select-none pointer-events-none">+</span>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none select-none">
            <span className="text-[9px] font-semibold tracking-[0.4em] uppercase text-paper/30" style={{ writingMode: 'vertical-rl' }}>Zunex Plus · Smart Media</span>
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none select-none">
            <span className="text-[9px] font-semibold tracking-[0.4em] uppercase text-paper/30" style={{ writingMode: 'vertical-rl' }}>iPhone 17 · USB-C PD 3.0</span>
          </div>

          <div className="relative" style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transformStyle: 'preserve-3d', transition: 'transform 0.25s ease-out' }}>
            <svg ref={svgRef} viewBox="0 60 1480 450" className="w-full h-auto" fill="none" role="img" aria-label="ZUNEX PLUS fast charging an iPhone 17 — tap the QR code to start">
              <defs>
                <radialGradient id="pmPortGlow">
                  <stop offset="0%" stopColor="#C5C9D0" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#6B7280" stopOpacity="0" />
                </radialGradient>
                {/* soft ring-halo around the QR hotspot — transparent over the QR itself */}
                <radialGradient id="pmQrHalo">
                  <stop offset="54%" stopColor="#F4F3EF" stopOpacity="0" />
                  <stop offset="68%" stopColor="#F4F3EF" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#9CA3AF" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="pmPacketGlow">
                  <stop offset="0%" stopColor="#C5C9D0" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#6B7280" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="pmGroundGlow">
                  <stop offset="0%" stopColor="#6B7280" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#6B7280" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="pmGlintGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
                <clipPath id="pmClip">
                  <rect x="70" y="118" width="560" height="354" rx="16" />
                </clipPath>
                <linearGradient id="pmFillGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#4B5563" />
                  <stop offset="100%" stopColor="#C5C9D0" />
                </linearGradient>
                <linearGradient id="pmScreenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#15151A" />
                  <stop offset="100%" stopColor="#0A0A0E" />
                </linearGradient>
                <linearGradient id="pmPhoneBody" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#87878E" />
                  <stop offset="50%" stopColor="#55555C" />
                  <stop offset="100%" stopColor="#3E3E45" />
                </linearGradient>
                <filter id="pmSoftBlur" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="9" />
                </filter>
                <filter id="pmDevShadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#000000" floodOpacity="0.55" />
                </filter>
                <filter id="pmReflBlur" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" />
                </filter>
                <linearGradient id="pmFloorLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6B7280" stopOpacity="0" />
                  <stop offset="50%" stopColor="#6B7280" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#6B7280" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="pmReflGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
                <mask id="pmReflFade">
                  <rect x="70" y="496" width="560" height="30" fill="url(#pmReflGrad)" />
                </mask>
              </defs>

              {/* studio floor line */}
              <line x1="60" y1="486" x2="1380" y2="486" stroke="url(#pmFloorLine)" strokeWidth="1" />

              {/* ambient floor glow */}
              <ellipse cx="700" cy="470" rx="520" ry="34" fill="url(#pmGroundGlow)"
                style={{ opacity: charging ? 1 : 0.35, transition: 'opacity 0.8s ease' }} />

              {/* ═══ cable PLUS → iPhone (drawn BEHIND both devices; the visible
                  USB-C plug is drawn INSIDE the PLUS float group below, glued
                  to the actual port hole so it never detaches) ═══ */}
              <path d={cablePath} stroke="#1C1C21" strokeWidth="6.5" strokeLinecap="round" />
              <path d={cablePath} stroke="#38383F" strokeWidth="2" strokeLinecap="round" opacity="0.55" />

              {charging && (
                <>
                  {[0, 1.2].map((begin) => (
                    <g key={begin}>
                      <circle r="5" fill="url(#pmPacketGlow)">
                        <animateMotion dur="2.4s" begin={`${begin}s`} repeatCount="indefinite" path={cablePath} />
                      </circle>
                      <g opacity="0.8">
                        <animateMotion dur="2.4s" begin={`${begin}s`} repeatCount="indefinite" path={cablePath} rotate="auto" />
                        <path d="M -3.5 -3 L 4 0 L -3.5 3 L -1.5 0 Z" fill="#AEB2BA" />
                      </g>
                    </g>
                  ))}
                  <g opacity="0.9" style={{ animation: 'fade-in-soft 0.4s ease-out both' }}>
                    <rect x="712" y="446.8" width="46" height="21" rx="10.5" fill="#101014" stroke="#2E2E34" strokeWidth="1" />
                    <text x="735" y="460.8" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="9.5" letterSpacing="1" fill="#AEB2BA">65W</text>
                  </g>
                </>
              )}

              {/* ═══ ZUNEX PLUS — full device photo, transparent cutout.
                  Softer float (float-soft-sm) keeps the plug glued to the port hole. ═══ */}
              <g style={{ animation: 'float-soft-sm 7s ease-in-out infinite' }}>
                <ellipse cx="400" cy="446" rx="270" ry="12" fill="#000" opacity="0.5" filter="url(#pmSoftBlur)" />
                <g>
                  <image href="/products/plus-full-cutout.png" x="70" y="118" width="560" height="354" filter="url(#pmDevShadow)" />
                  <g clipPath="url(#pmClip)">
                    <rect x="40" y="110" width="72" height="370" fill="url(#pmGlintGrad)"
                      style={{ animation: 'glint-sweep 5.5s ease-in-out infinite' }} />
                  </g>
                </g>
                {/* floor reflection */}
                <image href="/products/plus-full-cutout.png" x="70" y="118" width="560" height="354"
                  transform="translate(0,972) scale(1,-1)" mask="url(#pmReflFade)" opacity="0.16" filter="url(#pmReflBlur)" />

                {/* ═══ USB-C plug — anchored to the port hole: asset slot center
                    (825,917.5) → SVG (341.8,420.4), slot axis (328.9,425.9)→(354.7,415.1)
                    (−22.7°), verified with in-SVG reference markers against the live
                    render. Inside this float group → bobs together with the device. ═══ */}
                <g>
                  {/* charging glow halo around the port hole */}
                  {charging && (
                    <circle cx="341.8" cy="420.4" r="16" fill="url(#pmPortGlow)"
                      style={{ animation: 'port-glow 1.6s ease-in-out infinite', transformOrigin: '341.8px 420.4px' }} />
                  )}
                  {/* silver metal shell — starts inside the dark hole, exits along its axis */}
                  <line x1="334" y1="422.2" x2="359" y2="415.5" stroke="#B9BDC4" strokeWidth="6.6" strokeLinecap="round" opacity="0.85" />
                  <line x1="335.5" y1="421.8" x2="358" y2="415.9" stroke="#DCDFE3" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
                  {/* molded plastic body bending toward the cable run */}
                  <line x1="359" y1="415.5" x2="384" y2="422" stroke="#1E1E23" strokeWidth="10" strokeLinecap="butt" />
                  {/* strain-relief boot widening to the cable diameter */}
                  <path d="M 384 416.8 L 446 418.9 L 446 437.9 L 384 427.2 Z" fill="#141418" />
                </g>

                {/* ── QR tap target — invisible hit area over the photo's QR
                    (asset 1420-1590 × 470-580 → SVG ≈ 538-594 × 273-309).
                    Idle cue: a soft steel halo breathing around the QR — no
                    outline, no text, no overlay block. ── */}
                <g
                  onClick={start}
                  style={{ cursor: charging ? 'default' : 'pointer' }}
                  role="button"
                  aria-label="Tap the QR code to start charging"
                >
                  {phase === 'idle' && (
                    <ellipse cx="566" cy="291" rx="38" ry="28" fill="none" stroke="#F4F3EF" strokeOpacity="0.5" strokeWidth="1.2"
                      style={{ animation: 'halo-breathe 2.8s ease-in-out infinite', transformOrigin: '566px 291px' }} />
                  )}
                  <rect x="528" y="258" width="76" height="66" rx="10" fill="transparent" />
                </g>
              </g>

              {/* ═══ iPhone 17 ═══ */}
              <g style={{ animation: 'float-soft-sm 7s ease-in-out -3.5s infinite' }}>
               <g transform="translate(1140,60) scale(1.258) translate(-1160,-88)">
                <ellipse cx="1237" cy="432" rx="90" ry="12" fill="#000" opacity="0.5" filter="url(#pmSoftBlur)" />
                <rect x="1160" y="96" width="155" height="325" rx="28" fill="#1F1F24" />
                <rect x="1156" y="118" width="4" height="24" rx="2" fill="#3C3C43" />
                <rect x="1156" y="152" width="4" height="36" rx="2" fill="#3C3C43" />
                <rect x="1156" y="196" width="4" height="36" rx="2" fill="#3C3C43" />
                <rect x="1315" y="146" width="4" height="58" rx="2" fill="#3C3C43" />
                <rect x="1160" y="88" width="155" height="325" rx="28" fill="url(#pmPhoneBody)" />
                <rect x="1163" y="91" width="149" height="319" rx="25" fill="#050507" />
                <rect x="1168" y="96" width="139" height="309" rx="20" fill="url(#pmScreenGrad)" stroke="#4A4A52" strokeWidth="1.25" />
                <rect x="1171" y="99" width="133" height="303" rx="17" fill="none" stroke="#2A2A31" strokeWidth="0.75" />
                <rect x="1214" y="108" width="47" height="14.5" rx="7.25" fill="#020203" />

                {phase === 'idle' && (
                  <g opacity="0.55">
                    <g transform="translate(1216,186) scale(0.081)" fill="#3C3C43">
                      {MARK_PATHS.map((d, i) => <path key={i} d={d} />)}
                    </g>
                  </g>
                )}

                {charging && (
                  <g style={{ animation: 'fade-in-soft 0.3s ease-out both' }}>
                    <rect x="1228" y="144" width="18" height="6" rx="2.5" fill="#B9BDC4" />
                    <rect x="1204" y="150" width="66" height="110" rx="12" stroke="#B9BDC4" strokeWidth="2.5" fill="none" />
                    <rect x="1209" y={256 - Number(fillH)} width="56" height={fillH} rx="6" fill="url(#pmFillGrad)" style={{ transition: 'height 0.12s linear, y 0.12s linear' }} />
                    <g style={{ animation: 'pulse-soft 1.4s ease-in-out infinite' }}>
                      <path d="M1243 178 L1228 208 h8.5 l-4.5 24 15-28 h-8.5 l7-26 Z" fill="#F4F3EF" opacity="0.95" />
                    </g>
                    <text x="1237" y="298" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="34" fill="#F4F3EF">{pct}%</text>
                    <text x="1237" y="320" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="8.5" letterSpacing="2.5" fill="#C5C9D0">FAST CHARGING</text>
                    <g opacity="0.75">
                      {[0, 1, 2].map((i) => (
                        <rect key={i} x={1216 + i * 15} y="338" width="9" height="4" rx="2" fill="#9CA3AF"
                          style={{ animation: `pulse-soft 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                      ))}
                    </g>
                  </g>
                )}

                {charged && (
                  <g style={{ animation: 'fade-in-soft 0.35s ease-out both' }}>
                    <rect x="1168" y="96" width="139" height="309" rx="20" fill="#F4F3EF" style={{ animation: 'screen-flash 0.9s ease-out forwards' }} />
                    {[0, 0.25].map((d) => (
                      <circle key={d} cx="1237" cy="205" r="56" stroke="#9CA3AF" strokeWidth="1.5" fill="none"
                        style={{ animation: `ring-burst 1s ease-out ${d}s forwards`, transformBox: 'fill-box', transformOrigin: 'center' }} />
                    ))}
                    <g transform="translate(1165,137) scale(0.28)" fill="#B9BDC4" opacity="0.95">
                      {MARK_PATHS.map((d, i) => <path key={i} d={d} />)}
                    </g>
                    <text x="1237" y="296" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="26" fill="#F4F3EF">100%</text>
                    <text x="1237" y="318" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="8.5" letterSpacing="2.5" fill="#C5C9D0">FULLY CHARGED</text>
                  </g>
                )}

                {charging && (
                  <circle cx="1237" cy="414" r="18" fill="url(#pmPortGlow)" style={{ animation: 'port-glow 1.6s ease-in-out infinite', transformOrigin: '1237px 414px' }} />
                )}
                <rect x="1226" y="410" width="22" height="7" rx="3.5" stroke="#6E6E76" strokeWidth="1.5" fill="#0D0D10" />
               </g>
              </g>
            </svg>

            {/* ═══ LIVE SCREEN overlay — perspective-mapped onto the PLUS display.
                Always in play mode: video only, from page load, no text. ═══ */}
            <div ref={wrapRef} className="absolute inset-0" style={{ pointerEvents: 'none' }}>
              <div
                className="absolute left-0 top-0"
                style={{
                  width: 1000,
                  height: 620,
                  transformOrigin: '0 0',
                  transform: matrix,
                  opacity: matrix ? 1 : 0,
                  pointerEvents: 'none',
                }}
              >
                <div className="w-full h-full relative overflow-hidden bg-black">
                  {/* Self-hosted ad, native player: always autoplays muted/looped,
                      zero chrome, zero overlays, fills the glass edge to edge. */}
                  <video
                    src="/media/plus-ad.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ pointerEvents: 'none' }}
                  />
                  {/* faint LCD glass sheen over the video */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'linear-gradient(115deg, rgba(244,243,239,0.05) 0%, transparent 22%, transparent 78%, rgba(244,243,239,0.03) 100%)',
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PRODUCT SHOWCASE — ZUNEX ONE vs ZUNEX PLUS comparison
   ═══════════════════════════════════════════════════════════ */

const QrIco = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="6" height="6" rx="1.2" />
    <rect x="14" y="4" width="6" height="6" rx="1.2" />
    <rect x="4" y="14" width="6" height="6" rx="1.2" />
    <path d="M14 14h3v3h-3z" />
    <path d="M20 14v.01M17 20h3M20 17v3" />
  </svg>
);
const WifiIco = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.8 9.3C8 4.7 16 4.7 21.2 9.3" />
    <path d="M5.8 12.8c3.6-3.1 8.8-3.1 12.4 0" />
    <path d="M9 16.2c1.8-1.5 4.2-1.5 6 0" />
    <circle cx="12" cy="19.2" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);
const TargetIco = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="0.7" fill="currentColor" stroke="none" />
  </svg>
);
const SosIco = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3.5 21.5 20h-19L12 3.5Z" />
    <path d="M12 10v4.5" />
    <path d="M12 17.6v.01" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   PRODUCT STAGE — museum spotlight, subtle 3D mouse tilt,
   floor reflection. No circles/orbits/floating chips.
   ═══════════════════════════════════════════════════════════ */
function ProductStage({ img, name, glow, progress }: {
  img: string; name: string; glow: string; progress: number;
}) {
  const mouse = useMousePosition();
  const rx = -mouse.y * 3.5;
  const ry = mouse.x * 5;

  return (
    <div className="relative mt-12 h-64 md:h-80 flex items-center justify-center">
      {/* spotlight beam from above */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-10 w-[70%] h-[115%] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(244,243,239,0.09), rgba(244,243,239,0.02) 55%, transparent 85%)',
          clipPath: 'polygon(41% 0%, 59% 0%, 100% 100%, 0% 100%)',
          filter: 'blur(12px)',
        }} />

      {/* ambient glow behind device */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-52 rounded-full opacity-50 group-hover:opacity-90 transition-opacity duration-700"
          style={{ background: `radial-gradient(closest-side, ${glow}, transparent)`, filter: 'blur(30px)' }} />
      </div>

      {/* device + reflection column */}
      <div className="relative z-10 w-[68%] max-w-[420px]"
        style={{ transform: `translateY(${(progress - 0.5) * -16}px)` }}>
        {/* device with subtle 3D tilt */}
        <div style={{ transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`, transition: 'transform 0.25s ease-out', transformStyle: 'preserve-3d' }}>
          <img
            src={img} alt={name} loading="lazy"
            className="w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
            style={{ filter: 'drop-shadow(0 22px 22px rgba(0,0,0,0.5))', transitionTimingFunction: 'var(--ease-lux)' }}
          />
        </div>

        {/* floor reflection — mirrored, masked, blurred */}
        <div aria-hidden className="h-12 md:h-14 overflow-hidden opacity-25"
          style={{
            WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,0.7), transparent 80%)',
            maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.7), transparent 80%)',
          }}>
          <img src={img} alt="" className="w-full object-contain"
            style={{ transform: 'scaleY(-1)', filter: 'blur(3px) brightness(0.55)' }} />
        </div>

        {/* contact shadow at the junction */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-12 md:bottom-14 w-[70%] h-3 rounded-full bg-black/80"
          style={{ filter: 'blur(10px)' }} />
      </div>

      {/* floor hairline */}
      <div className="absolute bottom-5 inset-x-[6%] h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(244,243,239,0.14), transparent)' }} />
    </div>
  );
}

function ProductShowcase() {
  /* feature rows — `both` = on every device, else ZUNEX PLUS only */
  const features = [
    { icon: Ico.bolt, label: 'Fast charging', desc: 'USB-C PD + Lightning charger', both: true },
    { icon: QrIco, label: 'UPI · QR · NFC', desc: 'Tap-to-pay on the hub', both: true },
    { icon: WifiIco, label: 'WiFi', desc: 'Connected · OTA updated', both: true },
    { icon: Ico.display, label: 'Media ad networks', desc: 'Monetise every charge', both: false },
    { icon: TargetIco, label: 'Target marketing', desc: 'Precision campaigns', both: false },
    { icon: SosIco, label: 'SOS alerts', desc: 'Emergency-ready hardware', both: false },
  ];

  const panels = [
    {
      name: 'ZUNEX ONE',
      ghost: 'ONE',
      tag: 'Pure charging',
      img: '/products/hub-cutout.png?v=2',
      bg: 'var(--color-ink)',
      accent: 'text-steel-bright',
      glow: 'rgba(107,114,128,0.10)',
      badge: '',
      blurb: 'The flagship charging hub. Focused, refined, essential.',
      spec: '65W · USB-C PD · 12V · Anodised aluminium',
    },
    {
      name: 'ZUNEX PLUS',
      ghost: 'PLUS',
      tag: 'Charging + Smart media',
      img: '/products/plus-full-cutout.png',
      bg: 'var(--color-ink-elevated)',
      accent: 'text-paper',
      glow: 'rgba(244,243,239,0.05)',
      badge: 'MOST ADVANCED',
      blurb: 'Everything ONE does — plus a smart media platform built in.',
      spec: '65W · Display module · WiFi · Ad engine',
    },
  ];

  return (
    <section id="product" className="relative noise-bg">
      <MeshBG variant="dark" />
      <div className="max-w-container mx-auto px-6 lg:px-8 py-16 lg:py-24">
        {/* header */}
        <div className="text-center mb-16 lg:mb-24">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-1 h-1 rounded-full bg-steel" style={{ animation: 'pulse-soft 2s ease-in-out infinite' }} />
              <span className="text-[10px] font-medium text-paper-dim tracking-[0.25em] uppercase">The lineup — compare</span>
            </div>
          </Reveal>
          <RevealWords
            text="One platform. Two devices."
            className="font-display text-[clamp(2.2rem,6vw,5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-paper"
            stagger={0.07}
          />
          <Reveal delay={0.35}>
            <p className="mt-6 text-paper-soft font-light max-w-xl mx-auto">
              Every ZUNEX hub charges at full speed and accepts payments. PLUS adds an entire media business on top.
            </p>
          </Reveal>
        </div>

        {/* comparison grid */}
        <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-16">
          {panels.map((p, pi) => {
            const { ref, progress } = useScrollProgressOnView();
            const isPlus = pi === 1;
            return (
              <div key={p.name} ref={ref} className="relative">
                <div
                  className="group relative h-full rounded-[2rem] overflow-hidden border-gradient hairline transition-all duration-700"
                  style={{ background: p.bg, transitionTimingFunction: 'var(--ease-lux)' }}
                >
                  {/* hover glow orb */}
                  <div className="absolute -top-24 right-0 w-96 h-96 rounded-full blur-[110px] opacity-40 group-hover:opacity-90 transition-opacity duration-700"
                    style={{ background: p.glow }} />

                  {/* ghost name behind content */}
                  <span aria-hidden className="pointer-events-none select-none absolute -bottom-8 -right-4 font-display font-bold leading-none"
                    style={{ fontSize: 'clamp(6rem, 10vw, 11rem)', letterSpacing: '-0.04em', color: 'rgba(244,243,239,0.035)' }}>
                    {p.ghost}
                  </span>

                  <div className="relative p-8 lg:p-12 flex flex-col h-full">
                    {/* head */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Monogram size={26} variant={isPlus ? 'paper' : 'steel'} />
                        <div>
                          <h3 className="font-display text-2xl font-bold text-paper tracking-[-0.02em]">{p.name}</h3>
                          <p className={`text-[11px] font-medium tracking-[0.18em] uppercase mt-0.5 ${p.accent}`}>{p.tag}</p>
                        </div>
                      </div>
                      {p.badge && (
                        <span className="text-[9px] font-semibold tracking-[0.2em] px-3 py-1.5 rounded-full border border-paper/20 text-paper-soft whitespace-nowrap">
                          {p.badge}
                        </span>
                      )}
                    </div>

                    {/* product stage — museum spotlight, no box */}
                    <Reveal delay={0.15}>
                      <ProductStage img={p.img} name={p.name} glow={p.glow} progress={progress} />
                    </Reveal>
                    <Reveal delay={0.22}>
                      <p className="text-center text-[10px] font-medium tracking-[0.18em] text-paper-dim uppercase -mt-1">{p.spec}</p>
                    </Reveal>

                    {/* blurb */}
                    <Reveal delay={0.2}>
                      <p className="mt-7 text-sm text-paper-soft font-light leading-relaxed">{p.blurb}</p>
                    </Reveal>

                    {/* feature rows — ONE: core (on every hub) · PLUS: exclusive additions only */}
                    <Reveal delay={0.25}>
                      <p className="mt-7 mb-1 text-[9px] font-semibold tracking-[0.22em] text-paper-dim/70 uppercase">
                        {isPlus ? 'Exclusive to PLUS' : 'Core — on every hub'}
                      </p>
                    </Reveal>
                    <div className="space-y-1">
                      {features
                        .filter((f) => (isPlus ? !f.both : f.both))
                        .map((f, fi) => (
                          <Reveal key={f.label} delay={0.28 + fi * 0.06}>
                            <div
                              className={`relative flex items-center gap-4 py-3.5 ${
                                fi > 0 ? 'border-t border-paper/[0.06]' : ''
                              }`}
                            >
                              <span className="w-9 h-9 shrink-0 rounded-xl border border-paper/12 flex items-center justify-center text-steel-bright [&>svg]:w-4 [&>svg]:h-4">
                                {f.icon}
                              </span>
                              <span className="flex-1 min-w-0">
                                <span className="block font-display text-sm font-semibold tracking-wide text-paper">
                                  {f.label}
                                </span>
                                <span className="block text-[11px] text-paper-dim font-light">{f.desc}</span>
                              </span>
                              {isPlus && (
                                <span className="text-[9px] tracking-[0.18em] font-semibold px-2.5 py-1 rounded-full bg-paper/10 text-paper whitespace-nowrap">
                                  ADDS
                                </span>
                              )}
                            </div>
                          </Reveal>
                        ))}
                    </div>

                    {/* CTA */}
                    <Reveal delay={0.55}>
                      <a href="#contact" data-hover
                        className="mt-9 inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.08em] uppercase text-paper border border-paper/20 rounded-full px-7 py-3 hover:bg-paper hover:text-ink transition-all duration-500 w-max"
                        style={{ transitionTimingFunction: 'var(--ease-lux)' }}>
                        Explore {isPlus ? 'PLUS' : 'ONE'} <span className="w-3.5 h-3.5 inline-block [&>svg]:w-full [&>svg]:h-full">{Ico.arrow}</span>
                      </a>
                    </Reveal>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Helper hook for ProductShowcase
function useScrollProgressOnView() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      setProgress(Math.max(0, Math.min(1, (vh - rect.top) / (rect.height + vh))));
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return { ref, progress };
}

/* ═══════════════════════════════════════════════════════════
   BRAND STORY — Editorial split layout
   ═══════════════════════════════════════════════════════════ */
function BrandStory() {
  return (
    <section id="brand" className="relative py-16 lg:py-24 noise-bg overflow-hidden bg-ink-elevated">
      <MeshBG variant="dark" />
      <div className="relative max-w-container mx-auto px-6 lg:px-8">
        {/* Section label */}
        <Reveal>
          <div className="text-[11px] font-semibold text-steel-bright tracking-[0.25em] uppercase mb-6">The Device</div>
        </Reveal>

        {/* Massive editorial heading */}
        <RevealWords
          text="One device. Two revenue streams. Zero staff time."
          className="font-display text-[clamp(1.8rem,4.5vw,4rem)] font-bold leading-[1.1] tracking-[-0.03em] text-paper max-w-4xl mb-20"
          stagger={0.04}
        />

        {/* Device economics — 3 columns */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { symbol: '65W', title: 'Charging, metered', desc: 'Pay-per-charge or free with a tap. Every session is metered and reported to the venue dashboard.' },
            { symbol: 'AD', title: 'Screens that earn', desc: 'The built-in LCD plays ad placements while people wait. The venue takes a share of every play.' },
            { symbol: 'API', title: 'Built to connect', desc: 'Open API and SDK plug charging and screen placements into POS, loyalty and venue systems.' },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="group p-8 rounded-3xl border-gradient hairline hover:bg-ink-card transition-all duration-500 h-full">
                <div className="font-display text-5xl font-bold text-steel-bright mb-6" style={{ animation: `float-soft ${5 + i}s ease-in-out infinite` }}>{item.symbol}</div>
                <div className="text-sm font-semibold text-paper mb-2">{item.title}</div>
                <p className="text-sm text-paper-soft leading-relaxed font-light">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Philosophy — The Opportunity */}
        <div className="relative">
          {/* Ghost word watermark */}
          <div aria-hidden="true" className="absolute -top-14 -left-2 pointer-events-none select-none hidden lg:block">
            <div
              className="font-display font-bold leading-none tracking-[-0.03em] text-[clamp(5rem,11vw,10rem)]"
              style={{
                backgroundImage: 'linear-gradient(180deg, rgba(244,243,239,0.065) 0%, rgba(244,243,239,0.02) 78%, rgba(244,243,239,0.01) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              AUDIENCE
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start relative">
            {/* Left — narrative (heading uses plain Reveal: background-clip:text breaks on RevealWords' nested spans) */}
            <div>
              <Reveal>
                <div className="text-[11px] font-semibold text-steel-bright tracking-[0.25em] uppercase mb-6">The Opportunity</div>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-tight tracking-[-0.03em] text-gradient-lux mb-7">
                  Every charge is an audience.
                </h2>
              </Reveal>
              <Reveal delay={0.25}>
                <p className="text-lg text-paper-soft leading-relaxed font-light">
                  Charging takes three to fifteen minutes — the most valuable dwell time in retail. The device turns it into measurable attention and direct revenue for the venue, with nothing extra to manage.
                </p>
              </Reveal>
            </div>

            {/* Right — interactive revenue cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2 4.8 13.2h5.7L10.4 22l8.8-11.2h-5.7L13 2z" />
                    </svg>
                  ),
                  title: 'Pay-per-charge',
                  desc: 'Set your price per session. Revenue lands in the dashboard as it happens.',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4.5" width="18" height="13" rx="2" />
                      <path d="M10.2 8.4l4.6 2.6-4.6 2.6V8.4z" fill="currentColor" stroke="none" />
                      <path d="M8.5 21h7" />
                    </svg>
                  ),
                  title: 'Ad share',
                  desc: 'Venues earn from every placement played on their unit’s screen.',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="8.5" />
                      <path d="M12 7.5V12l3 1.8" />
                    </svg>
                  ),
                  title: 'Sponsored hours',
                  desc: 'Local businesses sponsor free charging. The venue still collects.',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3l7 2.8v5.4c0 4.3-2.9 7.3-7 9.8-4.1-2.5-7-5.5-7-9.8V5.8L12 3z" />
                      <path d="M9.2 11.6l2 2 3.8-4.2" />
                    </svg>
                  ),
                  title: 'Zero upkeep',
                  desc: 'No consumables, no staff training. Ships venue-ready.',
                },
              ].map((p, i) => (
                <OpportunityCard key={p.title} icon={p.icon} title={p.title} desc={p.desc} delay={0.2 + i * 0.1} />
              ))}
            </div>
          </div>

          {/* One horizontal band — dwell window meter + figures */}
          <Reveal delay={0.3}>
            <div className="mt-14 grid md:grid-cols-[1.25fr_1fr] rounded-2xl border-gradient hairline overflow-hidden">
              {/* Meter half */}
              <div className="p-6 md:p-7">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-paper-faint">Dwell window</span>
                  <span className="font-display text-sm font-semibold text-steel-bright">3–15 min</span>
                </div>
                <div className="relative h-[3px] rounded-full bg-paper/10 overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(90deg, rgba(107,114,128,0.2) 0%, rgba(156,163,175,0.85) 50%, rgba(107,114,128,0.2) 100%)' }}
                  />
                  <div
                    className="dwell-sweep absolute inset-y-0 w-1/3"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(238,238,240,0.95), transparent)' }}
                  />
                </div>
                <div className="flex justify-between mt-3.5 text-[9px] font-medium tracking-[0.18em] uppercase text-paper-faint">
                  <span>Tap to start</span>
                  <span>Attention peak</span>
                  <span>Session ends</span>
                </div>
              </div>
              {/* Figures half */}
              <div className="grid grid-cols-3 gap-px bg-paper/5 md:border-l md:border-paper/10">
                {[
                  { v: 15, s: ' min', l: 'Avg. dwell' },
                  { v: 2, s: '×', l: 'Revenue streams' },
                  { v: 0, s: '', l: 'Staff hours' },
                ].map((f, i) => (
                  <div key={i} className="bg-ink-elevated px-5 py-6 flex flex-col justify-center">
                    <div className="font-display text-2xl font-bold text-paper">
                      <Counter to={f.v} suffix={f.s} />
                    </div>
                    <div className="text-[9px] font-medium tracking-[0.2em] uppercase text-paper-faint mt-1.5">{f.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* Spotlight card — cursor-tracked glow for the Opportunity grid */
function OpportunityCard({ icon, title, desc, delay }: { icon: React.ReactNode; title: string; desc: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState<{ x: number; y: number } | null>(null);
  return (
    <Reveal delay={delay}>
      <div
        ref={ref}
        data-hover
        onMouseMove={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (r) setSpot({ x: e.clientX - r.left, y: e.clientY - r.top });
        }}
        onMouseLeave={() => setSpot(null)}
        className="group relative p-6 rounded-2xl border-gradient hairline overflow-hidden hover:bg-ink-card transition-all duration-500 hover:-translate-y-1"
      >
        {/* cursor spotlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: spot ? 1 : 0,
            background: spot ? `radial-gradient(240px circle at ${spot.x}px ${spot.y}px, rgba(156,163,175,0.10), transparent 65%)` : 'none',
          }}
        />
        <div className="relative">
          <div className="w-10 h-10 rounded-xl hairline bg-ink-card/60 flex items-center justify-center mb-5 text-steel-bright group-hover:text-paper transition-colors duration-500">
            {icon}
          </div>
          <div className="text-sm font-semibold text-paper mb-1.5">{title}</div>
          <p className="text-xs text-paper-dim leading-relaxed">{desc}</p>
        </div>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPONENTS GRID — Technology
   ═══════════════════════════════════════════════════════════ */
function Technology() {
  const parts = [
    { img: '/products/adapter.jpg', title: 'Adapter collar', desc: '12V output for tethered charging. Machined, not moulded.' },
    { img: '/products/cable.jpg', title: 'Cable end', desc: 'Coiled cable with a reinforced USB-C housing.' },
    { img: '/products/tappad.jpg', title: 'Tap pad', desc: 'One tap starts a session. Precision-machined contact surface.' },
    { img: '/products/brandplate.jpg', title: 'Front plate', desc: 'Anodised and serialised for fleet management.' },
  ];
  return (
    <section id="tech" className="relative py-16 lg:py-24 noise-bg overflow-hidden">
      <MeshBG variant="dark" />
      <div className="relative max-w-container mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="text-[11px] font-semibold text-steel-bright tracking-[0.25em] uppercase mb-6">Inside the Device</div>
        </Reveal>
        <RevealWords
          text="The device, up close."
          className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-tight tracking-[-0.03em] text-paper mb-6"
        />
        <Reveal delay={0.3}>
          <p className="text-lg text-paper-soft font-light leading-relaxed max-w-xl mb-16">
            Every component is machined, sealed and tested for years of public use — built to be tapped, plugged and trusted thousands of times a month.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {parts.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="group rounded-2xl overflow-hidden border-gradient hairline hover:border-steel/30 transition-all duration-500">
                <div className="aspect-square overflow-hidden bg-ink-card relative">
                  <img src={p.img} alt={p.title} loading="lazy"
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--color-ink-card), transparent)' }} />
                </div>
                <div className="p-5">
                  <div className="text-sm font-semibold text-paper">{p.title}</div>
                  <p className="text-xs text-paper-dim mt-1 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Stats */}
        <Reveal delay={0.4}>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { v: 100, s: 'W', l: 'Charging output' },
              { v: 12, s: 'V', l: 'Voltage' },
              { v: 24, s: '/7', l: 'Always on' },
              { v: 15, s: ' min', l: 'Install to live' },
            ].map((stat, i) => (
              <div key={i} className="p-8 rounded-2xl border-gradient hairline text-center hover:bg-ink-card transition-colors duration-300">
                <div className="font-display text-4xl font-bold text-paper">
                  <Counter to={stat.v} suffix={stat.s} />
                </div>
                <div className="text-[10px] text-paper-dim mt-3 tracking-[0.15em] uppercase">{stat.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER — carries the #contact anchor (Contact links land here).
   Four link columns: Product / Ecosystem / Developers / Legal.
   ═══════════════════════════════════════════════════════════ */
type FootLinkItem = { label: string; href: string } | { divider: true };

const FOOTER_COLS: { title: string; links: FootLinkItem[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Zunex Core', href: '/#product' },
      { label: 'Zunex Plus', href: '/#plus-media' },
      { label: 'Accessories', href: '/#product' },
      { label: 'Support', href: '/owner' },
    ],
  },
  {
    title: 'Ecosystem',
    links: [
      { label: 'Technology Partners', href: '/enterprise' },
      { label: 'Sustainability', href: '/#brand' },
      { divider: true },
      { label: 'Venue Solutions', href: '/enterprise' },
      { label: 'Installation Network', href: '/enterprise' },
      { label: 'Content Program', href: '/advertise' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Open API', href: '#' },
      { label: 'SDK & Widgets', href: '#' },
      { label: 'Dashboard', href: '/owner' },
      { label: 'Status · Changelog · GitHub', href: '#' },
    ],
  },
  {
    title: 'Legal & Policies',
    links: [
      { label: 'Terms · Privacy', href: '#' },
      { label: 'GDPR / CCPA', href: '#' },
      { label: 'Warranty · Returns', href: '/owner' },
      { label: 'Cookie Preferences', href: '#' },
    ],
  },
];

function FootLink({ href, label }: { href: string; label: string }) {
  const cls = 'text-[13px] text-paper-dim hover:text-paper transition-colors';
  if (href === '#') {
    return <a href="#" onClick={(e) => e.preventDefault()} data-hover className={cls}>{label}</a>;
  }
  return <Link to={href} data-hover className={cls}>{label}</Link>;
}

function Footer() {
  return (
    <footer id="contact" className="hairline-t py-16 relative overflow-hidden">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.1fr_2fr] gap-14 mb-16">
          {/* Brand block */}
          <div>
            <div className="flex items-center gap-3 text-paper mb-4">
              <Monogram size={32} variant="steel" />
              <Logotype className="h-5" />
            </div>
            <p className="text-[13px] text-paper-dim font-light leading-relaxed max-w-[240px]">
              Premium charging hardware. Beyond the expected.
            </p>
            <div className="text-[12px] text-paper-faint mt-8">© 2026 ZUNEX. All rights reserved.</div>
          </div>

          {/* Four link columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <div className="text-[10px] font-semibold tracking-[0.25em] uppercase text-paper-faint mb-5">{col.title}</div>
                <ul className="flex flex-col gap-3">
                  {col.links.map((l, i) =>
                    'divider' in l
                      ? <li key={`d${i}`} className="my-2 h-px w-6 bg-paper/15" aria-hidden="true" />
                      : <li key={l.label}><FootLink href={l.href} label={l.label} /></li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   HOMEPAGE — the single-page site
   ═══════════════════════════════════════════════════════════ */
function HomePage() {
  return (
    <main>
      <Hero />
      <Marquee />
      <FastCharge />
      <ProductShowcase />
      <PlusMediaHero />
      <BrandStory />
      <Technology />
    </main>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCROLL MANAGER — scroll to top on route change, or smooth
   to the anchor element when the location carries a hash.
   ═══════════════════════════════════════════════════════════ */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [pathname, hash, key]);
  return null;
}

/* ═══════════════════════════════════════════════════════════
   APP — router shell: shared chrome + one route per page
   ═══════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/owner" element={<OwnerPage />} />
        <Route path="/fast-charge" element={<FastChargePage />} />
        <Route path="/advertise" element={<AdvertisePage />} />
        <Route path="/enterprise" element={<EnterprisePage />} />
        <Route path="/roi" element={<RoiPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
