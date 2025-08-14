import React from 'react';
import { View, Text } from 'react-native';
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../hooks/useTranslation';
import type { PermissionGateProps } from '../types';

export const PermissionGate: React.FC<PermissionGateProps> = ({
  permission,
  children,
  fallback = null,
  showAccessDenied = true,
}) => {
  const { hasPermission } = useUser();
  const { isDark } = useTheme();
  const { t } = useTranslation();
  if (hasPermission(permission)) {
    return <>{children}</>;
  }

  if (showAccessDenied) {
    return (null
      // <View className={`p-4 border rounded-lg ${isDark ? 'bg-error-900/20 border-error-700' : 'bg-error-50 border-error-200'}`}>
      //   <Text className={`text-center ${isDark ? 'text-error-300' : 'text-error-600'}`}>
      //     {t('accessDenied')}
      //   </Text>
      // </View>
    );
  }

  return <>{fallback}</>;
};
