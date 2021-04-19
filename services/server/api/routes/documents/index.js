const express = require('express');
const router = express.Router();

// Controllers
const {
  getAllDocuments,
  deleteDocument,
  updateDocument,
} = require('./controllers');

// Validators
const { checkIfDocumentExists } = require('./validators');

router.route('/').get(getAllDocuments);

router
  .route('/:id')
  .all(checkIfDocumentExists)
  .put(updateDocument)
  .delete(deleteDocument);

module.exports = router;
