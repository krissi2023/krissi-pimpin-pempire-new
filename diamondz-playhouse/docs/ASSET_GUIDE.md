# 📸 Asset Management Guide - Diamondz Playhouse

## Overview
This guide explains how to add your comic graphics, game assets, and visual content to the Diamondz Playhouse platform.

---

## Directory Structure

```
diamondz-playhouse/
├── assets/
│   ├── comics/              # Comic cover images
│   │   ├── rise-cover.jpg
│   │   ├── awakening-cover.jpg
│   │   ├── revolution-cover.jpg
│   │   └── heist-cover.jpg
│   ├── puzzles/             # Puzzle images
│   │   ├── 1-jigsaw-1.jpg
│   │   ├── 1-jigsaw-2.jpg
│   │   └── 2-word-search-bg.jpg
│   └── wallpapers/          # Downloadable wallpapers
│       ├── 1-character-1920x1080.jpg
│       ├── 1-character-2560x1440.jpg
│       └── 1-character-3840x2160.jpg
```

---

## Adding Comic Covers

### Step 1: Prepare Your Images

**Requirements:**
- **Dimensions**: 600x900px (2:3 aspect ratio)
- **Format**: JPG or PNG
- **File Size**: Under 500KB
- **Quality**: High resolution, crisp details

**Naming Convention:**
```
{comic-id}-cover.jpg

Examples:
- rise-cover.jpg
- awakening-cover.jpg
- revolution-cover.jpg
- heist-cover.jpg
```

### Step 2: Place Files
```bash
# Copy your cover images to:
/workspaces/krissi-pimpin-pimpire/diamondz-playhouse/assets/comics/
```

### Step 3: Update Comic Data
Edit `backend/routes/comics.js` to reference your images:

```javascript
{
  id: '1',
  title: 'The Rise',
  thumbnail: '/assets/comics/rise-cover.jpg',  // ← Update this path
  // ... rest of comic data
}
```

---

## Adding Puzzle Images

### Jigsaw Puzzles

**Requirements:**
- **Dimensions**: 1200x1200px (square for easy slicing)
- **Format**: JPG
- **File Size**: Under 1MB
- **Content**: Clear, high-detail scene from comic

**Naming:**
```
{comic-id}-jigsaw-{number}.jpg

Examples:
- 1-jigsaw-1.jpg  (Comic 1, Puzzle 1)
- 1-jigsaw-2.jpg  (Comic 1, Puzzle 2)
- 2-jigsaw-1.jpg  (Comic 2, Puzzle 1)
```

### Word Search Backgrounds

**Requirements:**
- **Dimensions**: 1000x1000px
- **Format**: JPG
- **Style**: Subtle background, won't interfere with text

**Naming:**
```
{comic-id}-wordsearch-bg.jpg
```

### Step-by-Step:
```bash
# 1. Place puzzle images in:
/workspaces/krissi-pimpin-pimpire/diamondz-playhouse/assets/puzzles/

# 2. They'll automatically be referenced in the API
```

---

## Adding Wallpapers

### Desktop Wallpapers

**Resolutions Required:**
- 1920x1080 (Full HD)
- 2560x1440 (2K)
- 3840x2160 (4K)

**Naming Convention:**
```
{comic-id}-{type}-{resolution}.jpg

Examples:
- 1-character-1920x1080.jpg
- 1-scene-2560x1440.jpg
- 1-logo-3840x2160.jpg
```

### Mobile Wallpapers

**Resolutions:**
- 1080x1920 (Standard)
- 1440x2960 (High-end)

**Naming:**
```
{comic-id}-mobile{number}-{resolution}.jpg

Examples:
- 1-mobile1-1080x1920.jpg
- 1-mobile2-1440x2960.jpg
```

### Step-by-Step:
```bash
# Place all wallpapers in:
/workspaces/krissi-pimpin-pimpire/diamondz-playhouse/assets/wallpapers/
```

---

## Adding Slot Machine Symbols

### Requirements
- **Dimensions**: 256x256px (for crisp rendering)
- **Format**: PNG with transparency
- **Style**: Bold, high-contrast, easily recognizable
- **Count**: 5-8 unique symbols per game theme

### Naming Convention:
```
{theme}-{symbol-name}.png

Examples:
- rise-diamond.png
- rise-crown.png
- rise-seven.png
- awakening-power.png
- heist-vault.png
```

### Step-by-Step:
```bash
# 1. Create symbols directory
mkdir -p assets/slot-symbols/

# 2. Place symbols in theme folders
assets/slot-symbols/
├── rise/
│   ├── diamond.png
│   ├── crown.png
│   └── seven.png
├── awakening/
│   └── power.png
└── heist/
    └── vault.png
```

### Update Game Code:
Edit `frontend/src/games/SlotMachineScene.js`:

```javascript
preload() {
  // Load your actual slot symbols
  this.load.image('diamond', '/assets/slot-symbols/rise/diamond.png');
  this.load.image('crown', '/assets/slot-symbols/rise/crown.png');
  this.load.image('seven', '/assets/slot-symbols/rise/seven.png');
}
```

