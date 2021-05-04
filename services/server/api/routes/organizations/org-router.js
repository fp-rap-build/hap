const express = require('express');
const authRequired = require('../../middleware/authRequired');

const router = express.Router();

// Middlewares
const restrictTo = require('../../middleware/restrictTo');

// Controllers
const {
  getAllOrganizations,
  createOrganization,
  getOrganizationById,
  updateOrganizationById,
  deleteOrganizationById,
  getAllProgramsByOrganizationId,
  createProgram,
} = require('./controllers');

// validators
const { validateOrgId } = require('./validators');

// These middewares will run for every route
router.use(authRequired);

router
  .route('/')
  .all(restrictTo('admin'))
  .get(getAllOrganizations)
  .post(createOrganization);

router
  .route('/:id')
  .all(restrictTo('admin'), validateOrgId)
  .get(getOrganizationById)
  .put(updateOrganizationById)
  .delete(deleteOrganizationById);

router
  .route('/:id/programs')
  .all(restrictTo('admin', 'orgAdmin', 'programManager'), validateOrgId)
  .get(getAllProgramsByOrganizationId)
  .post(createProgram);

module.exports = router;
