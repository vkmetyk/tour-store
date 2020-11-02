const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const config = require('config')
const User = require('../models/User');
const Tour = require('../models/Tour');
const Category = require('../models/Category');
const auth = require('../middleware/auth.middleware');
const router = Router();

// /api/tour
router.get('/', async (req, res) => {
  try {
    const tours = await Tour.find({});

    res.status(200).json(tours);
  } catch (e) {
    res.status(500).json({message: 'Something went wrong, please try again'});
  }
});

// /api/tour/filter
router.post('/filter', async (req, res) => {
  try {
    const category = await Category.findOne({name: req.body.category});

    if (!category)
      res.status(400).json({message: 'Category with this name not found'});

    const tours = await Tour.find({category: category._id});

    res.status(200).json(tours);
  } catch (e) {
    res.status(500).json({message: 'Something went wrong, please try again'});
  }
});

// /api/tour/:id
router.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findOne({_id: req.params.id});

    res.status(200).json(tour);
  } catch (e) {
    res.status(500).json({message: 'Something went wrong, please try again'});
  }
});

// /api/tour/create
router.post(
  '/create',
  auth,
  [
    check('title', 'Enter title').isLength({min: 1}),
    check('price', 'Enter price').exists().isNumeric(),
    check('category', 'Select category').isLength({min: 1}),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: errors.array()[0].msg || 'Incorrect data'
        });
      }

      const user = await User.findOne({_id: req.user.userId});

      if (!user)
        return res.status(400).json({message: 'User not found'});
      if (user.role !== 'admin')
        return res.status(400).json({message: 'Permission denied'});

      const {
        title,
        short_description,
        description,
        price
      } = req.body;

      const images = req.body.images.trim().length > 0 ?
        req.body.images.trim().split('\n') : null;

      const category = await Category.findOne({ name: req.body.category });

      if (!category)
        res.status(400).json({message: 'Category with this name not found'});

      const tour = new Tour({
        title, short_description, description, images,
        price, category: category._id, owner: user.userId
      });

      await tour.save();

      res.status(200).json({message: 'New tour created'});

    } catch (e) {
      res.status(500).json({message: 'Something went wrong, please try again'});
    }
  }
);

// /api/tour/update/:id
router.put('/update/:id', auth,
  [
    check('title', 'Enter title').isLength({min: 1}),
    check('price', 'Enter price').exists(),
    check('category', 'Select category').isLength({min: 1}),
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: errors.array()[0].msg || 'Incorrect data'
      });
    }

    const user = await User.findOne({_id: req.user.userId});

    if (!user)
      return res.status(400).json({message: 'User not found'});
    if (user.role !== 'admin')
      return res.status(400).json({message: 'Permission denied'});

    const {
      title, short_description, description, images, price
    } = req.body;

    const category = await Category.findOne({ name: req.body.category });

    if (!category)
      res.status(400).json({message: 'Category with this name not found'});

    await Tour.findOneAndUpdate({ _id:req.params.id }, {
      title, short_description, description, images, price, category
    }, function (err, place) {
      res.status(200).json({message: 'Tour successfully edited'});
    });

    return res.status(400).json({message: 'Tour not found'});
  } catch (e) {
    res.status(500).json({message: config['errorMsg']});
  }
});

module.exports = router;