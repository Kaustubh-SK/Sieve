import { Link } from 'react-router-dom';
import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <div className="how-it-works-content">
        <h2>How It Works</h2>
        <ol>
          <li>
            <strong>1. You visit a news website</strong> – Any mainstream or independent news source.
          </li>
          <li>
            <strong>2. Sieve activates automatically</strong> – The extension quietly scans for political bias signals.
          </li>
          <li>
            <strong>3. It tells you the tilt</strong> – Left, Right, or Neutral. Instantly, discreetly.
          </li>
        </ol>
        <Link className="details-link" to="/working">See full explanation →</Link>
      </div>
    </section>
  );
};

export default HowItWorks;
