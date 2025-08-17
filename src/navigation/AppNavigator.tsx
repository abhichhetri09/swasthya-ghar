import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../contexts/ThemeContext';
import { Colors } from '../constants/colors';
import { navigationService } from '../services/navigation';
import type { RootStackParamList } from '../types';
import { SCREENS } from '../types';

// Import navigators
import { BottomTabNavigator } from './BottomTabNavigator';

// Import detailed screens
import { PlaceholderScreen } from '../components/PlaceholderScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { ErrorScreen } from '../screens/ErrorScreen';
import { ButtonDemo } from '../components/ButtonDemo';


const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { isDark } = useTheme();
  const navigationRef = useRef<any>(null);

  React.useEffect(() => {
    if (navigationRef.current) {
      navigationService.setNavigator(navigationRef.current);
    } 
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
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

        {/* Authentication Screens */}
        <Stack.Screen 
          name={SCREENS.SIGN_IN} 
          component={SignInScreen}
          options={{ title: 'Sign In' }}
        />

        <Stack.Screen 
          name={SCREENS.SIGN_UP} 
          component={SignUpScreen}
          options={{ title: 'Sign Up' }}
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

      </Stack.Navigator>
    </NavigationContainer>
  );
};
