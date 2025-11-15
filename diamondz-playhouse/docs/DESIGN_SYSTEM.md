# 🎨 Diamondz Playhouse Design System

## Brand Colors

### Primary Colors
```css
--primary-gold: #FFD700       /* Gold accents, premium elements */
--diamond-blue: #00d4ff       /* Primary brand color, CTAs */
--arcade-purple: #9d4edd      /* Arcade theme, secondary actions */
--dark-bg: #1a1a2e            /* Main background */
--card-bg: #16213e             /* Card backgrounds */
--accent: #e94560              /* Alert, special offers */
```

### Success/Rewards
```css
--success-green: #4ade80      /* Arcade credits, wins */
--reward-gold: #FFD700         /* Gold points */
--reward-diamond: #00d4ff      /* PB points */
```

### Status Colors
```css
--error: #ef4444
--warning: #f59e0b
--info: #3b82f6
--success: #10b981
```

## Typography

### Fonts
- **Primary**: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif
- **Headings**: Bold, gradient text effects
- **Body**: Regular, 16px base size

### Font Sizes
```css
--text-xs: 0.75rem    /* 12px */
--text-sm: 0.875rem   /* 14px */
--text-base: 1rem     /* 16px */
--text-lg: 1.125rem   /* 18px */
--text-xl: 1.25rem    /* 20px */
--text-2xl: 1.5rem    /* 24px */
--text-3xl: 1.875rem  /* 30px */
--text-4xl: 2.25rem   /* 36px */
--text-5xl: 3rem      /* 48px */
```

## Spacing System
```css
--space-1: 0.25rem    /* 4px */
--space-2: 0.5rem     /* 8px */
--space-3: 0.75rem    /* 12px */
--space-4: 1rem       /* 16px */
--space-5: 1.25rem    /* 20px */
--space-6: 1.5rem     /* 24px */
--space-8: 2rem       /* 32px */
--space-10: 2.5rem    /* 40px */
--space-12: 3rem      /* 48px */
--space-16: 4rem      /* 64px */
```

## Border Radius
```css
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 12px
--radius-xl: 16px
--radius-2xl: 20px
--radius-full: 9999px
```

## Shadows
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.2)
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.3)
--shadow-neon: 0 0 20px rgba(0, 212, 255, 0.5)
--shadow-gold: 0 0 20px rgba(255, 215, 0, 0.5)
```

## Component Styles

### Buttons
- **Primary**: Gold gradient, black text
- **Secondary**: Purple gradient, white text
- **Arcade**: Neon blue with glow effect
- **Sizes**: Small (32px), Medium (40px), Large (48px)
- **States**: Hover (lift + glow), Active (press), Disabled (opacity 0.5)

### Cards
- Background: Dark blue (#16213e)
- Border radius: 12px
- Padding: 20px
- Shadow: Medium on default, Large on hover
- Transition: 0.3s ease

### Inputs
- Background: Transparent with border
- Border: 2px solid rgba(255, 255, 255, 0.2)
- Focus: Diamond blue border with glow
- Height: 48px
- Padding: 12px 16px

### Badges
- Small: 6px 12px padding, 15px radius
- Medium: 8px 16px padding, 18px radius
- Colors: Match currency/reward type

## Animation Guidelines

### Timing Functions
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1)
--ease-out: cubic-bezier(0, 0, 0.2, 1)
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
```

### Durations
- **Fast**: 150ms (micro-interactions)
- **Medium**: 300ms (standard transitions)
- **Slow**: 500ms (complex animations)

### Effects
- **Hover**: translateY(-2px) + shadow increase
- **Click**: scale(0.95)
- **Success**: Bounce animation
- **Neon**: Flicker/pulse effect

## Icon System

### Currencies
- 🎰 Arcade Credits (green)
- ⭐ Gold Points (gold)
- 💎 PB Points (blue)
- 🪙 Generic coins

### Features
- 📖 Comics
- 🧩 Puzzles
- 🖼️ Wallpapers
- 🎁 Rewards/Bonuses
- 🏆 Achievements
- 🔥 Streaks

### Actions
- ▶️ Play
- 🛒 Purchase
- ⬇️ Download
- ✅ Success
- ❌ Error/Cancel

## Responsive Breakpoints
```css
/* Mobile */
@media (max-width: 640px)

/* Tablet */
@media (max-width: 768px)

/* Desktop */
@media (max-width: 1024px)

/* Large Desktop */
@media (max-width: 1280px)
```

## Arcade Theme Specifics

### Neon Effects
- Text shadow: Multiple layers for glow
- Animation: Subtle flicker (2s infinite)
- Colors: Bright cyan, magenta, yellow

### Slot Machine Style
- Reels: Vertical gradient backgrounds
- Symbols: Large emoji or custom icons
- Win animations: Flash + scale + particles

### Casino Aesthetic
- Dark backgrounds (creates contrast)
- Bright accent colors
- Gold for premium/wins
- Purple for mystery/special

## Comic Book Style

### Panel Layouts
- Grid system for comic pages
- Speech bubbles with tails
- Action lines for emphasis
- Bold outlines (2-3px)

### Color Pop
- Vibrant, saturated colors
- High contrast between elements
- Halftone dot patterns (optional)
- Bold typography

## Best Practices

### Do's ✅
- Use consistent spacing multipliers
- Maintain color contrast (WCAG AA)
- Animate performance-friendly properties (transform, opacity)
- Use semantic color names
- Keep animations under 500ms
- Provide hover states for interactive elements

### Don'ts ❌
- Don't use more than 3 font sizes on one screen
- Don't animate width/height (use transform instead)
- Don't use pure white (#FFF) on dark backgrounds
- Don't mix different border radius values on same component
- Don't use more than 3 animation effects simultaneously

## Asset Requirements

### Comic Covers
- **Format**: JPG or PNG
- **Dimensions**: 600x900px (2:3 ratio)
- **File size**: Under 500KB
- **Quality**: High resolution, sharp details

### Wallpapers
- **Desktop**: 1920x1080, 2560x1440, 3840x2160
- **Mobile**: 1080x1920, 1440x2960
- **Format**: JPG (85% quality)
- **File size**: Under 2MB per image

### Puzzle Images
- **Dimensions**: 1200x1200px (square)
- **Format**: JPG
- **File size**: Under 1MB
- **Content**: Clear, recognizable imagery

### Icons/Symbols
- **Format**: SVG (vector) preferred, or PNG
- **Dimensions**: 64x64px, 128x128px, 256x256px
- **Style**: Consistent stroke width, rounded corners

### Slot Machine Symbols
- **Dimensions**: 128x128px or 256x256px
- **Format**: PNG with transparency
- **Style**: Bold, high-contrast, recognizable
- **Count**: 5-8 unique symbols per theme

---

**Tools Recommended:**
- **Design**: Figma, Adobe XD, Sketch
- **Illustration**: Adobe Illustrator, Procreate
- **Photo Editing**: Photoshop, GIMP, Photopea
- **Animation**: After Effects, Lottie
- **Icons**: Heroicons, Font Awesome, custom SVG
