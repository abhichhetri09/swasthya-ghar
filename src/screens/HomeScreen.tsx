import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';
import { useNavigation } from '../hooks/useNavigation';
import { navigationService } from '../services/navigation';

import { RoleSelector } from '../components/RoleSelector';
import { PermissionGate } from '../components/PermissionGate';
import { useTranslation } from '../hooks/useTranslation';
import { getRoleConfig, UserRole } from '../types';
import { Icon } from '../components/Icon';
import { IconName } from '../constants/icons';
import { Colors, getAarogyaCareColor } from '../constants/colors';



export const HomeScreen: React.FC = () => {
  const { isDark } = useTheme();
  const { t, language } = useTranslation();
  const { user, currentRole } = useUser();

  const roleConfig = getRoleConfig(currentRole);

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <ScrollView className="flex-1 px-4 pt-4">
        {/* Header */}
        <View className="mb-6">
          <Text className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('welcome')}
          </Text>
          <Text className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('appDescription')}
          </Text>
        </View>

        {/* Current User/Role Info */}
        <View className={`p-6 rounded-3xl mb-6 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <Text className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('currentStatus')}
          </Text>
          <View className="flex-row items-center mb-2">
            <Icon name={roleConfig.icon as IconName} size={32} className="mr-3" />
            <View className="flex-1">
              <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {user ? user.name : t('notLoggedIn')}
              </Text>
              <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {user ? roleConfig.displayName : t('selectRole')}
              </Text>
            </View>
            {user && (
              <View
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: roleConfig.color }}
              />
            )}
          </View>
          
          {/* Sign In/Sign Up Buttons for non-logged in users */}
          {!user && (
            <View className="flex-row space-x-3 mt-4">
              <TouchableOpacity
                onPress={() => navigationService.navigate('SignIn')}
                className={`flex-1 py-3 px-6 rounded-lg ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}
              >
                <Text className="text-white text-center font-semibold">
                  {t('signIn')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigationService.navigate('SignUp')}
                className={`flex-1 py-3 px-6 rounded-lg border-2 ${
                  isDark ? 'border-blue-400 bg-transparent' : 'border-blue-500 bg-transparent'
                }`}
              >
                <Text className={`text-center font-semibold ${
                  isDark ? 'text-blue-400' : 'text-blue-500'
                }`}>
                  {t('signUp')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Role-Based Content */}
        <View className="mb-6">
          <Text className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('roleBasedContent')}
          </Text>

          <PermissionGate permission="canViewAnalytics">
            <View className={`p-6 rounded-3xl mb-6 ${isDark ? 'bg-primary-900/20' : 'bg-primary-50'} shadow-lg`}>
              <View className="flex-row items-center mb-4">
                <Icon name="analytics" size={24} className="mr-2" />
                <Text className={`text-xl font-semibold ${isDark ? 'text-primary-300' : 'text-primary-700'}`}>
                  {t('analytics')}
                </Text>
              </View>
              <Text className={`${isDark ? 'text-primary-200' : 'text-primary-600'}`}>
                {t('featureDescriptions.analytics')}
              </Text>
            </View>
          </PermissionGate>

          <PermissionGate permission="canManageUsers">
            <View className={`p-6 rounded-3xl mb-6 ${isDark ? 'bg-error-900/20' : 'bg-error-50'} shadow-lg`}>
              <View className="flex-row items-center mb-4">
                <Icon name="userManagement" size={24} className="mr-2" />
                <Text className={`text-xl font-semibold ${isDark ? 'text-error-300' : 'text-error-700'}`}>
                  {t('userManagement')}
                </Text>
              </View>
              <Text className={`${isDark ? 'text-error-200' : 'text-error-600'}`}>
                {t('featureDescriptions.userManagement')}
              </Text>
            </View>
          </PermissionGate>

          <PermissionGate permission="canAccessPatientData">
            <View className={`p-6 rounded-3xl mb-6 ${isDark ? 'bg-secondary-900/20' : 'bg-secondary-50'} shadow-lg`}>
              <View className="flex-row items-center mb-4">
                <Icon name="patientData" size={24} className="mr-2" />
                <Text className={`text-xl font-semibold ${isDark ? 'text-secondary-300' : 'text-secondary-700'}`}>
                  {t('patientData')}
                </Text>
              </View>
              <Text className={`${isDark ? 'text-secondary-200' : 'text-secondary-600'}`}>
                {t('featureDescriptions.patientData')}
              </Text>
            </View>
          </PermissionGate>

          <PermissionGate permission="canManageSystem">
            <View className={`p-6 rounded-3xl mb-6 ${isDark ? 'bg-role-user/20' : 'bg-role-user/10'} shadow-lg`}>
              <View className="flex-row items-center mb-4">
                <Icon name="systemSettings" size={24} className="mr-2" />
                <Text className={`text-xl font-semibold ${isDark ? 'text-role-user/80' : 'text-role-user'}`}>
                  {t('systemSettings')}
                </Text>
              </View>
              <Text className={`${isDark ? 'text-role-user/60' : 'text-role-user/80'}`}>
                {t('featureDescriptions.systemSettings')}
              </Text>
            </View>
          </PermissionGate>

          <View className={`p-6 rounded-3xl mb-6 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <Text className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('quickSettings')}
            </Text>
            <View className="flex-row justify-between items-center mb-4">
              <Text className={`text-lg font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('currentTheme')}
              </Text>
              <View className={`px-3 py-1 rounded-full ${isDark ? 'bg-primary-900' : 'bg-primary-100'}`}>
                <Text className={`font-medium ${isDark ? 'text-primary-300' : 'text-primary-700'}`}>
                  {isDark ? t('dark') : t('light')}
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className={`text-lg font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('currentLanguage')}
              </Text>
              <View className={`px-3 py-1 rounded-full ${isDark ? 'bg-secondary-900' : 'bg-secondary-100'}`}>
                <Text className={`font-medium ${isDark ? 'text-secondary-300' : 'text-secondary-700'}`}>
                  {language === 'en' ? t('english') : language === 'fi' ? t('finnish') : language === 'ne' ? t('nepali') : t('english')}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <RoleSelector />

        {/* Error Demo Card */}
        <View className={`p-6 rounded-3xl mb-6 ${isDark ? 'bg-warning-900/20' : 'bg-warning-50'}`}>
          <View className="flex-row items-center mb-4">
            <Icon name="warning" size={24} className="mr-2" />
            <Text className={`text-xl font-semibold ${isDark ? 'text-warning-300' : 'text-warning-700'}`}>
              Error Handling Demo
            </Text>
          </View>
          <Text className={`mb-4 ${isDark ? 'text-warning-200' : 'text-warning-600'}`}>
            Test the error handling system with different types of errors
          </Text>
          <TouchableOpacity
            onPress={() => navigationService.goToErrorDemo()}
            className={`py-3 px-6 rounded-lg ${isDark ? 'bg-warning-600' : 'bg-warning-500'}`}
          >
            <Text className="text-white text-center font-semibold">
              Try Error Demo
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info Card */}
        <View className={`p-6 rounded-3xl mt-6 ${isDark ? 'bg-primary-900/20' : 'bg-primary-50'}`}>
          <View className="flex-row items-center justify-center">
            <Icon name="info" size={20} className="mr-2" />
            <Text className={`text-center ${isDark ? 'text-primary-300' : 'text-primary-700'}`}>
              {t('settings.info')}
            </Text>
          </View>
          <Button title="Go to Error Demo" onPress={() => navigationService.goToErrorDemo()} color={Colors.primary[800]} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
