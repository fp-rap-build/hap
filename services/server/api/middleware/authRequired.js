const User = require('../routes/users/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const authRequired = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: 'You are not logged in! Please log in to get access' });
  }

  // 2) Verify token

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return res
        .status(401)
        .json({ message: 'The user belonging to this token no longer exists' });
    }

    // Hide password

    currentUser['password'] = undefined;

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (error) {
    if (error.message == 'invalid token' || error.message == 'jwt malformed') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = authRequired;
