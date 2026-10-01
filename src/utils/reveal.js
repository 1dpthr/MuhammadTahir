/**
 * Stagger ramp for reveal delays, in milliseconds.
 *
 * Capped at `max` items: on a 12-card grid an uncapped ramp would leave the
 * last card waiting ~800ms after it scrolled into view, which reads as lag
 * rather than choreography.
 */
export const stagger = (index, step = 70, max = 8) =>
  Math.min(index, max) * step;