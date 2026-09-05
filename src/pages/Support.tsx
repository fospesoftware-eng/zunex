import { Reveal } from '../components/Brand';
import { PageHero, Faq, MiniForm, CtaBand } from '../components/PageBits';

/* ═══════════════════════════════════════════════════════════
   SUPPORT — FAQs, warranty basics, ticket desk
   ═══════════════════════════════════════════════════════════ */
const FAQS = [
  { q: 'How long does installation take?', a: 'A Zunex Core hub installs in about 15 minutes on a standard counter or wall. Zunex Plus with the LCD screen takes around 30 minutes. Both ship pre-configured — power, plug in the cable collar, connect to Wi-Fi and you are live.' },
  { q: 'What is covered by the warranty?', a: 'Every hub carries a 12-month replacement warranty covering the power board, charging controller and enclosure. Accessories such as cables carry a 6-month warranty. Damage from liquid ingress or unauthorised opening is not covered.' },
  { q: 'How do payouts work?', a: 'Pay-per-charge revenue lands in your dashboard in real time and is settled to your bank account every Monday for the previous week. You set the session price; ZUNEX takes a small platform share on each transaction.' },
  { q: 'Does the device work during a power cut?', a: 'Sessions pause safely when mains power drops and resume automatically when power returns. No data is lost — the hub caches the session and syncs when back online.' },
  { q: 'Which phones can charge?', a: 'Any device that supports USB-C Power Delivery or Qi wireless — that covers recent iPhone, Android, tablets and accessories. 65W output fast-charges laptops too.' },
  { q: 'Can I move the hub to another venue?', a: 'Yes. Unplug, carry, replug — the hub re-registers itself to your dashboard. For permanent relocations update the venue address in the dashboard so payouts and ad contracts follow the right site.' },
];

export default function SupportPage() {
  return (
    <main>
      <PageHero
        kicker="Support"
        title="Help that answers on the first call."
        sub="Install guides, warranty cover, payouts and troubleshooting — and a human ticket desk when you would rather just ask."
        img="/products/display.jpg"
      />

      {/* FAQ */}
      <section className="relative py-16 lg:py-24 noise-bg">
        <div className="max-w-container mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-14">
          <Reveal className="lg:col-span-2">
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-steel mb-6">Common questions</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-paper mb-6">Everything owners ask us.</h2>
            <p className="text-[15px] leading-relaxed text-paper-dim">Can't find it here? Raise a ticket below — the support desk replies within one working day, in English or Hindi.</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-3">
            <Faq items={FAQS} />
          </Reveal>
        </div>
      </section>

      {/* Ticket form + quick channels */}
      <section className="relative py-16 lg:py-24 noise-bg overflow-hidden">
        <div className="max-w-container mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-14 items-start">
          <Reveal className="lg:col-span-2">
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-steel mb-6">Ticket desk</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-paper mb-6">Raise a ticket.</h2>
            <div className="flex flex-col gap-4 text-[14px] text-paper-dim mt-8">
              <p><span className="text-paper font-medium">Warranty & service</span><br />support@zunex.global</p>
              <p><span className="text-paper font-medium">Payouts & billing</span><br />billing@zunex.global</p>
              <p><span className="text-paper font-medium">Phone (Mon–Sat, 9:30–18:30 IST)</span><br />+91 90000 00000</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-3">
            <MiniForm
              title="Support ticket"
              cta="Submit ticket"
              success="Ticket logged. The support desk will call or email you within one working day."
              fields={[
                { label: 'Full name', name: 'name', required: true, placeholder: 'Your name' },
                { label: 'Phone', name: 'phone', type: 'tel', required: true, placeholder: '10-digit mobile' },
                { label: 'Email', name: 'email', type: 'email', required: true, placeholder: 'you@company.com' },
                { label: 'Device', name: 'device', type: 'select', required: true, opts: ['Zunex Core', 'Zunex Plus', 'Accessory'] },
                { label: 'Serial number (on the base plate)', name: 'serial', placeholder: 'ZX-XXXX-XXXX', half: true },
                { label: 'Order ID (if available)', name: 'order', placeholder: 'From your invoice', half: true },
                { label: 'City', name: 'city', required: true, placeholder: 'e.g. Delhi' },
                { label: 'PIN code', name: 'pin', required: true, placeholder: '6-digit PIN' },
                { label: 'What happened?', name: 'issue', type: 'textarea', required: true, half: false, placeholder: 'Describe the issue — what you see, when it started, what you tried.' },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Own a ZUNEX? The dashboard is your friend."
        sub="Live sessions, revenue and device health — the owner dashboard answers most questions before you ask."
        to="/owner"
        label="Open the owner page"
      />
    </main>
  );
}
