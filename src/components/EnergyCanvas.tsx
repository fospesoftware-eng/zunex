import { useEffect, useRef } from 'react';

/** Animated particle/energy field canvas — signal-colored particles flowing upward */
export function EnergyCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0, dpr = window.devicePixelRatio || 1;
    const particles: Array<{ x: number; y: number; vx: number; vy: number; r: number; life: number; maxLife: number }> = [];

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Spawn particles
    const spawn = () => {
      const count = Math.floor((w * h) / 18000);
      while (particles.length < count) {
        particles.push({
          x: Math.random() * w,
          y: h + Math.random() * 100,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -(0.2 + Math.random() * 0.6),
          r: 0.5 + Math.random() * 1.5,
          life: 0,
          maxLife: 200 + Math.random() * 300,
        });
      }
    };

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.vx += (Math.random() - 0.5) * 0.01;

        if (p.life > p.maxLife || p.y < -20) {
          particles.splice(i, 1);
          continue;
        }

        const fadeIn = Math.min(p.life / 40, 1);
        const fadeOut = Math.min((p.maxLife - p.life) / 60, 1);
        const alpha = fadeIn * fadeOut * 0.4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(36, 71, 255, ${alpha})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        grad.addColorStop(0, `rgba(77, 107, 255, ${alpha * 0.3})`);
        grad.addColorStop(1, 'rgba(36, 71, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />;
}
