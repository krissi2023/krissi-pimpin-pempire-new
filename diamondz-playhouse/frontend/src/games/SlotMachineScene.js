import Phaser from 'phaser';

/**
 * Basic Slot Machine Game using Phaser 3
 * This is a starter template for themed slot games
 */
class SlotMachineScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SlotMachineScene' });
    this.reels = [];
    this.spinning = false;
    this.balance = 500; // Gold points
    this.bet = 10;
  }

  preload() {
    // TODO: Load your actual slot symbols
    // this.load.image('diamond', '/assets/symbols/diamond.png');
    // this.load.image('seven', '/assets/symbols/seven.png');
    // this.load.image('crown', '/assets/symbols/crown.png');
  }

  create() {
    // Background
    this.add.rectangle(400, 300, 800, 600, 0x1a1a2e);

    // Title
    const title = this.add.text(400, 50, '💎 Diamond Rise Slots', {
      fontSize: '36px',
      fill: '#FFD700',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);

    // Create 5 reels
    this.createReels();

    // UI Elements
    this.createUI();

    // Spin button
    this.createSpinButton();
  }

  createReels() {
    const symbols = ['💎', '7️⃣', '👑', '💰', '⭐'];
    const reelWidth = 100;
    const reelHeight = 300;
    const startX = 150;
    const startY = 200;

    for (let i = 0; i < 5; i++) {
      const reel = {
        x: startX + (i * (reelWidth + 20)),
        y: startY,
        symbols: [],
        currentIndex: 0
      };

      // Create 3 visible symbols per reel
      for (let j = 0; j < 3; j++) {
        const symbol = symbols[Phaser.Math.Between(0, symbols.length - 1)];
        const text = this.add.text(
          reel.x,
          reel.y + (j * 100),
          symbol,
          { fontSize: '64px' }
        );
        text.setOrigin(0.5);
        reel.symbols.push(text);
      }

      // Reel border
      const border = this.add.rectangle(
        reel.x,
        startY + 100,
        reelWidth,
        reelHeight,
        0x16213e,
        0
      );
      border.setStrokeStyle(3, 0x00d4ff);

      this.reels.push(reel);
    }
  }

  createUI() {
    // Balance display
    this.balanceText = this.add.text(50, 520, `Balance: ${this.balance} 🪙`, {
      fontSize: '24px',
      fill: '#FFD700'
    });

    // Bet display
    this.betText = this.add.text(50, 550, `Bet: ${this.bet} 🪙`, {
      fontSize: '20px',
      fill: '#fff'
    });

    // Win display
    this.winText = this.add.text(400, 520, '', {
      fontSize: '32px',
      fill: '#00ff00',
      fontStyle: 'bold'
    });
    this.winText.setOrigin(0.5);

    // Bet controls
    this.createBetControls();
  }

  createBetControls() {
    // Decrease bet button
    const decreaseBtn = this.add.text(250, 550, '[-]', {
      fontSize: '24px',
      fill: '#fff',
      backgroundColor: '#0f3460',
      padding: { x: 10, y: 5 }
    });
    decreaseBtn.setInteractive();
    decreaseBtn.on('pointerdown', () => this.changeBet(-10));

    // Increase bet button
    const increaseBtn = this.add.text(320, 550, '[+]', {
      fontSize: '24px',
      fill: '#fff',
      backgroundColor: '#0f3460',
      padding: { x: 10, y: 5 }
    });
    increaseBtn.setInteractive();
    increaseBtn.on('pointerdown', () => this.changeBet(10));
  }

  createSpinButton() {
    const button = this.add.text(600, 520, 'SPIN', {
      fontSize: '32px',
      fill: '#000',
      backgroundColor: '#FFD700',
      padding: { x: 30, y: 15 },
      fontStyle: 'bold'
    });
    button.setOrigin(0.5);
    button.setInteractive();

    button.on('pointerdown', () => this.spin());
    button.on('pointerover', () => {
      button.setBackgroundColor('#00d4ff');
    });
    button.on('pointerout', () => {
      button.setBackgroundColor('#FFD700');
    });

    this.spinButton = button;
  }

  changeBet(amount) {
    const newBet = this.bet + amount;
    if (newBet >= 10 && newBet <= 100 && newBet <= this.balance) {
      this.bet = newBet;
      this.betText.setText(`Bet: ${this.bet} 🪙`);
    }
  }

  spin() {
    if (this.spinning || this.balance < this.bet) {
      return;
    }

    this.spinning = true;
    this.balance -= this.bet;
    this.balanceText.setText(`Balance: ${this.balance} 🪙`);
    this.winText.setText('');

    const symbols = ['💎', '7️⃣', '👑', '💰', '⭐'];

    // Animate each reel
    this.reels.forEach((reel, index) => {
      const delay = index * 100;
      const duration = 1000 + (index * 200);

      // Spin animation
      this.tweens.add({
        targets: reel.symbols,
        y: '+=300',
        duration: duration,
        ease: 'Cubic.easeInOut',
        delay: delay,
        onComplete: () => {
          // Reset positions and change symbols
          reel.symbols.forEach((symbolText, i) => {
            symbolText.y = reel.y + (i * 100);
            const newSymbol = symbols[Phaser.Math.Between(0, symbols.length - 1)];
            symbolText.setText(newSymbol);
          });

          // Check if all reels stopped
          if (index === this.reels.length - 1) {
            this.checkWin();
          }
        }
      });
    });
  }

  checkWin() {
    // Simple win check: middle row
    const middleSymbols = this.reels.map(reel => reel.symbols[1].text);
    
    // Check for 3, 4, or 5 matching symbols
    const symbolCounts = {};
    middleSymbols.forEach(symbol => {
      symbolCounts[symbol] = (symbolCounts[symbol] || 0) + 1;
    });

    let maxMatch = Math.max(...Object.values(symbolCounts));
    let winAmount = 0;

    if (maxMatch >= 3) {
      // Payout table
      const payouts = {
        3: this.bet * 3,
        4: this.bet * 10,
        5: this.bet * 50
      };

      winAmount = payouts[maxMatch] || 0;
      
      // Special bonus for diamonds
      if (Object.keys(symbolCounts).includes('💎') && symbolCounts['💎'] === maxMatch) {
        winAmount *= 2;
      }

      this.balance += winAmount;
      this.balanceText.setText(`Balance: ${this.balance} 🪙`);
      this.winText.setText(`🎉 WIN: ${winAmount} 🪙`);

      // Win animation
      this.tweens.add({
        targets: this.winText,
        scale: 1.5,
        duration: 500,
        yoyo: true
      });
    }

    this.spinning = false;

    // TODO: Send spin result to backend
    // this.sendSpinResult(middleSymbols, winAmount);
  }

  async sendSpinResult(symbols, winAmount) {
    // Example API call
    /*
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/arcade/spin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameId: 'diamond-rise',
          userId: 'user_123',
          betAmount: this.bet,
          symbols,
          winAmount
        })
      });
    } catch (error) {
      console.error('Error sending spin result:', error);
    }
    */
  }
}

export default SlotMachineScene;
