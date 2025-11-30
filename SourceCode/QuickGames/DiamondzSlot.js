/**
 * Game: Diamondz Slot Machine
 * Classic slot machine - spin reels, match diamonds, win jackpot.
 */

'use strict';

class DiamondzSlot {
	constructor(options = {}) {
		this.reels = this.generateReels();
		this.isSpinning = false;
		this.credits = Number.isFinite(options.startingCredits) ? options.startingCredits : 100;
		this.lastSpinResult = [];
		this.spinCost = 5;
		this.winAmount = 0;
	}

	startGame() {
		this.reels = this.generateReels();
		this.isSpinning = false;
		this.lastSpinResult = [];
		this.winAmount = 0;
	}

	generateReels() {
		const symbols = ['DIAMOND', 'CHERRY', 'BELL', 'LEMON', 'SEVEN', 'BAR'];
		const reels = [];
		for (let i = 0; i < 3; i += 1) {
			reels.push(symbols.slice());
		}
		return reels;
	}

	spin() {
		if (this.isSpinning || this.credits < this.spinCost) {
			return { success: false, message: 'Unable to spin right now.' };
		}

		this.isSpinning = true;
		this.credits -= this.spinCost;

		this.lastSpinResult = this.reels.map((symbols) => symbols[Math.floor(Math.random() * symbols.length)]);
		this.evaluateSpin();
		this.isSpinning = false;

		return {
			success: true,
			result: this.lastSpinResult.slice(),
			credits: this.credits,
			winAmount: this.winAmount
		};
	}

	evaluateSpin() {
		if (this.lastSpinResult.length === 0) {
			return;
		}

		if (this.lastSpinResult.every((symbol) => symbol === 'DIAMOND')) {
			this.winAmount = 500;
			this.credits += this.winAmount;
			return;
		}

		if (new Set(this.lastSpinResult).size === 1) {
			this.winAmount = 100;
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

module.exports = DiamondzSlot;
