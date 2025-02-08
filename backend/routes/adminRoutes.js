// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
// We replace `admin` with our new combined middleware
const { protect, adminOrLogistics } = require('../middleware/authMiddleware');

router.get('/dashboard', protect, adminOrLogistics, adminController.getDashboardStats);

module.exports = router;
