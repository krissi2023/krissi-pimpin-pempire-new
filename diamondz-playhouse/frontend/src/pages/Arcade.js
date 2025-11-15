import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Arcade.css';

function Arcade() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/arcade/games`);
      setGames(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching games:', error);
      setLoading(false);
    }
  };

  const playGame = (game) => {
    // TODO: Launch Phaser game
    alert(`Launching ${game.name}! (Game implementation coming soon)`);
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="arcade">
      <h1 className="neon-text">🎰 Diamondz Arcade</h1>
      <p className="arcade-subtitle">
        Play themed slot machines and win big!
      </p>

      <div className="arcade-stats">
        <div className="stat-card card">
          <div className="stat-value">500</div>
          <div className="stat-label">Gold Points</div>
        </div>
        <div className="stat-card card">
          <div className="stat-value">100</div>
          <div className="stat-label">PB Points</div>
        </div>
        <div className="stat-card card">
          <div className="stat-value">25,000</div>
          <div className="stat-label">Total Wins</div>
        </div>
      </div>

      <div className="games-grid">
        {games.map(game => (
          <div key={game.id} className="game-card card">
            <div className="game-header">
              <h3>{game.name}</h3>
              <span className="theme-badge">{game.theme}</span>
            </div>

            <div className="game-thumbnail">
              <div className="placeholder-game">🎰</div>
            </div>

            <div className="game-info">
              <div className="bet-range">
                <span>Min Bet: {game.minBet} 🪙</span>
                <span>Max Bet: {game.maxBet} 🪙</span>
              </div>
              <div className="rtp">
                <span>RTP: {game.rtp}%</span>
              </div>
            </div>

            <button 
              className="btn btn-arcade btn-play"
              onClick={() => playGame(game)}
            >
              Play Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Arcade;
