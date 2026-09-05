import { Reveal } from '../components/Brand';
import { PageHero, StatBand, SplitImage, CtaBand } from '../components/PageBits';

/* ═══════════════════════════════════════════════════════════
   COMPANY — who builds ZUNEX and why
   ═══════════════════════════════════════════════════════════ */
export default function CompanyPage() {
  return (
    <main>
      <PageHero
        kicker="Company"
        title="We build the thing people plug into."
        sub="ZUNEX is a charging-hardware company from Delhi, India — engineering public fast charging as a business, not an afterthought."
        img="/products/dark-range.jpg"
      />

      <section className="relative py-16 lg:py-24 noise-bg">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <StatBand stats={[
            { v: 2, s: ' devices', l: 'One platform' },
            { v: 100, s: 'W', l: 'Peak output' },
            { v: 15, s: ' min', l: 'Typical install' },
          ]} />
        </div>
      </section>

      <SplitImage
        img="/products/hub.jpg"
        kicker="What we make"
        title="A charging hub that earns its footprint."
      >
        <p>Zunex Core turns a counter corner into paid fast charging. Zunex Plus adds a calibrated LCD that plays advertising while phones charge — two revenue streams from one socket.</p>
        <p>Every hub ships venue-ready: pre-configured, payments onboarded, dashboard live. Venue staff plug it in; the platform does the rest.</p>
      </SplitImage>

      <SplitImage
        img="/products/cable.jpg"
        kicker="How we build"
        title="Serialised parts. Serviceable by design."
        flip
      >
        <p>Hubs are assembled from numbered modules — cable end, adapter collar, tap pad, front plate. A worn part is swapped by hand in minutes, and every unit is traceable from factory to venue.</p>
        <p>We machine, test and burn-in before anything ships, because a charging hub that is down is a counter that is quietly losing money.</p>
      </SplitImage>

      <section className="relative py-16 lg:py-24 noise-bg">
        <div className="max-w-container mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-6">
          {[
            { t: 'Engineered in India', d: 'Designed, tooled and assembled in Delhi with a pan-India installation and service network behind every unit.' },
            { t: 'Venue-first economics', d: 'Pricing is built so the venue profits from day one — transparent session revenue, clear ad shares, no hidden platform fees.' },
            { t: 'Open by default', d: 'Payments, PMS and analytics integrate over a documented API. Your venue data is yours to export, always.' },
          ].map((v, i) => (
            <Reveal key={v.t} delay={i * 0.06}>
              <div className="h-full hairline rounded-3xl bg-paper/[0.03] p-8">
                <h3 className="text-[15px] font-semibold text-paper mb-3">{v.t}</h3>
                <p className="text-[14px] leading-relaxed text-paper-dim">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative py-16 lg:py-24 noise-bg">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-steel mb-6">Registered office</p>
            <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold leading-[1.12] tracking-[-0.03em] text-paper max-w-2xl mb-10">Global Eco Power Mobility And Energy Pvt. Ltd.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6 text-[14px]">
            {[
              { l: 'Address', v: 'Delhi, India' },
              { l: 'General', v: 'hello@zunex.global' },
              { l: 'Hours', v: 'Mon–Sat, 9:30–18:30 IST' },
            ].map((c) => (
              <Reveal key={c.l}>
                <div className="hairline rounded-2xl bg-paper/[0.03] p-6">
                  <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-paper-dim mb-2">{c.l}</p>
                  <p className="text-paper">{c.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Want the full picture in one page?"
        sub="Partnerships, press, procurement — the contact desk routes your message to the right team the same day."
        to="/contact"
        label="Get in touch"
      />
    </main>
  );
}
