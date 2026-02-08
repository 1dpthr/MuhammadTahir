import { useState, useEffect } from 'react';
import '../styles/LoadingScreen.css';

export default function LoadingScreen({ onLoadingComplete }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const fullText = 'dp.thr';

  // derive typing state from displayText length to avoid calling setState inside effect
  const isTyping = displayText.length < fullText.length;

  useEffect(() => {
    if (displayText.length === fullText.length) return;

    const timer = setInterval(() => {
      setDisplayText(prev => prev + fullText[prev.length]);
    }, 120);

    return () => clearInterval(timer);
  }, [displayText, fullText]);

  useEffect(() => {
    // Show loading screen for 2.5 seconds, then fade out for 0.5s, then remove
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2500);

    const hideTimer = setTimeout(() => {
      setIsLoading(false);
      // Notify parent that loading is complete
      if (onLoadingComplete) {
        onLoadingComplete();
      }
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [onLoadingComplete]);

  return (
    <>
      {isLoading && (
        <div className={`loading-screen ${isFading ? 'fade-out' : ''}`}>
          <div className="loading-container">
            <div className="loading-text-center">
              <h1 className="loading-typed-text">
                {displayText}
                {isTyping && <span className="cursor"></span>}
              </h1>
            </div>
            <div className="loading-text">
              <p>Portfolio</p>
              <div className="loading-bar">
                <div className="loading-progress"></div>
              </div>
              <p className="loading-subtext">Loading Experience...</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
