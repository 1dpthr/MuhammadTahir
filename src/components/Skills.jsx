import { portfolioData } from '../data';
import ICON_MAP from '../utils/iconMap';
import Reveal from './Reveal';
import { stagger } from '../utils/reveal';
import SectionHeader from './SectionHeader';
import '../styles/Skills.css';

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <SectionHeader
          number="02 — Skills"
          title="Skills"
          description="Technologies and tools across web, mobile, game, and software development."
        />

        <div className="skills-grid">
          {portfolioData.skills.map((skillGroup, i) => {
            const IconComp = ICON_MAP[skillGroup.icon];
            return (
              <Reveal
                key={skillGroup.category}
                className="card card-sweep skill-card"
                variant="up"
                delay={stagger(i, 70)}
              >
                <div className="skill-card-head">
                  <div className="icon-tile">
                    {IconComp ? <IconComp size={20} /> : null}
                  </div>
                  <h3>{skillGroup.category}</h3>
                </div>

                <div className="tag-row">
                  {skillGroup.items.map((skill) => (
                    <span key={skill} className="tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

