import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';

interface ScreenWrapperProps {
  children: React.ReactNode;
  scrollable?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
  backgroundColor?: string;
  refreshControl?: {
    refreshing: boolean;
    onRefresh: () => void;
  };
  header?: React.ReactNode;
  footer?: React.ReactNode;
  contentStyle?: any;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  scrollable = false,
  padding = 'medium',
  backgroundColor,
  refreshControl,
  header,
  footer,
  contentStyle,
}) => {
  const { isDark } = useTheme();

  // Default background color based on theme
  const defaultBackgroundColor = isDark ? 'bg-gray-800' : 'bg-gray-50';
  const bgColor = backgroundColor || defaultBackgroundColor;

  // Padding classes
  const paddingClasses = {
    none: '',
    small: 'px-3 py-2',
    medium: 'px-4 py-4',
    large: 'px-6 py-6',
  };

  const paddingClass = paddingClasses[padding];

  const Content = () => (
    <View className={`flex-1 ${paddingClass}`} style={contentStyle}>
      {header && (
        <View className="mb-4">
          {header}
        </View>
      )}
      
      {children}
      
      {footer && (
        <View className="mt-4">
          {footer}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className={`flex-1 bg-${isDark ? 'gray-800' : 'gray-50'} ${bgColor}`}>
      {scrollable ? (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            refreshControl ? (
              <RefreshControl
                refreshing={refreshControl.refreshing}
                onRefresh={refreshControl.onRefresh}
                tintColor={isDark ? '#60a5fa' : '#3b82f6'}
              />
            ) : undefined
          }
        >
          <Content />
        </ScrollView>
      ) : (
        <Content />
      )}
    </SafeAreaView>
  );
};
