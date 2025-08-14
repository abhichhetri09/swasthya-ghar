import { useNavigation as useReactNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../types';

export const useNavigation = () => {
  const navigation = useReactNavigation<StackNavigationProp<RootStackParamList>>();
  
  return {
    ...navigation,
    // Note: Tab navigation (Home, Dashboard, Profile, Settings) is handled by the tab navigator
    // These methods are for stack navigation to detailed screens only
    
    goToAnalytics: () => navigation.navigate('Analytics'),
    goToUserManagement: () => navigation.navigate('UserManagement'),
    goToPatientData: () => navigation.navigate('PatientData'),
    goToSystemSettings: () => navigation.navigate('SystemSettings'),
    goToNotifications: () => navigation.navigate('Notifications'),
    goToReports: () => navigation.navigate('Reports'),
    goToBilling: () => navigation.navigate('Billing'),
    goToLogs: () => navigation.navigate('Logs'),
    goToContentManagement: () => navigation.navigate('ContentManagement'),
    goToAppointments: () => navigation.navigate('Appointments'),
    goToHealthRecords: () => navigation.navigate('HealthRecords'),
    goToMedications: () => navigation.navigate('Medications'),
    goToLabResults: () => navigation.navigate('LabResults'),
    goToPrescriptions: () => navigation.navigate('Prescriptions'),
    goToTelemedicine: () => navigation.navigate('Telemedicine'),
    goToEmergencyContacts: () => navigation.navigate('EmergencyContacts'),
  };
};
