import { useState, useEffect } from 'react';
import '../styles/LoadingScreen.css';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
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
    // Match the CSS animation timing: 2.3s delay + 0.8s duration = 3.1s total
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && (
        <div className="loading-screen">
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
