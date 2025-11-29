/* eslint-env jest */
'use strict';

const path = require('path');

// Ensure NODE_PATH style resolution mirrors production root for dynamic requires
process.chdir(path.resolve(__dirname, '..'));

const gameService = require('../diamondz-playhouse/backend/services/gameService');

describe('game catalog wiring', () => {
  it('exposes the new quick game stubs with updated source files', () => {
    const catalog = gameService.getGameCatalog();
    const clawEntry = catalog.find((entry) => entry.id === 'pimpire-claw');
    const blackjackEntry = catalog.find((entry) => entry.id === 'blackjack');

    expect(clawEntry).toBeDefined();
    expect(clawEntry.sourceFile).toBe('SourceCode/QuickGames/PimpireClaw.js');
    expect(blackjackEntry).toBeDefined();
    expect(blackjackEntry.sourceFile).toBe('SourceCode/CardGames/Blackjack.js');
  });

  it('validates access rules against user profile', () => {
    const heist = gameService.getGameDetails('diamond-heist-coin-dozer');
    expect(heist).toBeDefined();

    const blocked = gameService.canUserLaunchGame(heist, {
      arcadeCredits: 100,
      totalWins: 0,
      purchasedComics: []
    });
    expect(blocked.allowed).toBe(false);
    expect(Array.isArray(blocked.reasons)).toBe(true);
  });
});

describe('game session lifecycle', () => {
  afterEach(() => {
    // Clean up any stray sessions between tests
    gameService.listSessions().forEach((session) => {
      gameService.endSession(session.sessionId);
    });
  });

  it('creates a blackjack session without auto-starting the round', () => {
    const session = gameService.startSession('blackjack', {
      ownerId: 'tester-1',
      initializeArgs: [2],
      autoStart: false
    });

    expect(session).toBeDefined();
    expect(session.name).toBe('Blackjack');
    expect(session.initializeResult.success).toBe(true);
    expect(session.state).toBeDefined();
    expect(Array.isArray(session.state.players)).toBe(true);
    expect(session.state.players).toHaveLength(2);

    const hitResult = gameService.executeAction(session.sessionId, 'hit', [0], 'tester-1');
    expect(hitResult).toBeDefined();
    expect(hitResult.state).toBeDefined();
  });

  it('supports claw machine sessions with manual movement', () => {
    const session = gameService.startSession('pimpire-claw', {
      ownerId: 'tester-2',
      initializeArgs: [{ autoStart: false, startingEnergy: 3 }],
      autoStart: false
    });

    expect(session).toBeDefined();
    expect(session.name).toBe('Pimpire Claw');
    expect(session.initializeResult.grid).toBeDefined();

    const move = gameService.executeAction(session.sessionId, 'moveClaw', ['left'], 'tester-2');
    expect(move.result).toEqual({ success: true, position: expect.any(Object) });
    expect(move.state).toBeDefined();
    const position = move.state.clawPosition || move.state.position;
    expect(position).toBeDefined();

    // Dispose timers if test introduced any
    gameService.executeAction(session.sessionId, 'dispose', [], 'tester-2');
  });
});
