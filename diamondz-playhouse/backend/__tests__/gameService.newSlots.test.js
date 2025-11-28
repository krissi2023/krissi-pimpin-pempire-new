'use strict';

const {
  startSession,
  endSession,
  getGameDetails
} = require('../services/gameService');

describe('New slot modules registration', () => {
  const OWNER_ID = 'test-user';
  const NEW_SLOT_IDS = [
    'throne-of-diamonds',
    'golden-limousine',
    'pimpire-vault',
    'backstage-babylon',
    'street-boss-deal'
  ];

  NEW_SLOT_IDS.forEach((gameId) => {
    describe(gameId, () => {
      it('is present in the catalog', () => {
        const details = getGameDetails(gameId);
        expect(details).toBeTruthy();
        expect(details.id).toBe(gameId);
      });

      it('starts a session without throwing', () => {
        const session = startSession(gameId, { ownerId: OWNER_ID, autoStart: false });
        expect(session).toBeDefined();
        expect(session.gameId).toBe(gameId);
        expect(session.ownerId).toBe(String(OWNER_ID));
        expect(session.initializeResult).toBeDefined();
        endSession(session.sessionId);
      });
    });
  });
});
