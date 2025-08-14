import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { UserProvider } from './src/contexts/UserContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { useLanguage } from './src/contexts/LanguageContext';
import { useTheme } from './src/contexts/ThemeContext';
import './global.css';

const AppContent: React.FC = () => {
  const { isLoading } = useLanguage();
  const { isDark } = useTheme();

  if (isLoading) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: isDark ? '#111827' : '#f9fafb'
      }}>
        <Text style={{ 
          fontSize: 20, 
          fontWeight: '600',
          color: isDark ? '#ffffff' : '#111827'
        }}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <AppNavigator />
    </ErrorBoundary>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <UserProvider>
            <AppContent />
          </UserProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
