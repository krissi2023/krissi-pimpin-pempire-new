'use strict';

/**
 * Game: Dapaul Smooth Slot
 * High-roller slot experience with smooth jazz mood and progressive jackpots.
 */

class DapaulSmoothSlot {
    constructor(options = {}) {
        this.reels = this.generateReels();
        this.isSpinning = false;
        this.credits = Number.isFinite(options.startingCredits) ? options.startingCredits : 150;
        this.spinCost = 5;
        this.lastSpinResult = [];
        this.winAmount = 0;
        this.progressiveJackpot = Number.isFinite(options.jackpotSeed) ? options.jackpotSeed : 500;
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
        this.reels = this.generateReels();
        this.isSpinning = false;
        this.lastSpinResult = [];
        this.winAmount = 0;
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
            credits: this.credits
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
        this.progressiveJackpot = 500;
    }

    getState() {
        return {
            credits: this.credits,
            lastSpinResult: this.lastSpinResult.slice(),
            progressiveJackpot: this.progressiveJackpot,
            winAmount: this.winAmount
        };
    }
}

module.exports = DapaulSmoothSlot;
