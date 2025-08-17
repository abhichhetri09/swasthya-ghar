import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Colors } from '../constants/colors';

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
          backgroundColor: isDark ? Colors.background.dark : Colors.background.light,
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
