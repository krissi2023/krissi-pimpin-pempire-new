const express = require('express');
const router = express.Router();
const gameService = require('../services/gameService');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/auth');

/**
 * @route   GET /api/arcade/games
 * @desc    Get all available arcade slot games
 * @access  Public
 */
router.get('/games', async (req, res) => {
  try {
    const categories = gameService.getCategoriesWithGames();
    const games = gameService.getGameCatalog();

    res.json({
      categories,
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
    const game = gameService.getGameDetails(id);

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.json(game);
  } catch (error) {
    console.error('Error fetching game details:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/sessions', authMiddleware, async (req, res) => {
  try {
    const sessions = gameService.listSessions(req.userId);
    res.json({ sessions });
  } catch (error) {
    console.error('Error listing sessions:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/games/:id/session', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const gameDetails = gameService.getGameDetails(id);
    if (!gameDetails) {
      return res.status(404).json({ error: 'Game not found' });
    }

    const accessCheck = gameService.canUserLaunchGame(gameDetails, user);
    if (!accessCheck.allowed) {
      return res.status(403).json({
        error: accessCheck.reason,
        reasons: accessCheck.reasons || []
      });
    }

    const session = gameService.startSession(id, {
      initializeArgs: req.body?.initializeArgs,
      startArgs: req.body?.startArgs,
      autoStart: req.body?.autoStart,
      ownerId: req.userId,
      initialBalance: user.arcadeCredits // Pass user's real wallet balance
    });

    res.status(201).json(session);
  } catch (error) {
    console.error('Error starting game session:', error);
    res.status(400).json({ error: error.message });
  }
});

router.post('/games/:id/session/:sessionId/action', authMiddleware, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { action, args } = req.body || {};
    const executionResult = gameService.executeAction(sessionId, action, args, req.userId);
    
    // Handle financial updates if the game action involved money
    const gameOutput = executionResult.result;
    if (gameOutput && gameOutput.success) {
      // Check if this was a betting action (slots, etc.)
      if (typeof gameOutput.totalWin === 'number' && typeof gameOutput.bet === 'number') {
        const user = await User.findById(req.userId);
        if (user) {
          // Calculate net change: win - bet
          const netChange = gameOutput.totalWin - gameOutput.bet;
          
          if (netChange !== 0) {
            user.arcadeCredits += netChange;
            // Prevent negative balance
            if (user.arcadeCredits < 0) user.arcadeCredits = 0;
            
            if (gameOutput.totalWin > 0) {
              user.totalWins = (user.totalWins || 0) + 1;
            }
            
            await user.save();
            
            // Attach updated user balance to response so frontend can update UI
            executionResult.userBalance = user.arcadeCredits;
          }
        }
      }
    }

    res.json(executionResult);
  } catch (error) {
    console.error('Error executing game action:', error);
    res.status(400).json({ error: error.message });
  }
});

router.delete('/games/:id/session/:sessionId', authMiddleware, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const result = gameService.endSessionForOwner(sessionId, req.userId);
    if (!result) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(result);
  } catch (error) {
    console.error('Error ending game session:', error);
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
