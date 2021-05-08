const express = require('express');

const router = express.Router();

const authRequired = require('../../middleware/authRequired');
const restrictTo = require('../../middleware/restrictTo');

const { deleteNotification } = require('./controllers');

router.use(authRequired);

// Routes
router.route('/:id').delete(deleteNotification);

module.exports = router;
