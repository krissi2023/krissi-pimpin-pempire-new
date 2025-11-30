'use strict';

/**
 * Game: Golden Cane Slots
 * Match luxury symbols for quick-hit wins and flashy jackpots.
 */

const BASE_SYMBOLS = ['GOLD_MEDAL', 'GOLD_BAR', 'CANE', 'GRAPE_CLUSTER', 'CHERRY', 'BAR'];
const JACKPOT_SYMBOL = 'CANE';

class GoldenCaneSlots {
    constructor(options = {}) {
        this.spinCost = this.normalizeNumber(options.spinCost, 4);
        this.credits = this.normalizeNumber(options.startingCredits, 120);
        this.resetState();
    }

    initialize(options = {}) {
        if (typeof options.startingCredits === 'number') {
            this.credits = this.normalizeNumber(options.startingCredits, this.credits);
        }
        if (typeof options.spinCost === 'number') {
            this.spinCost = this.normalizeNumber(options.spinCost, this.spinCost);
        }
        this.resetState();
        return this.getState();
    }

    startGame() {
        this.resetState();
        return this.getState();
    }

    resetState() {
        this.reels = this.generateReels();
        this.isSpinning = false;
        this.lastSpinResult = [];
        this.winAmount = 0;
    }

    generateReels() {
        const reels = [];
        for (let i = 0; i < 3; i += 1) {
            reels.push(BASE_SYMBOLS.slice());
        }
        return reels;
    }

    spin() {
        if (this.isSpinning) {
            return { success: false, reason: 'Spin already in progress.' };
        }
        if (this.credits < this.spinCost) {
            return { success: false, reason: 'Not enough credits.' };
        }

        this.isSpinning = true;
        this.credits -= this.spinCost;
        this.startSpinAnimation();

        this.lastSpinResult = this.reels.map((symbols) => symbols[Math.floor(Math.random() * symbols.length)]);
        this.evaluateSpin();
        this.isSpinning = false;
        this.showSpinResultAnimation(this.lastSpinResult);

        return {
            success: true,
            result: this.lastSpinResult.slice(),
            winnings: this.winAmount,
            credits: this.credits,
            state: this.getState()
        };
    }

    evaluateSpin() {
        if (this.lastSpinResult.length === 0) {
            this.winAmount = 0;
            return;
        }

        if (this.lastSpinResult.every((symbol) => symbol === JACKPOT_SYMBOL)) {
            this.winAmount = 420;
            this.credits += this.winAmount;
            this.showJackpotWin();
            return;
        }

        if (new Set(this.lastSpinResult).size === 1) {
            this.winAmount = 80;
            this.credits += this.winAmount;
            this.showMinorWin();
            return;
        }

        if (this.lastSpinResult.filter((symbol) => symbol === JACKPOT_SYMBOL).length === 2) {
            this.winAmount = 35;
            this.credits += this.winAmount;
            this.showMinorWin();
            return;
        }

        this.winAmount = 0;
    }

    getState() {
        return {
            credits: this.credits,
            lastSpinResult: this.lastSpinResult.slice(),
            winAmount: this.winAmount,
            spinCost: this.spinCost
        };
    }

    startSpinAnimation() {
        // Placeholder for frontend animation integration.
    }

    showSpinResultAnimation(result) {
        return result;
    }

    showMinorWin() {
        // Hook for celebratory effects on minor wins.
    }

    showJackpotWin() {
        // Hook for marquee jackpot celebration.
    }

    normalizeNumber(value, fallback) {
        if (typeof value !== 'number' || Number.isNaN(value) || value <= 0) {
            return fallback;
        }
        return Math.floor(value);
    }
}

module.exports = GoldenCaneSlots;