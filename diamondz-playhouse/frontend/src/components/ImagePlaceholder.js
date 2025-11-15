import React from 'react';
import './ImagePlaceholder.css';

/**
 * Image Placeholder Component
 * Displays elegant placeholders while actual images are being loaded or created
 * 
 * Usage:
 * <ImagePlaceholder type="comic" title="The Rise" />
 * <ImagePlaceholder type="wallpaper" title="Character Art" />
 */
const ImagePlaceholder = ({ 
  type = 'comic', 
  title = 'Coming Soon',
  width,
  height,
  className = '',
  showIcon = true
}) => {
  const dimensions = getDimensions(type, width, height);
  const icon = getIcon(type);
  const gradient = getGradient(type);

  return (
    <div 
      className={`image-placeholder ${type}-placeholder ${className}`}
      style={{ 
        width: dimensions.width, 
        height: dimensions.height,
        background: gradient 
      }}
    >
      <div className="placeholder-content">
        {showIcon && (
          <div className="placeholder-icon">
            {icon}
          </div>
        )}
        <div className="placeholder-title">{title}</div>
        <div className="placeholder-subtitle">Image Coming Soon</div>
      </div>
      
      {/* Decorative elements */}
      <div className="placeholder-corner top-left"></div>
      <div className="placeholder-corner top-right"></div>
      <div className="placeholder-corner bottom-left"></div>
      <div className="placeholder-corner bottom-right"></div>
    </div>
  );
};

// Default dimensions based on type
const getDimensions = (type, customWidth, customHeight) => {
  if (customWidth || customHeight) {
    return {
      width: customWidth || 'auto',
      height: customHeight || 'auto'
    };
  }

  const sizes = {
    comic: { width: '300px', height: '450px' },      // 2:3 ratio (scaled 600x900)
    puzzle: { width: '300px', height: '300px' },     // Square (scaled 1200x1200)
    wallpaper: { width: '400px', height: '225px' },  // 16:9 ratio
    slot: { width: '128px', height: '128px' },       // Square (scaled 256x256)
    icon: { width: '64px', height: '64px' }          // Small square
  };

  return sizes[type] || sizes.comic;
};

// Get gradient for each type
const getGradient = (type) => {
  const gradients = {
    comic: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    puzzle: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    wallpaper: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    slot: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    icon: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  };

  return gradients[type] || gradients.comic;
};

// SVG icons for each type
const getIcon = (type) => {
  const icons = {
    comic: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="8" y="4" width="48" height="56" rx="2" stroke="white" strokeWidth="2"/>
        <path d="M16 12 L48 12" stroke="white" strokeWidth="2"/>
        <path d="M16 20 L48 20" stroke="white" strokeWidth="1" opacity="0.6"/>
        <path d="M16 24 L48 24" stroke="white" strokeWidth="1" opacity="0.6"/>
        <circle cx="32" cy="40" r="8" stroke="white" strokeWidth="2"/>
      </svg>
    ),
    puzzle: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <path d="M8 8 H24 Q28 8 28 12 Q28 16 24 16 H8 V32 Q8 36 12 36 Q16 36 16 32 V16" stroke="white" strokeWidth="2"/>
        <path d="M32 8 H56 V32 Q56 36 52 36 Q48 36 48 32 V16 H32" stroke="white" strokeWidth="2"/>
        <path d="M8 40 V56 H32 V40 Q32 36 36 36 Q40 36 40 40" stroke="white" strokeWidth="2"/>
        <path d="M48 40 V56 H56 V40" stroke="white" strokeWidth="2"/>
      </svg>
    ),
    wallpaper: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="4" y="12" width="56" height="40" rx="2" stroke="white" strokeWidth="2"/>
        <circle cx="20" cy="28" r="6" stroke="white" strokeWidth="2"/>
        <path d="M4 44 L24 32 L36 40 L60 24" stroke="white" strokeWidth="2"/>
      </svg>
    ),
    slot: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <path d="M32 8 L40 24 L58 26 L44 38 L48 56 L32 46 L16 56 L20 38 L6 26 L24 24 Z" 
              stroke="white" strokeWidth="2" fill="white" opacity="0.2"/>
      </svg>
    ),
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="12" y="12" width="40" height="40" rx="4" stroke="white" strokeWidth="2"/>
        <path d="M22 32 L28 38 L42 24" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  };

  return icons[type] || icons.comic;
};

// Specialized placeholder for comic covers
export const ComicCoverPlaceholder = ({ title, comicId }) => {
  return (
    <ImagePlaceholder 
      type="comic" 
      title={title}
      className={`comic-${comicId}`}
    />
  );
};

// Specialized placeholder for puzzles
export const PuzzlePlaceholder = ({ puzzleType }) => {
  const titles = {
    jigsaw: 'Jigsaw Puzzle',
    wordsearch: 'Word Search',
    crossword: 'Crossword'
  };

  return (
    <ImagePlaceholder 
      type="puzzle" 
      title={titles[puzzleType] || 'Puzzle'}
    />
  );
};

// Specialized placeholder for wallpapers
export const WallpaperPlaceholder = ({ resolution, orientation = 'landscape' }) => {
  return (
    <ImagePlaceholder 
      type="wallpaper" 
      title={`${resolution} Wallpaper`}
      className={orientation}
    />
  );
};

// Specialized placeholder for slot symbols
export const SlotSymbolPlaceholder = ({ symbolName }) => {
  return (
    <ImagePlaceholder 
      type="slot" 
      title={symbolName}
      showIcon={false}
    />
  );
};

export default ImagePlaceholder;
