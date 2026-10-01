/**
 * Pointer-tracked spotlight for `.card-sweep` elements.
 *
 * Design notes:
 * - ONE delegated `pointermove` listener for the whole document, not one
 *   per card. A 12-project grid would otherwise attach 12 listeners and
 *   fire all of them on every mouse move.
 * - Writes two custom properties on the hovered card only, and only when
 *   they actually changed by more than a pixel. The gradient that consumes
 *   them lives in CSS as a composited layer, so this costs no layout.
 * - Fine pointers only, and never under `prefers-reduced-motion`.
 */

const CARD = '.card-sweep';
const STEP = 4; // px of movement below which we skip the write

// Module state for the one active listener.
let teardown = null;
let active = null; // card currently tracking the cursor
let lastX = 0;
let lastY = 0;

/**
 * True when the effect is safe to run: a real hovering cursor, and reduced
 * motion off. Module-internal — nothing outside imports this.
 */
function shouldEnableSpotlight() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  // Only a real hovering cursor can drive a spotlight.
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    return false;
  }
  return true;
}

function clearActive() {
  if (active) {
    active.style.removeProperty('--mx');
    active.style.removeProperty('--my');
    active = null;
  }
}

function onPointerMove(e) {
  const el = e.target instanceof Element ? e.target.closest(CARD) : null;

  if (!el) {
    clearActive();
    return;
  }

  const rect = el.getBoundingClientRect();
  const x = Math.round(e.clientX - rect.left);
  const y = Math.round(e.clientY - rect.top);

  // Skip the style write when the pointer barely moved — on a slow main
  // thread a flood of redundant writes is a classic source of jank.
  if (active === el && Math.abs(x - lastX) < STEP && Math.abs(y - lastY) < STEP) {
    return;
  }

  active = el;
  lastX = x;
  lastY = y;
  el.style.setProperty('--mx', `${x}px`);
  el.style.setProperty('--my', `${y}px`);
}

/** Mount the effect. Safe to call repeatedly; returns a cleanup fn. */
export function initSpotlight() {
  // Tear down first — React 18 StrictMode remounts in dev, and two live
  // listeners would double-write the same custom properties.
  if (teardown) teardown();

  active = null;
  lastX = 0;
  lastY = 0;

  if (!shouldEnableSpotlight()) return () => {};

  document.addEventListener('pointermove', onPointerMove, { passive: true });

  const stop = () => {
    document.removeEventListener('pointermove', onPointerMove);
    clearActive();
  };

  teardown = stop;
  return stop;
}