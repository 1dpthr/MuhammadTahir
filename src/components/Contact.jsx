import { useState } from 'react';
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaDownload,
  FaPaperPlane,
} from 'react-icons/fa';
import { portfolioData } from '../data';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import '../styles/Contact.css';

const EMPTY = { name: '', email: '', message: '' };
const FORMSPREE = 'https://formspree.io/f/xyzpleoa';

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState(null); // { type: 'ok' | 'error', text }
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const body = new FormData();
    body.append('name', form.name);
    body.append('email', form.email);
    body.append('message', form.message);

    try {
      const res = await fetch(FORMSPREE, {
        method: 'POST',
        body,
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      setForm(EMPTY);
      setStatus({
        type: 'ok',
        text: 'Message sent. I will get back to you soon.',
      });
    } catch (error) {
      console.error(error);
      setStatus({
        type: 'error',
        text: `Could not send your message. Email me directly at ${portfolioData.email}.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactLinks = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: portfolioData.email,
      href: portfolioData.social.email,
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/dpthr',
      href: portfolioData.social.linkedin,
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      value: '@1dpthr',
      href: portfolioData.social.github,
    },
    {
      icon: FaInstagram,
      label: 'Instagram',
      value: '@dp.thr',
      href: portfolioData.social.instagram,
    },
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <SectionHeader
          number="06 — Contact"
          title="Get In Touch"
          description="Ready to collaborate? Tell me about your next project."
        />

        <div className="contact-grid">
          <Reveal variant="up" className="card contact-form">
            <h3>Discuss a project</h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Tell me about your project or development needs..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary contact-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending…' : 'Send Message'}
                <FaPaperPlane size={14} aria-hidden="true" />
              </button>

              <p
                className={`form-message ${status ? `is-${status.type}` : ''}`}
                role="status"
                aria-live="polite"
              >
                {status?.text ?? ''}
              </p>
            </form>
          </Reveal>

          <div className="contact-side">
            <Reveal variant="right" className="contact-links">
              {contactLinks.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link card card-sweep"
                >
                  <div className="icon-tile">
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <div className="contact-text">
                    <h4>{label}</h4>
                    <span>{value}</span>
                  </div>
                  <span className="contact-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ))}

              <a
                href={portfolioData.resume}
                download
                className="contact-link card card-sweep"
              >
                <div className="icon-tile">
                  <FaDownload size={18} aria-hidden="true" />
                </div>
                <div className="contact-text">
                  <h4>Resume</h4>
                  <span>Download my resume</span>
                </div>
                <span className="contact-arrow" aria-hidden="true">
                  ↓
                </span>
              </a>
            </Reveal>

            <Reveal variant="up" delay={120} className="contact-note">
              <p>
                Open to software, web, mobile, game, and design work — including
                internships and collaborative projects.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}