import { useEffect, useState } from 'react';

export type ChargePhase = 'idle' | 'charging' | 'charged';

/** Shared charge state machine for the device demos:
 *  idle → charging (pct 0→100 at stepMs) → charged (2.4s) → idle. */
export function useChargeCycle(stepMs = 34) {
  const [phase, setPhase] = useState<ChargePhase>('idle');
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (phase !== 'charging') return;
    const id = setInterval(() => setPct((p) => Math.min(100, p + 1)), stepMs);
    return () => clearInterval(id);
  }, [phase, stepMs]);

  useEffect(() => {
    if (pct === 100 && phase === 'charging') setPhase('charged');
  }, [pct, phase]);

  useEffect(() => {
    if (phase !== 'charged') return;
    const t = setTimeout(() => { setPhase('idle'); setPct(0); }, 2400);
    return () => clearTimeout(t);
  }, [phase]);

  return { phase, pct, start: () => setPhase((s) => (s === 'idle' ? 'charging' : s)) };
}
