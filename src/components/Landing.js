import React from 'react';
import './landing.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Landing() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Map Translator</h1>
        <p>Translate satellite images to maps effortlessly!</p>
      </header>
      <main className="App-main">
        <section className="Feature-section">
          <h2>How Satellite to Map Image Translations are Helpful?</h2>
          <p>Map Translator simplifies the process of converting satellite images into easily interpretable maps. Here are some ways it can be helpful:</p>
          <ul>
            <li><strong>Navigation:</strong> Easily understand geographical features for navigation purposes.</li>
            <li><strong>Urban Planning:</strong> Visualize city layouts, infrastructure, and land use patterns for better planning.</li>
            <li><strong>Disaster Management:</strong> Quickly assess the impact of natural disasters and plan response strategies.</li>
            <li><strong>Environmental Monitoring:</strong> Monitor changes in landscapes, forests, and water bodies over time.</li>
            <li><strong>Exploration and Research:</strong> Aid in scientific research by providing detailed maps of remote or inaccessible areas.</li>
          </ul>
        </section>
        <section className="CTA-section">
          <h2>Ready to Translate?</h2>
          <p>Start using Map Translator today and unlock the potential of satellite imagery!</p>
          <Link to='/home'><button className="CTA-button" >Get Started</button> </Link>
        </section>
      </main>
      <footer className="App-footer">
        <p>&copy; 2024 Map Translator. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Landing;