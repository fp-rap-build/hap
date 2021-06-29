// ** /users **

const {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getAllStaffUsers,
} = require('./routes/users');

const {
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
  getAllSubscriptions,
  getAllNotifications,
  readAllNotifications,
  deleteAllNotifications,
} = require('./routes/me');

const {
  getUserAddressById,
  updateCurrentUserAddress,
} = require('./routes/addresses');

module.exports = {
  getAllUsers,
  getAllStaffUsers,
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
  getAllNotifications,
  readAllNotifications,
  deleteAllNotifications,
};
