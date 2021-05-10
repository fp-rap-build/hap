const express = require('express');

const router = express.Router();

const authRequired = require('../../middleware/authRequired');
const restrictTo = require('../../middleware/restrictTo');

// Controllers
const { createSubscription, deleteSubscription } = require('./controllers');

const { checkIfUserIsAlreadySubscribed } = require('./validators/index');

// Middlewares
router.use(authRequired, restrictTo('programManager', 'admin', 'orgAdmin'));

// Routes
router.route('/').post(checkIfUserIsAlreadySubscribed, createSubscription);

router.route('/:id').delete(deleteSubscription);

module.exports = router;
