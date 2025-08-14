import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';
import { useNavigation } from '../hooks/useNavigation';

import { RoleSelector } from '../components/RoleSelector';
import { PermissionGate } from '../components/PermissionGate';
import { useTranslation } from '../hooks/useTranslation';
import { getRoleConfig, UserRole } from '../types';



export const HomeScreen: React.FC = () => {
  const { isDark } = useTheme();
  const { t, language } = useTranslation();
  const { user, currentRole } = useUser();
  const navigation = useNavigation();

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
            <Text className="text-3xl mr-3">{roleConfig.icon}</Text>
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
        </View>

        {/* Role-Based Content */}
        <View className="mb-6">
          <Text className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('roleBasedContent')}
          </Text>

          <PermissionGate permission="canViewAnalytics">
            <View className={`p-6 rounded-3xl mb-6 ${isDark ? 'bg-primary-900/20' : 'bg-primary-50'} shadow-lg`}>
              <Text className={`text-xl font-semibold mb-4 ${isDark ? 'text-primary-300' : 'text-primary-700'}`}>
                📊 {t('analytics')} {t('dashboard')}
              </Text>
              <Text className={`${isDark ? 'text-primary-200' : 'text-primary-600'}`}>
                {t('featureDescriptions.analytics')}
              </Text>
            </View>
          </PermissionGate>

          <PermissionGate permission="canManageUsers">
            <View className={`p-6 rounded-3xl mb-6 ${isDark ? 'bg-error-900/20' : 'bg-error-50'} shadow-lg`}>
              <Text className={`text-xl font-semibold mb-4 ${isDark ? 'text-error-300' : 'text-error-700'}`}>
                👥 {t('userManagement')}
              </Text>
              <Text className={`${isDark ? 'text-error-200' : 'text-error-600'}`}>
                {t('featureDescriptions.userManagement')}
              </Text>
            </View>
          </PermissionGate>

          <PermissionGate permission="canAccessPatientData">
            <View className={`p-6 rounded-3xl mb-6 ${isDark ? 'bg-secondary-900/20' : 'bg-secondary-50'} shadow-lg`}>
              <Text className={`text-xl font-semibold mb-4 ${isDark ? 'text-secondary-300' : 'text-secondary-700'}`}>
                🏥 {t('patientData')}
              </Text>
              <Text className={`${isDark ? 'text-secondary-200' : 'text-secondary-600'}`}>
                {t('featureDescriptions.patientData')}
              </Text>
            </View>
          </PermissionGate>

          <PermissionGate permission="canManageSystem">
            <View className={`p-6 rounded-3xl mb-6 ${isDark ? 'bg-role-user/20' : 'bg-role-user/10'} shadow-lg`}>
              <Text className={`text-xl font-semibold mb-4 ${isDark ? 'text-role-user/80' : 'text-role-user'}`}>
                ⚙️ {t('systemSettings')}
              </Text>
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
                  {language === 'en' ? t('english') : t('finnish')}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <RoleSelector />

        {/* Info Card */}
        <View className={`p-6 rounded-3xl mt-6 ${isDark ? 'bg-primary-900/20' : 'bg-primary-50'}`}>
          <Text className={`text-center ${isDark ? 'text-primary-300' : 'text-primary-700'}`}>
            ✨ {t('settings.info')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
