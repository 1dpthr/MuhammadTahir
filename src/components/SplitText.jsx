/**
 * Word-by-word masked heading reveal — the signature "premium" motion.
 *
 * Each word is wrapped in an inline-block span with its own stagger delay, so
 * the heading appears to rise word by word behind invisible curtains. The CSS
 * hides and animates the spans; this component only owns the split and the
 * per-word delay.
 *
 * Implementation notes:
 * - Words stay real text nodes inside spans, so the heading is still selectable,
 *   searchable and readable by screen readers (each word is plain text, and the
 *   spaces between them are preserved with a real whitespace span).
 * - The delay cap (`maxWords`) stops a very long heading from taking so long
 *   that the last word arrives after the user has already read it.
 * - Reduced-motion users get the whole heading immediately: the spans are
 *   rendered without a delay and the CSS forces them visible.
 */
import { Fragment } from 'react';
import Reveal from './Reveal';

export default function SplitText({
  as: Tag = 'h2',
  text = '',
  delay = 0,
  step = 45,
  maxWords = 10,
  className = '',
  ...rest
}) {
  const words = String(text).split(/\s+/).filter(Boolean);

  return (
    <Reveal as={Tag} variant="word" delay={delay} className={className} {...rest}>
      {words.map((word, i) => (
        // The separating space lives OUTSIDE the span. A span is
        // `display: inline-block`, and trailing whitespace inside an inline
        // box gets trimmed — putting the space inside would run every word
        // together. As a sibling text node it collapses normally and the
        // heading still wraps at the right places.
        <Fragment key={`${word}-${i}`}>
          <span style={{ '--word-delay': `${Math.min(i, maxWords) * step}ms` }}>
            {word}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </Reveal>
  );
}