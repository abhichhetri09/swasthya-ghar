import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, View, Animated } from 'react-native';
import { Colors } from '../constants/colors';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  style?: any;
  textStyle?: any;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
  textStyle,
  ...props
}) => {
  const isDisabled = disabled || loading;

  const getButtonStyles = () => {
    const baseStyles = {
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row' as const,
      ...(fullWidth && { flex: 1 }),
    };

    const sizeStyles = {
      small: { paddingVertical: 8, paddingHorizontal: 12 },
      medium: { paddingVertical: 12, paddingHorizontal: 16 },
      large: { paddingVertical: 16, paddingHorizontal: 20 },
    };

    const variantStyles = {
      primary: {
        backgroundColor: isDisabled ? Colors.charcoal[300] : Colors.primary[500],
        borderWidth: 0,
      },
      secondary: {
        backgroundColor: isDisabled ? Colors.charcoal[200] : Colors.secondary[500],
        borderWidth: 0,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: isDisabled ? Colors.charcoal[300] : Colors.primary[500],
      },
      danger: {
        backgroundColor: isDisabled ? Colors.charcoal[300] : Colors.error[500],
        borderWidth: 0,
      },
      ghost: {
        backgroundColor: 'transparent',
        borderWidth: 0,
      },
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const getTextStyles = () => {
    const baseTextStyles = {
      fontWeight: '600' as const,
      textAlign: 'center' as const,
    };

    const sizeTextStyles = {
      small: { fontSize: 14 },
      medium: { fontSize: 16 },
      large: { fontSize: 18 },
    };

    const variantTextStyles = {
      primary: {
        color: 'white',
      },
      secondary: {
        color: Colors.charcoal[800],
      },
      outline: {
        color: isDisabled ? Colors.charcoal[400] : Colors.primary[500],
      },
      danger: {
        color: 'white',
      },
      ghost: {
        color: isDisabled ? Colors.charcoal[400] : Colors.primary[500],
      },
    };

    return {
      ...baseTextStyles,
      ...sizeTextStyles[size],
      ...variantTextStyles[variant],
    };
  };

  const getIconColor = () => {
    const variantIconColors = {
      primary: 'white',
      secondary: Colors.charcoal[800],
      outline: isDisabled ? Colors.charcoal[400] : Colors.primary[500],
      danger: 'white',
      ghost: isDisabled ? Colors.charcoal[400] : Colors.primary[500],
    };
    return variantIconColors[variant];
  };

  const CircularLoader: React.FC = () => {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      const spinAnimation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      );
      spinAnimation.start();

      return () => spinAnimation.stop();
    }, [spinValue]);

    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <Animated.View style={{
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: getIconColor(),
        borderTopColor: 'transparent',
        marginRight: 8,
        transform: [{ rotate: spin }],
      }} />
    );
  };

  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <CircularLoader />
      ) : (
        leftIcon && (
          <Text style={{ marginRight: 8, color: getIconColor() }}>
            {leftIcon}
          </Text>
        )
      )}
      
      <Text style={[getTextStyles(), textStyle]}>
        {loading ? 'Loading...' : title}
      </Text>
      
      {!loading && rightIcon && (
        <Text style={{ marginLeft: 8, color: getIconColor() }}>
          {rightIcon}
        </Text>
      )}
    </TouchableOpacity>
  );
};
