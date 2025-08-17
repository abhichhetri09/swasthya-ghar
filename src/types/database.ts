// ============================================================================
// HEALTHCARE DATABASE SCHEMA TYPES
// ============================================================================

// ============================================================================
// CORE ENTITY TYPES
// ============================================================================

export interface User {
  user_id: string; // UUID - Primary Key
  full_name: string;
  phone: string;
  email: string;
  address: string;
  emergency_contact: string;
  created_at: Date;
  
  // Enhanced fields for healthcare
  date_of_birth?: Date;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  blood_type?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  emergency_contact_relationship?: string;
  insurance_id?: string; // Foreign key to Insurance
  medical_history?: string; // JSON string or reference to MedicalRecord
  allergies?: string[]; // Array of allergy strings
  current_medications?: string[]; // Array of medication strings
  updated_at?: Date;
  is_active: boolean;
}

export interface HealthcareProfessional {
  professional_id: string; // UUID - Primary Key
  full_name: string;
  phone: string;
  email: string;
  role: 'doctor' | 'nurse' | 'specialist' | 'therapist' | 'technician';
  specialization: string;
  license_number: string;
  status: 'active' | 'inactive' | 'suspended' | 'retired';
  created_at: Date;
  
  // Enhanced fields
  department?: string;
  years_experience?: number;
  availability_schedule?: string; // JSON string for weekly schedule
  education?: string[];
  certifications?: string[]; // Array of certification strings
  languages?: string[]; // Array of spoken languages
  consultation_fee?: number;
  updated_at?: Date;
}

export interface Service {
  service_id: string; // UUID - Primary Key
  name: string;
  description: string;
  base_price: number;
  active: boolean;
  
  // Enhanced fields
  duration?: number; // in minutes
  category?: 'consultation' | 'procedure' | 'test' | 'therapy' | 'emergency';
  insurance_coverage?: boolean;
  prerequisites?: string[]; // Array of prerequisite service IDs
  equipment_required?: string[]; // Array of equipment IDs
  professional_roles?: string[]; // Array of roles that can provide this service
  created_at?: Date;
  updated_at?: Date;
}

export interface Booking {
  booking_id: string; // UUID - Primary Key
  user_id: string; // Foreign Key to User
  professional_id: string; // Foreign Key to HealthcareProfessional
  service_id: string; // Foreign Key to Service
  requested_at: Date;
  scheduled_at: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  address_override?: string;
  
