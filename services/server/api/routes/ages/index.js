const express = require('express');
const router = express.Router();

//Controllers
const { createAge } = require('./controllers');

//Validators

router.route('/').post(createAge);

module.exports = router;
