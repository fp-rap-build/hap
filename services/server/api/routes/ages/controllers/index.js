const Ages = require('../agesModel');

exports.createAge = async (req, res) => {
  const age = req.body;

  try {
    const newAge = await Ages.create(age);
    res.status(200).json(newAge);
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
};
