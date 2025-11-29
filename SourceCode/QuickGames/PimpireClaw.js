/**
 * Game: Pimpire Claw
 * Claw machine experience—position the claw, grab premium prizes, and manage limited energy.
 * Features: Grid-based prizes, claw movement, drop timing, rarity system, streak bonuses.
 */

'use strict';

class PimpireClaw {
    constructor(options = {}) {
        this.gridWidth = options.gridWidth || 5;
        this.gridHeight = options.gridHeight || 5;
        this.prizeGrid = [];
        this.clawPosition = { x: 0, y: 0 };
        this.energy = options.energy || 5;
        this.score = 0;
        this.isRunning = false;
        this.streak = 0;
        this.activeTimer = null;
    }

    initialize() {
        this.prizeGrid = this.generatePrizeGrid();
        this.clawPosition = { x: Math.floor(this.gridWidth / 2), y: 0 };
        this.energy = Math.max(this.energy, 1);
        this.score = 0;
        this.streak = 0;
        this.isRunning = true;
        this.startCountdown();

        return {
            success: true,
            grid: this.prizeGrid,
            position: this.clawPosition
        };
    }

    generatePrizeGrid() {
        const rarityTable = ['common', 'common', 'common', 'rare', 'legendary'];
        const grid = [];

        for (let y = 0; y < this.gridHeight; y++) {
            const row = [];
            for (let x = 0; x < this.gridWidth; x++) {
                const rarity = rarityTable[Math.floor(Math.random() * rarityTable.length)];
                row.push({ rarity, collected: false, value: this.getValueForRarity(rarity) });
            }
            grid.push(row);
        }

        return grid;
    }

    getValueForRarity(rarity) {
        switch (rarity) {
            case 'legendary':
                return 250;
            case 'rare':
                return 100;
            default:
                return 25;
        }
    }

    moveClaw(direction) {
        if (!this.isRunning || this.energy <= 0) {
            return { success: false, message: 'Claw inactive.' };
        }

        const moves = {
            left: () => { if (this.clawPosition.x > 0) this.clawPosition.x -= 1; },
            right: () => { if (this.clawPosition.x < this.gridWidth - 1) this.clawPosition.x += 1; },
            down: () => { if (this.clawPosition.y < this.gridHeight - 1) this.clawPosition.y += 1; },
            up: () => { if (this.clawPosition.y > 0) this.clawPosition.y -= 1; }
        };

        const action = moves[direction];
        if (action) {
            action();
            return { success: true, position: { ...this.clawPosition } };
        }

        return { success: false, message: 'Invalid move.' };
    }

    dropClaw() {
        if (!this.isRunning || this.energy <= 0) {
            return { success: false, message: 'Claw cannot drop right now.' };
        }

        this.energy -= 1;
        const prize = this.pickPrize(this.clawPosition.x, this.clawPosition.y);

        if (prize) {
            this.score += prize.value;
            this.streak += 1;
            this.handleStreakBonus();
            return { success: true, prize, energy: this.energy, score: this.score };
        }

        this.streak = 0;
        return { success: false, message: 'Claw missed!', energy: this.energy };
    }

    pickPrize(x, y) {
        const target = this.prizeGrid?.[y]?.[x];
        if (!target || target.collected) {
            return null;
        }

        target.collected = true;
        return { rarity: target.rarity, value: target.value };
    }

    handleStreakBonus() {
        if (this.streak > 0 && this.streak % 3 === 0) {
            this.score += 75;
        }
    }

    startCountdown(durationSeconds = 60) {
        let remaining = durationSeconds;
        clearInterval(this.activeTimer);
        this.activeTimer = setInterval(() => {
            remaining -= 1;
            if (remaining <= 0 || this.energy <= 0) {
                this.endRound();
            }
        }, 1000);
    }

    endRound() {
        this.isRunning = false;
        clearInterval(this.activeTimer);
    }

    getState() {
        return {
            position: { ...this.clawPosition },
            energy: this.energy,
            score: this.score,
            streak: this.streak,
            grid: this.prizeGrid,
            isRunning: this.isRunning
        };
    }
}

module.exports = PimpireClaw;