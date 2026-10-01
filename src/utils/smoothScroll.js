/**
 * Lightweight inertial (lerp) smooth scrolling.
 *
 * Design notes:
 * - Desktop pointers only. Touch devices keep native scrolling, which is
 *   already momentum-optimised and hijacking it here would make it worse.
 * - Disabled entirely for `prefers-reduced-motion: reduce`.
 * - One rAF loop that self-stops the moment it settles (no idle CPU burn).
 * - Any scroll we did NOT cause (scrollbar drag, find-in-page, focus jump,
 *   form-field scrolling) resyncs the engine instead of fighting it.
 */

const MAX_SCROLL = () =>
  Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

let engine = null;

/** Imperatively scroll to an absolute Y, animated through the engine. */
export function scrollToY(y, { immediate = false, offset = 0 } = {}) {
  const dest = clamp(y + offset, 0, MAX_SCROLL());
  if (!engine) {
    window.scrollTo({ top: dest, behavior: immediate ? 'auto' : 'smooth' });
    return;
  }
  engine.state.target = dest;
  if (immediate) {
    engine.state.syncTo(dest);
    engine.state.stop();
  } else {
    engine.state.start();
  }
}

/**
 * Freeze the engine (modal open, mobile menu open). The page itself is
 * scroll-locked with CSS overflow, so focus-scroll cannot fight us.
 */
export function lockScroll(locked) {
  if (!engine) return;
  engine.state.locked = locked;
  if (locked) engine.state.stop();
  else engine.state.syncFromWindow();
}
function createEngine() {
  const LERP = 0.115;

  const state = {
    target: 0,
    current: 0,
    lastWritten: 0,
    raf: 0,
    // True while a modal / mobile sheet owns the viewport. The engine still
    // refuses to move the page, because `window.scrollTo` still works even
    // when `body { overflow: hidden }` hides the scrollbar.
    locked: false,

    start() {
      if (!state.raf) state.raf = requestAnimationFrame(frame);
    },

    stop() {
      if (state.raf) cancelAnimationFrame(state.raf);
      state.raf = 0;
    },

    syncTo(y) {
      state.current = y;
      state.target = y;
      state.lastWritten = y;
      window.scrollTo(0, y);
    },

    syncFromWindow() {
      state.syncTo(window.scrollY);
    },
  };

  function frame() {
    const diff = state.target - state.current;

    if (Math.abs(diff) < 0.08) {
      state.syncTo(state.target);
      state.raf = 0;
      return;
    }

    state.current += diff * LERP;
    window.scrollTo(0, state.current);
    state.lastWritten = state.current;
    state.raf = requestAnimationFrame(frame);
  }

  // --- wheel --------------------------------------------------------------
  const onWheel = (e) => {
    if (state.locked) return;
    if (e.ctrlKey) return; // pinch-zoom / browser zoom
    if (e.defaultPrevented) return;

    let d = e.deltaY;
    if (e.deltaMode === 1) d *= 18; // lines
    else if (e.deltaMode === 2) d *= window.innerHeight; // pages

    state.target = clamp(state.target + d, 0, MAX_SCROLL());
    e.preventDefault();
    state.start();
  };

  // --- keyboard -----------------------------------------------------------
  const isTypingTarget = (el) =>
    el &&
    (el.tagName === 'INPUT' ||
      el.tagName === 'TEXTAREA' ||
      el.tagName === 'SELECT' ||
      el.isContentEditable);

  const onKeyDown = (e) => {
    if (state.locked) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (isTypingTarget(e.target)) return;

    const page = window.innerHeight * 0.86;
    let d;

    switch (e.key) {
      case 'ArrowDown':
        d = 80;
        break;
      case 'ArrowUp':
        d = -80;
        break;
      case 'PageDown':
      case ' ':
        d = page;
        break;
      case 'PageUp':
        d = -page;
        break;
      case 'Home':
        e.preventDefault();
        state.target = 0;
        state.start();
        return;
      case 'End':
        e.preventDefault();
        state.target = MAX_SCROLL();
        state.start();
        return;
      default:
        return;
    }

    e.preventDefault();
    state.target = clamp(state.target + d, 0, MAX_SCROLL());
    state.start();
  };

  // --- adopt external scrolls ---------------------------------------------
  const onScroll = () => {
    // The browser moved us somewhere we didn't ask for -> adopt it.
    if (Math.abs(window.scrollY - state.lastWritten) > 1.5) {
      state.syncFromWindow();
    }
  };

  let resizeRaf = 0;
  const onResize = () => {
    if (resizeRaf) return;
    resizeRaf = requestAnimationFrame(() => {
      resizeRaf = 0;
      state.syncFromWindow();
    });
  };

  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);

  return {
    state,
    destroy() {
      state.stop();
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    },
  };
}

/**
 * True when smooth scrolling is safe to run: a fine pointer (touch keeps
 * native momentum, which is already better), reduced motion off, and no
 * manual kill switch. Module-internal — nothing outside imports this.
 */
function shouldEnableSmoothScroll() {
  if (typeof window === 'undefined') return false;
  if (window.__SMOOTH_SCROLL_DISABLED__) return false;
  if (window.matchMedia('(pointer: coarse)').matches) return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  return true;
}

/** Mount the engine. Safe to call more than once; returns a cleanup fn. */
export function initSmoothScroll() {
  // Always tear down any previous engine first. React 18 StrictMode mounts,
  // unmounts and remounts in dev, and a stale engine left in place there would
  // leave scrolling permanently dead.
  if (engine) engine.destroy();
  engine = null;
  document.documentElement.classList.remove('js-smooth');

  if (!shouldEnableSmoothScroll()) return () => {};

  const created = createEngine();
  created.state.syncFromWindow();
  engine = created;

  document.documentElement.classList.add('js-smooth');

  return () => {
    created.destroy();
    document.documentElement.classList.remove('js-smooth');
    if (engine === created) engine = null;
  };
}