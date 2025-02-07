// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
router.get('/brands', productController.getBrands);  // New endpoint for brands
router.get('/:id', productController.getProductById);

router.post('/', protect, admin, productController.createProduct);
router.put('/:id', protect, admin, productController.updateProduct);
router.delete('/:id', protect, admin, productController.deleteProduct);

router.post('/:id/reviews', protect, productController.addReview);

module.exports = router;
