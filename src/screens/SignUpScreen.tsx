import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { Colors } from '../constants/colors';
import { useUser } from '../contexts/UserContext';
import { useTranslation } from '../hooks/useTranslation';
import { Icon } from '../components/Icon';
import { RoleSelector } from '../components/RoleSelector';
import { navigationService } from '../services/navigation';
import { buildApiUrl, API_CONFIG } from '../config/api';
import type { UserRole } from '../types';

export const SignUpScreen: React.FC = () => {
  const { isDark } = useTheme();
  const { login } = useUser();
  const { t } = useTranslation();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

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

    if (password.length < 8) {
      Alert.alert(t('error'), t('passwordTooShort'));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(t('error'), t('passwordsDoNotMatch'));
      return;
    }

    setIsLoading(true);
    
    try {
      // Call the real user creation API
      const signupUrl = buildApiUrl(API_CONFIG.ENDPOINTS.USERS.CREATE);
      console.log('🔗 Making signup request to:', signupUrl);
      
      const response = await fetch(signupUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: name.trim(),
          email: email.trim(),
          password: password,
          role: selectedRole,
          phone: '', // Optional field
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      if (data.success) {
        // Create user object for the app
        const user = {
          id: data.user.user_id.toString(),
          name: data.user.full_name,
          email: data.user.email,
          role: data.user.role,
        };
        
        await login(user);
        // Navigate to main app
        navigationService.navigate('Main');
      } else {
        throw new Error(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      Alert.alert(t('error'), error instanceof Error ? error.message : t('signUpFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = () => {
    navigationService.navigate('SignIn');
  };

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView 
            className="flex-1 px-6 py-6"
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
          >
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
                ref={nameInputRef}
                value={name}
                onChangeText={setName}
                placeholder={t('enterFullName')}
                placeholderTextColor={isDark ? Colors.neutral[400] : Colors.neutral[500]}
                className={`flex-1 text-base ${isDark ? 'text-white' : 'text-gray-900'}`}
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
                blurOnSubmit={false}
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
                ref={emailInputRef}
                value={email}
                onChangeText={setEmail}
                placeholder={t('enterEmail')}
                placeholderTextColor={isDark ? Colors.neutral[400] : Colors.neutral[500]}
                className={`flex-1 text-base ${isDark ? 'text-white' : 'text-gray-900'}`}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                blurOnSubmit={false}
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
                ref={passwordInputRef}
                value={password}
                onChangeText={setPassword}
                placeholder={t('enterPassword')}
                placeholderTextColor={isDark ? Colors.neutral[400] : Colors.neutral[500]}
                className={`flex-1 text-base ${isDark ? 'text-white' : 'text-gray-900'}`}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
                blurOnSubmit={false}
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
                ref={confirmPasswordInputRef}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder={t('confirmPassword')}
                placeholderTextColor={isDark ? Colors.neutral[400] : Colors.neutral[500]}
                className={`flex-1 text-base ${isDark ? 'text-white' : 'text-gray-900'}`}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleSignUp}
                blurOnSubmit={false}
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
            <RoleSelector
              selectedRole={selectedRole}
              onRoleSelect={setSelectedRole}
              disabled={isLoading}
            />
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
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
