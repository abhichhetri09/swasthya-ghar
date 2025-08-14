import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';
import { getRoleConfig } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import type { ProfileItemProps } from '../types';
import { Icon } from '../components/Icon';
import { IconName } from '../constants/icons';

const ProfileItem: React.FC<ProfileItemProps> = ({ title, value, icon }) => {
  const { isDark } = useTheme();
  
  return (
    <View className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
             <View className="flex-row items-center">
         <Icon name={icon as IconName} size={24} className="mr-3" />
         <View className="flex-1">
          <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {title}
          </Text>
          <Text className={`text-base font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {value}
          </Text>
        </View>
      </View>
    </View>
  );
};

export const ProfileScreen: React.FC = () => {
  const { isDark } = useTheme();
  const { user, logout } = useUser();
  const { t } = useTranslation();

  if (!user) {
    return (
      <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <View className="flex-1 justify-center items-center p-6">
          <Text className={`text-xl font-semibold text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('noUserLoggedIn')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const roleConfig = getRoleConfig(user.role);

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <ScrollView className="flex-1">
        {/* Header */}
        <View className={`p-6 ${isDark ? 'bg-gray-800' : 'bg-white'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <View className="items-center">
            <Icon name={ roleConfig.icon as IconName} size={64} className="mb-4" />
            <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {user.name}
            </Text>
            <Text className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {roleConfig.displayName}
            </Text>     
          </View>
        </View>

        {/* Profile Information */}
        <View className={`${isDark ? 'bg-gray-800' : 'bg-white'} mt-4`}>
                     <ProfileItem
             title={t('profile.email')}
             value={user.email}
             icon="email"
           />
           <ProfileItem
             title={t('profile.role')}
             value={roleConfig.displayName}
             icon="profile"
           />
                       <ProfileItem
              title={t('profile.userId')}
              value={user.id}
              icon="userId"
            />
        </View>

        {/* Role Information */}
        <View className={`${isDark ? 'bg-gray-800' : 'bg-white'} mt-4`}>
          <View className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('profile.roleInfo')}
            </Text>
          </View>
          <View className="p-4">
            <Text className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {roleConfig.description}
            </Text>
          </View>
        </View>

        {/* Logout Button */}
        <View className="p-6">
          <TouchableOpacity
            onPress={logout}
            className="bg-error-600 p-4 rounded-xl"
            activeOpacity={0.8}
          >
            <Text className="text-white text-center font-semibold text-lg">
              {t('logout')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
