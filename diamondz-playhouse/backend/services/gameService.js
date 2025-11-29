'use strict';

const path = require('path');
const { categories, games } = require('../data/arcadeGames');

const ACTIVE_SESSIONS = new Map();
const PROJECT_ROOT = path.resolve(__dirname, '..', '..', '..');

const normalizeArgs = (value) => {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === 'undefined' || value === null) {
    return [];
  }
  return [value];
};

const formatCredits = (value) => {
  if (typeof value !== 'number' || Number.isNaN(value) || value <= 0) {
    return null;
  }
  return `$${(value / 100).toFixed(2)}`;
};

const collectUserComicIds = (user) => {
  if (!user || !Array.isArray(user.purchasedComics)) {
    return new Set();
  }
  return new Set(user.purchasedComics.map((entry) => entry.comicId));
};

const captureState = (instance) => {
  if (!instance) {
    return null;
  }

  if (typeof instance.getGameState === 'function') {
    try {
      return instance.getGameState();
    } catch (err) {
      return { error: err.message };
    }
  }

  if (typeof instance.getState === 'function') {
    try {
      return instance.getState();
    } catch (err) {
      return { error: err.message };
    }
  }

  const snapshot = {};
  const simpleFields = [
    'score',
    'playerScore',
    'computerScore',
    'gamesPlayed',
    'remainingTime',
    'isRunning',
    'energy',
    'streak',
    'comboMultiplier'
  ];

  simpleFields.forEach((field) => {
    if (typeof instance[field] !== 'undefined') {
      snapshot[field] = instance[field];
    }
  });

  if (instance.clawPosition) {
    snapshot.clawPosition = instance.clawPosition;
  }

  if (Array.isArray(instance.players)) {
    snapshot.players = instance.players;
  }

  if (Array.isArray(instance.dealerHand)) {
    snapshot.dealerHand = instance.dealerHand;
  }

  if (Array.isArray(instance.prizeGrid)) {
    snapshot.prizeGrid = instance.prizeGrid;
  }

  if (Array.isArray(instance.firewalls)) {
    snapshot.firewalls = instance.firewalls;
  }

  return Object.keys(snapshot).length > 0 ? snapshot : null;
};

const toClientSession = (session, extra = {}) => ({
  sessionId: session.sessionId,
  gameId: session.gameId,
  name: session.name,
  type: session.type,
  ownerId: session.ownerId,
  createdAt: session.createdAt,
  lastInteraction: session.lastInteraction,
  metadata: session.metadata,
  state: captureState(session.instance),
  ...extra
});

const getCategoriesWithGames = () =>
  categories
    .map((category) => ({
      ...category,
      games: games.filter((game) => game.category === category.key)
    }))
    .filter((category) => category.games.length > 0);

const getGameCatalog = () => games.slice();

const getGameDetails = (gameId) => {
  const game = games.find((entry) => entry.id === gameId);
  if (!game) {
    return null;
  }
  const category = categories.find((entry) => entry.key === game.category) || null;
  return {
    ...game,
    categoryDetails: category,
    access: game.access || {}
  };
};

const loadGameClass = (game) => {
  if (!game.sourceFile) {
    throw new Error('Game source file is not defined');
  }
  const modulePath = path.join(PROJECT_ROOT, game.sourceFile);
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const GameModule = require(modulePath);
  if (typeof GameModule !== 'function') {
    throw new Error(`Game module ${game.sourceFile} does not export a constructor`);
  }
  return GameModule;
};

const normalizeOwner = (ownerId) => {
  if (!ownerId) {
    throw new Error('Owner id is required for session management');
  }
  return ownerId.toString();
};

const ensureOwnership = (session, ownerId) => {
  if (!session) {
    return null;
  }
  const normalizedOwner = normalizeOwner(ownerId);
  return session.ownerId === normalizedOwner ? session : null;
};

