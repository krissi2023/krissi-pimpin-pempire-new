'use strict';

/**
 * The Street Boss's Deal - Megaways engine with mystery symbols and scaling multiplier.
 * Simulates variable-row reels and contract-triggered free spins.
 */

class StreetBossDeal {
  constructor() {
    this.name = "The Street Boss's Deal";
    this.type = 'MegawaysSlotGame';
    this.reels = 6;
    this.minRows = 2;
    this.maxRows = 7;
    this.currentBet = 30;
    this.balance = 7000;
    this.freeSpins = 0;
    this.freeSpinMultiplier = 1;
    this.lastSpin = null;

    this.highSymbols = ['HANDSHAKE', 'PHONE', 'BRIEFCASE', 'MAP'];
    this.lowSymbols = ['DAGGER', 'KNUCKLES', 'SHADOW'];
    this.scatterSymbol = 'ENVELOPE';
    this.mysteryPlaceholder = 'MYSTERY';
  }

  initialize() {
    return {
      game: this.name,
      mechanic: 'Megaways (up to 117,649 ways) with mystery map symbols and contract spins.',
      reels: this.reels,
      minRows: this.minRows,
      maxRows: this.maxRows,
      balance: this.balance,
      freeSpins: this.freeSpins,
      multiplier: this.freeSpinMultiplier
    };
  }

  setBet(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      return { success: false, error: 'Bet must be greater than zero.' };
    }
    if (amount > this.balance && this.freeSpins === 0) {
      return { success: false, error: 'Insufficient balance.' };
    }
    this.currentBet = amount;
    return { success: true, bet: this.currentBet };
  }

  spin() {
    const isFreeSpin = this.freeSpins > 0;
    if (!isFreeSpin && this.currentBet > this.balance) {
      return { success: false, error: 'Insufficient balance to spin.' };
    }

    if (!isFreeSpin) {
      this.balance -= this.currentBet;
      this.freeSpinMultiplier = 1;
    } else {
      this.freeSpins--;
    }

    const reels = this.generateReels();
    const mysteryApplied = this.applyMysterySymbols(reels);
    const scatterCount = this.countScatter(reels);

    if (!isFreeSpin && scatterCount >= 4) {
      this.freeSpins += 10 + (scatterCount - 4) * 2;
      this.freeSpinMultiplier = 1;
    }

    const wins = this.calculateMegawaysWins(reels);
    let totalWin = wins.reduce((acc, combo) => acc + combo.payout, 0);

    if (isFreeSpin) {
      totalWin *= this.freeSpinMultiplier;
      if (totalWin > 0) {
        this.freeSpinMultiplier += 1;
      }
    }

    if (totalWin > 0) {
      this.balance += totalWin;
    }

    if (!isFreeSpin && this.freeSpins === 0) {
      this.freeSpinMultiplier = 1;
    }

    this.lastSpin = {
      reels,
      mysteryApplied,
      scatterCount,
      wins,
      totalWin,
      freeSpinsRemaining: this.freeSpins,
      multiplier: this.freeSpinMultiplier,
      balance: this.balance
    };

    return {
      success: true,
      reels,
      mysteryApplied,
      scatterCount,
      wins,
      totalWin,
      freeSpinsRemaining: this.freeSpins,
      multiplier: this.freeSpinMultiplier,
      balance: this.balance
    };
  }

  generateReels() {
    const reels = [];
    for (let i = 0; i < this.reels; i++) {
      const rows = this.minRows + Math.floor(Math.random() * (this.maxRows - this.minRows + 1));
      const column = [];
      for (let r = 0; r < rows; r++) {
        const roll = Math.random();
        if (roll < 0.02) {
          column.push(this.scatterSymbol);
        } else if (roll < 0.15) {
          column.push(this.mysteryPlaceholder);
        } else if (roll < 0.55) {
          column.push(this.highSymbols[Math.floor(Math.random() * this.highSymbols.length)]);
        } else {
          column.push(this.lowSymbols[Math.floor(Math.random() * this.lowSymbols.length)]);
        }
      }
      reels.push(column);
    }
    return reels;
  }

  applyMysterySymbols(reels) {
    const locations = [];
    reels.forEach((column, reelIndex) => {
      column.forEach((symbol, rowIndex) => {
        if (symbol === this.mysteryPlaceholder) {
          locations.push({ reel: reelIndex, row: rowIndex });
        }
      });
    });

    if (locations.length === 0) {
      return null;
    }

    const targetPool = [...this.highSymbols, ...this.lowSymbols];
    const chosen = targetPool[Math.floor(Math.random() * targetPool.length)];
    locations.forEach(({ reel, row }) => {
      reels[reel][row] = chosen;
    });

    return {
      locations,
      transformedInto: chosen
    };
  }

  countScatter(reels) {
    return reels.reduce((total, column) => total + column.filter((symbol) => symbol === this.scatterSymbol).length, 0);
  }

  calculateMegawaysWins(reels) {
    const wins = [];
    const symbolMap = new Map();

    reels.forEach((column, reelIndex) => {
      column.forEach((symbol) => {
        if (symbol === this.scatterSymbol) {
          return;
        }
        if (!symbolMap.has(symbol)) {
          symbolMap.set(symbol, []);
        }
        const entries = symbolMap.get(symbol);
        let entry = entries.find((item) => item.reel === reelIndex);
        if (!entry) {
          entry = { reel: reelIndex, count: 0 };
          entries.push(entry);
        }
        entry.count += 1;
      });
    });

    symbolMap.forEach((entries, symbol) => {
      const sorted = entries.sort((a, b) => a.reel - b.reel);
      let consecutive = 0;
      const reelCounts = [];
      for (let expected = 0; expected < this.reels; expected++) {
        const found = sorted.find((entry) => entry.reel === expected);
        if (found) {
          consecutive++;
          reelCounts.push(found.count);
        } else {
          break;
        }
      }

      if (consecutive >= 3) {
        const ways = reelCounts.reduce((acc, value) => acc * value, 1);
        const volatilityFactor = this.highSymbols.includes(symbol) ? 0.35 : 0.18;
        const basePayout = this.currentBet * volatilityFactor * ways * consecutive;
        const payout = Math.round(basePayout);
        if (payout > 0) {
          wins.push({ symbol, reelsHit: consecutive, ways, payout });
        }
      }
    });

    return wins;
  }

  getGameState() {
    return {
      balance: this.balance,
      bet: this.currentBet,
      freeSpins: this.freeSpins,
      multiplier: this.freeSpinMultiplier,
      lastSpin: this.lastSpin
    };
  }
}

module.exports = StreetBossDeal;
