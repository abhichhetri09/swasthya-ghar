/**
 * User Routes
 * 
 * API endpoints for user management
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Import database connection
const { query } = require('../config/database');

// Validation middleware
const validateUser = [
  body('full_name').trim().isLength({ min: 2, max: 255 }).withMessage('Full name must be between 2 and 255 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Must be a valid email address'),
  // body('phone').matches(/^[\+]?[1-9][\d]{0,15}$/).withMessage('Must be a valid phone number'),
  body('date_of_birth').optional().isISO8601().withMessage('Must be a valid date'),
  body('gender').optional().isIn(['male', 'female', 'other']).withMessage('Gender must be male, female, or other'),
  body('address').optional().trim().isLength({ max: 1000 }).withMessage('Address must be less than 1000 characters'),
  body('emergency_contact').optional().trim().isLength({ max: 255 }).withMessage('Emergency contact must be less than 255 characters'),
  body('emergency_contact_relationship').optional().trim().isLength({ max: 50 }).withMessage('Emergency contact relationship must be less than 50 characters'),
  body('blood_type').optional().isLength({ max: 5 }).withMessage('Blood type must be less than 5 characters'),
  body('allergies').optional().isArray().withMessage('Allergies must be an array'),
  body('current_medications').optional().isArray().withMessage('Current medications must be an array'),
  body('insurance_id').optional().isInt().withMessage('Insurance ID must be a valid integer')
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

// GET /api/users - Get all users with pagination
router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Get total count
    const countResult = await query('SELECT COUNT(*) FROM users');
    const total = parseInt(countResult.rows[0].count);

    // Get users with pagination
    const result = await query(
      'SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:id - Get user by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      'SELECT * FROM users WHERE user_id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/users - Create new user
router.post('/', validateUser, handleValidationErrors, async (req, res, next) => {
  try {
    const {
      full_name,
      email,
      phone,
      date_of_birth,
      gender,
      address,
      emergency_contact,
      emergency_contact_relationship,
      blood_type,
      allergies = [],
      current_medications = [],
      insurance_id = null
    } = req.body;

    const now = new Date().toISOString();

    const result = await query(
      `INSERT INTO users (
        full_name, email, phone, date_of_birth, gender, 
        address, emergency_contact, emergency_contact_relationship, blood_type,
        allergies, current_medications, insurance_id, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
      RETURNING *`,
      [
        full_name, email, phone, date_of_birth, gender,
        address, emergency_contact, emergency_contact_relationship, blood_type,
        allergies, current_medications, insurance_id, now, now
      ]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: 'User created successfully'
    });
  } catch (error) {
    // Handle duplicate email error
    if (error.code === '23505' && error.constraint === 'users_email_key') {
      return res.status(400).json({
        success: false,
        error: 'Email already exists',
        details: 'A user with this email address already exists'
      });
    }
    next(error);
  }
});

// PUT /api/users/:id - Update user
router.put('/:id', validateUser, handleValidationErrors, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      full_name,
      email,
      phone,
      date_of_birth,
      gender,
      address,
      emergency_contact,
      emergency_contact_relationship,
      blood_type,
      allergies,
      current_medications,
      insurance_id
    } = req.body;

    // Check if user exists
    const existingUser = await query(
      'SELECT * FROM users WHERE user_id = $1',
      [id]
    );

    if (existingUser.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Build update query dynamically
    const updateFields = [];
    const updateValues = [];
    let paramCount = 1;

    if (full_name !== undefined) {
      updateFields.push(`full_name = $${paramCount++}`);
      updateValues.push(full_name);
    }
    if (email !== undefined) {
      updateFields.push(`email = $${paramCount++}`);
      updateValues.push(email);
    }
    if (phone !== undefined) {
      updateFields.push(`phone = $${paramCount++}`);
      updateValues.push(phone);
    }
    if (date_of_birth !== undefined) {
      updateFields.push(`date_of_birth = $${paramCount++}`);
      updateValues.push(date_of_birth);
    }
    if (gender !== undefined) {
      updateFields.push(`gender = $${paramCount++}`);
      updateValues.push(gender);
    }
    if (address !== undefined) {
      updateFields.push(`address = $${paramCount++}`);
      updateValues.push(address);
    }
    if (emergency_contact !== undefined) {
      updateFields.push(`emergency_contact = $${paramCount++}`);
      updateValues.push(emergency_contact);
    }
    if (emergency_contact_relationship !== undefined) {
      updateFields.push(`emergency_contact_relationship = $${paramCount++}`);
      updateValues.push(emergency_contact_relationship);
    }
    if (blood_type !== undefined) {
      updateFields.push(`blood_type = $${paramCount++}`);
      updateValues.push(blood_type);
    }
    if (allergies !== undefined) {
      updateFields.push(`allergies = $${paramCount++}`);
      updateValues.push(allergies);
    }
    if (current_medications !== undefined) {
      updateFields.push(`current_medications = $${paramCount++}`);
      updateValues.push(current_medications);
    }
    if (insurance_id !== undefined) {
      updateFields.push(`insurance_id = $${paramCount++}`);
      updateValues.push(insurance_id);
    }

    updateFields.push(`updated_at = $${paramCount++}`);
    updateValues.push(new Date().toISOString());

    updateValues.push(id);

    const result = await query(
      `UPDATE users SET ${updateFields.join(', ')} WHERE user_id = $${paramCount} RETURNING *`,
      updateValues
    );

    res.json({
      success: true,
      data: result.rows[0],
      message: 'User updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      'DELETE FROM users WHERE user_id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:id/medical-records - Get user's medical records
router.get('/:id/medical-records', async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      'SELECT * FROM medical_records WHERE user_id = $1 ORDER BY created_at DESC',
      [id]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:id/bookings - Get user's bookings
router.get('/:id/bookings', async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      'SELECT * FROM bookings WHERE user_id = $1 ORDER BY created_at DESC',
      [id]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
