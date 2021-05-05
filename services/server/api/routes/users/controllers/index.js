// ** /users **

const {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require('./routes/users');

const {
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
  getAllSubscriptions,
  getAllNotifications
} = require('./routes/me');

const {
  getUserAddressById,
  updateCurrentUserAddress,
} = require('./routes/addresses');

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
  updateCurrentUserAddress,
  getUserAddressById,
  getAllSubscriptions,
  getAllNotifications
};
