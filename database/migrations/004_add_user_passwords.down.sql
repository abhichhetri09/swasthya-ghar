-- ============================================================================
-- AAROGYACARE HEALTHCARE DATABASE MIGRATION
-- Add User Passwords (DOWN Migration)
-- ============================================================================

-- Remove password hashes from all users
UPDATE users SET 
    password_hash = NULL,
    password_salt = NULL,
    require_password_change = false
WHERE user_id IN (1, 2, 3, 4, 5, 6, 7, 8, 9);

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
