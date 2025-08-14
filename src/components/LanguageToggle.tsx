import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Modal } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
import type { LanguageToggleProps } from '../types';
import type { Language } from '../types';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'ne', name: 'नेपाली', flag: '🇳🇵' },
];

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ size = 60 }) => {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageSelect = (selectedLanguage: Language) => {
    setLanguage(selectedLanguage);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
        className="flex-row items-center justify-center px-3 py-2 rounded-lg border border-gray-300 bg-white"
        style={{ minWidth: size }}
      >
        <Text style={{ fontSize: 20, marginRight: 8 }}>{currentLanguage?.flag}</Text>
        <Text className="text-sm font-medium text-gray-700">{currentLanguage?.name}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-lg p-6 w-80">
            <Text className="text-lg font-semibold mb-4 text-center">
              {t('settings.language.title')}
            </Text>
            
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                onPress={() => handleLanguageSelect(lang.code)}
                className={`flex-row items-center p-3 rounded-lg mb-2 ${
                  language === lang.code ? 'bg-blue-100 border border-blue-300' : 'bg-gray-50'
                }`}
              >
                <Text style={{ fontSize: 24, marginRight: 12 }}>{lang.flag}</Text>
                <Text className={`flex-1 text-base ${
                  language === lang.code ? 'font-semibold text-blue-800' : 'text-gray-700'
                }`}>
                  {lang.name}
                </Text>
                {language === lang.code && (
                  <Text className="text-blue-600 text-lg">✓</Text>
                )}
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="mt-4 p-3 bg-gray-200 rounded-lg"
            >
              <Text className="text-center font-medium text-gray-700">
                {t('cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};
