/**
 * Bookings Routes
 * 
 * API endpoints for booking management
 */

const express = require('express');
const router = express.Router();

// GET /api/bookings - Get all bookings
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: [],
    message: 'Bookings endpoint - Coming soon'
  });
});

module.exports = router;
