import { useState } from 'react';
import { Reveal } from './Brand';

/* ═══════════════════════════════════════════════════════════
   LEAD FORM — one component, three audience variants
   (owner / advertise / enterprise) with India-specific fields:
   state, city, PIN code. Front-end only: shows a success state.
   ═══════════════════════════════════════════════════════════ */
export type LeadFormVariant = 'owner' | 'advertise' | 'enterprise';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jammu & Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];

const CONFIG: Record<LeadFormVariant, { kicker: string; title: string; sub: string; cta: string; success: string }> = {
  owner: {
    kicker: 'Owner desk',
    title: 'Tell us about your ZUNEX.',
    sub: 'Setup help, dashboard, warranty or a new order — the owner team replies within one working day.',
    cta: 'Request owner support',
    success: 'Your request is with the owner team. Expect a call or email within one working day.',
  },
  advertise: {
    kicker: 'Advertising',
    title: 'Put your message on every screen.',
    sub: 'Share a few details and the campaigns team will come back with placements, pricing and reach estimates.',
    cta: 'Start a campaign',
    success: 'Your brief is with the campaigns team. Expect a media plan within one working day.',
  },
  enterprise: {
    kicker: 'Enterprise',
    title: 'Plan your rollout.',
    sub: 'Multi-venue deployments, procurement and API access — tell us the scale and we will map the rollout.',
    cta: 'Talk to enterprise',
    success: 'Your enquiry is with the enterprise team. Expect a rollout consultation within one working day.',
  },
};

const OPTIONS: Record<LeadFormVariant, { label: string; name: string; opts: string[] }[]> = {
  owner: [
    { label: 'Device', name: 'device', opts: ['Zunex One', 'Zunex Plus', 'Both', 'Ordering soon'] },
    { label: 'Where is it installed?', name: 'install', opts: ['Retail shop', 'Café or restaurant', 'Gym or salon', 'Office or coworking', 'In-car', 'Other'] },
    { label: 'How many hubs?', name: 'quantity', opts: ['1', '2–5', '6–20', '20+'] },
    { label: 'What do you need?', name: 'need', opts: ['Setup & installation', 'Dashboard & payouts', 'Warranty & service', 'Bulk order'] },
  ],
  advertise: [
    { label: 'Monthly budget', name: 'budget', opts: ['Under ₹25,000', '₹25,000 – ₹1,00,000', '₹1L – ₹5L', '₹5L+'] },
    { label: 'Campaign duration', name: 'duration', opts: ['1 week', '1 month', '3 months', 'Ongoing'] },
    { label: 'Screens of interest', name: 'screens', opts: ['PLUS LCD screens', 'One venue network', 'Both'] },
    { label: 'Category', name: 'category', opts: ['Food & beverage', 'Retail / fashion', 'Entertainment', 'Automotive', 'Services', 'Other'] },
  ],
  enterprise: [
    { label: 'Your role', name: 'role', opts: ['Owner / founder', 'Facilities', 'IT / Technology', 'Procurement', 'Other'] },
    { label: 'Fleet size', name: 'fleet', opts: ['1–5 hubs', '6–20 hubs', '21–50 hubs', '50+ hubs'] },
    { label: 'Venue type', name: 'venue', opts: ['Retail', 'Café / restaurant', 'Food court', 'Mall', 'Airport / transit', 'Hotel', 'Other'] },
    { label: 'Rollout timeline', name: 'timeline', opts: ['Immediate', '1–3 months', '3–6 months', 'Exploring'] },
  ],
};

const inputCls = 'w-full bg-paper/5 hairline rounded-xl px-4 py-3 text-[14px] text-paper placeholder:text-paper-faint outline-none focus:border-paper/40 transition-colors appearance-none';

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-paper-dim">{label}{required ? ' *' : ''}</span>
      {children}
    </label>
  );
}

