import { Component, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Signals that JS is running. Every scroll-reveal hidden state in CSS is
// scoped to `.js [data-reveal]`, so if this file never executes (JS error,
// blocked script, crawler without JS) the content renders plainly visible
// instead of staying stuck at opacity 0.
document.documentElement.classList.add('js');

/** Keeps a render-time crash from presenting as a blank black page. */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Portfolio crashed:', error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="crash">
        <h1>Something went wrong</h1>
        <p>{this.state.error.message}</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Reload page
        </button>
      </div>
    );
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);