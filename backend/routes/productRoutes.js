const express = require("express");
const { getProducts } = require("../backend/controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Ruta protegida para obtener productos
router.get("/", authMiddleware, getProducts);

module.exports = router;
