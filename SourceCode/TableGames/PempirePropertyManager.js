'use strict';

/**
 * Game: Pempire Property Manager
 * Manage blinged-out properties, broker trades, and outgrow rival empires.
 */

const DEFAULT_PROPERTIES = [
    { id: 'kings-court', name: "King's Court", price: 240, rent: 55 },
    { id: 'queens-row', name: "Queen's Row", price: 190, rent: 45 },
    { id: 'diamond-lane', name: 'Diamond Lane', price: 320, rent: 75 },
    { id: 'velvet-vista', name: 'Velvet Vista', price: 280, rent: 60 },
    { id: 'pempire-plaza', name: 'Pempire Plaza', price: 360, rent: 85 }
];

class PempirePropertyManager {
    constructor(options = {}) {
        this.startingBank = this.normalizeNumber(options.startingBank, 1500);
        this.startingMoney = this.normalizeNumber(options.startingMoney, 600);
        this.winningNetWorth = this.normalizeNumber(options.winningNetWorth, 1800);
        this.maxTurns = this.normalizeNumber(options.maxTurns, 40);
        this.basePlayers = this.normalizePlayers(options.players);

        this.turn = 0;
        this.turnCount = 0;
        this.currentRound = 1;
        this.isRunning = false;
        this.bank = this.startingBank;
        this.winner = null;
        this.gameInterval = null;

        this.resetState();
    }

    initialize(options = {}) {
        if (typeof options.startingBank === 'number') {
            this.startingBank = this.normalizeNumber(options.startingBank, this.startingBank);
        }
        if (typeof options.startingMoney === 'number') {
            this.startingMoney = this.normalizeNumber(options.startingMoney, this.startingMoney);
        }
        if (typeof options.winningNetWorth === 'number') {
            this.winningNetWorth = this.normalizeNumber(options.winningNetWorth, this.winningNetWorth);
        }
        if (typeof options.maxTurns === 'number') {
            this.maxTurns = this.normalizeNumber(options.maxTurns, this.maxTurns);
        }
        if (Array.isArray(options.players)) {
            this.basePlayers = this.normalizePlayers(options.players);
        }
        this.resetState();
        return this.getState();
    }

    startGame() {
        if (this.players.length === 0) {
            this.basePlayers = this.normalizePlayers();
            this.players = this.createPlayersFromBase();
        }
        this.isRunning = true;
        this.turn = 0;
        this.turnCount = 0;
        this.currentRound = 1;
        this.winner = null;
        this.startLoop();
        this.animateTurnStart(this.getCurrentPlayer());
        return this.getState();
    }

    resetState() {
        this.properties = this.generateProperties();
        this.players = this.createPlayersFromBase();
        this.turn = 0;
        this.turnCount = 0;
        this.currentRound = 1;
        this.bank = this.startingBank;
        this.isRunning = false;
        this.winner = null;
        this.stopLoop();
    }

    generateProperties(custom = null) {
        const source = Array.isArray(custom) && custom.length > 0 ? custom : DEFAULT_PROPERTIES;
        return source.map((entry) => ({
            id: entry.id,
            name: entry.name,
            price: this.normalizeNumber(entry.price, 200),
            rent: this.normalizeNumber(entry.rent || Math.floor(entry.price * 0.25), 40),
            ownerId: null
        }));
    }

    createPlayersFromBase() {
        const templates = this.basePlayers.length > 0 ? this.basePlayers : this.getFallbackPlayers();
        return templates.map((template, index) => ({
            id: template.id || `player-${index + 1}`,
            name: template.name || `Player ${index + 1}`,
            money: this.normalizeNumber(template.money ?? this.startingMoney, this.startingMoney),
            properties: [],
            netWorth: this.normalizeNumber(template.money ?? this.startingMoney, this.startingMoney)
        }));
    }

