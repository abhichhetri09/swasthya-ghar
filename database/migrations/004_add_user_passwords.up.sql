-- ============================================================================
-- AAROGYACARE HEALTHCARE DATABASE MIGRATION
-- Add User Passwords (UP Migration)
-- ============================================================================

-- Update existing users with password hashes
-- All passwords are hashed with bcrypt using salt rounds 12
-- Default password for all users: "AarogyaCare2024!"

UPDATE users SET 
    password_hash = '$2a$12$lS5EIixNokM8YiTEPV1TBOp2JX.Vimj/XwjPsK7Z17j18lmN19y3W',
    password_salt = 'aarogyacare_salt_2024',
    require_password_change = true
WHERE user_id = 1; -- John Smith

UPDATE users SET 
    password_hash = '$2a$12$lS5EIixNokM8YiTEPV1TBOp2JX.Vimj/XwjPsK7Z17j18lmN19y3W',
    password_salt = 'aarogyacare_salt_2024',
    require_password_change = true
WHERE user_id = 2; -- Maria Garcia

UPDATE users SET 
    password_hash = '$2a$12$lS5EIixNokM8YiTEPV1TBOp2JX.Vimj/XwjPsK7Z17j18lmN19y3W',
    password_salt = 'aarogyacare_salt_2024',
    require_password_change = true
WHERE user_id = 3; -- David Kim

UPDATE users SET 
    password_hash = '$2a$12$lS5EIixNokM8YiTEPV1TBOp2JX.Vimj/XwjPsK7Z17j18lmN19y3W',
    password_salt = 'aarogyacare_salt_2024',
    require_password_change = true
WHERE user_id = 4; -- Emma Thompson

UPDATE users SET 
    password_hash = '$2a$12$lS5EIixNokM8YiTEPV1TBOp2JX.Vimj/XwjPsK7Z17j18lmN19y3W',
    password_salt = 'aarogyacare_salt_2024',
    require_password_change = true
WHERE user_id = 5; -- Ahmed Hassan

UPDATE users SET 
    password_hash = '$2a$12$lS5EIixNokM8YiTEPV1TBOp2JX.Vimj/XwjPsK7Z17j18lmN19y3W',
    password_salt = 'aarogyacare_salt_2024',
    require_password_change = true
WHERE user_id = 6; -- Abhishek chhetri

UPDATE users SET 
    password_hash = '$2a$12$lS5EIixNokM8YiTEPV1TBOp2JX.Vimj/XwjPsK7Z17j18lmN19y3W',
    password_salt = 'aarogyacare_salt_2024',
    require_password_change = true
WHERE user_id = 7; -- Sushma khanal

UPDATE users SET 
    password_hash = '$2a$12$lS5EIixNokM8YiTEPV1TBOp2JX.Vimj/XwjPsK7Z17j18lmN19y3W',
    password_salt = 'aarogyacare_salt_2024',
    require_password_change = false
WHERE user_id = 8; -- Alex Developer

UPDATE users SET 
    password_hash = '$2a$12$lS5EIixNokM8YiTEPV1TBOp2JX.Vimj/XwjPsK7Z17j18lmN19y3W',
    password_salt = 'aarogyacare_salt_2024',
    require_password_change = false
WHERE user_id = 9; -- Sarah Admin

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
