import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profilePhoto from '../assets/Profile.jpg';
import { portfolioData } from '../data';
import Reveal from './Reveal';
import '../styles/Hero.css';

/**
 * The headline is split on " & " so it wipes in as two masked lines while
 * staying driven by data.js — edit the title there, not here.
 */
const TITLE_LINES = portfolioData.title.split(/\s*&\s*/);

export default function Hero() {
  const navigate = useNavigate();
  const shellRef = useRef(null);

  // Scroll parallax: transform only, rAF-throttled, cached offsets.
  // The headline and portrait drift at different rates -> depth, zero paint cost.
  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const titleEl = shell.querySelector('.hero-title');
    const mediaEl = shell.querySelector('.hero-portrait');

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(pointer: fine)');
    if (reduce.matches || !fine.matches) return;

    let raf = 0;
    let lastY = window.scrollY;
    // Last values written, so we can compare and skip redundant style writes.
    let lastTitle = 0;
    let lastMedia = 0;

    const reset = () => {
      if (titleEl) titleEl.style.transform = '';
      if (mediaEl) mediaEl.style.transform = '';
      lastTitle = 0;
      lastMedia = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;

        const y = window.scrollY;
        const d = y - lastY;
        lastY = y;

        // Past the fold the hero is off-screen. Clear the transforms so the
        // next route's hero doesn't mount pre-offset, and stop writing.
        if (y > window.innerHeight * 1.2) {
          reset();
          return;
        }

        // Only write when the value actually moved a meaningful amount.
        const t = y * 0.16;
        if (titleEl && Math.abs(t - lastTitle) > 0.5) {
          titleEl.style.transform = `translate3d(0, ${t}px, 0)`;
          lastTitle = t;
        }

        const m = y * -0.06;
        if (mediaEl && Math.abs(m - lastMedia) > 0.5) {
          mediaEl.style.transform = `translate3d(0, ${m}px, 0)`;
          lastMedia = m;
        }

        // Recede: one custom property in 0..1 that CSS turns into a scale +
        // fade. Doing it here means the browser animates a composited
        // property rather than us re-triggering layout each frame.
        shell.style.setProperty('--hero-p', (y / window.innerHeight).toFixed(3));

        // Fade the scroll cue out as soon as the user commits to scrolling,
        // and bring it back if they return to the top.
        shell.classList.toggle('is-scrolled', d > 0 && y > 12);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
      reset();
      shell.style.removeProperty('--hero-p');
    };
  }, []);

  return (
    <section id="home" className="hero" ref={shellRef}>
      <div className="container hero-inner">
        <div className="hero-grid">
          <div className="hero-primary">
            <Reveal variant="up" className="hero-eyebrow">
              <span className="hero-eyebrow-dot" aria-hidden="true" />
              {portfolioData.subtitle}
            </Reveal>

            <h1 className="hero-title">
              {TITLE_LINES.map((line, i) => (
                <span className="hero-title-line" key={line}>
                  {/* `line` (translate up behind an overflow:hidden curtain)
                      rather than `mask` (clip-path): a clip-path that fails to
                      resolve leaves the headline invisible with no fallback,
                      whereas this variant is still a plain block of text. */}
                  <Reveal variant="line" delay={100 + i * 120} as="span">
                    {i > 0 ? `& ${line}` : line}
                  </Reveal>
                </span>
              ))}
            </h1>

            <Reveal variant="up" delay={380}>
              <p className="hero-description">{portfolioData.description}</p>
            </Reveal>

            <Reveal variant="up" delay={480} className="hero-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate('/projects')}
              >
                View Projects
                <span aria-hidden="true">&rarr;</span>
              </button>

              <a
                href={portfolioData.resume}
                download
                className="btn btn-outline"
              >
                Download Resume
                <span aria-hidden="true">&darr;</span>
              </a>
            </Reveal>

            <Reveal variant="blur" delay={620} className="hero-meta">
              <span className="hero-meta-item">
                <span className="hero-meta-dot" aria-hidden="true" />
                Open to internships &amp; collaborations
              </span>
              <span className="hero-meta-sep" aria-hidden="true" />
              <span className="hero-meta-item">Lahore, PK</span>
            </Reveal>
          </div>

          <Reveal
            variant="scale"
            delay={260}
            className="hero-portrait-wrap"
          >
            <div className="hero-portrait">
              <img
                src={profilePhoto}
                alt={portfolioData.name}
                /* Must match the real asset (Profile.jpg is 1080x1920). The old
                   640x640 lied about the intrinsic ratio, so the browser reserved
                   a square box before the CSS aspect-ratio applied and the layout
                   jumped once the image decoded. */
                width="1080"
                height="1920"
                decoding="async"
                fetchpriority="high"
              />
            </div>
            <div className="hero-portrait-caption">
              <span className="mono">{portfolioData.name}</span>
              <span className="mono">Lahore, PK</span>
            </div>
          </Reveal>
        </div>

        <div className="hero-foot" aria-hidden="true">
          <span className="hero-foot-rule" />
          <span className="mono">Scroll</span>
        </div>
      </div>
    </section>
  );
}

