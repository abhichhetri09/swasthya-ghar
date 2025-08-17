import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from './Button';
import { Icon } from './Icon';
import { Colors } from '../constants/colors';

export const ButtonDemo: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleLoadingPress = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.seasalt[500] }}>
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: Colors.charcoal[800] }}>
          Button Component Demo
        </Text>

        {/* Variants */}
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 15, color: Colors.charcoal[700] }}>
            Variants
          </Text>
          
          <View style={{ gap: 12 }}>
            <Button title="Primary Button" variant="primary" />
            <Button title="Secondary Button" variant="secondary" />
            <Button title="Outline Button" variant="outline" />
            <Button title="Danger Button" variant="danger" />
            <Button title="Ghost Button" variant="ghost" />
          </View>
        </View>

        {/* Sizes */}
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 15, color: Colors.charcoal[700] }}>
            Sizes
          </Text>
          
          <View style={{ gap: 12 }}>
            <Button title="Small Button" size="small" />
            <Button title="Medium Button" size="medium" />
            <Button title="Large Button" size="large" />
          </View>
        </View>

        {/* With Icons */}
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 15, color: Colors.charcoal[700] }}>
            With Icons
          </Text>
          
          <View style={{ gap: 12 }}>
            <Button 
              title="Add User" 
              leftIcon={<Icon name="add" size={16} />}
            />
            <Button 
              title="Save Changes" 
              rightIcon={<Icon name="check" size={16} />}
              variant="outline"
            />
            <Button 
              title="Delete" 
              leftIcon={<Icon name="trash" size={16} />}
              variant="danger"
            />
          </View>
        </View>

        {/* States */}
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 15, color: Colors.charcoal[700] }}>
            States
          </Text>
          
          <View style={{ gap: 12 }}>
            <Button title="Loading Button" onPress={handleLoadingPress} loading={loading} />
            <Button title="Loading Outline" onPress={handleLoadingPress} loading={loading} variant="outline" />
            <Button title="Loading Danger" onPress={handleLoadingPress} loading={loading} variant="danger" />
            <Button title="Disabled Button" disabled />
            <Button title="Full Width Button" fullWidth />
          </View>
        </View>

        {/* Healthcare Examples */}
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 15, color: Colors.charcoal[700] }}>
            Healthcare Examples
          </Text>
          
          <View style={{ gap: 12 }}>
            <Button 
              title="Book Appointment" 
              leftIcon={<Icon name="calendar" size={16} />}
              variant="primary"
              size="large"
            />
            <Button 
              title="View Medical Records" 
              leftIcon={<Icon name="file" size={16} />}
              variant="outline"
            />
            <Button 
              title="Emergency Contact" 
              leftIcon={<Icon name="phone" size={16} />}
              variant="danger"
            />
            <Button 
              title="Update Profile" 
              leftIcon={<Icon name="edit" size={16} />}
              variant="secondary"
            />
          </View>
        </View>

        {/* Button Groups */}
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 15, color: Colors.charcoal[700] }}>
            Button Groups
          </Text>
          
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Button title="Cancel" variant="outline" style={{ flex: 1 }} />
            <Button title="Save" style={{ flex: 1 }} />
          </View>
          
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
            <Button title="Delete" variant="danger" style={{ flex: 1 }} />
            <Button title="Edit" variant="secondary" style={{ flex: 1 }} />
            <Button title="View" variant="ghost" style={{ flex: 1 }} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
