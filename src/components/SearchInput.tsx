import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput as RNTextInput, 
  TouchableOpacity, 
  StyleSheet,
  Animated 
} from 'react-native';
import { Colors } from '../constants/colors';
import { Icon } from './Icon';

export type SearchInputVariant = 'default' | 'outlined' | 'filled';
export type SearchInputSize = 'small' | 'medium' | 'large';
export type SearchInputState = 'default' | 'error' | 'success' | 'warning';

interface SearchInputProps {
  value?: string;
  onValueChange?: (text: string) => void;
  onSearch?: (text: string) => void;
  placeholder?: string;
  variant?: SearchInputVariant;
  size?: SearchInputSize;
  state?: SearchInputState;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  containerStyle?: any;
  inputStyle?: any;
  helperTextStyle?: any;
  leftIcon?: any;
  rightIcon?: any;
  showClearButton?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  onSubmitEditing?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  loading?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value = '',
  onValueChange,
  onSearch,
  placeholder = 'Search...',
  variant = 'default',
  size = 'medium',
  state = 'default',
  disabled = false,
  error,
  helperText,
  containerStyle,
  inputStyle,
  helperTextStyle,
  leftIcon,
  rightIcon,
  showClearButton = true,
  autoFocus = false,
  maxLength,
  keyboardType = 'default',
  returnKeyType = 'search',
  onSubmitEditing,
  onFocus,
  onBlur,
  loading = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const hasError = error || state === 'error';
  const hasSuccess = state === 'success';
  const hasWarning = state === 'warning';

  const handleTextChange = (text: string) => {
    setInputValue(text);
    onValueChange?.(text);
  };

  const handleClear = () => {
    setInputValue('');
    onValueChange?.('');
  };

  const handleSearch = () => {
    if (onSearch && inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  const handleSubmitEditing = () => {
    handleSearch();
    onSubmitEditing?.();
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const getContainerStyles = () => {
    const baseStyles = {
      marginBottom: 12,
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
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      borderRadius: 8,
      borderWidth: 1,
      paddingHorizontal: 12,
    };

    const sizeStyles = {
      small: { 
        paddingVertical: 8,
        minHeight: 36,
      },
      medium: { 
        paddingVertical: 12,
        minHeight: 44,
      },
      large: { 
        paddingVertical: 16,
        minHeight: 52,
      },
    };

    const variantStyles = {
      default: {
        backgroundColor: 'white',
        borderColor: Colors.charcoal[300],
      },
      outlined: {
        backgroundColor: 'transparent',
        borderColor: Colors.charcoal[300],
      },
      filled: {
        backgroundColor: Colors.seasalt[100],
        borderColor: Colors.charcoal[200],
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

    const focusStyles = isFocused ? {
      borderColor: Colors.primary[500],
      borderWidth: 2,
    } : {};

    const disabledStyles = disabled ? {
      backgroundColor: Colors.charcoal[100],
      borderColor: Colors.charcoal[200],
      opacity: 0.6,
    } : {};

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...stateStyles[state],
      ...focusStyles,
      ...disabledStyles,
    };
  };

  const getInputStyles = () => {
    const baseStyles = {
      flex: 1,
      fontSize: 14,
      color: Colors.charcoal[800],
      paddingVertical: 0,
    };

    const sizeStyles = {
      small: { fontSize: 12 },
      medium: { fontSize: 14 },
      large: { fontSize: 16 },
    };

    const disabledStyles = disabled ? {
      color: Colors.charcoal[400],
    } : {};

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...disabledStyles,
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
      <View style={getInputContainerStyles()}>
        {/* Left Icon (Search or Custom) */}
        {(leftIcon || !leftIcon) && (
          <Icon
            name={leftIcon || "search"}
            size={getIconSize()}
            color={getIconColor()}
            style={{ marginRight: 12 }}
          />
        )}

        {/* Input Field */}
        <RNTextInput
          style={[getInputStyles(), inputStyle]}
          value={inputValue}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          placeholderTextColor={Colors.charcoal[400]}
          editable={!disabled}
          autoFocus={autoFocus}
          maxLength={maxLength}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={handleSubmitEditing}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* Loading Indicator */}
        {loading && (
          <View style={{ marginLeft: 8 }}>
            <Animated.View
              style={{
                width: getIconSize(),
                height: getIconSize(),
                borderRadius: getIconSize() / 2,
                borderWidth: 2,
                borderColor: Colors.primary[300],
                borderTopColor: Colors.primary[500],
              }}
            />
          </View>
        )}

        {/* Clear Button */}
        {showClearButton && inputValue.length > 0 && !loading && (
          <TouchableOpacity
            onPress={handleClear}
            style={{ marginLeft: 8, padding: 4 }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Icon
              name="close"
              size={getIconSize()}
              color={Colors.charcoal[400]}
            />
          </TouchableOpacity>
        )}

        {/* Right Icon */}
        {rightIcon && !loading && (
          <Icon
            name={rightIcon}
            size={getIconSize()}
            color={getIconColor()}
            style={{ marginLeft: 8 }}
          />
        )}
      </View>

      {/* Helper Text or Error */}
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
