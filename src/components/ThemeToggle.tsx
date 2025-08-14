import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Animated, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import type { ThemeToggleProps } from '../types';

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ size = 50 }) => {
  const { isDark, toggleTheme } = useTheme();
  const animatedValue = useRef(new Animated.Value(isDark ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: isDark ? 1 : 0,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
  }, [isDark, animatedValue]);

  const rotateAnimation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const scaleAnimation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  });

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      activeOpacity={0.8}
      className="relative"
      style={{ width: size, height: size }}
    >
      <View
        className={`rounded-full border-2 items-center justify-center ${
          isDark 
            ? 'bg-gray-800 border-gray-600' 
            : 'bg-yellow-100 border-yellow-300'
        }`}
        style={{ width: size, height: size }}
      >
        <Animated.View
          style={{
            transform: [{ rotate: rotateAnimation }, { scale: scaleAnimation }],
          }}
          className="absolute"
        >
          {isDark ? (
            // Moon icon
            <View className="items-center justify-center">
              <View className="w-6 h-6 rounded-full bg-gray-300" />
              <View className="absolute w-4 h-4 rounded-full bg-gray-800 -top-1 -right-1" />
            </View>
          ) : (
            // Sun icon
            <View className="items-center justify-center">
              <View className="w-6 h-6 rounded-full bg-yellow-400" />
              <View className="absolute w-1 h-1 rounded-full bg-yellow-600 -top-2" />
              <View className="absolute w-1 h-1 rounded-full bg-yellow-600 -bottom-2" />
              <View className="absolute w-1 h-1 rounded-full bg-yellow-600 -left-2" />
              <View className="absolute w-1 h-1 rounded-full bg-yellow-600 -right-2" />
            </View>
          )}
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};
