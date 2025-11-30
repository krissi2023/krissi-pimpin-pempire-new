import React from 'react';
import { Link } from 'react-router-dom';
import './Success.css';

function Success() {
  return (
    <div className="success-page">
      <div className="success-card card">
        <div className="success-icon">✅</div>
        <h1>Purchase Successful!</h1>
        <p>Your comic has been unlocked!</p>
        
        <div className="rewards">
          <div className="reward-item">
            <span className="reward-icon">📖</span>
            <span>Comic Unlocked</span>
          </div>
          <div className="reward-item">
            <span className="reward-icon">🧩</span>
            <span>3 Puzzles Available</span>
          </div>
          <div className="reward-item">
            <span className="reward-icon">🖼️</span>
            <span>5 Wallpapers</span>
          </div>
          <div className="reward-item highlight">
            <span className="reward-icon">🎰</span>
            <span>$50 Arcade Credits</span>
          </div>
          <div className="reward-item">
            <span className="reward-icon">⭐</span>
            <span>+100 Gold Points</span>
          </div>
          <div className="reward-item">
            <span className="reward-icon">💎</span>
            <span>+50 PB Points</span>
          </div>
        </div>

        <div className="success-actions">
          <Link to="/comics" className="btn btn-primary">
            View My Comics
          </Link>
          <Link to="/arcade" className="btn btn-arcade">
            Play Arcade
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Success;
