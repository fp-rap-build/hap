const express = require('express');

const router = express.Router();

const authRequired = require('../../middleware/authRequired');
const restrictTo = require('../../middleware/restrictTo');

// Controllers
const { createSubscription, deleteSubscription } = require('./controllers');

// Middlewares
router.use(authRequired, restrictTo('programManager', 'admin', 'orgAdmin'));

// Routes
router.route('/').post(createSubscription);

router.route('/:id').delete(deleteSubscription);

module.exports = router;
