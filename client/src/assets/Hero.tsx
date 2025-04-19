import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Know the Bias. Stay Informed.
        </h1>
        <p className="hero-subtitle">
          Our browser extension automatically analyzes political leaning of news websites — so you can focus on facts, not filters.
        </p>
        <button className="download-button">
          Download Extension
        </button>
      </div>
    </section>
  );
};

export default Hero;
