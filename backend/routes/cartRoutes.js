// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const cartController = require('../controllers/cartController');

router.get('/', protect, cartController.getCart);
router.post('/', protect, cartController.addToCart);
router.put('/', protect, cartController.updateCartItem);
router.delete('/', protect, cartController.removeCartItem);
router.delete('/clear', protect, cartController.clearCartAll);

module.exports = router;
