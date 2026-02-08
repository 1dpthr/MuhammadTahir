import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { portfolioData } from '../data';
import '../styles/Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: portfolioData.social.github, label: 'GitHub' },
    { icon: FaLinkedin, href: portfolioData.social.linkedin, label: 'LinkedIn' },
    { icon: FaInstagram, href: portfolioData.social.instagram, label: 'Instagram' },
    { icon: FaEnvelope, href: portfolioData.social.email, label: 'Email' }
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-main">
            <div className="footer-branding">
              <div className="footer-logo">M.TAHIR</div>
              <p className="footer-text">Built with passion by Muhammad Tahir</p>
            </div>

            <div className="footer-social">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    title={social.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-bottom">
            <p>© {currentYear} Muhammad Tahir. Future Software Engineer.</p>
            <p className="footer-note">Designed & Built with React</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

