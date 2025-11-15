const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/users/:id
 * @desc    Get user profile
 * @access  Private
 */
router.get('/:id', async (req, res) => {
  try {
    // TODO: Fetch from database
    const user = {
      id: req.params.id,
      username: 'DemoUser',
      email: 'user@example.com',
      goldPoints: 500,
      pbPoints: 100,
      purchasedComics: ['1', '2'],
      totalWins: 25000,
      gamesPlayed: 150,
      joinedAt: new Date('2025-01-01')
    };

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   GET /api/users/:id/inventory
 * @desc    Get user's purchased comics and unlocked content
 * @access  Private
 */
router.get('/:id/inventory', async (req, res) => {
  try {
    const inventory = {
      comics: [
        { id: '1', title: 'The Rise', purchasedAt: new Date() },
        { id: '2', title: 'Awakening', purchasedAt: new Date() }
      ],
      puzzlesCompleted: ['1'],
      wallpapersUnlocked: ['1', '2'],
      arcadeGamesUnlocked: ['diamond-rise', 'awakening-power']
    };

    res.json(inventory);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
