const express = require('express');
const router = express.Router();

//Controllers
const { createAge, getAgesByUserId, deleteById } = require('./controllers');

//Validators

router.route('/').post(createAge);

router.route('/:id').delete(deleteById);

router.route('/user/:id').get(getAgesByUserId);

module.exports = router;
