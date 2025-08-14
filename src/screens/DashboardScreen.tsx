import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';
import { navigationService } from '../services/navigation';
import { PermissionGate } from '../components/PermissionGate';
import { useTranslation } from '../hooks/useTranslation';
import { Icon } from '../components/Icon';
import { IconName } from '../constants/icons';
import type { RolePermissions } from '../types';

export const DashboardScreen: React.FC = () => {
  const { isDark } = useTheme();
  const { user, currentRole } = useUser();
  const { t } = useTranslation();

  const DashboardCard = ({
    title,
    subtitle,
    icon,
    onPress,
    permission,
    color = 'primary'
  }: {
    title: string;
    subtitle: string;
    icon: IconName;
    onPress: () => void;
    permission?: keyof RolePermissions;
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success';
  }) => (
    <>
      {permission ? (
        <PermissionGate permission={permission} fallback={null}>
          <TouchableOpacity
            onPress={onPress}
            className={`p-4 rounded-2xl mb-4 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
            activeOpacity={0.8}
          >
            <View className="flex-row items-center">
              <Icon name={icon} size={32} className="mr-4" />
              <View className="flex-1">
                <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {title}
                </Text>
                <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {subtitle}
                </Text>
              </View>
              <Text className={`text-2xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>→</Text>
            </View>
          </TouchableOpacity>
        </PermissionGate>
      ) : (
        <TouchableOpacity
          onPress={onPress}
          className={`p-4 rounded-2xl mb-4 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          activeOpacity={0.8}
        >
          <View className="flex-row items-center">
            <Icon name={icon} size={32} className="mr-4" />
            <View className="flex-1">
              <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {title}
              </Text>
              <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {subtitle}
              </Text>
            </View>
            <Text className={`text-2xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>→</Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  );

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <ScrollView className="flex-1 px-4 pt-4">
        {/* Header */}
        <View className="mb-6">
          <Text className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('dashboard')}
          </Text>
          <Text className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('dashboardWelcome').replace('{name}', user?.name || 'User')}
          </Text>
        </View>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('quickActions')}
          </Text>

          <DashboardCard
            title={t('analytics')}
            subtitle={t('analyticsSubtitle')}
            icon="analytics"
            onPress={() => navigationService.navigate('Analytics')}
            permission="canViewAnalytics"
            color="primary"
          />

          <DashboardCard
            title={t('userManagement')}
            subtitle={t('userManagementSubtitle')}
            icon="userManagement"
            onPress={() => navigationService.navigate('UserManagement')}
            permission="canManageUsers"
            color="error"
          />

          <DashboardCard
            title={t('patientData')}
            subtitle={t('patientDataSubtitle')}
            icon="patientData"
            onPress={() => navigationService.navigate('PatientData')}
            permission="canAccessPatientData"
            color="secondary"
          />

          <DashboardCard
            title={t('systemSettings')}
            subtitle={t('systemSettingsSubtitle')}
            icon="systemSettings"
            onPress={() => navigationService.navigate('SystemSettings')}
            permission="canManageSystem"
            color="warning"
          />

          <DashboardCard
            title={t('notifications')}
            subtitle={t('notificationsSubtitle')}
            icon="notifications"
            onPress={() => navigationService.navigate('Notifications')}
            permission="canViewNotifications"
            color="success"
          />

          <DashboardCard
            title={t('reports')}
            subtitle={t('reportsSubtitle')}
            icon="reports"
            onPress={() => navigationService.navigate('Reports')}
            permission="canViewReports"
            color="primary"
          />

          <DashboardCard
            title={t('billing')}
            subtitle={t('billingSubtitle')}
            icon="billing"
            onPress={() => navigationService.navigate('Billing')}
            permission="canManageBilling"
            color="success"
          />

          <DashboardCard
            title={t('logs')}
            subtitle={t('logsSubtitle')}
            icon="logs"
            onPress={() => navigationService.navigate('Logs')}
            permission="canViewLogs"
            color="warning"
          />

          <DashboardCard
            title={t('contentManagement')}
            subtitle={t('contentManagementSubtitle')}
            icon="contentManagement"
            onPress={() => navigationService.navigate('ContentManagement')}
            permission="canManageContent"
            color="secondary"
          />
        </View>

        {/* Healthcare Features */}
        <View className="mb-6">
          <Text className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('healthcareFeatures')}
          </Text>

          <DashboardCard
            title={t('appointments')}
            subtitle={t('appointmentsSubtitle')}
            icon="appointments"
            onPress={() => navigationService.navigate('Appointments')}
            permission="canManageAppointments"
            color="primary"
          />

          <DashboardCard
            title={t('healthRecords')}
            subtitle={t('healthRecordsSubtitle')}
            icon="healthRecords"
            onPress={() => navigationService.navigate('HealthRecords')}
            permission="canAccessHealthRecords"
            color="secondary"
          />

          <DashboardCard
            title={t('medications')}
            subtitle={t('medicationsSubtitle')}
            icon="medications"
                  onPress={() => navigationService.navigate('Medications')}
            permission="canManageMedications"
            color="warning"
          />

          <DashboardCard
            title={t('labResults')}
            subtitle={t('labResultsSubtitle')}
            icon="labResults"
            onPress={() => navigationService.navigate('LabResults')}
            permission="canViewLabResults"
            color="success"
          />

          <DashboardCard
            title={t('prescriptions')}
            subtitle={t('prescriptionsSubtitle')}
            icon="prescriptions"
            onPress={() => navigationService.navigate('Prescriptions')}
            permission="canManagePrescriptions"
            color="primary"
          />

          <DashboardCard
            title={t('telemedicine')}
            subtitle={t('telemedicineSubtitle')}
            icon="telemedicine"
            onPress={() => navigationService.navigate('Telemedicine')}
            permission="canAccessTelemedicine"
            color="secondary"
          />

          <DashboardCard
            title={t('emergencyContacts')}
            subtitle={t('emergencyContactsSubtitle')}
            icon="emergencyContacts"
            onPress={() => navigationService.navigate('EmergencyContacts')}
            permission="canManageEmergencyContacts"
            color="error"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
