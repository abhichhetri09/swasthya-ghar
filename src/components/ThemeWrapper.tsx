import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeWrapperProps extends ViewProps {
  children: React.ReactNode;
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ 
  children, 
  style, 
  ...props 
}) => {
  const { isDark } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
          flex: 1,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};
