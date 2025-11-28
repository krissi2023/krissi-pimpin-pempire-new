const categories = [
  {
    key: 'slots',
    title: 'Slot Machines',
    icon: '🎰',
    description: 'High-energy reels with jackpots, free spins, and themed adventures.'
  },
  {
    key: 'table',
    title: 'Table Games',
    icon: '🃏',
    description: 'Classic felt experiences with strategic betting and dealer play.'
  },
  {
    key: 'card',
    title: 'Card Room',
    icon: '♠️',
    description: 'Poker lounge experiences with multi-phase showdowns.'
  },
  {
    key: 'quick',
    title: 'Quick Play',
    icon: '⚡',
    description: 'Instant hits for casual sessions and streak bonuses.'
  }
];

const games = [
  {
    id: 'classic-slots',
    name: 'Classic Slots',
    category: 'slots',
    type: 'SlotGame',
    sourceFile: 'SourceCode/SlotGames/ClassicSlots.js',
    minBet: 5,
    maxBet: 100,
    rtp: 94.3,
    reels: 3,
    rows: 3,
    paylines: 5,
    description: 'Traditional 3-reel machine with fruit symbols, wild 7s, and fast payouts.',
    features: ['3 reels · 5 paylines', 'Wild 7️⃣ top payout', 'Perfect for quick spins'],
    access: {
      minArcadeCredits: 500,
      requiredComicIds: [],
      requiredComicTitles: [],
      requiresVip: false,
      minTotalWins: 0
    },
    unlockRequirement: 'Any Diamond Heist comic unlocks this cabinet.'
  },
  {
    id: 'mega-fortune-video-slots',
    name: 'Mega Fortune Video Slots',
    category: 'slots',
    type: 'VideoSlotGame',
    sourceFile: 'SourceCode/SlotGames/VideoSlots.js',
    minBet: 10,
    maxBet: 250,
    rtp: 96.1,
    reels: 5,
    rows: 3,
    paylines: 25,
    description: 'Modern 5-reel spectacle with wild substitutions, scatter pays, and free-spin streaks.',
    features: ['Free spin rounds', 'Scatter multipliers', 'Bonus wheel encounters'],
    access: {
      minArcadeCredits: 1000,
      requiredComicIds: ['2'],
      requiredComicTitles: ["Don't Hate the Player"],
      requiresVip: false,
      minTotalWins: 0
    },
    unlockRequirement: 'Own Episode 2 – Don’t Hate the Player.'
  },
  {
    id: 'treasures-of-the-pharaoh',
    name: 'Treasures of the Pharaoh',
    category: 'slots',
    type: 'ThemedSlotGame',
    sourceFile: 'SourceCode/SlotGames/ThemedSlotMachines.js',
    minBet: 10,
    maxBet: 200,
    rtp: 96.4,
    reels: 5,
    rows: 3,
    paylines: 20,
    description: 'Theme-shifting slot cabinet with Egyptian, Ocean, Space, Fantasy, Western, and Neon modes.',
    features: ['Theme-select bonus', 'Mode-specific wilds', 'Unlockable soundscapes'],
    access: {
      minArcadeCredits: 1500,
      requiredComicIds: ['3'],
      requiredComicTitles: ['The Getaway Glitch'],
      requiresVip: false,
      minTotalWins: 0
    },
    unlockRequirement: 'Complete Puzzle Set B from Episode 3.'
  },
  {
    id: 'mega-millions-progressive',
    name: 'Mega Millions Progressive',
    category: 'slots',
    type: 'ProgressiveJackpotSlotGame',
    sourceFile: 'SourceCode/SlotGames/ProgressiveJackpotSlots.js',
    minBet: 25,
    maxBet: 500,
    rtp: 95.8,
    reels: 5,
    rows: 4,
    paylines: 50,
    description: 'Networked cabinet with five-tier progressive jackpots and mystery mega drops.',
    features: ['Mini → Mega jackpots', 'Pick-and-win bonus game', 'Wild multipliers'],
    access: {
      minArcadeCredits: 2500,
      requiredComicIds: ['6'],
      requiredComicTitles: ['The Chase Begins'],
      requiresVip: true,
      minTotalWins: 50
    },
    unlockRequirement: 'Platinum Season Pass or Episode 6 finale clear.'
  },
  {
    id: 'throne-of-diamonds',
    name: 'The Throne of Diamonds',
    category: 'slots',
    type: 'VideoSlotGame',
    sourceFile: 'SourceCode/SlotGames/ThroneOfDiamonds.js',
    minBet: 20,
    maxBet: 400,
    rtp: 95.4,
    reels: 5,
    rows: 3,
    paylines: 20,
    description: 'Opulent 5-reel experience with expanding wilds and royal respin streaks.',
    features: ['Expanding wild respins', 'Medium volatility', '20 regal paylines'],
    access: {
      minArcadeCredits: 1800,
      requiredComicIds: ['5'],
      requiredComicTitles: ['Respect the Hustle'],
      requiresVip: true,
      minTotalWins: 15
    },
    unlockRequirement: 'Earn VIP clearance and own Episode 5 – Respect the Hustle.'
  },
  {
    id: 'golden-limousine',
    name: 'The Golden Limousine',
    category: 'slots',
    type: 'HoldAndWinSlotGame',
    sourceFile: 'SourceCode/SlotGames/GoldenLimousine.js',
    minBet: 25,
    maxBet: 500,
    rtp: 96.2,
    reels: 5,
    rows: 3,
    paylines: 243,
    description: 'Hold-and-Win chase with neon slick visuals and grand jackpot drops.',
    features: ['Hold-and-Win respins', '243 all-ways pay', 'Four-tier jackpots'],
    access: {
      minArcadeCredits: 2200,
      requiredComicIds: ['6'],
      requiredComicTitles: ['The Chase Begins'],
      requiresVip: true,
      minTotalWins: 30
    },
    unlockRequirement: 'Finish The Chase Begins finale and flash Platinum VIP credentials.'
  },
  {
    id: 'pimpire-vault',
    name: "The Pimpire's Vault",
    category: 'slots',
    type: 'CascadingSlotGame',
    sourceFile: 'SourceCode/SlotGames/PimpireVault.js',
    minBet: 15,
    maxBet: 350,
    rtp: 96.8,
    reels: 6,
    rows: 6,
    paylines: null,
    description: 'Explosive cascading reels with compounding vault multipliers.',
    features: ['Cluster pays', 'Progressive cascade multiplier', 'Vault heist theme'],
    access: {
      minArcadeCredits: 1500,
      requiredComicIds: ['bonus-yago'],
      requiredComicTitles: ["Yago's Redemption"],
      requiresVip: false,
      minTotalWins: 20
    },
    unlockRequirement: 'Crack Yago’s Redemption bonus story puzzles to access the vault.'
  },
  {
    id: 'backstage-babylon',
    name: 'Backstage Babylon',
    category: 'slots',
    type: 'PickAndClickSlotGame',
    sourceFile: 'SourceCode/SlotGames/BackstageBabylon.js',
    minBet: 10,
    maxBet: 250,
    rtp: 95.1,
    reels: 5,
    rows: 4,
    paylines: 50,
    description: 'Cabaret-styled cab with VIP picker feature for steady payouts.',
    features: ['Pick-and-click guest list', 'Low volatility streaks', '50 illustrated paylines'],
    access: {
      minArcadeCredits: 800,
      requiredComicIds: ['4'],
      requiredComicTitles: ['The Trap Card'],
      requiresVip: false,
      minTotalWins: 5
    },
    unlockRequirement: 'Complete Episode 4 – The Trap Card community challenge.'
  },
  {
    id: 'street-boss-deal',
    name: "The Street Boss's Deal",
    category: 'slots',
    type: 'MegawaysSlotGame',
    sourceFile: 'SourceCode/SlotGames/StreetBossDeal.js',
    minBet: 30,
    maxBet: 600,
    rtp: 96.9,
    reels: 6,
    rows: null,
    paylines: 117649,
    description: 'Rain-slicked megaways grid with mystery symbols and high-voltage contracts.',
    features: ['Megaways reel layout', 'Mystery map symbols', 'High volatility free spins'],
    access: {
      minArcadeCredits: 2800,
      requiredComicIds: ['5', '6'],
      requiredComicTitles: ['Respect the Hustle', 'The Chase Begins'],
      requiresVip: true,
      minTotalWins: 40
    },
    unlockRequirement: 'Secure dual finale comics and broker 40 street wins to earn the contract.'
  },
  {
    id: 'texas-holdem',
    name: "Texas Hold'em Poker",
    category: 'card',
    type: 'CardGame',
    sourceFile: 'SourceCode/CardGames/TexasHoldem.js',
    minPlayers: 2,
    maxPlayers: 8,
    description: 'Full poker table with blinds, betting rounds, and showdown logic.',
    features: ['Preflop → river phases', 'Chip stack management', 'Supports tournaments'],
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
    id: 'blackjack',
    name: 'Blackjack',
    category: 'table',
    type: 'TableGame',
    sourceFile: 'SourceCode/TableGames/Blackjack.js',
    minPlayers: 1,
    maxPlayers: 7,
    description: 'Classic 21 with hit, stand, split hooks ready for expansion.',
    features: ['Dealer AI scaffold', 'Multiple hands support', 'Great for mobile play'],
    access: {
      minArcadeCredits: 500,
      requiredComicIds: ['1'],
      requiredComicTitles: ['The Velvet Touch'],
      requiresVip: false,
      minTotalWins: 0
    },
    unlockRequirement: 'Unlocked after Tutorial Run – Diamond’s First Sparkle.'
  },
  {
    id: 'high-or-low',
    name: 'High or Low',
    category: 'table',
    type: 'TableGame',
    sourceFile: 'SourceCode/TableGames/HighOrLow.js',
    minPlayers: 1,
    maxPlayers: 8,
    description: 'Predict whether the next card beats the current reveal; streak multipliers encouraged.',
    features: ['Fast rounds', 'Deck reshuffle helpers', 'Perfect for streak missions'],
    access: {
      minArcadeCredits: 300,
      requiredComicIds: [],
      requiredComicTitles: [],
      requiresVip: false,
      minTotalWins: 10
    },
    unlockRequirement: 'Win three Daily Bonus streaks.'
  },
  {
    id: 'draw',
    name: 'Draw',
    category: 'table',
    type: 'TableGame',
    sourceFile: 'SourceCode/TableGames/Draw.js',
    minPlayers: 1,
    maxPlayers: 4,
    description: 'Simple draw-and-hold experience ideal for onboarding new Pit Bosses.',
    features: ['Lightweight flow', 'Expandable rule set', 'Pairs well with tutorials'],
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
    id: 'rock-paper-scissors',
    name: 'Rock Paper Scissors',
    category: 'quick',
    type: 'QuickGame',
    sourceFile: 'SourceCode/QuickGames/RockPaperScissors.js',
    description: 'Instant duel with win-rate tracking, best-of series, and quick rematches.',
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
