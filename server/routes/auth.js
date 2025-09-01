/**
 * Authentication Routes
 * 
 * Handles user authentication, login, logout, and password management
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Import services
const AuthService = require('../services/authService');

// Validation middleware
const validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Must be a valid email address'),
  body('password').isLength({ min: 1 }).withMessage('Password is required'),
];

const validatePasswordChange = [
  body('currentPassword').isLength({ min: 1 }).withMessage('Current password is required'),
  body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters'),
];

const validatePasswordReset = [
  body('email').isEmail().normalizeEmail().withMessage('Must be a valid email address'),
];

const validatePasswordResetComplete = [
  body('token').isLength({ min: 1 }).withMessage('Reset token is required'),
  body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters'),
];

// Helper function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// POST /api/auth/login - User login
router.post('/login', validateLogin, handleValidationErrors, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    const result = await AuthService.authenticateUser(email, password, ipAddress, userAgent);

    if (!result.success) {
      return res.status(401).json({
        success: false,
        error: result.error
      });
    }

    // Set JWT token in HTTP-only cookie for security
    res.cookie('authToken', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.json({
      success: true,
      user: result.user,
      requirePasswordChange: result.requirePasswordChange,
      message: 'Login successful'
    });

  } catch (error) {
    next(error);
  }
});

// POST /api/auth/logout - User logout
router.post('/logout', (req, res) => {
  // Clear the auth cookie
  res.clearCookie('authToken');
  
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

// POST /api/auth/change-password - Change user password
router.post('/change-password', validatePasswordChange, handleValidationErrors, async (req, res, next) => {
  try {
    // Get user from JWT token (you'll need to implement middleware for this)
    const userId = req.user?.userId; // This will come from JWT middleware
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    const { currentPassword, newPassword } = req.body;

    const result = await AuthService.changePassword(userId, currentPassword, newPassword);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: result.error
      });
    }

    res.json({
      success: true,
      message: result.message
    });

  } catch (error) {
    next(error);
  }
});

// POST /api/auth/forgot-password - Initiate password reset
router.post('/forgot-password', validatePasswordReset, handleValidationErrors, async (req, res, next) => {
  try {
    const { email } = req.body;

    const result = await AuthService.initiatePasswordReset(email);

    // Always return success to prevent email enumeration
    res.json({
      success: true,
      message: 'If an account with that email exists, password reset instructions have been sent.'
    });

  } catch (error) {
    next(error);
  }
});

// POST /api/auth/reset-password - Complete password reset
router.post('/reset-password', validatePasswordResetComplete, handleValidationErrors, async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    const result = await AuthService.completePasswordReset(token, newPassword);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: result.error
      });
    }

    res.json({
      success: true,
      message: result.message
    });

  } catch (error) {
    next(error);
  }
});

// GET /api/auth/me - Get current user info
router.get('/me', async (req, res, next) => {
  try {
    // Get user from JWT token (you'll need to implement middleware for this)
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    // Get user from database
    const { query } = require('../config/database');
    const result = await query(
      'SELECT user_id, full_name, email, phone, role, is_active, last_login, require_password_change FROM users WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      user: result.rows[0]
    });

  } catch (error) {
    next(error);
  }
});

// POST /api/auth/refresh - Refresh JWT token
router.post('/refresh', async (req, res, next) => {
  try {
    // Get current token from cookie
    const currentToken = req.cookies.authToken;
    
    if (!currentToken) {
      return res.status(401).json({
        success: false,
        error: 'No token provided'
      });
    }

    // Verify current token
    const decoded = AuthService.verifyToken(currentToken);
    
    if (!decoded) {
      return res.status(401).json({
        success: false,
        error: 'Invalid token'
      });
    }

    // Get user from database
    const { query } = require('../config/database');
    const result = await query(
      'SELECT user_id, full_name, email, phone, role, is_active FROM users WHERE user_id = $1 AND is_active = true',
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'User not found or inactive'
      });
    }

    const user = result.rows[0];

    // Generate new token
    const newToken = AuthService.generateToken(user);

    // Set new token in cookie
    res.cookie('authToken', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.json({
      success: true,
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role
      },
      message: 'Token refreshed successfully'
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
