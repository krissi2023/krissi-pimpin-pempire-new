/**
 * Game: Blackjack
 * Classic casino table game where players aim to beat the dealer without busting.
 */

'use strict';

class Blackjack {
    constructor(options = {}) {
        this.name = 'Blackjack';
        this.type = 'CardGame';
        this.decksInShoe = options.decks || 6;
        this.minimumBet = options.minBet || 10;
        this.players = [];
        this.dealerHand = [];
        this.shoe = [];
        this.currentPlayerIndex = 0;
        this.isRoundActive = false;
    }

    initialize(playerCount = 1) {
        if (playerCount < 1) {
            throw new Error('Blackjack requires at least one player.');
        }

        this.players = Array.from({ length: playerCount }).map(() => ({
            hand: [],
            bet: this.minimumBet,
            standing: false,
            bust: false,
            balance: 1000
        }));

        this.buildShoe();
        this.shuffleShoe();
        this.startRound();

        return {
            success: true,
            message: `${this.name} initialized with ${playerCount} player(s).`
        };
    }

    buildShoe() {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        this.shoe = [];

        for (let deck = 0; deck < this.decksInShoe; deck++) {
            for (const suit of suits) {
                for (const rank of ranks) {
                    this.shoe.push({ rank, suit });
                }
            }
        }
    }

    shuffleShoe() {
        for (let i = this.shoe.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.shoe[i], this.shoe[j]] = [this.shoe[j], this.shoe[i]];
        }
    }

    drawCard() {
        if (this.shoe.length === 0) {
            this.buildShoe();
            this.shuffleShoe();
        }
        return this.shoe.pop();
    }

    startRound() {
        this.resetHands();
        this.dealInitialHands();
        this.isRoundActive = true;
        this.currentPlayerIndex = 0;
    }

    resetHands() {
        this.dealerHand = [];
        this.players.forEach(player => {
            player.hand = [];
            player.standing = false;
            player.bust = false;
        });
    }

    dealInitialHands() {
        for (let i = 0; i < 2; i++) {
            this.players.forEach(player => player.hand.push(this.drawCard()));
            this.dealerHand.push(this.drawCard());
        }
    }

    hit(playerIndex) {
        if (!this.isRoundActive || playerIndex !== this.currentPlayerIndex) {
            return { success: false, message: 'Not your turn to hit.' };
        }

        const player = this.players[playerIndex];
        player.hand.push(this.drawCard());

        if (this.calculateHandValue(player.hand) > 21) {
            player.bust = true;
            player.standing = true;
            this.advanceTurn();
            return { success: true, message: 'Player busts.' };
        }

        return { success: true, message: 'Card dealt.' };
    }

    stand(playerIndex) {
        if (!this.isRoundActive || playerIndex !== this.currentPlayerIndex) {
            return { success: false, message: 'Not your turn to stand.' };
        }

        this.players[playerIndex].standing = true;
        this.advanceTurn();
        return { success: true, message: 'Player stands.' };
    }

    advanceTurn() {
        const nextIndex = this.players.findIndex((player, idx) => idx > this.currentPlayerIndex && !player.standing);
        if (nextIndex !== -1) {
            this.currentPlayerIndex = nextIndex;
            return;
        }

        this.currentPlayerIndex = this.players.length; // indicates dealer turn
        this.resolveDealer();
    }

    resolveDealer() {
        while (this.calculateHandValue(this.dealerHand) < 17) {
            this.dealerHand.push(this.drawCard());
        }

        this.isRoundActive = false;
        return this.settleBets();
    }

    settleBets() {
        const dealerValue = this.calculateHandValue(this.dealerHand);
        const dealerBust = dealerValue > 21;

        return this.players.map(player => {
            const playerValue = this.calculateHandValue(player.hand);

            if (player.bust) {
                player.balance -= player.bet;
                return { outcome: 'lose', balance: player.balance };
            }

            if (dealerBust || playerValue > dealerValue) {
                player.balance += player.bet;
                return { outcome: 'win', balance: player.balance };
            }

            if (playerValue === dealerValue) {
                return { outcome: 'push', balance: player.balance };
            }

            player.balance -= player.bet;
            return { outcome: 'lose', balance: player.balance };
        });
    }

    calculateHandValue(hand) {
        let total = 0;
        let aceCount = 0;

        hand.forEach(card => {
            if (card.rank === 'A') {
                aceCount += 1;
                total += 11;
            } else if (['K', 'Q', 'J'].includes(card.rank) || card.rank === '10') {
                total += 10;
            } else {
                total += Number(card.rank);
            }
        });

        while (total > 21 && aceCount > 0) {
            total -= 10;
            aceCount -= 1;
        }

        return total;
    }

    getState() {
        return {
            players: this.players.map(player => ({
                hand: player.hand,
                standing: player.standing,
                bust: player.bust,
                balance: player.balance
            })),
            dealerHand: this.dealerHand,
            currentPlayerIndex: this.currentPlayerIndex,
            isRoundActive: this.isRoundActive
        };
    }

    reset() {
        this.players = [];
        this.dealerHand = [];
        this.shoe = [];
        this.currentPlayerIndex = 0;
        this.isRoundActive = false;
    }
}

module.exports = Blackjack;