import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App.jsx'

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#08080f',
          color: '#fff',
          flexDirection: 'column',
          gap: '20px',
          padding: '20px'
        }}>
          <h1 style={{ fontSize: '2rem', color: '#a78bfa' }}>Something went wrong</h1>
          <p style={{ color: '#d4d4d8' }}>Error: {this.state.error?.message || 'Unknown error'}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Reload Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

// Immediate CSS loading indicator
const cssStyle = document.createElement('style')
cssStyle.textContent = `
  /* Immediate styles to prevent white flash */
  body {
    background: #08080f !important;
    color: #fff !important;
  }
  #root {
    min-height: 100vh;
    background: #08080f;
  }
  .loading-placeholder {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #08080f 0%, #0f0f1f 50%, #1a0f2e 100%);
    z-index: 9999;
  }
  .loading-placeholder-text {
    font-size: 2rem;
    font-weight: 800;
    background: linear-gradient(135deg, #a78bfa, #38b6ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`
document.head.appendChild(cssStyle)

// Add loading placeholder immediately
const loadingDiv = document.createElement('div')
loadingDiv.className = 'loading-placeholder'
loadingDiv.innerHTML = '<div class="loading-placeholder-text">dp.thr</div>'
loadingDiv.id = 'loading-placeholder'
document.body.prepend(loadingDiv)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)

// Remove loading placeholder after React mounts
if (window.__ReactMounted) {
  document.getElementById('loading-placeholder')?.remove()
} else {
  // Fallback removal after a delay
  setTimeout(() => {
    const placeholder = document.getElementById('loading-placeholder')
    if (placeholder && placeholder.parentNode) {
      placeholder.style.opacity = '0'
      placeholder.style.transition = 'opacity 0.3s ease'
      setTimeout(() => placeholder.remove(), 300)
    }
  }, 100)
}
