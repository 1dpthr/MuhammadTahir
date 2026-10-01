import Reveal from './Reveal';
import SplitText from './SplitText';

/**
 * The numbered section header used by every section.
 * Revealing it as one block keeps the number / title / rule in sync.
 */
export default function SectionHeader({
  number,
  title,
  description,
  centered = true,
  as: Tag = 'h2',
}) {
  return (
    <Reveal
      className={`section-header${centered ? ' is-centered' : ''}`}
      variant="up"
    >
      {number && <span className="section-number">{number}</span>}

      {/* Title animates word-by-word; the number and copy fade in as one block
          around it so the block never looks half-assembled. */}
      <SplitText as={Tag} className="section-title" text={title} />

      {description && (
        <Reveal variant="blur" delay={260}>
          <p className="section-description">{description}</p>
        </Reveal>
      )}
    </Reveal>
  );
}