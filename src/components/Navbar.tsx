import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Logotype } from './Brand';

const NAV_LINKS = [
  { label: 'Owner', to: '/owner' },
  { label: 'Fast Charge', to: '/fast-charge' },
  { label: 'Advertise', to: '/advertise' },
  { label: 'Enterprise', to: '/enterprise' },
  { label: 'ROI', to: '/roi' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
        scrolled ? 'bg-ink/70 backdrop-blur-2xl py-4' : 'bg-transparent py-6'
      }`}
      style={{ transitionTimingFunction: 'var(--ease-lux)' }}
    >
      <nav className="max-w-container mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" data-hover className="flex items-center gap-3 text-paper group">
          <Logotype className="h-6 opacity-90 group-hover:opacity-100 transition-opacity" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              data-hover
              className={({ isActive }) =>
                `font-display text-[16px] font-medium tracking-wide transition-colors duration-300 ${
                  isActive ? 'text-paper' : 'text-paper-dim hover:text-paper'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/#contact"
          data-hover
          className="hidden lg:inline-flex items-center gap-2 text-[12px] font-semibold text-ink bg-paper px-6 py-2.5 rounded-full hover:bg-steel hover:text-paper transition-all duration-300"
        >
          Get in touch
        </Link>

        {/* Mobile toggle */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span className={`w-5 h-[1.5px] bg-paper transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`w-5 h-[1.5px] bg-paper transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-[1.5px] bg-paper transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-ink/95 backdrop-blur-2xl hairline-b">
          <div className="px-6 py-8 flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `text-base font-medium transition-colors ${isActive ? 'text-paper' : 'text-paper-soft hover:text-paper'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex w-fit items-center gap-2 text-[12px] font-semibold text-ink bg-paper px-6 py-2.5 rounded-full"
            >
              Get in touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
