const mongoose = require('mongoose');
const Comic = require('./models/Comic');
require('dotenv').config();

const comics = [
  {
    comicId: '0',
    title: 'Diamondz First Sparkle',
    description: 'The Queen B meets her match - Prequel to the Diamond Heist saga',
    price: 999, // $9.99
    thumbnail: '/assets/comics/first-sparkle-cover.jpg',
    theme: 'prequel',
    puzzleIncluded: true,
    wallpaperIncluded: true,
    goldPointsReward: 100,
    arcadeCredits: 5000, // $50
    pbPoints: 50,
    puzzlesCount: 3,
    wallpapersCount: 5,
    bonusContent: {
      characterBios: true,
      behindTheScenes: true,
      conceptArt: true
    },
    isActive: true
  },
  {
    comicId: '1',
    title: 'The Rise',
    description: 'Part 1 of the epic saga - The origin story',
    price: 999,
    thumbnail: '/assets/comics/rise-cover.jpg',
    theme: 'origin',
    puzzleIncluded: true,
    wallpaperIncluded: true,
    goldPointsReward: 100,
    arcadeCredits: 5000,
    pbPoints: 50,
    puzzlesCount: 3,
    wallpapersCount: 5,
    bonusContent: {
      characterBios: true,
      behindTheScenes: true,
      conceptArt: true
    },
    isActive: true
  },
  {
    comicId: '2',
    title: 'Awakening',
    description: 'Part 2 - The power awakens within',
    price: 999,
    thumbnail: '/assets/comics/awakening-cover.jpg',
    theme: 'awakening',
    puzzleIncluded: true,
    wallpaperIncluded: true,
    goldPointsReward: 100,
    arcadeCredits: 5000,
    pbPoints: 50,
    puzzlesCount: 3,
    wallpapersCount: 5,
    bonusContent: {
      characterBios: true,
      behindTheScenes: true,
      conceptArt: true
    },
    isActive: true
  },
  {
    comicId: '3',
    title: 'Revolution',
    description: 'Part 3 - The final battle begins',
    price: 999,
    thumbnail: '/assets/comics/revolution-cover.jpg',
    theme: 'revolution',
    puzzleIncluded: true,
    wallpaperIncluded: true,
    goldPointsReward: 100,
    arcadeCredits: 5000,
    pbPoints: 50,
    puzzlesCount: 3,
    wallpapersCount: 5,
    bonusContent: {
      characterBios: true,
      behindTheScenes: true,
      conceptArt: true
    },
    isActive: true
  },
  {
    comicId: '4',
    title: 'The Digital Diamond Heist',
    description: 'The ultimate casino vault adventure',
    price: 1299, // $12.99 - Premium
    thumbnail: '/assets/comics/heist-cover.jpg',
    theme: 'heist',
    puzzleIncluded: true,
    wallpaperIncluded: true,
    goldPointsReward: 150,
    arcadeCredits: 6500, // $65 - Premium
    pbPoints: 75,
    puzzlesCount: 4,
    wallpapersCount: 7,
    bonusContent: {
      characterBios: true,
      behindTheScenes: true,
      conceptArt: true,
      exclusiveChapter: true
    },
    isActive: true
  },
  {
    comicId: '5',
    title: 'Casino Vault Prequel',
    description: 'The setup before the big heist',
    price: 999,
    thumbnail: '/assets/comics/casino-vault-cover.jpg',
    theme: 'heist-prequel',
    puzzleIncluded: true,
    wallpaperIncluded: true,
    goldPointsReward: 100,
    arcadeCredits: 5000,
    pbPoints: 50,
    puzzlesCount: 3,
    wallpapersCount: 5,
    bonusContent: {
      characterBios: true,
      behindTheScenes: true,
      conceptArt: true
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
