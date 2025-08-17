/**
 * AarogyaCare API Service
 * 
 * Centralized API layer for all healthcare data operations
 */

import { 
  User, 
  HealthcareProfessional, 
  Booking, 
  Payment,
  MedicalRecord,
  Prescription,
  LabResult,
  Insurance,
  Equipment,
  Service,
  Review
} from '../types/database';

// Get the appropriate base URL for the platform
const getBaseURL = () => {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  
  // For Expo development with tunnel
  // We need to use the computer's IP address since the tunnel doesn't handle localhost
  // The tunnel only handles the React Native app's connection to Metro bundler
  return 'http://192.168.1.116:3000/api';
};

// API Base Configuration
const API_CONFIG = {
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
};





// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// API Error Handler
class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Base API Client
class ApiClient {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor(config: typeof API_CONFIG) {
    this.baseURL = config.baseURL;
    this.headers = config.headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        ...this.headers,
        ...options.headers,
      },
      ...options,
    };



    try {
      const response = await fetch(url, config);
      

      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new ApiError(
          response.status,
          response.statusText,
          errorData
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(0, 'Network error', error);
    }
  }

  // GET request
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request<T>(`${endpoint}${queryString}`, { method: 'GET' });
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Initialize API client
const apiClient = new ApiClient(API_CONFIG);

// API Service Classes
export class UserApiService {
  // Get all users with pagination
  async getUsers(page = 1, limit = 10): Promise<PaginatedResponse<User>> {
    return apiClient.get<PaginatedResponse<User>>('/users', { page, limit });
  }

  // Get user by ID
  async getUserById(userId: number): Promise<ApiResponse<User>> {
    return apiClient.get<ApiResponse<User>>(`/users/${userId}`);
  }

  // Create new user
  async createUser(userData: Omit<User, 'user_id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<User>> {
    return apiClient.post<ApiResponse<User>>('/users', userData);
  }

  // Update user
  async updateUser(userId: number, userData: Partial<User>): Promise<ApiResponse<User>> {
    return apiClient.put<ApiResponse<User>>(`/users/${userId}`, userData);
  }

  // Delete user
  async deleteUser(userId: number): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`/users/${userId}`);
  }

  // Get user's medical records
  async getUserMedicalRecords(userId: number): Promise<ApiResponse<MedicalRecord[]>> {
    return apiClient.get<ApiResponse<MedicalRecord[]>>(`/users/${userId}/medical-records`);
  }

  // Get user's bookings
  async getUserBookings(userId: number): Promise<ApiResponse<Booking[]>> {
    return apiClient.get<ApiResponse<Booking[]>>(`/users/${userId}/bookings`);
  }
}

export class HealthcareProfessionalApiService {
  // Get all professionals
  async getProfessionals(page = 1, limit = 10): Promise<PaginatedResponse<HealthcareProfessional>> {
    return apiClient.get<PaginatedResponse<HealthcareProfessional>>('/professionals', { page, limit });
  }

  // Get professional by ID
  async getProfessionalById(professionalId: number): Promise<ApiResponse<HealthcareProfessional>> {
    return apiClient.get<ApiResponse<HealthcareProfessional>>(`/professionals/${professionalId}`);
  }

  // Create new professional
  async createProfessional(professionalData: Omit<HealthcareProfessional, 'professional_id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<HealthcareProfessional>> {
    return apiClient.post<ApiResponse<HealthcareProfessional>>('/professionals', professionalData);
  }

  // Update professional
  async updateProfessional(professionalId: number, professionalData: Partial<HealthcareProfessional>): Promise<ApiResponse<HealthcareProfessional>> {
    return apiClient.put<ApiResponse<HealthcareProfessional>>(`/professionals/${professionalId}`, professionalData);
  }

  // Get professional's bookings
  async getProfessionalBookings(professionalId: number): Promise<ApiResponse<Booking[]>> {
    return apiClient.get<ApiResponse<Booking[]>>(`/professionals/${professionalId}/bookings`);
  }

