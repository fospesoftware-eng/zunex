import { Reveal } from '../components/Brand';
import { PageHero, MiniForm, CtaBand } from '../components/PageBits';

/* ═══════════════════════════════════════════════════════════
   ACCESSORIES — cables, collars, spare parts + order enquiry
   ═══════════════════════════════════════════════════════════ */
const ITEMS = [
  { img: '/products/cable.jpg', name: 'USB-C charge cable', desc: 'The 1.5m braided USB-C cable that links the hub to the phone cradle. Rated for 100W and 20,000 bend cycles.', price: '₹499' },
  { img: '/products/adapter.jpg', name: 'Adapter collar', desc: 'The machined collar that mates the cable end to the hub port. Precision-fitted, serialised per device.', price: '₹299' },
  { img: '/products/tappad.jpg', name: 'Tap pad', desc: 'The capacitive pad behind the front plate that starts a charge session. Replaces itself in minutes — no tools.', price: '₹399' },
  { img: '/products/display.jpg', name: 'LCD module (Plus)', desc: 'The 10.1" advertising screen for Zunex Plus. Ships pre-calibrated; clips into the front plate assembly.', price: '₹6,999' },
  { img: '/products/brandplate.jpg', name: 'Front plate', desc: 'The brushed front plate with the charge glyphs. Swap finishes without touching the electronics.', price: '₹899' },
  { img: '/products/hub.jpg', name: 'Power brick', desc: 'The 100W GaN brick that drives two simultaneous fast charges. Over-current and thermal protected.', price: '₹1,499' },
];

export default function AccessoriesPage() {
  return (
    <main>
      <PageHero
        kicker="Accessories"
        title="Every part, replaceable by hand."
        sub="Cables, collars, pads and plates — designed to be swapped in minutes by the venue staff, not engineered to be thrown away."
        img="/products/range.jpg"
      />

      {/* Catalogue */}
      <section className="relative py-16 lg:py-24 noise-bg">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-steel mb-6">Spare parts & upgrades</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-paper max-w-2xl mb-14">Nothing here needs a technician.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ITEMS.map((it, i) => (
              <Reveal key={it.name} delay={i * 0.05}>
                <div data-hover className="group h-full hairline rounded-3xl bg-paper/[0.03] overflow-hidden hover:bg-paper/[0.06] transition-colors duration-500">
                  <div className="relative h-48 overflow-hidden bg-ink">
                    <img src={it.img} alt={it.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-[15px] font-semibold text-paper">{it.name}</h3>
                      <span className="text-[13px] font-semibold text-steel-light whitespace-nowrap">{it.price}</span>
                    </div>
                    <p className="text-[13.5px] leading-relaxed text-paper-dim">{it.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <p className="text-[12.5px] text-paper-faint mt-8">Prices exclusive of GST. Accessories ship pan-India in 3–5 working days; every part is covered by a 6-month warranty.</p>
          </Reveal>
        </div>
      </section>

      {/* Order enquiry */}
      <section className="relative py-16 lg:py-24 noise-bg overflow-hidden">
        <div className="max-w-container mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-14 items-start">
          <Reveal className="lg:col-span-2">
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-steel mb-6">Order desk</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-paper mb-6">Need a spare? Ask us.</h2>
            <p className="text-[15px] leading-relaxed text-paper-dim mb-8">Tell us the part and your city — the order desk confirms stock, price and delivery in one reply. Bulk spares for multi-venue fleets ship on a scheduled restock.</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-3">
            <MiniForm
              title="Accessory enquiry"
              cta="Request accessories"
              success="Enquiry received. The order desk will confirm stock and delivery within one working day."
              fields={[
                { label: 'Full name', name: 'name', required: true, placeholder: 'Your name' },
                { label: 'Phone', name: 'phone', type: 'tel', required: true, placeholder: '10-digit mobile' },
                { label: 'Email', name: 'email', type: 'email', required: true, placeholder: 'you@company.com' },
                { label: 'Part', name: 'part', type: 'select', required: true, opts: [...ITEMS.map((i) => i.name), 'Multiple / full spares kit'] },
                { label: 'City', name: 'city', required: true, placeholder: 'e.g. Mumbai' },
                { label: 'State', name: 'state', type: 'select', required: true, opts: ['Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Other'] },
                { label: 'PIN code', name: 'pin', required: true, placeholder: '6-digit PIN' },
                { label: 'Notes — quantity, device serial, venue', name: 'notes', type: 'textarea', half: false, placeholder: 'e.g. 2 cables + 1 tap pad for Zunex One at Hitech City store' },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Missing a part we didn't list?"
        sub="The support desk can source or 3D-print fittings for older units — tell us the serial and we will figure it out."
        to="/support"
        label="Ask the support desk"
      />
    </main>
  );
}
