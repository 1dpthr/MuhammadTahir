import { portfolioData } from '../data';
import ICON_MAP from '../utils/iconMap';
import Reveal from './Reveal';
import { stagger } from '../utils/reveal';
import SectionHeader from './SectionHeader';
import '../styles/About.css';

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <SectionHeader
          number="01 — About"
          title="About Me"
          description="Software engineering, web, mobile, and game development."
        />

        <div className="about-grid">
          <div className="about-text">
            {portfolioData.about.intro.map((paragraph, index) => (
              <Reveal
                as="p"
                key={index}
                variant="left"
                delay={stagger(index, 90)}
              >
                {paragraph}
              </Reveal>
            ))}
          </div>

          <div className="about-cards">
            {portfolioData.about.cards.map((card, index) => {
              const IconComp = ICON_MAP[card.icon];
              return (
                <Reveal
                  key={card.title}
                  className="card card-sweep about-card"
                  variant="up"
                  delay={stagger(index, 90)}
                >
                  <div className="icon-tile">
                    {IconComp ? <IconComp size={20} /> : null}
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

