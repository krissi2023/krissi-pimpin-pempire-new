import React from 'react';

/**
 * Diamond Logo SVG Component
 * Can be used as app logo or icon
 */
export const DiamondLogo = ({ size = 64, color = '#00d4ff', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#9d4edd" />
      </linearGradient>
    </defs>
    <path
      d="M50 5 L75 30 L90 30 L50 95 L10 30 L25 30 Z"
      fill="url(#diamondGradient)"
      stroke="#fff"
      strokeWidth="2"
    />
    <path
      d="M25 30 L50 50 L75 30"
      fill="none"
      stroke="rgba(255,255,255,0.5)"
      strokeWidth="1.5"
    />
  </svg>
);

/**
 * Arcade Machine SVG Icon
 */
export const ArcadeMachineIcon = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 120"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="20" y="10" width="60" height="80" rx="5" fill="#16213e" stroke="#00d4ff" strokeWidth="2" />
    <rect x="25" y="20" width="50" height="35" fill="#000" stroke="#00d4ff" strokeWidth="1" />
    <circle cx="35" cy="70" r="5" fill="#e94560" />
    <circle cx="50" cy="70" r="5" fill="#FFD700" />
    <circle cx="65" cy="70" r="5" fill="#4ade80" />
    <rect x="30" y="90" width="40" height="25" rx="3" fill="#1a1a2e" stroke="#9d4edd" strokeWidth="2" />
  </svg>
);

/**
 * Coin Stack Icon
 */
export const CoinIcon = ({ size = 32, type = 'gold', className = '' }) => {
  const colors = {
    gold: ['#FFD700', '#FFA500'],
    arcade: ['#4ade80', '#22c55e'],
    pb: ['#00d4ff', '#0ea5e9']
  };
  
  const [color1, color2] = colors[type] || colors.gold;
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`coinGradient-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color1} />
          <stop offset="100%" stopColor={color2} />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="40" fill={`url(#coinGradient-${type})`} stroke="#000" strokeWidth="3" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      <text
        x="50"
        y="60"
        textAnchor="middle"
        fontSize="35"
        fontWeight="bold"
        fill="#000"
      >
        {type === 'gold' ? '⭐' : type === 'arcade' ? '🎰' : '💎'}
      </text>
    </svg>
  );
};

/**
 * Puzzle Piece Icon
 */
export const PuzzleIcon = ({ size = 40, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 10 L50 10 L50 0 Q60 0 60 10 Q60 20 50 20 L50 50 L60 50 Q60 60 50 60 Q40 60 40 50 L10 50 Z"
      fill="#9d4edd"
      stroke="#00d4ff"
      strokeWidth="2"
    />
  </svg>
);

/**
 * Loading Spinner with Diamond
 */
export const DiamondSpinner = ({ size = 60, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`spinning ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00d4ff" />
        <stop offset="50%" stopColor="#9d4edd" />
        <stop offset="100%" stopColor="#FFD700" />
      </linearGradient>
    </defs>
    <path
      d="M50 10 L70 30 L50 50 L30 30 Z"
      fill="url(#spinnerGradient)"
      opacity="0.8"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 50 50"
        to="360 50 50"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </path>
    <path
      d="M30 30 L50 50 L30 70 L10 50 Z"
      fill="url(#spinnerGradient)"
      opacity="0.6"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 50 50"
        to="360 50 50"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </path>
    <path
      d="M50 50 L70 70 L50 90 L30 70 Z"
      fill="url(#spinnerGradient)"
      opacity="0.4"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 50 50"
        to="360 50 50"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

/**
 * Star Burst Effect (for wins/rewards)
 */
export const StarBurst = ({ size = 100, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="starGradient">
        <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
        <stop offset="100%" stopColor="#FFA500" stopOpacity="0" />
      </radialGradient>
    </defs>
    {[...Array(12)].map((_, i) => (
      <line
        key={i}
        x1="50"
        y1="50"
        x2="50"
        y2="10"
        stroke="url(#starGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        transform={`rotate(${i * 30} 50 50)`}
      >
        <animate
          attributeName="y2"
          values="10;5;10"
          dur="1s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="1s"
          repeatCount="indefinite"
        />
      </line>
    ))}
    <circle cx="50" cy="50" r="15" fill="#FFD700" opacity="0.8">
      <animate
        attributeName="r"
        values="15;20;15"
        dur="1s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

/**
 * Comic Panel Border
 */
export const ComicPanel = ({ children, className = '' }) => (
  <div className={`comic-panel ${className}`}>
    <svg className="comic-panel-border" viewBox="0 0 100 100" preserveAspectRatio="none">
      <rect
        x="2"
        y="2"
        width="96"
        height="96"
        fill="none"
        stroke="#000"
        strokeWidth="4"
        strokeLinejoin="miter"
      />
      <rect
        x="1"
        y="1"
        width="98"
        height="98"
        fill="none"
        stroke="#FFD700"
        strokeWidth="2"
      />
    </svg>
    <div className="comic-panel-content">
      {children}
    </div>
  </div>
);

/**
 * Neon Sign Text Effect
 */
export const NeonText = ({ text, color = '#00d4ff', size = 48, className = '' }) => (
  <svg
    width="100%"
    height={size * 1.5}
    viewBox={`0 0 ${text.length * size * 0.6} ${size * 1.5}`}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="neonGlow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={size}
      fontWeight="bold"
      fill={color}
      stroke={color}
      strokeWidth="2"
      filter="url(#neonGlow)"
    >
      {text}
    </text>
  </svg>
);

export default {
  DiamondLogo,
  ArcadeMachineIcon,
  CoinIcon,
  PuzzleIcon,
  DiamondSpinner,
  StarBurst,
  ComicPanel,
  NeonText
};
