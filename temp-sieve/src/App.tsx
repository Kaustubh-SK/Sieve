import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Simple placeholder components
const Home = () => (
  <div className="page">
    <h1>Home Page</h1>
    <p>Welcome to Sieve - The browser extension that detects political bias in news articles.</p>
  </div>
);

const About = () => (
  <div className="page">
    <h1>About Page</h1>
    <p>Learn more about our team and mission.</p>
  </div>
);

const Contact = () => (
  <div className="page">
    <h1>Contact Page</h1>
    <p>Get in touch with us.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="navbar-brand">Sieve</div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>

        <footer className="footer">
          <p>&copy; 2025 Sieve. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
