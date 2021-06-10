const express = require('express');
const router = express.Router();

//Controllers
const {
  createAge,
  getAgesByUserId,
  deleteById,
  updateById,
} = require('./controllers');

//Validators

//Takes an array
router.route('/').post(createAge).put(updateById);

router.route('/:id').delete(deleteById);

router.route('/user/:id').get(getAgesByUserId);

module.exports = router;
