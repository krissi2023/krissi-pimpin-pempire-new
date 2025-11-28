'use strict';

/**
 * The Throne of Diamonds - 5-reel prestige slot with expanding royal wilds.
 * Implements a free-spin mode that expands wild reels for high-yield respins.
 */

class ThroneOfDiamonds {
  constructor() {
    this.name = 'The Throne of Diamonds';
    this.type = 'VideoSlotGame';
    this.reels = 5;
    this.rows = 3;
    this.paylines = 20;
    this.currentBet = 20;
    this.balance = 5000;
    this.freeSpins = 0;
    this.expandingWildMode = false;
    this.lastSpin = null;

    this.symbolSet = {
      wild: 'EMP',
      scatter: 'SCAT',
      high: ['SCEPTER', 'CROWN', 'BARS'],
      low: ['A', 'K', 'Q', 'J']
    };

    this.payoutTable = this.buildPayoutTable();
  }

  buildPayoutTable() {
    return {
      EMP: { 2: 20, 3: 80, 4: 250, 5: 1000 },
      SCEPTER: { 3: 40, 4: 150, 5: 400 },
      CROWN: { 3: 35, 4: 120, 5: 300 },
      BARS: { 3: 30, 4: 100, 5: 260 },
      A: { 3: 12, 4: 45, 5: 150 },
      K: { 3: 10, 4: 40, 5: 130 },
      Q: { 3: 8, 4: 35, 5: 110 },
      J: { 3: 6, 4: 30, 5: 100 }
    };
  }

  initialize() {
    return {
      game: this.name,
      reels: this.reels,
      rows: this.rows,
      paylines: this.paylines,
      description: 'Royal respins with expanding wild reels and medium volatility payouts.',
      balance: this.balance,
      freeSpins: this.freeSpins,
      expandingWildMode: this.expandingWildMode
    };
  }

  setBet(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      return { success: false, error: 'Bet must be a positive number.' };
    }
    if (amount > this.balance) {
      return { success: false, error: 'Insufficient balance for requested bet.' };
    }
    this.currentBet = amount;
    return { success: true, bet: this.currentBet };
  }

  spin() {
    if (this.freeSpins === 0 && this.currentBet > this.balance) {
      return { success: false, error: 'Insufficient balance to spin.' };
    }

    const isFreeSpin = this.freeSpins > 0;
    if (isFreeSpin) {
      this.freeSpins--;
    } else {
      this.balance -= this.currentBet;
    }

    const grid = this.generateReelGrid();
    const scatterCount = this.countScatterSymbols(grid);

    if (!isFreeSpin && scatterCount >= 3) {
      this.freeSpins += 10;
      this.expandingWildMode = true;
    }

    const evaluatedGrid = this.expandingWildMode ? this.applyExpandingWilds(grid) : grid;
    const wins = this.evaluatePaylines(evaluatedGrid);
    const totalWin = wins.reduce((acc, win) => acc + win.payout, 0);

    if (totalWin > 0) {
      this.balance += totalWin;
    }

    if (this.expandingWildMode && !isFreeSpin && this.freeSpins === 0) {
      this.expandingWildMode = false;
    }

    this.lastSpin = {
      grid,
      evaluatedGrid,
      wins,
      scatterCount,
      freeSpinsRemaining: this.freeSpins,
      expandingWildMode: this.expandingWildMode,
      totalWin,
      balance: this.balance
    };

    return {
      success: true,
      grid,
      evaluatedGrid,
      wins,
      scatterCount,
      freeSpinsRemaining: this.freeSpins,
      expandingWildMode: this.expandingWildMode,
      totalWin,
      balance: this.balance
    };
  }

  generateReelGrid() {
    const grid = [];
    for (let reel = 0; reel < this.reels; reel++) {
      const column = [];
      for (let row = 0; row < this.rows; row++) {
        const roll = Math.random();
        if (roll < 0.04) {
          column.push(this.symbolSet.scatter);
        } else if (roll < 0.10) {
          column.push(this.symbolSet.wild);
        } else if (roll < 0.38) {
          column.push(this.symbolSet.high[Math.floor(Math.random() * this.symbolSet.high.length)]);
        } else {
          column.push(this.symbolSet.low[Math.floor(Math.random() * this.symbolSet.low.length)]);
        }
      }
      grid.push(column);
    }
    return grid;
  }

  applyExpandingWilds(grid) {
    return grid.map((column) => {
      if (column.includes(this.symbolSet.wild)) {
        return [this.symbolSet.wild, this.symbolSet.wild, this.symbolSet.wild];
      }
      return column.slice();
    });
  }

  countScatterSymbols(grid) {
    return grid.reduce((sum, column) => sum + column.filter((symbol) => symbol === this.symbolSet.scatter).length, 0);
  }

  evaluatePaylines(grid) {
    const paylines = this.getPaylineBlueprints();
    const wins = [];

    for (let index = 0; index < paylines.length; index++) {
      const pattern = paylines[index];
      const symbols = [];
      for (let reel = 0; reel < this.reels; reel++) {
        symbols.push(grid[reel][pattern[reel]]);
      }

      const result = this.evaluateSymbols(symbols);
      if (result) {
        wins.push({
          payline: index + 1,
          symbol: result.symbol,
          matches: result.count,
          payout: result.payout,
          pattern
        });
      }
    }

    return wins;
  }

  evaluateSymbols(symbols) {
    const baseSymbol = symbols[0] === this.symbolSet.wild ? this.findFirstNonWild(symbols) : symbols[0];
    if (!baseSymbol || baseSymbol === this.symbolSet.scatter) {
      return null;
    }

    let matchCount = 1;
    for (let i = 1; i < symbols.length; i++) {
      const symbol = symbols[i];
      if (symbol === baseSymbol || symbol === this.symbolSet.wild) {
        matchCount++;
      } else {
        break;
      }
    }

    if (matchCount < 2) {
      return null;
    }

    const payoutRow = this.payoutTable[baseSymbol] || this.payoutTable[this.symbolSet.wild];
    const unitPayout = payoutRow ? payoutRow[matchCount] || 0 : 0;
    const payout = unitPayout * (this.currentBet / 20);

    if (payout <= 0) {
      return null;
    }

    return {
      symbol: baseSymbol,
      count: matchCount,
      payout
    };
  }

  findFirstNonWild(symbols) {
    for (let i = 0; i < symbols.length; i++) {
      if (symbols[i] !== this.symbolSet.wild) {
        return symbols[i];
      }
    }
    return null;
  }

  getPaylineBlueprints() {
    return [
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
      [2, 2, 2, 2, 2],
      [0, 1, 2, 1, 0],
      [2, 1, 0, 1, 2],
      [0, 0, 1, 0, 0],
      [2, 2, 1, 2, 2],
      [1, 0, 1, 2, 1],
      [1, 2, 1, 0, 1],
      [0, 1, 1, 1, 0],
      [2, 1, 1, 1, 2],
      [0, 1, 0, 1, 0],
      [2, 1, 2, 1, 2],
      [0, 2, 2, 2, 0],
      [2, 0, 0, 0, 2],
      [0, 2, 1, 0, 2],
      [2, 0, 1, 2, 0],
      [1, 0, 0, 0, 1],
      [1, 2, 2, 2, 1],
      [0, 1, 2, 2, 1]
    ];
  }

  getGameState() {
    return {
      balance: this.balance,
      bet: this.currentBet,
      freeSpins: this.freeSpins,
      expandingWildMode: this.expandingWildMode,
      lastSpin: this.lastSpin
    };
  }
}

module.exports = ThroneOfDiamonds;
