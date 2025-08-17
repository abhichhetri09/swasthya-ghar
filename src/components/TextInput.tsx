import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput as RNTextInput, 
  TextInputProps as RNTextInputProps,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { Colors } from '../constants/colors';
import { Icon } from './Icon';

export type TextInputVariant = 'default' | 'outlined' | 'filled';
export type TextInputSize = 'small' | 'medium' | 'large';
export type TextInputState = 'default' | 'error' | 'success' | 'warning';

interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  label?: string;
  placeholder?: string;
  variant?: TextInputVariant;       
  size?: TextInputSize;
  state?: TextInputState;
  leftIcon?: any;
  rightIcon?: any;
  onRightIconPress?: () => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
  containerStyle?: any;
  inputStyle?: any;
  labelStyle?: any;
  helperTextStyle?: any;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  variant = 'default',
  size = 'medium',
  state = 'default',
  leftIcon,
  rightIcon,
  onRightIconPress,
  error,
  helperText,
  required = false,
  fullWidth = false,
  containerStyle,
  inputStyle,
  labelStyle,
  helperTextStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = props.secureTextEntry;
  const hasError = error || state === 'error';
  const hasSuccess = state === 'success';
  const hasWarning = state === 'warning';

  const getContainerStyles = () => {
    const baseStyles = {
      ...(fullWidth && { flex: 1 }),
    };

    const sizeStyles = {
      small: { marginBottom: 8 },
      medium: { marginBottom: 12 },
      large: { marginBottom: 16 },
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
    };
  };

  const getInputContainerStyles = () => {
    const baseStyles: any = {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 8,
      borderWidth: 1,
    };

    const sizeStyles = {
      small: { paddingVertical: 8, paddingHorizontal: 12 },
      medium: { paddingVertical: 12, paddingHorizontal: 16 },
      large: { paddingVertical: 16, paddingHorizontal: 20 },
    };

    const variantStyles = {
      default: {
        backgroundColor: 'white',
        borderColor: isFocused ? Colors.primary[500] : Colors.charcoal[300],
      },
      outlined: {
        backgroundColor: 'transparent',
        borderColor: isFocused ? Colors.primary[500] : Colors.charcoal[300],
      },
      filled: {
        backgroundColor: Colors.seasalt[100],
        borderColor: isFocused ? Colors.primary[500] : Colors.charcoal[200],
      },
    };

    const stateStyles = {
      default: {},
      error: {
        borderColor: Colors.error[500],
        backgroundColor: hasError ? Colors.error[50] : variantStyles[variant].backgroundColor,
      },
      success: {
        borderColor: Colors.success[500],
        backgroundColor: hasSuccess ? Colors.success[50] : variantStyles[variant].backgroundColor,
      },
      warning: {
        borderColor: Colors.warning[500],
        backgroundColor: hasWarning ? Colors.warning[50] : variantStyles[variant].backgroundColor,
      },
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...stateStyles[state],
      ...(isFocused && { borderColor: Colors.primary[500] }),
    };
  };

  const getInputStyles = () => {
    const baseStyles = {
      flex: 1,
      fontSize: 16,
      color: Colors.charcoal[800],
    };

    const sizeStyles = {
      small: { fontSize: 14 },
      medium: { fontSize: 16 },
      large: { fontSize: 18 },
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
    };
  };

  const getLabelStyles = () => {
    const baseStyles = {
      fontSize: 14,
      fontWeight: '500',
      marginBottom: 6,
      color: Colors.charcoal[700],
    };

    const stateStyles = {
      default: { color: Colors.charcoal[700] },
      error: { color: Colors.error[600] },
      success: { color: Colors.success[600] },
      warning: { color: Colors.warning[600] },
    };

    return {
      ...baseStyles,
      ...stateStyles[state],
    };
  };

  const getHelperTextStyles = () => {
    const baseStyles = {
      fontSize: 12,
      marginTop: 4,
    };

    const stateStyles = {
      default: { color: Colors.charcoal[500] },
      error: { color: Colors.error[500] },
      success: { color: Colors.success[500] },
      warning: { color: Colors.warning[500] },
    };

    return {
      ...baseStyles,
      ...stateStyles[state],
    };
  };

  const getIconColor = () => {
    if (hasError) return Colors.error[500];
    if (hasSuccess) return Colors.success[500];
    if (hasWarning) return Colors.warning[500];
    if (isFocused) return Colors.primary[500];
    return Colors.charcoal[400];
  };

  const handleFocus = (e: any) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const handleRightIconPress = () => {
    if (isPassword) {
      setShowPassword(!showPassword);
    } else {
      onRightIconPress?.();
    }
  };

  const getRightIcon = () => {
    if (isPassword) {
      return showPassword ? 'eye-off' : 'eye';
    }
    return rightIcon;
  };

  const getSecureTextEntry = () => {
    if (isPassword) {
      return !showPassword;
    }
    return props.secureTextEntry;
  };

  const shouldShowPasswordToggle = () => {
    return isPassword || props.secureTextEntry;
  };

  return (
    <View style={[getContainerStyles(), containerStyle]}>
      {label && (
        <Text style={[getLabelStyles(), labelStyle]}>
          {label} {required && <Text style={{ color: Colors.error[500] }}>*</Text>}
        </Text>
      )}

      <View style={[getInputContainerStyles()]}>
        {leftIcon && (
          <Icon 
            name={leftIcon} 
            size={20} 
            color={getIconColor()}
            style={{ marginRight: 12 }}
          />
        )}

        <RNTextInput
          style={[getInputStyles(), inputStyle]}
          placeholder={placeholder ? placeholder : undefined}
          placeholderTextColor={Colors.charcoal[400]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={getSecureTextEntry()}
          {...props}
        />
    
        {(rightIcon || isPassword) && (
          <TouchableOpacity
            onPress={handleRightIconPress}
            style={{ marginLeft: 12 }}
            activeOpacity={0.7}
          >
            <Icon 
              name={getRightIcon()} 
              size={20} 
              color={getIconColor()}
            />
          </TouchableOpacity>
        )}
      </View>

      {(error || helperText) && (
        <Text style={[getHelperTextStyles(), helperTextStyle]}>
          {error ? error : helperText ? helperText : ''}
        </Text>
      )}
    </View>
  );
};
