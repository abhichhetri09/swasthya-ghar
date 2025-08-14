import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { UserContextType, User, UserRole, RolePermissions } from '../types';
import { getRoleConfig } from '../types/roles';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>('user');

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setCurrentRole(parsedUser.role);
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const login = async (newUser: User) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      setCurrentRole(newUser.role);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      setCurrentRole('user');
    } catch (error) {
      console.error('Error removing user:', error);
    }
  };

  const hasPermission = (permission: keyof RolePermissions): boolean => {
    if (!user) return false;
    const roleConfig = getRoleConfig(user.role);
    return roleConfig.permissions[permission];
  };

  return (
    <UserContext.Provider value={{ user, currentRole, login, logout, hasPermission }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
