const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const validateRequest = require('../middleware/validate');
const itemsController = require('../controllers/itemsController');
const protect = require('../middleware/authMiddleware');

// Create new item listing (for sale/trade)
router.post('/', protect, [
    body('title').notEmpty().withMessage('Title is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('description').optional().isString()
], validateRequest, itemsController.createItem);

// Get all items with advanced search filters
router.get('/', itemsController.getItems);

// Get specific item details
router.get('/:id', [
    param('id').isMongoId().withMessage('Invalid item ID')
], validateRequest, itemsController.getItem);

// Mark item as sold
router.put('/:id/sold', protect, [
    param('id').isMongoId().withMessage('Invalid item ID')
], validateRequest, itemsController.markAsSold);

module.exports = router;
