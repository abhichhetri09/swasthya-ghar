-- ============================================================================
-- AAROGYACARE HEALTHCARE DATABASE MIGRATION
-- Add Authentication Fields (DOWN Migration)
-- ============================================================================

-- Drop trigger and function
DROP TRIGGER IF EXISTS trigger_log_password_change ON users;
DROP FUNCTION IF EXISTS log_password_change();

-- Drop tables
DROP TABLE IF EXISTS password_history;
DROP TABLE IF EXISTS login_audit_log;

-- Drop indexes
DROP INDEX IF EXISTS idx_users_email;
DROP INDEX IF EXISTS idx_users_password_reset_token;
DROP INDEX IF EXISTS idx_users_account_locked;

-- Drop constraints
ALTER TABLE users DROP CONSTRAINT IF EXISTS check_failed_login_attempts;

-- Remove authentication columns from users table
ALTER TABLE users 
DROP COLUMN IF EXISTS password_hash,
DROP COLUMN IF EXISTS password_salt,
DROP COLUMN IF EXISTS last_login,
DROP COLUMN IF EXISTS password_reset_token,
DROP COLUMN IF EXISTS password_reset_expires,
DROP COLUMN IF EXISTS failed_login_attempts,
DROP COLUMN IF EXISTS account_locked_until,
DROP COLUMN IF EXISTS password_changed_at,
DROP COLUMN IF EXISTS require_password_change;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
