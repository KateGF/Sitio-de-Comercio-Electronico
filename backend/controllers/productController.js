// controllers/productController.js
const mongoose = require('mongoose');
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

// Recursively get all child category IDs for a given parent category.
async function getAllChildCategoryIds(parentId) {
  const children = await Category.find({ parent: parentId }).select('_id');
  let ids = children.map(child => child._id.toString());
  for (const child of children) {
    const childIds = await getAllChildCategoryIds(child._id);
    ids = ids.concat(childIds);
  }
  return ids;
}

exports.getProducts = async (req, res, next) => {
  try {
    let {
      search,
      category,
      brand,
      priceMin,
      priceMax,
      popularity,
      page = 1,
      limit = 10,
      subcategory
    } = req.query;
    let filter = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
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
    if (subcategory) {
      // Use subcategory directly.
      filter.category = new mongoose.Types.ObjectId(subcategory);
    } else if (category) {
      // Cast the category parameter to an ObjectId.
      const mainCatId = new mongoose.Types.ObjectId(category);
      // Recursively retrieve all descendant IDs.
      const descendantIds = await getAllChildCategoryIds(mainCatId);
      const descendantObjectIds = descendantIds.map(id => new mongoose.Types.ObjectId(id));
      // Combine the main category with its descendants.
      const catIds = [mainCatId, ...descendantObjectIds];
      filter.category = { $in: catIds };
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
