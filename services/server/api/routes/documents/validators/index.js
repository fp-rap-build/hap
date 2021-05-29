const Documents = require('../documentModel');

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

module.exports = { checkIfDocumentExists };
