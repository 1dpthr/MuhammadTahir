import { useState } from 'react';
import { FiAward, FiEye } from 'react-icons/fi';
import CertificateModal from './CertificateModal';
import { portfolioData } from '../data';
import '../styles/Certificates.css';

export default function Certificates() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  return (
    <section className="certificates">
      <div className="container">
        <div className="section-header">
          <span className="section-number">07.</span>
          <h1 className="section-title">Certificates</h1>
          <p className="section-description">Courses and credentials in software engineering, data structures, operating systems, and game development</p>
        </div>

        <div className="certificates-grid">
          {portfolioData.certificates.map((certificate, index) => (
            <article className="certificate-card" key={certificate.title} style={{ '--certificate-delay': `${index * 60}ms` }}>
              <div className="certificate-card-icon"><FiAward /></div>
              <div className="certificate-card-content">
                <div className="certificate-card-meta">
                  <p className="certificate-issuer">{certificate.issuer}</p>
                  <p className="certificate-date">{certificate.issueDate}</p>
                </div>
                <h2>{certificate.title}</h2>
                <p className="certificate-detail">{certificate.detail}</p>
                <button
                  className="certificate-view-btn"
                  onClick={() => setSelectedCertificate(certificate)}
                >
                  <FiEye /> View Certificate
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedCertificate && (
        <CertificateModal
          file={selectedCertificate.file}
          fileType="pdf"
          title={selectedCertificate.title}
          onClose={() => setSelectedCertificate(null)}
        />
      )}
    </section>
  );
}