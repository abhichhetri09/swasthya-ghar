import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';
import { useNavigation } from '../hooks/useNavigation';
import { PermissionGate } from '../components/PermissionGate';
import { useTranslation } from '../hooks/useTranslation';

export const DashboardScreen: React.FC = () => {
  const { isDark } = useTheme();
  const { user, currentRole } = useUser();
  const { t } = useTranslation();
  const navigation = useNavigation();

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
    icon: string;
    onPress: () => void;
    permission?: string;
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success';
  }) => (
    <PermissionGate permission={permission as any} fallback={null}>
      <TouchableOpacity
        onPress={onPress}
        className={`p-4 rounded-2xl mb-4 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
        activeOpacity={0.8}
      >
        <View className="flex-row items-center">
          <Text className="text-3xl mr-4">{icon}</Text>
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
            icon="📊"
            onPress={navigation.goToAnalytics}
            permission="canViewAnalytics"
            color="primary"
          />

          <DashboardCard
            title={t('userManagement')}
            subtitle={t('userManagementSubtitle')}
            icon="👥"
            onPress={navigation.goToUserManagement}
            permission="canManageUsers"
            color="error"
          />

          <DashboardCard
            title={t('patientData')}
            subtitle={t('patientDataSubtitle')}
            icon="🏥"
            onPress={navigation.goToPatientData}
            permission="canAccessPatientData"
            color="secondary"
          />

          <DashboardCard
            title={t('systemSettings')}
            subtitle={t('systemSettingsSubtitle')}
            icon="⚙️"
            onPress={navigation.goToSystemSettings}
            permission="canManageSystem"
            color="warning"
          />

          <DashboardCard
            title={t('notifications')}
            subtitle={t('notificationsSubtitle')}
            icon="🔔"
            onPress={navigation.goToNotifications}
            permission="canViewNotifications"
            color="success"
          />

          <DashboardCard
            title={t('reports')}
            subtitle={t('reportsSubtitle')}
            icon="📋"
            onPress={navigation.goToReports}
            permission="canViewReports"
            color="primary"
          />

          <DashboardCard
            title={t('billing')}
            subtitle={t('billingSubtitle')}
            icon="💰"
            onPress={navigation.goToBilling}
            permission="canManageBilling"
            color="success"
          />

          <DashboardCard
            title={t('logs')}
            subtitle={t('logsSubtitle')}
            icon="📝"
            onPress={navigation.goToLogs}
            permission="canViewLogs"
            color="warning"
          />

          <DashboardCard
            title={t('contentManagement')}
            subtitle={t('contentManagementSubtitle')}
            icon="📚"
            onPress={navigation.goToContentManagement}
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
            icon="📅"
            onPress={navigation.goToAppointments}
            permission="canManageAppointments"
            color="primary"
          />

          <DashboardCard
            title={t('healthRecords')}
            subtitle={t('healthRecordsSubtitle')}
            icon="📋"
            onPress={navigation.goToHealthRecords}
            permission="canAccessHealthRecords"
            color="secondary"
          />

          <DashboardCard
            title={t('medications')}
            subtitle={t('medicationsSubtitle')}
            icon="💊"
            onPress={navigation.goToMedications}
            permission="canManageMedications"
            color="warning"
          />

          <DashboardCard
            title={t('labResults')}
            subtitle={t('labResultsSubtitle')}
            icon="🔬"
            onPress={navigation.goToLabResults}
            permission="canViewLabResults"
            color="success"
          />

          <DashboardCard
            title={t('prescriptions')}
            subtitle={t('prescriptionsSubtitle')}
            icon="📄"
            onPress={navigation.goToPrescriptions}
            permission="canManagePrescriptions"
            color="primary"
          />

          <DashboardCard
            title={t('telemedicine')}
            subtitle={t('telemedicineSubtitle')}
            icon="📹"
            onPress={navigation.goToTelemedicine}
            permission="canAccessTelemedicine"
            color="secondary"
          />

          <DashboardCard
            title={t('emergencyContacts')}
            subtitle={t('emergencyContactsSubtitle')}
            icon="🚨"
            onPress={navigation.goToEmergencyContacts}
            permission="canManageEmergencyContacts"
            color="error"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
