import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MeshBG, Reveal } from '../components/Brand';

/* ═══════════════════════════════════════════════════════════
   CONTACT — Get in touch. One form, routed by enquiry type:
   General / Partner / Advertising / Enterprise / Support.
   ═══════════════════════════════════════════════════════════ */
type Interest = 'General' | 'Partner Enquiry' | 'Advertising Enquiry' | 'Enterprise' | 'Support';

const INTERESTS: Interest[] = ['General', 'Partner Enquiry', 'Advertising Enquiry', 'Enterprise', 'Support'];

const CHANNELS: { interest: Interest; title: string; blurb: string; email: string }[] = [
  { interest: 'Partner Enquiry', title: 'Partner Enquiries', blurb: 'Distribution, resellers and installation partners.', email: 'partners@fospe.com' },
  { interest: 'Advertising Enquiry', title: 'Advertising Enquiries', blurb: 'Campaigns and placements on the hub media player.', email: 'ads@fospe.com' },
  { interest: 'Enterprise', title: 'Enterprise Contact', blurb: 'Multi-venue rollouts, procurement and APIs.', email: 'enterprise@fospe.com' },
  { interest: 'Support', title: 'Owner Support', blurb: 'Fleet setup, dashboard and device care.', email: 'support@fospe.com' },
];

export default function ContactPage() {
  const [interest, setInterest] = useState<Interest>('General');
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const pick = (i: Interest) => {
    setInterest(i);
    setSent(false);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <main className="pt-24">
      {/* ─────────── Hero ─────────── */}
      <section className="relative py-16 lg:py-24 noise-bg overflow-hidden">
        <MeshBG variant="dark" />
        <div className="relative max-w-container mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-steel mb-6">Contact</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-gradient-lux font-display text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-paper">
              Let's get you talking to the right team.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-paper-dim">
              Partnerships, campaigns, multi-venue rollouts or day-to-day fleet care — pick a channel and we'll route your message straight to the people who can act on it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─────────── Channel cards ─────────── */}
      <section className="relative py-16 lg:py-24 noise-bg">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CHANNELS.map((c, i) => (
              <Reveal key={c.interest} delay={0.08 * i}>
                <button
                  onClick={() => pick(c.interest)}
                  data-hover
                  className={`group text-left w-full h-full p-7 rounded-2xl border-gradient hairline bg-ink-card/40 hover:-translate-y-1 transition-all duration-500 ${interest === c.interest ? 'ring-1 ring-paper/30' : ''}`}
                >
                  <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-steel mb-4">{c.interest}</p>
                  <h3 className="font-display text-lg font-bold text-paper mb-2">{c.title}</h3>
                  <p className="text-[13px] leading-relaxed text-paper-dim mb-5">{c.blurb}</p>
                  <span className="inline-block text-[12px] font-medium text-paper-soft group-hover:text-paper transition-colors">{c.email}</span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Form + info ─────────── */}
      <section ref={formRef} className="relative py-16 lg:py-24 noise-bg overflow-hidden">
        <MeshBG variant="dark" />
        <div className="relative max-w-container mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-14 items-start">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <div className="p-8 lg:p-10 rounded-3xl border-gradient hairline bg-ink-card/40">
              {sent ? (
                <div className="py-16 text-center">
                  <p className="font-display text-3xl font-bold text-paper mb-4">Message received.</p>
                  <p className="text-[14px] text-paper-dim max-w-sm mx-auto leading-relaxed">
                    Thanks — your <span className="text-paper">{interest.toLowerCase()}</span> has landed with the right inbox. Expect a reply within one working day.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    data-hover
                    className="mt-8 text-[12px] font-semibold tracking-wide uppercase text-paper-soft border border-paper/20 rounded-full px-6 py-2.5 hover:bg-paper hover:text-ink transition-all duration-500"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                  className="flex flex-col gap-6"
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    <label className="flex flex-col gap-2">
                      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-paper-dim">Full name *</span>
                      <input required type="text" placeholder="Your name"
                        className="bg-paper/5 hairline rounded-xl px-4 py-3 text-[14px] text-paper placeholder:text-paper-faint outline-none focus:border-paper/40 transition-colors" />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-paper-dim">Work email *</span>
                      <input required type="email" placeholder="you@company.com"
                        className="bg-paper/5 hairline rounded-xl px-4 py-3 text-[14px] text-paper placeholder:text-paper-faint outline-none focus:border-paper/40 transition-colors" />
                    </label>
                  </div>
                  <label className="flex flex-col gap-2">
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-paper-dim">Company</span>
                    <input type="text" placeholder="Company or venue name"
                      className="bg-paper/5 hairline rounded-xl px-4 py-3 text-[14px] text-paper placeholder:text-paper-faint outline-none focus:border-paper/40 transition-colors" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-paper-dim">This is a…</span>
                    <select value={interest} onChange={(e) => setInterest(e.target.value as Interest)}
                      className="bg-paper/5 hairline rounded-xl px-4 py-3 text-[14px] text-paper outline-none focus:border-paper/40 transition-colors appearance-none">
                      {INTERESTS.map((i) => <option key={i} value={i} className="bg-ink text-paper">{i}</option>)}
                    </select>
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-paper-dim">Message *</span>
                    <textarea required rows={5} placeholder="Tell us about your venues, fleet size, campaign or question…"
                      className="bg-paper/5 hairline rounded-xl px-4 py-3 text-[14px] text-paper placeholder:text-paper-faint outline-none focus:border-paper/40 transition-colors resize-none" />
                  </label>
                  <button type="submit" data-hover
                    className="mt-2 w-fit inline-flex items-center gap-2 text-[13px] font-semibold text-ink bg-paper px-8 py-3.5 rounded-full hover:bg-steel hover:text-paper transition-all duration-500">
                    Send message
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Contact info */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="flex flex-col gap-8 lg:sticky lg:top-28">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-steel mb-5">Direct lines</p>
                <ul className="flex flex-col gap-4">
                  {CHANNELS.map((c) => (
                    <li key={c.email} className="flex items-baseline justify-between gap-4 border-b border-paper/10 pb-4">
                      <span className="text-[13px] text-paper-dim">{c.title}</span>
                      <a href={`mailto:${c.email}`} data-hover className="text-[13px] font-medium text-paper hover:text-steel transition-colors">{c.email}</a>
                    </li>
                  ))}
                  <li className="flex items-baseline justify-between gap-4 border-b border-paper/10 pb-4">
                    <span className="text-[13px] text-paper-dim">General</span>
                    <a href="mailto:hello@fospe.com" data-hover className="text-[13px] font-medium text-paper hover:text-steel transition-colors">hello@fospe.com</a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-steel mb-5">Call</p>
                <a href="tel:+919000000000" data-hover className="font-display text-2xl font-bold text-paper hover:text-steel transition-colors">+91 90000 00000</a>
                <p className="mt-2 text-[12px] text-paper-faint">Mon–Sat · 9:30–18:30 IST</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-steel mb-5">Registered office</p>
                <p className="text-[13px] leading-relaxed text-paper-dim">
                  Fospe Global<br />
                  Kochi, Kerala, India
                </p>
              </div>
              <Link to="/enterprise" data-hover className="text-[12px] font-semibold tracking-[0.08em] uppercase text-paper-soft hover:text-paper transition-colors w-fit">
                Planning a multi-venue rollout? →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
