// ============================================================================
// NAVIGATION TYPES
// ============================================================================

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Home: undefined;
  Settings: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Test: undefined;
  TextInputDemo: undefined;
  SelectDemo: undefined;
  DatePickerDemo: undefined;
  UserManagement: undefined;
  Error: { errorType?: string; errorCode?: string; message?: string };
};

export type TabParamList = {
  HomeTab: undefined;
  SignIn: undefined;
  SignUp: undefined;
  SettingsTab: undefined;
};
    
export const SCREENS = {
  AUTH: 'Auth',
  MAIN: 'Main',
  HOME: 'Home',
  SIGN_IN: 'SignIn',
  SIGN_UP: 'SignUp',
  TEST: 'Test',
  TEXT_INPUT_DEMO: 'TextInputDemo',
  SELECT_DEMO: 'SelectDemo',
  DATE_PICKER_DEMO: 'DatePickerDemo',
  USER_MANAGEMENT: 'UserManagement',
  ERROR: 'Error',
} as const;

export const TABS = {
  HOME: 'HomeTab',
  SETTINGS: 'SettingsTab',
} as const;

// ============================================================================
// USER & ROLE TYPES
// ============================================================================

export type UserRole = 'patient' | 'healthcare_professional' | 'administrator' | 'developer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface RoleConfig {
  role: UserRole;
  displayName: string;
  description: string;
  icon: string; // Icon name from the centralized icon system
  color: string;
  permissions: RolePermissions;
}

export interface RolePermissions {
  canViewAnalytics: boolean;
  canManageUsers: boolean;
  canAccessPatientData: boolean;
  canManageSystem: boolean;
  canViewNotifications: boolean;
  canViewReports: boolean;
  canManageBilling: boolean;
  canViewLogs: boolean;
  canManageContent: boolean;
  canManageAppointments: boolean;
  canAccessHealthRecords: boolean;
  canManageMedications: boolean;
  canViewLabResults: boolean;
  canManagePrescriptions: boolean;
  canAccessTelemedicine: boolean;
  canManageEmergencyContacts: boolean;
}

// Role configurations - can be modified here without editing other files
export const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  patient: {
    role: 'patient',
    displayName: 'Patient',
    description: 'End users seeking healthcare services',
    icon: 'user',
    color: '#6b7280', // Neutral gray
    permissions: {
      canViewAnalytics: false,
      canManageUsers: false,
      canAccessPatientData: false, // Can only access own data
      canManageSystem: false,
      canViewNotifications: true,
      canViewReports: false,
      canManageBilling: false,
      canViewLogs: false,
      canManageContent: false,
      canManageAppointments: true, // Can book appointments
      canAccessHealthRecords: true, // Can view own records
      canManageMedications: false,
      canViewLabResults: true, // Can view own lab results
      canManagePrescriptions: false,
      canAccessTelemedicine: true,
      canManageEmergencyContacts: false,
    },
  },
  healthcare_professional: {
    role: 'healthcare_professional',
    displayName: 'Healthcare Professional',
    description: 'Doctors, nurses, specialists, therapists',
    icon: 'doctor',
    color: '#22c55e', // Success green
    permissions: {
      canViewAnalytics: true,
      canManageUsers: false,
      canAccessPatientData: true, // Can access assigned patient data
      canManageSystem: false,
      canViewNotifications: true,
      canViewReports: true,
      canManageBilling: false,
      canViewLogs: false,
      canManageContent: false,
      canManageAppointments: true, // Can manage their schedule
      canAccessHealthRecords: true, // Can view patient records
      canManageMedications: true,
      canViewLabResults: true,
      canManagePrescriptions: true,
      canAccessTelemedicine: true,
      canManageEmergencyContacts: false,
    },
  },
  administrator: {
    role: 'administrator',
    displayName: 'Administrator',
    description: 'System managers and facility admins',
    icon: 'admin',
    color: '#007C91', // Cerulean
    permissions: {
      canViewAnalytics: true,
      canManageUsers: true,
      canAccessPatientData: true, // Can access all patient data
      canManageSystem: true,
      canViewNotifications: true,
      canViewReports: true,
      canManageBilling: true,
      canViewLogs: true,
      canManageContent: true,
      canManageAppointments: true,
      canAccessHealthRecords: true,
      canManageMedications: true,
      canViewLabResults: true,
      canManagePrescriptions: true,
      canAccessTelemedicine: true,
      canManageEmergencyContacts: true,
    },
  },
  developer: {
    role: 'developer',
    displayName: 'Developer',
    description: 'System developers with full access for testing and debugging',
    icon: 'code',
    color: '#8B5CF6', // Purple
    permissions: {
      canViewAnalytics: true,
      canManageUsers: true,
      canAccessPatientData: true, // Full access for testing
      canManageSystem: true,
      canViewNotifications: true,
      canViewReports: true,
      canManageBilling: true,
      canViewLogs: true,
      canManageContent: true,
      canManageAppointments: true,
      canAccessHealthRecords: true,
      canManageMedications: true,
      canViewLabResults: true,
      canManagePrescriptions: true,
      canAccessTelemedicine: true,
      canManageEmergencyContacts: true,
    },
  },
};

// Helper functions for role management
export const getRoleConfig = (role: UserRole): RoleConfig => {
  if (!ROLE_CONFIGS[role]) {
    console.warn(`Role '${role}' not found in ROLE_CONFIGS, falling back to 'patient' role`);
    return ROLE_CONFIGS['patient'];
  }
  return ROLE_CONFIGS[role];
};

export const getAllRoles = (): RoleConfig[] => {
  return Object.values(ROLE_CONFIGS);
};

export const hasPermission = (role: UserRole, permission: keyof RolePermissions): boolean => {
  return ROLE_CONFIGS[role].permissions[permission];
};

// ============================================================================
// THEME & LANGUAGE TYPES
// ============================================================================

export type Language = 'en' | 'fi' | 'ne';

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isLoading: boolean;
}

export interface UserContextType {
  user: User | null;
  currentRole: UserRole;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (permission: keyof RolePermissions) => boolean;
}

// ============================================================================
// COMPONENT PROPS TYPES
// ============================================================================

export interface ThemeToggleProps {
  size?: number;
}

export interface LanguageToggleProps {
  size?: number;
}

export interface BackButtonProps {
  onPress?: () => void;
  title?: string;
}

export interface PlaceholderScreenProps {
  title: string;
  subtitle?: string;
  icon?: string; // Icon name from the centralized icon system - will be cast to IconName
  description?: string;
}

export interface PermissionGateProps {
  permission: keyof RolePermissions;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showAccessDenied?: boolean;
}

export interface ProfileItemProps {
  title: string;
  value: string;
  icon: string; // Icon name from the centralized icon system - will be cast to IconName
}

export interface DashboardCardProps {
  title: string;
  subtitle: string;
  icon: string;
  onPress: () => void;
  permission?: string;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success';
}

export interface SettingItemProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export interface TabBarIconProps {
  name: string;
  focused: boolean;
  color: string;
  size?: number;
}

// ============================================================================
// TRANSLATION TYPES
// ============================================================================

export interface TranslationContextType {
  t: (key: string) => string;
  language: Language;
  isLoading: boolean;
}

// ============================================================================
// NAVIGATION SERVICE TYPES
// ============================================================================

export interface NavigationServiceType {
  setNavigator: (navigator: any) => void;
  navigate: (name: keyof RootStackParamList, params?: any) => void;
  goBack: () => void;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type ColorVariant = 'primary' | 'secondary' | 'error' | 'warning' | 'success';

export interface IconConfig {
  [key: string]: string;
}


