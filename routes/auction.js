const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const validateRequest = require('../middleware/validate');
const auctionController = require('../controllers/auctionController');
const protect = require('../middleware/authMiddleware');

// Create an auction for an item
router.post('/', protect, [
    body('itemId').isMongoId().withMessage('Invalid item ID'),
    body('startingPrice').isNumeric().withMessage('Starting price must be a number'),
    body('endTime').isISO8601().withMessage('Invalid end time')
], validateRequest, auctionController.createAuction);

// Place a bid on an auction
router.post('/:id/bid', protect, [
    param('id').isMongoId().withMessage('Invalid auction ID'),
    body('bidAmount').isNumeric().withMessage('Bid amount must be a number')
], validateRequest, auctionController.placeBid);

// Get auction details
router.get('/:id', [
    param('id').isMongoId().withMessage('Invalid auction ID')
], validateRequest, auctionController.getAuction);

module.exports = router;
