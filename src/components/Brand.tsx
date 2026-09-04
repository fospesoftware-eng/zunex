import { useEffect, useState, useRef } from 'react';

/** ZUNEX official wordmark — white version for dark backgrounds */
export function Logotype({ className = '' }: { className?: string }) {
  return (
    <img
      src="/brand/wordmark-white.svg"
      alt="ZUNEX"
      className={`w-auto object-contain ${className}`}
      draggable={false}
    />
  );
}

/** ZUNEX official monogram — mark only, no background container.
 *  steel = theme grey mark, paper = white/reversed mark */
export function Monogram({
  size = 40,
  variant = 'steel',
  className = '',
}: {
  size?: number;
  variant?: 'steel' | 'paper';
  className?: string;
}) {
  const color = variant === 'paper' ? 'var(--color-paper)' : 'var(--color-steel-bright)';
  return (
    <span
      role="img"
      aria-label="ZUNEX"
      className={`inline-block shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        WebkitMask: 'url(/brand/mark.svg) no-repeat center / contain',
        mask: 'url(/brand/mark.svg) no-repeat center / contain',
      }}
    />
  );
}

/** Official e-arrow mark — tintable via color prop */
export function Mark({ size = 40, className = '', color = 'rgba(244,243,239,0.12)' }: { size?: number; className?: string; color?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        WebkitMask: 'url(/brand/mark.svg) no-repeat center / contain',
        mask: 'url(/brand/mark.svg) no-repeat center / contain',
      }}
    />
  );
}

/** Custom cursor — minimal dot only */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dotRef.current) dotRef.current.style.transform = `translate(${e.clientX - 2.5}px, ${e.clientY - 2.5}px)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return <div ref={dotRef} className="cursor-dot hidden md:block" />;
}

/** Scroll progress — thin steel gradient line */
export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setP((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[1.5px]">
      <div className="h-full transition-[width] duration-75" style={{
        width: `${p}%`,
        background: 'linear-gradient(90deg, var(--color-steel), var(--color-steel-bright))',
        boxShadow: '0 0 8px var(--color-steel-glow)',
      }} />
    </div>
  );
}

/** Counter — counts up on scroll into view */
export function Counter({ to, suffix = '', duration = 1800 }: { to: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [ref, setRef] = useState<HTMLSpanElement | null>(null);
  useEffect(() => {
    if (!ref) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = Date.now();
        const tick = () => {
          const t = Math.min((Date.now() - start) / duration, 1);
          setCount(Math.round(to * (1 - Math.pow(1 - t, 3))));
          if (t < 1) requestAnimationFrame(tick);
        };
        tick();
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref, to, duration]);
  return <span ref={setRef}>{count}{suffix}</span>;
}

/** Reveal — fade up on scroll into view */
export function Reveal({ children, delay = 0, y = 24, className = '' }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity 1s var(--ease-lux) ${delay}s, transform 1s var(--ease-lux) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/** Word-by-word cinematic reveal */
export function RevealWords({ text, className = '', delay = 0, stagger = 0.06 }: { text: string; className?: string; delay?: number; stagger?: number }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <h2 ref={ref} className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em', verticalAlign: 'top' }}>
          <span style={{
            display: 'inline-block',
            transform: visible ? 'translateY(0)' : 'translateY(110%)',
            opacity: visible ? 1 : 0,
            transition: `transform 0.9s var(--ease-lux) ${delay + i * stagger}s, opacity 0.9s var(--ease-lux) ${delay + i * stagger}s`,
          }}>{word}</span>
        </span>
      ))}
    </h2>
  );
}

/** Mesh gradient background — steel grey, subtle */
export function MeshBG({ variant = 'dark' }: { variant?: 'dark' | 'steel' }) {
  const orbs = variant === 'steel'
    ? [
        { w: 700, h: 700, top: '-15%', left: '10%', bg: 'rgba(107,114,128,0.1)', anim: 'float-soft 8s ease-in-out infinite' },
        { w: 500, h: 500, top: '50%', right: '-5%', bg: 'rgba(156,163,175,0.06)', anim: 'float-soft 10s ease-in-out infinite reverse' },
      ]
    : [
        { w: 600, h: 600, top: '20%', left: '50%', bg: 'rgba(107,114,128,0.05)', anim: 'float-soft 12s ease-in-out infinite' },
        { w: 400, h: 400, bottom: '10%', left: '20%', bg: 'rgba(156,163,175,0.03)', anim: 'float-soft 9s ease-in-out infinite reverse' },
      ];
  return (
    <div className="mesh-bg">
      {orbs.map((o, i) => (
        <div key={i} className="mesh-orb" style={{
          width: o.w, height: o.h, top: o.top, left: o.left, right: (o as any).right, bottom: (o as any).bottom,
          background: o.bg, animation: o.anim,
        }} />
      ))}
    </div>
  );
}
