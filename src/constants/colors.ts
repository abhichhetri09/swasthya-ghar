export const Colors = {
  // AarogyaCare Brand Colors
  
  // Primary Colors
  primary: {
    50: '#e6f4f7',
    100: '#cce9ef',
    200: '#99d3df',
    300: '#66bdcf',
    400: '#33a7bf',
    500: '#007C91', // Cerulean - Main brand color
    600: '#006f82',
    700: '#006273',
    800: '#005564',
    900: '#004855',
  },

  // Secondary Colors
  secondary: {
    50: '#f7fbfa',
    100: '#eff7f4',
    200: '#dfefea',
    300: '#cfe7e0',
    400: '#bfdfd6',
    500: '#D1E8E2', // Mint Green
    600: '#bcd1cc',
    700: '#a7bab6',
    800: '#92a3a0',
    900: '#7d8c8a',
  },

  // Charcoal - Primary text color
  charcoal: {
    50: '#f8f9fa',
    100: '#e9ecef',
    200: '#dee2e6',
    300: '#ced4da',
    400: '#adb5bd',
    500: '#6c757d',
    600: '#495057',
    700: '#343a40',
    800: '#2C3E50', // Charcoal - Primary text color
    900: '#212529',
  },

  // Seasalt - Background color
  seasalt: {
    50: '#ffffff',
    100: '#fefefe',
    200: '#fdfdfd',
    300: '#fcfcfc',
    400: '#fbfbfb',
    500: '#F7F9FA', // Seasalt - Main background
    600: '#f6f8f9',
    700: '#f5f7f8',
    800: '#f4f6f7',
    900: '#f3f5f6',
  },

  // Gold/Amber - Accent color (optional)
  accent: {
    50: '#fffbf0',
    100: '#fef7e0',
    200: '#fdeec1',
    300: '#fce5a2',
    400: '#fbdc83',
    500: '#F5B700', // Gold/Amber - Accent color
    600: '#f4ae00',
    700: '#f3a500',
    800: '#f29c00',
    900: '#f19300',
  },

  // Error Colors (Healthcare-appropriate reds)
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  // Warning Colors (Healthcare-appropriate yellows)
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  // Success Colors (Healthcare-appropriate greens)
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  // Neutral Colors (based on Charcoal)
  neutral: {
    50: '#f8f9fa',
    100: '#e9ecef',
    200: '#dee2e6',
    300: '#ced4da',
    400: '#adb5bd',
    500: '#6c757d',
    600: '#495057',
    700: '#343a40',
    800: '#2C3E50', // Charcoal
    900: '#212529',
  },

  // Gray Colors (for backward compatibility)
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Role-specific Colors (Healthcare-themed)
  roles: {
    admin: '#007C91', // Cerulean
    doctor: '#22c55e', // Success green
    nurse: '#3b82f6', // Blue
    user: '#6b7280', // Neutral gray
  },

  // Status Colors (Healthcare-appropriate)
  status: {
    online: '#22c55e', // Success green
    offline: '#6b7280', // Neutral gray
    busy: '#ef4444', // Error red
    away: '#f59e0b', // Warning yellow
  },

  // Background Colors (using AarogyaCare colors)
  background: {
    light: '#F7F9FA', // Seasalt
    dark: '#2C3E50', // Charcoal
    lightSecondary: '#D1E8E2', // Mint Green
    darkSecondary: '#1a252f', // Darker Charcoal
  },

  // Text Colors (using AarogyaCare colors)
  text: {
    light: {
      primary: '#2C3E50', // Charcoal
      secondary: '#6c757d', // Neutral 500
      tertiary: '#adb5bd', // Neutral 400
      inverse: '#F7F9FA', // Seasalt
    },
    dark: {
      primary: '#F7F9FA', // Seasalt
      secondary: '#D1E8E2', // Mint Green
      tertiary: '#adb5bd', // Neutral 400
      inverse: '#2C3E50', // Charcoal
    },
  },

  // Border Colors (using AarogyaCare colors)
  border: {
    light: '#D1E8E2', // Mint Green
    dark: '#495057', // Charcoal 600
  },

  // Shadow Colors
  shadow: {
    light: 'rgba(44, 62, 80, 0.1)', // Charcoal with opacity
    dark: 'rgba(44, 62, 80, 0.3)', // Charcoal with opacity
  },
} as const;

// Type definitions for better TypeScript support
export type ColorShade = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
export type ColorPalette = keyof typeof Colors;
export type RoleColor = keyof typeof Colors.roles;

// Helper functions
export const getColor = (palette: ColorPalette, shade?: ColorShade): string => {
  if (shade) {
    return Colors[palette][shade as keyof typeof Colors[typeof palette]];
  }
  return Colors[palette] as unknown as string;
};

export const getRoleColor = (role: RoleColor): string => {
  return Colors.roles[role];
};

export const getTextColor = (isDark: boolean, variant: 'primary' | 'secondary' | 'tertiary' | 'inverse' = 'primary'): string => {
  return Colors.text[isDark ? 'dark' : 'light'][variant];
};

export const getBackgroundColor = (isDark: boolean, variant: 'primary' | 'secondary' = 'primary'): string => {
  const key = isDark 
    ? (variant === 'secondary' ? 'darkSecondary' : 'dark')
    : (variant === 'secondary' ? 'lightSecondary' : 'light');
  return Colors.background[key];
};

// AarogyaCare specific helper functions
export const getAarogyaCareColor = {
  cerulean: () => Colors.primary[500], // #007C91
  charcoal: () => Colors.charcoal[800], // #2C3E50
  mintGreen: () => Colors.secondary[500], // #D1E8E2
  seasalt: () => Colors.seasalt[500], // #F7F9FA
  gold: () => Colors.accent[500], // #F5B700
};
