const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const Tour = require('../models/Tour')
const auth = require('../middleware/auth.middleware')
const router = Router()

// /api/tour/
router.get('/', async (req, res) => {
  try {
    const tours = await Tour.find({});
    console.log(tours);
    res.status(200).json(tours);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" })
  }
})

// /api/tour/:id
router.get('/:id', async (req, res) => {
  try {
    console.log(req.params);
    const tour = await Tour.findOne({ _id: req.params.id });

    res.status(200).json(tour);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" })
  }
})

// /api/tour/create
router.post(
  '/create',
  auth,
  [
    check('title', 'Enter title').isLength({ min: 1 }),
    check('price', 'Enter price').exists(),
    check('category', 'Pick category').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: errors.array()[0].msg || 'Incorrect data'
        })
      }

      const {
        title,
        short_description,
        description,
        img,
        price,
        category
      } = req.body;

      const user = await User.findOne({ _id: req.user.userId });

      if (!user)
        return res.status(400).json({ message: 'User not found' })
      if (user.role !== 'admin')
        return res.status(400).json({ message: 'Permission denied' })

      const tour = new Tour({
        title, short_description, description, img, price, owner: user.userId // Add category !!!!!!!!!
      })

      await tour.save();

      res.status(200).json({ message: "New tour created" })

    } catch (e) {
      res.status(500).json({ message: "Something went wrong, please try again" })
    }
  })

module.exports = router