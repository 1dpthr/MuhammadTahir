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
    }, 80);

    return () => clearInterval(timer);
  }, [displayText, fullText]);

  useEffect(() => {
    // Hide loading screen as soon as typing is done
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Quick exit after text appears

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && (
        <div className="loading-screen" style={{ animation: 'fadeOutScreen 0.5s ease-out forwards' }}>
          <div className="loading-container">
            <div className="loading-text-center">
              <h1 className="loading-typed-text">
                {displayText}
                {isTyping && <span className="cursor"></span>}
              </h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
