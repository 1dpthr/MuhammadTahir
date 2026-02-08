import { useState, useEffect } from 'react';
import { FaArrowRight, FaDownload } from 'react-icons/fa';
import { portfolioData } from '../data';
import '../styles/Hero.css';

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const fullText = portfolioData.title;
  const [startTyping, setStartTyping] = useState(false);

  // Delay typing until after loading screen finishes
  useEffect(() => {
    const t = setTimeout(() => setStartTyping(true), 2600);
    return () => clearTimeout(t);
  }, []);

  // Typing animation for main title (starts when `startTyping` is true)
  useEffect(() => {
    if (!startTyping) return;
    if (displayText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [displayText, fullText, startTyping]);

  const handleScroll = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(false);
  };

  return (
    <section id="home" className="hero">
      <div className="hero-glow"></div>
      <div className="hero-stars"></div>
      <div className="hero-content">
        <div className="hero-avatar">
          <div className="avatar-wrapper">
            <img 
              src="assets/Profile.jpg" 
              alt={portfolioData.name}
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{ display: imageLoaded ? 'block' : 'none' }}
            />
            {!imageLoaded && <div className="avatar-fallback">MT</div>}
          </div>
        </div>

        <p className="hero-subtitle">HI, I&apos;M {portfolioData.name.toUpperCase()}</p>
        
        <h1 className="hero-title">
          {displayText}
          {displayText.length < fullText.length && <span className="cursor"></span>}
        </h1>

        <p className="hero-subtitle-alt">
          {portfolioData.subtitle}
        </p>
        
        <p className="hero-description">
          {portfolioData.description}
        </p>

        <div className="hero-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => handleScroll('projects')}
          >
            View Portfolio <FaArrowRight size={16} />
          </button>
          
          <a href={portfolioData.resume} download className="btn btn-outline">
            Download Resume <FaDownload size={16} />
          </a>
        </div>

        <div className="hero-scroll">
          <div className="mouse"></div>
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}

