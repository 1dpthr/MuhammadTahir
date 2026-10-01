import { portfolioData } from '../data';
import ICON_MAP from '../utils/iconMap';
import Reveal from './Reveal';
import { stagger } from '../utils/reveal';
import SectionHeader from './SectionHeader';
import '../styles/Projects.css';

/** Flattens the per-project link buckets into one ordered link list. */
const getLinks = (project) => {
  const buckets = [
    ['Web', 'web'],
    ['Mobile', 'mobile'],
    ['Customer', 'customer'],
    ['Seller', 'seller'],
    ['Admin', 'admin'],
    ['Design', 'figma'],
    ['Code', 'github'],
  ];

  return buckets
    .filter(([, key]) => project.links[key])
    .map(([label, key]) => ({ label, url: project.links[key] }));
};

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <SectionHeader
          number="05 — Projects"
          title="Projects"
          description="Selected web, mobile, game, design, and software projects."
        />

        <div className="projects-grid">
          {portfolioData.projects.map((project, i) => {
            const links = getLinks(project);
            const IconComp = ICON_MAP[project.icon];

            return (
              <Reveal
                key={project.id}
                className="card card-sweep project-card"
                variant="up"
                delay={stagger(i, 70)}
              >
                <div className="project-card-head">
                  <div className="icon-tile">
                    {IconComp ? <IconComp size={20} /> : null}
                  </div>
                  <div className="project-meta">
                    <span className="project-type">{project.type}</span>
                    <span className="project-role">{project.role}</span>
                  </div>
                </div>

                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="tag-row project-tech">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-actions">
                  {links.map(({ label, url }, idx) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn ${idx === 0 ? 'btn-primary' : 'btn-outline'}`}
                    >
                      {label}
                      <span aria-hidden="true">↗</span>
                    </a>
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

