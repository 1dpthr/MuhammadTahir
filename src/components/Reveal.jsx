import { useEffect, useRef, useState, createElement } from 'react';

/**
 * Scroll-reveal primitive.
 *
 * All reveals across the app share ONE IntersectionObserver instance, so a
 * page with 60 cards still costs a single observer, not 60. Elements unobserve
 * themselves the moment they are shown, so the observer's set drains to zero
 * as you scroll and costs nothing afterwards.
 *
 * Safety: an element must never be able to get stuck invisible. Two guards:
 *   1. `html.js` is set at boot, and every hidden state is scoped to it, so if
 *      JS fails to run the content is simply visible.
 *   2. Anything already inside the viewport on mount reveals synchronously —
 *      no waiting on the observer's first async callback.
 */

let observer = null;
const callbacks = new WeakMap();

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function getObserver() {
  if (observer || typeof IntersectionObserver === 'undefined') return observer;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const cb = callbacks.get(entry.target);
        if (cb) cb();
        observer.unobserve(entry.target);
        callbacks.delete(entry.target);
      }
    },
    {
      // Fire slightly before the element's top edge reaches the fold bottom,
      // so reveals feel connected to the scroll rather than lagging behind it.
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.01,
    }
  );

  return observer;
}

/** True when the element is already at or above the fold. */
function isOnScreen(el) {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight && r.bottom > 0;
}

/**
 * @param {object}  props
 * @param {'up'|'left'|'right'|'scale'|'mask'|'line'|'blur'} [props.variant='up']
 * @param {number|string} [props.delay=0]  ms before the animation starts
 * @param {string} [props.as='div']         element to render
 */
export default function Reveal({
  as = 'div',
  variant = 'up',
  delay = 0,
  className = '',
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);
  // Reduced-motion users get visible markup immediately — no flash, no JS wait.
  const [shown, setShown] = useState(
    () => prefersReducedMotion() || typeof IntersectionObserver === 'undefined'
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (shown) {
      el.classList.add('is-visible');
      return;
    }

    const io = getObserver();
    if (!io) {
      setShown(true);
      return;
    }

    // Already on screen at mount — don't wait for the observer to call back.
    if (isOnScreen(el)) {
      setShown(true);
      return;
    }

    callbacks.set(el, () => setShown(true));
    io.observe(el);

    return () => {
      callbacks.delete(el);
      io.unobserve(el);
    };
  }, [shown]);

  return createElement(
    as,
    {
      ref,
      'data-reveal': variant,
      className: `${className}${shown ? ' is-visible' : ''}`.trim(),
      style: delay ? { ...style, '--reveal-delay': `${delay}ms` } : style,
      ...rest,
    },
    children
  );
}