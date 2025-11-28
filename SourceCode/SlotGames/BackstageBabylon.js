'use strict';

/**
 * Backstage Babylon - Pick-and-click cabaret slot focused on steady returns.
 * Combines 50-line base game with bonus picker revealing jackpots and credits.
 */

class BackstageBabylon {
  constructor() {
    this.name = 'Backstage Babylon';
    this.type = 'PickAndClickSlotGame';
    this.reels = 5;
    this.rows = 4;
    this.paylines = 50;
    this.currentBet = 10;
    this.balance = 3200;
    this.lastSpin = null;

    this.vipRoster = [
      'Diamond',
      'Velvet Vixen',
      'Neon Prophet',
      'Roulette Queen',
      'Mr. Mirage',
      'Shadow Stagehand',
      'DJ Staccato',
      'Madame Silk',
      'Jetset Jada',
      'The Oracle',
      'King Pimpin\'',
      'Champagne Ghost',
      'Lady Lux',
      'Mystique',
      'Goldie Locks'
    ];
  }

  initialize() {
    return {
      game: this.name,
      reels: this.reels,
      rows: this.rows,
      paylines: this.paylines,
      description: 'Low volatility nightlife slot with a VIP list picker bonus.',
      balance: this.balance
    };
  }

  setBet(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      return { success: false, error: 'Bet must be a positive number.' };
    }
    if (amount > this.balance) {
      return { success: false, error: 'Insufficient balance.' };
    }
    this.currentBet = amount;
    return { success: true, bet: this.currentBet };
  }

  spin() {
    if (this.currentBet > this.balance) {
      return { success: false, error: 'Insufficient balance to spin.' };
    }

    this.balance -= this.currentBet;

    const baseWins = this.evaluateBaseHits();
    const baseWinTotal = baseWins.reduce((acc, win) => acc + win.payout, 0);
    this.balance += baseWinTotal;

    let bonus = null;
    if (Math.random() < 0.18) {
      bonus = this.runVipPicker();
      this.balance += bonus.totalReward;
    }

    this.lastSpin = {
      baseWins,
      baseWinTotal,
      bonusTriggered: Boolean(bonus),
      bonus,
      balance: this.balance
    };

    return {
      success: true,
      baseWins,
      baseWinTotal,
      bonusTriggered: Boolean(bonus),
      bonus,
      balance: this.balance
    };
  }

  evaluateBaseHits() {
    const wins = [];
    const hitChance = Math.random();

    if (hitChance < 0.5) {
      return wins;
    }

    const numberOfWins = 1 + Math.floor(Math.random() * 3);
    for (let i = 0; i < numberOfWins; i++) {
      const payout = Math.round(this.currentBet * (Math.random() * 3 + 0.5));
      wins.push({
        payline: Math.floor(Math.random() * this.paylines) + 1,
        symbol: this.randomBaseSymbol(),
        matches: 3 + Math.floor(Math.random() * 2),
        payout
      });
    }
    return wins;
  }

  randomBaseSymbol() {
    const symbols = ['DANCER', 'COCKTAIL', 'ROULETTE', 'MASK', 'LIPSTICK', 'PERFUME', 'SPOTLIGHT'];
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  runVipPicker() {
    const picks = [];
    let remainingPicks = 3;
    let totalReward = 0;
    const availableNames = [...this.vipRoster];

    while (remainingPicks > 0 && availableNames.length > 0) {
      const index = Math.floor(Math.random() * availableNames.length);
      const name = availableNames.splice(index, 1)[0];
      const rewardOutcome = this.revealReward();
      totalReward += rewardOutcome.value;
      picks.push({ name, rewardType: rewardOutcome.type, reward: rewardOutcome.value });
      remainingPicks += rewardOutcome.extraPicks;
      remainingPicks--;
    }

    return {
      picks,
      totalReward,
      picksUsed: picks.length
    };
  }

  revealReward() {
    const roll = Math.random();
    if (roll < 0.65) {
      return { type: 'CASH', value: Math.round(this.currentBet * (Math.random() * 4 + 1)), extraPicks: 0 };
    }
    if (roll < 0.85) {
      return { type: 'EXTRA_PICK', value: 0, extraPicks: 1 };
    }
    if (roll < 0.96) {
      return { type: 'MINI_JACKPOT', value: this.currentBet * 20, extraPicks: 0 };
    }
    return { type: 'MAJOR_JACKPOT', value: this.currentBet * 75, extraPicks: 0 };
  }

  getGameState() {
    return {
      balance: this.balance,
      bet: this.currentBet,
      lastSpin: this.lastSpin
    };
  }
}

module.exports = BackstageBabylon;
