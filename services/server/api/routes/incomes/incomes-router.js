const express = require('express');
const authRequired = require('../../middleware/authRequired');

const router = express.Router();
const restrictTo = require('../../middleware/restrictTo');

//controllers
const {
  getByRequestId,
  createIncome,
  updateIncome,
  deleteIncome,
} = require('./controllers/index');

router.use(authRequired);

//Routes
router.route('/:id').put(updateIncome).delete(deleteIncome);

router.route('/').post(createIncome);

router.route('/:requestId').get(getByRequestId);

module.exports = router;
