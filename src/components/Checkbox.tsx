import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { Colors } from '../constants/colors';
import { Icon } from './Icon';

export type CheckboxVariant = 'default' | 'outlined' | 'filled';
export type CheckboxSize = 'small' | 'medium' | 'large';
export type CheckboxState = 'default' | 'error' | 'success' | 'warning';

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onValueChange?: (checked: boolean) => void;
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  state?: CheckboxState;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
  containerStyle?: any;
  labelStyle?: any;
  helperTextStyle?: any;
  leftIcon?: any;
  rightIcon?: any;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  onValueChange,
  variant = 'default',
  size = 'medium',
  state = 'default',
  disabled = false,
  required = false,
  error,
  helperText,
  containerStyle,
  labelStyle,
  helperTextStyle,
  leftIcon,
  rightIcon,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const hasError = error || state === 'error';
  const hasSuccess = state === 'success';
  const hasWarning = state === 'warning';

  const handlePress = () => {
    if (!disabled) {
      onValueChange?.(!checked);
    }
  };

  const getContainerStyles = () => {
    const baseStyles = {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
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

  const getCheckboxStyles = () => {
    const baseStyles: any = {
      borderRadius: 4,
      borderWidth: 2,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
    };

    const sizeStyles = {
      small: { width: 16, height: 16 },
      medium: { width: 20, height: 20 },
      large: { width: 24, height: 24 },
    };

    const variantStyles = {
      default: {
        backgroundColor: checked ? Colors.primary[500] : 'white',
        borderColor: checked ? Colors.primary[500] : Colors.charcoal[300],
      },
      outlined: {
        backgroundColor: 'transparent',
        borderColor: checked ? Colors.primary[500] : Colors.charcoal[300],
      },
      filled: {             
        backgroundColor: checked ? Colors.primary[500] : Colors.seasalt[100],
        borderColor: checked ? Colors.primary[500] : Colors.charcoal[200],
      },
    };

    const stateStyles = {
      default: {},
      error: {
        borderColor: Colors.error[500],
        backgroundColor: hasError && checked ? Colors.error[500] : variantStyles[variant].backgroundColor,
      },
      success: {
        borderColor: Colors.success[500],
        backgroundColor: hasSuccess && checked ? Colors.success[500] : variantStyles[variant].backgroundColor,
      },
      warning: {
        borderColor: Colors.warning[500],
        backgroundColor: hasWarning && checked ? Colors.warning[500] : variantStyles[variant].backgroundColor,
      },
    };

    const disabledStyles = disabled ? {
      backgroundColor: Colors.charcoal[100],
      borderColor: Colors.charcoal[200],
      opacity: 0.6,
    } : {};

    const pressedStyles = isPressed && !disabled ? {
      transform: [{ scale: 0.95 }],
    } : {};

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...stateStyles[state],
      ...disabledStyles,
      ...pressedStyles,
    };
  };

  const getLabelStyles = () => {
    const baseStyles = {
      fontSize: 14,
      fontWeight: '500' as const,
      marginLeft: 12,
      color: Colors.charcoal[700],
      flex: 1,
    };

    const sizeStyles = {
      small: { fontSize: 12 },
      medium: { fontSize: 14 },
      large: { fontSize: 16 },
    };

    const stateStyles = {
      default: { color: Colors.charcoal[700] },
      error: { color: Colors.error[600] },
      success: { color: Colors.success[600] },
      warning: { color: Colors.warning[600] },
    };

    const disabledStyles = disabled ? {
      color: Colors.charcoal[400],
    } : {};

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...stateStyles[state],
      ...disabledStyles,
    };
  };

  const getHelperTextStyles = () => {
    const baseStyles = {
      fontSize: 12,
      marginTop: 4,
      marginLeft: 32,
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
    return Colors.charcoal[400];
  };

  const getCheckIconSize = () => {
    switch (size) {
      case 'small': return 10;
      case 'medium': return 12;
      case 'large': return 16;
      default: return 12;
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'small': return 14;
      case 'medium': return 16;
      case 'large': return 18;
      default: return 16;
    }
  };

  return (
    <View style={[getContainerStyles(), containerStyle]}>
      {leftIcon && (
        <Icon 
          name={leftIcon} 
          size={getIconSize()} 
          color={getIconColor()}
          style={{ marginRight: 8 }}
        />
      )}

      <TouchableOpacity
        style={getCheckboxStyles()}
        onPress={handlePress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {checked && (
          <Icon 
            name="check" 
            size={getCheckIconSize()} 
            color="white"
          />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled}
        style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
        activeOpacity={0.7}
      >
        <Text style={[getLabelStyles(), labelStyle]}>
          {label ? label : ''} {required && <Text style={{ color: Colors.error[500] }}>*</Text>}
        </Text>
      </TouchableOpacity>

      {rightIcon && (
        <Icon 
          name={rightIcon} 
          size={getIconSize()} 
          color={getIconColor()}
          style={{ marginLeft: 8 }}
        />
      )}

      {(error || helperText) && (
        <Text style={[getHelperTextStyles(), helperTextStyle]}>
          {error ? error : helperText ? helperText : ''}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Additional styles can be added here if needed
});
