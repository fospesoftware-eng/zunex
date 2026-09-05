import React, { useRef, useState } from 'react';
import { MeshBG, Reveal } from './Brand';
import { useChargeCycle } from '../hooks/useChargeCycle';

/* Official ZUNEX mark paths (from brand svg), viewBox 0 0 519 519 */
export const MARK_PATHS = [
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
    <section className="relative flex flex-col justify-center py-16 lg:py-24 overflow-hidden noise-bg">
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

export default FastCharge;
