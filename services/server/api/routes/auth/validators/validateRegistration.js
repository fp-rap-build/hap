const { check, validationResult } = require('express-validator');

const User = require('../../users/userModel');

const validRoles = ['tenant', 'landlord'];

module.exports = [
  check('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .isAlpha()
    .withMessage('Must be only alphabetical chars'),
  check('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .isAlpha()
    .withMessage('Must be only alphabetical chars'),
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid'),
  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 10, max: 255 })
    .withMessage('Password must be between 10 and 255 characters'),
  check('role')
    .notEmpty()
    .withMessage('Role is required')
    .custom((role) => validRoles.includes(role))
    .withMessage('Invalid role - your options are [tenant, landlord]'),
  async (req, res, next) => {
    const errors = validationResult(req);
    const { email } = req.body;
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    try {
      // Check if user exists
      let user = await User.findBy({ email });

      let userExists = user.length > 0;

      if (userExists) {
        return res
          .status(400)
          .json({ message: 'User with that email already exists' });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },
];
