import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import './Arcade.css';
import ArcadeCreditsPurchase from '../components/ArcadeCreditsPurchase';

function Arcade() {
  const [sections, setSections] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/arcade/games`);
      const payload = response.data;

      if (Array.isArray(payload)) {
        setGames(payload);
        setSections([
          {
            key: 'featured',
            title: 'Featured Games',
            icon: '🎮',
            description: 'Jump into any cabinet to start playing.',
            games: payload
          }
        ]);
      } else {
        const normalizedGames = Array.isArray(payload?.games) ? payload.games : [];
        const normalizedSections = Array.isArray(payload?.categories)
          ? payload.categories.map(section => ({
              ...section,
              games: Array.isArray(section.games) ? section.games : []
            }))
          : [];

        setGames(normalizedGames);
        setSections(normalizedSections.length > 0 ? normalizedSections : [
          {
            key: 'featured',
            title: 'Featured Games',
            icon: '🎮',
            description: 'Jump into any cabinet to start playing.',
            games: normalizedGames
          }
        ]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching games:', error);
      setLoading(false);
    }
  };

  const categoryEmojiMap = useMemo(() => ({
    slots: '🎰',
    table: '🃏',
    card: '♠️',
    quick: '⚡',
    default: '🎮'
  }), []);

  const playGame = (game) => {
    if (!isAuthenticated) {
      alert('Please log in to play arcade games!');
      return;
    }
    
    if (typeof game.minBet === 'number' && user.arcadeCredits < game.minBet) {
      alert('Insufficient credits! Purchase a comic to get arcade credits.');
      return;
    }
    
    // TODO: Launch Phaser game or dedicated game engine view
    alert(`Launching ${game.name}! (Game implementation coming soon)`);
  };

  const formatCredits = (value) => {
    if (typeof value !== 'number') {
      return null;
    }

    // Values >= 100 likely represent cents (arcade credits)
    if (value >= 100) {
      return `$${(value / 100).toFixed(2)}`;
    }

    return `${value} 🪙`;
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

      {isAuthenticated && user ? (
        <>
          <div className="arcade-stats">
            <div className="stat-card card">
              <div className="stat-value">{user.goldPoints || 0}</div>
              <div className="stat-label">Gold Points</div>
            </div>
            <div className="stat-card card">
              <div className="stat-value">{user.pbPoints || 0}</div>
              <div className="stat-label">PB Points</div>
            </div>
            <div className="stat-card card">
              <div className="stat-value">${((user.arcadeCredits || 0) / 100).toFixed(2)}</div>
              <div className="stat-label">Arcade Credits</div>
            </div>
            <div className="stat-card card">
              <div className="stat-value">{user.totalWins || 0}</div>
              <div className="stat-label">Total Wins</div>
            </div>
          </div>

          <ArcadeCreditsPurchase />
        </>
      ) : (
        <div className="login-prompt">
          <p>Please log in to view your stats and play games!</p>
        </div>
      )}

      {sections.map(section => (
        <section key={section.key} className="category-section">
          <div className="category-header">
            <div>
              <h2 className="category-title">{section.icon ? `${section.icon} ${section.title}` : section.title}</h2>
              {section.description ? <p className="category-description">{section.description}</p> : null}
            </div>
            <span className="category-count">{section.games.length} {section.games.length === 1 ? 'game' : 'games'}</span>
          </div>

          <div className="games-grid">
            {section.games.map(game => (
              <div key={game.id} className="game-card card">
                <div className="game-header">
                  <h3>{game.name}</h3>
                  <span className="theme-badge">
                    {game.type || section.title}
                  </span>
                </div>

                <div className="game-thumbnail">
                  <div className="placeholder-game">
                    {categoryEmojiMap[game.category] || categoryEmojiMap.default}
                  </div>
                </div>

                <div className="game-info">
                  {game.description ? (
                    <p className="game-description">{game.description}</p>
                  ) : null}

                  <div className="game-meta">
                    {(game.minBet || game.maxBet) ? (
                      <div className="bet-range">
                        {game.minBet ? <span>Min Bet: {formatCredits(game.minBet)}</span> : <span />}
                        {game.maxBet ? <span>Max Bet: {formatCredits(game.maxBet)}</span> : <span />}
                      </div>
                    ) : null}

                    {(game.minPlayers || game.maxPlayers) ? (
                      <div className="player-range">
                        Players: {game.minPlayers || 1}{game.maxPlayers ? ` – ${game.maxPlayers}` : ''}
                      </div>
                    ) : null}

                    {game.rtp ? (
                      <div className="rtp">RTP: {game.rtp}%</div>
                    ) : null}
                    {(game.reels || game.paylines) ? (
                      <div className="layout-meta">
                        {game.reels ? `${game.reels} reels` : ''}
                        {game.rows ? ` · ${game.rows} rows` : ''}
                        {game.paylines ? ` · ${game.paylines} paylines` : ''}
                      </div>
                    ) : null}
                  </div>

                  {Array.isArray(game.features) && game.features.length > 0 ? (
                    <ul className="feature-list">
                      {game.features.slice(0, 3).map(feature => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  ) : null}

                  {game.unlockRequirement ? (
                    <p className="unlock-note">{game.unlockRequirement}</p>
                  ) : null}
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
        </section>
      ))}
    </div>
  );
}

export default Arcade;
