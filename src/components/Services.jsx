import { Link } from 'react-router-dom';
import { portfolioData } from '../data';
import ICON_MAP from '../utils/iconMap';
import Reveal from './Reveal';
import { stagger } from '../utils/reveal';
import SectionHeader from './SectionHeader';
import '../styles/Services.css';

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="container">
        <SectionHeader
          number="04 — Services"
          title="Services"
          description="Development, design, mobile, game, content, and computer vision work."
        />

        <div className="services-grid">
          {portfolioData.services.map((service, index) => {
            const IconComp = ICON_MAP[service.icon];

            return (
              <Reveal
                key={service.title}
                className="card card-sweep service-card"
                variant="up"
                delay={stagger(index, 70)}
              >
                <div className="icon-tile">
                  {IconComp ? <IconComp size={20} /> : null}
                </div>

                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>

                <ul className="service-features">
                  {service.features.map((feature) => (
                    <li key={feature} className="feature">
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link to="/contact" className="btn btn-outline service-btn">
                  Discuss this service
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}