const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
  '/register',
  [
    check('name', 'Name can not be empty').isLength({min: 1}),
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Minimal password length is 6 symbols').isLength({min: 6})
  ],
  async (req, res) => {
    try {

      console.log('Body', req.body);

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: errors.array()[0].msg || 'Incorrect data for registration'
        });
      }

      const {name, email, password} = req.body;

      const candidate = await User.findOne({email});

      if (candidate) {
        return res.status(400).json({message: 'This user is currently created'});
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({name, email, password: hashedPassword});

      await user.save();

      res.status(200).json({message: 'User created'});

    } catch (e) {
      res.status(500).json({message: 'Something went wrong, please try again'});
    }
  });

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Enter correct email').isEmail(),
    check('password', 'Enter password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data for authorization'
        });
      }

      const {email, password} = req.body;

      const user = await User.findOne({email});

      if (!user) {
        return res.status(400).json({message: 'User not found'});
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({message: 'Incorrect password, try again'});
      }

      const token = jwt.sign(
        {userId: user.id},
        config.get('jwtSecret'),
        {expiresIn: '12h'}
      );

      res.json({
        token,
        id: user.id,
        role: user.role,
        img: user.img,
        name: user.name,
        email: user.email
      });

    } catch (e) {
      res.status(500).json({message: 'Something went wrong, please try again'});
    }
  }
);

module.exports = router;