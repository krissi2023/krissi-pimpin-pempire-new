import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          💎 Diamondz Playhouse
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/comics" className="nav-link">Comic Store</Link>
          </li>
          <li className="nav-item">
            <Link to="/arcade" className="nav-link neon-text">Arcade</Link>
          </li>
          <li className="nav-item">
            <Link to="/daily-bonus" className="nav-link">🎁 Daily Bonus</Link>
          </li>
          <li className="nav-item">
            <div className="points-display">
              <span className="arcade-credits">🎰 $50.00</span>
              <span className="gold-points">⭐ 500</span>
              <span className="pb-points">💎 100 PB</span>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
