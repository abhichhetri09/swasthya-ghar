import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  FlatList, 
  StyleSheet,
  ScrollView,
  TextInput
} from 'react-native';
import { Colors } from '../constants/colors';
import { Icon } from './Icon';

export type SelectVariant = 'default' | 'outlined' | 'filled';
export type SelectSize = 'small' | 'medium' | 'large';
export type SelectState = 'default' | 'error' | 'success' | 'warning';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  icon?: any;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string | number;
  onValueChange?: (value: string | number) => void;
  variant?: SelectVariant;
  size?: SelectSize;
  state?: SelectState;
  leftIcon?: any;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  containerStyle?: any;
  labelStyle?: any;
  helperTextStyle?: any;
}

export const Select: React.FC<SelectProps> = ({
  label,
  placeholder,
  options,
  value,
  onValueChange,
  variant = 'default',
  size = 'medium',
  state = 'default',
  leftIcon,
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = false,
  searchable = false,
  multiple = false,
  containerStyle,
  labelStyle,
  helperTextStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const hasError = error || state === 'error';
  const hasSuccess = state === 'success';
  const hasWarning = state === 'warning';

  const selectedOption = options.find(option => option.value === value);
  const filteredOptions = searchable 
    ? options.filter(option => 
            option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

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

  const getSelectContainerStyles = () => {
    const baseStyles: any = {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 8,
      borderWidth: 1,
      minHeight: 48,
    };

    const sizeStyles = {
      small: { paddingVertical: 8, paddingHorizontal: 12, minHeight: 40 },
      medium: { paddingVertical: 12, paddingHorizontal: 16, minHeight: 48 },
      large: { paddingVertical: 16, paddingHorizontal: 20, minHeight: 56 },
    };

    const variantStyles = {
      default: {
        backgroundColor: 'white',
        borderColor: isOpen ? Colors.primary[500] : Colors.charcoal[300],
      },
      outlined: {
        backgroundColor: 'transparent',
        borderColor: isOpen ? Colors.primary[500] : Colors.charcoal[300],
      },
      filled: {
        backgroundColor: Colors.seasalt[100],
        borderColor: isOpen ? Colors.primary[500] : Colors.charcoal[200],
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

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...stateStyles[state],
      ...disabledStyles,
      ...(isOpen && { borderColor: Colors.primary[500] }),
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
    if (isOpen) return Colors.primary[500];
    return Colors.charcoal[400];
  };

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return;
    
    onValueChange?.(option.value);
    setIsOpen(false);
    setSearchQuery('');
  };

  const renderOption = ({ item }: { item: SelectOption }) => (
    <TouchableOpacity
      style={[
        styles.option,
        item.value === value && styles.selectedOption,
        item.disabled && styles.disabledOption,
      ]}
      onPress={() => handleSelect(item)}
      disabled={item.disabled}
      activeOpacity={0.7}
    >
      {item.icon && (
        <Icon 
          name={item.icon} 
          size={16} 
          color={item.value === value ? Colors.primary[500] : Colors.charcoal[400]}
          style={{ marginRight: 8 }}
        />
      )}
      <Text style={[
        styles.optionText,
        item.value === value && styles.selectedOptionText,
        item.disabled && styles.disabledOptionText,
      ]}>
        {item.label}
      </Text>
      {item.value === value && (
        <Icon 
          name="check" 
          size={16} 
          color={Colors.primary[500]}
          style={{ marginLeft: 'auto' }}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[getContainerStyles(), containerStyle]}>
      {label && (
        <Text style={[getLabelStyles(), labelStyle]}>
          {label} {required && <Text style={{ color: Colors.error[500] }}>*</Text>}
        </Text>
      )}

      <TouchableOpacity
        style={[getSelectContainerStyles()]}
        onPress={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {leftIcon && (
          <Icon 
            name={leftIcon} 
            size={20} 
            color={getIconColor()}
            style={{ marginRight: 12 }}
          />
        )}

        <View style={styles.selectContent}>
          {selectedOption ? (
            <Text style={styles.selectedText}>
              {selectedOption.label}
            </Text>
          ) : (
            <Text style={styles.placeholderText}>
              {placeholder ? placeholder : 'selectOption'}
            </Text>
          )}
        </View>

        <Icon 
          name={isOpen ? 'chevronUp' : 'chevronDown'} 
          size={20} 
          color={getIconColor()}
          style={{ marginLeft: 12 }}
        />
      </TouchableOpacity>

      {(error || helperText) && (
        <Text style={[getHelperTextStyles(), helperTextStyle]}>
          {error ? error : helperText ? helperText : ''}
        </Text>
      )}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {label ? label : 'selectOption'}
              </Text>
              <TouchableOpacity
                onPress={() => setIsOpen(false)}
                style={styles.closeButton}
              >
                <Icon name="close" size={20} color={Colors.charcoal[500]} />
              </TouchableOpacity>
            </View>

            {searchable && (
              <View style={styles.searchContainer}>
                <Icon name="search" size={16} color={Colors.charcoal[400]} />
                <TextInput
                  placeholder={'searchOptions'}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={styles.searchInput}
                />
              </View>
            )}

            <FlatList
              data={filteredOptions}
              renderItem={renderOption}
              keyExtractor={(item) => item.value.toString()}
              style={styles.optionsList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  selectContent: {
    flex: 1,
    justifyContent: 'center',
  },
  selectedText: {
    fontSize: 16,
    color: Colors.charcoal[800],
    fontWeight: '500',
  },
  placeholderText: {
    fontSize: 16,
    color: Colors.charcoal[400],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.charcoal[200],
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.charcoal[800],
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.charcoal[200],
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: Colors.charcoal[800],
  },
  optionsList: {
    maxHeight: 300,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.charcoal[100],
  },
  selectedOption: {
    backgroundColor: Colors.primary[50],
  },
  disabledOption: {
    opacity: 0.5,
  },
  optionText: {
    fontSize: 16,
    color: Colors.charcoal[800],
    flex: 1,
  },
  selectedOptionText: {
    color: Colors.primary[600],
    fontWeight: '500',
  },
  disabledOptionText: {
    color: Colors.charcoal[400],
  },
});
