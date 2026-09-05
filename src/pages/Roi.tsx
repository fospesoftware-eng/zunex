import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MeshBG, Reveal } from '../components/Brand';

/* ═══════════════════════════════════════════════════════════
   ROI — what a ZUNEX fleet earns. Live calculator with a
   One / Plus switch. Plus carries a media player, so owners
   earn extra advertising revenue on top of charging.
   ═══════════════════════════════════════════════════════════ */
type DeviceKey = 'core' | 'plus';

const DEVICES: Record<DeviceKey, { name: string; cost: number; ads: boolean }> = {
  core: { name: 'Zunex One', cost: 9000, ads: false },
  plus: { name: 'Zunex Plus', cost: 19000, ads: true },
};

export default function RoiPage() {
  const [device, setDevice] = useState<DeviceKey>('core');
  const [hubs, setHubs] = useState(10);
  const [sessions, setSessions] = useState(40);
  const [rate, setRate] = useState(20); // charging revenue per session, INR
  const [adRate, setAdRate] = useState(60); // ad revenue per hub per day, INR (Plus only)

  const d = DEVICES[device];
  const perHubDaily = sessions * rate + (d.ads ? adRate : 0);
  const perHubMonthly = perHubDaily * 30;
  const monthly = hubs * perHubDaily * 30;
  const yearly = monthly * 12;
  const paybackMonths = perHubMonthly > 0 ? d.cost / perHubMonthly : Infinity;
  const adMonthly = d.ads ? hubs * adRate * 30 : 0;

  // Indian number units: Cr = crore, L = lakh, k = thousand
  const fmt = (n: number) => {
    if (n >= 10000000) return `${(n / 10000000).toFixed(n >= 100000000 ? 0 : 1)}Cr`;
    if (n >= 100000) return `${(n / 100000).toFixed(n >= 1000000 ? 0 : 1)}L`;
    if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
    return Math.round(n).toString();
  };

  const sliders = [
    { label: 'Hubs deployed', value: hubs, set: setHubs, min: 1, max: 200, step: 1, fmt: (v: number) => `${v}` },
    { label: 'Sessions / hub / day', value: sessions, set: setSessions, min: 5, max: 200, step: 5, fmt: (v: number) => `${v}` },
    { label: 'Revenue per session', value: rate, set: setRate, min: 5, max: 100, step: 5, fmt: (v: number) => `₹${v}` },
    ...(d.ads ? [{ label: 'Ad revenue / hub / day', value: adRate, set: setAdRate, min: 0, max: 500, step: 10, fmt: (v: number) => `₹${v}` }] : []),
  ];

  const results = [
    { label: 'Monthly revenue', value: `₹${fmt(monthly)}` },
    { label: 'Yearly revenue', value: `₹${fmt(yearly)}` },
    ...(d.ads ? [{ label: 'Advertising share / mo', value: `₹${fmt(adMonthly)}` }] : []),
    { label: 'Payback per hub', value: isFinite(paybackMonths) ? `${paybackMonths.toFixed(1)} mo` : '—' },
  ];

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative min-h-[70svh] flex flex-col justify-center overflow-hidden noise-bg">
        <MeshBG variant="steel" />
        <div className="relative max-w-container mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-[11px] font-semibold text-steel-bright tracking-[0.25em] uppercase mb-6">ROI</div>
          </Reveal>
          {/* Plain Reveal — background-clip:text breaks on RevealWords' nested spans (renders invisible) */}
          <Reveal delay={0.1}>
            <h2 className="font-display text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-gradient-lux max-w-3xl mb-8">
              The math, beyond the expected.
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-lg text-paper-soft font-light leading-relaxed max-w-xl">
              Pick a device, move the sliders — see what a fleet earns each month.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Calculator */}
      <section className="relative py-24 noise-bg overflow-hidden">
        <MeshBG variant="dark" />
        <div className="relative max-w-container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Inputs */}
            <Reveal>
              <div className="p-10 rounded-3xl border-gradient hairline bg-ink-card/40 flex flex-col gap-9">
                {/* Device switch — One / Plus */}
                <div>
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-paper-dim">Device</span>
                    <span className="font-display text-lg font-bold text-paper">₹{d.cost.toLocaleString('en-IN')} <span className="text-[11px] font-medium text-paper-faint tracking-normal">/ hub</span></span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 p-1 rounded-full hairline bg-paper/5">
                    {(Object.keys(DEVICES) as DeviceKey[]).map((k) => (
                      <button
                        key={k}
                        onClick={() => setDevice(k)}
                        data-hover
                        className={`py-2.5 rounded-full text-[12px] font-semibold tracking-wide transition-all duration-300 ${
                          device === k ? 'bg-paper text-ink' : 'text-paper-dim hover:text-paper'
                        }`}
                      >
                        {DEVICES[k].name}
                      </button>
                    ))}
                  </div>
                </div>
                {sliders.map((s) => (
                  <div key={s.label}>
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-paper-dim">{s.label}</span>
                      <span className="font-display text-lg font-bold text-paper">{s.fmt(s.value)}</span>
                    </div>
                    <input
                      type="range"
                      min={s.min}
                      max={s.max}
                      step={s.step}
                      value={s.value}
                      onChange={(e) => s.set(Number(e.target.value))}
                      className="w-full h-1 appearance-none rounded-full bg-paper/15"
                      style={{ accentColor: '#9CA3AF' }}
                      data-hover
                    />
                  </div>
                ))}
                <p className="text-[11px] text-paper-faint leading-relaxed">
                  Assumptions: ₹{d.cost.toLocaleString('en-IN')} hardware per hub · charging{d.ads ? ' + advertising share from the hub\'s media player' : ''} · excludes venue energy costs.
                </p>
              </div>
            </Reveal>

            {/* Outputs */}
            <div className="flex flex-col gap-4">
              {results.map((r, i) => (
                <Reveal key={r.label} delay={i * 0.12}>
                  <div className="p-8 rounded-2xl border-gradient hairline hover:bg-ink-card transition-colors duration-300">
                    <div className="text-[10px] text-paper-dim tracking-[0.2em] uppercase mb-3">{r.label}</div>
                    <div className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-bold text-paper leading-none">{r.value}</div>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={0.4}>
                <Link to="/contact" data-hover
                  className="mt-2 inline-flex w-fit items-center gap-2.5 px-8 py-4 rounded-full text-[13px] font-semibold tracking-wide bg-paper text-ink hover:bg-steel hover:text-paper transition-all duration-500">
                  Model your fleet
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
