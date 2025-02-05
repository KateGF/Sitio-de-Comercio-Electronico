// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    images: [String],
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    brand: { type: String },
    technicalSpecifications: { type: Object },
    price: { type: Number, required: true },
    discount: {
      type: {
        type: String, // 'percentage' or 'fixed'
        enum: ['percentage', 'fixed'],
      },
      value: Number,
    },
    inventory: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
