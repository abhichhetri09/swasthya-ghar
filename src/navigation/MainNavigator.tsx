import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../contexts/ThemeContext';
import { Colors } from '../constants/colors';
import { navigationService } from '../services/navigation';
import type { RootStackParamList } from '../types';
import { SCREENS } from '../types';
import { useTranslation } from '../hooks/useTranslation';

// Import navigators
import { BottomTabNavigator } from './BottomTabNavigator';

// Import screens
import { ErrorScreen } from '../screens/ErrorScreen';
import { ButtonDemo } from '../components/ButtonDemo';

const Stack = createStackNavigator<RootStackParamList>();

export const MainNavigator: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
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

        {/* Error Screen */}
        <Stack.Screen 
          name={SCREENS.ERROR} 
          component={ErrorScreen}
          options={{ title: t('error.title') }}
        />
        <Stack.Screen 
          name={SCREENS.TEST} 
          component={ButtonDemo}
          options={{ title: t('test') }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
