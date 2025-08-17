import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  StyleSheet,
  Platform 
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '../constants/colors';
import { Icon } from './Icon';

export type TimePickerVariant = 'default' | 'outlined' | 'filled';
export type TimePickerSize = 'small' | 'medium' | 'large';
export type TimePickerState = 'default' | 'error' | 'success' | 'warning';

interface TimePickerProps {
  label?: string;
  value?: Date;
  onValueChange?: (date: Date) => void;
  placeholder?: string;
  variant?: TimePickerVariant;
  size?: TimePickerSize;
  state?: TimePickerState;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
  containerStyle?: any;
  labelStyle?: any;
  helperTextStyle?: any;
  leftIcon?: any;
  rightIcon?: any;
  minTime?: Date;
  maxTime?: Date;
  format?: '12h' | '24h';
}

export const TimePicker: React.FC<TimePickerProps> = ({
  label,
  value,
  onValueChange,
  placeholder = 'Select time',
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
  minTime,
  maxTime,
  format = '12h',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const hasError = error || state === 'error';
  const hasSuccess = state === 'success';
  const hasWarning = state === 'warning';

  const handlePress = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (Platform.OS === 'android') {
      setIsOpen(false);
    }
    if (selectedTime && onValueChange) {
      onValueChange(selectedTime);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const formatTime = (date: Date) => {
    if (!date) return '';
    
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    if (format === '12h') {
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    } else {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
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

    const disabledStyles = disabled ? {
      backgroundColor: Colors.charcoal[100],
      borderColor: Colors.charcoal[200],
      opacity: 0.6,
    } : {};

    const pressedStyles = isPressed && !disabled ? {
      transform: [{ scale: 0.98 }],
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
      fontWeight: '600' as const,
      marginBottom: 6,
      color: Colors.charcoal[700],
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

  const getInputStyles = () => {
    const baseStyles = {
      flex: 1,
      fontSize: 14,
    };

    const sizeStyles = {
      small: { fontSize: 12 },
      medium: { fontSize: 14 },
      large: { fontSize: 16 },
    };

    // Clear color distinction between placeholder and selected value
    let textColor;
    if (disabled) {
      textColor = Colors.charcoal[400];
    } else if (value) {
      textColor = Colors.charcoal[800]; // Dark color for selected value
    } else {
      textColor = Colors.charcoal[500]; // Medium color for placeholder
    }

    return {
      ...baseStyles,
      ...sizeStyles[size],
      color: textColor,
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
      {label && (
        <Text style={[getLabelStyles(), labelStyle]}>
          {label} {required && <Text style={{ color: Colors.error[500] }}>*</Text>}
        </Text>
      )}

      <TouchableOpacity
        style={getInputContainerStyles()}
        onPress={handlePress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {leftIcon && (
          <Icon
            name={leftIcon}
            size={getIconSize()}
            color={getIconColor()}
            style={{ marginRight: 12 }}
          />
        )}

        <Text style={getInputStyles()}>
          {value ? formatTime(value) : placeholder}
        </Text>

        <Icon
          name="clock"
          size={getIconSize()}
          color={getIconColor()}
          style={{ marginLeft: 12 }}
        />

        {rightIcon && (
          <Icon
            name={rightIcon}
            size={getIconSize()}
            color={getIconColor()}
            style={{ marginLeft: 8 }}
          />
        )}
      </TouchableOpacity>

      {(error || helperText) && (
        <Text style={[getHelperTextStyles(), helperTextStyle]}>
          {error ? error : helperText ? helperText : ''}
        </Text>
      )}

      {isOpen && (
        Platform.OS === 'ios' ? (
          <Modal
            visible={isOpen}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Select Time</Text>
                  <TouchableOpacity
                    onPress={handleCloseModal}
                    style={styles.closeButton}
                  >
                    <Icon name="close" size={20} color={Colors.charcoal[100]} />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.timePickerContainer}>
                  <DateTimePicker
                    value={value || new Date()}
                    mode="time"
                    display="spinner"
                    onChange={handleTimeChange}
                    style={styles.timePicker}
                  />
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    onPress={handleCloseModal}
                    style={styles.cancelButton}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleCloseModal}
                    style={styles.doneButton}
                  >
                    <Text style={styles.doneButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        ) : (
          <DateTimePicker
            value={value || new Date()}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.charcoal[800],
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.charcoal[100],
  },
  closeButton: {
    padding: 4,
  },
  timePickerContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  timePicker: {
    width: '100%',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.charcoal[200],
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: Colors.charcoal[100],
  },
  cancelButtonText: {
    color: Colors.charcoal[600],
    fontSize: 16,
    fontWeight: '600',
  },
  doneButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: Colors.primary[500],
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
