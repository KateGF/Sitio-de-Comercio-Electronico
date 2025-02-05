// controllers/orderController.js
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');
const paymentSimulator = require('../utils/paymentSimulator');

exports.checkout = async (req, res, next) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: 'Cart is empty' });

    let total = 0;
    const orderItems = [];
    for (let item of cart.items) {
      let product = item.product;
      let price = product.price;
      if (product.discount && product.discount.value) {
        if (product.discount.type === 'percentage')
          price = price - (price * product.discount.value) / 100;
        else if (product.discount.type === 'fixed') price = price - product.discount.value;
      }
      total += price * item.quantity;
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price,
      });
    }
    const paymentResult = paymentSimulator(paymentMethod, total);
    if (!paymentResult.success)
      return res.status(400).json({ message: 'Payment failed' });

    const order = new Order({
      user: req.user.id,
      products: orderItems,
      shippingAddress,
      paymentMethod,
      status: 'pending',
      total,
    });
    await order.save();

    await User.findByIdAndUpdate(req.user.id, { $push: { purchaseHistory: order._id } });
    cart.items = [];
    await cart.save();

    for (let item of orderItems) {
      const product = await Product.findById(item.product);
      product.inventory -= item.quantity;
      if (product.inventory < 5) {
        console.warn(`Low stock alert for product ${product.name}`);
      }
      await product.save();
    }
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    let orders;
    if (req.user.role === 'admin' || req.user.role === 'logistics') {
      orders = await Order.find().populate('user').populate('products.product');
    } else {
      orders = await Order.find({ user: req.user.id }).populate('products.product');
    }
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['pending', 'in preparation', 'shipped', 'delivered'];
    if (!allowedStatuses.includes(status))
      return res.status(400).json({ message: 'Invalid status' });
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (err) {
    next(err);
  }
};
