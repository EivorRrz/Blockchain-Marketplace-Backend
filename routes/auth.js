const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validateRequest = require('../middleware/validate');
const authController = require('../controllers/authController');

// Wallet login using challenge–response
router.post('/login', [
    body('walletAddress').isEthereumAddress().withMessage('Invalid wallet address'),
    body('signature').notEmpty().withMessage('Signature is required')
], validateRequest, authController.login);

module.exports = router;
