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
    unlockRequirement: 'Platinum Season Pass or Episode 6 finale clear.'
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
    unlockRequirement: 'Always available in the Quick Hit lobby.'
  }
];

module.exports = {
  categories,
  games
};