  // Get professional's reviews
  async getProfessionalReviews(professionalId: number): Promise<ApiResponse<Review[]>> {
    return apiClient.get<ApiResponse<Review[]>>(`/professionals/${professionalId}/reviews`);
  }
}

export class BookingApiService {
  // Get all bookings
  async getBookings(page = 1, limit = 10, filters?: {
    status?: string;
    userId?: number;
    professionalId?: number;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<PaginatedResponse<Booking>> {
    return apiClient.get<PaginatedResponse<Booking>>('/bookings', { page, limit, ...filters });
  }

  // Get booking by ID
  async getBookingById(bookingId: number): Promise<ApiResponse<Booking>> {
    return apiClient.get<ApiResponse<Booking>>(`/bookings/${bookingId}`);
  }

  // Create new booking
  async createBooking(bookingData: Omit<Booking, 'booking_id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Booking>> {
    return apiClient.post<ApiResponse<Booking>>('/bookings', bookingData);
  }

  // Update booking status
  async updateBookingStatus(bookingId: number, status: Booking['status']): Promise<ApiResponse<Booking>> {
    return apiClient.put<ApiResponse<Booking>>(`/bookings/${bookingId}/status`, { status });
  }

  // Cancel booking
      async cancelBooking(bookingId: number, reason?: string): Promise<ApiResponse<Booking>> {
    return apiClient.put<ApiResponse<Booking>>(`/bookings/${bookingId}/cancel`, { reason });
  }
}

export class PaymentApiService {
  // Get payments
  async getPayments(page = 1, limit = 10, filters?: {
    status?: string;
    bookingId?: number;
    method?: string;
  }): Promise<PaginatedResponse<Payment>> {
    return apiClient.get<PaginatedResponse<Payment>>('/payments', { page, limit, ...filters });
  }

  // Process payment
  async processPayment(paymentData: Omit<Payment, 'payment_id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Payment>> {
          return apiClient.post<ApiResponse<Payment>>('/payments', paymentData);
  }

  // Get payment by ID
  async getPaymentById(paymentId: number): Promise<ApiResponse<Payment>> {
    return apiClient.get<ApiResponse<Payment>>(`/payments/${paymentId}`);
  }
}

export class MedicalRecordApiService {
  // Get medical records
  async getMedicalRecords(page = 1, limit = 10, filters?: {
    userId?: number;
    professionalId?: number;
  }): Promise<PaginatedResponse<MedicalRecord>> {
    return apiClient.get<PaginatedResponse<MedicalRecord>>('/medical-records', { page, limit, ...filters });
  }

  // Create medical record
  async createMedicalRecord(recordData: Omit<MedicalRecord, 'record_id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<MedicalRecord>> {
    return apiClient.post<ApiResponse<MedicalRecord>>('/medical-records', recordData);
  }

  // Get medical record by ID
  async getMedicalRecordById(recordId: number): Promise<ApiResponse<MedicalRecord>> {
    return apiClient.get<ApiResponse<MedicalRecord>>(`/medical-records/${recordId}`);
  }
}

export class ServiceApiService {
  // Get all services
  async getServices(page = 1, limit = 10, filters?: {
    category?: string;
    active?: boolean;
  }): Promise<PaginatedResponse<Service>> {
    return apiClient.get<PaginatedResponse<Service>>('/services', { page, limit, ...filters });
  }

  // Get service by ID
        async getServiceById(serviceId: number): Promise<ApiResponse<Service>> {
    return apiClient.get<ApiResponse<Service>>(`/services/${serviceId}`);
  }
}

// Export all services
export const apiServices = {
  users: new UserApiService(),
  professionals: new HealthcareProfessionalApiService(),
  bookings: new BookingApiService(),
  payments: new PaymentApiService(),
  medicalRecords: new MedicalRecordApiService(),
  services: new ServiceApiService(),
};

export default apiServices;
