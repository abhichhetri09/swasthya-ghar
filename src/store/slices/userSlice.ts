/**
 * User Redux Slice
 * 
 * Manages user state and API interactions
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/database';
import { apiServices, ApiResponse, PaginatedResponse } from '../../services/api';

// State interface
interface UserState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
}

// Initial state
const initialState: UserState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  pagination: null,
};

// Async thunks
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
    const response = await apiServices.users.getUsers(page, limit);
    return response;
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId: number) => {
    const response = await apiServices.users.getUserById(userId);
    return response;
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData: Omit<User, 'user_id' | 'created_at' | 'updated_at'>) => {
    const response = await apiServices.users.createUser(userData);
    return response;
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ userId, userData }: { userId: number; userData: Partial<User> }) => {
    const response = await apiServices.users.updateUser(userId, userData);
    return response;
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: number) => {
    await apiServices.users.deleteUser(userId); // TODO: check if this is correct
    return userId;
  }
);

// User slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    clearUsers: (state) => {
      state.users = [];
      state.pagination = null;
    },
  },
  extraReducers: (builder) => {
    // fetchUsers
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<PaginatedResponse<User>>) => {
        state.loading = false;
        
        // Handle pagination: replace users if it's page 1, append if it's a later page
        if (action.payload.pagination?.page === 1) {
          // First page: replace all users
          state.users = action.payload.data || [];
        } else {
          // Later pages: append new users
          state.users = [...state.users, ...(action.payload.data || [])];
        }
        
        state.pagination = action.payload.pagination || null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });

    // fetchUserById
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<ApiResponse<User>>) => {
        state.loading = false;
        if (action.payload.data) {
          state.currentUser = action.payload.data;
        }
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user';
      });

    // createUser
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<ApiResponse<User>>) => {
        state.loading = false;
        if (action.payload.data) {
          state.users.push(action.payload.data);
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create user';
      });

    // updateUser
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<ApiResponse<User>>) => {
        state.loading = false;
        if (action.payload.data) {
          const index = state.users.findIndex(user => user.user_id === action.payload.data?.user_id);
          if (index !== -1) {
            state.users[index] = action.payload.data;
          }
          if (state.currentUser?.user_id === action.payload.data.user_id) {
            state.currentUser = action.payload.data;
          }
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update user';
      });

    // deleteUser
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.users = state.users.filter(user => user.user_id !== action.payload);
        if (state.currentUser?.user_id === action.payload) {
          state.currentUser = null;
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete user';
      });
  },
});

// Export actions
export const { clearError, setCurrentUser, clearUsers } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
