import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiFileText, FiImage } from 'react-icons/fi';
import { lockScroll } from '../utils/smoothScroll';
import '../styles/CertificateModal.css';

const FOCUSABLE =
  'button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])';

export default function CertificateModal({ file, fileType, title, onClose }) {
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);
  const isImage = fileType === 'image';

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lockScroll(true);

    // Move focus into the dialog so Escape/Tab behave predictably.
    const first = dialogRef.current?.querySelector(FOCUSABLE);
    first?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Trap Tab inside the dialog.
      if (e.key !== 'Tab') return;
      const nodes = dialogRef.current?.querySelectorAll(FOCUSABLE);
      if (!nodes?.length) return;

      const firstNode = nodes[0];
      const lastNode = nodes[nodes.length - 1];

      if (e.shiftKey && document.activeElement === firstNode) {
        e.preventDefault();
        lastNode.focus();
      } else if (!e.shiftKey && document.activeElement === lastNode) {
        e.preventDefault();
        firstNode.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      lockScroll(false);
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  // Every certificate/LOR path now comes from a JS import in data.js, so Vite
  // has already resolved it to a hashed, correctly-based URL.
  const filePath = file;

  // Portal to <body> so the overlay can never be positioned against an
  // ancestor. This matters: `section` sets `content-visibility: auto`, which
  // implies paint containment, and paint containment makes the section a
  // containing block for `position: fixed` descendants. Rendered inline, this
  // `position: fixed; inset: 0` overlay would resolve against the section box
  // instead of the viewport and appear in the wrong place entirely.
  return createPortal(
    <div
      className="certificate-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div
        className="certificate-modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="certificate-modal-header">
          <div className="certificate-modal-title">
            {isImage ? <FiImage /> : <FiFileText />}
            <span>{title}</span>
          </div>
          <button
            type="button"
            className="certificate-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <FiX />
          </button>
        </div>

        <div className="certificate-modal-body">
          {isImage ? (
            <img
              src={filePath}
              alt={title}
              className="certificate-image"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
            />
          ) : (
            <div className="certificate-pdf-wrapper">
              <iframe
                src={filePath}
                title={title}
                className="certificate-pdf"
                onContextMenu={(e) => e.preventDefault()}
              />
              {/* Blocks the PDF viewer's download / print toolbar */}
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
            For viewing only. Downloads are unavailable.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
