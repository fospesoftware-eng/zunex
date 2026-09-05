import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MeshBG, Reveal, Monogram } from '../components/Brand';

/* ═══════════════════════════════════════════════════════════
   LOGIN — demo previews for the two portals: Hub operators
   and Advertisers. Front-end only: any credentials open a
   stub dashboard until real auth comes online.
   ═══════════════════════════════════════════════════════════ */

type Variant = 'hub' | 'advertiser';

const CONTENT: Record<Variant, {
  kicker: string; title: string; sub: string;
  emailLabel: string; emailPlaceholder: string;
  stats: { label: string; value: string; note: string }[];
  rows: { k: string; v: string }[];
  other: { label: string; to: string; cta: string };
}> = {
  hub: {
    kicker: 'Hub Portal',
    title: 'Sign in to your hubs.',
    sub: 'Live status, sessions and energy for every Zunex One and Plus you operate — one dashboard, every location.',
    emailLabel: 'Work email',
    emailPlaceholder: 'you@venue.com',
    stats: [
      { label: 'Sessions today', value: '128', note: '+18% vs yesterday' },
      { label: 'Energy delivered', value: '96 kWh', note: 'across 12 hubs' },
      { label: 'Fleet online', value: '12 / 12', note: 'all hubs healthy' },
    ],
    rows: [
      { k: 'Firmware', v: 'All hubs up to date · v2.4.1' },
      { k: 'Payouts', v: 'Next settlement in 3 days' },
      { k: 'Support', v: 'No open tickets' },
    ],
    other: { label: 'Run campaigns on the network?', to: '/login/advertiser', cta: 'Sign in to the advertiser portal →' },
  },
  advertiser: {
    kicker: 'Advertiser Portal',
    title: 'Sign in to your campaigns.',
    sub: 'Plan, schedule and measure placements on the hub media network — screen by screen, venue by venue.',
    emailLabel: 'Work email',
    emailPlaceholder: 'you@brand-agency.com',
    stats: [
      { label: 'Active campaigns', value: '6', note: '2 starting this week' },
      { label: 'Plays yesterday', value: '18,402', note: 'across 212 screens' },
      { label: 'Avg. completion', value: '94%', note: 'full-length views' },
    ],
    rows: [
      { k: 'Next slot', v: 'Evening block · today 18:00' },
      { k: 'Creative review', v: '1 asset awaiting approval' },
      { k: 'Invoice', v: 'August statement ready' },
    ],
    other: { label: 'Operate charging hubs?', to: '/login/hub', cta: 'Sign in to the hub portal →' },
  },
};

