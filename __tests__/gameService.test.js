/* eslint-env jest */
'use strict';

const path = require('path');

// Ensure NODE_PATH style resolution mirrors production root for dynamic requires
process.chdir(path.resolve(__dirname, '..'));

const gameService = require('../diamondz-playhouse/backend/services/gameService');

describe('game catalog wiring', () => {
  it('exposes the new quick game stubs with updated source files', () => {
    const catalog = gameService.getGameCatalog();
    const expected = [
      ['pimpire-claw', 'SourceCode/QuickGames/PimpireClaw.js'],
      ['diamondz-slot', 'SourceCode/QuickGames/DiamondzSlot.js'],
      ['dapaul-smooth-slot', 'SourceCode/QuickGames/DapaulSmoothSlot.js'],
      ['golden-cane-slots', 'SourceCode/QuickGames/GoldenCaneSlots.js'],
      ['mink-slot', 'SourceCode/QuickGames/MinkSlot.js'],
      ['diamonds-high-roller-heist-slot', 'SourceCode/QuickGames/DiamondsHighRollerHeistSlot.js']
    ];

    expected.forEach(([id, filePath]) => {
      const entry = catalog.find((game) => game.id === id);
      expect(entry).toBeDefined();
      expect(entry.sourceFile).toBe(filePath);
    });

    const blackjackEntry = catalog.find((entry) => entry.id === 'blackjack');
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

  it('spins quick slot sessions through the service actions', () => {
    const slotIds = [
      'diamondz-slot',
      'dapaul-smooth-slot',
      'golden-cane-slots',
      'mink-slot',
      'diamonds-high-roller-heist-slot'
    ];

    slotIds.forEach((gameId, index) => {
      const ownerId = `slot-owner-${index}`;
      const session = gameService.startSession(gameId, {
        ownerId,
        autoStart: true
      });

      expect(session).toBeDefined();
      const spin = gameService.executeAction(session.sessionId, 'spin', [], ownerId);
      expect(spin.result).toBeDefined();
      expect(spin.result.success).toBe(true);
      expect(spin.state).toBeDefined();
      expect(typeof spin.state.credits).toBe('number');
      expect(spin.state.credits).toBeGreaterThanOrEqual(0);

      gameService.endSession(session.sessionId);
    });
  });

  it('runs property manager turns with purchases and trades', () => {
    const session = gameService.startSession('pempire-property-manager', {
      ownerId: 'manager-1',
      initializeArgs: [{
        startingBank: 2000,
        winningNetWorth: 1700,
        players: [
          { id: 'p1', name: 'Marquis', money: 800 },
          { id: 'p2', name: 'Duchess', money: 750 }
        ]
      }],
      autoStart: true
    });

    expect(session).toBeDefined();
    expect(session.state.players).toHaveLength(2);
    const available = session.state.properties.find((property) => !property.ownerId);
    expect(available).toBeDefined();

    const purchase = gameService.executeAction(
      session.sessionId,
      'buyProperty',
      [available.id, 'p1'],
      'manager-1'
    );
    expect(purchase.result.success).toBe(true);
    const updatedProperty = purchase.state.properties.find((property) => property.id === available.id);
    expect(updatedProperty.ownerId).toBe('p1');

    const next = gameService.executeAction(session.sessionId, 'nextTurn', [], 'manager-1');
    expect(next.result.success).toBe(true);
    expect(next.state.turn).toBe(1);

    const tradeTarget = purchase.state.properties.find((property) => property.ownerId === 'p1');
    const trade = gameService.executeAction(
      session.sessionId,
      'tradeProperty',
      [
        'p1',
        'p2',
        tradeTarget.id,
        100
      ],
      'manager-1'
    );
    expect(trade.result.success).toBe(true);
    const traded = trade.state.properties.find((property) => property.id === tradeTarget.id);
    expect(traded.ownerId).toBe('p2');

    gameService.endSession(session.sessionId);
  });
});
