const { check, validationResult } = require('express-validator');
const User = require('../../users/userModel');

module.exports = [
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid'),
  check('password').notEmpty().withMessage('Password is required'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    const { email } = req.body;

    try {
      // Check if user exists
      let user = await User.findBy({ email });

      let userExists = user.length > 0;

      if (!userExists) {
        // Keep the message vague for security
        return res.status(401).json({ message: 'Incorrect email or password' });
      }

      next();
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  },
];
