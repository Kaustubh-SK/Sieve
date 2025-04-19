import './FAQ.css';

const FAQ = () => {
  return (
    <section className="faq">
      <div className="faq-content">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>What is Sieve?</h3>
          <p>Sieve is a browser extension that detects political bias in news websites and helps you stay informed about how news is presented.</p>
        </div>
        <div className="faq-item">
          <h3>How does it work?</h3>
          <p>The extension analyzes the content of a news site and checks for patterns in language, headlines, and other cues to determine the political leaning.</p>
        </div>
        <div className="faq-item">
          <h3>Is my data safe?</h3>
          <p>Yes. Sieve does not track your browsing history or store personal data. It only analyzes publicly available content to assess bias.</p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
