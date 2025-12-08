const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authMiddleware } = require('../middleware/auth');

const BONUSES = {
  day1: { goldPoints: 50, pbPoints: 5 },
  day2: { goldPoints: 75, pbPoints: 7 },
  day3: { goldPoints: 100, pbPoints: 10 },
  day4: { goldPoints: 125, pbPoints: 12 },
  day5: { goldPoints: 150, pbPoints: 15 },
  day6: { goldPoints: 175, pbPoints: 17 },
  day7: { goldPoints: 300, pbPoints: 30, arcadeCredits: 1000, special: true }
};

const isSameDay = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.toDateString() === d2.toDateString();
};

const isConsecutive = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);
  const diffTime = Math.abs(d2 - d1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
};

/**
 * @route   GET /api/rewards/daily-bonus
 * @desc    Get daily bonus status for user
 * @access  Private
 */
router.get('/daily-bonus', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const today = new Date();
    const lastClaimed = user.lastDailyBonusClaim;
    
    let canClaim = true;
    let streak = user.loginStreak || 0;

    if (lastClaimed) {
      if (isSameDay(lastClaimed, today)) {
        canClaim = false;
      } else if (!isConsecutive(lastClaimed, today)) {
        streak = 0; 
      }
    }

    let nextDay = streak + 1;
    if (nextDay > 7) nextDay = 1;

    const nextBonus = BONUSES[`day${nextDay}`];

    res.json({
      canClaim,
      streak,
      currentDay: nextDay,
      nextBonus,
      allBonuses: BONUSES
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
router.post('/claim-daily-bonus', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const today = new Date();
    const lastClaimed = user.lastDailyBonusClaim;

    if (lastClaimed && isSameDay(lastClaimed, today)) {
      return res.status(400).json({ error: 'Daily bonus already claimed today' });
    }

    let streak = user.loginStreak || 0;

    if (lastClaimed && !isConsecutive(lastClaimed, today)) {
      streak = 0;
    }

    streak += 1;
    if (streak > 7) streak = 1;

    const bonus = BONUSES[`day${streak}`];

    user.goldPoints += bonus.goldPoints || 0;
    user.pbPoints += bonus.pbPoints || 0;
    user.arcadeCredits += bonus.arcadeCredits || 0;
    user.lastDailyBonusClaim = today;
    user.loginStreak = streak;
    
    await user.save();

    res.json({
      success: true,
      bonus,
      message: `Daily bonus claimed! Streak: ${streak} days`,
      newTotals: {
        goldPoints: user.goldPoints,
        pbPoints: user.pbPoints,
        arcadeCredits: user.arcadeCredits
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
