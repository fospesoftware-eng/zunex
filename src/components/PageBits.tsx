import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MeshBG, Reveal, Counter } from './Brand';

/* ═══════════════════════════════════════════════════════════
   PAGE BITS — shared building blocks for the sub-pages:
   PageHero · Faq · MiniForm · CodeTabs · StatBand · SplitImage
   ═══════════════════════════════════════════════════════════ */

export function PageHero({ kicker, title, sub, img }: { kicker: string; title: string; sub: string; img?: string }) {
  return (
    <section className="relative min-h-[62svh] flex flex-col justify-center overflow-hidden noise-bg">
      {img && (
        <>
          <img src={img} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(8,8,10,0.72) 0%, rgba(8,8,10,0.55) 50%, rgba(8,8,10,0.92) 100%)' }} />
        </>
      )}
      <MeshBG variant="steel" />
      <div className="relative z-10 max-w-container mx-auto px-6 lg:px-8 pt-24">
        <Reveal>
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-steel mb-6">{kicker}</p>
          <h1 className="font-display text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[1.02] tracking-[-0.035em] text-paper max-w-3xl mb-7">{title}</h1>
          <p className="text-[15px] leading-relaxed text-paper-dim max-w-xl">{sub}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="flex flex-col gap-3">
      {items.map((it, i) => (
        <div key={i} className="hairline rounded-2xl overflow-hidden bg-paper/[0.03]">
          <button
            data-hover
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-6 text-left px-6 py-5"
          >
            <span className="text-[15px] font-medium text-paper">{it.q}</span>
            <span className={`text-paper-dim text-xl leading-none transition-transform duration-500 ${open === i ? 'rotate-45' : ''}`}>+</span>
          </button>
          <div className="grid transition-[grid-template-rows] duration-500" style={{ gridTemplateRows: open === i ? '1fr' : '0fr' }}>
            <div className="overflow-hidden">
              <p className="px-6 pb-6 text-[14px] leading-relaxed text-paper-dim max-w-2xl">{it.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const inp = 'w-full bg-paper/5 hairline rounded-xl px-4 py-3 text-[14px] text-paper placeholder:text-paper-faint outline-none focus:border-paper/40 transition-colors appearance-none';

export type MiniField = { label: string; name: string; type?: 'text' | 'email' | 'tel' | 'select' | 'textarea'; opts?: string[]; required?: boolean; placeholder?: string; half?: boolean };

export function MiniForm({ title, cta, success, fields }: { title: string; cta: string; success: string; fields: MiniField[] }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="p-8 lg:p-10 rounded-3xl border-gradient hairline bg-ink-card/40">
      {sent ? (
        <div className="py-14 text-center">
          <p className="font-display text-3xl font-bold text-paper mb-4">Done.</p>
          <p className="text-[14px] text-paper-dim max-w-sm mx-auto leading-relaxed">{success}</p>
          <button onClick={() => setSent(false)} data-hover className="mt-8 text-[12px] font-semibold tracking-wide uppercase text-paper-soft border border-paper/20 rounded-full px-6 py-2.5 hover:bg-paper hover:text-ink transition-all duration-500">Send another</button>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid sm:grid-cols-2 gap-5">
          <p className="sm:col-span-2 font-display text-xl font-bold text-paper mb-1">{title}</p>
          {fields.map((f) => (
            <label key={f.name} className={`flex flex-col gap-2 ${f.half === false ? 'sm:col-span-2' : ''}`}>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-paper-dim">{f.label}{f.required ? ' *' : ''}</span>
              {f.type === 'select' ? (
                <select required={f.required} defaultValue="" className={inp}>
                  <option value="" disabled className="bg-ink">Select…</option>
                  {f.opts?.map((o) => <option key={o} value={o} className="bg-ink">{o}</option>)}
                </select>
              ) : f.type === 'textarea' ? (
                <textarea required={f.required} rows={4} placeholder={f.placeholder} className={inp + ' resize-none'} />
              ) : (
                <input
                  required={f.required}
                  type={f.type || 'text'}
                  placeholder={f.placeholder}
                  pattern={f.type === 'tel' ? '[6-9][0-9]{9}' : undefined}
                  title={f.type === 'tel' ? '10-digit Indian mobile number' : undefined}
                  className={inp}
                />
              )}
            </label>
          ))}
          <div className="sm:col-span-2">
            <button type="submit" data-hover className="w-fit inline-flex items-center gap-2 text-[13px] font-semibold text-ink bg-paper px-8 py-3.5 rounded-full hover:bg-steel hover:text-paper transition-all duration-500">{cta}</button>
          </div>
        </form>
      )}
    </div>
  );
}

export function CodeTabs({ tabs }: { tabs: { label: string; code: string }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="rounded-3xl border-gradient hairline overflow-hidden bg-ink">
      <div className="flex hairline-b">
        {tabs.map((t, i) => (
          <button key={i} data-hover onClick={() => setActive(i)}
            className={`px-6 py-3.5 text-[12px] font-mono tracking-wide transition-colors ${active === i ? 'text-paper bg-paper/10' : 'text-paper-dim hover:text-paper-soft'}`}>
            {t.label}
          </button>
        ))}
      </div>
      <pre className="p-6 lg:p-8 text-[12.5px] leading-relaxed font-mono text-steel-light overflow-x-auto whitespace-pre">{tabs[active].code}</pre>
    </div>
  );
}

export function StatBand({ stats }: { stats: { v: number; s?: string; l: string }[] }) {
  return (
    <div className="hairline rounded-3xl bg-paper/[0.03] grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-paper/10">
      {stats.map((st, i) => (
        <div key={i} className="px-8 py-10 text-center">
          <p className="font-display text-4xl lg:text-5xl font-bold text-paper mb-2"><Counter to={st.v} suffix={st.s} /></p>
          <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-paper-dim">{st.l}</p>
        </div>
      ))}
    </div>
  );
}

export function SplitImage({ img, kicker, title, children, flip }: { img: string; kicker: string; title: string; children: React.ReactNode; flip?: boolean }) {
  return (
    <section className="relative py-16 lg:py-24 noise-bg overflow-hidden">
      <div className={`relative max-w-container mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center`}>
        <Reveal className={flip ? 'lg:order-2' : ''}>
          <div className="relative rounded-3xl overflow-hidden hairline bg-paper/[0.03]">
            <img src={img} alt={title} className="w-full h-[320px] lg:h-[420px] object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(8,8,10,0) 55%, rgba(8,8,10,0.6) 100%)' }} />
          </div>
        </Reveal>
        <Reveal delay={0.1} className={flip ? 'lg:order-1' : ''}>
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-steel mb-5">{kicker}</p>
          <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.03em] text-paper mb-6">{title}</h2>
          <div className="text-[15px] leading-relaxed text-paper-dim flex flex-col gap-4">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}

export function CtaBand({ title, sub, to, label }: { title: string; sub: string; to: string; label: string }) {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden noise-bg">
      <div className="relative max-w-container mx-auto px-6 lg:px-8 text-center">
        <Reveal>
          <h2 className="font-display text-[clamp(1.8rem,4.5vw,3.4rem)] font-bold leading-[1.06] tracking-[-0.03em] text-paper mb-5">{title}</h2>
          <p className="text-[15px] text-paper-dim max-w-xl mx-auto mb-9 leading-relaxed">{sub}</p>
          <Link to={to} data-hover className="inline-flex items-center gap-2.5 text-[13px] font-semibold text-ink bg-paper px-8 py-4 rounded-full hover:bg-steel hover:text-paper transition-all duration-500">{label}</Link>
        </Reveal>
      </div>
    </section>
  );
}
