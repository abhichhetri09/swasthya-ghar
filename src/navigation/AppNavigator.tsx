import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../contexts/ThemeContext';
import { Colors } from '../constants/colors';
import { navigationService } from '../services/navigation';
import { useUser } from '../contexts/UserContext';
import type { RootStackParamList } from '../types';
import { SCREENS } from '../types';

// Import navigators
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

// Import components
import { ThemeWrapper } from '../components/ThemeWrapper';
import { ErrorBoundary } from '../components/ErrorBoundary';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { isDark } = useTheme();
  const { user } = useUser();
  const navigationRef = useRef<any>(null);

  React.useEffect(() => {
    if (navigationRef.current) {
      navigationService.setNavigator(navigationRef.current);
    } 
  }, []);

  return (
    <ErrorBoundary>
      <ThemeWrapper>
        <NavigationContainer ref={navigationRef}>
          <StatusBar style={isDark ? 'light' : 'dark'} />
          <Stack.Navigator
            initialRouteName={user ? SCREENS.MAIN : SCREENS.AUTH}
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: isDark ? Colors.background.dark : Colors.background.light },
            }}
          >
            {/* Authentication Flow */}
            <Stack.Screen 
              name={SCREENS.AUTH} 
              component={AuthNavigator}
              options={{ title: 'Authentication' }}
            />

            {/* Main App Flow */}
            <Stack.Screen 
              name={SCREENS.MAIN} 
              component={MainNavigator}
              options={{ title: 'Main App' }}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </ThemeWrapper>
    </ErrorBoundary>
  );
};
