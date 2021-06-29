const express = require('express');
const router = express.Router();

// Controllers
const {
  getAllDocuments,
  deleteDocument,
  updateDocument,
  createDocument,
} = require('./controllers');

// Validators
const { checkIfDocumentExists } = require('./validators');

router.route('/').get(getAllDocuments).post(createDocument);

router
  .route('/:id')
  .all(checkIfDocumentExists)
  .put(updateDocument)
  .delete(deleteDocument);

module.exports = router;
