import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';
import { useTranslation } from '../hooks/useTranslation';
import { Icon } from '../components/Icon';
import { navigationService } from '../services/navigation';

export const SignInScreen: React.FC = () => {
  const { isDark } = useTheme();
  const { login } = useUser();
  const { t } = useTranslation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(t('error'), t('pleaseFillAllFields'));
      return;
    }

    if (!email.includes('@')) {
      Alert.alert(t('error'), t('pleaseEnterValidEmail'));
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, create a mock user based on email
      const mockUser = {
        id: '1',
        name: email.split('@')[0],
        email: email,
        role: 'user' as const,
      };
      
      await login(mockUser);
      navigationService.navigate('Home');
    } catch (error) {
      Alert.alert(t('error'), t('signInFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    navigationService.navigate('SignUp');
  };

  const handleForgotPassword = () => {
    Alert.alert(t('info'), t('forgotPasswordInfo'));
  };

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <ScrollView className="flex-1 px-6 pt-8">
        {/* Header */}
        <View className="items-center mb-8">
          <Icon name="home" size={64} className="mb-4" />
          <Text className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('welcome')}
          </Text>
          <Text className={`text-base text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('signInToContinue')}
          </Text>
        </View>

        {/* Form */}
        <View className="space-y-4">
          {/* Email Input */}
          <View>
            <Text className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('email')}
            </Text>
            <View className={`flex-row items-center border rounded-lg px-3 py-3 ${
              isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'
            }`}>
              <Icon name="email" size={20} className="mr-3" />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder={t('enterEmail')}
                placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
                className={`flex-1 text-base ${isDark ? 'text-white' : 'text-gray-900'}`}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Password Input */}
          <View>
            <Text className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('password')}
            </Text>
            <View className={`flex-row items-center border rounded-lg px-3 py-3 ${
              isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'
            }`}>
              <Icon name="lock" size={20} className="mr-3" />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder={t('enterPassword')}
                placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
                className={`flex-1 text-base ${isDark ? 'text-white' : 'text-gray-900'}`}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity onPress={handleForgotPassword} className="self-end">
            <Text className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              {t('forgotPassword')}
            </Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity
            onPress={handleSignIn}
            disabled={isLoading}
            className={`py-4 rounded-lg ${isLoading ? 'opacity-50' : ''} ${
              isDark ? 'bg-blue-600' : 'bg-blue-500'
            }`}
          >
            <Text className="text-white text-center font-semibold text-lg">
              {isLoading ? t('signingIn') : t('signIn')}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center my-6">
            <View className={`flex-1 h-px ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`} />
            <Text className={`mx-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {t('or')}
            </Text>
            <View className={`flex-1 h-px ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`} />
          </View>

          {/* Sign Up Link */}
          <View className="items-center">
            <Text className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('dontHaveAccount')}{' '}
              <TouchableOpacity onPress={handleSignUp}>
                <Text className={`font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {t('signUp')}
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
