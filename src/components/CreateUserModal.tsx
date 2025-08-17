/**
 * Create User Modal Component
 * 
 * Modal for creating new users with all required fields
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useAppDispatch } from '../store';
import { createUser } from '../store/slices/userSlice';
import { Colors } from '../constants/colors';
import { TextInput as CustomTextInput } from './TextInput';
import { User } from '../types/database';

interface CreateUserModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ 
  visible, 
  onClose, 
  onSuccess 
}) => {
  const dispatch = useAppDispatch();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({
    full_name: '',
    email: '',
    phone: '',
    gender: undefined,
    date_of_birth: '',
    blood_type: undefined,
    address: '',
    allergies: [],
    current_medications: [],
    emergency_contact: '',
    emergency_contact_relationship: '',
    is_active: true,
  });

  const handleSave = async () => {
    // Validate required fields
    if (!formData.full_name?.trim()) {
      Alert.alert('Error', 'Full name is required');
      return;
    }
    if (!formData.email?.trim()) {
      Alert.alert('Error', 'Email is required');
      return;
    }
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    if (!formData.phone?.trim()) {
      Alert.alert('Error', 'Phone number is required');
      return;
    }

    setSaving(true);
    try {
      await dispatch(createUser(formData as Omit<User, 'user_id' | 'created_at' | 'updated_at'>)).unwrap();
      Alert.alert('Success', 'User created successfully!');
      onSuccess();
      handleClose();
    } catch (error: any) {
      // Handle specific error messages from the server
      if (error?.message?.includes('Email already exists')) {
        Alert.alert('Error', 'This email address is already registered. Please use a different email.');
      } else {
        Alert.alert('Error', 'Failed to create user. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setFormData({
      full_name: '',
      email: '',
      phone: '',
      gender: undefined,
      date_of_birth: '',
      blood_type: undefined,
      address: '',
      allergies: [],
      current_medications: [],
      emergency_contact: '',
      emergency_contact_relationship: '',
      is_active: true,
    });
    onClose();
  };

  const updateField = (field: keyof User, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateArrayField = (field: keyof User, value: string) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    updateField(field, array);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Create New User</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.formContainer}>
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            
            <CustomTextInput
              label="Full Name"
              placeholder="Enter full name"
              leftIcon="user"
              required
              value={formData.full_name}
              onChangeText={(value) => updateField('full_name', value)}
            />

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email *</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(value) => updateField('email', value)}
                placeholder="Enter email"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={Colors.charcoal[300]}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone *</Text>
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(value) => updateField('phone', value)}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                placeholderTextColor={Colors.charcoal[300]}
              />
            </View>

                         <View style={styles.inputGroup}>
               <Text style={styles.label}>Gender</Text>
               <TextInput
                 style={styles.input}
                 value={formData.gender || ''}
                 onChangeText={(value) => updateField('gender', value || undefined)}
                 placeholder="Enter gender"
                 placeholderTextColor={Colors.charcoal[300]}
               />
             </View>

             <View style={styles.inputGroup}>
               <Text style={styles.label}>Date of Birth</Text>
               <TextInput
                 style={styles.input}
                 value={formData.date_of_birth || ''}
                 onChangeText={(value) => updateField('date_of_birth', value)}
                 placeholder="YYYY-MM-DD"
                 placeholderTextColor={Colors.charcoal[300]}
               />
             </View>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Medical Information</Text>
            
                         <View style={styles.inputGroup}>
               <Text style={styles.label}>Blood Type</Text>
               <TextInput
                 style={styles.input}
                 value={formData.blood_type || ''}
                 onChangeText={(value) => updateField('blood_type', value || undefined)}
                 placeholder="e.g., A+, B-, O+"
                 placeholderTextColor={Colors.charcoal[300]}
               />
             </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Allergies (comma-separated)</Text>
              <TextInput
                style={styles.input}
                value={formData.allergies?.join(', ') || ''}
                onChangeText={(value) => updateArrayField('allergies', value)}
                placeholder="e.g., Peanuts, Penicillin"
                placeholderTextColor={Colors.charcoal[300]}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Current Medications (comma-separated)</Text>
              <TextInput
                style={styles.input}
                value={formData.current_medications?.join(', ') || ''}
                onChangeText={(value) => updateArrayField('current_medications', value)}
                placeholder="e.g., Aspirin, Vitamin D"
                placeholderTextColor={Colors.charcoal[300]} 
              />
            </View>
          </View> 

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.address}
                onChangeText={(value) => updateField('address', value)}
                placeholder="Enter full address"
                multiline
                numberOfLines={3}
                placeholderTextColor={Colors.charcoal[300]}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Emergency Contact</Text>
              <TextInput
                style={styles.input}
                value={formData.emergency_contact}
                onChangeText={(value) => updateField('emergency_contact', value)}
                placeholder="Name and phone number"
                placeholderTextColor={Colors.charcoal[300]}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Emergency Contact Relationship</Text>
              <TextInput
                style={styles.input}
                value={formData.emergency_contact_relationship}
                onChangeText={(value) => updateField('emergency_contact_relationship', value)}
                placeholder="e.g., Spouse, Parent"
                placeholderTextColor={Colors.charcoal[300]}
                    />
            </View>
          </View>

          <View style={styles.formActions}>
            <TouchableOpacity
              style={[styles.formButton, styles.cancelButton]}
              onPress={handleClose}
              disabled={saving}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.formButton, styles.saveButton]}
              onPress={handleSave}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.saveButtonText}>Create User</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.charcoal[200],
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.charcoal[800],
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    color: Colors.charcoal[600],
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  formSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.charcoal[700],
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.charcoal[700],
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.charcoal[300],
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 40,
  },
  formButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: Colors.charcoal[300],
  },
  saveButton: {
    backgroundColor: Colors.primary[500],
  },
  cancelButtonText: {
    color: Colors.charcoal[700],
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreateUserModal;
