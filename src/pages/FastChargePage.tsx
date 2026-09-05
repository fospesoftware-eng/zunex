import { Link } from 'react-router-dom';
import { MeshBG, Reveal, RevealWords, Counter } from '../components/Brand';
import FastCharge from '../components/FastChargeDemo';

/* ═══════════════════════════════════════════════════════════
   FAST CHARGE — the technology page. The interactive hub demo
   doubles as the hero; supporting sections go below.
   ═══════════════════════════════════════════════════════════ */
export default function FastChargePage() {
  const pillars = [
    {
      title: '65W USB-C PD',
      desc: 'Power Delivery 3.0 with PPS. Phones, tablets and laptops negotiate the fastest safe profile automatically — up to 65W shared across ports.',
    },
    {
      title: 'Tap to charge',
      desc: 'Every ZUNEX carries a QR. Tap it and the session starts instantly — no app store detour, no pairing ritual, no waiting.',
    },
    {
      title: 'Cool by design',
      desc: 'A machined aluminium shell spreads heat across the body, holding peak output longer without throttling or fan noise.',
    },
  ];

  return (
    <main className="pt-24">
      {/* Interactive demo hero */}
      <FastCharge />

      {/* Technology */}
      <section className="relative py-28 noise-bg overflow-hidden">
        <MeshBG variant="dark" />
        <div className="relative max-w-container mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-[11px] font-semibold text-steel-bright tracking-[0.25em] uppercase mb-6">The technology</div>
          </Reveal>
          <RevealWords
            text="Speed you can see. Engineering you can feel."
            className="font-display text-[clamp(1.8rem,4.5vw,4rem)] font-bold leading-[1.1] tracking-[-0.03em] text-paper max-w-4xl mb-16"
            stagger={0.04}
          />

          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {pillars.map((p, i) => (
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
              {[
                { v: 65, s: 'W', l: 'Max output' },
                { v: 50, s: '%', l: 'In 20 minutes' },
                { v: 3, s: '', l: 'Devices at once' },
                { v: 100, s: '%', l: 'Aluminium shell' },
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

          <Reveal delay={0.3}>
            <Link to="/#contact" data-hover
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[13px] font-semibold tracking-wide bg-paper text-ink hover:bg-steel hover:text-paper transition-all duration-500">
              Get in touch
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
