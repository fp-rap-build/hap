const Documents = require('../documentModel');

const updateDocument = async (req, res, next) => {
  const { id } = req.params;

  const newDocument = req.body;

  try {
    let updatedDocument = await Documents.findByIdAndUpdate(id, newDocument);

    res.status(200).json({ document: updatedDocument[0] });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = updateDocument;
