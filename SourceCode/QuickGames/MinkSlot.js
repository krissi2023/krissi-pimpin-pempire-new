'use strict';

/**
 * Game: Mink Slot
 * Fashion-forward slot experience themed around mink coats and luxury prizes.
 */

class MinkSlot {
    constructor(options = {}) {
        this.spinCost = this.normalizeNumber(options.spinCost, 6);
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

    generateReels() {
        const symbols = ['MINK', 'FUR_COLLAR', 'GOLD_RING', 'PERFUME', 'HAT_PIN', 'BAR'];
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
            return { success: false, message: 'Cannot spin at this moment.' };
        }

        this.isSpinning = true;
        this.credits -= this.spinCost;
        this.lastSpinResult = this.reels.map((symbols) => symbols[Math.floor(Math.random() * symbols.length)]);
        this.evaluateSpin();
        this.isSpinning = false;

        return {
            success: true,
            result: this.lastSpinResult.slice(),
            winAmount: this.winAmount,
            credits: this.credits,
            state: this.getState()
        };
    }

    evaluateSpin() {
        if (this.lastSpinResult.length === 0) {
            return;
        }

        if (this.lastSpinResult.every((symbol) => symbol === 'MINK')) {
            this.winAmount = 450;
            this.credits += this.winAmount;
            return;
        }

        if (this.lastSpinResult.filter((symbol) => symbol === 'FUR_COLLAR').length === 2) {
            this.winAmount = 60;
            this.credits += this.winAmount;
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

    resetState() {
        this.reels = this.generateReels();
        this.isSpinning = false;
        this.lastSpinResult = [];
        this.winAmount = 0;
    }

    normalizeNumber(value, fallback) {
        if (typeof value !== 'number' || Number.isNaN(value) || value <= 0) {
            return fallback;
        }
        return Math.floor(value);
    }
}

module.exports = MinkSlot;
