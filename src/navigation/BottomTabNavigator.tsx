import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';
import { useTranslation } from '../hooks/useTranslation';
import type { TabParamList } from '../types';
import { TABS } from '../types';
import { Icon } from '../components/Icon';
import { IconName } from '../constants/icons';

// Import screens
import { HomeScreen } from '../screens/HomeScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
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
    dashboard: 'dashboard',
    profile: 'profile',
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
  const { user } = useUser();

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
        tabBarActiveTintColor: isDark ? '#3b82f6' : '#2563eb',
        tabBarInactiveTintColor: isDark ? '#6b7280' : '#9ca3af',
        tabBarStyle: {
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
          borderTopColor: isDark ? '#374151' : '#e5e7eb',
          borderTopWidth: 1,
          paddingBottom: 5,
          height: 60,
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
        name={TABS.DASHBOARD}
        component={DashboardScreen}
        options={{
          title: t('dashboard'),
          tabBarLabel: t('dashboard'),
        }}
      />
      
      <Tab.Screen
        name={TABS.PROFILE}
        component={ProfileScreen}
        options={{
          title: t('profile.title'),
          tabBarLabel: t('profile.title'),
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
