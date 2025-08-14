import en from '../locales/en.json';
import fi from '../locales/fi.json';
import type { Language } from '../types';

let currentLanguage: Language = 'en';

const translations = {
  en,
  fi,
};

// Helper function to get nested object properties
const getNestedValue = (obj: any, path: string): string => {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
};

// Get translation for a specific key
export const getTranslation = (key: string, language: Language = currentLanguage): string => {
  const translation = translations[language];
  const value = getNestedValue(translation, key);
  
  if (value === undefined) {
    console.warn(`Translation key "${key}" not found for language "${language}"`);
    return key; // Return the key as fallback
  }
  
  return value;
};

// Shorthand function for getting translation
export const t = (key: string, language: Language = currentLanguage): string => {
  return getTranslation(key, language);
};

// Set the current language globally
export const setCurrentLanguage = (language: Language) => {
  currentLanguage = language;
};

// Get translation using the current language (context-aware)
export const tContext = (key: string): string => {
  return getTranslation(key, currentLanguage);
};
