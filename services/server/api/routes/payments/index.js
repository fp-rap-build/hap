const express = require('express');
const authRequired = require('../../middleware/authRequired');
const router = express.Router();
const restrictTo = require('../../middleware/restrictTo');

// Controllers
const { findForTable } = require('./controllers');

// Global middleware
router.use(authRequired);

router.use(restrictTo('admin'));

// Routes
router.route('/table').get(findForTable);

module.exports = router;
