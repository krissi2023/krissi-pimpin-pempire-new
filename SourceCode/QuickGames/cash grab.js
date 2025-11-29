/**
 * Game: Cash Grab
 * Fast-paced clicker—grab cash before time runs out.
 * Features: Timer, cash piles, clicking, score, feedback, real-time updates, animations.
 */

class CashGrab {
    constructor() {
        // === Game State Properties ===
        this.timeLimit = 30; // seconds
        this.remainingTime = this.timeLimit;
        this.score = 0;
        this.cashPiles = []; // array of Cash objects
        this.isRunning = false;
        // Real-time update interval
        this.gameInterval = null;

        // TODO: Hook up UI elements for cash, timer, score display
    }

    // ==== Core Methods ====
    startGame() {
        this.remainingTime = this.timeLimit;
        this.score = 0;
        this.cashPiles = this.generateCashPiles();
        this.isRunning = true;
        this.startTimer();
        this.runGameLoop();

        // TODO: Render UI, start playable state
    }

    generateCashPiles() {
        const piles = [];
        for (let i = 0; i < 20; i++) {
            piles.push(new Cash(
                Math.floor(Math.random() * 800),
                Math.floor(Math.random() * 400),
                Math.floor(Math.random() * 9 + 1) * 10
            ));
        }
        return piles;
    }

    grabCash(cashId) {
        if (!this.isRunning || this.remainingTime <= 0) return;
        const pileIdx = this.cashPiles.findIndex(c => c.id === cashId);
        if (pileIdx !== -1) {
            this.score += this.cashPiles[pileIdx].value;
            this.playGrabAnimation(this.cashPiles[pileIdx]);
            this.showScoreEffect(this.cashPiles[pileIdx].value);
            this.cashPiles.splice(pileIdx, 1);
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
        // Called every 50ms for game real-time updates (animations, etc.)
        this.gameInterval = setInterval(() => {
            // TODO: Update cash pile animations, UI, handle effects
        }, 50);
    }

    endGame() {
        this.isRunning = false;
        clearInterval(this.timerInterval);
        clearInterval(this.gameInterval);
        this.showEndScreen();
        // TODO: Show results, option to restart
    }

    // ==== Animation & UI Stubs ====
    playGrabAnimation(cash) {
        // TODO: Animate cash pile being grabbed
    }

    showScoreEffect(amount) {
        // TODO: Animate score change
    }

    showTimerWarning() {
        // TODO: Animate when time is nearly up
    }

    showEndScreen() {
        // TODO: Display game over animation/results
    }
}

// Helper class for cash pile objects
let nextCashId = 1;
class Cash {
    constructor(x, y, value) {
        this.id = nextCashId++;
        this.x = x;
        this.y = y;
        this.value = value;
        // TODO: Add sprite/image reference for UI
    }
}