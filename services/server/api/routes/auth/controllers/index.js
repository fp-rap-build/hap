const registerUser = require('./registerUser');

const loginUser = require('./loginUser');

const resetPassword = require('./resetPassword')

const forgotPassword = require('./forgotPassword')

const validateResetToken = require('./validateResetToken')

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  validateResetToken
};
