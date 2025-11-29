/**
 * Game: High or Low
 * Card game—guess if next card will be higher or lower than current!
 * Features: Card dealing, guess logic, streaks, scoring, animations, real-time updates.
 */

class HighOrLow {
    constructor() {
        this.deck = this.generateDeck();
        this.currentCard = null;
        this.score = 0;
        this.streak = 0;
        this.isRunning = false;
        this.gameInterval = null;

        // TODO: Set up UI for deck, current card, controls, score
    }

    startGame() {
        this.deck = this.generateDeck();
        this.currentCard = this.drawCard();
        this.score = 0;
        this.streak = 0;
        this.isRunning = true;
        this.runGameLoop();
        // TODO: Render initial card, enable guess controls
    }

    generateDeck() {
        const suits = ['H','D','C','S'];
        const ranks = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
        let deck = [];
        for (const suit of suits) {
            for (const rank of ranks) {
                deck.push({ rank, suit });
            }
        }
        // Shuffle
        for (let i = deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    drawCard() {
        return this.deck.pop();
    }

    makeGuess(guess) {
        if (!this.isRunning) return;
        const nextCard = this.drawCard();
        this.revealCardAnimation(nextCard);
        let currentValue = this.cardValue(this.currentCard);
        let nextValue = this.cardValue(nextCard);
        let correct = (guess === "high" && nextValue > currentValue) || (guess === "low" && nextValue < currentValue);
        if (correct) {
            this.score += 10;
            this.streak += 1;
            this.showCorrectGuessEffect();
            if (this.streak % 3 === 0) this.showStreakBonus(this.streak);
        } else {
            this.streak = 0;
        }
        this.currentCard = nextCard;
        if (this.deck.length === 0) this.endGame();
    }

    cardValue(card) {
        if (typeof card.rank === 'number') return card.rank;
        if ('JQK'.includes(card.rank)) return 10;
        if (card.rank === 'A') return 11;
        return 0;
    }

    // ==== Real-time Game Loop Stub ====
    runGameLoop() {
        this.gameInterval = setInterval(() => {
            // TODO: Update UI, animate current card, effects
        }, 70);
    }

    endGame() {
        this.isRunning = false;
        clearInterval(this.gameInterval);
        // TODO: Show results, option to restart
    }

    // ==== Animation & UI Stubs ====
    revealCardAnimation(card) {
        // TODO: Animate next card reveal (flip/slip)
    }
    showCorrectGuessEffect() {
        // TODO: Sparkle or happy animation for correct guess
    }
    showStreakBonus(streak) {
        // TODO: Streak bonus animation (flash, confetti)
    }
}