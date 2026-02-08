import { portfolioData } from '../data';
import ICON_MAP from '../utils/iconMap';
import '../styles/Skills.css';

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-header">
          <span className="section-number">02.</span>
          <h2 className="section-title">Skills</h2>
          <p className="section-description">Technical expertise and creative tools I use</p>
        </div>

        <div className="skills-grid">
          {portfolioData.skills.map((skillGroup) => {
            const IconComp = ICON_MAP[skillGroup.icon];
            return (
              <div key={skillGroup.category} className="skill-card">
                <div className="skill-icon">{IconComp ? <IconComp /> : null}</div>
                <h3>{skillGroup.category}</h3>
                <div className="skill-badges">
                  {skillGroup.items.map((skill) => (
                    <span key={skill} className="skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

