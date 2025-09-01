import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Colors } from '../constants/colors';
import { useTranslation } from '../hooks/useTranslation';
import { Button } from '../components/Button';
import { navigationService } from '../services/navigation';
import { SCREENS } from '../types';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { ScreenWithHeader } from '../components/ScreenWithHeader';
export const HomeScreen: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  
  return (
    <ScreenWrapper
      padding="large"
      scrollable={false}
      
      header={<Text className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('welcome')}</Text>}
    >
      
      {/* Header */}
      <View className="mb-6">
       
        <Text className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {t('appDescription')}
        </Text>
        <View className="mt-5 space-y-3">
          <Button 
            title="View Button Demo" 
            onPress={() => navigationService.navigate('Test')} 
            variant="primary"
            size="large"
          />
          <Button 
            title="User Management" 
            onPress={() => navigationService.navigate('UserManagement')} 
            variant="secondary"
            size="large"
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};


