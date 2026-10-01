import { useCallback, useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './styles.css';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ExperiencePage from './pages/ExperiencePage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import CertificatesPage from './pages/CertificatesPage';
import ContactPage from './pages/ContactPage';
import { initSmoothScroll, scrollToY } from './utils/smoothScroll';
import { initSpotlight } from './utils/spotlight';

function ScrollManager() {
  const { pathname } = useLocation();

  // Route changes must land at the top, through the same easing engine,
  // otherwise the browser's jump fights the lerp for a frame or two.
  useEffect(() => {
    scrollToY(0, { immediate: true });
  }, [pathname]);

  return null;
}

function AppShell() {
  const [ready, setReady] = useState(false);

  // Mount the smooth-scroll engine once, before first paint of content.
  useEffect(() => initSmoothScroll(), []);

  // Card spotlight. Mounted alongside the scroll engine and torn down by
  // its own cleanup, so both survive a StrictMode remount.
  useEffect(() => initSpotlight(), []);

  const handleLoaded = useCallback(() => setReady(true), []);

  if (!ready) return <LoadingScreen onComplete={handleLoaded} />;

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <ScrollManager />

      <main id="main" className="page-enter">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}