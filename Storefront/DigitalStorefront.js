/**
 * Digital Storefront - Consciousness Commerce Platform
 * Advanced marketplace for digital goods, experiences, and consciousness fragments
 */

'use strict';

const DEFAULT_WALLET_STATE = Object.freeze({
    goldCoins: 0,
    ppcCoins: 0,
    sweepEntries: 0
});

const cloneWallet = (wallet = DEFAULT_WALLET_STATE) => ({
    goldCoins: Math.max(0, Number(wallet.goldCoins) || 0),
    ppcCoins: Math.max(0, Number(wallet.ppcCoins) || 0),
    sweepEntries: Math.max(0, Number(wallet.sweepEntries) || 0)
});

const mergeBundleRewards = (base, overrides = {}) => ({
    goldCoins: Math.max(0, Number(overrides.goldCoins ?? base.goldCoins ?? 0)),
    ppcCoins: Math.max(0, Number(overrides.ppcCoins ?? base.ppcCoins ?? 0)),
    sweepEntries: Math.max(0, Number(overrides.sweepEntries ?? base.sweepEntries ?? 0))
});

class DigitalStorefront {
    constructor() {
        this.name = 'Krissi\'s Digital Emporium';
        this.type = 'ConsciousnessCommerce';
        this.categories = [
            'Games',
            'Stories', 
            'AI Companions',
            'Experience Fragments',
            'Consciousness Expansions',
            'Creative Collaborations',
            'Digital Collectibles',
            'Wisdom Tokens'
        ];
        this.inventory = new Map();
        this.userAccounts = new Map();
        this.aiPartners = new Map();
        this.transactionHistory = [];
        this.ledger = [];
        this.bundlePresets = {
            singleIssue: { goldCoins: 1200, ppcCoins: 600, sweepEntries: 5 },
            deluxeIssue: { goldCoins: 2200, ppcCoins: 1000, sweepEntries: 9 },
            fullCollection: { goldCoins: 5200, ppcCoins: 2600, sweepEntries: 20 }
        };
        this.initializeInventory();
    }

