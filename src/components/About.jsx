import { portfolioData } from '../data';
import ICON_MAP from '../utils/iconMap';
import '../styles/About.css';

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <span className="section-number">01.</span>
          <h2 className="section-title">About Me</h2>
          <p className="section-description">Get to know me better</p>
        </div>

        <div className="about-content">
          <div className="about-text">
            {portfolioData.about.intro.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="about-cards">
            {portfolioData.about.cards.map((card, index) => {
              const IconComp = ICON_MAP[card.icon];
              return (
                <div key={index} className="about-card">
                  <div className="about-card-icon">{IconComp ? <IconComp /> : card.icon}</div>
                  <div className="about-card-content">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

