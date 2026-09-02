import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import '../styles/Navigation.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '#about', onClick: (e) => handleScrollToSection(e, 'about') },
    { name: 'Skills', to: '/skills' },
    { name: 'Experience', to: '/experience' },
    { name: 'Services', to: '/services' },
    { name: 'Projects', to: '/projects' },
    { name: 'Certificates', to: '/certificates' },
    { name: 'Contact', to: '#contact', onClick: (e) => handleScrollToSection(e, 'contact') }
  ];

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/';
    if (to === '#about' || to === '#contact') return false;
    return location.pathname === to;
  };

  return (
    <>
      <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/" className="logo-text">M.TAHIR</Link>
          </div>

          <ul className="nav-menu">
            {navLinks.map((link) => (
              <li key={link.name} className="nav-item">
                {link.onClick ? (
                  <a
                    href={link.to}
                    className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
                    onClick={link.onClick}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    to={link.to}
                    className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <button
            className="hamburger"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <IoClose size={24} /> : <FaBars size={22} />}
          </button>
        </div>
      </nav>

      <div 
        className={`mobile-overlay ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      <ul className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        {navLinks.map((link) => (
          <li key={link.name} className="mobile-menu-item">
            {link.onClick ? (
              <a
                href={link.to}
                className="mobile-menu-link"
                onClick={link.onClick}
              >
                {link.name}
              </a>
            ) : (
              <Link
                to={link.to}
                className="mobile-menu-link"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
