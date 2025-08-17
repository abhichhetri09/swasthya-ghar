-- ============================================================================
-- AAROGYACARE HEALTHCARE DATABASE MIGRATION
-- Sample Data Rollback (DOWN Migration) - Using Integer IDs for Development
-- ============================================================================

-- ============================================================================
-- DELETE SAMPLE DATA IN REVERSE ORDER
-- ============================================================================

-- Clear user insurance references first
UPDATE users SET insurance_id = NULL WHERE user_id IN (1, 2);

-- Delete audit logs
DELETE FROM audit_logs WHERE log_id IN (1, 2);

-- Delete equipment assignments
DELETE FROM equipment_assignments WHERE assignment_id IN (1, 2);

-- Delete insurance records
DELETE FROM insurance WHERE insurance_id IN (1, 2);

-- Delete lab results
DELETE FROM lab_results WHERE result_id IN (1, 2);

-- Delete prescriptions
DELETE FROM prescriptions WHERE prescription_id IN (1, 2);

-- Delete medical records
DELETE FROM medical_records WHERE record_id IN (1, 2);

-- Delete reviews
DELETE FROM reviews WHERE review_id IN (1, 2, 3, 4);

-- Delete payments
DELETE FROM payments WHERE payment_id IN (1, 2, 3, 4, 5);

-- Delete bookings
DELETE FROM bookings WHERE booking_id IN (1, 2, 3, 4, 5);

-- Delete credentials
DELETE FROM credentials WHERE credential_id IN (1, 2, 3, 4, 5);

-- Delete equipment
DELETE FROM equipment WHERE equipment_id IN (1, 2, 3, 4, 5);

-- Delete users
DELETE FROM users WHERE user_id IN (1, 2, 3, 4, 5, 6, 7);

-- Delete services
DELETE FROM services WHERE service_id IN (1, 2, 3, 4, 5, 6);

-- Delete healthcare professionals
DELETE FROM healthcare_professionals WHERE professional_id IN (1, 2, 3, 4, 5);

-- ============================================================================
-- SAMPLE DATA ROLLBACK COMPLETE
-- ============================================================================
