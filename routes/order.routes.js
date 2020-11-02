const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const config = require('config')
const User = require('../models/User');
const Tour = require('../models/Tour');
const Order = require('../models/Order');
const auth = require('../middleware/auth.middleware');
const router = Router();

// /api/order/
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ owner: req.user.userId });

    res.status(200).json(orders);
  } catch (e) {
    res.status(500).json({message: 'Something went wrong, please try again'});
  }
});

// /api/order/:id
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id });

    if (order.owner !== req.user.id)
      res.status(400).json({message: 'Permission denied'});

    res.status(200).json(order);
  } catch (e) {
    res.status(500).json({message: 'Something went wrong, please try again'});
  }
});

// /api/order/create/:id
router.post('/create/:id', auth, async (req, res) => {
    try {
      const tour = await Tour.findOne({ _id: req.params.id });

      if (!tour)
        return res.status(400).json({message: 'Tour not found'});

      const orderCheck = await Order.findOne({ owner: req.user.userId, tour: tour._id });

      if (orderCheck)
        return res.status(400).json({message: 'You ordered it before'});

      const order = new Order({
        owner: req.user.userId, tour: tour._id
      });

      await order.save();

      res.status(200).json({message: 'Order successfully created'});

    } catch (e) {
      res.status(500).json({message: 'Something went wrong, please try again'});
    }
  }
);

module.exports = router;