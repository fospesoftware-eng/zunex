import { useRef, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { Logotype, Monogram, Mark, ScrollProgress, Counter, Reveal, RevealWords, CustomCursor, MeshBG } from './components/Brand';
import { useMousePosition, useScrollProgress, useMagnetic } from './hooks/usePremium';

/* ══ NAV ══ */
// (Navbar stays as-is but let me rebuild inline for cleaner control)

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

  // Parallax transforms
  const textX = mouse.x * 6;
  const textY = mouse.y * 6 + (1 - progress) * 40;
  const monoX = mouse.x * 30;
  const monoY = mouse.y * 30 - progress * 100;
  const monoScale = 1 - progress * 0.3;
  const monoOpacity = 1 - progress * 1.5;

  return (
    <section id="top" ref={scrollRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise-bg">
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
            <span className="text-[10px] font-medium text-paper-dim tracking-[0.25em] uppercase">Charging · Media · Beyond</span>
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
            One brand. Multiple business possibilities. Engineered for a world that moves beyond convention.
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
type ChargePhase = 'idle' | 'charging' | 'charged';

function useChargeCycle() {
  const [phase, setPhase] = useState<ChargePhase>('idle');
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (phase !== 'charging') return;
    const id = setInterval(() => setPct((p) => Math.min(100, p + 1)), 34);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (pct === 100 && phase === 'charging') setPhase('charged');
  }, [pct, phase]);

  useEffect(() => {
    if (phase !== 'charged') return;
    const t = setTimeout(() => { setPhase('idle'); setPct(0); }, 2400);
    return () => clearTimeout(t);
  }, [phase]);

  return { phase, pct, start: () => setPhase((s) => (s === 'idle' ? 'charging' : s)) };
}

/* Official ZUNEX mark paths (from brand svg), viewBox 0 0 519 519 */
const MARK_PATHS = [
  'M198.94,208.97c-32.11.15-55.56,26.95-55.75,56.59-.2,30.94,22.31,55.77,53.93,58.28l68.58.05.04,36.14-70.14.02c-43.48-2.45-79.51-33.4-88.24-76.11-11.74-57.42,34.26-111.14,90.94-111.26l67.38-.2.11,36.06-66.85.43Z',
  'M130.75 248.57 369.77 248.56 369.8 283.2 130.76 283.2 130.76 284.17',
  'M411.32 265.59 342.08 172.74 287.58 172.82 360.25 266.16 287.18 359.83 340.84 359.91 411.32 265.59',
];

function FastCharge() {
  const { phase, pct, start } = useChargeCycle();
  const charging = phase === 'charging';
  const charged = phase === 'charged';
  const fillH = (pct * 1.02).toFixed(1);
  const cablePath = 'M 546 378 C 750 378, 850 468, 975 480 C 1080 489, 1170 490, 1235 478';
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
    <section className="relative min-h-[92svh] flex flex-col justify-center py-16 lg:py-20 overflow-hidden noise-bg">
      <MeshBG variant="steel" />

      {/* tiny header label */}
      <div className="relative max-w-container mx-auto px-6 lg:px-8 text-center mb-4">
        <Reveal>
          <div className="text-[10px] font-semibold text-steel-bright tracking-[0.28em] uppercase">Fast charging — 65W USB-C PD</div>
        </Reveal>
      </div>

      {/* full-width 3D scene */}
      <Reveal delay={0.15}>
        <div
          ref={sceneRef}
          className="relative w-full max-w-[1500px] mx-auto px-4"
          style={{ perspective: '1600px' }}
          onMouseMove={onTilt}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        >
          {/* "Tap · Charge · Beyond" as giant two-line background text — hero-style solid fill, fading into the theme */}
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
              TAP · CHARGE
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
              BEYOND
            </span>
          </div>

          {/* editorial corner marks + vertical edge labels */}
          <span className="absolute top-4 left-5 text-paper/25 text-base font-thin select-none pointer-events-none">+</span>
          <span className="absolute top-4 right-5 text-paper/25 text-base font-thin select-none pointer-events-none">+</span>
          <span className="absolute bottom-4 left-5 text-paper/25 text-base font-thin select-none pointer-events-none">+</span>
          <span className="absolute bottom-4 right-5 text-paper/25 text-base font-thin select-none pointer-events-none">+</span>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none select-none">
            <span className="text-[9px] font-semibold tracking-[0.4em] uppercase text-paper/30" style={{ writingMode: 'vertical-rl' }}>Zunex One · 65W Wireless</span>
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none select-none">
            <span className="text-[9px] font-semibold tracking-[0.4em] uppercase text-paper/30" style={{ writingMode: 'vertical-rl' }}>iPhone 17 · USB-C PD 3.0</span>
          </div>

          <div className="relative" style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transformStyle: 'preserve-3d', transition: 'transform 0.25s ease-out' }}>
            <svg viewBox="40 60 1440 450" className="w-full h-auto" fill="none" role="img" aria-label="ZUNEX hub fast charging an iPhone 17 — tap the QR code to start">
              <defs>
                <radialGradient id="portGlow">
                  <stop offset="0%" stopColor="#C5C9D0" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#6B7280" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="packetGlow">
                  <stop offset="0%" stopColor="#C5C9D0" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#6B7280" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="groundGlow">
                  <stop offset="0%" stopColor="#6B7280" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#6B7280" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="glintGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
                <clipPath id="hubClip">
                  <rect x="150" y="280" width="320" height="173" rx="14" />
                </clipPath>
                <linearGradient id="fillGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#4B5563" />
                  <stop offset="100%" stopColor="#C5C9D0" />
                </linearGradient>
                <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#15151A" />
                  <stop offset="100%" stopColor="#0A0A0E" />
                </linearGradient>
                <linearGradient id="phoneBody" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#87878E" />
                  <stop offset="50%" stopColor="#55555C" />
                  <stop offset="100%" stopColor="#3E3E45" />
                </linearGradient>
                <filter id="softBlur" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="9" />
                </filter>
                <filter id="hubShadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#000000" floodOpacity="0.55" />
                </filter>
                <filter id="reflBlur" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" />
                </filter>
                <linearGradient id="floorLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6B7280" stopOpacity="0" />
                  <stop offset="50%" stopColor="#6B7280" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#6B7280" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="reflGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
                <mask id="reflFade">
                  <rect x="150" y="453" width="320" height="90" fill="url(#reflGrad)" />
                </mask>
              </defs>

              {/* studio floor line */}
              <line x1="60" y1="486" x2="1380" y2="486" stroke="url(#floorLine)" strokeWidth="1" />

              {/* ambient floor glow — brightens while charging */}
              <ellipse cx="700" cy="470" rx="520" ry="34" fill="url(#groundGlow)"
                style={{ opacity: charging ? 1 : 0.35, transition: 'opacity 0.8s ease' }} />

              {/* ═══ cable hub → iPhone — original cable look, connection behind the device ═══ */}
              <path d={cablePath} stroke="#1C1C21" strokeWidth="6.5" strokeLinecap="round" />
              <path d={cablePath} stroke="#38383F" strokeWidth="2" strokeLinecap="round" opacity="0.55" />

              {/* electrifying charge — minimal arrows */}
              {charging && (
                <>
                  {[0, 1.2].map((begin) => (
                    <g key={begin}>
                      <circle r="5" fill="url(#packetGlow)">
                        <animateMotion dur="2.4s" begin={`${begin}s`} repeatCount="indefinite" path={cablePath} />
                      </circle>
                      <g opacity="0.8">
                        <animateMotion dur="2.4s" begin={`${begin}s`} repeatCount="indefinite" path={cablePath} rotate="auto" />
                        <path d="M -3.5 -3 L 4 0 L -3.5 3 L -1.5 0 Z" fill="#AEB2BA" />
                      </g>
                    </g>
                  ))}
                  {/* 65W badge on cable */}
                  <g opacity="0.9" style={{ animation: 'fade-in-soft 0.4s ease-out both' }}>
                    <rect x="767" y="414" width="46" height="21" rx="10.5" fill="#101014" stroke="#2E2E34" strokeWidth="1" />
                    <text x="790" y="428" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="9.5" letterSpacing="1" fill="#AEB2BA">65W</text>
                  </g>
                </>
              )}

              {/* ═══ ZUNEX ONE — original device photo with 3D depth ═══ */}
              <g style={{ animation: 'float-soft 7s ease-in-out infinite' }}>
               <g transform="translate(170,230) scale(1.34375) translate(-150,-280)">
                {/* ground shadow */}
                <ellipse cx="310" cy="458" rx="175" ry="11" fill="#000" opacity="0.5" filter="url(#softBlur)" />
                {/* photo with depth shadow */}
                <g>
                  <image href="/products/hub-cutout.png?v=2" x="150" y="280" width="320" height="173" filter="url(#hubShadow)" />
                  {/* glass glint sweeping across the device */}
                  <g clipPath="url(#hubClip)">
                    <rect x="130" y="275" width="46" height="183" fill="url(#glintGrad)"
                      style={{ animation: 'glint-sweep 5.5s ease-in-out infinite' }} />
                  </g>
                </g>

                {/* studio floor reflection — flipped, blurred, fading */}
                <image href="/products/hub-cutout.png?v=2" x="150" y="280" width="320" height="173"
                  transform="translate(0,906) scale(1,-1)" mask="url(#reflFade)" opacity="0.16" filter="url(#reflBlur)" />

                {/* wireless ripples from the pad while charging */}
                {charging && (
                  <g stroke="#8E929B" fill="none" strokeWidth="1.2">
                    {[0, 1.1].map((d) => (
                      <circle key={d} cx="236" cy="365" r="28"
                        style={{ animation: `hub-ripple 2.2s ease-out ${d}s infinite`, transformBox: 'fill-box', transformOrigin: 'center' }} />
                    ))}
                  </g>
                )}

                {/* ── QR tap target (over the photo's QR) ── */}
                <g
                  onClick={start}
                  style={{ cursor: charging ? 'default' : 'pointer' }}
                  role="button"
                  aria-label="Tap the QR code to start charging"
                >
                  {phase === 'idle' && (
                    <>
                      <rect x="324" y="396" width="36" height="36" rx="6" fill="none" stroke="#9CA3AF" strokeWidth="1"
                        style={{ animation: 'qr-ping 1.6s ease-out infinite', transformBox: 'fill-box', transformOrigin: 'center' }} />
                      <text x="342" y="468" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="10" letterSpacing="2.5" fill="#6E6E76" style={{ animation: 'pulse-soft 1.6s ease-in-out infinite' }}>
                        TAP QR TO CHARGE
                      </text>
                    </>
                  )}
                  <rect x="329" y="401" width="27" height="27" rx="4" fill="#F4F3EF" opacity={charging ? 0.16 : 0.08} />
                  <rect x="324" y="396" width="36" height="36" rx="6" fill="transparent" />
                </g>
               </g>
              </g>

              {/* ═══ iPhone 17 — realistic proportions (71.5 × 149.6 mm ≈ 155 × 325) ═══ */}
              <g style={{ animation: 'float-soft 7s ease-in-out -3.5s infinite' }}>
               <g transform="translate(1140,60) scale(1.258) translate(-1160,-88)">
                {/* ground shadow */}
                <ellipse cx="1237" cy="432" rx="90" ry="12" fill="#000" opacity="0.5" filter="url(#softBlur)" />
                {/* extruded side */}
                <rect x="1160" y="96" width="155" height="325" rx="28" fill="#1F1F24" />
                {/* side buttons */}
                <rect x="1156" y="118" width="4" height="24" rx="2" fill="#3C3C43" />
                <rect x="1156" y="152" width="4" height="36" rx="2" fill="#3C3C43" />
                <rect x="1156" y="196" width="4" height="36" rx="2" fill="#3C3C43" />
                <rect x="1315" y="146" width="4" height="58" rx="2" fill="#3C3C43" />
                {/* frame */}
                <rect x="1160" y="88" width="155" height="325" rx="28" fill="url(#phoneBody)" />
                <rect x="1163" y="91" width="149" height="319" rx="25" fill="#050507" />
                {/* screen — clear surface with defined border */}
                <rect x="1168" y="96" width="139" height="309" rx="20" fill="url(#screenGrad)" stroke="#4A4A52" strokeWidth="1.25" />
                <rect x="1171" y="99" width="133" height="303" rx="17" fill="none" stroke="#2A2A31" strokeWidth="0.75" />
                {/* dynamic island */}
                <rect x="1214" y="108" width="47" height="14.5" rx="7.25" fill="#020203" />

                {/* idle — sleeping screen */}
                {phase === 'idle' && (
                  <g opacity="0.55">
                    <g transform="translate(1216,186) scale(0.081)" fill="#3C3C43">
                      {MARK_PATHS.map((d, i) => <path key={i} d={d} />)}
                    </g>
                  </g>
                )}

                {/* charging — all content inside the screen */}
                {charging && (
                  <g style={{ animation: 'fade-in-soft 0.3s ease-out both' }}>
                    {/* battery */}
                    <rect x="1228" y="144" width="18" height="6" rx="2.5" fill="#B9BDC4" />
                    <rect x="1204" y="150" width="66" height="110" rx="12" stroke="#B9BDC4" strokeWidth="2.5" fill="none" />
                    <rect x="1209" y={256 - Number(fillH)} width="56" height={fillH} rx="6" fill="url(#fillGrad)" style={{ transition: 'height 0.12s linear, y 0.12s linear' }} />
                    {/* bolt */}
                    <g style={{ animation: 'pulse-soft 1.4s ease-in-out infinite' }}>
                      <path d="M1243 178 L1228 208 h8.5 l-4.5 24 15-28 h-8.5 l7-26 Z" fill="#F4F3EF" opacity="0.95" />
                    </g>
                    {/* readout */}
                    <text x="1237" y="298" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="34" fill="#F4F3EF">{pct}%</text>
                    <text x="1237" y="320" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="8.5" letterSpacing="2.5" fill="#C5C9D0">FAST CHARGING</text>
                    {/* hint bars */}
                    <g opacity="0.75">
                      {[0, 1, 2].map((i) => (
                        <rect key={i} x={1216 + i * 15} y="338" width="9" height="4" rx="2" fill="#9CA3AF"
                          style={{ animation: `pulse-soft 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                      ))}
                    </g>
                  </g>
                )}

                {/* charged — completed effect */}
                {charged && (
                  <g style={{ animation: 'fade-in-soft 0.35s ease-out both' }}>
                    {/* flash */}
                    <rect x="1168" y="96" width="139" height="309" rx="20" fill="#F4F3EF" style={{ animation: 'screen-flash 0.9s ease-out forwards' }} />
                    {/* ring bursts */}
                    {[0, 0.25].map((d) => (
                      <circle key={d} cx="1237" cy="205" r="56" stroke="#9CA3AF" strokeWidth="1.5" fill="none"
                        style={{ animation: `ring-burst 1s ease-out ${d}s forwards`, transformBox: 'fill-box', transformOrigin: 'center' }} />
                    ))}
                    {/* ZUNEX symbol */}
                    <g transform="translate(1165,137) scale(0.28)" fill="#B9BDC4" opacity="0.95">
                      {MARK_PATHS.map((d, i) => <path key={i} d={d} />)}
                    </g>
                    <text x="1237" y="296" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="26" fill="#F4F3EF">100%</text>
                    <text x="1237" y="318" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="8.5" letterSpacing="2.5" fill="#C5C9D0">FULLY CHARGED</text>
                  </g>
                )}

                {/* port glow + port slot — socket on the bottom edge, facing down */}
                {charging && (
                  <circle cx="1237" cy="414" r="18" fill="url(#portGlow)" style={{ animation: 'port-glow 1.6s ease-in-out infinite', transformOrigin: '1237px 414px' }} />
                )}
                <rect x="1226" y="410" width="22" height="7" rx="3.5" stroke="#6E6E76" strokeWidth="1.5" fill="#0D0D10" />
               </g>
              </g>
            </svg>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PRODUCT SHOWCASE — Full-screen pinned scroll sections
   ═══════════════════════════════════════════════════════════ */
function ProductShowcase() {
  const products = [
    {
      name: 'ZUNEX ONE',
      tag: 'Charging',
      mono: 'steel' as const,
      title: 'Pure power.\nDelivered clean.',
      desc: 'The flagship charging hub. USB-C PD and 12V output in bead-blasted anodised aluminium. Laser-etched branding on every surface.',
      img: '/products/hub.jpg',
      specs: ['65W Output', 'USB-C PD', '12V Adapter', 'Anodised aluminium'],
    },
    {
      name: 'ZUNEX MEDIA',
      tag: 'Charging + Advertising',
      mono: 'paper' as const,
      title: 'Charge devices.\nMonetise attention.',
      desc: 'The same hub with an integrated display module. Serve ads and content while devices charge. One platform, two revenue streams.',
      img: '/products/display.jpg',
      specs: ['Display module', 'Ad delivery', 'Dual revenue', 'Content ready'],
    },
  ];

  return (
    <section id="product" className="relative">
      {products.map((p, i) => {
        const { ref, progress } = useScrollProgressOnView();
        return (
          <div
            key={i}
            ref={ref}
            className="min-h-screen flex items-center relative overflow-hidden noise-bg"
            style={{ background: i === 0 ? 'var(--color-ink)' : 'var(--color-ink-elevated)' }}
          >
            <MeshBG variant="dark" />
            <div className="relative max-w-container mx-auto px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Text */}
              <div className={i === 1 ? 'lg:order-2' : ''}>
                <Reveal>
                  <div className="flex items-center gap-3 mb-6">
                    <Monogram size={28} variant={p.mono} />
                    <span className="text-[11px] font-semibold text-steel-bright tracking-[0.2em] uppercase">{p.name}</span>
                  </div>
                </Reveal>
                <RevealWords
                  text={p.title.replace('\n', ' ')}
                  className="font-display text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-paper mb-6"
                  stagger={0.08}
                />
                <Reveal delay={0.3}>
                  <p className="text-base md:text-lg text-paper-soft font-light leading-relaxed max-w-md mb-8">{p.desc}</p>
                </Reveal>
                <Reveal delay={0.4}>
                  <div className="flex flex-wrap gap-3">
                    {p.specs.map((s) => (
                      <span key={s} className="text-[11px] px-4 py-2 rounded-full hairline text-paper-dim tracking-wide">{s}</span>
                    ))}
                  </div>
                </Reveal>
              </div>

              {/* Floating product image with parallax */}
              <div className={`relative ${i === 1 ? 'lg:order-1' : ''}`}>
                <Reveal delay={0.2}>
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-gradient hairline"
                    style={{
                      transform: `translateY(${(progress - 0.5) * -60}px) scale(${0.9 + progress * 0.1})`,
                      transition: 'transform 0.1s ease-out',
                    }}
                  >
                    <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover" style={{ opacity: 0.7 }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(8,8,10,0.3) 0%, transparent 50%, rgba(8,8,10,0.5) 100%)' }} />
                    {/* Glow */}
                    <div className="absolute -inset-4 -z-10 rounded-3xl" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(107,114,128,0.08), transparent 70%)', filter: 'blur(40px)' }} />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        );
      })}
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
   FULL RANGE — Parallax wide image
   ═══════════════════════════════════════════════════════════ */
function FullRange() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  return (
    <div ref={ref} className="relative h-[80vh] overflow-hidden">
      <img
        src="/products/range.jpg"
        alt="ZUNEX full product range"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: 0.4 + progress * 0.4,
          transform: `scale(${1.15 - progress * 0.1}) translateY(${(0.5 - progress) * 60}px)`,
        }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, var(--color-ink) 0%, transparent 30%, transparent 70%, var(--color-ink) 100%)' }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <Reveal>
          <div className="text-center">
            <div className="text-[11px] font-semibold text-steel-bright tracking-[0.25em] uppercase mb-4">The full range</div>
            <p className="font-display text-[clamp(1.5rem,4vw,3rem)] font-bold text-paper max-w-2xl mx-auto leading-tight tracking-[-0.02em]">
              Hub, coiled cable, 12V adapter, display module.
            </p>
            <p className="mt-4 text-paper-soft text-sm font-light">One mark per surface. Never both.</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   BRAND STORY — Editorial split layout
   ═══════════════════════════════════════════════════════════ */
function BrandStory() {
  return (
    <section id="brand" className="relative py-32 lg:py-48 noise-bg overflow-hidden bg-ink-elevated">
      <MeshBG variant="dark" />
      <div className="relative max-w-container mx-auto px-6 lg:px-8">
        {/* Section label */}
        <Reveal>
          <div className="text-[11px] font-semibold text-steel-bright tracking-[0.25em] uppercase mb-6">01 — Naming</div>
        </Reveal>

        {/* Massive editorial heading */}
        <RevealWords
          text="A compact, global-sounding name with a distinctly future-facing character."
          className="font-display text-[clamp(1.8rem,4.5vw,4rem)] font-bold leading-[1.1] tracking-[-0.03em] text-paper max-w-4xl mb-20"
          stagger={0.04}
        />

        {/* Name architecture — 3 columns */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            { symbol: 'ZUN', title: 'Distinctive sound', desc: 'Sits on the Germanic root behind sun — zon in Dutch, zun in Yiddish, Sonne in German. Energy at its source.' },
            { symbol: 'EX', title: 'Forward-looking', desc: 'Next, exceed, exchange. The terminal E resolves into an arrow — the mark itself draws the idea.' },
            { symbol: '尊', title: 'Honour and prestige', desc: 'In Mandarin, zūn carries honour and prestige — the syllable behind zūnxiǎng, the standard term for premium.' },
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

        {/* Philosophy */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <Reveal>
              <div className="text-[11px] font-semibold text-steel-bright tracking-[0.25em] uppercase mb-6">02 — Philosophy</div>
            </Reveal>
            <RevealWords
              text="Beyond the expected."
              className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-tight tracking-[-0.03em] text-gradient-lux mb-8"
            />
            <Reveal delay={0.3}>
              <p className="text-lg text-paper-soft leading-relaxed font-light">
                A promise broad enough to grow with the brand. Category-free, so it carries the charging hub, the display unit, and whatever follows. This is a charging brand, not a solar one — no rays, no discs, no warm gradients.
              </p>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Never rebuild', desc: 'The logotype is one fixed piece of artwork. Always place the supplied file.' },
              { title: 'One mark per surface', desc: 'Logotype on the brand plate, monogram on hardware. Never both.' },
              { title: '4.5:1 contrast', desc: 'The mark must clear 4.5:1 against whatever sits behind it. Always.' },
              { title: 'Superellipse only', desc: 'Corner radius fixed at 26.8%. Never a circle, never a plain square.' },
            ].map((p, i) => (
              <Reveal key={i} delay={0.2 + i * 0.1}>
                <div className="p-6 rounded-2xl border-gradient hairline hover:border-steel/30 transition-colors duration-500">
                  <div className="text-sm font-semibold text-paper mb-1.5">{p.title}</div>
                  <p className="text-xs text-paper-dim leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPONENTS GRID — Technology
   ═══════════════════════════════════════════════════════════ */
function Technology() {
  const parts = [
    { img: '/products/adapter.jpg', title: 'Adapter collar', desc: '12V output. Monogram on the connector.' },
    { img: '/products/cable.jpg', title: 'Cable end', desc: 'Coiled cable. USB-C housing with etched mark.' },
    { img: '/products/tappad.jpg', title: 'Tap pad', desc: 'Contact surface. Precision-machined.' },
    { img: '/products/brandplate.jpg', title: 'Brand plate', desc: 'Logotype on the plate. One mark per surface.' },
  ];
  return (
    <section id="tech" className="relative py-32 lg:py-48 noise-bg overflow-hidden">
      <MeshBG variant="dark" />
      <div className="relative max-w-container mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="text-[11px] font-semibold text-steel-bright tracking-[0.25em] uppercase mb-6">03 — Technology</div>
        </Reveal>
        <RevealWords
          text="The mark in use."
          className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-tight tracking-[-0.03em] text-paper mb-6"
        />
        <Reveal delay={0.3}>
          <p className="text-lg text-paper-soft font-light leading-relaxed max-w-xl mb-16">
            Logotype on the brand plate, monogram on hardware too small to carry it. Every component is designed, branded, and finished to the same standard.
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
              { v: 4, s: '', l: 'Colorways' },
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
   BUSINESS MODELS — Two massive panels
   ═══════════════════════════════════════════════════════════ */
function BusinessModels() {
  return (
    <section id="business" className="relative py-32 lg:py-48 noise-bg overflow-hidden bg-ink-elevated">
      <MeshBG variant="steel" />
      <div className="relative max-w-container mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="text-[11px] font-semibold text-steel-bright tracking-[0.25em] uppercase mb-6">04 — Business</div>
        </Reveal>
        <RevealWords
          text="Two models. One platform."
          className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-tight tracking-[-0.03em] text-paper mb-16"
        />

        <div className="grid lg:grid-cols-2 gap-6">
          {[
            {
              mono: 'steel' as const,
              name: 'ZUNEX ONE',
              tag: 'Charging',
              desc: 'Deploy charging hubs in high-traffic locations. Monetise through charging fees. Pure, focused, reliable.',
              items: ['Per-charge revenue', 'Location partnerships', 'Subscription models', 'Fleet deployment'],
            },
            {
              mono: 'paper' as const,
              name: 'ZUNEX MEDIA',
              tag: 'Charging + Advertising',
              desc: 'Add a display module to the same hub. Serve ads and content while devices charge. Double the revenue, same footprint.',
              items: ['Ad delivery revenue', 'Charging fees', 'Content partnerships', 'Sponsorship slots'],
            },
          ].map((model, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="group relative p-10 lg:p-12 rounded-3xl border-gradient hairline overflow-hidden hover:border-steel/30 transition-all duration-500 h-full">
                <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-[100px] opacity-50 group-hover:opacity-80 transition-opacity duration-700"
                  style={{ background: model.mono === 'steel' ? 'rgba(107,114,128,0.1)' : 'rgba(244,243,239,0.04)' }} />
                <div className="relative">
                  <Monogram size={44} variant={model.mono} />
                  <h3 className="mt-8 font-display text-3xl font-bold text-paper">{model.name}</h3>
                  <p className={`text-sm font-medium mt-1 ${model.mono === 'steel' ? 'text-steel-bright' : 'text-paper-soft'}`}>{model.tag}</p>
                  <p className="mt-5 text-paper-soft leading-relaxed text-sm font-light">{model.desc}</p>
                  <div className="mt-8 space-y-3">
                    {model.items.map((item) => (
                      <div key={item} className="flex items-center gap-3 text-sm text-paper-soft">
                        <span className="w-1 h-1 rounded-full" style={{ background: model.mono === 'steel' ? 'var(--color-steel-bright)' : 'var(--color-paper)' }} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CTA — Full screen, centered, cinematic
   ═══════════════════════════════════════════════════════════ */
function CTA() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  return (
    <section id="contact" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden noise-bg">
      <MeshBG variant="steel" />

      {/* Parallax giant official mark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ transform: `scale(${1 + progress * 0.4})`, opacity: 0.05 }}>
        <Mark size={680} color="var(--color-paper)" />
      </div>

      <div className="relative z-10 text-center px-6">
        <Reveal>
          <div className="inline-block mb-10" style={{ animation: 'pulse-soft 3s ease-in-out infinite' }}>
            <Monogram size={52} variant="steel" />
          </div>
        </Reveal>
        <div style={{ overflow: 'hidden' }}>
          <Reveal delay={0.1} y={50}>
            <h2 className="font-display font-bold tracking-[-0.04em] leading-[0.9] text-paper" style={{ fontSize: 'clamp(2.5rem, 10vw, 9rem)' }}>
              Beyond the
            </h2>
          </Reveal>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <Reveal delay={0.2} y={50}>
            <h2 className="font-display font-bold tracking-[-0.04em] leading-[0.9] text-shimmer" style={{ fontSize: 'clamp(2.5rem, 10vw, 9rem)' }}>
              expected.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.35}>
          <p className="mt-10 text-lg text-paper-soft max-w-md mx-auto font-light leading-relaxed">
            Whether you need charging, media, or both — ZUNEX is engineered to fit.
          </p>
        </Reveal>
        <Reveal delay={0.5}>
          <div className="mt-12 flex items-center justify-center gap-4">
            <MagneticLink href="mailto:hello@zunex.com" primary>
              Get in touch
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </MagneticLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="hairline-t py-16 relative overflow-hidden">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-14">
          <div className="flex items-center gap-3 text-paper">
            <Monogram size={32} variant="steel" />
            <Logotype className="h-5" />
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {['Product', 'Brand', 'Technology', 'Business', 'Contact'].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} data-hover className="text-[13px] text-paper-dim hover:text-paper transition-colors">{l}</a>
            ))}
          </div>
          <div className="text-[12px] text-paper-dim">© 2026 ZUNEX</div>
        </div>

        {/* Wordmark lockup */}
        <div className="pt-10 hairline-t">
          <Reveal>
            <div className="flex flex-col items-center gap-8 py-12">
              <Logotype className="h-12 md:h-16 opacity-90" />
              <p className="text-[10px] tracking-[0.35em] uppercase text-paper-faint">Beyond the expected</p>
            </div>
          </Reveal>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <FastCharge />
        <ProductShowcase />
        <FullRange />
        <BrandStory />
        <Technology />
        <BusinessModels />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
