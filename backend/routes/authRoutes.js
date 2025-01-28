const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { login, register } = require("../controllers/authController");

const router = express.Router();

// Endpoint protegido
router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Token válido",
    user: req.user, // Información del token decodificado
  });
});

// Endpoint para registro
router.post("/register", register);

// Endpoint para login
router.post("/login", login);

module.exports = router;
