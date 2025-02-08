// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) return res.status(401).json({ message: 'Not authorized, no token' });
};

exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Require admin role' });
};

exports.logistics = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'logistics')) return next();
  return res.status(403).json({ message: 'Require logistics or admin role' });
};

exports.adminOrLogistics = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  if (req.user.role === 'admin' || req.user.role === 'logistics') {
    return next();
  }
  return res.status(403).json({ message: 'Require admin or logistics role' });
};
