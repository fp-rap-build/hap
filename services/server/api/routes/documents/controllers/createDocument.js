const Documents = require('../documentModel');

const createDocument = async (req, res) => {
  const document = req.body;

  try {
    const createdDocument = await Documents.createPlaceholder(document);
    res.status(200).json(createdDocument);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = createDocument;
