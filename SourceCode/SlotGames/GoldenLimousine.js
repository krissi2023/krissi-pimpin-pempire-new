'use strict';

/**
 * The Golden Limousine - Hold-and-Win experience with jackpot tokens.
 * Simulates cash-value coin locks and respin resets when new coins land.
 */

class GoldenLimousine {
  constructor() {
    this.name = 'The Golden Limousine';
    this.type = 'HoldAndWinSlotGame';
    this.reels = 5;
    this.rows = 3;
    this.allWays = 243;
    this.currentBet = 25;
    this.balance = 6000;
    this.lastSpin = null;

    this.coinValues = [
      { label: 'Mini', multiplier: 15 },
      { label: 'Minor', multiplier: 40 },
      { label: 'Major', multiplier: 120 }
    ];
  }

  initialize() {
    return {
      game: this.name,
      reels: this.reels,
      rows: this.rows,
      allWays: this.allWays,
      description: 'Collect gold coins to trigger the Grand Heist Hold-and-Win bonus.',
      balance: this.balance
    };
  }

  setBet(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      return { success: false, error: 'Bet must be greater than zero.' };
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

    const baseWin = this.calculateBaseWin();
    this.balance += baseWin;

    const coinCount = this.rollCoins();
    let featureResult = null;

    if (coinCount >= 6) {
      featureResult = this.playHoldAndWin(coinCount);
      this.balance += featureResult.totalWin;
    }

    this.lastSpin = {
      baseWin,
      coinCount,
      featureTriggered: Boolean(featureResult),
      featureResult,
      balance: this.balance
    };

    return {
      success: true,
      baseWin,
      coinCount,
      featureTriggered: Boolean(featureResult),
      featureResult,
      balance: this.balance
    };
  }

  calculateBaseWin() {
    const hitRate = Math.random();
    if (hitRate < 0.4) {
      return 0;
    }
    if (hitRate < 0.7) {
      return Math.round(this.currentBet * (Math.random() * 1.5 + 0.5));
    }
    if (hitRate < 0.9) {
      return Math.round(this.currentBet * (Math.random() * 4 + 1));
    }
    return Math.round(this.currentBet * (Math.random() * 8 + 5));
  }

  rollCoins() {
    // Weighted for volatile patterns
    const roll = Math.random();
    if (roll < 0.55) return Math.floor(Math.random() * 5); // 0-4 coins
    if (roll < 0.80) return 6 + Math.floor(Math.random() * 3); // 6-8 coins
    if (roll < 0.95) return 9 + Math.floor(Math.random() * 4); // 9-12 coins
    return 15; // Grand board fill
  }

  playHoldAndWin(startingCoins) {
    const lockedCoins = [];
    let respinsRemaining = 3;
    let coinsOnBoard = startingCoins;

    while (respinsRemaining > 0) {
      const landed = this.generateCoinOutcome(coinsOnBoard);
      if (landed.length > 0) {
        lockedCoins.push(...landed);
        coinsOnBoard += landed.length;
        respinsRemaining = 3;
      } else {
        respinsRemaining--;
      }
      if (coinsOnBoard >= 15) {
        break;
      }
    }

    const totalWin = lockedCoins.reduce((acc, coin) => acc + coin.value, 0) + this.evaluateGrandJackpot(coinsOnBoard);

    return {
      lockedCoins,
      finalCoinCount: coinsOnBoard,
      respinsRemaining,
      totalWin
    };
  }

  generateCoinOutcome(currentCount) {
    const outcomes = [];
    const newCoinChance = currentCount >= 12 ? 0.35 : 0.6;
    if (Math.random() > newCoinChance) {
      return outcomes;
    }

    const coinRolls = Math.floor(Math.random() * 3) + 1; // 1-3 new coins
    for (let i = 0; i < coinRolls; i++) {
      const typeRoll = Math.random();
      if (typeRoll < 0.75) {
        outcomes.push({ label: 'Credit', value: Math.round(this.currentBet * (Math.random() * 5 + 1)) });
      } else {
        const jackpot = this.coinValues[Math.floor(Math.random() * this.coinValues.length)];
        outcomes.push({ label: jackpot.label, value: this.currentBet * jackpot.multiplier });
      }
    }
    return outcomes;
  }

  evaluateGrandJackpot(totalCoins) {
    if (totalCoins < 15) {
      return 0;
    }
    return this.currentBet * 500; // Grand jackpot payout
  }

  getGameState() {
    return {
      balance: this.balance,
      bet: this.currentBet,
      lastSpin: this.lastSpin
    };
  }
}

module.exports = GoldenLimousine;
