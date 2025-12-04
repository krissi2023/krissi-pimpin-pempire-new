'use strict';

const mongoose = require('mongoose');

const accessSchema = new mongoose.Schema({
  minArcadeCredits: { type: Number, default: 0 },
  requiredComicIds: { type: [String], default: [] },
  requiredComicTitles: { type: [String], default: [] },
  requiresVip: { type: Boolean, default: false },
  minTotalWins: { type: Number, default: 0 }
}, { _id: false });

const gameSchema = new mongoose.Schema({
  gameId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  sourceFile: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  features: {
    type: [String],
    default: []
  },
  access: {
    type: accessSchema,
    default: () => ({})
  },
  unlockRequirement: {
    type: String,
    default: ''
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);
