import { Link } from 'react-router-dom';
import { MeshBG, Reveal, Counter } from '../components/Brand';

/* ═══════════════════════════════════════════════════════════
   OWNER — everything a ZUNEX owner needs in one place.
   ═══════════════════════════════════════════════════════════ */
export default function OwnerPage() {
  const perks = [
    {
      title: 'Guided setup',
      desc: 'From box to first charge in minutes. Scan the QR on your device, pair it once, and the ZUNEX app walks you through placement, Wi-Fi and firmware.',
    },
    {
      title: 'Owner dashboard',
      desc: 'Live charge status, session history, energy stats and firmware updates for every ZUNEX unit you own — Core, Plus and accessories together.',
    },
    {
      title: 'Care & warranty',
      desc: 'Two-year warranty on every device. Returns, replacements and repairs are handled from the dashboard — no phone calls, no forms.',
    },
  ];

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative min-h-[80svh] flex flex-col justify-center overflow-hidden noise-bg">
        <MeshBG variant="steel" />
        <div className="relative max-w-container mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-[11px] font-semibold text-steel-bright tracking-[0.25em] uppercase mb-6">Owner</div>
          </Reveal>
          {/* Plain Reveal — background-clip:text breaks on RevealWords' nested spans (renders invisible) */}
          <Reveal delay={0.1}>
            <h2 className="font-display text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-gradient-lux max-w-3xl mb-8">
              Your ZUNEX, fully in hand.
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-lg text-paper-soft font-light leading-relaxed max-w-xl mb-10">
              Setup, live status, updates and warranty — one place for everything your devices do. Built for people who own a ZUNEX, not just buy one.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <Link to="/contact" data-hover
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[13px] font-semibold tracking-wide bg-paper text-ink hover:bg-steel hover:text-paper transition-all duration-500">
              Get in touch
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Perks */}
      <section className="relative py-28 noise-bg overflow-hidden">
        <MeshBG variant="dark" />
        <div className="relative max-w-container mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {perks.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.12}>
                <div className="group p-8 rounded-3xl border-gradient hairline hover:bg-ink-card transition-all duration-500 h-full">
                  <div className="font-display text-2xl font-bold text-steel-bright mb-5">0{i + 1}</div>
                  <div className="text-sm font-semibold text-paper mb-2">{p.title}</div>
                  <p className="text-sm text-paper-soft leading-relaxed font-light">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Stats */}
          <Reveal delay={0.2}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { v: 2, s: '-year', l: 'Warranty' },
                { v: 24, s: '/7', l: 'Support' },
                { v: 99, s: '.9%', l: 'Dashboard uptime' },
                { v: 15, s: ' min', l: 'Average setup' },
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
    </main>
  );
}
