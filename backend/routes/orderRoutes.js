// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { protect, logistics } = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

router.post('/checkout', protect, orderController.checkout);
router.get('/', protect, orderController.getOrders);
router.put('/:id/status', protect, logistics, orderController.updateOrderStatus);

module.exports = router;
