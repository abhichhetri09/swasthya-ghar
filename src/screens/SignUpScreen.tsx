import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';
import { useTranslation } from '../hooks/useTranslation';
import { Icon } from '../components/Icon';
import { navigationService } from '../services/navigation';
import type { UserRole } from '../types';

export const SignUpScreen: React.FC = () => {
  const { isDark } = useTheme();
  const { login } = useUser();
  const { t } = useTranslation();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const roles: { value: UserRole; label: string; icon: string }[] = [
    { value: 'user', label: t('roleUser'), icon: 'user' },
    { value: 'doctor', label: t('roleDoctor'), icon: 'doctor' },
    { value: 'nurse', label: t('roleNurse'), icon: 'nurse' },
    { value: 'admin', label: t('roleAdmin'), icon: 'admin' },
  ];

  const handleSignUp = async () => {
    // Validation
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert(t('error'), t('pleaseFillAllFields'));
      return;
    }

    if (!email.includes('@')) {
      Alert.alert(t('error'), t('pleaseEnterValidEmail'));
      return;
    }

    if (password.length < 6) {
      Alert.alert(t('error'), t('passwordTooShort'));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(t('error'), t('passwordsDoNotMatch'));
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock user
      const mockUser = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.trim(),
        role: selectedRole,
      };
      
      await login(mockUser);
      navigationService.navigate('Home');
    } catch (error) {
      Alert.alert(t('error'), t('signUpFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = () => {
    navigationService.navigate('SignIn');
  };

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <ScrollView className="flex-1 px-6 pt-8">
        {/* Header */}
        <View className="items-center mb-8">
          <Icon name="add" size={64} className="mb-4" />
          <Text className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('createAccount')}
          </Text>
          <Text className={`text-base text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('signUpDescription')}
          </Text>
        </View>

        {/* Form */}
        <View className="space-y-4">
          {/* Name Input */}
          <View>
            <Text className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('fullName')}
            </Text>
            <View className={`flex-row items-center border rounded-lg px-3 py-3 ${
              isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'
            }`}>
              <Icon name="user" size={20} className="mr-3" />
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder={t('enterFullName')}
                placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
                className={`flex-1 text-base ${isDark ? 'text-white' : 'text-gray-900'}`}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>
          </View>

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

          {/* Confirm Password Input */}
          <View>
            <Text className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('confirmPassword')}
            </Text>
            <View className={`flex-row items-center border rounded-lg px-3 py-3 ${
              isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'
            }`}>
              <Icon name="lock" size={20} className="mr-3" />
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder={t('confirmPassword')}
                placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
                className={`flex-1 text-base ${isDark ? 'text-white' : 'text-gray-900'}`}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Icon name={showConfirmPassword ? 'eye-off' : 'eye'} size={20} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Role Selection */}
          <View>
            <Text className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('selectRole')}
            </Text>
            <View className="space-y-2">
              {roles.map((role) => (
                <TouchableOpacity
                  key={role.value}
                  onPress={() => setSelectedRole(role.value)}
                  className={`flex-row items-center p-3 rounded-lg border ${
                    selectedRole === role.value
                      ? isDark
                        ? 'bg-blue-900 border-blue-500'
                        : 'bg-blue-50 border-blue-500'
                      : isDark
                        ? 'bg-gray-800 border-gray-600'
                        : 'bg-white border-gray-300'
                  }`}
                >
                  <Icon name={role.icon as any} size={24} className="mr-3" />
                  <Text className={`flex-1 text-base ${
                    selectedRole === role.value
                      ? isDark ? 'text-blue-300' : 'text-blue-700'
                      : isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {role.label}
                  </Text>
                  {selectedRole === role.value && (
                    <Icon name="check" size={20} className="text-blue-500" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleSignUp}
            disabled={isLoading}
            className={`py-4 rounded-lg ${isLoading ? 'opacity-50' : ''} ${
              isDark ? 'bg-blue-600' : 'bg-blue-500'
            }`}
          >
            <Text className="text-white text-center font-semibold text-lg">
              {isLoading ? t('creatingAccount') : t('signUp')}
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

          {/* Sign In Link */}
          <View className="items-center">
            <Text className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('alreadyHaveAccount')}{' '}
              <TouchableOpacity onPress={handleSignIn}>
                <Text className={`font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {t('signIn')}
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
