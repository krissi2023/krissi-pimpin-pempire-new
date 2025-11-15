#!/bin/bash

# 🎨 Automatic Placeholder Generator
# Generates placeholder images for your comics, puzzles, and wallpapers
# Requires ImageMagick: sudo apt-get install imagemagick

set -e

# Colors matching design system
COLOR_PURPLE="#667eea"
COLOR_PINK="#764ba2"
COLOR_BLUE="#4facfe"
COLOR_GREEN="#43e97b"

# Create directories if they don't exist
mkdir -p assets/comics
mkdir -p assets/puzzles
mkdir -p assets/wallpapers
mkdir -p assets/slot-symbols

echo "🎨 Generating placeholder images..."

# Comic covers (600x900)
echo "📚 Creating comic cover placeholders..."

convert -size 600x900 \
  gradient:"$COLOR_PURPLE"-"$COLOR_PINK" \
  -gravity center \
  -fill white \
  -font Arial-Bold \
  -pointsize 60 \
  -annotate +0-100 "THE RISE" \
  -pointsize 24 \
  -annotate +0+0 "PART 1" \
  -pointsize 16 \
  -annotate +0+50 "Comic • Puzzles • Wallpapers" \
  -quality 85 \
  assets/comics/rise-placeholder.jpg

convert -size 600x900 \
  gradient:"$COLOR_PINK"-"$COLOR_PURPLE" \
  -gravity center \
  -fill white \
  -font Arial-Bold \
  -pointsize 48 \
  -annotate +0-100 "AWAKENING" \
  -pointsize 24 \
  -annotate +0+0 "PART 2" \
  -pointsize 16 \
  -annotate +0+50 "Comic • Puzzles • Wallpapers" \
  -quality 85 \
  assets/comics/awakening-placeholder.jpg

convert -size 600x900 \
  gradient:"$COLOR_BLUE"-"$COLOR_GREEN" \
  -gravity center \
  -fill white \
  -font Arial-Bold \
  -pointsize 48 \
  -annotate +0-100 "REVOLUTION" \
  -pointsize 24 \
  -annotate +0+0 "PART 3" \
  -pointsize 16 \
  -annotate +0+50 "Comic • Puzzles • Wallpapers" \
  -quality 85 \
  assets/comics/revolution-placeholder.jpg

convert -size 600x900 \
  gradient:"$COLOR_GREEN"-"$COLOR_BLUE" \
  -gravity center \
  -fill white \
  -font Arial-Bold \
  -pointsize 42 \
  -annotate +0-100 "DIAMOND HEIST" \
  -pointsize 24 \
  -annotate +0+0 "SPECIAL" \
  -pointsize 16 \
  -annotate +0+50 "Comic • Puzzles • Wallpapers" \
  -quality 85 \
  assets/comics/heist-placeholder.jpg

echo "✅ Created 4 comic cover placeholders"

# Puzzle backgrounds (1200x1200)
echo "🧩 Creating puzzle placeholders..."

for i in {1..4}; do
  convert -size 1200x1200 \
    gradient:"$COLOR_PINK"-"$COLOR_PURPLE" \
    -swirl 30 \
    -gravity center \
    -fill white \
    -font Arial-Bold \
    -pointsize 80 \
    -annotate +0+0 "PUZZLE $i" \
    -quality 85 \
    assets/puzzles/${i}-jigsaw-placeholder.jpg
done

echo "✅ Created 4 jigsaw puzzle placeholders"

# Wallpapers (multiple resolutions)
echo "🖼️  Creating wallpaper placeholders..."

RESOLUTIONS=("1920x1080" "2560x1440" "3840x2160")

for i in {1..4}; do
  for res in "${RESOLUTIONS[@]}"; do
    convert -size $res \
      gradient:"$COLOR_BLUE"-"$COLOR_PURPLE" \
      -gravity center \
      -fill white \
      -font Arial-Bold \
      -pointsize 120 \
      -annotate +0-50 "💎" \
      -pointsize 48 \
      -annotate +0+50 "DIAMONDZ PLAYHOUSE" \
      -pointsize 24 \
      -annotate +0+120 "$res" \
      -quality 85 \
      assets/wallpapers/${i}-wallpaper-${res}.jpg
  done
done

echo "✅ Created 12 desktop wallpapers (4 comics × 3 resolutions)"

# Slot machine symbols (256x256)
echo "🎰 Creating slot symbol placeholders..."

# Diamond
convert -size 256x256 xc:transparent \
  -fill "$COLOR_PURPLE" \
  -draw "polygon 128,20 220,128 128,236 36,128" \
  -fill "$COLOR_PINK" \
  -draw "polygon 128,20 128,128 36,128" \
  assets/slot-symbols/diamond.png

# Star
convert -size 256x256 xc:transparent \
  -fill "$COLOR_GREEN" \
  -draw "path 'M 128,20 L 160,100 L 240,110 L 180,170 L 195,250 L 128,210 L 61,250 L 76,170 L 16,110 L 96,100 Z'" \
  assets/slot-symbols/star.png

# Seven
convert -size 256x256 xc:transparent \
  -fill "$COLOR_BLUE" \
  -font Arial-Bold \
  -pointsize 200 \
  -gravity center \
  -annotate +0+0 "7" \
  assets/slot-symbols/seven.png

# Cherry
convert -size 256x256 xc:transparent \
  -fill "#ff0066" \
  -draw "circle 100,140 100,180" \
  -draw "circle 156,140 156,180" \
  -stroke "#006600" \
  -strokewidth 4 \
  -fill none \
  -draw "path 'M 100,100 Q 128,80 156,100'" \
  assets/slot-symbols/cherry.png

# Crown
convert -size 256x256 xc:transparent \
  -fill "$COLOR_PURPLE" \
  -draw "rectangle 40,180 216,220" \
  -draw "polygon 128,60 100,140 60,140 90,90 60,140 40,180 216,180 196,140 226,90 196,140 156,140" \
  assets/slot-symbols/crown.png

echo "✅ Created 5 slot symbol placeholders"

# Summary
echo ""
echo "✨ Placeholder generation complete!"
echo ""
echo "📊 Summary:"
echo "  - 4 comic covers (600×900)"
echo "  - 4 jigsaw puzzles (1200×1200)"
echo "  - 12 desktop wallpapers (3 resolutions each)"
echo "  - 5 slot machine symbols (256×256)"
echo ""
echo "📁 Files saved to:"
echo "  - assets/comics/"
echo "  - assets/puzzles/"
echo "  - assets/wallpapers/"
echo "  - assets/slot-symbols/"
echo ""
echo "🚀 Next steps:"
echo "  1. Review the generated images"
echo "  2. Update backend/routes/comics.js to reference these images"
echo "  3. Replace with your actual artwork as you create it"
echo ""
echo "🎉 Your app now has beautiful placeholder graphics!"
