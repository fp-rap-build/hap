const Documents = require('../documentModel');

const getAllDocuments = async (req, res) => {
  try {
    let documents = await Documents.findAll();

    res.status(200).json({ results: documents.length, documents });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = getAllDocuments;
