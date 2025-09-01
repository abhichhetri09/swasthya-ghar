/**
 * Authentication Navigator
 * 
 * Handles the authentication flow with Sign In and Sign Up screens
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SCREENS } from '../types';

// Import screens
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';

// Import components
import { ThemeWrapper } from '../components/ThemeWrapper';

const Stack = createStackNavigator();

const AuthNavigator: React.FC = () => {
  return (
    <ThemeWrapper>
      <Stack.Navigator
        initialRouteName={SCREENS.SIGN_IN}
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
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
      </Stack.Navigator>
    </ThemeWrapper>
  );
};

export default AuthNavigator;
