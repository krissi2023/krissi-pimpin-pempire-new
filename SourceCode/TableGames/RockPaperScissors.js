/**
 * Game: Rock Paper Scissors
 * Classic quick game—play vs. computer, first to reach score wins!
 * Features: Player/computer moves, random logic, scoring, animations, UI updates.
 */

class RockPaperScissors {
    constructor() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.rounds = 0;
        this.isRunning = false;
        this.lastPlayerMove = null;
        this.lastComputerMove = null;
        this.resultText = '';
        this.gameInterval = null;
        this.winScore = 5; // First to 5 wins

        // TODO: Setup UI for moves, scores, feedback
    }

    // ==== Core Methods ====
    startGame() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.rounds = 0;
        this.isRunning = true;
        this.resultText = '';
        this.runGameLoop();
        // TODO: Render move buttons, scores
    }

    playerMove(move) {
        if (!this.isRunning) return;
        this.lastPlayerMove = move;
        this.lastComputerMove = this.computerRandomMove();
        this.evaluateRound();
        this.rounds += 1;
        this.playMoveAnimation(move, this.lastComputerMove);
        if (this.playerScore >= this.winScore || this.computerScore >= this.winScore) {
            this.endGame();
        }
    }

    computerRandomMove() {
        const moves = ['rock', 'paper', 'scissors'];
        return moves[Math.floor(Math.random() * moves.length)];
    }

    evaluateRound() {
        const player = this.lastPlayerMove;
        const computer = this.lastComputerMove;
        if (player === computer) {
            this.resultText = 'Draw!';
        } else if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')
        ) {
            this.playerScore += 1;
            this.resultText = 'You win!';
            this.showWinEffect();
        } else {
            this.computerScore += 1;
            this.resultText = 'Computer wins!';
            this.showLossEffect();
        }
        this.showScoreEffect();
        // TODO: Update UI with result
    }

    // ==== Real-time Game Loop Stub ====
    runGameLoop() {
        this.gameInterval = setInterval(() => {
            // TODO: Animate score changes, button effects, etc.
        }, 80);
    }

    endGame() {
        this.isRunning = false;
        clearInterval(this.gameInterval);
        this.showEndScreen();
        // TODO: Show victory/lose and restart option
    }

    // ==== Animation & UI Stubs ====
    playMoveAnimation(playerMove, computerMove) {
        // TODO: Animate choices being thrown/selected (shake, highlight, etc)
    }
    showWinEffect() {
        // TODO: Sparkle or celebration for win
    }
    showLossEffect() {
        // TODO: Sad face/sound for loss
    }
    showScoreEffect() {
        // TODO: Flash score, number animation
    }
    showEndScreen() {
        // TODO: End game victory/lose animation
    }
}