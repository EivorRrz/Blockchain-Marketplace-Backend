const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

// Admin dashboard (analytics, disputes, etc.)
// In a real-world scenario, include an admin-check middleware.
router.get('/dashboard', protect, adminController.getDashboardData);

module.exports = router;
