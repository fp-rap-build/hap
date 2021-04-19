const express = require('express');

const router = express.Router();

const authRequired = require('../../middleware/authRequired');
const restrictTo = require('../../middleware/restrictTo');

// Controllers
const {
  getAllPrograms,
  createProgram,
  getProgramById,
  updateProgramById,
  deleteProgramById,
} = require('./controllers');

// validators
const {
  validateProgramId,
  validateCreateProgram,
  validateUpdateProgram,
} = require('./validators');

// Routes
router
  .route('/')
  .get(getAllPrograms)
  .post(
    authRequired,
    restrictTo('programManager', 'admin', 'orgAdmin'),
    validateCreateProgram,
    createProgram
  );

router
  .route('/:id')
  .all(
    authRequired,
    restrictTo('programManager', 'admin', 'orgAdmin'),
    validateProgramId
  )
  .get(getProgramById)
  .put(validateUpdateProgram, updateProgramById)
  .delete(deleteProgramById);

module.exports = router;
