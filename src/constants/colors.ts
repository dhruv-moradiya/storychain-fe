/**
 * Color constants for the StoryChain application
 * Centralized color palette for consistent theming across the app
 */

export const colors = {
  // Hero gradient colors
  hero: {
    gradient: {
      from: '#8da5f3',
      via1: '#b597e6',
      via2: '#e8a5c9',
      via3: '#f3b8a2',
      to: '#fff8e7',
    },
    overlay: {
      white10: 'rgba(255, 255, 255, 0.1)',
      purple5: 'rgba(168, 85, 247, 0.05)',
    },
  },

  // Background colors
  background: {
    cream: '#fff6ea',
    creamLight: '#fff7eb',
    creamBlend: '#fff5e6',
    dark: '#0b0b10',
  },

  // Text colors
  text: {
    primary: '#23255f',
    secondary: '#2a2d66',
    tertiary: '#1b1d4e',
    light: '#f5f5f7',
    darkAccent: '#f6c36a',
    // Opacity variants
    secondaryOpacity75: 'rgba(42, 45, 102, 0.75)',
    secondaryOpacity70: 'rgba(42, 45, 102, 0.70)',
    secondaryOpacity65: 'rgba(42, 45, 102, 0.65)',
  },

  // Brand colors
  brand: {
    pink: {
      500: '#ec4899',
      600: '#db2777',
      400: '#f472b6',
      shadow25: 'rgba(236, 72, 153, 0.25)',
      shadow35: 'rgba(236, 72, 153, 0.35)',
      ring30: 'rgba(236, 72, 153, 0.30)',
    },
    blue: '#6b7cff',
    blueAlt: '#5a6cff',
    orange: '#ff9f68',
  },

  // Opacity variants for cream background
  opacity: {
    cream: {
      95: 'rgba(255, 246, 234, 0.95)',
      90: 'rgba(255, 246, 234, 0.9)',
      85: 'rgba(255, 246, 234, 0.85)',
      80: 'rgba(255, 246, 234, 0.8)',
      75: 'rgba(255, 246, 234, 0.75)',
      70: 'rgba(255, 246, 234, 0.7)',
      60: 'rgba(255, 246, 234, 0.6)',
      50: 'rgba(255, 246, 234, 0.5)',
      40: 'rgba(255, 246, 234, 0.4)',
      30: 'rgba(255, 246, 234, 0.3)',
      20: 'rgba(255, 246, 234, 0.2)',
    },
    creamBlend: {
      60: 'rgba(255, 245, 230, 0.6)',
      50: 'rgba(255, 245, 230, 0.5)',
    },
  },

  // Opacity variants for dark background
  dark: {
    95: 'rgba(11, 11, 16, 0.95)',
    90: 'rgba(11, 11, 16, 0.9)',
    75: 'rgba(11, 11, 16, 0.75)',
    70: 'rgba(11, 11, 16, 0.7)',
    60: 'rgba(11, 11, 16, 0.6)',
    50: 'rgba(11, 11, 16, 0.5)',
    40: 'rgba(11, 11, 16, 0.4)',
  },

  // Opacity variants for white
  white: {
    95: 'rgba(255, 255, 255, 0.95)',
    75: 'rgba(255, 255, 255, 0.75)',
    60: 'rgba(255, 255, 255, 0.6)',
    50: 'rgba(255, 255, 255, 0.5)',
    40: 'rgba(255, 255, 255, 0.4)',
    5: 'rgba(255, 255, 255, 0.05)',
    4: 'rgba(255, 255, 255, 0.04)',
  },
} as const;

// Tailwind CSS class helpers
export const tailwindColors = {
  // Hero gradient
  heroGradient: 'from-[#a8b4f0] via-[#c4b8e8] via-[#dcc5d8] via-[#ecd4c8] to-[#fff5e6]',

  // Backgrounds
  bgCream: 'bg-[#fff6ea]',
  bgCreamLight: 'bg-[#fff7eb]',
  bgDark: 'bg-[#0b0b10]',

  // Text colors
  textPrimary: 'text-[#23255f]',
  textSecondary: 'text-[#2a2d66]',
  textTertiary: 'text-[#1b1d4e]',
  textLight: 'text-[#f5f5f7]',

  // Brand colors
  pink500: '#ec4899',
  blue: '#6b7cff',
  blueAlt: '#5a6cff',

  // Gradient blends
  blendCreamTop: 'from-[#fff6ea] via-[#fff6ea]/80 to-transparent',
  blendCreamBottom: 'from-[#fff6ea] via-[#fff6ea]/80 to-transparent',
} as const;
