import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../hooks/useTranslation';
import { Icon } from '../components/Icon';
import { navigationService } from '../services/navigation';

interface ErrorScreenProps {
  title?: string;
  subtitle?: string;
  message?: string;
  icon?: string;
  showRetry?: boolean;
  showGoHome?: boolean;
  onRetry?: () => void;
  onGoHome?: () => void;
  errorCode?: string;
  errorType?: 'network' | 'notFound' | 'server' | 'permission' | 'general';
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({
  title,
  subtitle,
  message,
  icon = 'error',
  showRetry = true,
  showGoHome = true,
  onRetry,
  onGoHome,
  errorCode,
  errorType = 'general',
}) => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  // Default content based on error type
  const getDefaultContent = () => {
    switch (errorType) {
      case 'network':
        return {
          title: title || t('errorScreen.network.title'),
          subtitle: subtitle || t('errorScreen.network.subtitle'),
          message: message || t('errorScreen.network.message'),
          icon: 'wifi-off',
        };
      case 'notFound':
        return {
          title: title || t('errorScreen.notFound.title'),
          subtitle: subtitle || t('errorScreen.notFound.subtitle'),
          message: message || t('errorScreen.notFound.message'),
          icon: 'search',
        };
      case 'server':
        return {
          title: title || t('errorScreen.server.title'),
          subtitle: subtitle || t('errorScreen.server.subtitle'),
          message: message || t('errorScreen.server.message'),
          icon: 'server',
        };
      case 'permission':
        return {
          title: title || t('errorScreen.permission.title'),
          subtitle: subtitle || t('errorScreen.permission.subtitle'),
          message: message || t('errorScreen.permission.message'),
          icon: 'lock',
        };
      default:
        return {
          title: title || t('errorScreen.general.title'),
          subtitle: subtitle || t('errorScreen.general.subtitle'),
          message: message || t('errorScreen.general.message'),
          icon: 'error',
        };
    }
  };

  const content = getDefaultContent();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      // Default retry behavior
      navigationService.goBack();
    }
  };

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      // Default go home behavior
      navigationService.navigate('Home');
    }
  };

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <ScrollView className="flex-1 px-6 pt-8">
        {/* Error Header */}
        <View className="items-center mb-8">
          <Icon name={content.icon as any} size={64} className="mb-4" />
          <Text className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {content.title}
          </Text>
          <Text className={`text-base text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {content.subtitle}
          </Text>
          {errorCode && (
            <View className={`mt-2 px-3 py-1 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <Text className={`text-sm font-mono ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {errorCode}
              </Text>
            </View>
          )}
        </View>

        {/* Error Message */}
        <View className={`p-6 rounded-3xl mb-6 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <Text className={`text-base text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {content.message}
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="space-y-4">
          {showRetry && (
            <TouchableOpacity
              onPress={handleRetry}
              className={`py-4 rounded-lg ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}
            >
              <Text className="text-white text-center font-semibold text-lg">
                {t('errorScreen.retry')}
              </Text>
            </TouchableOpacity>
          )}

          {showGoHome && (
            <TouchableOpacity
              onPress={handleGoHome}
              className={`py-4 rounded-lg border-2 ${
                isDark ? 'border-blue-400 bg-transparent' : 'border-blue-500 bg-transparent'
              }`}
            >
              <Text className={`text-center font-semibold text-lg ${
                isDark ? 'text-blue-400' : 'text-blue-500'
              }`}>
                {t('errorScreen.goHome')}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Help Section */}
        <View className={`p-6 rounded-3xl mt-6 ${isDark ? 'bg-primary-900/20' : 'bg-primary-50'}`}>
          <View className="flex-row items-center justify-center mb-2">
            <Icon name="info" size={20} className="mr-2" />
            <Text className={`text-center font-semibold ${isDark ? 'text-primary-300' : 'text-primary-700'}`}>
              {t('errorScreen.needHelp')}
            </Text>
          </View>
          <Text className={`text-center text-sm ${isDark ? 'text-primary-200' : 'text-primary-600'}`}>
            {t('errorScreen.contactSupport')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
