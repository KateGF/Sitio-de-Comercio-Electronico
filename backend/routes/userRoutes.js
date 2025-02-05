// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.get('/profile', protect, userController.getProfile);
router.put('/profile', protect, userController.updateProfile);
router.delete('/profile', protect, userController.deleteAccount);

router.post('/wishlist', protect, userController.addToWishlist);
router.delete('/wishlist', protect, userController.removeFromWishlist);

// Admin routes for user management
router.get('/', protect, admin, userController.getAllUsers);
router.post('/', protect, admin, userController.addUserByAdmin);
router.put('/:id', protect, admin, userController.updateUserByAdmin);
router.delete('/:id', protect, admin, userController.deleteUserByAdmin);

module.exports = router;
