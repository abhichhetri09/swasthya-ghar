import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../hooks/useTranslation';
import { Icon } from './Icon';
import { navigationService } from '../services/navigation';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundaryClass extends Component<Props & { isDark: boolean; t: (key: string) => string }, State> {
  constructor(props: Props & { isDark: boolean; t: (key: string) => string }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
    
    // Log error to console in development
    if (__DEV__) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    
    // Here you could send error to your error reporting service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    // Safely call navigation - it will only work if navigator is set up
    try {
      navigationService.navigate('Home');
    } catch (error) {
      console.warn('Navigation not available yet:', error);
      // If navigation fails, just reset the error state
    }
  };

  render() {
    const { isDark, t } = this.props;
    
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <ScrollView className="flex-1 px-6 pt-8">
            {/* Error Header */}
            <View className="items-center mb-8">
              <Icon name="error" size={64} className="mb-4" />
              <Text className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('errorBoundary.title')}
              </Text>
              <Text className={`text-base text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('errorBoundary.subtitle')}
              </Text>
            </View>

            {/* Error Details */}
            <View className={`p-6 rounded-3xl mb-6 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <Text className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('errorBoundary.details')}
              </Text>
              
              {__DEV__ && this.state.error && (
                <View className={`p-4 rounded-lg mb-4 ${isDark ? 'bg-red-900/20' : 'bg-red-50'}`}>
                  <Text className={`text-sm font-mono ${isDark ? 'text-red-300' : 'text-red-700'}`}>
                    {this.state.error.toString()}
                  </Text>
                </View>
              )}

              <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('errorBoundary.message')}
              </Text>
            </View>

            {/* Action Buttons */}
            <View className="space-y-4">
              <TouchableOpacity
                onPress={this.handleRetry}
                className={`py-4 rounded-lg ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}
              >
                <Text className="text-white text-center font-semibold text-lg">
                  {t('errorBoundary.retry')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={this.handleGoHome}
                className={`py-4 rounded-lg border-2 ${
                  isDark ? 'border-blue-400 bg-transparent' : 'border-blue-500 bg-transparent'
                }`}
              >
                <Text className={`text-center font-semibold text-lg ${
                  isDark ? 'text-blue-400' : 'text-blue-500'
                }`}>
                  {t('errorBoundary.goHome')}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Contact Support */}
            <View className={`p-6 rounded-3xl mt-6 ${isDark ? 'bg-primary-900/20' : 'bg-primary-50'}`}>
              <View className="flex-row items-center justify-center">
                <Icon name="info" size={20} className="mr-2" />
                <Text className={`text-center ${isDark ? 'text-primary-300' : 'text-primary-700'}`}>
                  {t('errorBoundary.contactSupport')}
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

// Wrapper component to provide context
export const ErrorBoundary: React.FC<Props> = ({ children, fallback }) => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  return (
    <ErrorBoundaryClass isDark={isDark} t={t} fallback={fallback}>
      {children}
    </ErrorBoundaryClass>
  );
};
