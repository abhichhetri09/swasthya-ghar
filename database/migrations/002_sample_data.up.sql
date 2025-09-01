-- ============================================================================
-- AAROGYACARE HEALTHCARE DATABASE MIGRATION
-- Sample Data Insertion (UP Migration) - Using Integer IDs for Development
-- ============================================================================

-- ============================================================================
-- SAMPLE HEALTHCARE PROFESSIONALS
-- ============================================================================

INSERT INTO healthcare_professionals (
    professional_id, full_name, phone, email, role, specialization, 
    license_number, status, department, years_experience, consultation_fee
) VALUES 
    (1, 'Dr. Sarah Johnson', '+1-555-0101', 'sarah.johnson@aarogyacare.com', 'doctor', 'Cardiology', 'MD-CARD-001', 'active', 'Cardiology', 15, 150.00),
    (2, 'Dr. Michael Chen', '+1-555-0102', 'michael.chen@aarogyacare.com', 'doctor', 'Pediatrics', 'MD-PED-001', 'active', 'Pediatrics', 12, 120.00),
    (3, 'Nurse Emily Rodriguez', '+1-555-0103', 'emily.rodriguez@aarogyacare.com', 'nurse', 'Emergency Care', 'RN-EMG-001', 'active', 'Emergency', 8, 80.00),
    (4, 'Dr. James Wilson', '+1-555-0104', 'james.wilson@aarogyacare.com', 'specialist', 'Orthopedics', 'MD-ORT-001', 'active', 'Orthopedics', 20, 180.00),
    (5, 'Therapist Lisa Park', '+1-555-0105', 'lisa.park@aarogyacare.com', 'therapist', 'Physical Therapy', 'PT-PHY-001', 'active', 'Rehabilitation', 10, 100.00);

-- ============================================================================
-- SAMPLE SERVICES
-- ============================================================================

INSERT INTO services (
    service_id, name, description, base_price, active, duration, category, 
    insurance_coverage, professional_roles
) VALUES 
    (1, 'General Consultation', 'Comprehensive health consultation with a healthcare professional', 100.00, true, 30, 'consultation', true, ARRAY['doctor', 'nurse', 'specialist']),
    (2, 'Cardiology Consultation', 'Specialized consultation for heart-related issues', 150.00, true, 45, 'consultation', true, ARRAY['doctor', 'specialist']),
    (3, 'Pediatric Check-up', 'Comprehensive health check-up for children', 120.00, true, 40, 'consultation', true, ARRAY['doctor', 'nurse']),
    (4, 'Physical Therapy Session', 'One-on-one physical therapy session', 100.00, true, 60, 'therapy', true, ARRAY['therapist']),
    (5, 'Blood Test', 'Comprehensive blood work and analysis', 80.00, true, 15, 'test', true, ARRAY['nurse', 'technician']),
    (6, 'Emergency Consultation', 'Urgent medical consultation for emergency cases', 200.00, true, 30, 'emergency', true, ARRAY['doctor', 'nurse', 'specialist']);

-- ============================================================================
-- SAMPLE USERS (PATIENTS)
-- ============================================================================

