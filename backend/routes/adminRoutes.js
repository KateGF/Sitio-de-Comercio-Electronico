// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

router.get('/dashboard', protect, admin, adminController.getDashboardStats);

module.exports = router;
