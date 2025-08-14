import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Animated, View, Text } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import type { LanguageToggleProps } from '../types';

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ size = 60 }) => {
  const { language, setLanguage } = useLanguage();
  const animatedValue = useRef(new Animated.Value(language === 'fi' ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: language === 'fi' ? 1 : 0,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
  }, [language, animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, size - 30],
  });

  const scaleAnimation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  });

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fi' : 'en');
  };

  return (
    <TouchableOpacity
      onPress={toggleLanguage}
      activeOpacity={0.8}
      className="relative"
      style={{ width: size, height: 30 }}
    >
      <View
        className="rounded-full border-2 flex-row items-center px-1"
        style={{ 
          width: size, 
          height: 30,
          backgroundColor: '#f3f4f6',
          borderColor: '#d1d5db'
        }}
      >
        {/* English Flag */}
        <Animated.View
          style={{
            transform: [{ scale: scaleAnimation }],
            opacity: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.5],
            }),
            width: 28,
            height: 26,
          }}
          className="flex-row items-center justify-center"
        >
          <Text style={{ fontSize: 20 }}>🇬🇧</Text>
        </Animated.View>

        {/* Finnish Flag */}
        <Animated.View
          style={{
            transform: [{ scale: scaleAnimation }],
            opacity: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.5, 1],
            }),
            width: 28,
            height: 26,
          }}
          className="flex-row items-center justify-center"
        >
          <Text style={{ fontSize: 20 }}>🇫🇮</Text>
        </Animated.View>

        {/* Sliding indicator */}
        <Animated.View
          style={{
            transform: [{ translateX }],
          }}
          className="absolute w-6 h-6 rounded-full bg-white shadow-sm border border-gray-200"
        />
      </View>
    </TouchableOpacity>
  );
};