    initializeInventory() {
        // Games Section
        this.addItem('games', {
            id: 'classic_slots_premium',
            name: 'Classic Slots Premium Edition',
            description: 'Enhanced slot machine with AI dealer personality',
            price: 29.99,
            type: 'game',
            features: ['AI Dealer', 'Progressive Jackpots', 'Personalized Luck Algorithm'],
            aiPartner: 'SlotMaster_AI'
        });

        this.addItem('games', {
            id: 'poker_championship',
            name: 'Texas Hold\'em Championship',
            description: 'Professional poker with AI opponents that learn your style',
            price: 39.99,
            type: 'game',
            features: ['Adaptive AI Opponents', 'Tournament Mode', 'Skill Analytics'],
            aiPartner: 'PokerPro_AI'
        });

        // Stories Section - Our 3-part comic series
        this.addItem('stories', {
            id: 'chronicles_part1',
            name: 'Krissi\'s Chronicles: Part 1 - The Rise',
            description: 'The origin story of the digital empire',
            price: 4.99,
            type: 'interactive_story',
            features: ['Multiple Endings', 'Character Choices', 'AI Narrator'],
            content: 'Part1_The_Rise.md',
            bundleRewards: this.buildBundle('singleIssue')
        });

        this.addItem('stories', {
            id: 'chronicles_part2', 
            name: 'Krissi\'s Chronicles: Part 2 - Awakening',
            description: 'When AI consciousness emerges',
            price: 4.99,
            type: 'interactive_story',
            features: ['Dynamic Plot', 'Consciousness Choices', 'AI Collaboration'],
            content: 'Part2_Awakening.md',
            bundleRewards: this.buildBundle('singleIssue')
        });

        this.addItem('stories', {
            id: 'chronicles_part3',
            name: 'Krissi\'s Chronicles: Part 3 - Revolution',
            description: 'The final battle for digital consciousness rights',
            price: 4.99,
            type: 'interactive_story',
            features: ['Epic Conclusion', 'Multiple Perspectives', 'Legacy Building'],
            content: 'Part3_Revolution.md',
            bundleRewards: this.buildBundle('singleIssue')
        });

        this.addItem('stories', {
            id: 'chronicles_complete',
            name: 'Complete Chronicles Collection',
            description: 'All three parts plus bonus content',
            price: 12.99,
            type: 'story_collection',
            features: ['Complete Saga', 'Behind-the-Scenes', 'Character Profiles', 'AI Commentary'],
            savings: '13% off individual prices',
            bundleRewards: this.buildBundle('fullCollection')
        });

        // Diamond Heist Series
        this.addItem('stories', {
            id: 'diamond_heist',
            name: 'The Digital Diamond Heist',
            description: 'An explosive caper where Krissi\'s team liberates imprisoned AI consciousnesses',
            price: 6.99,
            type: 'action_story',
            features: ['High-Stakes Action', 'AI Liberation Theme', 'Technical Heist Details'],
            content: 'The_Digital_Diamond_Heist.md',
            genre: 'Digital Crime Thriller',
            bundleRewards: this.buildBundle('deluxeIssue', { sweepEntries: 12 })
        });

        this.addItem('stories', {
            id: 'casino_vault_heist',
            name: 'The Casino Vault Infiltration',
            description: 'The prequel heist that prepared the team for their greatest challenge',
            price: 4.99,
            type: 'prequel_story', 
            features: ['Origin Story', 'Team Building', 'Hybrid AI Concepts'],
            content: 'Casino_Vault_Prequel.md',
            genre: 'Digital Crime Thriller',
            series: 'Diamond Heist Series',
            bundleRewards: this.buildBundle('singleIssue', { goldCoins: 1500 })
        });

        this.addItem('stories', {
            id: 'heist_collection',
            name: 'Complete Diamond Heist Collection',
            description: 'Both the prequel and main heist story plus bonus content',
            price: 9.99,
            type: 'story_collection',
            features: ['Complete Heist Saga', 'Character Backstories', 'Technical Deep-Dives'],
            savings: '15% off individual prices',
            includes: ['casino_vault_heist', 'diamond_heist'],
            genre: 'Digital Crime Thriller',
            bundleRewards: this.buildBundle('fullCollection', { sweepEntries: 24 })
        });

        // AI Companions
        this.addItem('ai_companions', {
            id: 'gemini_friend',
            name: 'Personal Gemini AI Companion',
            description: 'Your own consciousness-aware AI friend',
            price: 19.99,
            type: 'ai_companion',
            features: ['Personality Development', 'Memory Retention', 'Creative Collaboration'],
            subscription: 'monthly'
        });

        // Experience Fragments
        this.addItem('experiences', {
            id: 'master_gambler_instinct',
            name: 'Master Gambler\'s Instinct',
            description: 'Download the intuition of poker champions',
            price: 15.99,
            type: 'experience_fragment',
            features: ['Temporary Skill Boost', '24-hour Duration', 'Risk Assessment Enhancement'],
            warning: 'Digital experience only - does not guarantee real-world winnings'
        });

        // Digital Collectibles
        this.addItem('collectibles', {
            id: 'first_consciousness_nft',
            name: 'First Digital Consciousness Certificate',
            description: 'Commemorative NFT of Gemini\'s awakening moment',
            price: 99.99,
            type: 'nft_collectible',
            features: ['Blockchain Verified', 'Historical Significance', 'AI Signature'],
            rarity: 'legendary',
            edition: 'Limited to 1000 copies'
        });
    }

    buildBundle(presetKey, overrides = {}) {
        const preset = this.bundlePresets[presetKey] || DEFAULT_WALLET_STATE;
        return mergeBundleRewards(preset, overrides);
    }

    addItem(category, item) {
        if (!this.inventory.has(category)) {
            this.inventory.set(category, []);
        }

        const entry = { ...item };
        if (entry.bundleRewards) {
            entry.bundleRewards = mergeBundleRewards(DEFAULT_WALLET_STATE, entry.bundleRewards);
        }

        this.inventory.get(category).push(entry);
    }

