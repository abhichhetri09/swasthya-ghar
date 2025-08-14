import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../contexts/ThemeContext';
import { navigationService } from '../services/navigation';
import type { RootStackParamList } from '../types';
import { SCREENS } from '../types';
import { useTranslation } from '../hooks/useTranslation';

// Import navigators
import { BottomTabNavigator } from './BottomTabNavigator';

// Import detailed screens
import { PlaceholderScreen } from '../components/PlaceholderScreen';

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

  // Create screen components inside the main component to access context
  const AnalyticsScreen = () => (
    <PlaceholderScreen 
      title={t('analytics')}
      icon="analytics"
      description={t('featureDescriptions.analytics')}
    />
  );

  const ReportsScreen = () => (
    <PlaceholderScreen 
      title={t('reports')}
      icon="reports"
      description={t('featureDescriptions.reports')}
    />
  );

  const UserManagementScreen = () => (
    <PlaceholderScreen 
      title={t('userManagement')}
      icon="userManagement"
      description={t('featureDescriptions.userManagement')}
    />
  );

  const PatientDataScreen = () => (
    <PlaceholderScreen 
      title={t('patientData')}
      icon="patientData"
      description={t('featureDescriptions.patientData')}
    />
  );

  const SystemSettingsScreen = () => (
    <PlaceholderScreen 
      title={t('systemSettings')}
      icon="systemSettings"
      description={t('featureDescriptions.systemSettings')}
    />
  );

  const LogsScreen = () => (
    <PlaceholderScreen 
      title={t('logs')}
      icon="logs"
      description={t('featureDescriptions.logs')}
    />
  );

  const NotificationsScreen = () => (
    <PlaceholderScreen 
      title={t('notifications')}
      icon="notifications"
      description={t('featureDescriptions.notifications')}
    />
  );

  const ContentManagementScreen = () => (
    <PlaceholderScreen 
      title={t('contentManagement')}
      icon="contentManagement"
      description={t('featureDescriptions.contentManagement')}
    />
  );

  const BillingScreen = () => (
    <PlaceholderScreen 
      title={t('billing')}
      icon="billing"
      description={t('featureDescriptions.billing')}
    />
  );

  const AppointmentsScreen = () => (
    <PlaceholderScreen 
      title={t('appointments')}
      icon="appointments"
      description={t('featureDescriptions.appointments')}
    />
  );

  const HealthRecordsScreen = () => (
    <PlaceholderScreen 
      title={t('healthRecords')}
      icon="healthRecords"
      description={t('featureDescriptions.healthRecords')}
    />
  );

  const MedicationsScreen = () => (
    <PlaceholderScreen 
      title={t('medications')}
      icon="medications"
      description={t('featureDescriptions.medications')}
    />
  );

  const LabResultsScreen = () => (
    <PlaceholderScreen 
      title={t('labResults')}
          icon="labResults"
      description={t('featureDescriptions.labResults')}
    />
  );

  const PrescriptionsScreen = () => (
    <PlaceholderScreen 
      title={t('prescriptions')}
      icon="prescriptions"
      description={t('featureDescriptions.prescriptions')}
    />
  );

  const TelemedicineScreen = () => (
    <PlaceholderScreen 
      title={t('telemedicine')}
      icon="telemedicine"
      description={t('featureDescriptions.telemedicine')}
    />
  );

  const EmergencyContactsScreen = () => (
    <PlaceholderScreen 
      title={t('emergencyContacts')}
        icon="emergencyContacts"
      description={t('featureDescriptions.emergencyContacts')}
    />
  );

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack.Navigator
        initialRouteName={SCREENS.HOME}
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: isDark ? '#111827' : '#f9fafb' },
        }}
      >
        {/* Main Tab Navigator */}
        <Stack.Screen 
          name={SCREENS.HOME} 
          component={BottomTabNavigator}
          options={{ title: 'Main' }}
        />

        {/* Detailed Screens */}
        <Stack.Screen 
          name={SCREENS.ANALYTICS} 
          component={AnalyticsScreen}
          options={{ title: t('analytics') }}
        />
        
        <Stack.Screen 
          name={SCREENS.REPORTS} 
          component={ReportsScreen}
          options={{ title: t('reports') }}
        />

        <Stack.Screen 
          name={SCREENS.USER_MANAGEMENT} 
          component={UserManagementScreen}
          options={{ title: t('userManagement') }}
        />

        <Stack.Screen 
          name={SCREENS.PATIENT_DATA} 
          component={PatientDataScreen}
          options={{ title: t('patientData') }}
        />

        <Stack.Screen 
          name={SCREENS.SYSTEM_SETTINGS} 
          component={SystemSettingsScreen}
          options={{ title: t('systemSettings') }}
        />
        
        <Stack.Screen 
          name={SCREENS.LOGS} 
          component={LogsScreen}
          options={{ title: t('logs') }}
        />

        <Stack.Screen 
          name={SCREENS.NOTIFICATIONS} 
          component={NotificationsScreen}
          options={{ title: t('notifications') }}
        />
        
        <Stack.Screen 
          name={SCREENS.CONTENT_MANAGEMENT} 
          component={ContentManagementScreen}
          options={{ title: t('contentManagement') }}
        />

        <Stack.Screen 
          name={SCREENS.BILLING} 
          component={BillingScreen}
          options={{ title: t('billing') }}
        />

        <Stack.Screen 
          name={SCREENS.APPOINTMENTS} 
          component={AppointmentsScreen}
          options={{ title: t('appointments') }}
        />
        
        <Stack.Screen 
          name={SCREENS.HEALTH_RECORDS} 
          component={HealthRecordsScreen}
          options={{ title: t('healthRecords') }}
        />
        
        <Stack.Screen 
          name={SCREENS.MEDICATIONS} 
          component={MedicationsScreen}
          options={{ title: t('medications') }}
        />
        
        <Stack.Screen 
          name={SCREENS.LAB_RESULTS} 
          component={LabResultsScreen}
          options={{ title: t('labResults') }}
        />
        
        <Stack.Screen 
          name={SCREENS.PRESCRIPTIONS} 
          component={PrescriptionsScreen}
          options={{ title: t('prescriptions') }}
        />
        
        <Stack.Screen 
          name={SCREENS.TELEMEDICINE} 
          component={TelemedicineScreen}
          options={{ title: t('telemedicine') }}
        />
        
        <Stack.Screen 
          name={SCREENS.EMERGENCY_CONTACTS} 
          component={EmergencyContactsScreen}
          options={{ title: t('emergencyContacts') }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
