import { Reveal } from '../components/Brand';
import { PageHero, CodeTabs, MiniForm, CtaBand } from '../components/PageBits';

/* ═══════════════════════════════════════════════════════════
   OPEN API — endpoints, webhooks, sandbox keys
   ═══════════════════════════════════════════════════════════ */
const TABS = [
  {
    label: 'start a session',
    code: `curl -X POST https://api.zunex.global/v1/sessions \\
  -H "Authorization: Bearer $ZX_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "hub": "ZX-1042-B",
    "venue": "ven_9f2c11",
    "price_paise": 2000
  }'`,
  },
  {
    label: 'webhooks',
    code: `{
  "event": "session.completed",
  "session": "ses_81be30",
  "hub": "ZX-1042-B",
  "kwh": 0.018,
  "duration_s": 742,
  "revenue_paise": 2000,
  "payout_status": "scheduled",
  "signature": "t=1725500000,v1=8f3c..."
}`,
  },
  {
    label: 'device health',
    code: `curl https://api.zunex.global/v1/hubs/ZX-1042-B/health \\
  -H "Authorization: Bearer $ZX_API_KEY"

{
  "status": "online",
  "uptime_pct_30d": 99.7,
  "firmware": "2.4.1",
  "ports": {
    "c1": { "state": "idle", "watts": 0 },
    "c2": { "state": "charging", "watts": 63.5 }
  },
  "screen": { "playing": true, "campaign": "cmp_2208" }
}`,
  },
];

const ENDPOINTS = [
  ['POST', '/v1/sessions', 'Start or price a charge session'],
  ['GET', '/v1/sessions/:id', 'Session detail with meter values'],
  ['GET', '/v1/hubs/:id/health', 'Live device health and port states'],
  ['GET', '/v1/venues/:id/revenue', 'Revenue rollups by day / week / month'],
  ['POST', '/v1/screen/playlists', 'Traffic campaigns to PLUS screens'],
  ['GET', '/v1/screen/proof-of-play', 'Verified campaign play logs'],
];

export default function OpenApiPage() {
  return (
    <main>
      <PageHero
        kicker="Open API"
        title="Everything the platform does, over HTTPS."
        sub="Sessions, revenue, device health and screen playlists — a small, honest REST surface with signed webhooks and sandbox keys."
        img="/products/display.jpg"
      />

      <section className="relative py-16 lg:py-24 noise-bg">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-steel mb-6">The shape of it</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-paper max-w-2xl mb-12">Three calls cover most integrations.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <CodeTabs tabs={TABS} />
          </Reveal>
        </div>
      </section>

      <section className="relative py-16 lg:py-24 noise-bg">
        <div className="max-w-container mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-14">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-steel mb-6">Surface</p>
            <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold leading-[1.1] tracking-[-0.03em] text-paper mb-8">Endpoints you'll actually use.</h2>
            <div className="flex flex-col">
              {ENDPOINTS.map(([m, p, d]) => (
                <div key={p} className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-5 py-4 hairline-b last:border-0">
                  <span className={`font-mono text-[10.5px] font-semibold px-2 py-1 rounded-md w-fit ${m === 'POST' ? 'text-steel-light bg-paper/10' : 'text-paper-dim bg-paper/5'}`}>{m}</span>
                  <code className="font-mono text-[12.5px] text-paper whitespace-nowrap">{p}</code>
                  <span className="text-[12.5px] text-paper-dim sm:ml-auto sm:text-right">{d}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-steel mb-6">Ground rules</p>
            <div className="flex flex-col gap-5 mt-2">
              {[
                { t: 'Signed webhooks', d: 'Every event is signed with a per-endpoint secret and timestamped — reject anything you can\u2019t verify.' },
                { t: 'Sandbox first', d: 'Sandbox hubs simulate sessions and payouts end-to-end. Production keys unlock per venue after review.' },
                { t: 'Idempotent writes', d: 'Send an Idempotency-Key on every POST; retries are safe by construction.' },
                { t: 'Versioned, not breaking', d: 'v1 is stable. Changes ship as additive fields; breaking changes only under a new version with 12 months\u2019 notice.' },
              ].map((r) => (
                <div key={r.t} className="hairline rounded-2xl bg-paper/[0.03] p-6">
                  <h3 className="text-[14px] font-semibold text-paper mb-2">{r.t}</h3>
                  <p className="text-[13.5px] leading-relaxed text-paper-dim">{r.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-16 lg:py-24 noise-bg overflow-hidden">
        <div className="max-w-container mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-14 items-start">
          <Reveal className="lg:col-span-2">
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-steel mb-6">Sandbox</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-paper mb-6">Get sandbox keys.</h2>
            <p className="text-[15px] leading-relaxed text-paper-dim">Free for evaluation. Sandbox comes with two virtual hubs, simulated sessions and full webhook delivery.</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-3">
            <MiniForm
              title="Sandbox request"
              cta="Request keys"
              success="Request received. Sandbox keys land in your inbox within one working day."
              fields={[
                { label: 'Contact name', name: 'name', required: true, placeholder: 'Your name' },
                { label: 'Work email', name: 'email', type: 'email', required: true, placeholder: 'you@company.com' },
                { label: 'Company', name: 'company', required: true, placeholder: 'Company name' },
                { label: 'Use case', name: 'usecase', type: 'select', required: true, opts: ['Payments integration', 'PMS / POS', 'Fleet monitoring', 'Ad-tech / proof-of-play', 'Research'] },
                { label: 'What are you building?', name: 'detail', type: 'textarea', required: true, half: false, placeholder: 'One or two lines is plenty.' },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Prefer to talk it through?"
        sub="Platform engineers run integration reviews every week — bring your stack and we will map the endpoints."
        to="/contact"
        label="Talk to the platform team"
      />
    </main>
  );
}
