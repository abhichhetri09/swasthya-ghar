/**
 * Healthcare Professionals Routes
 * 
 * API endpoints for healthcare professional management
 */

const express = require('express');
const router = express.Router();

// GET /api/professionals - Get all professionals
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: [],
    message: 'Healthcare professionals endpoint - Coming soon'
  });
});

module.exports = router;
