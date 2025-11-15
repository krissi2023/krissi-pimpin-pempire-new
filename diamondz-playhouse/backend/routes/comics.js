const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/comics
 * @desc    Get all comics
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // TODO: Fetch from database
    const comics = [
      {
        id: '1',
        title: 'The Rise',
        description: 'Part 1 of the epic saga',
        price: 999, // $9.99 in cents
        thumbnail: '/assets/comics/rise-cover.jpg',
        theme: 'origin',
        puzzleIncluded: true,
        wallpaperIncluded: true,
        goldPointsReward: 100,
        arcadeCredits: 5000, // $50 in credits (100 credits = $1)
        pbPoints: 50,
        puzzlesCount: 3, // Multiple puzzles per comic
        wallpapersCount: 5, // Multiple wallpapers
        bonusContent: {
          characterBios: true,
          behindTheScenes: true,
          conceptArt: true
        }
      },
      {
        id: '2',
        title: 'Awakening',
        description: 'Part 2 - The power awakens',
        price: 999,
        thumbnail: '/assets/comics/awakening-cover.jpg',
        theme: 'awakening',
        puzzleIncluded: true,
        wallpaperIncluded: true,
        goldPointsReward: 100,
        arcadeCredits: 5000, // $50 in credits
        pbPoints: 50,
        puzzlesCount: 3,
        wallpapersCount: 5,
        bonusContent: {
          characterBios: true,
          behindTheScenes: true,
          conceptArt: true
        }
      },
      {
        id: '3',
        title: 'Revolution',
        description: 'Part 3 - The final battle',
        price: 999,
        thumbnail: '/assets/comics/revolution-cover.jpg',
        theme: 'revolution',
        puzzleIncluded: true,
        wallpaperIncluded: true,
        goldPointsReward: 100,
        arcadeCredits: 5000, // $50 in credits
        pbPoints: 50,
        puzzlesCount: 3,
        wallpapersCount: 5,
        bonusContent: {
          characterBios: true,
          behindTheScenes: true,
          conceptArt: true
        }
      },
      {
        id: '4',
        title: 'The Digital Diamond Heist',
        description: 'Casino vault adventure',
        price: 1299, // $12.99
        thumbnail: '/assets/comics/heist-cover.jpg',
        theme: 'heist',
        puzzleIncluded: true,
        wallpaperIncluded: true,
        goldPointsReward: 150,
        arcadeCredits: 6500, // $65 in credits (premium comic)
        pbPoints: 75,
        puzzlesCount: 4,
        wallpapersCount: 7,
        bonusContent: {
          characterBios: true,
          behindTheScenes: true,
          conceptArt: true,
          exclusiveChapter: true
        }
      },
      {
        id: '0',
        title: 'Diamondz First Sparkle',
        description: 'The Queen B meets her match - Prequel to the Diamond Heist saga',
        price: 999, // $9.99
        thumbnail: '/assets/comics/first-sparkle-cover.jpg',
        theme: 'prequel',
        puzzleIncluded: true,
        wallpaperIncluded: true,
        goldPointsReward: 100,
        arcadeCredits: 5000, // $50 in credits
        pbPoints: 50,
        puzzlesCount: 3,
        wallpapersCount: 5,
        bonusContent: {
          characterBios: true,
          behindTheScenes: true,
          conceptArt: true,
          characterIntros: true // Introduces Diamond and Pimpin Paul
        }
      }
    ];

    res.json(comics);
  } catch (error) {
    console.error('Error fetching comics:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   GET /api/comics/:id
 * @desc    Get single comic by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // TODO: Fetch from database
    const comic = {
      id,
      title: 'The Rise',
      description: 'Part 1 of the epic saga',
      fullDescription: 'An epic tale of power, strategy, and digital dominance...',
      price: 999,
      thumbnail: '/assets/comics/rise-cover.jpg',
      pages: 45,
      theme: 'origin',
      puzzleIncluded: true,
      wallpaperIncluded: true,
      goldPointsReward: 100,
      arcadeTheme: 'diamondz-rise'
    };

    res.json(comic);
  } catch (error) {
    console.error('Error fetching comic:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   GET /api/comics/:id/puzzles
 * @desc    Get all puzzles for a comic
 * @access  Private (must own comic)
 */
router.get('/:id/puzzles', async (req, res) => {
  try {
    const { id } = req.params;
    
    // TODO: Check if user owns this comic
    
    const puzzles = [
      {
        id: `${id}-puzzle-1`,
        comicId: id,
        type: 'jigsaw',
        name: 'Character Portrait',
        difficulty: 'easy',
        pieces: 50,
        imageUrl: `/assets/puzzles/${id}-jigsaw-1.jpg`,
        completionReward: 25, // gold points
        timeBonus: true, // Extra rewards for fast completion
        completed: false
      },
      {
        id: `${id}-puzzle-2`,
        comicId: id,
        type: 'word_search',
        name: 'Hidden Words',
        difficulty: 'medium',
        words: ['diamond', 'power', 'rise', 'arcade', 'heist'],
        gridSize: 15,
        completionReward: 30,
        timeBonus: true,
        completed: false
      },
      {
        id: `${id}-puzzle-3`,
        comicId: id,
        type: 'jigsaw',
        name: 'Epic Scene',
        difficulty: 'hard',
        pieces: 150,
        imageUrl: `/assets/puzzles/${id}-jigsaw-2.jpg`,
        completionReward: 50,
        timeBonus: true,
        bonusReward: 10, // Extra PB points
        completed: false
      }
    ];

    res.json(puzzles);
  } catch (error) {
    console.error('Error fetching puzzles:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   GET /api/comics/:id/wallpapers
 * @desc    Get all wallpapers for a comic
 * @access  Private (must own comic)
 */
router.get('/:id/wallpapers', async (req, res) => {
  try {
    const { id } = req.params;
    
    // TODO: Check if user owns this comic
    
    const wallpapers = [
      {
        id: `${id}-wp-1`,
        name: 'Main Character',
        resolutions: [
          { size: '1920x1080', url: `/assets/wallpapers/${id}-character-1920x1080.jpg` },
          { size: '2560x1440', url: `/assets/wallpapers/${id}-character-2560x1440.jpg` },
          { size: '3840x2160', url: `/assets/wallpapers/${id}-character-3840x2160.jpg` }
        ]
      },
      {
        id: `${id}-wp-2`,
        name: 'Epic Scene',
        resolutions: [
          { size: '1920x1080', url: `/assets/wallpapers/${id}-scene-1920x1080.jpg` },
          { size: '2560x1440', url: `/assets/wallpapers/${id}-scene-2560x1440.jpg` },
          { size: '3840x2160', url: `/assets/wallpapers/${id}-scene-3840x2160.jpg` }
        ]
      },
      {
        id: `${id}-wp-3`,
        name: 'Logo & Branding',
        resolutions: [
          { size: '1920x1080', url: `/assets/wallpapers/${id}-logo-1920x1080.jpg` },
          { size: '2560x1440', url: `/assets/wallpapers/${id}-logo-2560x1440.jpg` },
          { size: '3840x2160', url: `/assets/wallpapers/${id}-logo-3840x2160.jpg` }
        ]
      },
      {
        id: `${id}-wp-4`,
        name: 'Mobile Wallpaper 1',
        resolutions: [
          { size: '1080x1920', url: `/assets/wallpapers/${id}-mobile1-1080x1920.jpg` },
          { size: '1440x2960', url: `/assets/wallpapers/${id}-mobile1-1440x2960.jpg` }
        ]
      },
      {
        id: `${id}-wp-5`,
        name: 'Mobile Wallpaper 2',
        resolutions: [
          { size: '1080x1920', url: `/assets/wallpapers/${id}-mobile2-1080x1920.jpg` },
          { size: '1440x2960', url: `/assets/wallpapers/${id}-mobile2-1440x2960.jpg` }
        ]
      }
    ];

    res.json(wallpapers);
  } catch (error) {
    console.error('Error fetching wallpapers:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   POST /api/comics/:id/complete-puzzle
 * @desc    Mark puzzle as completed and award points
 * @access  Private
 */
router.post('/:id/complete-puzzle', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, completionTime } = req.body;
    
    // TODO: Award points to user
    const pointsAwarded = 50;
    
    res.json({ 
      success: true, 
      pointsAwarded,
      message: `Puzzle completed! You earned ${pointsAwarded} gold points!`
    });
  } catch (error) {
    console.error('Error completing puzzle:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
