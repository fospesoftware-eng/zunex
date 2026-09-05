import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Reveal } from '../components/Brand';
import { PageHero } from '../components/PageBits';

/* ═══════════════════════════════════════════════════════════
   LEGAL — Terms / Privacy (+ GDPR-CCPA) / Cookie preferences
   ═══════════════════════════════════════════════════════════ */

const TERMS = [
  { t: 'Using the platform', ps: ['ZUNEX charging hubs and the dashboard are provided by Global Eco Power Mobility And Energy Pvt. Ltd., Delhi ("we", "us"). By switching on a hub or using the dashboard you agree to these terms.', 'Venue owners control session pricing within the platform\u2019s bounds; we process payments and settle payouts weekly, minus the platform share shown in your dashboard.'] },
  { t: 'Hardware & warranty', ps: ['Hubs carry a 12-month replacement warranty from ship date; accessories carry 6 months. Coverage excludes liquid ingress, unauthorised opening and physical misuse.', 'Spare parts and accessories are replaceable by design — fitting a non-ZUNEX part or opening the enclosure voids warranty on the affected assembly only.'] },
  { t: 'Payments & payouts', ps: ['Charging revenue is collected over our payment partners and reflected in your dashboard in near real time.', 'Payouts are scheduled weekly (Mondays, 09:00 IST) to the bank account registered to the venue. Failed verifications pause payouts until re-KYC completes.'] },
  { t: 'Advertising on PLUS screens', ps: ['Screen time is sold as campaigns with scheduled playlists and proof-of-play logs. Venue revenue share is fixed in the venue agreement.', 'We do not run political, gambling or adult creatives on the network, and pull any creative that violates the published content policy.'] },
  { t: 'Liability', ps: ['The platform is provided "as is". We are not liable for indirect or consequential losses, including lost profits from device downtime, beyond the remedies stated in the venue agreement.', 'Nothing in these terms limits liability that cannot be limited under Indian law.'] },
  { t: 'Governing law', ps: ['These terms are governed by the laws of India. Courts at Delhi have exclusive jurisdiction over any dispute arising from them.'] },
];

const PRIVACY = [
  { t: 'What we collect', ps: ['Account and venue data: names, work contacts, venue addresses, bank details for payouts, GST identifiers where applicable.', 'Device and session data: hub health, charge session meter values, timestamps and pricing. We do not read the contents of any plugged-in phone — sessions carry electrical metering data only.', 'Screen analytics on PLUS: anonymous play counts and dwell estimates. No facial recognition, no biometric processing, ever.'] },
  { t: 'Why we collect it', ps: ['To run the service you asked for: sessions, payouts, warranty, support and campaign delivery.', 'To meet legal obligations: tax invoicing, KYC on payouts, and record-keeping required for payment partners.'] },
  { t: 'Payments & KYC', ps: ['Payout KYC is handled through our payment partners. We receive the verification result, not your full document set, unless a manual review is legally required.'] },
  { t: 'Sharing', ps: ['Payment gateways (to process charges), campaign partners (aggregated, anonymised proof-of-play only), and logistics partners (delivery address and phone for install scheduling). We never sell personal data.'] },
  { t: 'Your rights — GDPR / CCPA', ps: ['Access, correct, export or delete your personal data at any time from privacy@zunex.global; we respond within 30 days.', 'Californian residents may opt out of any "sale" of personal information — we do not sell it, so no action is needed, but you can write to us to affirm it.', 'EU/UK users: our lawful bases are contract performance, legitimate interest (service security) and consent where required. You may lodge a complaint with your supervisory authority.'] },
  { t: 'Retention & security', ps: ['Venue and transaction records are retained for 8 years as required by Indian tax law; device telemetry for 24 months; support tickets for 36 months.', 'Data is encrypted in transit (TLS 1.3) and at rest; access is role-based, logged and reviewed quarterly.'] },
];

const COOKIE_GROUPS = [
  { key: 'essential', label: 'Essential', locked: true, d: 'Session, security and payment integrity. The site cannot function without these.' },
  { key: 'analytics', label: 'Analytics', locked: false, d: 'Anonymous usage patterns that help us fix broken flows. No cross-site tracking.' },
  { key: 'prefs', label: 'Preferences', locked: false, d: 'Remember your dashboard layout, locale and theme choices.' },
  { key: 'marketing', label: 'Marketing', locked: false, d: 'Measures campaign performance for our own ads. Off by default.' },
];

