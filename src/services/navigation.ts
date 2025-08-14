import { NavigationContainerRef } from '@react-navigation/native';
import type { RootStackParamList } from '../types';
import { SCREENS } from '../types';

class NavigationService {
  private navigator: NavigationContainerRef<RootStackParamList> | null = null;

  setNavigator(navigator: NavigationContainerRef<RootStackParamList>) {
    this.navigator = navigator;
  }

  navigate<T extends keyof RootStackParamList>(
    name: T,
    params?: RootStackParamList[T]
  ) {
    if (this.navigator) {
      try {
        this.navigator.navigate(name as any, params as any);
      } catch (error) {
        console.warn('Navigation failed:', error);
      }
    } else {
      console.warn('Navigation not available yet. Navigator not set.');
    }
  }

  goBack() {
    if (this.navigator) {
      try {
        this.navigator.goBack();
      } catch (error) {
        console.warn('Navigation failed:', error);
      }
    } else {
      console.warn('Navigation not available yet. Navigator not set.');
    }
  }

  canGoBack(): boolean {
    return this.navigator?.canGoBack() ?? false;
  }

  // Note: Tab navigation (Home, Dashboard, Profile, Settings) is handled by the tab navigator
  // These methods are for stack navigation to detailed screens only

  goToAnalytics() {
    this.navigate(SCREENS.ANALYTICS);
  }

  goToUserManagement() {
    this.navigate(SCREENS.USER_MANAGEMENT);
  }

  goToPatientData() {
    this.navigate(SCREENS.PATIENT_DATA);
  }

  goToSystemSettings() {
    this.navigate(SCREENS.SYSTEM_SETTINGS);
  }

  goToNotifications() {
    this.navigate(SCREENS.NOTIFICATIONS);
  }

  goToReports() {
    this.navigate(SCREENS.REPORTS);
  }

  goToBilling() {
    this.navigate(SCREENS.BILLING);
  }

  goToLogs() {
    this.navigate(SCREENS.LOGS);
  }

  goToContentManagement() {
    this.navigate(SCREENS.CONTENT_MANAGEMENT);
  }

  goToAppointments() {
    this.navigate(SCREENS.APPOINTMENTS);
  }

  goToHealthRecords() {
    this.navigate(SCREENS.HEALTH_RECORDS);
  }

  goToMedications() {
    this.navigate(SCREENS.MEDICATIONS);
  }

  goToLabResults() {
    this.navigate(SCREENS.LAB_RESULTS);
  }

  goToPrescriptions() {
    this.navigate(SCREENS.PRESCRIPTIONS);
  }

  goToTelemedicine() {
    this.navigate(SCREENS.TELEMEDICINE);
  }

  goToEmergencyContacts() {
    this.navigate(SCREENS.EMERGENCY_CONTACTS);
  }

  goToSignIn() {
    this.navigate(SCREENS.SIGN_IN);
  }

  goToSignUp() {
    this.navigate(SCREENS.SIGN_UP);
  }

  goToError(errorType?: string, errorCode?: string, message?: string) {
    this.navigate(SCREENS.ERROR, { errorType, errorCode, message });
  }

  goToErrorDemo() {
    this.navigate(SCREENS.ERROR_DEMO);
  }
}

export const navigationService = new NavigationService();
