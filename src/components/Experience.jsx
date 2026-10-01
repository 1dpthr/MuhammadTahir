import { useState } from 'react';
import { portfolioData } from '../data';
import ICON_MAP from '../utils/iconMap';
import CertificateModal from './CertificateModal';
import Reveal from './Reveal';
import { stagger } from '../utils/reveal';
import SectionHeader from './SectionHeader';
import '../styles/Experience.css';

const getFileType = (filePath) => {
  if (!filePath) return null;
  const ext = filePath.split('.').pop().toLowerCase();
  return ['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext) ? 'image' : 'pdf';
};

export default function Experience() {
  const [modal, setModal] = useState(null);

  const openDocument = (file, title) =>
    setModal({ file, fileType: getFileType(file), title });

  return (
    <section id="experience" className="experience">
      <div className="container">
        <SectionHeader
          number="03 — Experience"
          title="Experience"
          description="Internships across front-end, back-end, and mobile development."
        />

        <div className="timeline">
          {portfolioData.experience.map((exp, index) => {
            const IconComp = ICON_MAP[exp.icon];

            return (
              <Reveal
                key={`${exp.company}-${exp.duration}`}
                className="timeline-item"
                variant="left"
                delay={stagger(index, 90)}
              >
                <div className="timeline-rail" aria-hidden="true">
                  <span className="timeline-dot" />
                </div>

                <article className="card card-sweep experience-card">
                  <header className="experience-header">
                    <div className="icon-tile">
                      {IconComp ? <IconComp size={20} /> : null}
                    </div>
                    <div className="experience-meta">
                      <h3>{exp.company}</h3>
                      <span className="experience-role">{exp.role}</span>
                      <span className="mono experience-duration">
                        {exp.duration}
                      </span>
                    </div>
                  </header>

                  <h4 className="experience-subhead">Responsibilities</h4>
                  <ul className="responsibilities-list">
                    {exp.responsibilities.map((item) => (
                      <li key={item.title}>
                        <span className="bullet" aria-hidden="true" />
                        <div>
                          <strong>{item.title}:</strong> {item.description}
                        </div>
                      </li>
                    ))}
                  </ul>

                  <h4 className="experience-subhead">Technical Skills</h4>
                  <div className="tag-row">
                    {exp.skills.map((skill) => (
                      <span key={skill} className="tag">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {(exp.certificate || exp.lor) && (
                    <div className="certificate-actions">
                      {exp.certificate && (
                        <button
                          type="button"
                          className="btn btn-outline certificate-btn"
                          onClick={() =>
                            openDocument(
                              exp.certificate,
                              `${exp.company} — Certificate`
                            )
                          }
                        >
                          View Certificate
                        </button>
                      )}
                      {exp.lor && (
                        <button
                          type="button"
                          className="btn btn-outline certificate-btn"
                          onClick={() =>
                            openDocument(
                              exp.lor,
                              `${exp.company} — Letter of Recommendation`
                            )
                          }
                        >
                          View LOR
                        </button>
                      )}
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      {modal && (
        <CertificateModal
          file={modal.file}
          fileType={modal.fileType}
          title={modal.title}
          onClose={() => setModal(null)}
        />
      )}
    </section>
  );
}