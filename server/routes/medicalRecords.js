/**
 * Medical Records Routes
 * 
 * API endpoints for medical record management
 */

const express = require('express');
const router = express.Router();

// GET /api/medical-records - Get all medical records
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: [],
    message: 'Medical records endpoint - Coming soon'
  });
});

module.exports = router;
