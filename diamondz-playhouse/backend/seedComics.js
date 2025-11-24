const mongoose = require('mongoose');
const Comic = require('./models/Comic');
require('dotenv').config();

const comics = [
  // DIAMOND'S PERSPECTIVE - The Heist Trilogy
  {
    comicId: '1',
    title: 'The Velvet Touch',
    description: 'Episode 1 (Diamond\'s POV) - Diamond infiltrates Sterling\'s fortress vault with charm and skill',
    price: 5000, // $50.00
    thumbnail: '/assets/comics/velvet-touch-cover.svg',
    storySlug: 'Episode1_The_Velvet_Touch.md',
    theme: 'heist',
    puzzleIncluded: true,
    wallpaperIncluded: true,
    goldPointsReward: 5000,
    arcadeCredits: 5000, // $50
    pbPoints: 50,
    puzzlesCount: 3,
    wallpapersCount: 5,
    bonusContent: {
      characterBios: true,
      behindTheScenes: true,
      conceptArt: true,
      diamondProfile: true
    },
    isActive: true
  },
  {
    comicId: '2',
    title: 'Don\'t Hate the Player',
    description: 'Episode 2 (Diamond\'s POV) - Diamond faces King Pimpin\'s arcade-themed traps: Slots, Fish Tables, and Cards',
    price: 5000,
    thumbnail: '/assets/comics/dont-hate-player-cover.svg',
    storySlug: 'Episode2_Dont_Hate_The_Player.md',
    theme: 'arcade-heist',
    puzzleIncluded: true,
    wallpaperIncluded: true,
    goldPointsReward: 5000,
    arcadeCredits: 5000,
    pbPoints: 50,
    puzzlesCount: 3,
    wallpapersCount: 5,
    bonusContent: {
      characterBios: true,
      behindTheScenes: true,
      conceptArt: true,
      slotMachineMinigame: true
    },
    isActive: true
  },
  {
    comicId: '3',
    title: 'The Getaway Glitch',
    description: 'Episode 3 (Diamond\'s POV) - Diamond\'s daring escape with Yago trying to stop her. King Pimpin\' decides to pursue',
    price: 5000,
    thumbnail: '/assets/comics/getaway-glitch-cover.svg',
    storySlug: 'Episode3_The_Getaway_Glitch.md',
    theme: 'action-romance',
    puzzleIncluded: true,
    wallpaperIncluded: true,
    goldPointsReward: 5000,
    arcadeCredits: 5000,
    pbPoints: 50,
    puzzlesCount: 3,
    wallpapersCount: 5,
    bonusContent: {
      characterBios: true,
      behindTheScenes: true,
      conceptArt: true,
      yagoIntro: true
    },
    isActive: true
  },
  // KING PIMPIN'S PERSPECTIVE - The Truth Revealed
  {
    comicId: '4',
    title: 'The Trap Card',
    description: 'Episode 4 (King Pimpin\'s POV) - He knew all along. Watch him activate "Arcade Mode" and let her play',
    price: 5000,
    thumbnail: '/assets/comics/trap-card-cover.svg',
    storySlug: 'Episode4_The_Trap_Card.md',
    theme: 'perspective-shift',
    puzzleIncluded: true,
    wallpaperIncluded: true,
    goldPointsReward: 5000,
    arcadeCredits: 5000,
    pbPoints: 50,
    puzzlesCount: 3,
    wallpapersCount: 5,
    bonusContent: {
      characterBios: true,
      behindTheScenes: true,
      conceptArt: true,
      kingPimpinProfile: true,
      yagoTechSpecs: true
    },
    isActive: true
  },
  {
    comicId: '5',
    title: 'Respect the Hustle',
    description: 'Episode 5 (King Pimpin\'s POV) - King watches Diamond beat every trap. His admiration grows with each level',
    price: 5000,
    thumbnail: '/assets/comics/respect-hustle-cover.svg',
    storySlug: 'Episode5_Game_Recognize_Game.md',
    theme: 'arcade-commentary',
    puzzleIncluded: true,
    wallpaperIncluded: true,
    goldPointsReward: 5000,
    arcadeCredits: 5000,
    pbPoints: 50,
    puzzlesCount: 3,
    wallpapersCount: 5,
    bonusContent: {
      characterBios: true,
      behindTheScenes: true,
      conceptArt: true,
      gameMechanicsGuide: true
    },
    isActive: true
  },
  {
    comicId: '6',
    title: 'The Chase Begins',
    description: 'Episode 6 (King Pimpin\'s POV) - She escaped with his car and his respect. Now the real game starts',
    price: 5000, // $50.00 - Season Finale
    thumbnail: '/assets/comics/chase-begins-cover.svg',
    storySlug: 'Episode6_The_Chase_Begins.md',
    theme: 'romance-setup',
    puzzleIncluded: true,
    wallpaperIncluded: true,
    goldPointsReward: 5000,
    arcadeCredits: 6500, // $65 - Premium
    pbPoints: 75,
    puzzlesCount: 4,
    wallpapersCount: 7,
    bonusContent: {
      characterBios: true,
      behindTheScenes: true,
      conceptArt: true,
      exclusiveChapter: true,
      season2Teaser: true
    },
    isActive: true
  },
  // BONUS CONTENT
  {
    comicId: 'bonus-yago',
    title: 'Yago\'s Redemption',
    description: 'Bonus Story - How Yago plans to upgrade and redeem himself after getting hacked by Diamond',
    price: 5000, // $50.00 - Bonus content
    thumbnail: '/assets/comics/yago-redemption-cover.svg',
    storySlug: 'Yago_Bonus_System_Overload.md',
    theme: 'side-story',
    puzzleIncluded: true,
    wallpaperIncluded: true,
    goldPointsReward: 5000,
    arcadeCredits: 4000,
    pbPoints: 40,
    puzzlesCount: 2,
    wallpapersCount: 4,
    bonusContent: {
      characterBios: true,
      behindTheScenes: true,
      conceptArt: true,
      aiSideStory: true,
      yagoUpgradeTree: true
    },
    isActive: true
  }
];

async function seedComics() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing comics
    await Comic.deleteMany({});
    console.log('🗑️  Cleared existing comics');

    // Insert new comics
    const inserted = await Comic.insertMany(comics);
    console.log(`✅ Successfully seeded ${inserted.length} comics:`);
    inserted.forEach(comic => {
      console.log(`   - ${comic.title} (${comic.comicId})`);
    });

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedComics();
