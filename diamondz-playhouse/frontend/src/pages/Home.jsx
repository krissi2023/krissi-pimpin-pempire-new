import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1 className="hero-title neon-text">Pimpin Paul's Comics Meets Diamondz Playhouse</h1>
        <p className="hero-subtitle">
          Where premium storytelling sparks the ultimate arcade takeover.
        </p>
        <div className="hero-buttons">
          <Link to="/comics" className="btn btn-primary">
            Explore Comics
          </Link>
          <Link to="/arcade" className="btn btn-arcade">
            Enter Arcade 🎰
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="feature-card card">
          <div className="feature-icon">📚</div>
          <h3>Comic Store</h3>
          <p>Purchase exclusive comics from your favorite universe</p>
          <ul>
            <li>✅ Digital comic access</li>
            <li>✅ Themed puzzles included</li>
            <li>✅ HD wallpapers</li>
            <li>✅ Earn gold points</li>
          </ul>
        </div>

        <div className="feature-card card">
          <div className="feature-icon">🧩</div>
          <h3>Interactive Puzzles</h3>
          <p>Complete puzzles to earn bonus rewards</p>
          <ul>
            <li>✅ Jigsaw puzzles</li>
            <li>✅ Timed challenges</li>
            <li>✅ Point multipliers</li>
            <li>✅ Unlock achievements</li>
          </ul>
        </div>

        <div className="feature-card card">
          <div className="feature-icon">🎰</div>
          <h3>Arcade Games</h3>
          <p>Play themed slot machines matching your comics</p>
          <ul>
            <li>✅ Unique themes per comic</li>
            <li>✅ Progressive rewards</li>
            <li>✅ Leaderboards</li>
            <li>✅ Daily bonuses</li>
          </ul>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Purchase Comics</h3>
            <p>Buy comics with secure Stripe payments</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Unlock Content</h3>
            <p>Get puzzles, wallpapers, and gold points</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Play Arcade</h3>
            <p>Use points on themed slot machines</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Win Big!</h3>
            <p>Earn more points and unlock achievements</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
