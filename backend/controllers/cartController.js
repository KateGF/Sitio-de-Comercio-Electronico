// controllers/cartController.js
const Cart = require('../models/Cart');

exports.getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
      await cart.save();
    }
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = new Cart({ user: req.user.id, items: [] });
    const index = cart.items.findIndex((item) => item.product.toString() === productId);
    if (index > -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

exports.updateCartItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      const index = cart.items.findIndex((item) => item.product.toString() === productId);
      if (index > -1) {
        if (quantity <= 0) cart.items.splice(index, 1);
        else cart.items[index].quantity = quantity;
        await cart.save();
        return res.json(cart);
      }
    }
    res.status(404).json({ message: 'Item not found in cart' });
  } catch (err) {
    next(err);
  }
};

exports.removeCartItem = async (req, res, next) => {
  try {
    // Now reading productId from query parameter
    const { productId } = req.query;
    let cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      cart.items = cart.items.filter((item) => item.product.toString() !== productId);
      await cart.save();
      return res.json(cart);
    }
    res.status(404).json({ message: 'Cart not found' });
  } catch (err) {
    next(err);
  }
};

exports.clearCartAll = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ message: 'Cart emptied' });
  } catch (err) {
    next(err);
  }
};
