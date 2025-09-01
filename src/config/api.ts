import { Platform } from 'react-native';

// API Configuration
const getApiBaseUrl = () => {
  // Development environment
  if (__DEV__) {
    // Android Emulator
    if (Platform.OS === 'android') {
      console.log('🔧 API Config: Detected Android - using 10.0.2.2:3000');
      return 'http://10.0.2.2:3000';
    }
    // iOS - both simulator and physical device
    if (Platform.OS === 'ios') {
      // For physical iOS devices, we need to use the computer's IP address
      console.log('🔧 API Config: Detected iOS - using computer IP address');
      return 'http://192.168.1.151:3000'; // Your computer's actual IP address
    }
  }
  
  console.log('🔧 API Config: Using production URL');
  // Production environment
  return 'https://your-production-api.com';
};

export const API_CONFIG = {
  BASE_URL: getApiBaseUrl(),
  TIMEOUT: 10000, // 10 seconds
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      LOGOUT: '/api/auth/logout',
      REGISTER: '/api/auth/register',
      CHANGE_PASSWORD: '/api/auth/change-password',
      FORGOT_PASSWORD: '/api/auth/forgot-password',
      RESET_PASSWORD: '/api/auth/reset-password',
    },
    USERS: {
      LIST: '/api/users',
      CREATE: '/api/users',
      UPDATE: '/api/users/:id',
      DELETE: '/api/users/:id',
      GET_BY_ID: '/api/users/:id',
    },
  },
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string, params?: Record<string, string>) => {
  let url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  if (params) {
    Object.keys(params).forEach(key => {
      url = url.replace(`:${key}`, params[key]);
    });
  }
  
  console.log('🔧 API Config: Building URL:', url);
  return url;
};

// Helper function for API requests
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {},
  params?: Record<string, string>
) => {
  const url = buildApiUrl(endpoint, params);
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();
    
    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};
