const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const Tour = require('../models/Tour');
const Review = require('../models/Review');
const auth = require('../middleware/auth.middleware');
const router = Router();

// /api/review/
router.get('/', auth, async (req, res) => {
  try {
    const reviews = await Review.find({ owner: req.user.userId });

    res.status(200).json(reviews);
  } catch (e) {
    res.status(500).json({message: 'Something went wrong, please try again'});
  }
});

// /api/review/tour/:id
router.get('/tour/:id', async (req, res) => {
  try {
    const reviews = await Review.find({ tour: req.params.id });

    res.status(200).json(reviews);
  } catch (e) {
    res.status(500).json({message: 'Something went wrong, please try again'});
  }
});

// /api/review/create
router.post(
  '/create',
  auth,
  [
    check('tourId', 'Enter tour field').isLength({min: 1}),
    check('text', 'Minimum text length: 20 symbols').isLength({min: 20}),
    // check('rate', 'Enter rate please').isNumeric().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      console.log(req.body);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: errors.array()[0].msg || 'Incorrect data'
        });
      }

      const reviewCheck = await Review.findOne({
        owner: req.user.userId, tour: req.body.tourId
      });

      if (reviewCheck)
        return res.status(400).json({message: 'Your can left just one review about this tour'});

      const tourCheck = await Tour.findOne({ _id: req.body.tourId });
      const user = await User.findOne({ _id: req.user.userId });

      if (!tourCheck)
        return res.status(400).json({message: 'Tour not found'});

      const review = new Review({
        tour: req.body.tourId,
        text: req.body.text,
        rate: req.body.rate,
        owner: user._id,
        ownerName: user.name
      });

      await review.save();

      res.status(200).json({message: 'Review successfully posted'});

    } catch (e) {
      res.status(500).json({message: 'Something went wrong, please try again'});
    }
  }
);

module.exports = router;