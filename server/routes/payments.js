/**
 * Payments Routes
 * 
 * API endpoints for payment management
 */

const express = require('express');
const router = express.Router();

// GET /api/payments - Get all payments
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: [],
    message: 'Payments endpoint - Coming soon'
  });
});

module.exports = router;
