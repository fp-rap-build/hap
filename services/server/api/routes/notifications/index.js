const express = require('express');

const router = express.Router();

const authRequired = require('../../middleware/authRequired');
const restrictTo = require('../../middleware/restrictTo');

const { deleteNotification, viewNotification } = require('./controllers');

router.use(authRequired);

// Routes
router.route('/:id').delete(deleteNotification);

router.route('/:id/seen').post(viewNotification);

module.exports = router;
