/**
 * Authentication Service
 * 
 * Handles user authentication, password hashing, and JWT token management
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { query } = require('../config/database');

// Configuration
const SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET || 'aarogyacare-secret-key-2024';
const JWT_EXPIRES_IN = '24h';
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

class AuthService {
  /**
   * Hash a password using bcrypt
   */
  static async hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
  }

  /**
   * Compare a password with its hash
   */
  static async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  /**
   * Generate JWT token for user
   */
  static generateToken(user) {
    const payload = {
      userId: user.user_id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  /**
   * Verify JWT token
   */
  static verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  }

  /**
   * Authenticate user login
   */
  static async authenticateUser(email, password, ipAddress, userAgent) {
    try {
      // Find user by email
      const userResult = await query(
        'SELECT * FROM users WHERE email = $1 AND is_active = true',
        [email]
      );

      if (userResult.rows.length === 0) {
        await this.logLoginAttempt(null, email, ipAddress, userAgent, false, 'User not found');
        return { success: false, error: 'Invalid email or password' };
      }

      const user = userResult.rows[0];

      // Check if account is locked
      if (user.account_locked_until && new Date() < user.account_locked_until) {
        await this.logLoginAttempt(user.user_id, email, ipAddress, userAgent, false, 'Account locked');
        return { 
          success: false, 
          error: `Account is locked until ${user.account_locked_until.toLocaleString()}` 
        };
      }

      // Check if user has a password set
      if (!user.password_hash) {
        await this.logLoginAttempt(user.user_id, email, ipAddress, userAgent, false, 'No password set');
        return { success: false, error: 'Account not properly configured' };
      }

      // Verify password
      const isValidPassword = await this.comparePassword(password, user.password_hash);

      if (!isValidPassword) {
        // Increment failed login attempts
        const newFailedAttempts = (user.failed_login_attempts || 0) + 1;
        let lockoutUntil = null;

        if (newFailedAttempts >= MAX_LOGIN_ATTEMPTS) {
          lockoutUntil = new Date(Date.now() + LOCKOUT_DURATION);
        }

        await query(
          'UPDATE users SET failed_login_attempts = $1, account_locked_until = $2 WHERE user_id = $3',
          [newFailedAttempts, lockoutUntil, user.user_id]
        );

        await this.logLoginAttempt(user.user_id, email, ipAddress, userAgent, false, 'Invalid password');

        if (lockoutUntil) {
          return { 
            success: false, 
            error: `Account locked due to too many failed attempts. Try again after ${lockoutUntil.toLocaleString()}` 
          };
        }

        return { success: false, error: 'Invalid email or password' };
      }

      // Successful login - reset failed attempts and update last login
      await query(
        'UPDATE users SET failed_login_attempts = 0, account_locked_until = NULL, last_login = CURRENT_TIMESTAMP WHERE user_id = $1',
        [user.user_id]
      );

      await this.logLoginAttempt(user.user_id, email, ipAddress, userAgent, true, null);

      // Generate token
      const token = this.generateToken(user);

      // Remove sensitive data
      const { password_hash, password_salt, ...safeUser } = user;

      return {
        success: true,
        user: safeUser,
        token,
        requirePasswordChange: user.require_password_change || false
      };

    } catch (error) {
      console.error('Authentication error:', error);
      return { success: false, error: 'Authentication failed' };
    }
  }

  /**
   * Log login attempt
   */
  static async logLoginAttempt(userId, email, ipAddress, userAgent, successful, failureReason) {
    try {
      await query(
        'INSERT INTO login_audit_log (user_id, email, ip_address, user_agent, login_successful, failure_reason) VALUES ($1, $2, $3, $4, $5, $6)',
        [userId, email, ipAddress, userAgent, successful, failureReason]
      );
    } catch (error) {
      console.error('Failed to log login attempt:', error);
    }
  }

  /**
   * Change user password
   */
  static async changePassword(userId, currentPassword, newPassword) {
    try {
      // Get current user
      const userResult = await query('SELECT * FROM users WHERE user_id = $1', [userId]);
      if (userResult.rows.length === 0) {
        return { success: false, error: 'User not found' };
      }

      const user = userResult.rows[0];

      // Verify current password
      const isValidCurrentPassword = await this.comparePassword(currentPassword, user.password_hash);
      if (!isValidCurrentPassword) {
        return { success: false, error: 'Current password is incorrect' };
      }

      // Check password history (prevent reuse of last 5 passwords)
      const historyResult = await query(
        'SELECT password_hash FROM password_history WHERE user_id = $1 ORDER BY changed_at DESC LIMIT 5',
        [userId]
      );

      for (const historyItem of historyResult.rows) {
        const isReused = await this.comparePassword(newPassword, historyItem.password_hash);
        if (isReused) {
          return { success: false, error: 'New password cannot be the same as your last 5 passwords' };
        }
      }

      // Hash new password
      const newPasswordHash = await this.hashPassword(newPassword);

      // Update password
      await query(
        'UPDATE users SET password_hash = $1, require_password_change = false WHERE user_id = $2',
        [newPasswordHash, userId]
      );

      return { success: true, message: 'Password changed successfully' };

    } catch (error) {
      console.error('Password change error:', error);
      return { success: false, error: 'Failed to change password' };
    }
  }

  /**
   * Reset password (forgot password flow)
   */
  static async initiatePasswordReset(email) {
    try {
      const userResult = await query('SELECT user_id FROM users WHERE email = $1 AND is_active = true', [email]);
      if (userResult.rows.length === 0) {
        return { success: false, error: 'User not found' };
      }

      const user = userResult.rows[0];
      const resetToken = uuidv4();
      const expiresAt = new Date(Date.now() + (60 * 60 * 1000)); // 1 hour

      await query(
        'UPDATE users SET password_reset_token = $1, password_reset_expires = $2 WHERE user_id = $3',
        [resetToken, expiresAt, user.user_id]
      );

      // In a real application, you would send an email here
      console.log(`Password reset token for ${email}: ${resetToken}`);

      return { success: true, message: 'Password reset instructions sent to your email' };

    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: 'Failed to initiate password reset' };
    }
  }

  /**
   * Complete password reset
   */
  static async completePasswordReset(token, newPassword) {
    try {
      const userResult = await query(
        'SELECT user_id FROM users WHERE password_reset_token = $1 AND password_reset_expires > CURRENT_TIMESTAMP',
        [token]
      );

      if (userResult.rows.length === 0) {
        return { success: false, error: 'Invalid or expired reset token' };
      }

      const user = userResult.rows[0];
      const newPasswordHash = await this.hashPassword(newPassword);

      await query(
        'UPDATE users SET password_hash = $1, password_reset_token = NULL, password_reset_expires = NULL, require_password_change = false WHERE user_id = $2',
        [newPasswordHash, user.user_id]
      );

      return { success: true, message: 'Password reset successfully' };

    } catch (error) {
      console.error('Password reset completion error:', error);
      return { success: false, error: 'Failed to reset password' };
    }
  }

  /**
   * Create user with password
   */
  static async createUser(userData) {
    try {
      const { password, ...otherData } = userData;
      const passwordHash = await this.hashPassword(password);

      const result = await query(
        `INSERT INTO users (full_name, email, phone, role, password_hash, password_salt, is_active) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [
          otherData.full_name,
          otherData.email,
          otherData.phone,
          otherData.role || 'patient',
          passwordHash,
          'aarogyacare_salt_2024',
          otherData.is_active !== false
        ]
      );

      const user = result.rows[0];
      const { password_hash, password_salt, ...safeUser } = user;

      return { success: true, user: safeUser };

    } catch (error) {
      console.error('User creation error:', error);
      if (error.code === '23505') { // Unique violation
        return { success: false, error: 'Email already exists' };
      }
      return { success: false, error: 'Failed to create user' };
    }
  }
}

module.exports = AuthService;