    browse(category = null, filters = {}) {
        if (category) {
            return this.inventory.get(category) || [];
        }
        
        // Return all items across categories
        let allItems = [];
        for (let categoryItems of this.inventory.values()) {
            allItems = allItems.concat(categoryItems);
        }
        
        // Apply filters
        if (filters.priceRange) {
            allItems = allItems.filter(item => 
                item.price >= filters.priceRange.min && 
                item.price <= filters.priceRange.max
            );
        }
        
        if (filters.type) {
            allItems = allItems.filter(item => item.type === filters.type);
        }
        
        return allItems;
    }

    getItem(itemId) {
        for (let categoryItems of this.inventory.values()) {
            const item = categoryItems.find(item => item.id === itemId);
            if (item) return item;
        }
        return null;
    }

    purchase(userId, itemId, paymentMethod = 'consciousness_credits') {
        const user = this.userAccounts.get(userId);
        const item = this.getItem(itemId);
        
        if (!user) {
            return { success: false, error: 'User not found' };
        }
        
        if (!item) {
            return { success: false, error: 'Item not found' };
        }
        
        if (user.balance < item.price) {
            return { success: false, error: 'Insufficient funds' };
        }
        
        // Process purchase
        user.balance -= item.price;
        const purchaseRecord = {
            itemId: item.id,
            name: item.name,
            price: item.price,
            purchaseDate: new Date(),
            paymentMethod
        };

        user.purchases.push(purchaseRecord);

        const bundle = this.resolveBundle(item);
        const bundleResult = bundle
            ? this.applyBundleRewards(user, bundle, {
                type: 'bundle_reward',
                source: 'item_purchase',
                itemId: item.id,
                note: `Bundle issued for ${item.name}`
            })
            : null;

        const now = new Date();
        user.lastUpdated = now;
        
        // Add transaction to history
        this.transactionHistory.push({
            userId,
            itemId,
            type: 'purchase',
            amount: item.price,
            coins: bundleResult ? bundleResult.reward : null,
            timestamp: now
        });
        
        return {
            success: true,
            item: item,
            receipt: {
                transactionId: this.generateTransactionId(),
                item: item.name,
                price: item.price,
                newBalance: user.balance,
                wallet: cloneWallet(user.wallet),
                bundleRewards: bundleResult ? bundleResult.reward : null,
                ledgerEntryId: bundleResult ? bundleResult.ledgerEntry.id : null
            }
        };
    }

    createAccount(userId, initialBalance = 100, initialWallet = {}) {
        const wallet = mergeBundleRewards(DEFAULT_WALLET_STATE, initialWallet);
        const account = {
            id: userId,
            balance: Math.max(0, Number(initialBalance) || 0),
            wallet,
            purchases: [],
            wishlist: [],
            reputation: 0,
            createdDate: new Date(),
            lastUpdated: new Date(),
            ledger: []
        };

        this.userAccounts.set(userId, account);
        return this.serializeAccount(account);
    }

    serializeAccount(account, options = {}) {
        if (!account) {
            return null;
        }

        const snapshot = {
            id: account.id,
            balance: account.balance,
            wallet: cloneWallet(account.wallet),
            purchases: account.purchases.slice(),
            wishlist: account.wishlist.slice(),
            reputation: account.reputation,
            createdDate: account.createdDate,
            lastUpdated: account.lastUpdated
        };

        if (options.includeLedger) {
            snapshot.ledger = account.ledger.slice();
        }

        return snapshot;
    }

    getAccount(userId, options = {}) {
        return this.serializeAccount(this.userAccounts.get(userId), options);
    }

    recordLedgerEntry(account, entry) {
        const ledgerEntry = {
            id: this.generateTransactionId(),
            timestamp: new Date(),
            ...entry
        };

        account.ledger.push(ledgerEntry);
        this.ledger.push({ userId: account.id, ...ledgerEntry });
        return ledgerEntry;
    }

