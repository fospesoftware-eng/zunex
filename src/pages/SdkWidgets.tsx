import { Reveal } from '../components/Brand';
import { PageHero, CodeTabs, CtaBand } from '../components/PageBits';

/* ═══════════════════════════════════════════════════════════
   SDK & WIDGETS — client libraries and embeddable surfaces
   ═══════════════════════════════════════════════════════════ */
const INSTALL_TABS = [
  { label: 'npm', code: `npm install @zunex/sdk

import { Zunex } from '@zunex/sdk';

const zx = new Zunex({ apiKey: process.env.ZX_API_KEY });

const hub = await zx.hubs.health('ZX-1042-B');
console.log(hub.ports.c2.state); // "charging"` },
  { label: 'python', code: `pip install zunex

from zunex import Zunex

zx = Zunex(api_key=os.environ["ZX_API_KEY"])

revenue = zx.venues.revenue(
    "ven_9f2c11", period="week"
)
print(revenue.total_paise)` },
  { label: 'embed', code: `<!-- Live availability widget for venue sites -->
<div id="zx-charging"></div>
<script src="https://cdn.zunex.global/widgets/v1/charging.js"
        data-venue="ven_9f2c11"
        data-theme="dark"
        async></script>

<!-- Renders: ports free · charging · price per session -->` },
];

const WIDGETS = [
  { t: 'Live availability', d: 'Show which hub ports are free right now on your venue\u2019s website or app. Polls over websockets; falls back to polling.' },
  { t: 'Charging status', d: 'Give customers a session page — plug in, scan, watch progress. No app install, works over plain mobile browsers.' },
  { t: 'Revenue card', d: 'Owner-facing card for intranets and dashboards: today\u2019s sessions, week\u2019s revenue, payout status.' },
  { t: 'Screen proof-of-play', d: 'Ad-ops view: campaign plays, dwell and verification events for every PLUS screen in a venue.' },
];

export default function SdkWidgetsPage() {
  return (
    <main>
      <PageHero
        kicker="SDK & widgets"
        title="Drop the platform into your stack."
        sub="Typed client libraries for JS and Python, plus embeddable widgets that put live charging data on any surface with a script tag."
        img="/products/hub-cutout.png"
      />

      <section className="relative py-16 lg:py-24 noise-bg">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-steel mb-6">Client libraries</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-paper max-w-2xl mb-12">Ten minutes to first call.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <CodeTabs tabs={INSTALL_TABS} />
          </Reveal>
        </div>
      </section>

      <section className="relative py-16 lg:py-24 noise-bg">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-steel mb-6">Widgets</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-paper max-w-2xl mb-14">Embeddable, themable, done.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {WIDGETS.map((w, i) => (
              <Reveal key={w.t} delay={i * 0.05}>
                <div className="h-full hairline rounded-3xl bg-paper/[0.03] p-8">
                  <h3 className="font-display text-lg font-bold text-paper mb-3">{w.t}</h3>
                  <p className="text-[14px] leading-relaxed text-paper-dim">{w.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <div className="mt-8 hairline rounded-3xl bg-paper/[0.03] p-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-[12.5px] text-paper-dim">
              <span><code className="text-steel-light">data-theme</code> — dark / light / auto</span>
              <span><code className="text-steel-light">data-locale</code> — en / hi</span>
              <span><code className="text-steel-light">data-hub</code> — pin to one hub</span>
              <span className="ml-auto text-paper-faint">~11 kB gzipped, zero dependencies</span>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Build on the API underneath."
        sub="Widgets are just the start — the full REST surface and webhooks are documented on the developer page."
        to="/open-api"
        label="Read the API reference"
      />
    </main>
  );
}
