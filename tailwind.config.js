
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // AarogyaCare Brand Colors
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
        // Secondary Colors (Mint Green)
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
        // Error Colors
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
        // Warning Colors
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
        // Success Colors
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
        // Gold/Amber - Accent color
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
        // Role Colors (Healthcare-themed)
        role: {
          admin: '#007C91', // Cerulean
          doctor: '#22c55e', // Success green
          nurse: '#3b82f6', // Blue
          user: '#6b7280', // Neutral gray
        },
      },
    },
  },
  plugins: [],
}