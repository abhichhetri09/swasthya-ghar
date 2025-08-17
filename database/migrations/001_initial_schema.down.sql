-- ============================================================================
-- AAROGYACARE HEALTHCARE DATABASE MIGRATION
-- Initial Schema Rollback (DOWN Migration)
-- ============================================================================

-- ============================================================================
-- DROP TRIGGERS FIRST
-- ============================================================================

DROP TRIGGER IF EXISTS update_equipment_assignments_updated_at ON equipment_assignments;
DROP TRIGGER IF EXISTS update_insurance_updated_at ON insurance;
DROP TRIGGER IF EXISTS update_lab_results_updated_at ON lab_results;
DROP TRIGGER IF EXISTS update_prescriptions_updated_at ON prescriptions;
DROP TRIGGER IF EXISTS update_medical_records_updated_at ON medical_records;
DROP TRIGGER IF EXISTS update_credentials_updated_at ON credentials;
DROP TRIGGER IF EXISTS update_equipment_updated_at ON equipment;
DROP TRIGGER IF EXISTS update_payments_updated_at ON payments;
DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
DROP TRIGGER IF EXISTS update_services_updated_at ON services;
DROP TRIGGER IF EXISTS update_healthcare_professionals_updated_at ON healthcare_professionals;
DROP TRIGGER IF EXISTS update_users_updated_at ON users;

-- ============================================================================
-- DROP FUNCTIONS
-- ============================================================================

DROP FUNCTION IF EXISTS update_updated_at_column();

-- ============================================================================
-- DROP TABLES IN REVERSE ORDER (CHILD TABLES FIRST)
-- ============================================================================

-- Drop child tables first (those with foreign keys)
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS equipment_assignments CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS lab_results CASCADE;
DROP TABLE IF EXISTS prescriptions CASCADE;
DROP TABLE IF EXISTS medical_records CASCADE;
DROP TABLE IF EXISTS credentials CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;

-- Drop parent tables
DROP TABLE IF EXISTS insurance CASCADE;
DROP TABLE IF EXISTS equipment CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS healthcare_professionals CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ============================================================================
-- DROP EXTENSIONS
-- ============================================================================

DROP EXTENSION IF EXISTS "uuid-ossp";

-- ============================================================================
-- MIGRATION ROLLBACK COMPLETE
-- ============================================================================
