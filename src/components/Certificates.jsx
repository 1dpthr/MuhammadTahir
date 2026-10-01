import { useState } from 'react';
import { FiEye } from 'react-icons/fi';
import CertificateModal from './CertificateModal';
import Reveal from './Reveal';
import { stagger } from '../utils/reveal';
import SectionHeader from './SectionHeader';
import { portfolioData } from '../data';
import '../styles/Certificates.css';

export default function Certificates() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="certificates" className="certificates">
      <div className="container">
        <SectionHeader
          number="07 — Certificates"
          title="Certificates"
          description="Courses and credentials in software engineering, data structures, operating systems, and game development."
        />

        <div className="certificates-grid">
          {portfolioData.certificates.map((certificate, index) => (
            <Reveal
              key={certificate.title}
              className="card card-sweep certificate-card"
              variant="up"
              delay={stagger(index, 55)}
            >
              <div className="certificate-card-meta">
                <span className="mono certificate-issuer">
                  {certificate.issuer}
                </span>
                <span className="mono certificate-date">
                  {certificate.issueDate}
                </span>
              </div>

              <h3>{certificate.title}</h3>
              <p className="certificate-detail">{certificate.detail}</p>

              <button
                type="button"
                className="btn btn-outline certificate-view-btn"
                onClick={() => setSelected(certificate)}
              >
                <FiEye size={15} aria-hidden="true" />
                View Certificate
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {selected && (
        <CertificateModal
          file={selected.file}
          fileType="pdf"
          title={selected.title}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}