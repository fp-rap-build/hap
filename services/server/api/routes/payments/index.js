const express = require('express');
const authRequired = require('../../middleware/authRequired');
const router = express.Router();
const restrictTo = require('../../middleware/restrictTo');

// Controllers
const {} = require('./controllers');

// Global middleware
router.use(authRequired);

// Routes
router.route('/').get((req, res, next) => res.send('hello there'));

module.exports = router