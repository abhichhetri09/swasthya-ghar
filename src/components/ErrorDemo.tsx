import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../hooks/useTranslation';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { navigationService } from '../services/navigation';
import { Icon } from './Icon';

export const ErrorDemo: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const { handleError, handleNetworkError, handleAsyncError } = useErrorHandler();
  const [isLoading, setIsLoading] = useState(false);

  const triggerJavaScriptError = () => {
    throw new Error('This is a test JavaScript error');
  };

  const triggerNetworkError = () => {
    const networkError = {
      code: 'NETWORK_ERROR',
      message: 'Failed to connect to server',
      status: 0,
    };
    handleNetworkError(networkError, 'Network Test');
  };

  const triggerServerError = () => {
    const serverError = {
      status: 500,
      message: 'Internal server error',
    };
    handleNetworkError(serverError, 'Server Test');
  };

  const triggerNotFoundError = () => {
    const notFoundError = {
      status: 404,
      message: 'Resource not found',
    };
    handleNetworkError(notFoundError, 'Not Found Test');
  };

  const triggerPermissionError = () => {
    const permissionError = {
      status: 403,
      message: 'Access denied',
    };
    handleNetworkError(permissionError, 'Permission Test');
  };

  const triggerAsyncError = async () => {
    setIsLoading(true);
    await handleAsyncError(
      async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        throw new Error('Async operation failed');
      },
      'Async Test'
    );
    setIsLoading(false);
  };

  const navigateToErrorScreen = (errorType: string) => {
    navigationService.goToError(errorType);
  };

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <ScrollView className="flex-1 px-6 pt-8">
        {/* Header */}
        <View className="items-center mb-8">
          <Icon name="warning" size={64} className="mb-4" />
          <Text className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Error Handling Demo
          </Text>
          <Text className={`text-base text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Test different types of errors and error handling
          </Text>
        </View>

        {/* Error Types */}
        <View className="space-y-4 mb-6">
          <Text className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            JavaScript Errors
          </Text>
          
          <TouchableOpacity
            onPress={triggerJavaScriptError}
            className={`py-4 rounded-lg ${isDark ? 'bg-red-600' : 'bg-red-500'}`}
          >
            <Text className="text-white text-center font-semibold">
              Trigger JavaScript Error
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={triggerAsyncError}
            disabled={isLoading}
            className={`py-4 rounded-lg ${isLoading ? 'opacity-50' : ''} ${
              isDark ? 'bg-orange-600' : 'bg-orange-500'
            }`}
          >
            <Text className="text-white text-center font-semibold">
              {isLoading ? 'Loading...' : 'Trigger Async Error'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Network Errors */}
        <View className="space-y-4 mb-6">
          <Text className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Network Errors
          </Text>
          
          <TouchableOpacity
            onPress={triggerNetworkError}
            className={`py-4 rounded-lg ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}
          >
            <Text className="text-white text-center font-semibold">
              Network Connection Error
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={triggerServerError}
            className={`py-4 rounded-lg ${isDark ? 'bg-purple-600' : 'bg-purple-500'}`}
          >
            <Text className="text-white text-center font-semibold">
              Server Error (500)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={triggerNotFoundError}
            className={`py-4 rounded-lg ${isDark ? 'bg-yellow-600' : 'bg-yellow-500'}`}
          >
            <Text className="text-white text-center font-semibold">
              Not Found Error (404)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={triggerPermissionError}
            className={`py-4 rounded-lg ${isDark ? 'bg-gray-600' : 'bg-gray-500'}`}
          >
            <Text className="text-white text-center font-semibold">
              Permission Error (403)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Error Screen Navigation */}
        <View className="space-y-4 mb-6">
          <Text className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Navigate to Error Screens
          </Text>
          
          <TouchableOpacity
            onPress={() => navigateToErrorScreen('network')}
            className={`py-4 rounded-lg border-2 ${
              isDark ? 'border-blue-400 bg-transparent' : 'border-blue-500 bg-transparent'
            }`}
          >
            <Text className={`text-center font-semibold ${
              isDark ? 'text-blue-400' : 'text-blue-500'
            }`}>
              Network Error Screen
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigateToErrorScreen('notFound')}
            className={`py-4 rounded-lg border-2 ${
              isDark ? 'border-yellow-400 bg-transparent' : 'border-yellow-500 bg-transparent'
            }`}
          >
            <Text className={`text-center font-semibold ${
              isDark ? 'text-yellow-400' : 'text-yellow-500'
            }`}>
              Not Found Error Screen
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigateToErrorScreen('server')}
            className={`py-4 rounded-lg border-2 ${
              isDark ? 'border-purple-400 bg-transparent' : 'border-purple-500 bg-transparent'
            }`}
          >
            <Text className={`text-center font-semibold ${
              isDark ? 'text-purple-400' : 'text-purple-500'
            }`}>
              Server Error Screen
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigateToErrorScreen('permission')}
            className={`py-4 rounded-lg border-2 ${
              isDark ? 'border-gray-400 bg-transparent' : 'border-gray-500 bg-transparent'
            }`}
          >
            <Text className={`text-center font-semibold ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Permission Error Screen
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info */}
        <View className={`p-6 rounded-3xl ${isDark ? 'bg-primary-900/20' : 'bg-primary-50'}`}>
          <View className="flex-row items-center justify-center">
            <Icon name="info" size={20} className="mr-2" />
            <Text className={`text-center ${isDark ? 'text-primary-300' : 'text-primary-700'}`}>
              This demo shows different error handling scenarios. Try each button to see how errors are handled.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
