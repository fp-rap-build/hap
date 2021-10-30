const Documents = require('../documentModel');

const getAllDocuments = async (req, res) => {
  const { id } = req.params;

  console.log('hit');

  try {
    const documents = await Documents.findAllByRequestId(id);

    res.status(200).json({
      results: documents.length,
      documents,
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to retrieve documents' });
  }
};

module.exports = getAllDocuments;