function Section({ t, ps }: { t: string; ps: string[] }) {
  return (
    <Reveal>
      <div className="py-8 hairline-b last:border-0">
        <h2 className="font-display text-xl font-bold text-paper mb-4">{t}</h2>
        <div className="flex flex-col gap-3">
          {ps.map((p, i) => <p key={i} className="text-[14px] leading-relaxed text-paper-dim">{p}</p>)}
        </div>
      </div>
    </Reveal>
  );
}

export default function LegalPage() {
  const { topic = 'terms' } = useParams();
  const [consent, setConsent] = useState<Record<string, boolean>>({ analytics: false, prefs: false, marketing: false });
  const [saved, setSaved] = useState(false);

  const meta = {
    terms: { kicker: 'Legal', title: 'Terms of service.', sub: 'The rules for owning, running and earning from ZUNEX hardware. Plain language, no traps.', updated: 'Updated September 2026' },
    privacy: { kicker: 'Legal', title: 'Privacy policy.', sub: 'What we collect, why, and the rights you hold over it — including GDPR and CCPA.', updated: 'Updated September 2026' },
    cookies: { kicker: 'Legal', title: 'Cookie preferences.', sub: 'Only what the site needs is on by default. Everything else is your call.', updated: 'Updated September 2026' },
  }[topic] ?? { kicker: 'Legal', title: 'Terms of service.', sub: '', updated: '' };

  return (
    <main>
      <PageHero kicker={meta.kicker} title={meta.title} sub={meta.sub} img="/products/brandplate.jpg" />

      <section className="relative py-16 lg:py-24 noise-bg">
        <div className="max-w-container mx-auto px-6 lg:px-8 grid lg:grid-cols-[1fr_2.2fr] gap-14 items-start">
          <Reveal>
            <div className="flex lg:flex-col gap-2 lg:sticky lg:top-28">
              {[
                { k: 'terms', l: 'Terms' },
                { k: 'privacy', l: 'Privacy · GDPR / CCPA' },
                { k: 'cookies', l: 'Cookie preferences' },
              ].map((n) => (
                <Link key={n.k} to={`/legal/${n.k}`} data-hover
                  className={`px-5 py-3 rounded-xl text-[13px] font-medium transition-colors duration-300 ${topic === n.k ? 'bg-paper text-ink' : 'text-paper-dim hover:text-paper hairline'}`}>
                  {n.l}
                </Link>
              ))}
              <p className="hidden lg:block text-[12px] text-paper-faint mt-6 px-5">{meta.updated}</p>
            </div>
          </Reveal>

          <div>
            {topic === 'terms' && TERMS.map((s) => <Section key={s.t} {...s} />)}
            {topic === 'privacy' && PRIVACY.map((s) => <Section key={s.t} {...s} />)}
            {topic === 'cookies' && (
              <Reveal>
                <div className="flex flex-col gap-4">
                  {COOKIE_GROUPS.map((g) => {
                    const on = g.locked || consent[g.key];
                    return (
                      <div key={g.key} className="hairline rounded-2xl bg-paper/[0.03] p-6 flex items-start gap-6">
                        <div className="flex-1">
                          <h3 className="text-[15px] font-semibold text-paper mb-1.5">
                            {g.label}{g.locked && <span className="ml-3 text-[10px] font-semibold tracking-[0.18em] uppercase text-steel-light">Always on</span>}
                          </h3>
                          <p className="text-[13.5px] leading-relaxed text-paper-dim">{g.d}</p>
                        </div>
                        <button
                          data-hover
                          disabled={g.locked}
                          onClick={() => { setConsent((c) => ({ ...c, [g.key]: !c[g.key] })); setSaved(false); }}
                          aria-pressed={on}
                          className={`relative w-12 h-7 rounded-full shrink-0 mt-1 transition-colors duration-300 ${on ? 'bg-paper' : 'bg-paper/15'} ${g.locked ? 'opacity-60 cursor-default' : ''}`}
                        >
                          <span className={`absolute top-1 w-5 h-5 rounded-full transition-all duration-300 ${on ? 'left-6 bg-ink' : 'left-1 bg-paper-dim'}`} />
                        </button>
                      </div>
                    );
                  })}
                  <div className="flex items-center gap-5 mt-2">
                    <button data-hover onClick={() => setSaved(true)}
                      className="text-[13px] font-semibold text-ink bg-paper px-7 py-3 rounded-full hover:bg-steel hover:text-paper transition-all duration-500">
                      Save preferences
                    </button>
                    {saved && <span className="text-[13px] text-steel-light">Preferences saved on this device.</span>}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
