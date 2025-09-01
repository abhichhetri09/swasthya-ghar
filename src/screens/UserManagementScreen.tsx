import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { ScreenWithHeader } from '../components/ScreenWithHeader';
import { SearchInput } from '../components/SearchInput';
import { Button } from '../components/Button';
import CreateUserModal from '../components/CreateUserModal';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchUsers, deleteUser, updateUser } from '../store/slices/userSlice';
import { User } from '../types/database';
import { Colors } from '../constants/colors';
import { useTheme } from '../contexts/ThemeContext';
import { Icon } from '../components/Icon';

interface UserManagementScreenProps {
  navigation: any;
}

const UserManagementScreen: React.FC<UserManagementScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { isDark } = useTheme();
  const { users, loading, error, pagination } = useAppSelector(state => state.users);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = useCallback(async (page = 1) => {
    try {
      await dispatch(fetchUsers({ page, limit: 20 })).unwrap();
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadUsers(1);
    setRefreshing(false);
  }, [loadUsers]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    // TODO: Implement search functionality
    // For now, just reload users
    loadUsers(1);
  }, [loadUsers]);

  const handleLoadMore = useCallback(() => {
    if (pagination && pagination.page < pagination.totalPages && !loading) {
      loadUsers(pagination.page + 1);
    }
  }, [pagination, loading, loadUsers]);

  const handleDeleteUser = useCallback((user: User) => {
    Alert.alert(
      'Delete User',
      `Are you sure you want to delete ${user.full_name}? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(deleteUser(user.user_id)).unwrap();
              Alert.alert('Success', 'User deleted successfully');
              loadUsers(1); // Reload users
            } catch (error) {
              Alert.alert('Error', 'Failed to delete user');
            }
          },
        },
      ]
    );
  }, [dispatch, loadUsers]);

  const handleToggleUserStatus = useCallback(async (user: User) => {
    try {
      await dispatch(updateUser({
        userId: user.user_id,
        userData: { is_active: !user.is_active }
      })).unwrap();
      Alert.alert('Success', `User ${user.is_active ? 'deactivated' : 'activated'} successfully`);
      loadUsers(1); // Reload users
    } catch (error) {
      Alert.alert('Error', 'Failed to update user status');
    }
  }, [dispatch, loadUsers]);

  const handleEditUser = useCallback((user: User) => {
    setSelectedUser(user);
    // TODO: Navigate to edit user screen or open edit modal
    Alert.alert('Edit User', `Edit functionality for ${user.full_name} will be implemented soon`);
  }, []);

  const handleCreateSuccess = useCallback(() => {
    setShowCreateModal(false);
    loadUsers(1); // Reload users
  }, [loadUsers]);

  const getFilteredUsers = useCallback(() => {
    let filtered = users;
    
    // Filter by role
    if (filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(user =>
        user.full_name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone?.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [users, filterRole, searchQuery]);

  const renderUserItem = useCallback(({ item }: { item: User }) => (
    <View className={`p-4 mb-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {item.full_name}
          </Text>
          <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {item.email}
          </Text>
          <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {item.phone}
          </Text>
        </View>
        <View className="flex-row items-center">
          <View className={`px-2 py-1 rounded-full mr-2 ${
            item.is_active 
              ? 'bg-green-100 dark:bg-green-900' 
              : 'bg-red-100 dark:bg-red-900'
          }`}>
            <Text className={`text-xs font-medium ${
              item.is_active 
                ? 'text-green-800 dark:text-green-200' 
                : 'text-red-800 dark:text-red-200'
            }`}>
              {item.is_active ? 'Active' : 'Inactive'}
            </Text>
          </View>
          <View className={`px-2 py-1 rounded-full ${
            item.role === 'administrator' ? 'bg-purple-100 dark:bg-purple-900' :
            item.role === 'healthcare_professional' ? 'bg-blue-100 dark:bg-blue-900' :
            item.role === 'patient' ? 'bg-green-100 dark:bg-green-900' :
            'bg-gray-100 dark:bg-gray-700'
          }`}>
            <Text className={`text-xs font-medium capitalize ${
              item.role === 'administrator' ? 'text-purple-800 dark:text-purple-200' :
              item.role === 'healthcare_professional' ? 'text-blue-800 dark:text-blue-200' :
              item.role === 'patient' ? 'text-green-800 dark:text-green-200' :
              'text-gray-800 dark:text-gray-200'
            }`}>
              {item.role.replace('_', ' ')}
            </Text>
          </View>
        </View>
      </View>
      
      <View className="flex-row justify-end space-x-2">
        <TouchableOpacity
          onPress={() => handleEditUser(item)}
          className={`px-3 py-1 rounded-md ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}
        >
          <Text className="text-white text-sm font-medium">Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => handleToggleUserStatus(item)}
          className={`px-3 py-1 rounded-md ${
            item.is_active 
              ? (isDark ? 'bg-yellow-600' : 'bg-yellow-500')
              : (isDark ? 'bg-green-600' : 'bg-green-500')
          }`}
        >
          <Text className="text-white text-sm font-medium">
            {item.is_active ? 'Deactivate' : 'Activate'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => handleDeleteUser(item)}
          className="px-3 py-1 rounded-md bg-red-500"
        >
          <Text className="text-white text-sm font-medium">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  ), [isDark, handleEditUser, handleToggleUserStatus, handleDeleteUser]);

  const renderFilterButtons = () => (
    <View className="flex-row mb-4 space-x-2">
      {['all', 'patient', 'healthcare_professional', 'administrator'].map((role) => (
        <TouchableOpacity
          key={role}
          onPress={() => setFilterRole(role)}
          className={`px-4 py-2 rounded-full ${
            filterRole === role
              ? (isDark ? 'bg-blue-600' : 'bg-blue-500')
              : (isDark ? 'bg-gray-700' : 'bg-gray-200')
          }`}
        >
          <Text className={`text-sm font-medium capitalize ${
            filterRole === role
              ? 'text-white'
              : (isDark ? 'text-gray-300' : 'text-gray-700')
          }`}>
            {role === 'all' ? 'All' : role.replace('_', ' ')}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderStats = () => {
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.is_active).length;
    const inactiveUsers = totalUsers - activeUsers;

    return (
      <View className={`p-4 rounded-lg mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <Text className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          User Statistics
        </Text>
        <View className="flex-row justify-between">
          <View className="items-center">
            <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {totalUsers}
            </Text>
            <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Total Users
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-green-600">{activeUsers}</Text>
            <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Active
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-red-600">{inactiveUsers}</Text>
            <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Inactive
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const CreateUserButton = () => (
    <Button
      title="Add User"
      onPress={() => setShowCreateModal(true)}
      variant="primary"
      size="medium"
      leftIcon={<Icon name="plus" size={16} color="white" />}
    />
  );

  if (error && users.length === 0) {
    return (
      <ScreenWithHeader
        title="User Management"
        subtitle="Manage system users"
        rightComponent={<CreateUserButton />}
      >
        <View className="flex-1 justify-center items-center p-6">
          <Text className={`text-lg text-center mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
            Error: {error}
          </Text>
          <Button
            title="Retry"
            onPress={() => loadUsers(1)}
            variant="primary"
          />
        </View>
      </ScreenWithHeader>
    );
  }

  return (
    <>
      <ScreenWithHeader
        title="User Management"
        subtitle="Manage system users"
        rightComponent={<CreateUserButton />}
        refreshControl={{
          refreshing: refreshing,
          onRefresh: onRefresh,
        }}
      >
        <View className="flex-1">
          {/* Search Bar */}
          <View className="mb-4">
            <SearchInput
              value={searchQuery}
              onValueChange={setSearchQuery}
              onSearch={handleSearch}
              placeholder="Search users by name, email, or phone..."
              variant="outlined"
              size="medium"
            />
          </View>

          {/* Filter Buttons */}
          {renderFilterButtons()}

          {/* Statistics */}
          {renderStats()}

          {/* User List */}
          <FlatList
            data={getFilteredUsers()}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.user_id.toString()}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[Colors.primary[500]]}
                tintColor={Colors.primary[500]}
              />
            }
            ListFooterComponent={
              loading && users.length > 0 ? (
                <View className="p-4 items-center">
                  <ActivityIndicator size="small" color={Colors.primary[500]} />
                  <Text className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Loading more users...
                  </Text>
                </View>
              ) : null
            }
            ListEmptyComponent={
              !loading ? (
                <View className="flex-1 justify-center items-center p-8">
                  <Icon name="users" size={64} color={isDark ? Colors.gray[400] : Colors.gray[300]} />
                  <Text className={`text-lg font-medium mt-4 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {searchQuery || filterRole !== 'all' 
                      ? 'No users found matching your criteria'
                      : 'No users found'
                    }
                  </Text>
                  <Text className={`text-sm mt-2 text-center ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {searchQuery || filterRole !== 'all' 
                      ? 'Try adjusting your search or filters'
                      : 'Create your first user to get started'
                    }
                  </Text>
                </View>
              ) : null
            }
          />
        </View>
      </ScreenWithHeader>

      {/* Create User Modal */}
      <CreateUserModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
      />
    </>
  );
};

export default UserManagementScreen;
