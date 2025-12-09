/**
 * Pimpin' Power Diamonds
 * 5-Reel, 3-Row, 25-Payline Slot Machine
 */

class PimpinPowerDiamonds {
    constructor(initialBalance = 1000) {
        this.name = "Pimpin' Power Diamonds";
        this.type = 'SlotGame';
        this.reels = 5;
        this.rows = 3;
        this.paylinesCount = 25;
        this.symbols = [
            '💎', // WILD: Pimpin' Power Diamond
            '💲', // SCATTER: Gold Chain
            '🐐', // HP1: Yagi
            '💵', // HP2: Stacks of Cash
            '💍', // HP3: Pink Diamond Ring
            '👞', // MP1: Pink Heels
            '🤵', // MP2: Pimpin Paul
            '🅰️', // LP1: Crown 'A'
            '🇰', // LP2: 'K'
            '🇶', // LP3: 'Q'
            '🇯'  // LP4: 'J'
        ];
        
        // Simplified paylines (just a few examples for now)
        this.paylines = [
            [0, 1, 2, 3, 4],       // Row 1
            [5, 6, 7, 8, 9],       // Row 2
            [10, 11, 12, 13, 14],  // Row 3
            [0, 6, 12, 8, 4],      // V shape
            [10, 6, 2, 8, 14]      // Inverted V
            // ... would add all 25 in production
        ];

        this.currentBet = 25; // 1 per line
        this.balance = initialBalance;
        this.lastSpin = null;
    }

    initialize() {
        return {
            game: this.name,
            balance: this.balance,
            symbols: this.symbols,
            paylines: this.paylinesCount
        };
    }

    setBet(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.currentBet = amount;
            return { success: true, bet: this.currentBet };
        }
        return { success: false, error: 'Invalid bet amount' };
    }

    spin() {
        if (this.currentBet > this.balance) {
            return { success: false, error: 'Insufficient balance' };
        }

        this.balance -= this.currentBet;

        // Generate 5x3 grid (15 symbols)
        const grid = [];
        for (let i = 0; i < 15; i++) {
            grid.push(this.symbols[Math.floor(Math.random() * this.symbols.length)]);
        }

        // Check wins (Simplified check)
        const wins = this.checkWins(grid);
        const totalWin = wins.reduce((sum, win) => sum + win.payout, 0);
        
        this.balance += totalWin;

        // Check for Free Spins (3+ Scatters)
        const scatterCount = grid.filter(s => s === '💲').length;
        const freeSpinsWon = scatterCount >= 3 ? (scatterCount === 3 ? 10 : scatterCount === 4 ? 15 : 25) : 0;

        this.lastSpin = {
            grid,
            wins,
            totalWin,
            freeSpinsWon,
            newBalance: this.balance
        };

        return {
            success: true,
            grid,
            wins,
            totalWin,
            freeSpinsWon,
            balance: this.balance,
            bet: this.currentBet
        };
    }

    checkWins(grid) {
        const wins = [];
        // Mock win logic for demonstration
        // In a real implementation, we'd check every payline against the grid
        
        // Randomly award a win for demo purposes if no logic matches
        if (Math.random() > 0.7) {
            wins.push({
                payline: 1,
                symbols: ['💎', '💎', '💎'],
                payout: this.currentBet * 2
            });
        }
        return wins;
    }
}

module.exports = PimpinPowerDiamonds;
