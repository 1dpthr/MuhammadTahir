import { portfolioData } from '../data';
import ICON_MAP from '../utils/iconMap';
import '../styles/Services.css';

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-header">
          <span className="section-number">04.</span>
          <h2 className="section-title">Services</h2>
          <p className="section-description">Comprehensive software solutions tailored to your needs</p>
        </div>

        <div className="services-grid">
          {portfolioData.services.map((service, index) => {
            const IconComp = ICON_MAP[service.icon];
            return (
            <div key={index} className="service-card">
              <div className="service-icon">{IconComp ? <IconComp /> : service.icon}</div>
              
              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <div className="service-features">
                {service.features.map((feature) => (
                  <div key={feature} className="feature">
                    {feature}
                  </div>
                ))}
              </div>

              <a href="#contact" className="btn btn-outline service-btn">
                Get Started
              </a>
            </div>
          )})}
        </div>
      </div>
    </section>
  );
}

