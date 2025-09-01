import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { ScreenWrapper } from './ScreenWrapper';
import { ScreenWithHeader } from './ScreenWithHeader';
import { useTranslation } from '../hooks/useTranslation';

// Example 1: Basic ScreenWrapper usage
export const BasicScreenExample: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <ScreenWrapper padding="large">
      <Text className="text-2xl font-bold mb-4">Basic Screen</Text>
      <Text className="text-gray-600 mb-4">
        This is a basic screen with SafeAreaView and padding.
      </Text>
    </ScreenWrapper>
  );
};

// Example 2: ScreenWrapper with scrollable content
export const ScrollableScreenExample: React.FC = () => {
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <ScreenWrapper
      scrollable={true}
      padding="medium"
      refreshControl={{
        refreshing,
        onRefresh,
      }}
    >
      <Text className="text-2xl font-bold mb-4">Scrollable Screen</Text>
      {Array.from({ length: 20 }).map((_, index) => (
        <View key={index} className="p-4 mb-2 bg-white rounded-lg">
          <Text>Item {index + 1}</Text>
        </View>
      ))}
    </ScreenWrapper>
  );
};

// Example 3: ScreenWithHeader usage
export const HeaderScreenExample: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <ScreenWithHeader
      title="Settings"
      subtitle="Manage your app preferences"
      scrollable={true}
      rightComponent={
        <Button title="Save" onPress={() => console.log('Save pressed')} />
      }
    >
      <View className="space-y-4">
        <View className="p-4 bg-white rounded-lg">
          <Text className="font-semibold">Theme</Text>
          <Text className="text-gray-600">Choose your preferred theme</Text>
        </View>
        
        <View className="p-4 bg-white rounded-lg">
          <Text className="font-semibold">Language</Text>
          <Text className="text-gray-600">Select your language</Text>
        </View>
        
        <View className="p-4 bg-white rounded-lg">
          <Text className="font-semibold">Notifications</Text>
          <Text className="text-gray-600">Manage notification preferences</Text>
        </View>
      </View>
    </ScreenWithHeader>
  );
};

// Example 4: ScreenWithHeader without back button
export const ModalScreenExample: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <ScreenWithHeader
      title="Modal Screen"
      subtitle="This screen has no back button"
      showBackButton={false}
      rightComponent={
        <Button title="Close" onPress={() => console.log('Close pressed')} />
      }
    >
      <Text className="text-center text-gray-600">
        This is a modal-style screen without a back button.
      </Text>
    </ScreenWithHeader>
  );
};
