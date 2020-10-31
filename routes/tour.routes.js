const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const Tour = require('../models/Tour')
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

router.get('/:id', async (req, res) => {
  try {
    console.log('Body', req.body)
    const tour = await Tour.findOne({ _id: req.params.id });

    res.status(200).json(tour);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" })
  }
})

// /api/tour/page/:page
// router.get('/page/:id', async (req, res) => {
//   try {
//     const page = req.params.id;
//
//   } catch (e) {
//     res.status(500).json({ message: "Something went wrong, please try again" })
//   }
// })

module.exports = router