export default function LeadForm({ variant }: { variant: LeadFormVariant }) {
  const cfg = CONFIG[variant];
  const [sent, setSent] = useState(false);

  return (
    <section className="relative py-16 lg:py-24 noise-bg overflow-hidden">
      <div className="relative max-w-container mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-14 items-start">
        {/* Left — pitch */}
        <Reveal className="lg:col-span-2">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-steel mb-6">{cfg.kicker}</p>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-paper mb-6">{cfg.title}</h2>
          <p className="text-[15px] leading-relaxed text-paper-dim mb-8">{cfg.sub}</p>
          <div className="flex flex-col gap-3 text-[13px] text-paper-dim">
            <span className="flex items-center gap-3"><span className="w-1 h-1 rounded-full bg-steel" /> Reply within one working day</span>
            <span className="flex items-center gap-3"><span className="w-1 h-1 rounded-full bg-steel" /> Pan-India installation network</span>
            <span className="flex items-center gap-3"><span className="w-1 h-1 rounded-full bg-steel" /> Support in English & Hindi</span>
          </div>
        </Reveal>

        {/* Right — the form */}
        <Reveal delay={0.1} className="lg:col-span-3">
          <div className="p-8 lg:p-10 rounded-3xl border-gradient hairline bg-ink-card/40">
            {sent ? (
              <div className="py-16 text-center">
                <p className="font-display text-3xl font-bold text-paper mb-4">Request received.</p>
                <p className="text-[14px] text-paper-dim max-w-sm mx-auto leading-relaxed">{cfg.success}</p>
                <button
                  onClick={() => setSent(false)}
                  data-hover
                  className="mt-8 text-[12px] font-semibold tracking-wide uppercase text-paper-soft border border-paper/20 rounded-full px-6 py-2.5 hover:bg-paper hover:text-ink transition-all duration-500"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid sm:grid-cols-2 gap-5">
                <Field label="Full name" required>
                  <input required type="text" placeholder="Your name" className={inputCls} />
                </Field>
                <Field label="Phone" required>
                  <input required type="tel" pattern="[6-9][0-9]{9}" title="10-digit Indian mobile number" placeholder="10-digit mobile" className={inputCls} />
                </Field>
                <Field label="Email" required>
                  <input required type="email" placeholder="you@company.com" className={inputCls} />
                </Field>
                <Field label={variant === 'advertise' ? 'Brand / company' : 'Company or venue name'} required={variant !== 'owner'}>
                  <input type="text" placeholder={variant === 'owner' ? 'Venue / business name' : 'Company name'} required={variant !== 'owner'} className={inputCls} />
                </Field>

                {OPTIONS[variant].map((o) => (
                  <Field key={o.name} label={o.label} required>
                    <select required defaultValue="" className={inputCls}>
                      <option value="" disabled className="bg-ink">Select…</option>
                      {o.opts.map((opt) => <option key={opt} value={opt} className="bg-ink">{opt}</option>)}
                    </select>
                  </Field>
                ))}

                <Field label="City" required>
                  <input required type="text" placeholder="e.g. Kochi" className={inputCls} />
                </Field>
                <Field label="State" required>
                  <select required defaultValue="" className={inputCls}>
                    <option value="" disabled className="bg-ink">Select state…</option>
                    {INDIAN_STATES.map((st) => <option key={st} value={st} className="bg-ink">{st}</option>)}
                  </select>
                </Field>
                <Field label="PIN code" required>
                  <input required type="text" pattern="[1-9][0-9]{5}" title="6-digit PIN code" placeholder="6-digit PIN" className={inputCls} />
                </Field>
                <div className="sm:col-span-2 flex flex-col gap-2">
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-paper-dim">Anything else?</span>
                  <textarea rows={4} placeholder="Tell us more — venues, footfall, questions…" className={inputCls + ' resize-none'} />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" data-hover
                    className="w-fit inline-flex items-center gap-2 text-[13px] font-semibold text-ink bg-paper px-8 py-3.5 rounded-full hover:bg-steel hover:text-paper transition-all duration-500">
                    {cfg.cta}
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