  // Enhanced fields
  duration?: number; // actual duration in minutes
  actual_start_time?: Date;
  actual_end_time?: Date;
  cancellation_reason?: string;
  cancellation_time?: Date;
  reminder_sent?: boolean;
  reminder_sent_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface Payment {
  payment_id: string; // UUID - Primary Key
  booking_id: string; // Foreign Key to Booking
  amount: number;
  method: 'cash' | 'card' | 'insurance' | 'online' | 'bank_transfer';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paid_at?: Date;
  txn_ref?: string;
  
  // Enhanced fields
  currency?: string;
  insurance_claim_id?: string;
  discount_amount?: number;
  tax_amount?: number;
  receipt_url?: string;
  refund_reason?: string;
  refunded_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface Equipment {
  equipment_id: string; // UUID - Primary Key
  name: string;
  description: string;
  category: string;
  status: 'available' | 'in_use' | 'maintenance' | 'retired';
  
  // Enhanced fields
  serial_number?: string;
  purchase_date?: Date;
  warranty_expiry?: Date;
  last_maintenance?: Date;
  next_maintenance?: Date;
  location?: string;
  manufacturer?: string;
  model?: string;
  cost?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface EquipmentAssignment {
  assignment_id: string; // UUID - Primary Key
  professional_id: string; // Foreign Key to HealthcareProfessional
  equipment_id: string; // Foreign Key to Equipment
  assigned_at: Date;
  returned_at?: Date;
  condition_notes?: string;
  
  // Enhanced fields
  expected_return_date?: Date;
  purpose?: string;
  booking_id?: string; // If assigned for specific booking
  created_at?: Date;
  updated_at?: Date;
}

export interface Credential {
  credential_id: string; // UUID - Primary Key
  professional_id: string; // Foreign Key to HealthcareProfessional
  type: 'license' | 'certification' | 'degree' | 'membership';
  number: string;
  issued_on: Date;
  expires_on?: Date;
  issuer: string;
  file_url?: string;
  
  // Enhanced fields
  verification_status?: 'pending' | 'verified' | 'rejected';
  verified_at?: Date;
  verified_by?: string; // Admin who verified
  notes?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Review {
  review_id: string; // UUID - Primary Key
  user_id: string; // Foreign Key to User
  professional_id: string; // Foreign Key to HealthcareProfessional
  booking_id: string; // Foreign Key to Booking
  rating: number; // 1-5 stars
  comment?: string;
  created_at: Date;
  
  // Enhanced fields
  response?: string; // Professional's response
  response_at?: Date;
  is_anonymous?: boolean;
  helpful_count?: number;
  reported?: boolean;
  reported_reason?: string;
  updated_at?: Date;
}

// ============================================================================
// ENHANCED HEALTHCARE ENTITIES
// ============================================================================

export interface MedicalRecord {
  record_id: string; // UUID - Primary Key
  user_id: string; // Foreign Key to User
  professional_id: string; // Foreign Key to HealthcareProfessional
  diagnosis: string;
  treatment: string;
  created_at: Date;
  
  // Enhanced fields
  symptoms?: string[];
  vital_signs?: {
    blood_pressure?: string;
    heart_rate?: number;
    temperature?: number;
    weight?: number;
    height?: number;
  };
  lab_results?: string[]; // Array of lab result IDs
  prescriptions?: string[]; // Array of prescription IDs
  follow_up_date?: Date;
  notes?: string;
  attachments?: string[]; // Array of file URLs
  updated_at?: Date;
}

export interface Prescription {
  prescription_id: string; // UUID - Primary Key
  user_id: string; // Foreign Key to User
  professional_id: string; // Foreign Key to HealthcareProfessional
  medication: string;
  dosage: string;
  duration: string;
  
  // Enhanced fields
  frequency?: string; // e.g., "twice daily", "as needed"
  instructions?: string;
  quantity?: number;
  refills_allowed?: number;
  refills_remaining?: number;
  start_date?: Date;
  end_date?: Date;
  status?: 'active' | 'completed' | 'discontinued';
  discontinuation_reason?: string;
  side_effects?: string[];
  interactions?: string[];
  created_at?: Date;
  updated_at?: Date;
}

export interface LabResult {
  result_id: string; // UUID - Primary Key
  user_id: string; // Foreign Key to User
  test_type: string;
  result_value: string;
  reference_range?: string;
  status: 'pending' | 'normal' | 'abnormal' | 'critical';
  
  // Enhanced fields
  ordered_by?: string; // Professional ID
  ordered_at?: Date;
  collected_at?: Date;
  reported_at?: Date;
  lab_name?: string;
  notes?: string;
  attachments?: string[]; // Array of file URLs
  follow_up_required?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface Insurance {
  insurance_id: string; // UUID - Primary Key
  user_id: string; // Foreign Key to User
  provider: string;
  policy_number: string;
  coverage_type: 'individual' | 'family' | 'group';
  
  // Enhanced fields
  group_number?: string;
  effective_date?: Date;
  expiry_date?: Date;
  deductible?: number;
  copay?: number;
  coverage_percentage?: number;
  network_type?: 'in_network' | 'out_network' | 'both';
  primary_holder?: string;
  dependents?: string[]; // Array of dependent user IDs
  contact_info?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  created_at?: Date;
  updated_at?: Date;
}

export interface AuditLog {
  log_id: string; // UUID - Primary Key
  table_name: string;
  record_id: string;
  action: 'create' | 'update' | 'delete' | 'view';
  user_id: string; // User who performed the action
  timestamp: Date;
  changes?: string; // JSON string of changes made
  
  // Enhanced fields
  ip_address?: string;
  user_agent?: string;
  session_id?: string;
  affected_fields?: string[]; // Array of field names that were changed
  old_values?: string; // JSON string of old values
  new_values?: string; // JSON string of new values
}

// ============================================================================
// ENUM TYPES
// ============================================================================

export type UserGender = 'male' | 'female' | 'other' | 'prefer_not_to_say';
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type ProfessionalRole = 'doctor' | 'nurse' | 'specialist' | 'therapist' | 'technician';
export type ProfessionalStatus = 'active' | 'inactive' | 'suspended' | 'retired';
export type ServiceCategory = 'consultation' | 'procedure' | 'test' | 'therapy' | 'emergency';
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
export type PaymentMethod = 'cash' | 'card' | 'insurance' | 'online' | 'bank_transfer';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type EquipmentStatus = 'available' | 'in_use' | 'maintenance' | 'retired';
export type CredentialType = 'license' | 'certification' | 'degree' | 'membership';
export type VerificationStatus = 'pending' | 'verified' | 'rejected';
export type LabResultStatus = 'pending' | 'normal' | 'abnormal' | 'critical';
export type CoverageType = 'individual' | 'family' | 'group';
export type NetworkType = 'in_network' | 'out_network' | 'both';
export type AuditAction = 'create' | 'update' | 'delete' | 'view';

// ============================================================================
// HELPER TYPES
// ============================================================================

export interface DatabaseSchema {
  users: User[];
  healthcare_professionals: HealthcareProfessional[];
  services: Service[];
  bookings: Booking[];
  payments: Payment[];
  equipment: Equipment[];
  equipment_assignments: EquipmentAssignment[];
  credentials: Credential[];
  reviews: Review[];
  medical_records: MedicalRecord[];
  prescriptions: Prescription[];
  lab_results: LabResult[];
  insurance: Insurance[];
  audit_logs: AuditLog[];
}

export interface VitalSigns {
  blood_pressure?: string;
  heart_rate?: number;
  temperature?: number;
  weight?: number;
  height?: number;
}

export interface InsuranceContact {
  phone?: string;
  email?: string;
  website?: string;
}

// ============================================================================
// QUERY TYPES
// ============================================================================

export interface BookingQuery {
  user_id?: string;
  professional_id?: string;
  service_id?: string;
  status?: BookingStatus;
  start_date?: Date;
  end_date?: Date;
  limit?: number;
  offset?: number;
}

export interface PaymentQuery {
  booking_id?: string;
  status?: PaymentStatus;
  method?: PaymentMethod;
  start_date?: Date;
  end_date?: Date;
  min_amount?: number;
  max_amount?: number;
  limit?: number;
  offset?: number;
}

export interface ReviewQuery {
  user_id?: string;
  professional_id?: string;
  booking_id?: string;
  min_rating?: number;
  max_rating?: number;
  start_date?: Date;
  end_date?: Date;
  limit?: number;
  offset?: number;
}

// ============================================================================
// RESPONSE TYPES
// ============================================================================

export interface BookingWithDetails extends Booking {
  user: User;
  professional: HealthcareProfessional;
  service: Service;
  payment?: Payment;
  reviews?: Review[];
}

export interface ProfessionalWithDetails extends HealthcareProfessional {
  credentials: Credential[];
  reviews: Review[];
  equipment_assignments: EquipmentAssignment[];
  bookings: Booking[];
}

export interface UserWithDetails extends User {
  bookings: Booking[];
  reviews: Review[];
  medical_records: MedicalRecord[];
  prescriptions: Prescription[];
  lab_results: LabResult[];
  insurance: Insurance[];
}

export interface ServiceWithDetails extends Service {
  bookings: Booking[];
  equipment_required_details: Equipment[];
}

// ============================================================================
// STATISTICS TYPES
// ============================================================================

export interface BookingStatistics {
  total_bookings: number;
  completed_bookings: number;
  cancelled_bookings: number;
  no_show_bookings: number;
  average_rating: number;
  total_revenue: number;
  monthly_trends: {
    month: string;
    bookings: number;
    revenue: number;
  }[];
}

export interface ProfessionalStatistics {
  professional_id: string;
  total_bookings: number;
  completed_bookings: number;
  average_rating: number;
  total_reviews: number;
  total_revenue: number;
  patient_satisfaction: number;
}

export interface UserStatistics {
  user_id: string;
  total_bookings: number;
  completed_bookings: number;
  total_spent: number;
  average_rating_given: number;
  loyalty_score: number;
}