    getFallbackPlayers() {
        return [
            { id: 'player-a', name: 'Sky Hustle', money: this.startingMoney },
            { id: 'player-b', name: 'Velvet Vanguard', money: this.startingMoney }
        ];
    }

    getCurrentPlayer() {
        if (this.players.length === 0) {
            return null;
        }
        return this.players[this.turn % this.players.length];
    }

    findPlayer(playerId) {
        return this.players.find((player) => player.id === playerId) || null;
    }

    findProperty(propertyIdOrName) {
        if (!propertyIdOrName) {
            return null;
        }
        return this.properties.find((property) =>
            property.id === propertyIdOrName || property.name === propertyIdOrName
        ) || null;
    }

    nextTurn(options = {}) {
        if (!this.isRunning || this.players.length === 0) {
            return { success: false, reason: 'Game is not running.' };
        }

        const current = this.getCurrentPlayer();
        this.turnCount += 1;

        if (options.autoBuy !== false) {
            this.autoAcquireProperty(current);
        }

        this.turn = (this.turn + 1) % this.players.length;
        this.currentRound = Math.floor(this.turnCount / this.players.length) + 1;
        this.checkWinCondition();

        const nextPlayer = this.getCurrentPlayer();
        this.animateTurnStart(nextPlayer);
        return {
            success: true,
            activePlayer: nextPlayer ? { ...nextPlayer } : null,
            turn: this.turn,
            currentRound: this.currentRound,
            state: this.getState()
        };
    }

    autoAcquireProperty(player) {
        if (!player) {
            return;
        }
        const affordable = this.properties.find((property) => !property.ownerId && property.price <= player.money);
        if (affordable) {
            this.acquireProperty(player, affordable);
        }
    }

    buyProperty(propertyId, buyerId = null) {
        if (!this.isRunning) {
            return { success: false, reason: 'Game is not running.' };
        }
        const property = this.findProperty(propertyId);
        if (!property) {
            return { success: false, reason: 'Property not found.' };
        }
        if (property.ownerId) {
            return { success: false, reason: 'Property already owned.' };
        }
        const player = buyerId ? this.findPlayer(buyerId) : this.getCurrentPlayer();
        if (!player) {
            return { success: false, reason: 'Buyer not found.' };
        }
        if (player.money < property.price) {
            return { success: false, reason: 'Insufficient funds.' };
        }

        const result = this.acquireProperty(player, property);
        this.checkWinCondition();
        return {
            success: true,
            property: { ...result.property },
            player: { ...result.player },
            state: this.getState()
        };
    }

    acquireProperty(player, property) {
        player.money -= property.price;
        player.properties.push(property.id);
        property.ownerId = player.id;
        this.bank += property.price;
        player.netWorth = this.calculateNetWorth(player);
        return { player, property };
    }

    tradeProperty(fromPlayerId, toPlayerId, propertyId, price = 0) {
        const fromPlayer = this.findPlayer(fromPlayerId);
        const toPlayer = this.findPlayer(toPlayerId);
        const property = this.findProperty(propertyId);

        if (!fromPlayer || !toPlayer || !property) {
            return { success: false, reason: 'Invalid trade participants.' };
        }
        if (property.ownerId !== fromPlayer.id) {
            return { success: false, reason: 'Seller does not own the property.' };
        }
        if (price > 0 && toPlayer.money < price) {
            return { success: false, reason: 'Buyer lacks funds.' };
        }

        fromPlayer.properties = fromPlayer.properties.filter((id) => id !== property.id);
        toPlayer.properties.push(property.id);
        property.ownerId = toPlayer.id;

        if (price > 0) {
            fromPlayer.money += price;
            toPlayer.money -= price;
        }

        fromPlayer.netWorth = this.calculateNetWorth(fromPlayer);
        toPlayer.netWorth = this.calculateNetWorth(toPlayer);

        this.animateTrade({ from: fromPlayerId, to: toPlayerId, property: propertyId, price });
        this.checkWinCondition();

        return {
            success: true,
            property: { ...property },
            fromPlayer: { ...fromPlayer },
            toPlayer: { ...toPlayer },
            state: this.getState()
        };
    }

