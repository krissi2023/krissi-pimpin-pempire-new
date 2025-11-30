'use strict';

/**
 * Diamond's High Roller Heist Slot Machine.
 * Three reels, five paylines, high-volatility payouts, and wild jackpots.
 */

const PAYLINES = [
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
];

const SYMBOLS = {
    WILD: { name: 'Eye of the Pempire', multiplier: 120 },
    GoldBar: { name: 'Gold Bar Stack', multiplier: 60 },
    CashStack: { name: 'Cash Stack', multiplier: 30 },
    Cufflink: { name: 'Platinum Cufflink', multiplier: 12 },
    BadCheck: { name: 'Bounced Check', multiplier: 6 },
    Diamond: { name: 'Solo Diamond', multiplier: 4 }
};

const DEFAULT_SYMBOL_WEIGHTS = Object.keys(SYMBOLS);

class DiamondsHighRollerHeistSlot {
    constructor(options = {}) {
        this.isSpinning = false;
        this.totalWinnings = 0;
        this.currentBet = this.normalizeNumber(options.defaultBet, 10);
        this.playerCredits = this.normalizeNumber(options.startingCredits, 300);
        this.lastSpin = { reels: [], payout: { totalWinnings: 0, winningLines: [] } };
        this.reelSymbols = options.reelSymbols || DEFAULT_SYMBOL_WEIGHTS.map(() => DEFAULT_SYMBOL_WEIGHTS.slice());
        this.startGame();
    }

    normalizeNumber(value, fallback) {
        if (typeof value !== 'number' || Number.isNaN(value) || value <= 0) {
            return fallback;
        }
        return Math.floor(value);
    }

    initialize(options = {}) {
        this.playerCredits = this.normalizeNumber(options.startingCredits, this.playerCredits);
        if (typeof options.defaultBet === 'number') {
            this.setBet(options.defaultBet);
        }
        this.startGame();
        return this.getState();
    }

    startGame() {
        this.isSpinning = false;
        this.totalWinnings = 0;
        this.lastSpin = { reels: [], payout: { totalWinnings: 0, winningLines: [] } };
        return this.getState();
    }

    setBet(newBet) {
        const normalized = this.normalizeNumber(newBet, this.currentBet);
        if (normalized <= this.playerCredits) {
            this.currentBet = normalized;
        }
        return this.currentBet;
    }

    spin() {
        if (this.isSpinning) {
            return { success: false, reason: 'Spin already in progress.' };
        }
        if (this.playerCredits < this.currentBet) {
            return { success: false, reason: 'Insufficient credits.' };
        }

        this.isSpinning = true;
        this.playerCredits -= this.currentBet;
        const reels = this.generateSpinResult();
        const payout = this.calculateWinnings(reels);
        this.playerCredits += payout.totalWinnings;
        this.totalWinnings += payout.totalWinnings;
        this.lastSpin = { reels, payout };
        this.isSpinning = false;

        this.animateSpin(reels, payout);

        return {
            success: true,
            reels,
            payout,
            credits: this.playerCredits,
            state: this.getState()
        };
    }

    generateSpinResult() {
        const reels = [];
        for (let reelIndex = 0; reelIndex < 3; reelIndex += 1) {
            const symbolsPool = this.reelSymbols[reelIndex] || DEFAULT_SYMBOL_WEIGHTS;
            const column = [];
            for (let rowIndex = 0; rowIndex < 3; rowIndex += 1) {
                const symbol = symbolsPool[Math.floor(Math.random() * symbolsPool.length)];
                column.push(symbol);
            }
            reels.push(column);
        }
        return reels;
    }

    calculateWinnings(reels) {
        let totalWinnings = 0;
        const winningLines = [];

        for (let lineIndex = 0; lineIndex < PAYLINES.length; lineIndex += 1) {
            const line = PAYLINES[lineIndex];
            const symbols = line.map(([reel, row]) => reels[reel][row]);
            if (symbols.every((entry) => entry === symbols[0])) {
                const symbolMeta = SYMBOLS[symbols[0]];
                if (symbolMeta) {
                    const win = this.currentBet * symbolMeta.multiplier;
                    totalWinnings += win;
                    winningLines.push({
                        line: lineIndex + 1,
                        symbol: symbols[0],
                        payout: win,
                        displayName: symbolMeta.name
                    });
                }
            }
        }

        return {
            totalWinnings,
            winningLines
        };
    }

    getState() {
        return {
            credits: this.playerCredits,
            currentBet: this.currentBet,
            totalWinnings: this.totalWinnings,
            lastSpin: this.lastSpin
        };
    }

    // ==== Animation & UI stubs ====
    animateSpin(reels, payout) {
        if (!reels || !payout) {
            return;
        }
        // Hook for client-side animation triggers. No-op for backend simulations.
    }
}

module.exports = DiamondsHighRollerHeistSlot;