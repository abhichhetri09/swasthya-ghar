import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../contexts/ThemeContext';
import { Colors } from '../constants/colors';
import { useTranslation } from '../hooks/useTranslation';
import type { TabParamList } from '../types';
import { TABS } from '../types';
import { Icon } from '../components/Icon';
import { IconName } from '../constants/icons';

// Import screens
import { HomeScreen } from '../screens/HomeScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator<TabParamList>();

// Custom tab bar icon component
const TabBarIcon: React.FC<{ 
  name: string; 
  focused: boolean; 
  color: string; 
  size?: number; 
}> = ({ 
  name, 
  focused, 
  color, 
  size = 24 
}) => {
  // Map route names to icon names
  const iconMap: Record<string, string> = {
    home: 'home',
    settings: 'settings',
  };

  const iconName = iconMap[name] || 'home';
  
  return (
    <Icon 
      name={iconName as IconName}
      size={size}
      color={color}
      focused={focused}
    />
  );
};

export const BottomTabNavigator: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName={TABS.HOME}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <TabBarIcon 
            name={route.name.toLowerCase().replace('tab', '')} 
            focused={focused} 
            color={color} 
            size={size} 
          />
        ),
        tabBarActiveTintColor: isDark ? Colors.primary[500] : Colors.primary[600],
        tabBarInactiveTintColor: isDark ? Colors.neutral[500] : Colors.neutral[400],
        tabBarStyle: {
          backgroundColor: isDark ? Colors.background.darkSecondary : Colors.background.light,
          borderTopColor: isDark ? Colors.border.dark : Colors.border.light,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 2,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name={TABS.HOME}
        component={HomeScreen}
        options={{
          title: t('home'),
          tabBarLabel: t('home'),
        }}
      />
      
      <Tab.Screen
        name={TABS.SETTINGS}
        component={SettingsScreen}
        options={{
          title: t('settings.title'),
          tabBarLabel: t('settings.title'),
        }}
      />
    </Tab.Navigator>
  );
};
