const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const transactionsController = require('../controllers/transactionsController');

// Get transactions for authenticated user
router.get('/', protect, transactionsController.getTransactions);

module.exports = router;
