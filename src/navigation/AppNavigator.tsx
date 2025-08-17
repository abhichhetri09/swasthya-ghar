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
import { ErrorDemo } from '../components/ErrorDemo';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { isDark } = useTheme();
  const navigationRef = useRef<any>(null);

  React.useEffect(() => {
    if (navigationRef.current) {
      navigationService.setNavigator(navigationRef.current);
    } 
  }, []);

  // Create screen components inside the main component to access context
  const AnalyticsScreen = () => {
    const { useTranslation } = require('../hooks/useTranslation');
    const { t } = useTranslation();
    return (
      <PlaceholderScreen 
        title={t('analytics')}
        icon="analytics"
        description={t('featureDescriptions.analytics')}
      />
    );
  };

  const ReportsScreen = () => {
    const { useTranslation } = require('../hooks/useTranslation');
    const { t } = useTranslation();
    return (
      <PlaceholderScreen 
        title={t('reports')}
        icon="reports"
        description={t('featureDescriptions.reports')}
      />
    );
  };

  const UserManagementScreen = () => {
    const { useTranslation } = require('../hooks/useTranslation');    
    const { t } = useTranslation();
    return (
      <PlaceholderScreen 
        title={t('userManagement')}
        icon="userManagement"
        description={t('featureDescriptions.userManagement')}
      />
    );
  };

  const PatientDataScreen = () => {
    const { useTranslation } = require('../hooks/useTranslation');
    const { t } = useTranslation();
    return (
      <PlaceholderScreen 
        title={t('patientData')}
        icon="patientData"
        description={t('featureDescriptions.patientData')}
      />
    );
  };

  const SystemSettingsScreen = () => {
    const { useTranslation } = require('../hooks/useTranslation');
    const { t } = useTranslation();
    return (
      <PlaceholderScreen 
        title={t('systemSettings')}
        icon="systemSettings"
        description={t('featureDescriptions.systemSettings')}
      />
    );
  };

  const LogsScreen = () => {
    const { useTranslation } = require('../hooks/useTranslation');
    const { t } = useTranslation();
    return (
      <PlaceholderScreen 
        title={t('logs')}
        icon="logs"
        description={t('featureDescriptions.logs')}
      />
    );
  };

  const NotificationsScreen = () => {
    const { useTranslation } = require('../hooks/useTranslation');
    const { t } = useTranslation();
    return (
      <PlaceholderScreen 
        title={t('notifications')}
        icon="notifications"
        description={t('featureDescriptions.notifications')}
      />
    );
  };

  const ContentManagementScreen = () => {
    const { useTranslation } = require('../hooks/useTranslation');
    const { t } = useTranslation();
    return (
      <PlaceholderScreen 
        title={t('contentManagement')}
        icon="contentManagement"
        description={t('featureDescriptions.contentManagement')}
      />
    );
  };

  const BillingScreen = () => {
    const { useTranslation } = require('../hooks/useTranslation');
    const { t } = useTranslation();
    return (
      <PlaceholderScreen 
        title={t('billing')}
        icon="billing"
        description={t('featureDescriptions.billing')}
      />
    );
  };

  const AppointmentsScreen = () => {
    const { useTranslation } = require('../hooks/useTranslation');
    const { t } = useTranslation();
    return (
      <PlaceholderScreen 
        title={t('appointments')}
        icon="appointments"
        description={t('featureDescriptions.appointments')}
      />
    );
  };

  const HealthRecordsScreen = () => {
    const { useTranslation } = require('../hooks/useTranslation');
    const { t } = useTranslation();
    return (
      <PlaceholderScreen 
        title={t('healthRecords')}
        icon="healthRecords"
        description={t('featureDescriptions.healthRecords')}
      />
    );
  };

  const MedicationsScreen = () => {
    const { useTranslation } = require('../hooks/useTranslation');
    const { t } = useTranslation();
    return (
      <PlaceholderScreen 
        title={t('medications')}
        icon="medications"
        description={t('featureDescriptions.medications')}
      />
    );
  };

  const LabResultsScreen = () => {
    const { useTranslation } = require('../hooks/useTranslation');
    const { t } = useTranslation();
    return (
      <PlaceholderScreen 
        title={t('labResults')}
        icon="labResults"
        description={t('featureDescriptions.labResults')}
      />
    );
  };

  const PrescriptionsScreen = () => {
    const { useTranslation } = require('../hooks/useTranslation');
    const { t } = useTranslation();
    return (
      <PlaceholderScreen 
        title={t('prescriptions')}
        icon="prescriptions"
        description={t('featureDescriptions.prescriptions')}
      />
    );
  };

  const TelemedicineScreen = () => {
    const { useTranslation } = require('../hooks/useTranslation');
    const { t } = useTranslation();
    return (
      <PlaceholderScreen 
        title={t('telemedicine')}
        icon="telemedicine"
        description={t('featureDescriptions.telemedicine')}
      />
    );
  };

  const EmergencyContactsScreen = () => {
    const { useTranslation } = require('../hooks/useTranslation');
    const { t } = useTranslation();
    return (
      <PlaceholderScreen 
        title={t('emergencyContacts')}
            icon="emergencyContacts"
        description={t('featureDescriptions.emergencyContacts')}
      />
    );
  };

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

        {/* Error Demo Screen */}
        <Stack.Screen 
          name={SCREENS.ERROR_DEMO} 
          component={ErrorDemo}
          options={{ title: 'Error Demo' }}
        />

        {/* Detailed Screens */}
        <Stack.Screen 
          name={SCREENS.ANALYTICS} 
          component={AnalyticsScreen}
          options={{ title: 'Analytics' }}
        />
        
        <Stack.Screen 
          name={SCREENS.REPORTS} 
          component={ReportsScreen}
          options={{ title: 'Reports' }}
        />

        <Stack.Screen 
          name={SCREENS.USER_MANAGEMENT} 
          component={UserManagementScreen}
          options={{ title: 'User Management' }}
        />

        <Stack.Screen 
          name={SCREENS.PATIENT_DATA} 
          component={PatientDataScreen}
          options={{ title: 'Patient Data' }}
        />

        <Stack.Screen 
          name={SCREENS.SYSTEM_SETTINGS} 
          component={SystemSettingsScreen}
          options={{ title: 'System Settings' }}
        />
        
        <Stack.Screen 
          name={SCREENS.LOGS} 
          component={LogsScreen}
          options={{ title: 'Logs' }}
        />

        <Stack.Screen 
          name={SCREENS.NOTIFICATIONS} 
          component={NotificationsScreen}
          options={{ title: 'Notifications' }}
        />
        
        <Stack.Screen 
          name={SCREENS.CONTENT_MANAGEMENT} 
          component={ContentManagementScreen}
          options={{ title: 'Content Management' }}
        />

        <Stack.Screen 
          name={SCREENS.BILLING} 
          component={BillingScreen}
          options={{ title: 'Billing' }}
        />

        <Stack.Screen 
          name={SCREENS.APPOINTMENTS} 
          component={AppointmentsScreen}
          options={{ title: 'Appointments' }}
        />
        
        <Stack.Screen 
          name={SCREENS.HEALTH_RECORDS} 
          component={HealthRecordsScreen}
          options={{ title: 'Health Records' }}
        />
        
        <Stack.Screen 
          name={SCREENS.MEDICATIONS} 
          component={MedicationsScreen}
          options={{ title: 'Medications' }}
        />
        
        <Stack.Screen 
          name={SCREENS.LAB_RESULTS} 
          component={LabResultsScreen}
          options={{ title: 'Lab Results' }}
        />
        
        <Stack.Screen 
          name={SCREENS.PRESCRIPTIONS} 
          component={PrescriptionsScreen}
          options={{ title: 'Prescriptions' }}
        />
        
        <Stack.Screen 
          name={SCREENS.TELEMEDICINE} 
          component={TelemedicineScreen}
          options={{ title: 'Telemedicine' }}
        />
        
        <Stack.Screen 
          name={SCREENS.EMERGENCY_CONTACTS} 
          component={EmergencyContactsScreen}
          options={{ title: 'Emergency Contacts' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
