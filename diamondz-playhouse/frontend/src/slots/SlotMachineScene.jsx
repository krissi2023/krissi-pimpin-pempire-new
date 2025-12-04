import Phaser from 'phaser';
import ClassicSlots from './ClassicSlots';
import PimpinPowerDiamonds from './PimpinPowerDiamonds';
import TheDiamondVault from './TheDiamondVault';

/**
 * Basic Slot Machine Game using Phaser 3
 * This is a starter template for themed slot games
 */
class SlotMachineScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SlotMachineScene' });
    this.reels = [];
    this.spinning = false;
    this.gameLogic = null;
  }

  init(data) {
    // Initialize game logic based on game ID
    const gameId = data.config?.id;
    const balance = data.balance || 1000;

    if (gameId === 'pimpin-power-diamonds') {
        this.gameLogic = new PimpinPowerDiamonds(balance);
    } else if (gameId === 'the-diamond-vault') {
        this.gameLogic = new TheDiamondVault(balance);
    } else {
        this.gameLogic = new ClassicSlots(balance);
    }
    
    this.bet = this.gameLogic.currentBet;
  }

  preload() {
    // Load slot symbols from the assets folder
    // User should place images in public/assets/games/slots/symbols/
    this.load.image('cherry', '/assets/games/slots/symbols/cherry.png');
    this.load.image('lemon', '/assets/games/slots/symbols/lemon.png');
    this.load.image('orange', '/assets/games/slots/symbols/orange.png');
    this.load.image('bell', '/assets/games/slots/symbols/bell.png');
    this.load.image('star', '/assets/games/slots/symbols/star.png');
    this.load.image('diamond', '/assets/games/slots/symbols/diamond.png');
    this.load.image('seven', '/assets/games/slots/symbols/seven.png');
  }

  create() {
    // Symbol mapping
    this.symbolMap = {
      '🍒': 'cherry',
      '🍋': 'lemon',
      '🍊': 'orange',
      '🔔': 'bell',
      '⭐': 'star',
      '💎': 'diamond',
      '7️⃣': 'seven'
    };

    // Background
    this.add.rectangle(400, 300, 800, 600, 0x1a1a2e);

    // Title
    const title = this.add.text(400, 50, '💎 Diamond Rise Slots', {
      fontSize: '36px',
      fill: '#FFD700',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);

    // Create 3 reels (Classic Slots uses 3 reels)
    this.createReels();

    // UI Elements
    this.createUI();

    // Spin button
    this.createSpinButton();
  }

  createReels() {
    // Use symbols from game logic
    const symbols = this.gameLogic.symbols;
    const numReels = this.gameLogic.reels || 3;
    const numRows = this.gameLogic.rows || 3;
    
    // Dynamic layout calculation
    const reelWidth = 800 / (numReels + 1); // Distribute space
    const reelHeight = numRows * 100;
    const startX = (800 - (numReels * reelWidth)) / 2 + (reelWidth / 2);
    const startY = (600 - reelHeight) / 2;

    for (let i = 0; i < numReels; i++) {
      const reel = {
        x: startX + (i * reelWidth),
        y: startY,
        symbols: [],
        currentIndex: 0
      };

      // Create visible symbols per reel
      for (let j = 0; j < numRows; j++) {
        const symbol = symbols[Phaser.Math.Between(0, symbols.length - 1)];
        const symbolKey = this.symbolMap[symbol];
        
        let symbolObj;
        // Check if image exists, otherwise use text emoji
        if (this.textures.exists(symbolKey)) {
            symbolObj = this.add.image(reel.x, reel.y + (j * 100), symbolKey);
            symbolObj.setDisplaySize(80, 80);
        } else {
            symbolObj = this.add.text(
              reel.x,
              reel.y + (j * 100),
              symbol,
              { fontSize: '64px' }
            );
            symbolObj.setOrigin(0.5);
        }
        
        reel.symbols.push(symbolObj);
      }

      // Reel border
      const border = this.add.rectangle(
        reel.x,
        startY + (reelHeight / 2),
        reelWidth - 10,
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
    this.balanceText = this.add.text(50, 520, `Balance: ${this.gameLogic.balance} 🪙`, {
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
    const result = this.gameLogic.setBet(newBet);
    
    if (result.success) {
      this.bet = result.bet;
      this.betText.setText(`Bet: ${this.bet} 🪙`);
    }
  }

  spin() {
    if (this.spinning || this.gameLogic.balance < this.bet) {
      return;
    }

    // Execute spin logic
    const result = this.gameLogic.spin();
    if (!result.success) {
      console.error(result.error);
      return;
    }

    this.spinning = true;
    this.balanceText.setText(`Balance: ${result.balance} 🪙`);
    this.winText.setText('');

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
          // Reset positions and set final symbols from logic result
          // The grid is 1D array (Row-Major)
          const numReels = this.reels.length;
          
          reel.symbols.forEach((symbolObj, row) => {
            symbolObj.y = reel.y + (row * 100);
            
            // Calculate index in the grid
            // grid index = row * numReels + col (index)
            const gridIndex = (row * numReels) + index;
            const newSymbol = result.grid[gridIndex];
            const newSymbolKey = this.symbolMap[newSymbol];
            
            if (symbolObj.type === 'Image') {
                if (this.textures.exists(newSymbolKey)) {
                    symbolObj.setTexture(newSymbolKey);
                }
            } else {
                symbolObj.setText(newSymbol);
            }
          });

          // Check if all reels stopped
          if (index === this.reels.length - 1) {
            this.handleSpinComplete(result);
          }
        }
      });
    });
  }

  handleSpinComplete(result) {
    this.spinning = false;

    if (result.totalWin > 0) {
      this.winText.setText(`🎉 WIN: ${result.totalWin} 🪙`);
      
      // Win animation
      this.tweens.add({
        targets: this.winText,
        scale: 1.5,
        duration: 500,
        yoyo: true
      });
    }

    // TODO: Sync balance with backend
    // this.syncBalance(result.balance);
  }
}

export default SlotMachineScene;
