// controllers/productController.js
const Product = require('../models/Product');
const Category = require('../models/Category');

exports.createProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, productData, { new: true });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    let { search, category, brand, priceMin, priceMax, popularity, page = 1, limit = 10 } = req.query;
    let filter = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    if (category) {
      filter.category = category;
    }
    if (brand) {
      filter.brand = brand;
    }
    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin) filter.price.$gte = priceMin;
      if (priceMax) filter.price.$lte = priceMax;
    }
    if (popularity) {
      filter.rating = { $gte: popularity };
    }
    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('category');
    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category')
      .populate('reviews.user', 'username');
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    product.reviews.push({ user: req.user.id, rating, comment });
    const sum = product.reviews.reduce((acc, review) => acc + review.rating, 0);
    product.rating = sum / product.reviews.length;
    await product.save();
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.getBrands = async (req, res, next) => {
  try {
    const brands = await Product.distinct('brand');
    res.json(brands);
  } catch (err) {
    next(err);
  }
};
