/**
 * UserProfile class
 * Tracks player currency, avatar, preferences, and unlockables.
 */

'use strict';

class UserProfile {
    constructor() {
        this.username = 'Guest';
        this.goldCoins = 1000;   // Main play currency
        this.ppc = 5;            // Premium/earnable currency
        this.avatar = 'DefaultAvatar';
        this.wallpaper = 'ClassicArcade';
        this.unlockedGames = [];
        this.unlockedComics = [];
        this.stats = {
            gamesPlayed: 0,
            totalWins: 0,
            puzzlesSolved: 0
        };
    }

    addCoins(amount) {
        this.goldCoins += amount;
    }

    spendCoins(amount) {
        if (this.goldCoins >= amount) {
            this.goldCoins -= amount;
            return true;
        }
        return false;
    }

    addPPC(amount) {
        this.ppc += amount;
    }

    spendPPC(amount) {
        if (this.ppc >= amount) {
            this.ppc -= amount;
            return true;
        }
        return false;
    }

    setAvatar(avatarName) {
        this.avatar = avatarName;
    }

    setWallpaper(wallpaperName) {
        this.wallpaper = wallpaperName;
    }

    unlockGame(gameName) {
        if (!this.unlockedGames.includes(gameName)) {
            this.unlockedGames.push(gameName);
        }
    }

    unlockComic(comicName) {
        if (!this.unlockedComics.includes(comicName)) {
            this.unlockedComics.push(comicName);
        }
    }

    recordGameWin() {
        this.stats.gamesPlayed += 1;
        this.stats.totalWins += 1;
    }

    recordGamePlay() {
        this.stats.gamesPlayed += 1;
    }

    recordPuzzleSolved() {
        this.stats.puzzlesSolved += 1;
    }
}

module.exports = UserProfile;