'use strict';

/**
 * The Pimpire's Vault - Cascading cluster slot with progressive multipliers.
 * Generates a 6x6 grid, awards for clusters of 5+, and increases multiplier per cascade.
 */

class PimpireVault {
  constructor() {
    this.name = "The Pimpire's Vault";
    this.type = 'CascadingSlotGame';
    this.gridSize = 6;
    this.currentBet = 15;
    this.balance = 4500;
    this.lastSpin = null;

    this.symbols = {
      premium: ['BILLS', 'ART', 'GOLDBAR'],
      standard: ['JEWEL', 'SAFE', 'DRILL'],
      blocker: 'CAMERA'
    };

    this.basePayouts = {
      BILLS: 6,
      ART: 5,
      GOLDBAR: 5,
      JEWEL: 3,
      SAFE: 3,
      DRILL: 2
    };
  }

  initialize() {
    return {
      game: this.name,
      gridSize: this.gridSize,
      mechanic: 'Cluster pays with cascading reels and compounding multipliers.',
      balance: this.balance
    };
  }

  setBet(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      return { success: false, error: 'Bet must be a positive value.' };
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

    let grid = this.generateGrid();
    const cascades = [];
    let multiplier = 1;
    let totalWin = 0;

    while (true) {
      const clusters = this.findWinningClusters(grid);
      if (clusters.length === 0) {
        break;
      }

      const cascadeWin = this.calculateClusterWin(clusters, multiplier);
      totalWin += cascadeWin;

      cascades.push({
        multiplier,
        clusters,
        cascadeWin
      });

      grid = this.performCascade(grid, clusters);
      multiplier++;
    }

    if (totalWin > 0) {
      this.balance += totalWin;
    }

    this.lastSpin = {
      cascades,
      totalWin,
      finalMultiplier: multiplier - 1,
      balance: this.balance
    };

    return {
      success: true,
      cascades,
      totalWin,
      finalMultiplier: multiplier - 1,
      balance: this.balance
    };
  }

  generateGrid() {
    const grid = [];
    for (let row = 0; row < this.gridSize; row++) {
      const rowSymbols = [];
      for (let col = 0; col < this.gridSize; col++) {
        const roll = Math.random();
        if (roll < 0.05) {
          rowSymbols.push(this.symbols.blocker);
        } else if (roll < 0.35) {
          rowSymbols.push(this.symbols.premium[Math.floor(Math.random() * this.symbols.premium.length)]);
        } else {
          rowSymbols.push(this.symbols.standard[Math.floor(Math.random() * this.symbols.standard.length)]);
        }
      }
      grid.push(rowSymbols);
    }
    return grid;
  }

  findWinningClusters(grid) {
    const visited = new Set();
    const clusters = [];

    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        const key = `${row}:${col}`;
        if (visited.has(key)) {
          continue;
        }
        const symbol = grid[row][col];
        if (!symbol || symbol === this.symbols.blocker) {
          visited.add(key);
          continue;
        }
        const cluster = this.expandCluster(grid, row, col, symbol, visited);
        if (cluster.length >= 5) {
          clusters.push({ symbol, positions: cluster });
        }
      }
    }

    return clusters;
  }

  expandCluster(grid, row, col, symbol, visited) {
    const queue = [[row, col]];
    const cluster = [];

    while (queue.length > 0) {
      const [r, c] = queue.shift();
      const key = `${r}:${c}`;
      if (visited.has(key)) {
        continue;
      }
      if (!this.isValidPosition(r, c)) {
        continue;
      }
      if (grid[r][c] !== symbol) {
        continue;
      }

      visited.add(key);
      cluster.push({ row: r, col: c });

      queue.push([r - 1, c]);
      queue.push([r + 1, c]);
      queue.push([r, c - 1]);
      queue.push([r, c + 1]);
    }

    return cluster;
  }

  calculateClusterWin(clusters, multiplier) {
    return clusters.reduce((acc, cluster) => {
      const base = this.basePayouts[cluster.symbol] || 1;
      const size = cluster.positions.length;
      const win = this.currentBet * base * size * multiplier * 0.1;
      return acc + Math.round(win);
    }, 0);
  }

  performCascade(grid, clusters) {
    const newGrid = grid.map((row) => row.slice());

    clusters.forEach((cluster) => {
      cluster.positions.forEach(({ row, col }) => {
        newGrid[row][col] = null;
      });
    });

    // collapse columns
    for (let col = 0; col < this.gridSize; col++) {
      const columnSymbols = [];
      for (let row = this.gridSize - 1; row >= 0; row--) {
        const value = newGrid[row][col];
        if (value !== null && value !== undefined) {
          columnSymbols.push(value);
        }
      }
      while (columnSymbols.length < this.gridSize) {
        columnSymbols.push(this.rollReplacementSymbol());
      }
      for (let row = 0; row < this.gridSize; row++) {
        newGrid[this.gridSize - 1 - row][col] = columnSymbols[row];
      }
    }

    return newGrid;
  }

  rollReplacementSymbol() {
    const roll = Math.random();
    if (roll < 0.04) {
      return this.symbols.blocker;
    }
    if (roll < 0.34) {
      return this.symbols.premium[Math.floor(Math.random() * this.symbols.premium.length)];
    }
    return this.symbols.standard[Math.floor(Math.random() * this.symbols.standard.length)];
  }

  isValidPosition(row, col) {
    return row >= 0 && row < this.gridSize && col >= 0 && col < this.gridSize;
  }

  getGameState() {
    return {
      balance: this.balance,
      bet: this.currentBet,
      lastSpin: this.lastSpin
    };
  }
}

module.exports = PimpireVault;
