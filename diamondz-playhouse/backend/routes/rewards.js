const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/rewards/daily-bonus
 * @desc    Get daily bonus status for user
 * @access  Private
 */
router.get('/daily-bonus', async (req, res) => {
  try {
    const { userId } = req.query;
    
    // TODO: Fetch from database
    const today = new Date().toDateString();
    const lastClaimed = null; // TODO: Get from user record
    
    const canClaim = lastClaimed !== today;
    const streak = 0; // TODO: Calculate consecutive login days
    
    // Daily bonus increases with streak
    const bonuses = {
      day1: { goldPoints: 50, pbPoints: 5 },
      day2: { goldPoints: 75, pbPoints: 7 },
      day3: { goldPoints: 100, pbPoints: 10 },
      day4: { goldPoints: 125, pbPoints: 12 },
      day5: { goldPoints: 150, pbPoints: 15 },
      day6: { goldPoints: 175, pbPoints: 17 },
      day7: { goldPoints: 300, pbPoints: 30, arcadeCredits: 1000, special: true }
    };
    
    const currentDay = Math.min(streak + 1, 7);
    const todayBonus = bonuses[`day${currentDay}`];
    
    res.json({
      canClaim,
      streak,
      currentDay,
      nextBonus: todayBonus,
      allBonuses: bonuses
    });
  } catch (error) {
    console.error('Error fetching daily bonus:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   POST /api/rewards/claim-daily-bonus
 * @desc    Claim daily login bonus
 * @access  Private
 */
router.post('/claim-daily-bonus', async (req, res) => {
  try {
    const { userId } = req.body;
    
    // TODO: 
    // 1. Check if already claimed today
    // 2. Calculate streak
    // 3. Award bonus based on streak
    // 4. Update user's last claim date
    
    const streak = 1; // Example
    const bonus = {
      goldPoints: 50,
      pbPoints: 5,
      arcadeCredits: 0
    };
    
    // Special 7-day streak reward
    if (streak === 7) {
      bonus.goldPoints = 300;
      bonus.pbPoints = 30;
      bonus.arcadeCredits = 1000;
      bonus.special = 'Weekly Streak Bonus!';
    }
    
    res.json({
      success: true,
      bonus,
      message: `Daily bonus claimed! Streak: ${streak} days`,
      newTotals: {
        goldPoints: 550, // Example
        pbPoints: 105,
        arcadeCredits: 1000
      }
    });
  } catch (error) {
    console.error('Error claiming daily bonus:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   GET /api/rewards/achievements
 * @desc    Get user achievements and rewards
 * @access  Private
 */
router.get('/achievements', async (req, res) => {
  try {
    const achievements = [
      {
        id: 'first_comic',
        name: 'Comic Collector',
        description: 'Purchase your first comic',
        reward: { goldPoints: 100 },
        unlocked: false
      },
      {
        id: 'all_comics',
        name: 'Complete Collection',
        description: 'Own all comics in the series',
        reward: { goldPoints: 500, pbPoints: 50, arcadeCredits: 2000 },
        unlocked: false
      },
      {
        id: 'puzzle_master',
        name: 'Puzzle Master',
        description: 'Complete all puzzles',
        reward: { goldPoints: 300, pbPoints: 30 },
        unlocked: false
      },
      {
        id: 'arcade_champion',
        name: 'Arcade Champion',
        description: 'Win 10,000 in arcade games',
        reward: { goldPoints: 200, pbPoints: 20 },
        unlocked: false
      },
      {
        id: 'daily_devotee',
        name: 'Daily Devotee',
        description: 'Login 30 days in a row',
        reward: { goldPoints: 1000, pbPoints: 100, arcadeCredits: 5000 },
        unlocked: false
      },
      {
        id: 'big_spender',
        name: 'Big Spender',
        description: 'Make 5 purchases',
        reward: { pbPoints: 50 },
        unlocked: false
      }
    ];
    
    res.json(achievements);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   GET /api/rewards/special-offers
 * @desc    Get special promotional offers
 * @access  Public
 */
router.get('/special-offers', async (req, res) => {
  try {
    const offers = [
      {
        id: 'weekend_special',
        name: 'Weekend Special',
        description: 'Double arcade credits on comic purchases',
        active: true,
        endsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        multiplier: 2
      },
      {
        id: 'new_user',
        name: 'New User Bonus',
        description: 'First purchase gets extra 1000 arcade credits',
        active: true,
        forNewUsers: true,
        bonus: 1000
      }
    ];
    
    res.json(offers);
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