const canUserLaunchGame = (game, user) => {
  if (!user) {
    return {
      allowed: false,
      reason: 'User information is required to validate access.'
    };
  }

  const access = game.access || {};
  const reasons = [];

  const creditsRequired = typeof access.minArcadeCredits === 'number' ? access.minArcadeCredits : null;
  const availableCredits = typeof user.arcadeCredits === 'number' ? user.arcadeCredits : 0;
  if (creditsRequired && availableCredits < creditsRequired) {
    const formatted = formatCredits(creditsRequired) || `${creditsRequired} credits`;
    reasons.push(`Requires at least ${formatted} in arcade credits.`);
  }

  if (access.requiresVip && !user.isVip) {
    reasons.push('VIP Lounge access is required for this cabinet.');
  }

  if (typeof access.minTotalWins === 'number' && user.totalWins < access.minTotalWins) {
    reasons.push(`Win ${access.minTotalWins} arcade matches to unlock this cabinet.`);
  }

  if (Array.isArray(access.requiredComicIds) && access.requiredComicIds.length > 0) {
    const ownedComicIds = collectUserComicIds(user);
    const missingComics = access.requiredComicIds.filter((comicId) => !ownedComicIds.has(comicId));
    if (missingComics.length > 0) {
      const titles = Array.isArray(access.requiredComicTitles) && access.requiredComicTitles.length > 0
        ? access.requiredComicTitles
        : missingComics;
      reasons.push(`Purchase ${titles.join(', ')} to unlock this cabinet.`);
    }
  }

  if (reasons.length > 0) {
    return {
      allowed: false,
      reason: reasons.join(' '),
      reasons
    };
  }

  return {
    allowed: true
  };
};

const startSession = (gameId, options = {}) => {
  const game = games.find((entry) => entry.id === gameId);
  if (!game) {
    throw new Error('Game not found');
  }

  const ownerId = normalizeOwner(options.ownerId);

  const GameClass = loadGameClass(game);
  const instance = new GameClass();
  const sessionId = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  const session = {
    sessionId,
    instance,
    gameId: game.id,
    name: game.name,
    type: game.type,
    ownerId,
    metadata: {
      minPlayers: game.minPlayers || null,
      maxPlayers: game.maxPlayers || null,
      minBet: game.minBet || null,
      maxBet: game.maxBet || null,
      unlockRequirement: game.unlockRequirement || null,
      description: game.description || null,
      access: game.access || {}
    },
    createdAt: new Date(),
    lastInteraction: new Date()
  };

  const initializeArgs = normalizeArgs(options.initializeArgs);
  let initializeResult = null;
  if (typeof instance.initialize === 'function') {
    initializeResult = instance.initialize(...initializeArgs);
  }

  let startResult = null;
  if (options.autoStart !== false) {
    const startArgs = normalizeArgs(options.startArgs);
    if (typeof instance.start === 'function') {
      startResult = instance.start(...startArgs);
    } else if (typeof instance.startGame === 'function') {
      startResult = instance.startGame(...startArgs);
    }
  }

  ACTIVE_SESSIONS.set(sessionId, session);

  return toClientSession(session, {
    initializeResult,
    startResult
  });
};

const getSession = (sessionId) => {
  const session = ACTIVE_SESSIONS.get(sessionId);
  if (!session) {
    return null;
  }
  return toClientSession(session);
};

const getSessionForOwner = (sessionId, ownerId) => {
  const session = ensureOwnership(ACTIVE_SESSIONS.get(sessionId), ownerId);
  if (!session) {
    return null;
  }
  return toClientSession(session);
};

const executeAction = (sessionId, action, args = [], ownerId) => {
  const session = ensureOwnership(ACTIVE_SESSIONS.get(sessionId), ownerId);
  if (!session) {
    throw new Error('Session not found');
  }
  if (!action || typeof action !== 'string') {
    throw new Error('Action name is required');
  }
  const target = session.instance[action];
  if (typeof target !== 'function') {
    throw new Error(`Action ${action} is not supported by this game`);
  }
  const result = target.apply(session.instance, normalizeArgs(args));
  session.lastInteraction = new Date();
  return {
    result,
    state: captureState(session.instance)
  };
};

const endSession = (sessionId) => {
  const session = ACTIVE_SESSIONS.get(sessionId);
  if (!session) {
    return null;
  }
  ACTIVE_SESSIONS.delete(sessionId);
  return {
    sessionId,
    endedAt: new Date()
  };
};

const endSessionForOwner = (sessionId, ownerId) => {
  const session = ensureOwnership(ACTIVE_SESSIONS.get(sessionId), ownerId);
  if (!session) {
    return null;
  }
  ACTIVE_SESSIONS.delete(sessionId);
  return {
    sessionId,
    endedAt: new Date()
  };
};

const listSessions = (ownerId = null) => {
  const entries = Array.from(ACTIVE_SESSIONS.values());
  const filtered = ownerId ? entries.filter((session) => session.ownerId === normalizeOwner(ownerId)) : entries;
  return filtered.map((session) => toClientSession(session));
};

module.exports = {
  getCategoriesWithGames,
  getGameCatalog,
  getGameDetails,
  startSession,
  getSession,
  getSessionForOwner,
  executeAction,
  endSession,
  endSessionForOwner,
  listSessions,
  canUserLaunchGame
};
