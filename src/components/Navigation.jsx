import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Reveal from './Reveal';
import { lockScroll } from '../utils/smoothScroll';
import '../styles/Navigation.css';

const NAV_LINKS = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Skills', to: '/skills' },
  { name: 'Experience', to: '/experience' },
  { name: 'Services', to: '/services' },
  { name: 'Projects', to: '/projects' },
  { name: 'Certificates', to: '/certificates' },
  { name: 'Contact', to: '/contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const barRef = useRef(null);
  const menuRef = useRef(null);
  const location = useLocation();

  const close = useCallback(() => setIsOpen(false), []);

  /* --- scroll state + progress bar (single rAF-throttled listener) ------ */
  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;

      setScrolled(y > 24);

      // Scale instead of width: compositor-only, no layout.
      if (barRef.current) {
        const p = max > 0 ? Math.min(y / max, 1) : 0;
        barRef.current.style.transform = `scaleX(${p})`;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* --- lock body scroll while the mobile sheet is open ------------------ */
  useEffect(() => {
    if (!isOpen) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lockScroll(true);

    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      lockScroll(false);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  useEffect(() => {
    close();
  }, [location.pathname, close]);

  // Close when tapping outside the sheet.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onDown = (e) => {
      if (menuRef.current?.contains(e.target)) return;
      if (navRef.current?.contains(e.target)) return;
      setIsOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [isOpen]);

  const isActive = (to) => location.pathname === to;

  return (
    <>
      <nav ref={navRef} className={`navbar${scrolled ? ' is-scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo" onClick={close}>
            <span className="nav-logo-mark" aria-hidden="true" />
            M.TAHIR
          </Link>

          <ul className="nav-menu">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`nav-link${isActive(link.to) ? ' is-active' : ''}`}
                  aria-current={isActive(link.to) ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="nav-toggle"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`nav-burger${isOpen ? ' is-open' : ''}`} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>

        <div className="scroll-progress" aria-hidden="true">
          <span ref={barRef} className="scroll-progress-bar" />
        </div>
      </nav>

      {/* ---------- Mobile sheet ---------- */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`mobile-menu${isOpen ? ' is-open' : ''}`}
        hidden={!isOpen}
      >
        <ul className="mobile-menu-list">
          {NAV_LINKS.map((link, i) => (
            <Reveal
              as="li"
              key={link.to}
              variant="up"
              delay={isOpen ? i * 45 : 0}
              className="mobile-menu-item"
            >
              <Link
                to={link.to}
                className={`mobile-menu-link${
                  isActive(link.to) ? ' is-active' : ''
                }`}
                onClick={close}
              >
                <span className="mobile-menu-index mono">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {link.name}
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </>
  );
}
