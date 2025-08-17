-- ============================================================================
-- AAROGYACARE HEALTHCARE DATABASE MIGRATION
-- Initial Schema Creation (UP Migration) - Using Integer IDs for Development
-- ============================================================================

-- ============================================================================
-- USERS TABLE
-- ============================================================================

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    address TEXT,
    emergency_contact VARCHAR(255),
    date_of_birth DATE,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
    blood_type VARCHAR(5),
    emergency_contact_relationship VARCHAR(50),
    allergies TEXT[] DEFAULT ARRAY[]::text[],
    current_medications TEXT[] DEFAULT ARRAY[]::text[],
    insurance_id INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- HEALTHCARE PROFESSIONALS TABLE
-- ============================================================================

CREATE TABLE healthcare_professionals (
    professional_id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('doctor', 'nurse', 'specialist', 'therapist', 'technician')),
    specialization VARCHAR(100),
    license_number VARCHAR(50) UNIQUE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    department VARCHAR(100),
    years_experience INTEGER,
    consultation_fee DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- SERVICES TABLE
-- ============================================================================

CREATE TABLE services (
    service_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    base_price DECIMAL(10,2) NOT NULL,
    active BOOLEAN DEFAULT true,
    duration INTEGER, -- in minutes
    category VARCHAR(50) CHECK (category IN ('consultation', 'therapy', 'test', 'emergency', 'surgery')),
    insurance_coverage BOOLEAN DEFAULT true,
    professional_roles TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- BOOKINGS TABLE
-- ============================================================================

CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    professional_id INTEGER NOT NULL REFERENCES healthcare_professionals(professional_id) ON DELETE CASCADE,
    service_id INTEGER NOT NULL REFERENCES services(service_id) ON DELETE CASCADE,
    requested_at TIMESTAMP WITH TIME ZONE NOT NULL,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
    notes TEXT,
    duration INTEGER, -- in minutes
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- PAYMENTS TABLE
-- ============================================================================

CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    booking_id INTEGER NOT NULL REFERENCES bookings(booking_id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    method VARCHAR(20) CHECK (method IN ('cash', 'card', 'online', 'insurance')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    paid_at TIMESTAMP WITH TIME ZONE,
    txn_ref VARCHAR(100),
    currency VARCHAR(3) DEFAULT 'USD',
    discount_amount DECIMAL(10,2) DEFAULT 0,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- EQUIPMENT TABLE
-- ============================================================================

CREATE TABLE equipment (
    equipment_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) CHECK (category IN ('Diagnostic', 'Monitoring', 'Imaging', 'Emergency', 'Surgical')),
    status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'in_use', 'maintenance', 'retired')),
    serial_number VARCHAR(100) UNIQUE,
    purchase_date DATE,
    warranty_expiry DATE,
    location VARCHAR(255),
    manufacturer VARCHAR(255),
    model VARCHAR(255),
    cost DECIMAL(12,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- CREDENTIALS TABLE
-- ============================================================================

CREATE TABLE credentials (
    credential_id SERIAL PRIMARY KEY,
    professional_id INTEGER NOT NULL REFERENCES healthcare_professionals(professional_id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('license', 'certification', 'degree', 'membership')),
    number VARCHAR(100) NOT NULL,
    issued_on DATE NOT NULL,
    expires_on DATE,
    issuer VARCHAR(255) NOT NULL,
    verification_status VARCHAR(20) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
    verified_at TIMESTAMP WITH TIME ZONE,
    verified_by INTEGER REFERENCES users(user_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- REVIEWS TABLE
-- ============================================================================

CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    professional_id INTEGER NOT NULL REFERENCES healthcare_professionals(professional_id) ON DELETE CASCADE,
    booking_id INTEGER REFERENCES bookings(booking_id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_anonymous BOOLEAN DEFAULT false,
    helpful_count INTEGER DEFAULT 0
);

-- ============================================================================
-- MEDICAL RECORDS TABLE
-- ============================================================================

CREATE TABLE medical_records (
    record_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    professional_id INTEGER NOT NULL REFERENCES healthcare_professionals(professional_id) ON DELETE CASCADE,
    diagnosis TEXT NOT NULL,
    treatment TEXT,
    symptoms TEXT[],
    vital_signs JSONB,
    follow_up_date DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- PRESCRIPTIONS TABLE
-- ============================================================================

CREATE TABLE prescriptions (
    prescription_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    professional_id INTEGER NOT NULL REFERENCES healthcare_professionals(professional_id) ON DELETE CASCADE,
    medication VARCHAR(255) NOT NULL,
    dosage VARCHAR(100) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    frequency VARCHAR(100) NOT NULL,
    instructions TEXT,
    quantity INTEGER,
    refills_allowed INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'discontinued')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- LAB RESULTS TABLE
-- ============================================================================

CREATE TABLE lab_results (
    result_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    test_type VARCHAR(255) NOT NULL,
    result_value TEXT NOT NULL,
    reference_range VARCHAR(255),
    status VARCHAR(20) DEFAULT 'normal' CHECK (status IN ('normal', 'abnormal', 'critical')),
    ordered_by INTEGER REFERENCES healthcare_professionals(professional_id),
    ordered_at TIMESTAMP WITH TIME ZONE,
    collected_at TIMESTAMP WITH TIME ZONE,
    reported_at TIMESTAMP WITH TIME ZONE,
    lab_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- INSURANCE TABLE
-- ============================================================================

CREATE TABLE insurance (
    insurance_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    provider VARCHAR(255) NOT NULL,
    policy_number VARCHAR(100) NOT NULL,
    coverage_type VARCHAR(50) CHECK (coverage_type IN ('individual', 'family', 'group')),
    effective_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    deductible DECIMAL(10,2),
    copay DECIMAL(10,2),
    coverage_percentage INTEGER CHECK (coverage_percentage >= 0 AND coverage_percentage <= 100),
    network_type VARCHAR(20) CHECK (network_type IN ('in_network', 'out_network', 'both')),
    primary_holder VARCHAR(255),
    contact_info JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- EQUIPMENT ASSIGNMENTS TABLE
-- ============================================================================

CREATE TABLE equipment_assignments (
    assignment_id SERIAL PRIMARY KEY,
    professional_id INTEGER NOT NULL REFERENCES healthcare_professionals(professional_id) ON DELETE CASCADE,
    equipment_id INTEGER NOT NULL REFERENCES equipment(equipment_id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    purpose TEXT,
    booking_id INTEGER REFERENCES bookings(booking_id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- AUDIT LOGS TABLE
-- ============================================================================

CREATE TABLE audit_logs (
    log_id SERIAL PRIMARY KEY,
    table_name VARCHAR(100) NOT NULL,
    record_id INTEGER NOT NULL,
    action VARCHAR(20) NOT NULL CHECK (action IN ('create', 'update', 'delete')),
    user_id INTEGER REFERENCES users(user_id),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT,
    affected_fields TEXT[]
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Users indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_insurance_id ON users(insurance_id);
CREATE INDEX idx_users_is_active ON users(is_active);

-- Healthcare professionals indexes
CREATE INDEX idx_professionals_email ON healthcare_professionals(email);
CREATE INDEX idx_professionals_role ON healthcare_professionals(role);
CREATE INDEX idx_professionals_status ON healthcare_professionals(status);
CREATE INDEX idx_professionals_department ON healthcare_professionals(department);
CREATE INDEX idx_professionals_license ON healthcare_professionals(license_number);

-- Services indexes
CREATE INDEX idx_services_active ON services(active);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_price ON services(base_price);

-- Bookings indexes
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_professional_id ON bookings(professional_id);
CREATE INDEX idx_bookings_service_id ON bookings(service_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_scheduled_at ON bookings(scheduled_at);
CREATE INDEX idx_bookings_requested_at ON bookings(requested_at);

-- Payments indexes
CREATE INDEX idx_payments_booking_id ON payments(booking_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_method ON payments(method);
CREATE INDEX idx_payments_paid_at ON payments(paid_at);

-- Equipment indexes
CREATE INDEX idx_equipment_status ON equipment(status);
CREATE INDEX idx_equipment_category ON equipment(category);
CREATE INDEX idx_equipment_location ON equipment(location);
CREATE INDEX idx_equipment_serial ON equipment(serial_number);

-- Credentials indexes
CREATE INDEX idx_credentials_professional_id ON credentials(professional_id);
CREATE INDEX idx_credentials_type ON credentials(type);
CREATE INDEX idx_credentials_status ON credentials(verification_status);
CREATE INDEX idx_credentials_expires ON credentials(expires_on);

-- Reviews indexes
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_professional_id ON reviews(professional_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_created_at ON reviews(created_at);

-- Medical records indexes
CREATE INDEX idx_medical_records_user_id ON medical_records(user_id);
CREATE INDEX idx_medical_records_professional_id ON medical_records(professional_id);
CREATE INDEX idx_medical_records_diagnosis ON medical_records(diagnosis);

-- Prescriptions indexes
CREATE INDEX idx_prescriptions_user_id ON prescriptions(user_id);
CREATE INDEX idx_prescriptions_professional_id ON prescriptions(professional_id);
CREATE INDEX idx_prescriptions_status ON prescriptions(status);
CREATE INDEX idx_prescriptions_medication ON prescriptions(medication);

-- Lab results indexes
CREATE INDEX idx_lab_results_user_id ON lab_results(user_id);
CREATE INDEX idx_lab_results_test_type ON lab_results(test_type);
CREATE INDEX idx_lab_results_status ON lab_results(status);
CREATE INDEX idx_lab_results_ordered_at ON lab_results(ordered_at);

-- Insurance indexes
CREATE INDEX idx_insurance_user_id ON insurance(user_id);
CREATE INDEX idx_insurance_provider ON insurance(provider);
CREATE INDEX idx_insurance_expiry ON insurance(expiry_date);

-- Equipment assignments indexes
CREATE INDEX idx_equipment_assignments_professional_id ON equipment_assignments(professional_id);
CREATE INDEX idx_equipment_assignments_equipment_id ON equipment_assignments(equipment_id);
CREATE INDEX idx_equipment_assignments_booking_id ON equipment_assignments(booking_id);

-- Audit logs indexes
CREATE INDEX idx_audit_logs_table_name ON audit_logs(table_name);
CREATE INDEX idx_audit_logs_record_id ON audit_logs(record_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);

-- ============================================================================
-- FOREIGN KEY CONSTRAINTS
-- ============================================================================

-- Add foreign key for users.insurance_id
ALTER TABLE users ADD CONSTRAINT fk_users_insurance 
    FOREIGN KEY (insurance_id) REFERENCES insurance(insurance_id) ON DELETE SET NULL;

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT TIMESTAMPS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_healthcare_professionals_updated_at BEFORE UPDATE ON healthcare_professionals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_equipment_updated_at BEFORE UPDATE ON equipment FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_credentials_updated_at BEFORE UPDATE ON credentials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_medical_records_updated_at BEFORE UPDATE ON medical_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_prescriptions_updated_at BEFORE UPDATE ON prescriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_lab_results_updated_at BEFORE UPDATE ON lab_results FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_insurance_updated_at BEFORE UPDATE ON insurance FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_equipment_assignments_updated_at BEFORE UPDATE ON equipment_assignments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE COMMENTS
-- ============================================================================

COMMENT ON TABLE users IS 'Patient/user information and demographics';
COMMENT ON TABLE healthcare_professionals IS 'Healthcare providers and their credentials';
COMMENT ON TABLE services IS 'Available healthcare services and pricing';
COMMENT ON TABLE bookings IS 'Appointment bookings and scheduling';
COMMENT ON TABLE payments IS 'Payment transactions and billing';
COMMENT ON TABLE equipment IS 'Medical equipment inventory and management';
COMMENT ON TABLE credentials IS 'Professional licenses and certifications';
COMMENT ON TABLE reviews IS 'Patient reviews and ratings';
COMMENT ON TABLE medical_records IS 'Patient medical history and diagnoses';
COMMENT ON TABLE prescriptions IS 'Medication prescriptions and orders';
COMMENT ON TABLE lab_results IS 'Laboratory test results';
COMMENT ON TABLE insurance IS 'Patient insurance information';
COMMENT ON TABLE equipment_assignments IS 'Equipment usage tracking';
COMMENT ON TABLE audit_logs IS 'System audit trail for compliance';
