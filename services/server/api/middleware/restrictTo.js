const createError = require('http-errors');

const restrictTo = (...roles) => (req, res, next) => {
  const { role } = req.user;

  if (!roles.includes(role)) {
    next(createError(401, 'You are unauthorized to perform this action'));
  }
  next();
};

module.exports = restrictTo;
