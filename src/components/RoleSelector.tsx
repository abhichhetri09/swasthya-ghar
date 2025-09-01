import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { UserRole, ROLE_CONFIGS, getRoleConfig } from '../types';

interface RoleSelectorProps {
  selectedRole: UserRole;
  onRoleSelect: (role: UserRole) => void;
  disabled?: boolean;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  selectedRole,
  onRoleSelect,
  disabled = false,
}) => {
  const { isDark } = useTheme();

  const roles: UserRole[] = ['patient', 'healthcare_professional', 'administrator', 'developer'];

  return (
    <View className="space-y-3">
      <Text className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Select Your Role
      </Text>
      
      {roles.map((role) => {
        const config = getRoleConfig(role);
        const isSelected = selectedRole === role;
        
        return (
          <TouchableOpacity
            key={role}
            onPress={() => !disabled && onRoleSelect(role)}
            disabled={disabled}
            className={`
              p-4 rounded-xl border-2 transition-all
              ${isSelected 
                ? `${isDark ? 'border-primary-400 bg-primary-900/20' : 'border-primary-500 bg-primary-50'}`
                : `${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`
              }
              ${disabled ? 'opacity-50' : 'active:opacity-80'}
            `}
          >
            <View className="flex-row items-center space-x-3">
              {/* Role Icon */}
              <View 
                className={`w-10 h-10 rounded-full items-center justify-center`}
                style={{ backgroundColor: config.color + '20' }}
              >
                <Text className="text-lg font-bold" style={{ color: config.color }}>
                  {config.icon === 'user' ? '👤' : config.icon === 'doctor' ? '👨‍⚕️' : config.icon === 'code' ? '💻' : '⚙️'}
                </Text>
              </View>
              
              {/* Role Info */}
              <View className="flex-1">
                <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {config.displayName}
                </Text>
                <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {config.description}
                </Text>
              </View>
              
              {/* Selection Indicator */}
              {isSelected && (
                <View 
                  className="w-6 h-6 rounded-full items-center justify-center"
                  style={{ backgroundColor: config.color }}
                >
                  <Text className="text-white text-sm">✓</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
