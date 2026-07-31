import { useState } from 'react';
import { portfolioData } from '../data';
import ICON_MAP from '../utils/iconMap';
import CertificateModal from './CertificateModal';
import '../styles/Experience.css';

export default function Experience() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFile, setModalFile] = useState(null);
  const [modalFileType, setModalFileType] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  const openCertificate = (file, type, title) => {
    setModalFile(file);
    setModalFileType(type);
    setModalTitle(title);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalFile(null);
    setModalFileType(null);
    setModalTitle('');
  };

  const getFileType = (filePath) => {
    if (!filePath) return null;
    const ext = filePath.split('.').pop().toLowerCase();
    return ['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext) ? 'image' : 'pdf';
  };

  const getFileName = (filePath) => {
    if (!filePath) return '';
    const parts = filePath.split('/');
    return parts[parts.length - 1];
  };

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
            const hasCertificate = !!exp.certificate;
            const hasLor = !!exp.lor;
            const certFileType = hasCertificate ? getFileType(exp.certificate) : null;
            const lorFileType = hasLor ? getFileType(exp.lor) : null;
            const certFileName = hasCertificate ? getFileName(exp.certificate) : '';
            const lorFileName = hasLor ? getFileName(exp.lor) : '';

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

                    {/* Certificate & LOR Buttons */}
                    {(hasCertificate || hasLor) && (
                      <div className="certificate-actions">
                        {hasCertificate && (
                          <button
                            className="certificate-btn"
                            onClick={() => openCertificate(
                              exp.certificate,
                              certFileType,
                              `${exp.company} - Certificate`
                            )}
                          >
                            <span className="certificate-btn-icon">&#128196;</span>
                            View Certificate
                          </button>
                        )}
                        {hasLor && (
                          <button
                            className="certificate-btn lor-btn"
                            onClick={() => openCertificate(
                              exp.lor,
                              lorFileType,
                              `${exp.company} - Letter of Recommendation`
                            )}
                          >
                            <span className="certificate-btn-icon">&#128220;</span>
                            View LOR
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>

      {/* Certificate Modal */}
      {modalOpen && modalFile && (
        <CertificateModal
          file={modalFile}
          fileType={modalFileType}
          title={modalTitle}
          onClose={closeModal}
        />
      )}
    </section>
  );
}

