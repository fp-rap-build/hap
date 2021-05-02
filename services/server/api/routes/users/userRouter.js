const express = require('express');
const authRequired = require('../../middleware/authRequired');
const Users = require('./userModel');
const router = express.Router();
const restrictTo = require('../../middleware/restrictTo');

// Controllers
const {
  getAllUsers,
  createUser,

  getUserById,
  updateUserById,
  deleteUserById,

  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
  getUserAddressById,

  getAllSubscriptions,
} = require('./controllers');

// Global middleware
router.use(authRequired);

// Routes
router.route('/').get(getAllUsers).post(createUser);

router
  .route('/me')
  .get(getCurrentUser)
  .put(updateCurrentUser)
  .delete(deleteCurrentUser);

router.route('/me/subscriptions').get(getAllSubscriptions);

router
  .route('/:id')
  .all(restrictTo('admin', 'programManager'))
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

router
  .route('/:id/address')
  .all(restrictTo('admin', 'programManager'))
  .get(getUserAddressById);

module.exports = router;