INSERT INTO users (
    user_id, full_name, phone, email, role, address, emergency_contact,
    date_of_birth, gender, blood_type, emergency_contact_relationship,
    allergies, current_medications, is_active
) VALUES 
    (1, 'John Smith', '+1-555-0201', 'john.smith@email.com', 'patient', '123 Main St, City, State 12345', 'Jane Smith', '1985-03-15', 'male', 'A+', 'Spouse', ARRAY['Penicillin', 'Peanuts'], ARRAY['Lisinopril 10mg', 'Metformin 500mg'], true),
    (2, 'Maria Garcia', '+1-555-0202', 'maria.garcia@email.com', 'patient', '456 Oak Ave, City, State 12345', 'Carlos Garcia', '1990-07-22', 'female', 'O+', 'Spouse', ARRAY['Sulfa drugs'], ARRAY['Vitamin D 1000IU'], true),
    (3, 'David Kim', '+1-555-0203', 'david.kim@email.com', 'patient', '789 Pine Rd, City, State 12345', 'Sarah Kim', '1978-11-08', 'male', 'B+', 'Spouse', ARRAY[]::text[], ARRAY['Atorvastatin 20mg'], true),
    (4, 'Emma Thompson', '+1-555-0204', 'emma.thompson@email.com', 'patient', '321 Elm St, City, State 12345', 'Robert Thompson', '1995-04-12', 'female', 'AB+', 'Parent', ARRAY['Latex'], ARRAY[]::text[], true),
    (5, 'Ahmed Hassan', '+1-555-0205', 'ahmed.hassan@email.com', 'patient', '654 Maple Dr, City, State 12345', 'Fatima Hassan', '1982-09-30', 'male', 'O-', 'Spouse', ARRAY['Shellfish'], ARRAY['Omeprazole 20mg'], true),
    (6, 'Abhishek chhetri', '+1234567890', 'john.doe@example.com', 'patient', '123 Main Street, City, State 12345', 'Jane Doe - +1987654321', '1989-12-31', 'male', 'O+', 'Spouse', ARRAY['Peanuts', 'Penicillin'], ARRAY['Aspirin', 'Vitamin D'], true),
    (7, 'Sushma khanal', '985-557-8318', 'sushma.khanal@example.com', 'patient', NULL, NULL, NULL, NULL, NULL, NULL, ARRAY[]::text[], ARRAY[]::text[], true),
    (8, 'Alex Developer', '+1-555-0206', 'alex.developer@aarogyacare.com', 'developer', '789 Tech Blvd, City, State 12345', 'Emergency Contact', '1990-01-01', 'male', 'A+', 'Colleague', ARRAY[]::text[], ARRAY[]::text[], true),
    (9, 'Sarah Admin', '+1-555-0207', 'sarah.admin@aarogyacare.com', 'administrator', '456 Admin St, City, State 12345', 'Emergency Contact', '1985-06-15', 'female', 'O+', 'Colleague', ARRAY[]::text[], ARRAY[]::text[], true);

-- ============================================================================
-- SAMPLE EQUIPMENT
-- ============================================================================

INSERT INTO equipment (
    equipment_id, name, description, category, status, serial_number,
    purchase_date, warranty_expiry, location, manufacturer, model, cost
) VALUES 
    (1, 'ECG Machine', 'Electrocardiogram machine for heart monitoring', 'Diagnostic', 'available', 'ECG-2023-001', '2023-01-15', '2026-01-15', 'Cardiology Department', 'Philips', 'PageWriter TC70', 15000.00),
    (2, 'Blood Pressure Monitor', 'Digital blood pressure monitoring device', 'Monitoring', 'available', 'BPM-2023-001', '2023-02-20', '2026-02-20', 'General Practice', 'Omron', 'HEM-7320', 200.00),
    (3, 'Ultrasound Machine', 'Portable ultrasound for diagnostic imaging', 'Imaging', 'available', 'US-2023-001', '2023-03-10', '2026-03-10', 'Radiology Department', 'GE Healthcare', 'Voluson E8', 45000.00),
    (4, 'X-Ray Machine', 'Digital X-ray imaging system', 'Imaging', 'maintenance', 'XR-2022-001', '2022-06-15', '2025-06-15', 'Radiology Department', 'Siemens', 'Ysio Max', 80000.00),
    (5, 'Defibrillator', 'Automated external defibrillator', 'Emergency', 'available', 'AED-2023-001', '2023-04-05', '2026-04-05', 'Emergency Department', 'Philips', 'HeartStart FRx', 2500.00);

-- ============================================================================
-- SAMPLE CREDENTIALS
-- ============================================================================

INSERT INTO credentials (
    credential_id, professional_id, type, number, issued_on, expires_on,
    issuer, verification_status, verified_at, verified_by
) VALUES 
    (1, 1, 'license', 'MD-CARD-001', '2010-06-15', '2025-06-15', 'State Medical Board', 'verified', '2023-01-15', 1),
    (2, 2, 'license', 'MD-PED-001', '2012-08-20', '2027-08-20', 'State Medical Board', 'verified', '2023-01-15', 1),
    (3, 3, 'license', 'RN-EMG-001', '2016-05-10', '2026-05-10', 'State Nursing Board', 'verified', '2023-01-15', 1),
    (4, 4, 'license', 'MD-ORT-001', '2008-12-01', '2028-12-01', 'State Medical Board', 'verified', '2023-01-15', 1),
    (5, 5, 'license', 'PT-PHY-001', '2014-03-15', '2029-03-15', 'State Physical Therapy Board', 'verified', '2023-01-15', 1);

