import './LandingPage.css';
import { ZapIcon, ShieldIcon, GlobeIcon, BotIcon, PaletteIcon, SmartphoneIcon } from './icons';

function LandingPage({ onLogin, onSignup }) {
  return (
    <div className="landing">
      {/* Hero Section */}
      <div className="hero">
        <h1>Save, Organize & Share</h1>
        <h1 className="hero-highlight">Your Code Snippets</h1>
        <p>CodeSnip is a developer tool to save reusable code snippets, organize by language, and share with your team — all in one place.</p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={onSignup}>Get Started Free</button>
          <button className="btn-secondary" onClick={onLogin}>Login</button>
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <h2>Everything you need</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon"><ZapIcon width={22} height={22} /></span>
            <h3>Lightning Fast</h3>
            <p>Save and find your code snippets instantly with powerful search</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon"><ShieldIcon width={22} height={22} /></span>
            <h3>Secure & Private</h3>
            <p>Your snippets are protected with JWT authentication and bcrypt encryption</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon"><GlobeIcon width={22} height={22} /></span>
            <h3>Share Anywhere</h3>
            <p>Make snippets public and share with anyone via a unique link</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon"><BotIcon width={22} height={22} /></span>
            <h3>AI Powered</h3>
            <p>Get instant AI explanations for any code snippet using Gemini AI</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon"><PaletteIcon width={22} height={22} /></span>
            <h3>Syntax Highlighting</h3>
            <p>Beautiful code editor with syntax highlighting for 10+ languages</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon"><SmartphoneIcon width={22} height={22} /></span>
            <h3>Works Everywhere</h3>
            <p>Access your snippets from any device, anywhere in the world</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta">
        <h2>Ready to organize your code?</h2>
        <p>Join developers who use CodeSnip to save time and stay organized!</p>
        <button className="btn-primary" onClick={onSignup}>Start for Free</button>
      </div>
    </div>
  );
}

export default LandingPage;