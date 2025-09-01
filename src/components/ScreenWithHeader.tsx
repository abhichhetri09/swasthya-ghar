import React from 'react';
import { View, Text } from 'react-native';
import { ScreenWrapper } from './ScreenWrapper';
import { BackButton } from './BackButton';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigation } from '../hooks/useNavigation';

interface ScreenWithHeaderProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  scrollable?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
  backgroundColor?: string;
  refreshControl?: {
    refreshing: boolean;
    onRefresh: () => void;
  };
  contentStyle?: any;
}

export const ScreenWithHeader: React.FC<ScreenWithHeaderProps> = ({
  children,
  title,
  subtitle,
  showBackButton = true,
  onBackPress,
  rightComponent,
  scrollable = false,
  padding = 'medium',
  backgroundColor,
  refreshControl,
  contentStyle,
}) => {
  const { isDark } = useTheme();
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  const Header = () => (
    <View className="mb-6">
      {/* Back Button Row */}
      {showBackButton && (
        <View className="mb-4">
          <BackButton onPress={handleBackPress} />
        </View>
      )}
      
      {/* Title and Subtitle */}
      {(title || subtitle) && (
        <View className="px-2">
          {title && (
            <Text className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {subtitle}
            </Text>
          )}
        </View>
      )}
      
      {/* Right Component */}
      {rightComponent && (
        <View className="absolute top-0 right-0">
          {rightComponent}
        </View>
      )}
    </View>
  );

  return (
    <ScreenWrapper
      scrollable={scrollable}
      padding={padding}
      backgroundColor={backgroundColor}
      refreshControl={refreshControl}
      header={title || showBackButton ? <Header /> : undefined}
      contentStyle={contentStyle}
    >
      {children}
    </ScreenWrapper>
  );
};