---

## Using Graphic Components

### Import Graphics in Your Components:
```javascript
import { DiamondLogo, CoinIcon, DiamondSpinner } from '../components/Graphics';
import '../components/GraphicEffects.css';

function MyComponent() {
  return (
    <div>
      <DiamondLogo size={64} />
      <CoinIcon type="gold" size={32} />
      <DiamondSpinner className="loading" />
      
      <h1 className="neon-glow">Arcade</h1>
      <div className="comic-impact">POW!</div>
      <button className="pulse-glow">Play Now</button>
    </div>
  );
}
```

---

## Optimizing Images

### Batch Optimization (Command Line)

**Install ImageMagick:**
```bash
# Ubuntu/Debian
sudo apt-get install imagemagick

# Mac
brew install imagemagick
```

**Resize Comic Covers:**
```bash
cd assets/comics/
mogrify -resize 600x900! -quality 85 *.jpg
```

**Create Multiple Wallpaper Sizes:**
```bash
cd assets/wallpapers/

# From a 4K source image
convert source-4k.jpg -resize 1920x1080 output-1920x1080.jpg
convert source-4k.jpg -resize 2560x1440 output-2560x1440.jpg
convert source-4k.jpg -resize 3840x2160 output-3840x2160.jpg
```

**Compress Images:**
```bash
# Reduce file size while maintaining quality
mogrify -quality 85 *.jpg
```

### Online Tools
- **TinyPNG**: https://tinypng.com/ (PNG compression)
- **Squoosh**: https://squoosh.app/ (Google's image optimizer)
- **ImageOptim**: https://imageoptim.com/ (Mac app)

---

## Creating Placeholder Graphics

### Using Figma (Recommended)

1. **Create New File**: 600x900px for comic covers
2. **Design Your Cover**:
   - Add comic title
   - Character artwork
   - Background gradient
   - Logo/branding
3. **Export**: File → Export → JPG (85% quality)

### Using Canva (Beginner-Friendly)

1. **Create Design**: Custom size 600x900px
2. **Use Templates**: Search "comic book cover"
3. **Customize**: Add your story title, characters
4. **Download**: As JPG

### Quick Placeholder Generator

```bash
# Generate solid color placeholders
convert -size 600x900 xc:#1a1a2e -gravity center \
  -pointsize 72 -fill white -annotate +0+0 "The Rise" \
  rise-cover.jpg
```

---

## Serving Assets in Development

### Frontend Access
Assets in `/assets/` are publicly accessible:

```jsx
<img src="/assets/comics/rise-cover.jpg" alt="The Rise" />
```

### Backend API Returns Full Paths
```javascript
{
  thumbnail: '/assets/comics/rise-cover.jpg',
  wallpapers: [
    { url: '/assets/wallpapers/1-character-1920x1080.jpg' }
  ]
}
```

---

## Production Deployment

### Option 1: Same Server
Keep assets in `assets/` folder - they'll deploy with your app.

### Option 2: CDN (Recommended)
For better performance, upload to:

**Cloudinary (Free Tier):**
```bash
# Install CLI
npm install -g cloudinary-cli

# Upload
cloudinary upload assets/comics/*.jpg --folder diamondz/comics
```

**AWS S3 + CloudFront:**
```bash
# Upload to S3
aws s3 sync assets/ s3://your-bucket/assets/

# Update URLs in your code
thumbnail: 'https://cdn.yoursite.com/assets/comics/rise-cover.jpg'
```

---

## Asset Checklist

### Per Comic:
- [ ] Cover image (600x900px)
- [ ] 3 Jigsaw puzzle images (1200x1200px)
- [ ] 1 Word search background (1000x1000px)
- [ ] 5 Desktop wallpapers (3 types × 3 resolutions = 9 files)
- [ ] 2 Mobile wallpapers (2 types × 2 resolutions = 4 files)
- [ ] **Total: 17 images per comic**

### For 4 Comics:
- [ ] 4 covers
- [ ] 12 jigsaw puzzles
- [ ] 4 word search backgrounds
- [ ] 36 desktop wallpapers
- [ ] 16 mobile wallpapers
- [ ] **Grand Total: 72 images**

---

## Tips & Best Practices

✅ **Do:**
- Use consistent naming conventions
- Optimize images before uploading
- Keep source files (PSD/AI) in separate folder
- Test on mobile devices
- Use version control for assets

❌ **Don't:**
- Upload unoptimized 10MB files
- Mix naming conventions
- Hardcode URLs (use environment variables)
- Forget alt text for accessibility
- Commit large binaries to git (use Git LFS)

---

## Need Help?

**Design Resources:**
- **Free Stock Images**: Unsplash, Pexels, Pixabay
- **Icon Libraries**: Heroicons, Font Awesome, Feather Icons
- **Color Palettes**: Coolors.co, Adobe Color
- **Mockups**: Mockup World, Placeit

**Questions?**
Check `docs/DESIGN_SYSTEM.md` for brand guidelines and design specifications.

---

**Your comics are ready to shine!** 🎨✨
