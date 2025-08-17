import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { Colors } from '../constants/colors';

export const HomeScreen: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? Colors.background.dark : Colors.background.light }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? Colors.text.dark.primary : Colors.text.light.primary }]}>
          User Management
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? Colors.text.dark.secondary : Colors.text.light.secondary }]}>
          Manage your healthcare users
        </Text>
      </View>

     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  content: {
    flex: 1,
  },
});
