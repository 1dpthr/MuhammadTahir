import { useLocation, useNavigate } from 'react-router-dom';
import { portfolioData } from '../data';
import ICON_MAP from '../utils/iconMap';
import '../styles/Services.css';

export default function Services() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleContactClick = (event) => {
    event.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
      return;
    }
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-header">
          <span className="section-number">04.</span>
          <h2 className="section-title">Services</h2>
          <p className="section-description">Development, design, mobile, game, content, and computer vision services</p>
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

              <a href="#contact" onClick={handleContactClick} className="btn btn-outline service-btn">
                Discuss this service
              </a>
            </div>
          )})}
        </div>
      </div>
    </section>
  );
}

