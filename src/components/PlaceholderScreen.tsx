import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigation } from '../hooks/useNavigation';
import { useTranslation } from '../hooks/useTranslation';
import type { PlaceholderScreenProps } from '../types';
import { Icon } from './Icon';
import { IconName } from '../constants/icons';

export const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({
  title,
  subtitle,
  icon = '🚧',
  description
}) => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation();

  // Use default values with proper language context
  const defaultSubtitle = subtitle || t('comingSoon');
  const defaultDescription = description || t('placeholderDescription');

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <View className="flex-1 justify-center items-center px-6">
        {/* Icon */}
        <Icon name={icon as IconName} size={80} className="mb-6" />

        {/* Title */}
        <Text className={`text-3xl font-bold text-center mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </Text>

        {/* Subtitle */}
        <Text className={`text-lg text-center mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {defaultSubtitle}
        </Text>

        {/* Description */}
        <Text className={`text-base text-center mb-8 leading-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {defaultDescription}
        </Text>

        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className={`px-8 py-4 rounded-2xl ${isDark ? 'bg-primary-600' : 'bg-primary-500'} shadow-lg`}
          activeOpacity={0.8}
        >
          <Text className="text-white font-semibold text-lg">{t('goBack')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