-- ============================================================================
-- SAMPLE INSURANCE
-- ============================================================================

INSERT INTO insurance (
    insurance_id, user_id, provider, policy_number, coverage_type,
    effective_date, expiry_date, deductible, copay, coverage_percentage,
    network_type, primary_holder, contact_info
) VALUES 
    (1, 1, 'Blue Cross Blue Shield', 'BCBS-123456789', 'individual', '2024-01-01', '2024-12-31', 1000.00, 25.00, 80, 'in_network', 'John Smith', '{"phone": "1-800-555-0123", "email": "support@bcbs.com", "website": "www.bcbs.com"}'),
    (2, 2, 'Aetna', 'AET-987654321', 'family', '2024-01-01', '2024-12-31', 1500.00, 30.00, 85, 'both', 'Maria Garcia', '{"phone": "1-800-555-0456", "email": "support@aetna.com", "website": "www.aetna.com"}');

-- ============================================================================
-- SAMPLE BOOKINGS
-- ============================================================================

INSERT INTO bookings (
    booking_id, user_id, professional_id, service_id, requested_at, scheduled_at,
    status, notes, duration, created_at
) VALUES 
    (1, 1, 1, 2, '2024-01-15 10:00:00+00', '2024-01-20 14:00:00+00', 'confirmed', 'Patient has chest pain symptoms', 45, '2024-01-15 09:00:00+00'),
    (2, 2, 2, 3, '2024-01-16 11:00:00+00', '2024-01-22 10:00:00+00', 'pending', 'Regular check-up for 3-year-old child', 40, '2024-01-16 10:00:00+00'),
    (3, 3, 4, 1, '2024-01-17 09:00:00+00', '2024-01-25 15:00:00+00', 'confirmed', 'Follow-up consultation for knee injury', 30, '2024-01-17 08:00:00+00'),
    (4, 4, 5, 4, '2024-01-18 14:00:00+00', '2024-01-26 11:00:00+00', 'confirmed', 'Post-surgery rehabilitation session', 60, '2024-01-18 13:00:00+00'),
    (5, 5, 3, 5, '2024-01-19 08:00:00+00', '2024-01-27 09:00:00+00', 'pending', 'Routine blood work', 15, '2024-01-19 07:00:00+00');

-- ============================================================================
-- SAMPLE PAYMENTS
-- ============================================================================

INSERT INTO payments (
    payment_id, booking_id, amount, method, status, paid_at, txn_ref,
    currency, discount_amount, tax_amount
) VALUES 
    (1, 1, 150.00, 'card', 'completed', '2024-01-15 10:30:00+00', 'TXN-2024-001', 'USD', 0.00, 12.00),
    (2, 2, 120.00, 'insurance', 'pending', NULL, 'INS-2024-001', 'USD', 0.00, 0.00),
    (3, 3, 100.00, 'cash', 'completed', '2024-01-17 09:30:00+00', 'CASH-2024-001', 'USD', 10.00, 7.20),
    (4, 4, 100.00, 'online', 'completed', '2024-01-18 14:30:00+00', 'ONL-2024-001', 'USD', 0.00, 8.00),
    (5, 5, 80.00, 'card', 'pending', NULL, 'TXN-2024-002', 'USD', 0.00, 6.40);

-- ============================================================================
-- SAMPLE REVIEWS
-- ============================================================================

