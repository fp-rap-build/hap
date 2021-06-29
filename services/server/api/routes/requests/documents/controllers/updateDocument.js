const Documents = require('../documentModel');

const updateDocument = async (req, res) => {
  const id = req.params.id;

  const name = req.body.name;

  try {
    const document = await Documents.findByName(id, name).then(
      (res) => res.data
    );
    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = updateDocument;
