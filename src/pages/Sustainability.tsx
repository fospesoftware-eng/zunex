import { Reveal } from '../components/Brand';
import { PageHero, StatBand, SplitImage, CtaBand } from '../components/PageBits';

/* ═══════════════════════════════════════════════════════════
   SUSTAINABILITY — serviceable hardware, less e-waste
   ═══════════════════════════════════════════════════════════ */
export default function SustainabilityPage() {
  return (
    <main>
      <PageHero
        kicker="Sustainability"
        title="Charging that doesn't cost the planet."
        sub="Shared fast charging replaces drawers of idle adapters — and every ZUNEX part is built to be repaired, not replaced."
        img="/products/cable.jpg"
      />

      <section className="relative py-16 lg:py-24 noise-bg">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <StatBand stats={[
            { v: 100, s: '%', l: 'Serviceable by hand' },
            { v: 20, s: 'k', l: 'Bend cycles per cable' },
            { v: 0, l: 'Single-use plastics in packaging' },
          ]} />
        </div>
      </section>

      <SplitImage
        img="/products/adapter.jpg"
        kicker="Repair, don't replace"
        title="A worn part is a two-minute swap."
      >
        <p>Most electronics die because one small part fails inside a sealed box. ZUNEX hubs are the opposite: the cable end, adapter collar, tap pad and front plate all come off by hand and click back in — no soldering, no scraping a whole unit.</p>
        <p>Returned parts come back to Delhi, are refurbished, and re-enter the spares pool. Nothing usable goes to landfill.</p>
      </SplitImage>

      <SplitImage
        img="/products/dark-range.jpg"
        kicker="Shared by design"
        title="One hub retires a drawer of adapters."
        flip
      >
        <p>A single venue hub serves hundreds of unique phones a week. Every shared charge is a charger nobody needs to buy, ship or eventually throw away — charging as infrastructure instead of accessory.</p>
        <p>The GaN power stage runs at ~95% efficiency and sips under 0.5W at idle, so a hub costs pennies a day to keep on.</p>
      </SplitImage>

      <section className="relative py-16 lg:py-24 noise-bg">
        <div className="max-w-container mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-6">
          {[
            { t: 'Take-back promise', d: 'End-of-life hubs come back to us free of charge. Chassis, boards and cables are separated and recycled through authorised Indian e-waste partners.' },
            { t: 'Packaging', d: 'Moulded fibre and paper only — no foam, no single-use plastic. The box itself is the install template.' },
            { t: 'Longer software life', d: 'Over-the-air updates keep first-generation hubs on the current firmware, so a 2025 unit behaves like a 2027 unit for years.' },
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

      <CtaBand
        title="Venue owners: this is the easy part."
        sub="You get the revenue and the sustainability story together — no extra effort, no green premium."
        to="/enterprise"
        label="See venue solutions"
      />
    </main>
  );
}
