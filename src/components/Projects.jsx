import { portfolioData } from '../data';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import ICON_MAP from '../utils/iconMap';
import '../styles/Projects.css';

export default function Projects() {
  const getLinks = (project) => {
    const links = [];
    
    if (project.links.web) {
      links.push({ label: 'Web', url: project.links.web, icon: FaExternalLinkAlt });
    }
    if (project.links.mobile) {
      links.push({ label: 'Mobile', url: project.links.mobile, icon: FaExternalLinkAlt });
    }
    if (project.links.customer) {
      links.push({ label: 'Customer', url: project.links.customer, icon: FaExternalLinkAlt });
    }
    if (project.links.seller) {
      links.push({ label: 'Seller', url: project.links.seller, icon: FaExternalLinkAlt });
    }
    if (project.links.admin) {
      links.push({ label: 'Admin', url: project.links.admin, icon: FaExternalLinkAlt });
    }
    if (project.links.github) {
      links.push({ label: 'Code', url: project.links.github, icon: FaGithub });
    }
    if (project.links.figma) {
      links.push({ label: 'Design', url: project.links.figma, icon: FaExternalLinkAlt });
    }
    
    return links;
  };

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <span className="section-number">05.</span>
          <h2 className="section-title">Projects</h2>
          <p className="section-description">A selection of my practical projects</p>
        </div>

        <div className="projects-grid">
          {portfolioData.projects.map((project) => {
            const links = getLinks(project);
            const IconComp = ICON_MAP[project.icon];
            return (
              <div key={project.id} className="project-card">
                <div className="project-card-content">
                  <div className="project-header">
                    <div className="project-icon">{IconComp ? <IconComp /> : project.icon}</div>
                    <div className="project-meta">
                      <span className="project-type">{project.type}</span>
                      <span className="project-role">{project.role}</span>
                    </div>
                  </div>

                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-tech">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    {links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn ${idx === 0 ? 'btn-primary' : 'btn-outline'}`}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