    collectRent(propertyId, amountOverride = null) {
        const property = this.findProperty(propertyId);
        if (!property || !property.ownerId) {
            return { success: false, reason: 'Rent cannot be collected.' };
        }
        const owner = this.findPlayer(property.ownerId);
        if (!owner) {
            return { success: false, reason: 'Owner not found.' };
        }
        const rentAmount = this.normalizeNumber(amountOverride, property.rent);
        owner.money += rentAmount;
        owner.netWorth = this.calculateNetWorth(owner);
        this.bank = Math.max(this.bank - rentAmount, 0);
        return {
            success: true,
            rent: rentAmount,
            owner: { ...owner },
            state: this.getState()
        };
    }

    checkWinCondition() {
        if (!this.isRunning) {
            return;
        }

        let leadingPlayer = null;
        let highestWorth = -Infinity;
        this.players.forEach((player) => {
            player.netWorth = this.calculateNetWorth(player);
            if (player.netWorth > highestWorth) {
                highestWorth = player.netWorth;
                leadingPlayer = player;
            }
        });

        const allOwned = this.properties.every((property) => property.ownerId);
        const reachedWorth = leadingPlayer && leadingPlayer.netWorth >= this.winningNetWorth;
        const exhaustedTurns = this.turnCount >= this.maxTurns;

        if (reachedWorth || allOwned || exhaustedTurns || this.bank <= 0) {
            this.winner = leadingPlayer || null;
            this.endGame();
        }
    }

    calculateNetWorth(player) {
        const propertyValue = player.properties.reduce((sum, propertyId) => {
            const property = this.findProperty(propertyId);
            return sum + (property ? property.price : 0);
        }, 0);
        return player.money + propertyValue;
    }

    endGame() {
        this.isRunning = false;
        this.stopLoop();
        this.showWinScreen(this.winner);
        return this.getState();
    }

    startLoop() {
        this.stopLoop();
        this.gameInterval = setInterval(() => {
            if (!this.isRunning) {
                this.stopLoop();
                return;
            }
            this.checkWinCondition();
        }, 750);
    }

    stopLoop() {
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
        }
    }

    dispose() {
        this.stopLoop();
    }

    getState() {
        return {
            bank: this.bank,
            turn: this.turn,
            turnCount: this.turnCount,
            currentRound: this.currentRound,
            winner: this.winner ? { ...this.winner } : null,
            isRunning: this.isRunning,
            properties: this.properties.map((property) => ({ ...property })),
            players: this.players.map((player) => ({
                id: player.id,
                name: player.name,
                money: player.money,
                properties: player.properties.slice(),
                netWorth: player.netWorth
            }))
        };
    }

    // ==== Animation & UI Hooks ====
    animateTurnStart(player) {
        if (!player) {
            return;
        }
        // Placeholder hook for highlighting the active player on the client.
    }

    animateTrade(tradeDetails) {
        // Placeholder trade animation hook.
        return tradeDetails;
    }

    showWinScreen(winner) {
        if (!winner) {
            return null;
        }
        // Placeholder for celebratory win screen effects.
        return { id: winner.id, name: winner.name, netWorth: winner.netWorth };
    }

    normalizePlayers(players = []) {
        if (!Array.isArray(players) || players.length === 0) {
            return [];
        }
        return players.map((player, index) => ({
            id: typeof player.id === 'string' ? player.id : `player-${index + 1}`,
            name: typeof player.name === 'string' ? player.name : `Player ${index + 1}`,
            money: this.normalizeNumber(player.money, this.startingMoney)
        }));
    }

    normalizeNumber(value, fallback) {
        if (typeof value !== 'number' || Number.isNaN(value) || value <= 0) {
            return fallback;
        }
        return Math.floor(value);
    }
}

module.exports = PempirePropertyManager;
