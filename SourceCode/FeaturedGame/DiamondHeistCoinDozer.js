/**
 * Game: Diamond Heist Coin Dozer
 * Push coins, scoop diamonds, trigger heists for big rewards!
 * Features: Physics for coins, diamond prizes, heist triggers, jackpot, real-time updates, animations.
 */

'use strict';

class DiamondHeistCoinDozer {
    constructor(options = {}) {
        this.width = options.width || 100;
        this.height = options.height || 100;
        this.dropThreshold = options.dropThreshold || 95;
        this.coinValue = options.coinValue || 1;
        this.diamondBaseValue = options.diamondValue || 100;

        this.coinTable = [];
        this.diamondTable = [];
        this.dropHistory = [];
        this.jackpot = false;
        this.score = 0;
        this.isRunning = false;
        this.gameInterval = null;
        this.tickRateMs = options.tickRateMs || 80;
    }

    startGame() {
        this.coinTable = this.generateCoins(50);
        this.diamondTable = this.generateDiamonds(5);
        this.dropHistory = [];
        this.jackpot = false;
        this.score = 0;
        this.isRunning = true;
        this.startLoop();
        return this.getState();
    }

    stopGame() {
        this.isRunning = false;
        this.stopLoop();
        return this.getState();
    }

    generateCoins(count) {
        const coins = [];
        for (let i = 0; i < count; i += 1) {
            coins.push({
                id: `coin-${Date.now()}-${i}`,
                x: Math.random() * this.width,
                y: Math.random() * (this.height * 0.8),
                value: this.coinValue
            });
        }
        return coins;
    }

    generateDiamonds(count) {
        const gems = [];
        for (let i = 0; i < count; i += 1) {
            gems.push({
                id: `diamond-${Date.now()}-${i}`,
                x: Math.random() * this.width,
                y: Math.random() * (this.height * 0.7),
                value: this.diamondBaseValue
            });
        }
        return gems;
    }

    pushCoin(lane = 0) {
        if (!this.isRunning) {
            return { success: false, reason: 'Game is not running.' };
        }

        const laneWidth = this.width / 5;
        const constrainedLane = Math.max(0, Math.min(4, lane));
        const xPosition = constrainedLane * laneWidth + laneWidth / 2;
        const newCoin = {
            id: `coin-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            x: xPosition,
            y: 0,
            value: this.coinValue
        };

        this.coinTable.push(newCoin);
        this.animateCoinPush(newCoin);
        this.simulateStep();
        return {
            success: true,
            coin: newCoin,
            state: this.getState()
        };
    }

    simulateStep() {
        this.advanceCoins(this.coinTable, 2.5);
        this.advanceCoins(this.diamondTable, 1.2);
        const drops = this.collectDrops();
        if (drops.diamondsCollected.length > 0) {
            this.jackpot = true;
            drops.diamondsCollected.forEach((gem) => this.animateDiamondCatch(gem));
        }
        if (this.jackpot && drops.diamondsCollected.length > 0) {
            this.triggerHeistAnimation();
        }
        this.dropHistory.push(drops);
        return drops;
    }

    advanceCoins(table, deltaY) {
        for (const item of table) {
            item.y += deltaY;
            if (item.y > this.height) {
                item.y = this.height;
            }
        }
    }

    collectDrops() {
        const coinsCollected = [];
        const diamondsCollected = [];

        this.coinTable = this.coinTable.filter((coin) => {
            if (coin.y >= this.dropThreshold) {
                coinsCollected.push(coin);
                this.score += coin.value;
                return false;
            }
            return true;
        });

        this.diamondTable = this.diamondTable.filter((gem) => {
            if (gem.y >= this.dropThreshold) {
                diamondsCollected.push(gem);
                this.score += gem.value;
                return false;
            }
            return true;
        });

        return {
            coinsCollected,
            diamondsCollected
        };
    }

    startLoop() {
        this.stopLoop();
        this.gameInterval = setInterval(() => {
            if (!this.isRunning) {
                this.stopLoop();
                return;
            }

            this.simulateStep();
        }, this.tickRateMs);
    }

    stopLoop() {
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
        }
    }

    endGame() {
        const finalState = this.stopGame();
        if (this.jackpot) {
            this.showJackpotWin();
        }
        return finalState;
    }

    getState() {
        return {
            coins: this.coinTable.map((coin) => ({ ...coin })),
            diamonds: this.diamondTable.map((gem) => ({ ...gem })),
            score: this.score,
            jackpot: this.jackpot,
            isRunning: this.isRunning,
            drops: this.dropHistory.slice(-5)
        };
    }

    dispose() {
        this.stopLoop();
    }

    // ==== Animation hooks ==== 
    animateCoinPush(coin) {
        return coin;
    }

    animateDiamondCatch(gem) {
        return gem;
    }

    triggerHeistAnimation() {
        this.jackpot = false;
    }

    showJackpotWin() {
        return {
            score: this.score,
            diamondsRemaining: this.diamondTable.length
        };
    }
}

module.exports = DiamondHeistCoinDozer;