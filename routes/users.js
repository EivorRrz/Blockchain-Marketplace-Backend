const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// Get and update user profile
router.get('/me', protect, userController.getProfile);
router.put('/me', protect, userController.updateProfile);

module.exports = router;
