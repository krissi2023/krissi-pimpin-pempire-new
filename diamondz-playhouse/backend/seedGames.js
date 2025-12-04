'use strict';

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { games } = require('./data/arcadeGames');
const Game = require('./models/Game');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/diamondz-playhouse';

const normalizeAccess = (access = {}) => ({
  minArcadeCredits: typeof access.minArcadeCredits === 'number' ? access.minArcadeCredits : 0,
  requiredComicIds: Array.isArray(access.requiredComicIds) ? access.requiredComicIds : [],
  requiredComicTitles: Array.isArray(access.requiredComicTitles) ? access.requiredComicTitles : [],
  requiresVip: Boolean(access.requiresVip),
  minTotalWins: typeof access.minTotalWins === 'number' ? access.minTotalWins : 0
});

(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`✅ Connected to MongoDB: ${MONGODB_URI}`);

    const operations = games.map((game) => ({
      updateOne: {
        filter: { gameId: game.id },
        update: {
          $set: {
            gameId: game.id,
            name: game.name,
            category: game.category,
            type: game.type,
            sourceFile: game.sourceFile,
            description: game.description,
            features: Array.isArray(game.features) ? game.features : [],
            access: normalizeAccess(game.access),
            unlockRequirement: game.unlockRequirement || '',
            metadata: game.metadata || null
          }
        },
        upsert: true
      }
    }));

    const bulkResult = await Game.bulkWrite(operations);
    const removed = await Game.deleteMany({ gameId: { $nin: games.map((g) => g.id) } });

    console.log('📦 Games seed results:');
    console.log(`  Upserts/Updates: ${bulkResult.modifiedCount + bulkResult.upsertedCount}`);
    console.log(`  Inserted (new): ${bulkResult.upsertedCount}`);
    console.log(`  Removed stale: ${removed.deletedCount}`);

    const total = await Game.countDocuments();
    console.log(`  Total games in collection: ${total}`);
  } catch (error) {
    console.error('❌ Error seeding games:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
})();
