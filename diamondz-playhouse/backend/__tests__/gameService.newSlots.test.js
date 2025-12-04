'use strict';

const {
  startSession,
  endSession,
  getGameDetails
} = require('../services/gameService');

describe('Cabinet catalog registration', () => {
  const OWNER_ID = 'test-user';
  const NEW_CABINETS = [
    { id: 'diamond-heist-coin-dozer', name: 'Diamond Heist Coin Dozer', autoStart: false },
    {
      id: 'pimpire-claw',
      name: 'Pimpire Claw',
      initializeArgs: [{ autoStart: false, startingEnergy: 4 }],
      autoStart: false
    },
    {
      id: 'blackjack',
      name: 'Blackjack',
      initializeArgs: [2],
      autoStart: false
    },
    {
      id: 'pempire-property-manager',
      name: 'Pempire Property Manager',
      autoStart: false
    },
    {
      id: 'quick-rock-paper-scissors',
      name: 'Rock Paper Scissors (Quick)',
      autoStart: false
    }
  ];

  NEW_CABINETS.forEach(({ id, name, initializeArgs = [], autoStart }) => {
    describe(id, () => {
      it('is present in the catalog', () => {
        const details = getGameDetails(id);
        expect(details).toBeTruthy();
        expect(details.id).toBe(id);
        expect(details.name).toBe(name);
      });

      it('starts a session without throwing', () => {
        const session = startSession(id, {
          ownerId: OWNER_ID,
          initializeArgs,
          autoStart
        });

        expect(session).toBeDefined();
        expect(session.gameId).toBe(id);
        expect(session.ownerId).toBe(String(OWNER_ID));
        endSession(session.sessionId);
      });
    });
  });
});
