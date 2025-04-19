import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import logoSvg from './assets/images/sieve-logo.svg';
import Admin from './pages/Admin';

// Home page component with interactive elements
const Home = () => {
  // Function to handle extension download or redirect to store
  const handleExtensionDownload = () => {
    // Scroll to the download section
    const downloadSection = document.getElementById('download');
    if (downloadSection) {
      downloadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInstallClick = (browser: string) => {
    let downloadUrl = "";
    
    switch(browser) {
      case "chrome":
        // Link to Chrome Web Store
        downloadUrl = "https://chrome.google.com/webstore/category/extensions";
        window.open(downloadUrl, "_blank");
        break;
      case "firefox":
        // Link to Firefox Add-ons
        downloadUrl = "https://addons.mozilla.org/en-US/firefox/";
        window.open(downloadUrl, "_blank");
        break;
      case "direct":
        // Direct download of extension ZIP
        downloadExtensionFile();
        break;
      default:
        downloadUrl = "/downloads/Sieve-NewsBiasChecker.zip";
        window.open(downloadUrl, "_blank");
    }
  };
  
  const downloadExtensionFile = async () => {
    try {
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = '/downloads/Sieve-NewsBiasChecker.zip';
      link.download = 'Sieve-NewsBiasChecker.zip';
      
      // Append to the document
      document.body.appendChild(link);
      
      // Trigger click event
      link.click();
      
      // Clean up
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again later.');
    }
  };

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-content">
          <h1>Know the Bias. Stay Informed.</h1>
          <p>
            Our browser extension automatically analyzes political leaning of news websites — 
            so you can focus on facts, not filters.
          </p>
          <div className="button-group">
            <button 
              onClick={handleExtensionDownload} 
              className="button button-solid"
            >
              Download Extension
            </button>
          </div>
        </div>
      </section>
      
      <div className="page-content">
        <section id="how-it-works" className="section">
          <h2>How It Works</h2>
          <div className="how-it-works-cards">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">🔍</div>
              <h3>Install</h3>
              <p>Download Sieve from the Chrome Web Store or Firefox Add-ons marketplace, and install it with a single click.</p>
            </div>
            
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">🌐</div>
              <h3>Browse</h3>
              <p>Continue using the internet as you always do. Sieve runs quietly in the background without slowing down your browsing.</p>
            </div>
            
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">⚖️</div>
              <h3>Analyze</h3>
              <p>When you visit a news site, Sieve automatically analyzes its content and displays a simple indicator of political leaning.</p>
            </div>
          </div>
        </section>
        
        <div className="section download" id="download">
          <h2>Download & Install</h2>
          <p>
            Sieve is available as a browser extension for Chrome, Firefox, or as a direct download.
          </p>
          <div className="browser-options">
            <div className="card">
              <div className="card-content">
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" width="48" height="48">
                    <path fill="#4285F4" d="M12 4C7.6 4 4 7.6 4 12s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z"/>
                    <path fill="#EA4335" d="M4 12c0-4.4 3.6-8 8-8v16c-4.4 0-8-3.6-8-8z"/>
                    <path fill="#34A853" d="M12 20c4.4 0 8-3.6 8-8h-8v8z"/>
                    <path fill="#FBBC05" d="M20 12c0-4.4-3.6-8-8-8v8h8z"/>
                  </svg>
                </div>
                <h3>Chrome</h3>
                <p>Install Sieve from the official Chrome Web Store.</p>
                <button className="button button-solid" onClick={() => handleInstallClick("chrome")}>
                  Chrome Web Store
                </button>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" width="48" height="48">
                    <path fill="#FF9500" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
                    <path fill="#F44336" d="M19.5 10c-2-2.3-4.9-3.8-8.2-3.8-5.5 0-9.9 4.4-9.9 9.9 0 1 .2 2 .5 3L19.5 10z"/>
                    <path fill="#9E00FF" d="M2.9 17.6c1.8 2.5 4.7 4.2 8 4.2 5.5 0 9.9-4.4 9.9-9.9 0-1.1-.2-2.2-.5-3.2L2.9 17.6z"/>
                  </svg>
                </div>
                <h3>Firefox</h3>
                <p>Get Sieve from the official Firefox Add-ons marketplace.</p>
                <button className="button button-solid" onClick={() => handleInstallClick("firefox")}>
                  Firefox Add-ons
                </button>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" width="48" height="48">
                    <path fill="#64ffda" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/>
                    <path fill="#0a192f" d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/>
                  </svg>
                </div>
                <h3>Direct Download</h3>
                <p>Download the extension file directly for any browser.</p>
                <button className="button button-solid" onClick={() => handleInstallClick("direct")}>
                  Download ZIP
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <section id="features" className="section">
          <h2>Key Features</h2>
          <div className="card-grid">
            <div className="card">
              <div className="card-content">
                <div className="card-icon">⚡</div>
                <h3>Real-time Analysis</h3>
                <p>Get instant feedback on political leaning as you browse news sites.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-icon">🔒</div>
                <h3>Privacy Focused</h3>
                <p>All analysis happens locally on your device. We don't track your browsing history.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-icon">👁️</div>
                <h3>Simple Interface</h3>
                <p>Clear, unobtrusive indicators that don't interfere with your reading experience.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Guide page component with installation instructions
const Guide = () => (
  <div className="page">
    <div className="page-content">
      <h1>Installation Guide</h1>
      <p>
        Follow these simple steps to install the Sieve extension directly from the ZIP file.
      </p>
      
      <div className="guide-container">
        <div className="guide-step">
          <div className="guide-step-number">1</div>
          <div className="guide-step-content">
            <h3>Download the Extension ZIP</h3>
            <p>Click the "Download ZIP" button on our homepage to download the Sieve extension package.</p>
          </div>
        </div>
        
        <div className="guide-step">
          <div className="guide-step-number">2</div>
          <div className="guide-step-content">
            <h3>Extract the ZIP File</h3>
            <p>Locate the downloaded ZIP file and extract its contents to a folder on your computer. Remember this location as you'll need it in the next steps.</p>
          </div>
        </div>
        
        <div className="guide-step">
          <div className="guide-step-number">3</div>
          <div className="guide-step-content">
            <h3>Open Your Browser's Extension Page</h3>
            <div className="browser-specific-instructions">
              <div className="browser-instruction">
                <h4>Chrome / Edge</h4>
                <ul>
                  <li>Open Chrome or Edge and navigate to <code>chrome://extensions</code> or <code>edge://extensions</code></li>
                  <li>Enable "Developer mode" by toggling the switch in the top-right corner</li>
                </ul>
              </div>
              
              <div className="browser-instruction">
                <h4>Firefox</h4>
                <ul>
                  <li>Open Firefox and navigate to <code>about:debugging</code></li>
                  <li>Click on "This Firefox" in the left sidebar</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="guide-step">
          <div className="guide-step-number">4</div>
          <div className="guide-step-content">
            <h3>Load the Extension</h3>
            <div className="browser-specific-instructions">
              <div className="browser-instruction">
                <h4>Chrome / Edge</h4>
                <ul>
                  <li>Click the "Load unpacked" button</li>
                  <li>Browse to and select the folder where you extracted the ZIP file</li>
                </ul>
              </div>
              
              <div className="browser-instruction">
                <h4>Firefox</h4>
                <ul>
                  <li>Click "Load Temporary Add-on..."</li>
                  <li>Browse to where you extracted the ZIP file and select the <code>manifest.json</code> file</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="guide-step">
          <div className="guide-step-number">5</div>
          <div className="guide-step-content">
            <h3>Verify Installation</h3>
            <p>The Sieve extension should now appear in your browser's extension list and be ready to use. Visit a news website to see it in action!</p>
          </div>
        </div>
      </div>
      
      <div className="guide-note">
        <h3>Note</h3>
        <p>For the best experience and automatic updates, we recommend installing Sieve through the official Chrome Web Store or Firefox Add-ons marketplace when possible.</p>
      </div>
      
      <div className="guide-troubleshooting">
        <h3>Troubleshooting</h3>
        <p>If you encounter any issues during installation:</p>
        <ul>
          <li>Make sure you've extracted the ZIP file completely</li>
          <li>Check that Developer mode is enabled in your browser</li>
          <li>Try restarting your browser after installation</li>
          <li>Contact us through our <Link to="/contact">Contact page</Link> if you need further assistance</li>
        </ul>
      </div>
    </div>
  </div>
);

// About page component
const About = () => (
  <div className="page">
    <div className="page-content">
      <h1>About Sieve</h1>
      <p>
        Sieve was created by a group of passionate college students concerned about the 
        polarization of news media and the impact of filter bubbles on public discourse.
      </p>
      <p>
        Our mission is to help readers understand the potential biases in their news sources,
        encouraging more informed and diverse media consumption.
      </p>
      
      <div className="card-grid">
        <div className="card">
          <div className="card-content">
            <div className="card-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>To promote media literacy and help people become more aware of potential bias in their news consumption.</p>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="card-icon">👥</div>
            <h3>Our Team</h3>
            <p>A group of passionate college students dedicated to empowering people with media literacy skills for a more informed society.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Contact page with form
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit contact form');
      }
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset form status after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="page">
      <div className="page-content">
        <h1>Contact Us</h1>
        <p>Have questions or feedback? We'd love to hear from you.</p>
        
        {isSubmitted ? (
          <div className="success-message">
            <p>Thank you for your message! We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                disabled={isSubmitting}
              ></textarea>
            </div>
            
            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}
            
            <button 
              type="submit" 
              className="button button-solid"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// ScrollToTop component to reset scroll position when changing routes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// NavLink component with active state
const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <li>
      <Link to={to} className={isActive ? 'active' : ''}>
        {children}
      </Link>
    </li>
  );
};

// Footer component
const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-section">
        <h3>Sieve</h3>
        <p>Helping you navigate media bias with clarity and confidence.</p>
      </div>
      
      <div className="footer-section">
        <h3>Links</h3>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/guide">Guide</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      
      <div className="footer-section">
        <h3>Connect</h3>
        <div className="footer-links">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </div>
    
    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} Sieve. All rights reserved.</p>
    </div>
  </footer>
);

// Main App component
function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="navbar-brand-container">
            <Link to="/" className="logo">
              <img src={logoSvg} alt="Sieve Logo" />
            </Link>
            <Link to="/" className="navbar-brand">Sieve</Link>
          </div>
          <ul className="nav-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/guide">Guide</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </ul>
        </nav>

        <div className="content">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