function Login({ variant }: { variant: Variant }) {
  const c = CONTENT[variant];
  const [signedIn, setSignedIn] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <main className="pt-24">
      <section className="relative py-16 lg:py-24 noise-bg overflow-hidden flex justify-center">
        <MeshBG variant="dark" />
        <div className="relative w-full max-w-[440px] mx-auto px-6">
          {/* ─────────── header lockup ─────────── */}
          <Reveal>
            <div className="flex flex-col items-center text-center mb-10">
              <Monogram size={44} className="mb-6" />
              <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-steel-bright mb-4">{c.kicker}</p>
              <h1 className="font-display text-[clamp(1.9rem,5vw,2.6rem)] font-bold leading-[1.08] tracking-[-0.02em] text-gradient-lux">
                {c.title}
              </h1>
              <p className="mt-4 text-[13.5px] leading-relaxed text-paper-dim">{c.sub}</p>
            </div>
          </Reveal>

          {/* ─────────── card ─────────── */}
          <Reveal delay={0.12}>
            <div className="p-8 rounded-3xl border-gradient hairline bg-ink-card/40">
              {signedIn ? (
                /* ── demo dashboard stub ── */
                <div>
                  <div className="flex items-center justify-between gap-4 mb-7">
                    <div>
                      <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-steel mb-1.5">Signed in</p>
                      <p className="font-display text-lg font-bold text-paper truncate max-w-[220px]">{email || 'demo@zunex.global'}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.14em] uppercase text-steel-bright border border-paper/15 rounded-full px-3 py-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-steel-bright" style={{ animation: 'pulse-soft 1.6s ease-in-out infinite' }} />
                      Live demo
                    </span>
                  </div>

                  {/* stat tiles */}
                  <div className="grid grid-cols-3 gap-px bg-paper/10 rounded-xl overflow-hidden mb-6">
                    {c.stats.map((s) => (
                      <div key={s.label} className="bg-ink-card/80 px-3 py-4 text-center">
                        <p className="font-display text-[17px] font-bold text-paper leading-none mb-2">{s.value}</p>
                        <p className="text-[9px] font-semibold tracking-[0.12em] uppercase text-paper-dim mb-1">{s.label}</p>
                        <p className="text-[9.5px] text-paper-faint">{s.note}</p>
                      </div>
                    ))}
                  </div>

                  {/* rows */}
                  <ul className="flex flex-col gap-3 mb-7">
                    {c.rows.map((r) => (
                      <li key={r.k} className="flex items-baseline justify-between gap-4 border-b border-paper/10 pb-3">
                        <span className="text-[12.5px] text-paper-dim">{r.k}</span>
                        <span className="text-[12.5px] font-medium text-paper text-right">{r.v}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-[11.5px] leading-relaxed text-paper-faint mb-6">
                    Demo preview — real dashboards come online with account provisioning.
                  </p>
                  <button
                    onClick={() => { setSignedIn(false); setShowPw(false); }}
                    data-hover
                    className="text-[12px] font-semibold tracking-wide uppercase text-paper-soft border border-paper/20 rounded-full px-6 py-2.5 hover:bg-paper hover:text-ink transition-all duration-500"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                /* ── form ── */
                <form
                  onSubmit={(e) => { e.preventDefault(); setSignedIn(true); }}
                  className="flex flex-col gap-5"
                >
                  <label className="flex flex-col gap-2">
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-paper-dim">{c.emailLabel}</span>
                    <input
                      required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email" placeholder={c.emailPlaceholder}
                      className="bg-paper/5 hairline rounded-xl px-4 py-3 text-[14px] text-paper placeholder:text-paper-faint outline-none focus:border-paper/40 transition-colors"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-paper-dim">Password</span>
                    <span className="relative block">
                      <input
                        required type={showPw ? 'text' : 'password'}
                        autoComplete="current-password" placeholder="••••••••"
                        className="w-full bg-paper/5 hairline rounded-xl px-4 py-3 pr-16 text-[14px] text-paper placeholder:text-paper-faint outline-none focus:border-paper/40 transition-colors"
                      />
                      <button
                        type="button" onClick={() => setShowPw(v => !v)} data-hover
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold tracking-[0.14em] uppercase text-paper-dim hover:text-paper transition-colors"
                      >
                        {showPw ? 'Hide' : 'Show'}
                      </button>
                    </span>
                  </label>

                  <div className="flex items-center justify-between gap-4">
                    <label className="inline-flex items-center gap-2.5 cursor-pointer select-none" data-hover>
                      <input type="checkbox" defaultChecked className="accent-[#9CA3AF] w-3.5 h-3.5" />
                      <span className="text-[12px] text-paper-dim">Keep me signed in</span>
                    </label>
                    <Link to="/contact" data-hover className="text-[12px] font-medium text-paper-dim hover:text-paper transition-colors">
                      Forgot password?
                    </Link>
                  </div>

                  <button type="submit" data-hover
                    className="mt-2 w-full inline-flex items-center justify-center gap-2 text-[13px] font-semibold text-ink bg-paper px-8 py-3.5 rounded-full hover:bg-steel hover:text-paper transition-all duration-500">
                    Sign in
                  </button>

                  <p className="text-center text-[11px] leading-relaxed text-paper-faint">
                    Demo build — any email and password opens the preview. No credentials are stored.
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          {/* ─────────── below-card links ─────────── */}
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-col items-center gap-3 text-center">
              <p className="text-[12px] text-paper-faint">{c.other.label}</p>
              <Link to={c.other.to} data-hover className="text-[12.5px] font-semibold text-paper-soft hover:text-paper transition-colors">
                {c.other.cta}
              </Link>
              <Link to="/contact" data-hover className="mt-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-steel hover:text-paper transition-colors">
                Request access
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

export function HubLoginPage() {
  return <Login variant="hub" />;
}

export function AdvertiserLoginPage() {
  return <Login variant="advertiser" />;
}
