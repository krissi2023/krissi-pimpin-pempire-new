'use strict';

/**
 * Game: Dapaul Smooth Slot
 * High-roller slot experience with smooth jazz mood and progressive jackpots.
 */

class DapaulSmoothSlot {
    constructor(options = {}) {
        this.spinCost = 5;
        this.progressiveJackpot = this.normalizeNumber(options.jackpotSeed, 500);
        this.progressiveBase = this.progressiveJackpot;
        this.credits = this.normalizeNumber(options.startingCredits, 150);
        this.resetState();
    }

    initialize(options = {}) {
        if (typeof options.startingCredits === 'number') {
            this.credits = this.normalizeNumber(options.startingCredits, this.credits);
        }
        if (typeof options.jackpotSeed === 'number') {
            this.progressiveJackpot = this.normalizeNumber(options.jackpotSeed, this.progressiveJackpot);
            this.progressiveBase = this.progressiveJackpot;
        }
        if (typeof options.spinCost === 'number') {
            this.spinCost = this.normalizeNumber(options.spinCost, this.spinCost);
        }
        this.resetState();
        return this.getState();
    }

    generateReels() {
        const symbols = ['SMOOTH', 'SAX', 'DIAMOND', 'GOLD_STACK', 'VINYL', 'CANE'];
        const reels = [];
        for (let i = 0; i < 3; i += 1) {
            reels.push(symbols.slice());
        }
        return reels;
    }

    startGame() {
        this.resetState();
        return this.getState();
    }

    spin() {
        if (this.isSpinning || this.credits < this.spinCost) {
            return { success: false, message: 'Insufficient credits or already spinning.' };
        }
        this.isSpinning = true;
        this.credits -= this.spinCost;

        this.lastSpinResult = this.reels.map((symbols) => symbols[Math.floor(Math.random() * symbols.length)]);
        this.evaluateSpin();
        this.isSpinning = false;

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
            return;
        }

        if (this.lastSpinResult.every((symbol) => symbol === 'SMOOTH')) {
            this.winAmount = this.progressiveJackpot;
            this.credits += this.winAmount;
            this.resetProgressive();
            return;
        }

        if (new Set(this.lastSpinResult).size === 1) {
            this.winAmount = 80;
            this.credits += this.winAmount;
            this.addToProgressive(10);
            return;
        }

        if (this.lastSpinResult.filter((symbol) => symbol === 'DIAMOND').length === 2) {
            this.winAmount = 25;
            this.credits += this.winAmount;
            this.addToProgressive(5);
            return;
        }

        this.winAmount = 0;
        this.addToProgressive(2);
    }

    addToProgressive(amount) {
        this.progressiveJackpot += amount;
    }

    resetProgressive() {
        this.progressiveJackpot = this.progressiveBase;
    }

    getState() {
        return {
            credits: this.credits,
            lastSpinResult: this.lastSpinResult.slice(),
            progressiveJackpot: this.progressiveJackpot,
            winAmount: this.winAmount,
            spinCost: this.spinCost
        };
    }

    resetState() {
        this.reels = this.generateReels();
        this.isSpinning = false;
        this.lastSpinResult = [];
        this.winAmount = 0;
        this.progressiveJackpot = this.progressiveBase;
    }

    normalizeNumber(value, fallback) {
        if (typeof value !== 'number' || Number.isNaN(value) || value <= 0) {
            return fallback;
        }
        return Math.floor(value);
    }
}

module.exports = DapaulSmoothSlot;
