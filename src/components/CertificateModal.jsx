import { useEffect, useRef } from 'react';
import { FiX, FiFileText, FiImage } from 'react-icons/fi';
import '../styles/CertificateModal.css';

export default function CertificateModal({ file, fileType, title, onClose }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Handle click outside to close
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const isImage = fileType === 'image';
  // Files are served from public/assets/ via Vite
  // Encode URI to handle spaces in file names
  const baseUrl = import.meta.env.BASE_URL || '/';
  const encodedFile = file.split('/').map(part => encodeURIComponent(part)).join('/');
  const filePath = `${baseUrl}${encodedFile}`;

  return (
    <div
      className="certificate-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div className="certificate-modal" ref={modalRef}>
        <div className="certificate-modal-header">
          <div className="certificate-modal-title">
            {isImage ? <FiImage /> : <FiFileText />}
            <span>{title}</span>
          </div>
          <button
            className="certificate-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <FiX />
          </button>
        </div>

        <div className="certificate-modal-body">
          {isImage ? (
            <div className="certificate-image-wrapper">
              <img
                src={filePath}
                alt={title}
                className="certificate-image"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          ) : (
            <div className="certificate-pdf-wrapper">
              <iframe
                src={filePath}
                title={title}
                className="certificate-pdf"
                onContextMenu={(e) => e.preventDefault()}
              />
              {/* Transparent overlay to block the PDF viewer download/save toolbar */}
              <div
                className="pdf-overlay"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
          )}
        </div>

        <div className="certificate-modal-footer">
          <p className="certificate-footer-text">
            This document is displayed for viewing purposes only. Download is not available.
          </p>
        </div>
      </div>
    </div>
  );
}
