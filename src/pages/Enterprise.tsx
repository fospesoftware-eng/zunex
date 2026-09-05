import { Link } from 'react-router-dom';
import { MeshBG, Reveal, RevealWords } from '../components/Brand';

/* ═══════════════════════════════════════════════════════════
   ENTERPRISE — venues, installation network, tech partners.
   ═══════════════════════════════════════════════════════════ */
export default function EnterprisePage() {
  const solutions = [
    {
      title: 'Venue Solutions',
      desc: 'Hubs and PLUS units deployed as a managed fleet — cafés, hotels, gyms and airports. One contract, one dashboard, revenue from day one.',
    },
    {
      title: 'Installation Network',
      desc: 'Certified installers in every major city handle site survey, mounting and commissioning. Your fleet goes live without pulling your team off the floor.',
    },
    {
      title: 'Technology Partners',
      desc: 'Open APIs and SDKs connect ZUNEX to your stack — POS, loyalty, building systems. Co-engineering programs for OEM integrations.',
    },
  ];

  const steps = ['Consult', 'Design', 'Install', 'Support'];

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative min-h-[80svh] flex flex-col justify-center overflow-hidden noise-bg">
        <MeshBG variant="steel" />
        <div className="relative max-w-container mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-[11px] font-semibold text-steel-bright tracking-[0.25em] uppercase mb-6">Enterprise</div>
          </Reveal>
          {/* Plain Reveal — background-clip:text breaks on RevealWords' nested spans (renders invisible) */}
          <Reveal delay={0.1}>
            <h2 className="font-display text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-gradient-lux max-w-3xl mb-8">
              ZUNEX at venue scale.
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-lg text-paper-soft font-light leading-relaxed max-w-xl mb-10">
              Deploy charging as infrastructure. Managed fleets, certified installation and an open platform — built for operators, not just early adopters.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <Link to="/contact" data-hover
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[13px] font-semibold tracking-wide bg-paper text-ink hover:bg-steel hover:text-paper transition-all duration-500">
              Talk to our team
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Solutions */}
      <section className="relative py-28 noise-bg overflow-hidden">
        <MeshBG variant="dark" />
        <div className="relative max-w-container mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {solutions.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.12}>
                <div className="group p-8 rounded-3xl border-gradient hairline hover:bg-ink-card transition-all duration-500 h-full">
                  <div className="font-display text-2xl font-bold text-steel-bright mb-5">0{i + 1}</div>
                  <div className="text-sm font-semibold text-paper mb-2">{s.title}</div>
                  <p className="text-sm text-paper-soft leading-relaxed font-light">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Process */}
          <Reveal delay={0.2}>
            <div className="text-[11px] font-semibold text-steel-bright tracking-[0.25em] uppercase mb-8">How a rollout runs</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {steps.map((step, i) => (
                <div key={step} className="p-8 rounded-2xl border-gradient hairline hover:bg-ink-card transition-colors duration-300">
                  <div className="font-display text-3xl font-bold text-paper mb-3">0{i + 1}</div>
                  <div className="text-sm font-semibold text-paper-soft">{step}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
