-- ============================================================================
-- AAROGYACARE HEALTHCARE DATABASE MIGRATION
-- Sample Data Rollback (DOWN Migration)
-- ============================================================================

-- ============================================================================
-- DELETE SAMPLE DATA IN REVERSE ORDER
-- ============================================================================

-- Clear user insurance references first
UPDATE users SET insurance_id = NULL WHERE user_id IN (
    '770e8400-e29b-41d4-a716-446655440001',
    '770e8400-e29b-41d4-a716-446655440002'
);

-- Delete audit logs
DELETE FROM audit_logs WHERE log_id IN (
    'aa0e8400-e29b-41d4-a716-446655440001',
    'aa0e8400-e29b-41d4-a716-446655440002'
);

-- Delete equipment assignments
DELETE FROM equipment_assignments WHERE assignment_id IN (
    '990e8400-e29b-41d4-a716-446655440001',
    '990e8400-e29b-41d4-a716-446655440002'
);

-- Delete insurance records
DELETE FROM insurance WHERE insurance_id IN (
    '880e8400-e29b-41d4-a716-446655440001',
    '880e8400-e29b-41d4-a716-446655440002'
);

-- Delete lab results
DELETE FROM lab_results WHERE result_id IN (
    'ff0e8400-e29b-41d4-a716-446655440001',
    'ff0e8400-e29b-41d4-a716-446655440002'
);

-- Delete prescriptions
DELETE FROM prescriptions WHERE prescription_id IN (
    'ee0e8400-e29b-41d4-a716-446655440001',
    'ee0e8400-e29b-41d4-a716-446655440002'
);

-- Delete medical records
DELETE FROM medical_records WHERE record_id IN (
    'dd0e8400-e29b-41d4-a716-446655440001',
    'dd0e8400-e29b-41d4-a716-446655440002'
);

-- Delete reviews
DELETE FROM reviews WHERE review_id IN (
    'cc0e8400-e29b-41d4-a716-446655440001',
    'cc0e8400-e29b-41d4-a716-446655440002',
    'cc0e8400-e29b-41d4-a716-446655440003',
    'cc0e8400-e29b-41d4-a716-446655440004'
);

-- Delete payments
DELETE FROM payments WHERE payment_id IN (
    'bb0e8400-e29b-41d4-a716-446655440001',
    'bb0e8400-e29b-41d4-a716-446655440002',
    'bb0e8400-e29b-41d4-a716-446655440003',
    'bb0e8400-e29b-41d4-a716-446655440004',
    'bb0e8400-e29b-41d4-a716-446655440005'
);

-- Delete bookings
DELETE FROM bookings WHERE booking_id IN (
    'aa0e8400-e29b-41d4-a716-446655440001',
    'aa0e8400-e29b-41d4-a716-446655440002',
    'aa0e8400-e29b-41d4-a716-446655440003',
    'aa0e8400-e29b-41d4-a716-446655440004',
    'aa0e8400-e29b-41d4-a716-446655440005'
);

-- Delete credentials
DELETE FROM credentials WHERE credential_id IN (
    '990e8400-e29b-41d4-a716-446655440001',
    '990e8400-e29b-41d4-a716-446655440002',
    '990e8400-e29b-41d4-a716-446655440003',
    '990e8400-e29b-41d4-a716-446655440004',
    '990e8400-e29b-41d4-a716-446655440005'
);

-- Delete equipment
DELETE FROM equipment WHERE equipment_id IN (
    '880e8400-e29b-41d4-a716-446655440001',
    '880e8400-e29b-41d4-a716-446655440002',
    '880e8400-e29b-41d4-a716-446655440003',
    '880e8400-e29b-41d4-a716-446655440004',
    '880e8400-e29b-41d4-a716-446655440005'
);

-- Delete users
DELETE FROM users WHERE user_id IN (
    '770e8400-e29b-41d4-a716-446655440001',
    '770e8400-e29b-41d4-a716-446655440002',
    '770e8400-e29b-41d4-a716-446655440003',
    '770e8400-e29b-41d4-a716-446655440004',
    '770e8400-e29b-41d4-a716-446655440005'
);

-- Delete services
DELETE FROM services WHERE service_id IN (
    '660e8400-e29b-41d4-a716-446655440001',
    '660e8400-e29b-41d4-a716-446655440002',
    '660e8400-e29b-41d4-a716-446655440003',
    '660e8400-e29b-41d4-a716-446655440004',
    '660e8400-e29b-41d4-a716-446655440005',
    '660e8400-e29b-41d4-a716-446655440006'
);

-- Delete healthcare professionals
DELETE FROM healthcare_professionals WHERE professional_id IN (
    '550e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440003',
    '550e8400-e29b-41d4-a716-446655440004',
    '550e8400-e29b-41d4-a716-446655440005'
);

-- ============================================================================
-- SAMPLE DATA ROLLBACK COMPLETE
-- ============================================================================
