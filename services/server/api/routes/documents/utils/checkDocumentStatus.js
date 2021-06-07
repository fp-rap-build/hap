const { findAllComments } = require('../../requests/requestsModel');

const checkDocumentStatus = (documents) => {
  if (documents.length < 4) {
    return false;
  }

  for (let i = 0; i < 4; i++) {
    if (document.status === 'received' || document.status === 'optOut') {
      continue;
    } else {
      return false;
    }
  }

  return true;
};

module.exports = checkDocumentStatus;
