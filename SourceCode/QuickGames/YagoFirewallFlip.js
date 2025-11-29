/**
 * Game: Yago Firewall Flip
 * Quick reflex game—flip firewalls before time runs out.
 * Features: Grid of firewalls, flip action, timing, difficulty, scoring, real-time updates, animations.
 */

'use strict';

class YagoFirewallFlip {
    constructor() {
        // === Game State Properties ===
        this.gridRows = 5;
        this.gridCols = 6;
        this.firewalls = []; // 2D array
        this.timeLimit = 30; // seconds
        this.remainingTime = this.timeLimit;
        this.score = 0;
        this.isRunning = false;
        this.gameInterval = null;
        this.flippedCount = 0;
        this.timerInterval = null;

        // TODO: Set up UI for timer, score, grid display
    }

    // ==== Core Methods ====
    startGame() {
        this.score = 0;
        this.flippedCount = 0;
        this.firewalls = this.generateGrid();
        this.remainingTime = this.timeLimit;
        this.isRunning = true;
        this.runGameLoop();
        this.startTimer();

        // TODO: Render grid and start UI
    }

    generateGrid() {
        // Creates a grid of firewall tiles, all unflipped
        const grid = [];
        for (let r = 0; r < this.gridRows; r++) {
            const row = [];
            for (let c = 0; c < this.gridCols; c++) {
                row.push(new FirewallTile(r, c));
            }
            grid.push(row);
        }
        return grid;
    }

    flipFirewall(row, col) {
        if (!this.isRunning || this.remainingTime <= 0) return;
        const tile = this.firewalls[row][col];
        if (tile && !tile.flipped) {
            tile.flipped = true;
            this.flippedCount += 1;
            this.score += tile.value;
            this.playFlipAnimation(tile);
            this.showSuccessEffect();

            // TODO: Check for completion, show feedback
        }
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.remainingTime -= 1;
            if (this.remainingTime <= 5) this.showTimerWarning();
            if (this.remainingTime <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    // ==== Real-time Game Loop Stub ====
    runGameLoop() {
        this.gameInterval = setInterval(() => {
            // TODO: Update UI, handle in-progress animations
        }, 50);
    }

    endGame() {
        this.isRunning = false;
        clearInterval(this.timerInterval);
        clearInterval(this.gameInterval);
        this.showEndScreen();
        // TODO: Show results and restart button
    }

    // ==== Animation & UI Stubs ====
    playFlipAnimation(tile) {
        // TODO: Flip animation for a firewall tile
    }

    showTimerWarning() {
        // TODO: Flash or animate UI when time is running out
    }

    showSuccessEffect() {
        // TODO: Animation when a tile is successfully flipped
    }

    showEndScreen() {
        // TODO: Game over results/animation
    }
}

// Helper class for firewall tiles
class FirewallTile {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.flipped = false;
        this.value = Math.floor(Math.random() * 10 + 1); // Points for tile
        // TODO: Add image/sprite reference for custom UI
    }
}

module.exports = YagoFirewallFlip;