'use strict';

/**
 * Game: Diamondz Slot Machine
 * Classic slot machine - spin reels, match diamonds, win jackpot.
 */

const SYMBOLS = ['DIAMOND', 'CHERRY', 'BELL', 'LEMON', 'SEVEN', 'BAR'];

class DiamondzSlot {
	constructor(options = {}) {
		this.spinCost = this.normalizeNumber(options.spinCost, 5);
		this.credits = this.normalizeNumber(options.startingCredits, 100);
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

	generateReels() {
		const reels = [];
		for (let i = 0; i < 3; i += 1) {
			reels.push(SYMBOLS.slice());
		}
		return reels;
	}

	spin() {
		if (this.isSpinning) {
			return { success: false, message: 'Unable to spin right now.' };
		}
		if (this.credits < this.spinCost) {
			return { success: false, message: 'Not enough credits.' };
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
			winAmount: this.winAmount,
			state: this.getState()
		};
	}

	evaluateSpin() {
		if (this.lastSpinResult.length === 0) {
			this.winAmount = 0;
			return;
		}

		if (this.lastSpinResult.every((symbol) => symbol === 'DIAMOND')) {
			this.winAmount = 520;
			this.credits += this.winAmount;
			return;
		}

		if (new Set(this.lastSpinResult).size === 1) {
			this.winAmount = 110;
			this.credits += this.winAmount;
			return;
		}

		if (this.lastSpinResult.filter((symbol) => symbol === 'DIAMOND').length === 2) {
			this.winAmount = 45;
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

module.exports = DiamondzSlot;
