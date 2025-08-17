/**
 * UserList Component
 * 
 * Example component showing Redux + API integration
 */

import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchUsers, fetchUserById } from '../store/slices/userSlice';
import { User } from '../types/database';
import { Colors } from '../constants/colors';

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error, pagination } = useAppSelector(state => state.users);

  useEffect(() => {
    // Load users when component mounts
    dispatch(fetchUsers({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleUserPress = (userId: number) => {
    dispatch(fetchUserById(userId));
  };

  const loadMoreUsers = () => {
    if (pagination && pagination.page < pagination.totalPages) {
      dispatch(fetchUsers({ page: pagination.page + 1, limit: 10 }));
    }
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <TouchableOpacity
      onPress={() => handleUserPress(item.user_id)}
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.charcoal[200],
        backgroundColor: Colors.background.light,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.charcoal[800] }}>
        {item.full_name}
      </Text>
      <Text style={{ fontSize: 14, color: Colors.charcoal[600], marginTop: 4 }}>
        {item.email}
      </Text>
      <Text style={{ fontSize: 12, color: Colors.charcoal[500], marginTop: 2 }}>
        {item.phone}
      </Text>
    </TouchableOpacity>
  );

  if (loading && users.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary[500]} />
        <Text style={{ marginTop: 16, color: Colors.charcoal[600] }}>
          Loading users...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 16, color: Colors.error[500], textAlign: 'center' }}>
          Error: {error}
        </Text>
        <TouchableOpacity
          onPress={() => dispatch(fetchUsers({ page: 1, limit: 10 }))}
          style={{
            marginTop: 16,
            padding: 12,
            backgroundColor: Colors.primary[500],
            borderRadius: 8,
          }}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>
            Retry
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background.light }}>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.user_id.toString()}
        onEndReached={loadMoreUsers}
        onEndReachedThreshold={0.1}
        scrollEnabled={false}
        ListFooterComponent={
          loading && users.length > 0 ? (
            <View style={{ padding: 16, alignItems: 'center' }}>
              <ActivityIndicator size="small" color={Colors.primary[500]} />
            </View>
          ) : null
        }
        ListEmptyComponent={
          !loading ? (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: Colors.charcoal[600] }}>
                No users found
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default UserList;
