
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
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Loading Screen with typing animation */}
      <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      
      {/* Main content */}
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

