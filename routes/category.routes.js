const {Router} = require('express');
const Category = require('../models/Category');
const auth = require('../middleware/auth.middleware');
const router = Router();

// /api/category
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (e) {
    res.status(500).json({message: 'Something went wrong, please try again'});
  }
});

// /api/category/create
router.post('/create', auth,
  async (req, res) => {
  try {
    const {name, description} = req.body;

    const checkCategory = await Category.findOne({ name });
    if (checkCategory) {
      return res.status(400).json({message: 'This category is currently created'});
    }

    const category = new Category({ name, description });

    await category.save();
    res.status(200).json({message: 'Category successfully created'});
  } catch (e) {
    res.status(500).json({message: 'Something went wrong, please try again'});
  }
});

module.exports = router;