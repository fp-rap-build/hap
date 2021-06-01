const express = require('express');
const router = express.Router();

// Controllers
const {
  getAllDocuments,
  deleteDocument,
  updateDocument,
  findByName,
} = require('./controllers');

// Validators
const { checkIfDocumentExists } = require('./validators');

router.route('/').get(getAllDocuments);

router.route('/name').post(findByName);

router
  .route('/:id')
  .all(checkIfDocumentExists)
  .put(updateDocument)
  .delete(deleteDocument);

module.exports = router;
