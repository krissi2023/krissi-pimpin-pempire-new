const express = require('express');
const router = express.Router();
const { categories, games } = require('../data/arcadeGames');

/**
 * @route   GET /api/arcade/games
 * @desc    Get all available arcade slot games
 * @access  Public
 */
router.get('/games', async (req, res) => {
  try {
    const groupedCategories = categories
      .map(category => ({
        ...category,
        games: games.filter(game => game.category === category.key)
      }))
      .filter(category => category.games.length > 0);

    res.json({
      categories: groupedCategories,
      games,
      totalGames: games.length
    });
  } catch (error) {
    console.error('Error fetching arcade games:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   GET /api/arcade/games/:id
 * @desc    Get specific arcade game details
 * @access  Public
 */
router.get('/games/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const game = games.find(item => item.id === id);

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    const categoryDetails = categories.find(category => category.key === game.category);

    res.json({
      ...game,
      categoryDetails: categoryDetails || null
    });
  } catch (error) {
    console.error('Error fetching game details:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   POST /api/arcade/spin
 * @desc    Execute a slot machine spin
 * @access  Private
 */
router.post('/spin', async (req, res) => {
  try {
    const { gameId, userId, betAmount } = req.body;

    // TODO: 
    // 1. Verify user has enough points
    // 2. Deduct bet amount
    // 3. Generate random spin result
    // 4. Calculate winnings
    // 5. Add winnings to user account
    // 6. Save spin history

    // Mock spin result
    const result = {
      reels: [
        ['diamond', 'seven', 'crown'],
        ['diamond', 'gold', 'seven'],
        ['diamond', 'crown', 'gold'],
        ['seven', 'diamond', 'crown'],
        ['gold', 'seven', 'diamond']
      ],
      winlines: [
        { line: 1, symbols: ['diamond', 'diamond', 'diamond'], payout: 1000 }
      ],
      totalWin: 1000,
      balanceAfter: 1500, // Example
      spinId: `spin_${Date.now()}`
    };

    res.json(result);
  } catch (error) {
    console.error('Error processing spin:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   GET /api/arcade/history/:userId
 * @desc    Get user's arcade play history
 * @access  Private
 */
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // TODO: Fetch from database
    const history = [
      {
        spinId: 'spin_001',
        gameId: 'diamond-rise',
        betAmount: 50,
        winAmount: 500,
        timestamp: new Date()
      }
    ];

    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   GET /api/arcade/leaderboard
 * @desc    Get top players leaderboard
 * @access  Public
 */
router.get('/leaderboard', async (req, res) => {
  try {
    // TODO: Fetch from database
    const leaderboard = [
      { rank: 1, username: 'Player1', totalWins: 50000, gamesPlayed: 1200 },
      { rank: 2, username: 'Player2', totalWins: 45000, gamesPlayed: 1100 },
      { rank: 3, username: 'Player3', totalWins: 40000, gamesPlayed: 1000 }
    ];

    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
