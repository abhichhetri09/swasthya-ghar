import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import type { BackButtonProps } from '../types';

export const BackButton: React.FC<BackButtonProps> = ({ onPress, title = 'Back' }) => {
  const { isDark } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}
      activeOpacity={0.7}
    >
      <Text className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
        ← {title}
      </Text>
    </TouchableOpacity>
  );
};