import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { portfolioData } from '../data';
import Reveal from './Reveal';
import '../styles/Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: portfolioData.social.github, label: 'GitHub' },
    { icon: FaLinkedin, href: portfolioData.social.linkedin, label: 'LinkedIn' },
    { icon: FaInstagram, href: portfolioData.social.instagram, label: 'Instagram' },
    { icon: FaEnvelope, href: portfolioData.social.email, label: 'Email' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <Reveal variant="up">
          <div className="footer-main">
            <div className="footer-branding">
              <span className="footer-logo">M.TAHIR</span>
              <p className="footer-text">
                Software Engineering Student — Web, Mobile &amp; Unity Developer
              </p>
            </div>

            <ul className="footer-social">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label={social.label}
                    >
                      <Icon size={17} aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>

        <div className="footer-divider" />

        <Reveal variant="up" delay={80}>
          <div className="footer-bottom">
            <p>
              &copy; {year} Muhammad Tahir. All rights reserved.
            </p>
            <p className="footer-note">Designed &amp; built with React.</p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}