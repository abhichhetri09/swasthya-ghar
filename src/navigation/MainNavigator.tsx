/**
 * Main Navigator
 * 
 * Handles the main app navigation for authenticated users
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../contexts/ThemeContext';
import { Colors } from '../constants/colors';
import { SCREENS } from '../types';

// Import navigators
import { BottomTabNavigator } from './BottomTabNavigator';

// Import screens
import { ErrorScreen } from '../screens/ErrorScreen';
import { ButtonDemo } from '../components/ButtonDemo';
import UserManagementScreen from '../screens/UserManagementScreen';

const Stack = createStackNavigator();

const MainNavigator: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack.Navigator
        initialRouteName={SCREENS.HOME}
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: isDark ? Colors.background.dark : Colors.background.light },
        }}
      >
        {/* Main Tab Navigator */}
        <Stack.Screen 
          name={SCREENS.HOME} 
          component={BottomTabNavigator}
          options={{ title: 'Main' }}
        />

        {/* Error Screen */}
        <Stack.Screen 
          name={SCREENS.ERROR} 
          component={ErrorScreen}
          options={{ title: 'Error' }}
        />
    
        {/* Test Screen - Button Demo */}
        <Stack.Screen 
          name={SCREENS.TEST} 
          component={ButtonDemo}
          options={{ title: 'Button Demo' }}
        />

        {/* Admin Screens */}
        <Stack.Screen 
          name={SCREENS.USER_MANAGEMENT} 
          component={UserManagementScreen}
          options={{ title: 'User Management' }}
        />

      </Stack.Navigator>
    </>
  );
};

export default MainNavigator;
