import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';
import { ThemeToggle } from '../components/ThemeToggle';
import { LanguageToggle } from '../components/LanguageToggle';
import { Button } from '../components/Button';
import { ScreenWithHeader } from '../components/ScreenWithHeader';
import { useTranslation } from '../hooks/useTranslation';

interface SettingItemProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const SettingItem: React.FC<SettingItemProps> = ({ title, subtitle, children }) => {
  const { isDark } = useTheme();
  
  return (
    <View className={`p-4 rounded-2xl mb-4  ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <View className="flex-row items-center justify-between">
        <View className="flex-1 mr-4">
          <Text className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </Text>
          <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {subtitle}
          </Text>
        </View>
        {children}
      </View>
    </View>
  );
};

export const SettingsScreen: React.FC = () => {
  const { isDark } = useTheme();
  const { user, logout } = useUser();
  const { t, language } = useTranslation();

  const handleLogout = () => {
    Alert.alert(
      t('logout.confirmTitle'),
      t('logout.confirmMessage'),
      [
        {
          text: t('cancel'),
          style: 'cancel',
        },
        {
          text: t('logout.title'),
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  return (
    <ScreenWithHeader
      title={t('settings.title')}
      subtitle={t('settings.subtitle')}
      scrollable={true}
      padding="medium"
    >

        {/* Theme Toggle */}
        <SettingItem
          title={t('settings.theme.title')}
          subtitle={t('settings.theme.subtitle')}
        >
          <ThemeToggle size={55} />
        </SettingItem>

        {/* Language Toggle */}
        <SettingItem
          title={t('settings.language.title')}
          subtitle={t('settings.language.subtitle')}
        >
          <LanguageToggle size={70} />
        </SettingItem>

        {/* Current Status */}
        <View className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <Text className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('settings.currentStatus')}
          </Text>
          
          <View className="space-y-2">
            <View className="flex-row justify-between items-center">
              <Text className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('settings.theme.current')}
              </Text>
              <Text className={`font-medium ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>
                {isDark ? t('settings.theme.dark') : t('settings.theme.light')}
              </Text>
            </View>
            
            <View className="flex-row justify-between items-center">
              <Text className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('settings.language.current')}
              </Text>
              <Text className={`font-medium ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>
                {language === 'en' ? 'English' : 'Suomi'}
              </Text>
            </View>
          </View>
        </View>

        {/* User Info */}
        {user && (
          <View className={`p-4 rounded-2xl mt-6 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <Text className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('settings.userInfo')}
            </Text>
            
            <View className="space-y-2 mb-4">
              <View className="flex-row justify-between items-center">
                <Text className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('settings.userName')}
                </Text>
                <Text className={`font-medium ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>
                  {user.name}
                </Text>
              </View>
              
              <View className="flex-row justify-between items-center">
                <Text className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('settings.userEmail')}
                </Text>
                <Text className={`font-medium ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>
                  {user.email}
                </Text>
              </View>
              
              <View className="flex-row justify-between items-center">
                <Text className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('settings.userRole')}
                </Text>
                <Text className={`font-medium ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>
                  {user.role}
                </Text>
              </View>
            </View>

            <Button
              title={t('logout.title')}
              onPress={handleLogout}
              variant="danger"
              size="medium"
            />
          </View>
        )}

        {/* Info Card */}
        <View className={`p-4 rounded-2xl mt-6 ${isDark ? 'bg-primary-900/20' : 'bg-primary-50'}`}>
          <Text className={`text-center ${isDark ? 'text-primary-300' : 'text-primary-700'}`}>
            ✨ {t('settings.info')}
          </Text>
        </View>
    </ScreenWithHeader>
  );
};
