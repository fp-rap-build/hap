const { signToken } = require('../utils');

const User = require('../../users/userModel');

const registerUser = async (req, res, next) => {
  let payload = req.body;

  try {
    let user = await User.create(payload);

    user = user[0];

    // Hide password
    user['password'] = undefined;

    // Generate a token
    const token = signToken(user.id);

    res.status(201).json({
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error Registering User' });
  }
};

module.exports = registerUser;
