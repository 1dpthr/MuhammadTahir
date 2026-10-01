import { useEffect, useState } from 'react';
import '../styles/LoadingScreen.css';

const DURATION = 1100; // ms
const FADE = 420; // ms

/**
 * Short, monochrome intro. Deliberately brief: a long splash is the single
 * biggest self-inflicted delay on a portfolio, so this is the one animation
 * we keep, and we keep it small.
 */
export default function LoadingScreen({ onComplete }) {
  const [leaving, setLeaving] = useState(false);

  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const wait = reduce ? 0 : DURATION;
    const fade = reduce ? 0 : FADE;

    const fadeTimer = setTimeout(() => setLeaving(true), wait);
    const doneTimer = setTimeout(() => onComplete?.(), wait + fade);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete, reduce]);

  return (
    <div
      className={`loading-screen${leaving ? ' is-leaving' : ''}`}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="loading-mark">M.TAHIR</div>
      <span className="loading-bar" aria-hidden="true">
        <span className="loading-bar-fill" />
      </span>
    </div>
  );
}