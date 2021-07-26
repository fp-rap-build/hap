const Documents = require('../documentModel');

const Requests = require('../../requests/requestsModel');
const { sendDocumentsDenied } = require('../../../utils/sendGrid/messages');

const updateDocumentStatus = async (req, res, next) => {
  const { id } = req.params;

  const { status } = req.body;

  try {
    let updatedDocument = await Documents.findByIdAndUpdate(id, { status });

    let { requestId, category } = updatedDocument[0];

    let user = await Requests.findTenantByRequestId(requestId);

    let documents = await Documents.findByRequestId(requestId);

    let allDocumentsInCategoryDenied = checkIfAllDocumentsAreDenied(
      documents,
      category
    );

    if (allDocumentsInCategoryDenied) {
      sendDocumentsDenied(user.email);

      await Requests.update(requestId, {
        requestStatus: 'documentsNeeded',
        incomplete: true,
      });
    }

    res.status(200).json({ document: updatedDocument[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const checkIfAllDocumentsAreDenied = (docs, category) => {
  if (docs.length === 0) return false;

  let docsByCategory = docs.filter((doc) => doc.category === category);

  let allDenied = true;

  docsByCategory.forEach((doc) => {
    if (doc.status !== 'denied') allDenied = false;
  });

  return allDenied;
};

module.exports = updateDocumentStatus;
