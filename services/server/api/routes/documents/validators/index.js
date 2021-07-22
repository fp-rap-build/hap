const Documents = require('../documentModel');
const Requests = require('../../requests/requestsModel');

const checkIfDocumentsHaveDeniedCategories = require('../utils/checkIfDocumentsHaveDeniedCategories');

const checkIfDocumentExists = async (req, res, next) => {
  const { id } = req.params;

  try {
    let document = await Documents.findById(id);

    if (document.length == 0) {
      return res
        .status(404)
        .json({ message: `Document with id of ${id} does not exist` });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

//Checks if all necessary documents have been submitted by applicant
//If all documents submitted we update requestStatus to verifyingDocuments and
const checkDocumentCompletion = async (req, res, next) => {
  const { requestId, category, id: docId } = req.body;

  const validStatuses = {
    received: 1,
    actionsRequired: 1,
    denied: 1,
    verified: 1,
    optOut: 1,
  };

  const docChecks = {
    childrenOrPregnancy: false,
    residency: false,
    income: false,
    housingInstability: false,
    covid: false,
  };

  //Update status of current document being processed
  docChecks[category] = true;

  try {
    const request = await Requests.findById(requestId);

    //NEXT if request isn't in docuemntsNeeded status
    //do not want to use the middleware if application is further down the review process
    if (request[0].requestStatus !== 'documentsNeeded') {
      next();
    }

    //Check other request documents and update docChecks accordingly
    let requestDocs = await Documents.findByRequestId(requestId);

    requestDocs = requestDocs.map((doc) => {
      if (doc.id === docId) {
        return req.body;
      }

      return doc;
    });

    requestDocs.forEach((doc) => {
      if (doc.status in validStatuses && doc.category !== 'other') {
        docChecks[doc.category] = true;
      }
    });

    //Check to see if docChecks has any false values
    let hasFalseDocs = Object.keys(docChecks).some((key) => !docChecks[key]);

    let hasDeniedCategories = checkIfDocumentsHaveDeniedCategories(requestDocs);

    //No false's? --> update doc status
    if (!hasFalseDocs && !hasDeniedCategories) {
      await Requests.update(requestId, {
        requestStatus: 'verifyingDocuments',
        incomplete: false,
      });
    }

    next();
  } catch (error) {
    console.log('Error id document status middleware', error);
    next();
  }
};

module.exports = { checkIfDocumentExists, checkDocumentCompletion };
