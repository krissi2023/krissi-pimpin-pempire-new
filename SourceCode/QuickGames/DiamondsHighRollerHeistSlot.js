/**
 * Diamond's High Roller Heist Slot Machine.
 * High volatility three-reel slot with five paylines and progressive-style wins.
 */

'use strict';

class DiamondsHighRollerHeistSlot {
    constructor(initialCredits) {
        this.playerCredits = initialCredits; // Credit balance
        this.currentBet = 10;                // Default bet
        this.reelStructure = [3, 3];         // 3 reels, 3 rows
        this.totalWinnings = 0;

        // Symbol definitions: payout multipliers for 3-match
        this.symbols = {
            WILD: { name: 'Eye of the Pempire', multiplier: 100, value: 'WILD' },       // Jackpot
            GoldBar: { name: 'Gold Bar', multiplier: 50, value: 'GoldBar' },            // High
            CashStack: { name: 'Cash Stack', multiplier: 25, value: 'CashStack' },      // High-medium
            Cufflink: { name: 'Cufflink', multiplier: 10, value: 'Cufflink' },          // Medium
            BadCheck: { name: 'Bad Check', multiplier: 5, value: 'BadCheck' },          // Low
            Diamond: { name: 'Single Diamond', multiplier: 3, value: 'Diamond' },       // Low
        };

        // Each reel: symbol pool; rarer symbols have less frequency in a real slot, but for now equal weight
        this.reelSymbols = [
            ['WILD', 'GoldBar', 'CashStack', 'Cufflink', 'BadCheck', 'Diamond'],
            ['WILD', 'GoldBar', 'CashStack', 'Cufflink', 'BadCheck', 'Diamond'],
            ['WILD', 'GoldBar', 'CashStack', 'Cufflink', 'BadCheck', 'Diamond']
        ];

        // Paylines: Top, Middle, Bottom, Diagonal (\ and /)
        // [ [reel,col],[reel,col],[reel,col] ] for each of the 5 lines
        this.paylines = [
            [ [0,0], [1,0], [2,0] ], // Top Row
            [ [0,1], [1,1], [2,1] ], // Middle Row
            [ [0,2], [1,2], [2,2] ], // Bottom Row
            [ [0,0], [1,1], [2,2] ], // Diagonal TL-BR
            [ [0,2], [1,1], [2,0] ], // Diagonal BL-TR
        ];
    }

    setBet(newBet) {
        if (typeof newBet === 'number' && newBet > 0 && newBet <= this.playerCredits) {
            this.currentBet = newBet;
        }
    }

    spin() {
        if (this.playerCredits < this.currentBet) {
            return { error: 'Insufficient funds.' };
        }
        this.playerCredits -= this.currentBet;

        const finalReels = this.generateSpinResult();
        const payout = this.calculateWinnings(finalReels);
        this.playerCredits += payout.totalWinnings;
        this.totalWinnings += payout.totalWinnings;

        this.animateSpin(finalReels, payout);

        return {
            reels: finalReels,
            payout: payout,
            newCredits: this.playerCredits
        };
    }

    generateSpinResult() {
        // For a real slot, use rare symbol weighting. Here: random pick.
        const reels = [];
        for (let reel = 0; reel < this.reelStructure[0]; reel++) {
            let column = [];
            for (let row = 0; row < this.reelStructure[1]; row++) {
                const symbolsPool = this.reelSymbols[reel];
                const symbol = symbolsPool[Math.floor(Math.random() * symbolsPool.length)];
                column.push(symbol);
            }
            reels.push(column); // reels[reel][row]
        }
        return reels;
    }

    calculateWinnings(finalReels) {
        let totalWinnings = 0;
        let winningLines = [];

        for (let i = 0; i < this.paylines.length; i++) {
            const line = this.paylines[i];
            const lineSymbols = line.map(([reel, row]) => finalReels[reel][row]);
            const allSame = lineSymbols.every(sym => sym === lineSymbols[0]);
            if (allSame) {
                const symbolObj = this.symbols[lineSymbols[0]];
                if (symbolObj) {
                    const win = this.currentBet * symbolObj.multiplier;
                    totalWinnings += win;
                    winningLines.push({ line: i+1, symbol: symbolObj.value, win });
                }
            }
        }

        return { totalWinnings, winningLines };
    }

    // ==== Animation & UI stubs ====
    animateSpin(finalReels, payout) {
        // TODO: Animate reels spinning, highlight winning lines, play sound
        if (payout.totalWinnings > 0) {
            console.log('Big win! Total payout:', payout.totalWinnings, 'on lines:', payout.winningLines);
        } else {
            console.log('No win this spin.');
        }
    }
}

module.exports = DiamondsHighRollerHeistSlot;