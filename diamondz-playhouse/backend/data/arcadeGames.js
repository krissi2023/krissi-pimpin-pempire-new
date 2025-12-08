'use strict';

const categories = [
  {
    key: 'featured',
    title: 'Featured Cabinets',
    icon: '💎',
    description: 'Signature experiences headlining the Diamondz Playhouse floor.'
  },
  {
    key: 'card',
    title: 'Card Room',
    icon: '♠️',
    description: 'High-touch card tables with collectible decks and streak ladders.'
  },
  {
    key: 'table',
    title: 'Table Games',
    icon: '🃏',
    description: 'Pit classics and strategic social games with pit-boss energy.'
  },
  {
    key: 'quick',
    title: 'Quick Play',
    icon: '⚡',
    description: 'Instant hits for casual sessions, streak bonuses, and party lobbies.'
  }
];

const games = [
  {
    id: 'pimpin-power-diamonds',
    name: "Pimpin' Power Diamonds",
    category: 'featured',
    type: 'SlotGame',
    sourceFile: 'diamondz-playhouse/frontend/src/slots/PimpinPowerDiamonds.js',
    description: '5-Reel, 25-Payline slot with Free Spins and Power Pick Bonus.',
    features: ['Free Spins', 'Power Pick Bonus', 'Wild Multipliers'],
    access: {
      minArcadeCredits: 25,
      requiredComicIds: [],
      requiredComicTitles: [],
      requiresVip: false,
      minTotalWins: 0
    },
    unlockRequirement: 'Available to all players.'
  },
  {
    id: 'the-diamond-vault',
    name: 'The Diamond Vault',
    category: 'featured',
    type: 'SlotGame',
    sourceFile: 'diamondz-playhouse/frontend/src/slots/TheDiamondVault.js',
    description: 'High volatility 4x4 slot with Locked Wilds and Vault Key Multipliers.',
    features: ['Locked Wilds', 'Vault Key Multiplier', '40 Paylines'],
    access: {
      minArcadeCredits: 40,
      requiredComicIds: [],
      requiredComicTitles: [],
      requiresVip: true,
      minTotalWins: 10
    },
    unlockRequirement: 'VIP Access Only.'
  },
  {
    id: 'diamond-heist-coin-dozer',
    name: 'Diamond Heist Coin Dozer',
    category: 'featured',
    type: 'ArcadeExperience',
    sourceFile: 'SourceCode/FeaturedGame/DiamondHeistCoinDozer.js',
    description: 'Push coins, trigger heists, and scoop rare diamonds in the flagship cabinet.',
    features: ['Physics-driven coin pusher', 'Heist jackpot phases', 'Dynamic diamond prizes'],
    access: {
      minArcadeCredits: 750,
      requiredComicIds: ['heist-prologue'],
      requiredComicTitles: ['Casino Vault Prequel'],
      requiresVip: false,
      minTotalWins: 5
    },
    unlockRequirement: 'Clear the Casino Vault Prologue story mission to enter the heist bay.'
  },
  {
    id: 'pimpire-claw',
    name: 'Pimpire Claw',
    category: 'quick',
    type: 'QuickGame',
    sourceFile: 'SourceCode/QuickGames/PimpireClaw.js',
    description: 'Precision claw machine with rarity-based bling and streak multipliers.',
    features: ['Grid navigation claw', 'Legendary prize streaks', 'Energy-based runs'],
    access: {
      minArcadeCredits: 150,
      requiredComicIds: [],
      requiredComicTitles: [],
      requiresVip: false,
      minTotalWins: 0
    },
    unlockRequirement: 'Complete the tutorial flight path to join the claw corral.'
  },
  {
    id: 'diamondz-slot',
    name: 'Diamondz Classic Slots',
    category: 'quick',
    type: 'QuickGame',
    sourceFile: 'SourceCode/QuickGames/DiamondzSlot.js',
    description: 'Three-reel lounge classic where diamond paylines fuel jackpot bursts.',
    features: ['Diamond jackpot payoff', 'Two-of-a-kind kicker wins', 'Spin cost tuning'],
    access: {
      minArcadeCredits: 80,
      requiredComicIds: [],
      requiredComicTitles: [],
      requiresVip: false,
      minTotalWins: 0
    },
    unlockRequirement: 'Always available once you register for the Diamondz lobby.'
  },
  {
    id: 'dapaul-smooth-slot',
    name: 'Dapaul Smooth Slot',
    category: 'quick',
    type: 'QuickGame',
    sourceFile: 'SourceCode/QuickGames/DapaulSmoothSlot.js',
    description: 'Smooth jazz progressive slot with buttery animations and jackpot storms.',
    features: ['Progressive jackpot pot', 'Spin cost customization', 'Three-of-a-kind payouts'],
    access: {
      minArcadeCredits: 260,
      requiredComicIds: ['2'],
      requiredComicTitles: ["Don't Hate the Player"],
      requiresVip: false,
      minTotalWins: 6
    },
    unlockRequirement: 'Finish Episode 2 and log six arcade wins to vibe with Dapaul.'
  },
  {
    id: 'golden-cane-slots',
    name: 'Golden Cane Slots',
    category: 'quick',
    type: 'QuickGame',
    sourceFile: 'SourceCode/QuickGames/GoldenCaneSlots.js',
    description: 'Luxury cane collection slot with mid-tier streak payouts and jackpots.',
    features: ['Cane jackpot line', 'Spin animation hooks', 'Mid-tier two-symbol wins'],
    access: {
      minArcadeCredits: 180,
      requiredComicIds: [],
      requiredComicTitles: [],
      requiresVip: false,
      minTotalWins: 2
    },
    unlockRequirement: 'Earn two quick wins to unlock the Golden Cane pit.'
  },
  {
    id: 'mink-slot',
    name: 'Mink Slot',
    category: 'quick',
    type: 'QuickGame',
    sourceFile: 'SourceCode/QuickGames/MinkSlot.js',
    description: 'Fashion-forward slot cabinet with mink jackpots and couture side wins.',
    features: ['Wild mink jackpots', 'Two fur collar combo win', 'Spin cost tuning'],
    access: {
      minArcadeCredits: 220,
      requiredComicIds: ['3'],
      requiredComicTitles: ['The Getaway Glitch'],
      requiresVip: false,
      minTotalWins: 8
    },
    unlockRequirement: 'Complete Episode 3 to strut into the Mink couture suite.'
  },
  {
    id: 'diamonds-high-roller-heist-slot',
    name: "Diamond's High Roller Heist",
    category: 'quick',
    type: 'QuickGame',
    sourceFile: 'SourceCode/QuickGames/DiamondsHighRollerHeistSlot.js',
    description: 'Five-payline heist slot with wild eyes, high multipliers, and streak jackpots.',
    features: ['Five-payline layout', 'Wild jackpot symbol', 'High volatility payouts'],
    access: {
      minArcadeCredits: 420,
      requiredComicIds: ['5'],
      requiredComicTitles: ['Respect the Hustle'],
      requiresVip: false,
      minTotalWins: 12
    },
    unlockRequirement: 'Complete Respect the Hustle and twelve arcade wins to enter the VIP vault.'
  },
  {
    id: 'cash-grab',
    name: 'Cash Grab',
    category: 'quick',
    type: 'QuickGame',
    sourceFile: 'SourceCode/QuickGames/CashGrab.js',
    description: 'Reaction-based cash clicker with timed rounds and bonus showers.',
    features: ['Timed cash piles', 'Score bursts', 'Co-op lobby ready'],
    access: {
      minArcadeCredits: 100,
      requiredComicIds: [],
      requiredComicTitles: [],
      requiresVip: false,
      minTotalWins: 0
    },
    unlockRequirement: 'Always available in the Quick Hit lobby.'
  },
  {
    id: 'pimpin-strut',
    name: "Pimpin' Strut",
    category: 'quick',
    type: 'QuickGame',
    sourceFile: 'SourceCode/QuickGames/PimpinStrut.js',
    description: 'Rhythm obstacle run with beat-synced hazards and bling pickups.',
    features: ['Beat-driven movement', 'Combo multipliers', 'Dynamic obstacle field'],
    access: {
      minArcadeCredits: 200,
      requiredComicIds: ['2'],
      requiredComicTitles: ["Don't Hate the Player"],
      requiresVip: false,
      minTotalWins: 8
    },
    unlockRequirement: 'Finish Episode 2 and win eight quick matches to unlock the runway.'
  },
  {
    id: 'yago-firewall-flip',
    name: 'Yago Firewall Flip',
    category: 'quick',
    type: 'QuickGame',
    sourceFile: 'SourceCode/QuickGames/YagoFirewallFlip.js',
    description: 'Grid hacking challenge that flips firewalls before the timer zaps out.',
    features: ['Time attack grid', 'Risk-reward scoring', 'Final seconds panic mode'],
    access: {
      minArcadeCredits: 250,
      requiredComicIds: ['bonus-yago'],
      requiredComicTitles: ['Yago Bonus System Overload'],
      requiresVip: false,
      minTotalWins: 12
    },
    unlockRequirement: 'Beat the Yago bonus comic event to access firewall drills.'
  },
  {
    id: 'blackjack',
    name: 'Blackjack',
    category: 'card',
    type: 'CardGame',
    sourceFile: 'SourceCode/CardGames/Blackjack.js',
    minPlayers: 1,
    maxPlayers: 7,
    description: 'Classic 21 with shoe management, dealer AI hooks, and split-ready flow.',
    features: ['Six-deck shoe scaffold', 'Dealer hit/stand logic', 'Balance tracking'],
    access: {
      minArcadeCredits: 400,
      requiredComicIds: ['1'],
      requiredComicTitles: ['The Velvet Touch'],
      requiresVip: false,
      minTotalWins: 0
    },
    unlockRequirement: 'Complete the Velvet Touch tutorial run.'
  },
  {
    id: 'high-or-low',
    name: 'High or Low',
    category: 'card',
    type: 'CardGame',
    sourceFile: 'SourceCode/CardGames/HiOrLow.js',
    minPlayers: 1,
    maxPlayers: 8,
    description: 'Predict the next card with streak multipliers and deck reshuffles.',
    features: ['Full deck shuffle', 'Streak bonus hooks', 'Guess animations'],
    access: {
      minArcadeCredits: 200,
      requiredComicIds: [],
      requiredComicTitles: [],
      requiresVip: false,
      minTotalWins: 5
    },
    unlockRequirement: 'Win three Daily Bonus streaks.'
  },
  {
    id: 'playhouse-draw',
    name: 'Playhouse Draw',
    category: 'card',
    type: 'CardGame',
    sourceFile: 'SourceCode/CardGames/PlayhouseDraw.js',
    minPlayers: 1,
    maxPlayers: 4,
    description: 'Collectible draw deck with bonus cards and evolving score targets.',
    features: ['Bonus card triggers', 'Deck randomizer', 'Win condition hooks'],
    access: {
      minArcadeCredits: 250,
      requiredComicIds: ['3'],
      requiredComicTitles: ['The Getaway Glitch'],
      requiresVip: false,
      minTotalWins: 6
    },
    unlockRequirement: 'Complete Episode 3’s mission ladder.'
  },
  {
    id: 'texas-holdem',
    name: "Texas Hold'em Poker",
    category: 'card',
    type: 'CardGame',
    sourceFile: 'SourceCode/CardGames/TexasHoldem.js',
    minPlayers: 2,
    maxPlayers: 8,
    description: 'Tournament-ready hold’em table with blinds, betting rounds, and showdown hooks.',
    features: ['Preflop → river flow', 'Chip stack management', 'Tournament scaffold'],
    access: {
      minArcadeCredits: 2000,
      requiredComicIds: ['4', '5'],
      requiredComicTitles: ['The Trap Card', 'Respect the Hustle'],
      requiresVip: true,
      minTotalWins: 25
    },
    unlockRequirement: 'Requires VIP Lounge access or Invite token.'
  },
  {
    id: 'draw',
    name: 'Draw',
    category: 'table',
    type: 'TableGame',
    sourceFile: 'SourceCode/TableGames/Draw.js',
    minPlayers: 1,
    maxPlayers: 4,
    description: 'Entry-level draw-and-hold flow ideal for onboarding new pit bosses.',
    features: ['Lightweight ruleset', 'Tutorial-friendly prompts', 'Expandable win logic'],
    access: {
      minArcadeCredits: 0,
      requiredComicIds: [],
      requiredComicTitles: [],
      requiresVip: false,
      minTotalWins: 0
    },
    unlockRequirement: 'Default access for registered players.'
  },
  {
    id: 'pempire-property-manager',
    name: 'Pempire Property Manager',
    category: 'table',
    type: 'TableGame',
    sourceFile: 'SourceCode/TableGames/PempirePropertyManager.js',
    minPlayers: 2,
    maxPlayers: 6,
    description: 'Strategic property trading table with negotiation hooks and bank management.',
    features: ['Turn rotation logic', 'Trade animation stubs', 'Win condition checks'],
    access: {
      minArcadeCredits: 600,
      requiredComicIds: ['5'],
      requiredComicTitles: ['Respect the Hustle'],
      requiresVip: false,
      minTotalWins: 10
    },
    unlockRequirement: 'Complete Respect the Hustle and ten table victories.'
  },
  {
    id: 'table-rock-paper-scissors',
    name: 'Rock Paper Scissors (Table)',
    category: 'table',
    type: 'TableGame',
    sourceFile: 'SourceCode/TableGames/RockPaperScissors.js',
    minPlayers: 2,
    maxPlayers: 6,
    description: 'Extended table variant with score tracking and win effects.',
    features: ['Race-to-five scaffold', 'Animated win/loss effects', 'Session history log'],
    access: {
      minArcadeCredits: 100,
      requiredComicIds: [],
      requiredComicTitles: [],
      requiresVip: false,
      minTotalWins: 0
    },
    unlockRequirement: 'Included with base arcade membership.'
  },
  {
    id: 'quick-rock-paper-scissors',
    name: 'Rock Paper Scissors (Quick)',
    category: 'quick',
    type: 'QuickGame',
    sourceFile: 'SourceCode/QuickGames/RockPaperScissors.js',
    description: 'Instant duel variant with analytics, streak tracking, and best-of series.',
    features: ['Win/loss analytics', 'Best-of mode', 'History log'],
    access: {
      minArcadeCredits: 0,
      requiredComicIds: [],
      requiredComicTitles: [],
      requiresVip: false,
      minTotalWins: 0
    },
    unlockRequirement: 'Always available in the Quick Hit lobby.'
  }
];

module.exports = {
  categories,
  games
};
