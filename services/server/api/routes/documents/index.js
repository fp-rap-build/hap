const express = require('express');
const router = express.Router();

// Controllers
const {
  getAllDocuments,
  deleteDocument,
  updateDocument,
  createDocument,
  updateDocumentStatus,
} = require('./controllers');

// Validators
const {
  checkIfDocumentExists,
  checkDocumentCompletion,
} = require('./validators');

router.route('/').get(getAllDocuments).post(createDocument);

router
  .route('/:id/status')
  .all(checkIfDocumentExists)
  .put(updateDocumentStatus);

router
  .route('/:id')
  .all(checkIfDocumentExists)
  .put(checkDocumentCompletion, updateDocument)
  .delete(deleteDocument);

module.exports = router;
