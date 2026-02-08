import { portfolioData } from '../data';
import ICON_MAP from '../utils/iconMap';
import '../styles/Experience.css';

export default function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="container">
        <div className="section-header">
          <span className="section-number">03.</span>
          <h2 className="section-title">Experience</h2>
          <p className="section-description">Professional journey and key projects</p>
        </div>

        <div className="timeline">
          {portfolioData.experience.map((exp, index) => {
            const IconComp = ICON_MAP[exp.icon];
            return (
            <div key={index} className="timeline-item">
              <div className="timeline-marker">
                <div className="timeline-dot"></div>
              </div>
              
              <div className="timeline-content">
                <div className="experience-card card">
                  <div className="experience-header">
                    <div className="experience-icon">{IconComp ? <IconComp /> : exp.icon}</div>
                    <div className="experience-meta">
                      <h3>{exp.company}</h3>
                      <span className="experience-role">{exp.role}</span>
                      <span className="experience-duration">{exp.duration}</span>
                    </div>
                  </div>

                  <div className="experience-content">
                    <h4>Key Responsibilities</h4>
                    <ul className="responsibilities-list">
                      {exp.responsibilities.map((item, idx) => (
                        <li key={idx}>
                          <span className="bullet">+</span>
                          <div>
                            <strong>{item.title}:</strong> {item.description}
                          </div>
                        </li>
                      ))}
                    </ul>

                    <h4>Technical Skills</h4>
                    <div className="skill-tags">
                      {exp.skills.map((skill) => (
                        <span key={skill} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>
    </section>
  );
}