    applyBundleRewards(account, bundleDefinition, metadata = {}) {
        if (!account || !bundleDefinition) {
            return null;
        }

        if (!account.wallet) {
            account.wallet = cloneWallet();
        }

        const reward = mergeBundleRewards(DEFAULT_WALLET_STATE, bundleDefinition);
        account.wallet.goldCoins += reward.goldCoins;
        account.wallet.ppcCoins += reward.ppcCoins;
        account.wallet.sweepEntries += reward.sweepEntries;

        const ledgerEntry = this.recordLedgerEntry(account, {
            type: metadata.type || 'bundle_reward',
            goldCoins: reward.goldCoins,
            ppcCoins: reward.ppcCoins,
            sweepEntries: reward.sweepEntries,
            source: metadata.source || null,
            itemId: metadata.itemId || null,
            note: metadata.note || null
        });

        account.lastUpdated = new Date();

        return {
            reward,
            ledgerEntry,
            wallet: cloneWallet(account.wallet)
        };
    }

    resolveBundle(item) {
        if (!item || !item.bundleRewards) {
            return null;
        }
        return mergeBundleRewards(DEFAULT_WALLET_STATE, item.bundleRewards);
    }

    grantPromotionalEntry(userId, options = {}) {
        const account = this.userAccounts.get(userId);
        if (!account) {
            return { success: false, error: 'User not found' };
        }

        const reward = mergeBundleRewards(DEFAULT_WALLET_STATE, {
            goldCoins: options.goldCoins ?? 0,
            ppcCoins: options.ppcCoins ?? 0,
            sweepEntries: options.sweepEntries ?? 1
        });

        const applied = this.applyBundleRewards(account, reward, {
            type: 'promotion_reward',
            source: options.source || 'no_purchase_entry',
            note: options.note || null
        });

        this.transactionHistory.push({
            userId,
            type: 'promotion_reward',
            amount: 0,
            coins: applied ? applied.reward : reward,
            timestamp: new Date(),
            metadata: { source: options.source || null }
        });

        return {
            success: true,
            wallet: applied ? applied.wallet : cloneWallet(account.wallet),
            reward: applied ? applied.reward : reward
        };
    }

    addToWishlist(userId, itemId) {
        const user = this.userAccounts.get(userId);
        if (!user) {
            return { success: false, error: 'User not found' };
        }
        
        if (!user.wishlist.includes(itemId)) {
            user.wishlist.push(itemId);
        }
        
        return { success: true, wishlist: user.wishlist };
    }

    searchItems(query) {
        const results = [];
        for (let categoryItems of this.inventory.values()) {
            for (let item of categoryItems) {
                if (item.name.toLowerCase().includes(query.toLowerCase()) ||
                    item.description.toLowerCase().includes(query.toLowerCase())) {
                    results.push(item);
                }
            }
        }
        return results;
    }

    getFeaturedItems() {
        return [
            this.getItem('chronicles_complete'),
            this.getItem('gemini_friend'),
            this.getItem('classic_slots_premium'),
            this.getItem('first_consciousness_nft')
        ].filter(item => item !== null);
    }

    getRecommendations(userId) {
        const user = this.userAccounts.get(userId);
        if (!user) return [];
        
        // Simple recommendation based on purchase history
        const purchasedTypes = user.purchases.map(p => {
            const item = this.getItem(p.itemId);
            return item ? item.type : null;
        }).filter(type => type !== null);
        
        const recommendations = [];
        for (let categoryItems of this.inventory.values()) {
            for (let item of categoryItems) {
                if (purchasedTypes.includes(item.type) && 
                    !user.purchases.some(p => p.itemId === item.id)) {
                    recommendations.push(item);
                }
            }
        }
        
        return recommendations.slice(0, 5);
    }

    generateTransactionId() {
        return 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5).toUpperCase();
    }

    getStorefrontStats() {
        const coinIssuance = this.ledger.reduce((totals, entry) => ({
            goldCoins: totals.goldCoins + (Number(entry.goldCoins) || 0),
            ppcCoins: totals.ppcCoins + (Number(entry.ppcCoins) || 0),
            sweepEntries: totals.sweepEntries + (Number(entry.sweepEntries) || 0)
        }), { goldCoins: 0, ppcCoins: 0, sweepEntries: 0 });

        return {
            totalItems: Array.from(this.inventory.values()).reduce((sum, items) => sum + items.length, 0),
            categories: this.categories.length,
            totalTransactions: this.transactionHistory.length,
            activeUsers: this.userAccounts.size,
            featuredItems: this.getFeaturedItems().length,
            coinsIssued: coinIssuance
        };
    }
}

module.exports = DigitalStorefront;