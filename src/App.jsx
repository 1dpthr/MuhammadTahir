
import { useState, useEffect } from 'react';
import './styles.css';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Quick loading simulation - hide after components mount
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Very short loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Simple loading overlay - fades out quickly */}
      {isLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'linear-gradient(135deg, #08080f 0%, #0f0f1f 50%, #1a0f2e 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999999,
          transition: 'opacity 0.3s ease'
        }}>
          <div style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #a78bfa, #38b6ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Loading...
          </div>
        </div>
      )}
      
      {/* Main content - always rendered, loading overlay sits on top */}
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

export default App;

