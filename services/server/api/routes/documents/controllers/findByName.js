const Documents = require('../documentModel');

const findByName = async (req, res) => {
  try {
    const document = await Documents.findByName(req.body.name);
    res.status(200).json(document);
  } catch (error){
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = findByName;
