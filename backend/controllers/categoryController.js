// controllers/categoryController.js
const Category = require('../models/Category');

// Create new category
exports.createCategory = async (req, res, next) => {
  try {
    const { name, parent } = req.body;
    const category = new Category({ name, parent: parent || null });
    if (parent) {
      const parentCategory = await Category.findById(parent);
      if (!parentCategory) return res.status(404).json({ message: 'Parent category not found' });
      parentCategory.children.push(category._id);
      await parentCategory.save();
    }
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

// Update category
exports.updateCategory = async (req, res, next) => {
  try {
    const { name, parent } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    category.name = name || category.name;
    if (parent && parent !== category.parent?.toString()) {
      if (category.parent) {
         const oldParent = await Category.findById(category.parent);
         if (oldParent) {
             oldParent.children = oldParent.children.filter(childId => childId.toString() !== category._id.toString());
             await oldParent.save();
         }
      }
      const newParent = await Category.findById(parent);
      if (!newParent) return res.status(404).json({ message: 'New parent category not found' });
      category.parent = newParent._id;
      newParent.children.push(category._id);
      await newParent.save();
    }
    await category.save();
    res.json(category);
  } catch (err) {
    next(err);
  }
};

// Delete category
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // If the category has a parent, remove its reference from the parent's children array
    if (category.parent) {
      const parentCategory = await Category.findById(category.parent);
      if (parentCategory) {
        parentCategory.children = parentCategory.children.filter(
          (childId) => childId.toString() !== category._id.toString()
        );
        await parentCategory.save();
      }
    }

    // Prevent deletion if the category has subcategories
    if (category.children && category.children.length > 0) {
      return res.status(400).json({
        message: 'Cannot delete category with subcategories. Remove or reassign subcategories first.'
      });
    }

    // Use deleteOne() instead of remove() for Mongoose 7+
    await category.deleteOne();
    res.json({ message: 'Category deleted' });
  } catch (err) {
    next(err);
  }
};

// Get all categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};
