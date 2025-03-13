const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const notificationsController = require('../controllers/notificationsController');

// Get notifications for user
router.get('/', protect, notificationsController.getNotifications);

// Mark a notification as read
router.put('/:id/read', protect, notificationsController.markAsRead);

module.exports = router;
