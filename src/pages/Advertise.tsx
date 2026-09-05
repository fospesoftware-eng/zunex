import { Link } from 'react-router-dom';
import { MeshBG, Reveal, Counter } from '../components/Brand';

/* ═══════════════════════════════════════════════════════════
   ADVERTISE — the ZUNEX screen network for brands.
   ═══════════════════════════════════════════════════════════ */
export default function AdvertisePage() {
  const formats = [
    {
      title: 'LCD video placements',
      desc: 'Full-motion campaigns on every ZUNEX PLUS LCD — played at the exact moment of attention: while people wait for their charge to complete.',
    },
    {
      title: 'QR landing takeovers',
      desc: 'The tap-to-charge QR opens on your landing page first. One scan, one redirect — measurable, attributable, instant.',
    },
    {
      title: 'Venue targeting',
      desc: 'Choose venues by category, city or footfall. Cafés, gyms, hotels, airports — your campaign plays where your audience actually is.',
    },
  ];

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative min-h-[80svh] flex flex-col justify-center overflow-hidden noise-bg">
        <MeshBG variant="steel" />
        <div className="relative max-w-container mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-[11px] font-semibold text-steel-bright tracking-[0.25em] uppercase mb-6">Advertise</div>
          </Reveal>
          {/* Plain Reveal — background-clip:text breaks on RevealWords' nested spans (renders invisible) */}
          <Reveal delay={0.1}>
            <h2 className="font-display text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-gradient-lux max-w-3xl mb-8">
              Your brand, on every charge.
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-lg text-paper-soft font-light leading-relaxed max-w-xl mb-10">
              The ZUNEX network turns charging time into attention time. Premium screens in premium venues, playing your campaign to a captive, phone-in-hand audience.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <Link to="/contact" data-hover
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[13px] font-semibold tracking-wide bg-paper text-ink hover:bg-steel hover:text-paper transition-all duration-500">
              Book the network
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Formats */}
      <section className="relative py-28 noise-bg overflow-hidden">
        <MeshBG variant="dark" />
        <div className="relative max-w-container mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {formats.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.12}>
                <div className="group p-8 rounded-3xl border-gradient hairline hover:bg-ink-card transition-all duration-500 h-full">
                  <div className="font-display text-2xl font-bold text-steel-bright mb-5">0{i + 1}</div>
                  <div className="text-sm font-semibold text-paper mb-2">{f.title}</div>
                  <p className="text-sm text-paper-soft leading-relaxed font-light">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Stats */}
          <Reveal delay={0.2}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { v: 100, s: '%', l: 'Viewable by design' },
                { v: 90, s: 's', l: 'Average dwell time' },
                { v: 4, s: ' min', l: 'Charging session' },
                { v: 1, s: '-tap', l: 'QR attribution' },
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
