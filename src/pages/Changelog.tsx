import { useState } from 'react';
import { Reveal } from '../components/Brand';
import { PageHero, CtaBand } from '../components/PageBits';

/* ═══════════════════════════════════════════════════════════
   CHANGELOG — platform + firmware releases, filterable
   ═══════════════════════════════════════════════════════════ */
const RELEASES = [
  {
    v: 'v2.4', date: 'Sep 2026', scope: 'platform+firmware',
    title: 'Screen playlists over API',
    items: [
      'POST /v1/screen/playlists — traffic campaigns to PLUS screens programmatically',
      'Proof-of-play endpoint adds dwell buckets per play',
      'Firmware 2.4.1: LCD brightness auto-dims after venue hours',
      'Payout CSV export from the dashboard',
    ],
  },
  {
    v: 'v2.3', date: 'Jul 2026', scope: 'platform',
    title: 'Multi-venue dashboards',
    items: [
      'One login for owners running several venues; per-venue revenue rollups',
      'Weekly payout schedule moves to Monday 09:00 IST with UPI-verify',
      'Session export API gains cursor pagination',
    ],
  },
  {
    v: 'v2.2', date: 'May 2026', scope: 'firmware',
    title: 'Quieter, cooler, faster',
    items: [
      '65W simultaneous dual-charge profile certified on Core',
      'Idle draw drops under 0.5W with adaptive port sleep',
      'Thermal headroom improved for sustained laptop charging',
    ],
  },
  {
    v: 'v2.0', date: 'Mar 2026', scope: 'platform+firmware',
    title: 'PLUS advertising launch',
    items: [
      'Zunex Plus ships: 10.1" calibrated LCD with campaign scheduling',
      'Ad revenue share lands in the same dashboard as charging revenue',
      'Signed webhooks for every session and play event',
    ],
  },
  {
    v: 'v1.5', date: 'Dec 2025', scope: 'platform',
    title: 'Open API v1 (stable)',
    items: [
      'Sessions, hubs, venues and revenue endpoints frozen',
      'Sandbox with two virtual hubs for every developer account',
      'Indian states, PIN validation and GST-ready invoices in billing',
    ],
  },
];

const SCOPES = ['all', 'platform', 'firmware'] as const;

export default function ChangelogPage() {
  const [scope, setScope] = useState<(typeof SCOPES)[number]>('all');
  const list = RELEASES.filter((r) => scope === 'all' || r.scope.includes(scope));

  return (
    <main>
      <PageHero
        kicker="Changelog"
        title="The platform, out loud."
        sub="Every release to hubs, dashboards and the API — shipped, dated and explained. Devices update over the air; no site visits."
        img="/products/hub.jpg"
      />

      <section className="relative py-16 lg:py-24 noise-bg">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 mb-14">
              {SCOPES.map((s) => (
                <button key={s} data-hover onClick={() => setScope(s)}
                  className={`px-5 py-2.5 rounded-full text-[12px] font-semibold tracking-wide uppercase transition-all duration-500 ${scope === s ? 'bg-paper text-ink' : 'text-paper-dim hairline hover:text-paper'}`}>
                  {s}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="relative max-w-3xl">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-paper/10" />
            <div className="flex flex-col gap-12">
              {list.map((r, i) => (
                <Reveal key={r.v} delay={i * 0.05}>
                  <div className="relative pl-10">
                    <span className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-steel bg-ink" />
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-1">
                      <h2 className="font-display text-2xl font-bold text-paper">{r.v}</h2>
                      <span className="text-[12px] text-paper-faint">{r.date}</span>
                      {r.scope.split('+').map((s) => (
                        <span key={s} className="text-[10px] font-semibold tracking-[0.18em] uppercase text-steel-light bg-paper/10 rounded-full px-3 py-1">{s}</span>
                      ))}
                    </div>
                    <p className="text-[15px] font-medium text-paper-soft mb-4">{r.title}</p>
                    <ul className="flex flex-col gap-2.5">
                      {r.items.map((it) => (
                        <li key={it} className="flex gap-3 text-[13.5px] leading-relaxed text-paper-dim">
                          <span className="w-1 h-1 rounded-full bg-steel shrink-0 mt-2" />{it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ship against the current version."
        sub="v1 is stable and additive-only — start building without worrying about your integration breaking on a Tuesday."
        to="/open-api"
        label="Read the API reference"
      />
    </main>
  );
}