INSERT INTO reviews (
    review_id, user_id, professional_id, booking_id, rating, comment,
    created_at, is_anonymous, helpful_count
) VALUES 
    (1, 1, 1, 1, 5, 'Dr. Johnson was very thorough and explained everything clearly. Highly recommend!', '2024-01-20 16:00:00+00', false, 3),
    (2, 2, 2, 2, 4, 'Great experience with Dr. Chen. Very patient with children.', '2024-01-22 12:00:00+00', false, 1),
    (3, 3, 4, 3, 5, 'Excellent consultation. Dr. Wilson provided clear treatment plan.', '2024-01-25 17:00:00+00', false, 2),
    (4, 4, 5, 4, 4, 'Very professional and helpful therapy session.', '2024-01-26 13:00:00+00', false, 1);

-- ============================================================================
-- SAMPLE MEDICAL RECORDS
-- ============================================================================

INSERT INTO medical_records (
    record_id, user_id, professional_id, diagnosis, treatment,
    symptoms, vital_signs, follow_up_date, notes
) VALUES 
    (1, 1, 1, 'Hypertension', 'Lifestyle modifications and medication management', ARRAY['High blood pressure', 'Headaches'], '{"blood_pressure": "140/90", "heart_rate": 72, "temperature": 98.6}', '2024-02-20', 'Patient advised to reduce salt intake and exercise regularly'),
    (2, 3, 4, 'Knee Sprain', 'RICE therapy and physical therapy', ARRAY['Knee pain', 'Swelling', 'Limited mobility'], '{"temperature": 98.4}', '2024-02-25', 'Patient should avoid strenuous activities for 2 weeks');

-- ============================================================================
-- SAMPLE PRESCRIPTIONS
-- ============================================================================

INSERT INTO prescriptions (
    prescription_id, user_id, professional_id, medication, dosage, duration,
    frequency, instructions, quantity, refills_allowed, status
) VALUES 
    (1, 1, 1, 'Lisinopril', '10mg', '30 days', 'Once daily', 'Take in the morning with or without food', 30, 3, 'active'),
    (2, 3, 4, 'Ibuprofen', '400mg', '7 days', 'Every 6 hours as needed', 'Take with food to avoid stomach upset', 28, 0, 'active');

-- ============================================================================
-- SAMPLE LAB RESULTS
-- ============================================================================

INSERT INTO lab_results (
    result_id, user_id, test_type, result_value, reference_range, status,
    ordered_by, ordered_at, collected_at, reported_at, lab_name
) VALUES 
    (1, 1, 'Complete Blood Count', 'Normal', '4.5-11.0 x10^9/L', 'normal', 1, '2024-01-20 14:00:00+00', '2024-01-20 14:30:00+00', '2024-01-21 10:00:00+00', 'Central Lab Services'),
    (2, 5, 'Lipid Panel', 'Cholesterol: 220 mg/dL', 'Less than 200 mg/dL', 'abnormal', 3, '2024-01-27 09:00:00+00', '2024-01-27 09:15:00+00', '2024-01-28 11:00:00+00', 'Central Lab Services');

-- ============================================================================
-- SAMPLE EQUIPMENT ASSIGNMENTS
-- ============================================================================

INSERT INTO equipment_assignments (
    assignment_id, professional_id, equipment_id, assigned_at, purpose,
    booking_id
) VALUES 
    (1, 1, 1, '2024-01-20 13:30:00+00', 'ECG for patient consultation', 1),
    (2, 3, 2, '2024-01-27 08:45:00+00', 'Blood pressure monitoring for lab work', 5);

-- ============================================================================
-- SAMPLE AUDIT LOGS
-- ============================================================================

INSERT INTO audit_logs (
    log_id, table_name, record_id, action, user_id, timestamp,
    ip_address, user_agent, affected_fields
) VALUES 
    (1, 'bookings', 1, 'create', 1, '2024-01-15 09:00:00+00', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', ARRAY['booking_id', 'user_id', 'professional_id', 'service_id']),
    (2, 'payments', 1, 'create', 1, '2024-01-15 10:30:00+00', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', ARRAY['payment_id', 'booking_id', 'amount', 'method']);

-- ============================================================================
-- UPDATE USER INSURANCE REFERENCES
-- ============================================================================

UPDATE users SET insurance_id = 1 WHERE user_id = 1;
UPDATE users SET insurance_id = 2 WHERE user_id = 2;

-- ============================================================================
-- SAMPLE DATA INSERTION COMPLETE
-- ============================================================================
