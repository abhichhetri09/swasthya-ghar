-- ============================================================================
-- AAROGYACARE HEALTHCARE DATABASE MIGRATION
-- Add Authentication Fields (UP Migration)
-- ============================================================================

-- Add authentication fields to users table
ALTER TABLE users 
ADD COLUMN password_hash VARCHAR(255),
ADD COLUMN password_salt VARCHAR(255),
ADD COLUMN last_login TIMESTAMP WITH TIME ZONE,
ADD COLUMN password_reset_token VARCHAR(255),
ADD COLUMN password_reset_expires TIMESTAMP WITH TIME ZONE,
ADD COLUMN failed_login_attempts INTEGER DEFAULT 0,
ADD COLUMN account_locked_until TIMESTAMP WITH TIME ZONE,
ADD COLUMN password_changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN require_password_change BOOLEAN DEFAULT false;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_password_reset_token ON users(password_reset_token);
CREATE INDEX IF NOT EXISTS idx_users_account_locked ON users(account_locked_until);

-- Add constraints
ALTER TABLE users 
ADD CONSTRAINT check_failed_login_attempts 
CHECK (failed_login_attempts >= 0);

-- Add comments for documentation
COMMENT ON COLUMN users.password_hash IS 'Bcrypt hashed password';
COMMENT ON COLUMN users.password_salt IS 'Additional salt for extra security';
COMMENT ON COLUMN users.last_login IS 'Timestamp of last successful login';
COMMENT ON COLUMN users.password_reset_token IS 'Token for password reset functionality';
COMMENT ON COLUMN users.password_reset_expires IS 'Expiration time for password reset token';
COMMENT ON COLUMN users.failed_login_attempts IS 'Number of consecutive failed login attempts';
COMMENT ON COLUMN users.account_locked_until IS 'Account lockout until this timestamp';
COMMENT ON COLUMN users.password_changed_at IS 'When password was last changed';
COMMENT ON COLUMN users.require_password_change IS 'Force user to change password on next login';

-- Create audit table for login attempts
CREATE TABLE login_audit_log (
    audit_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    email VARCHAR(255) NOT NULL,
    ip_address INET,
    user_agent TEXT,
    login_successful BOOLEAN NOT NULL,
    failure_reason VARCHAR(100),
    attempted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for audit log
CREATE INDEX IF NOT EXISTS idx_login_audit_user_id ON login_audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_login_audit_attempted_at ON login_audit_log(attempted_at);

-- Create password history table (for HIPAA compliance)
CREATE TABLE password_history (
    history_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    password_hash VARCHAR(255) NOT NULL,
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for password history
CREATE INDEX IF NOT EXISTS idx_password_history_user_id ON password_history(user_id);

-- Add trigger to log password changes
CREATE OR REPLACE FUNCTION log_password_change()
RETURNS TRIGGER AS $$
BEGIN
    -- Only log if password_hash actually changed
    IF OLD.password_hash IS DISTINCT FROM NEW.password_hash THEN
        INSERT INTO password_history (user_id, password_hash)
        VALUES (NEW.user_id, NEW.password_hash);
        
        -- Update password_changed_at
        NEW.password_changed_at = CURRENT_TIMESTAMP;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_log_password_change
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION log_password_change();

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
