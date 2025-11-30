import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import './Arcade.css';
import ArcadeCreditsPurchase from '../components/ArcadeCreditsPurchase';
import ArcadeGameLauncher from '../components/ArcadeGameLauncher';

const formatArcadeCredits = (value) => {
  if (typeof value !== 'number') {
    return null;
  }

  if (value >= 100) {
    return `$${(value / 100).toFixed(2)}`;
  }

  return `${value} 🪙`;
};

function Arcade() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGame, setActiveGame] = useState(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/arcade/games`);
      const payload = response.data;

      if (Array.isArray(payload)) {
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
  const newReleaseIds = useMemo(() => new Set([
    'throne-of-diamonds',
    'golden-limousine',
    'pimpire-vault',
    'backstage-babylon',
    'street-boss-deal'
  ]), []);

  const evaluateAccess = useCallback((game) => {
    if (!game) {
      return { allowed: false, reasons: [] };
    }

    if (!isAuthenticated || !user) {
      return {
        allowed: false,
        requiresAuth: true,
        reasons: ['Log in to play this cabinet.']
      };
    }

    const reasons = [];
    const access = game.access || {};
    const availableCredits = typeof user.arcadeCredits === 'number' ? user.arcadeCredits : 0;

    if (typeof access.minArcadeCredits === 'number' && access.minArcadeCredits > 0 && availableCredits < access.minArcadeCredits) {
      const formattedRequirement = formatArcadeCredits(access.minArcadeCredits) || `${access.minArcadeCredits} credits`;
      reasons.push(`Requires at least ${formattedRequirement} in arcade credits.`);
    }

    if (access.requiresVip && !user.isVip) {
      reasons.push('VIP membership required to enter this lounge.');
    }

    const totalWins = typeof user.totalWins === 'number' ? user.totalWins : 0;
    if (typeof access.minTotalWins === 'number' && access.minTotalWins > totalWins) {
      reasons.push(`Win ${access.minTotalWins} arcade matches to unlock this cabinet.`);
    }

    const ownedComics = Array.isArray(user.purchasedComics) ? user.purchasedComics : [];
    const ownedComicIds = new Set(ownedComics.map(entry => entry.comicId));
    if (Array.isArray(access.requiredComicIds) && access.requiredComicIds.length > 0) {
      const missingIds = access.requiredComicIds.filter(comicId => !ownedComicIds.has(comicId));
      if (missingIds.length > 0) {
        const titles = Array.isArray(access.requiredComicTitles) && access.requiredComicTitles.length > 0
          ? access.requiredComicTitles
          : missingIds;
        reasons.push(`Purchase ${titles.join(', ')} to unlock this cabinet.`);
      }
    }

    return {
      allowed: reasons.length === 0,
      reasons,
      requiresAuth: false
    };
  }, [isAuthenticated, user]);

  const buildAccessPills = useCallback((game) => {
    if (!game?.access) {
      return [];
    }

    const pills = [];
    const { minArcadeCredits, requiresVip, minTotalWins, requiredComicTitles, requiredComicIds } = game.access;

    if (typeof minArcadeCredits === 'number' && minArcadeCredits > 0) {
      const label = formatArcadeCredits(minArcadeCredits) || `${minArcadeCredits} credits`;
      pills.push({ key: 'credits', label: `Requires ${label}`, variant: 'credits' });
    }

    if (requiresVip) {
      pills.push({ key: 'vip', label: 'VIP Only', variant: 'vip' });
    }

    if (typeof minTotalWins === 'number' && minTotalWins > 0) {
      pills.push({ key: 'wins', label: `Win ${minTotalWins}+ games`, variant: 'wins' });
    }

    const comicLabels = Array.isArray(requiredComicTitles) && requiredComicTitles.length > 0
      ? requiredComicTitles
      : (Array.isArray(requiredComicIds) ? requiredComicIds : []);

    if (comicLabels.length > 0) {
      pills.push({ key: 'comics', label: `Need: ${comicLabels.join(', ')}`, variant: 'comics' });
    }

    return pills;
  }, []);

  const playGame = useCallback((game) => {
    const accessStatus = evaluateAccess(game);

    if (!accessStatus.allowed) {
      if (accessStatus.reasons && accessStatus.reasons.length > 0) {
        alert(accessStatus.reasons.join('\n'));
      } else if (accessStatus.requiresAuth) {
        alert('Please log in to play arcade games!');
      } else {
        alert('This cabinet is locked.');
      }
      return;
    }

    setActiveGame(game);
  }, [evaluateAccess]);

  const renderGameCard = useCallback((game, section) => {
    const accessStatus = evaluateAccess(game);
    const pills = buildAccessPills(game);
    const tooltip = accessStatus.allowed
      ? 'Launch this cabinet'
      : (accessStatus.reasons && accessStatus.reasons.length > 0
        ? accessStatus.reasons.join('\n')
        : (accessStatus.requiresAuth ? 'Log in to play this cabinet.' : 'Locked cabinet'));

    const cardKey = `${section?.key || 'misc'}-${game.id}`;

    return (
      <div key={cardKey} className="game-card card">
        {pills.length > 0 ? (
          <div className="access-pills">
            {pills.map(pill => (
              <span key={pill.key} className={`access-pill access-pill--${pill.variant}`}>
                {pill.label}
              </span>
            ))}
          </div>
        ) : null}

        <div className="game-header">
          <h3>{game.name}</h3>
          <span className="theme-badge">
            {game.type || section?.title}
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
                {game.minBet ? <span>Min Bet: {formatArcadeCredits(game.minBet)}</span> : <span />}
                {game.maxBet ? <span>Max Bet: {formatArcadeCredits(game.maxBet)}</span> : <span />}
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

          {!accessStatus.allowed ? (
            accessStatus.requiresAuth ? (
              <div className="lock-notice lock-notice--auth">
                Log in to play this cabinet.
              </div>
            ) : accessStatus.reasons && accessStatus.reasons.length > 0 ? (
              <div className="lock-notice">
                <span className="lock-title">Locked</span>
                <ul>
                  {accessStatus.reasons.map(reason => (
                    <li key={reason}>{reason}</li>
                  ))}
                </ul>
              </div>
            ) : null
          ) : null}
        </div>

        <button
          className={`btn btn-arcade btn-play ${accessStatus.allowed ? '' : 'btn-locked'}`}
          onClick={() => playGame(game)}
          title={tooltip}
          disabled={!accessStatus.allowed}
        >
          {accessStatus.allowed ? 'Play Now' : 'Locked'}
        </button>
      </div>
    );
  }, [buildAccessPills, categoryEmojiMap, evaluateAccess, playGame]);

  const newReleaseGames = useMemo(() => {
    const collected = [];
    const seen = new Set();

    sections.forEach(section => {
      section.games.forEach(game => {
        if (newReleaseIds.has(game.id) && !seen.has(game.id)) {
          collected.push(game);
          seen.add(game.id);
        }
      });
    });

    return collected;
  }, [newReleaseIds, sections]);

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
            <div className={`stat-card card membership-card ${user.isVip ? 'membership-card--vip' : ''}`}>
              <div className="stat-value">{user.isVip ? 'VIP' : 'Standard'}</div>
              <div className="stat-label">Membership</div>
            </div>
          </div>

          <ArcadeCreditsPurchase />
        </>
      ) : (
        <div className="login-prompt">
          <p>Please log in to view your stats and play games!</p>
        </div>
      )}

      {newReleaseGames.length > 0 ? (
        <section className="category-section category-section--highlight" key="new-releases">
          <div className="category-header">
            <div>
              <h2 className="category-title">✨ Fresh Cabinet Drops</h2>
              <p className="category-description">New slot experiences just arrived in the lounge.</p>
            </div>
            <span className="category-count">{newReleaseGames.length} new</span>
          </div>

          <div className="games-grid games-grid--highlight">
            {newReleaseGames.map(game => renderGameCard(game, { key: 'new-releases', title: 'New Release' }))}
          </div>
        </section>
      ) : null}

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
            {section.games.map(game => renderGameCard(game, section))}
          </div>
        </section>
      ))}

      {activeGame ? (
        <ArcadeGameLauncher
          game={activeGame}
          onClose={() => setActiveGame(null)}
        />
      ) : null}
    </div>
  );
}

export default Arcade;
