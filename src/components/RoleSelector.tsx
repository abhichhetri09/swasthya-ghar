import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';
import { getAllRoles, getRoleConfig, UserRole } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { Icon } from './Icon';
import { IconName } from '../constants/icons';

export const RoleSelector: React.FC = () => {
  const { user, login, logout } = useUser();
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const roles = getAllRoles();

  const handleRoleSelect = async (role: UserRole) => {
    const mockUser = {
      id: '1',
      name: `Test ${getRoleConfig(role).displayName}`,
      email: `test.${role}@example.com`,
      role,
      avatar: getRoleConfig(role).icon,
    };
    await login(mockUser);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View className="p-4">
      <Text className={`text-lg font-semibold mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {t('roleSelector')}
      </Text>

      {user ? (
        <View className={`mb-4 p-3 rounded-lg ${isDark ? 'bg-primary-900/30' : 'bg-primary-100'}`}>
          <Text className={`text-center font-medium ${isDark ? 'text-primary-200' : 'text-primary-800'}`}>
            {t('currentUser').replace('{name}', user.name).replace('{role}', getRoleConfig(user.role).displayName)}
          </Text>
          <TouchableOpacity
            onPress={handleLogout}
            className="mt-2 p-2 bg-error-600 rounded-lg"
          >
            <Text className="text-white text-center">{t('logout')}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text className={`text-center mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {t('noUserLoggedInShort')}
        </Text>
      )}

      <ScrollView className="max-h-80">
        {roles.map((roleConfig) => {
          const isSelected = user?.role === roleConfig.role;
          const roleColor = roleConfig.color;

          return (
            <TouchableOpacity
              key={roleConfig.role}
              onPress={() => handleRoleSelect(roleConfig.role)}
              className={`p-4 mb-2 rounded-lg border-2 relative overflow-hidden ${
                isSelected
                  ? 'border-primary-500'
                  : isDark
                    ? 'border-gray-700 bg-gray-800'
                    : 'border-gray-200 bg-white'
              }`}
              style={{
                shadowColor: isSelected ? roleColor : 'transparent',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: isSelected ? 0.3 : 0,
                shadowRadius: 4,
                elevation: isSelected ? 4 : 1,
              }}
            >
              {/* Selected overlay */}
              {isSelected && (
                <View
                  className="absolute inset-0 opacity-10"
                  style={{ backgroundColor: roleColor }}
                />
              )}

              <View className="flex-row items-center relative z-10">
                <Icon name={roleConfig.icon as IconName} size={24} className="mr-3" />
                <View className="flex-1">
                  <Text className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {roleConfig.displayName}
                  </Text>
                  <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {roleConfig.description}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <View
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: roleColor }}
                    />
                    <Text className={`text-xs capitalize ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {roleConfig.role}
                    </Text>
                  </View>
                </View>

                {/* Selected indicator */}
                {isSelected && (
                  <View
                    className="w-6 h-6 rounded-full items-center justify-center"
                    style={{ backgroundColor: roleColor }}
                  >
                    <Text className="text-white text-xs">✓</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
