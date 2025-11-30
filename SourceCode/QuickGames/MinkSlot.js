'use strict';

/**
 * Game: Mink Slot
 * Fashion-forward slot experience themed around mink coats and luxury prizes.
 */

class MinkSlot {
    constructor(options = {}) {
        this.reels = this.generateReels();
        this.isSpinning = false;
        this.credits = Number.isFinite(options.startingCredits) ? options.startingCredits : 120;
        this.spinCost = 6;
        this.lastSpinResult = [];
        this.winAmount = 0;
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
        this.reels = this.generateReels();
        this.isSpinning = false;
        this.lastSpinResult = [];
        this.winAmount = 0;
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
            credits: this.credits
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
            winAmount: this.winAmount
        };
    }
}

module.exports = MinkSlot;
