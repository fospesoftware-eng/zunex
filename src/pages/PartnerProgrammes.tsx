import { Reveal } from '../components/Brand';
import { PageHero, MiniForm, CtaBand } from '../components/PageBits';

/* ═══════════════════════════════════════════════════════════
   PARTNER PROGRAMMES — resellers, installers, distributors
   ═══════════════════════════════════════════════════════════ */
const PROGRAMMES = [
  { t: 'Venue reseller', d: 'Sell ZUNEX One and Plus to cafés, salons and retail counters in your city. You own the relationship; we handle logistics, onboarding and payouts.', pts: ['Margin on every hub', 'Demo kit on loan', 'Lead sharing from inbound'] },
  { t: 'Certified installer', d: 'Install and service hubs across venues. Get certified in a day, take jobs from our installation network and grow into annual maintenance contracts.', pts: ['Per-install payouts', 'Training & certification', 'Priority spare-parts pricing'] },
  { t: 'Area distributor', d: 'Carry stock and manage a territory — demos, first-line service and sub-partner recruitment with volume pricing and protected postcodes.', pts: ['Territory pricing', 'Quarterly growth targets', 'Co-funded venue demos'] },
];

export default function PartnerProgrammesPage() {
  return (
    <main>
      <PageHero
        kicker="Partner programmes"
        title="Grow with the charging wave."
        sub="Resell, install or distribute ZUNEX in your territory. India's venues are adding charging fast — build a business on it."
        img="/products/hub.jpg"
      />

      <section className="relative py-16 lg:py-24 noise-bg">
        <div className="max-w-container mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-6">
          {PROGRAMMES.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.06}>
              <div className="h-full hairline rounded-3xl bg-paper/[0.03] p-8 flex flex-col">
                <h3 className="font-display text-xl font-bold text-paper mb-3">{p.t}</h3>
                <p className="text-[14px] leading-relaxed text-paper-dim mb-6">{p.d}</p>
                <ul className="mt-auto flex flex-col gap-2.5 text-[13.5px] text-paper-soft">
                  {p.pts.map((pt) => (
                    <li key={pt} className="flex items-center gap-3"><span className="w-1 h-1 rounded-full bg-steel shrink-0" />{pt}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Application */}
      <section className="relative py-16 lg:py-24 noise-bg overflow-hidden">
        <div className="max-w-container mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-14 items-start">
          <Reveal className="lg:col-span-2">
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-steel mb-6">Apply</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-paper mb-6">Tell us your territory.</h2>
            <p className="text-[15px] leading-relaxed text-paper-dim mb-8">The partnerships team reviews every application personally. Shortlisted partners get a discovery call, territory pricing and a starter kit.</p>
            <div className="flex flex-col gap-3 text-[13px] text-paper-dim">
              <span className="flex items-center gap-3"><span className="w-1 h-1 rounded-full bg-steel" /> Reply within two working days</span>
              <span className="flex items-center gap-3"><span className="w-1 h-1 rounded-full bg-steel" /> No listing fee, no lock-in</span>
              <span className="flex items-center gap-3"><span className="w-1 h-1 rounded-full bg-steel" /> Training material in English & Hindi</span>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-3">
            <MiniForm
              title="Partner application"
              cta="Apply now"
              success="Application received. The partnerships team will call you within two working days."
              fields={[
                { label: 'Full name', name: 'name', required: true, placeholder: 'Your name' },
                { label: 'Phone', name: 'phone', type: 'tel', required: true, placeholder: '10-digit mobile' },
                { label: 'Email', name: 'email', type: 'email', required: true, placeholder: 'you@company.com' },
                { label: 'Firm / company', name: 'company', placeholder: 'If you operate one' },
                { label: 'Programme', name: 'programme', type: 'select', required: true, opts: ['Venue reseller', 'Certified installer', 'Area distributor', 'Not sure yet'] },
                { label: 'Experience', name: 'experience', type: 'select', opts: ['New to hardware', 'Electronics retail', 'Field service / installation', 'Distribution'] },
                { label: 'City', name: 'city', required: true, placeholder: 'Your base city' },
                { label: 'State', name: 'state', type: 'select', required: true, opts: ['Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Other'] },
                { label: 'PIN code', name: 'pin', required: true, placeholder: '6-digit PIN' },
                { label: 'Territory & existing network', name: 'territory', type: 'textarea', half: false, placeholder: 'Cities you cover, venue categories you already sell to, team size…' },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Already a partner?"
        sub="Partner pricing, spares and deal registration happen over email and the partner desk — reach us and we will pick it up from there."
        to="/contact"
        label="Contact the partner desk"
      />
    </main>
  );
}
