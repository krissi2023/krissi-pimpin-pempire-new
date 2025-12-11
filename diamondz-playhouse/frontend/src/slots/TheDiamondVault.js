/**
 * The Diamond Vault
 * 4-Reel, 4-Row, 40-Payline Slot Machine
 * High Volatility
 */

class TheDiamondVault {
    constructor(initialBalance = 1000) {
        this.name = "The Diamond Vault";
        this.type = 'SlotGame';
        this.reels = 4;
        this.rows = 4;
        this.paylinesCount = 40;
        this.symbols = [
            '💎', // WILD: Locked Diamond
            '🗝️', // SCATTER: Vault Key
            '7️⃣', // HP1: Triple 7s
            '🧈', // HP2: Bar of Gold
            '💠', // MP1: Single Diamond
            '📎', // MP2: Money Clip
            '⏸️', // LP1: Double BARs
            '🅰️', // LP2: Crown 'A'
            '🇰', // LP3: Crown 'K'
            '🇶'  // LP4: Crown 'Q'
        ];
        
        this.currentBet = 40; // 1 per line
        this.balance = initialBalance;
        this.lastSpin = null;
        this.lockedWilds = []; // Track positions of locked wilds
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

        // Decrement locked wilds duration
        this.lockedWilds = this.lockedWilds
            .map(w => ({ ...w, duration: w.duration - 1 }))
            .filter(w => w.duration > 0);

        // Generate 4x4 grid (16 symbols)
        const grid = new Array(16).fill(null);

        // Place locked wilds first
        this.lockedWilds.forEach(w => {
            grid[w.index] = '💎';
        });

        // Fill rest
        for (let i = 0; i < 16; i++) {
            if (!grid[i]) {
                grid[i] = this.symbols[Math.floor(Math.random() * this.symbols.length)];
                
                // If new wild lands, lock it
                if (grid[i] === '💎') {
                    this.lockedWilds.push({ index: i, duration: 2 });
                }
            }
        }

        // Check wins
        const wins = this.checkWins(grid);
        const totalWin = wins.reduce((sum, win) => sum + win.payout, 0);
        
        this.balance += totalWin;

        // Check for Vault Bonus (3+ Keys)
        const keyCount = grid.filter(s => s === '🗝️').length;
        const bonusTriggered = keyCount >= 3;

        this.lastSpin = {
            grid,
            wins,
            totalWin,
            bonusTriggered,
            newBalance: this.balance
        };

        return {
            success: true,
            grid,
            wins,
            totalWin,
            bonusTriggered,
            balance: this.balance,
            bet: this.currentBet
        };
    }

    checkWins(grid) {
        const wins = [];
        const betPerLine = this.currentBet / this.paylinesCount;

        // Paytable
        const paytable = {
            '💎': { 4: 1000, 3: 200 }, // Wild
            '7️⃣': { 4: 500, 3: 100 },  // 7s
            '🧈': { 4: 400, 3: 80 },   // Gold Bar
            '💠': { 4: 300, 3: 60 },   // Diamond
            '📎': { 4: 200, 3: 40 },   // Clip
            '⏸️': { 4: 150, 3: 30 },   // Double Bar
            '🅰️': { 4: 100, 3: 20 },
            '🇰': { 4: 80, 3: 15 },
            '🇶': { 4: 50, 3: 10 }
        };

        // Simple horizontal lines for demo (Rows 1-4)
        // In real app, define all 40 lines
        const lines = [
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [8, 9, 10, 11],
            [12, 13, 14, 15],
            [0, 5, 10, 15], // Diagonal
            [3, 6, 9, 12]   // Diagonal
        ];

        lines.forEach((line, index) => {
            const lineSymbols = line.map(idx => grid[idx]);
            let matchCount = 1;
            let symbol = lineSymbols[0];
            let isWild = symbol === '💎';

            for (let i = 1; i < lineSymbols.length; i++) {
                const nextSymbol = lineSymbols[i];
                if (nextSymbol === symbol || nextSymbol === '💎' || isWild) {
                    matchCount++;
                    if (isWild && nextSymbol !== '💎') {
                        symbol = nextSymbol;
                        isWild = false;
                    }
                } else {
                    break;
                }
            }

            if (matchCount >= 3 && paytable[symbol]) {
                const payout = (paytable[symbol][matchCount] || 0) * betPerLine;
                if (payout > 0) {
                    wins.push({
                        payline: index + 1,
                        symbols: lineSymbols.slice(0, matchCount),
                        payout: Math.floor(payout)
                    });
                }
            }
        });

        return wins;
    }
}

// Export as ESM default so `import TheDiamondVault from './TheDiamondVault'` works
export default TheDiamondVault;
