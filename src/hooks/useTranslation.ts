import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../utils/translations';
import type { TranslationContextType, Language } from '../types';

export const useTranslation = (): TranslationContextType => {
  const { language, isLoading } = useLanguage();
  
  const t = (key: string): string => {
    // If still loading, return the key as fallback
    if (isLoading) {
      return key;
    }
    return getTranslation(key, language);
  };
  
  return { t, language, isLoading };
};
