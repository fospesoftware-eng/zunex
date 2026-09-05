import { Reveal } from '../components/Brand';
import { PageHero, SplitImage, MiniForm, CtaBand } from '../components/PageBits';

/* ═══════════════════════════════════════════════════════════
   TECHNOLOGY PARTNERS — integrations, PMS, payments, POS
   ═══════════════════════════════════════════════════════════ */
const CATS = [
  { t: 'Payments', d: 'UPI, cards and wallet settlement through India\u2019s leading gateways. Payouts reconcile to the hub, the venue and the session.' },
  { t: 'Property & venue systems', d: 'PMS and POS integrations post charging revenue straight into the venue\u2019s existing billing and reporting flow.' },
  { t: 'Advertising platforms', d: 'Programmatic connectors let ad networks book, traffic and verify campaigns on the PLUS LCD network with proof-of-play.' },
  { t: 'Analytics & data', d: 'Warehouse-ready exports and webhooks for session, revenue and device-health events. Your venue data, your pipelines.' },
];

export default function TechnologyPartnersPage() {
  return (
    <main>
      <PageHero
        kicker="Technology partners"
        title="Build with the charging layer."
        sub="Payments, PMS, POS and ad-tech — the ZUNEX platform exposes clean interfaces for the systems venues already run."
        img="/products/display.jpg"
      />

      <section className="relative py-16 lg:py-24 noise-bg">
        <div className="max-w-container mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-6">
          {CATS.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.05}>
              <div className="h-full hairline rounded-3xl bg-paper/[0.03] p-8">
                <h3 className="font-display text-xl font-bold text-paper mb-3">{c.t}</h3>
                <p className="text-[14px] leading-relaxed text-paper-dim">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <SplitImage
        img="/products/tappad.jpg"
        kicker="How integration works"
        title="One handshake, then it just runs."
      >
        <p>Register for sandbox keys, mirror sessions in your staging environment, then flip to production per venue. Webhooks confirm every state change; signed payloads keep both sides honest.</p>
        <p>Most payment and PMS integrations ship in under a week. Our platform engineers pair with your team through the first rollout at no cost.</p>
      </SplitImage>

      <section className="relative py-16 lg:py-24 noise-bg overflow-hidden">
        <div className="max-w-container mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-14 items-start">
          <Reveal className="lg:col-span-2">
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-steel mb-6">Partner desk</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-paper mb-6">Propose an integration.</h2>
            <p className="text-[15px] leading-relaxed text-paper-dim">Tell us what you operate and which side of the platform you want to connect — we respond with sandbox access and a technical contact.</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-3">
            <MiniForm
              title="Integration enquiry"
              cta="Request sandbox access"
              success="Received. A platform engineer will reach out with sandbox keys within two working days."
              fields={[
                { label: 'Contact name', name: 'name', required: true, placeholder: 'Your name' },
                { label: 'Work email', name: 'email', type: 'email', required: true, placeholder: 'you@company.com' },
                { label: 'Company', name: 'company', required: true, placeholder: 'Company name', half: true },
                { label: 'Category', name: 'category', type: 'select', required: true, opts: ['Payments / gateway', 'PMS / POS', 'Advertising platform', 'Analytics / data', 'Hardware or IoT', 'Other'] },
                { label: 'City', name: 'city', required: true, placeholder: 'e.g. Bengaluru', half: true },
                { label: 'PIN code', name: 'pin', required: true, placeholder: '6-digit PIN', half: true },
                { label: 'What do you want to integrate?', name: 'scope', type: 'textarea', required: true, half: false, placeholder: 'Systems you operate, venues in scope, expected timeline…' },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Docs first? Read the API."
        sub="Endpoints, webhooks and signed payloads are documented on the developer page — no account needed to read."
        to="/open-api"
        label="Open the API reference"
      />
    </main>
  );
}
