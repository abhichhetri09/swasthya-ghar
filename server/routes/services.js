/**
 * Services Routes
 * 
 * API endpoints for service management
 */

const express = require('express');
const router = express.Router();

// GET /api/services - Get all services
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: [],
    message: 'Services endpoint - Coming soon'
  });
});

module.exports = router;
