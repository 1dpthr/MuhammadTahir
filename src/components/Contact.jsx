import { useState } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram, FaDownload, FaPaperPlane } from 'react-icons/fa';
import { portfolioData } from '../data';
import '../styles/Contact.css';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', formState.name);
      formData.append('email', formState.email);
      formData.append('message', formState.message);

      const response = await fetch('https://formspree.io/f/xyzpleoa', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitMessage('Message sent successfully!');
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitMessage(''), 5000);
      }
    } catch (error) {
      console.error(error);
      setSubmitMessage('Error sending message.');
      setTimeout(() => setSubmitMessage(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactLinks = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'tahiramanat21@gmail.com',
      href: `mailto:tahiramanat21@gmail.com`
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/dpthr',
      href: portfolioData.social.linkedin
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      value: '@1dpthr',
      href: portfolioData.social.github
    },
    {
      icon: FaInstagram,
      label: 'Instagram',
      value: '@dp.thr',
      href: portfolioData.social.instagram
    }
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-number">06.</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-description">Ready to collaborate? Lets discuss your next project.</p>
        </div>

        <div className="contact-content">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Send me a message</h3>
            
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formState.name}
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
                value={formState.email}
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
                placeholder="Tell me about your project..."
                value={formState.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'} 
              <FaPaperPlane size={14} />
            </button>

            {submitMessage && (
              <div className={`form-message ${submitMessage.includes('successfully') ? 'success' : 'error'}`}>
                {submitMessage}
              </div>
            )}
          </form>

          <div className="contact-info">
            <div className="contact-links">
              {contactLinks.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <a 
                    key={index}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    <div className="contact-icon">
                      <Icon size={18} />
                    </div>
                    <div className="contact-text">
                      <h4>{contact.label}</h4>
                      <span>{contact.value}</span>
                    </div>
                  </a>
                );
              })}

              <a 
                href={portfolioData.resume}
                download
                className="contact-link resume-link"
              >
                <div className="contact-icon">
                  <FaDownload size={18} />
                </div>
                <div className="contact-text">
                  <h4>Resume</h4>
                  <span>Download my CV</span>
                </div>
              </a>
            </div>

            <div className="contact-note">
              <p>I typically respond within 24 hours. Looking forward to hearing from you!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

