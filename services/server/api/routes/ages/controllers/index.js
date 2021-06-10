const Ages = require('../agesModel');

exports.createAge = (req, res) => {
  const ages = req.body;
  const returnAges = [];
  //Add middleware for array and real user id, and only one head of household
  //Also self auth required
  ages.forEach(async (age) => {
    try {
      await Ages.create(age);
    } catch (err) {
      res.status(500).json({ errorMessage: err });
    }
  });
  res.status(200).json({ message: 'Ages Created' });
};

exports.getAgesByUserId = async (req, res) => {
  const { id } = req.params;

  try {
    const reqAges = await Ages.findByUserId(id);
    res.status(200).json(reqAges);
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
};

exports.deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    await Ages.removeById(id);
    res.status(200).json({ message: `Age Succesfully Deleted`, deletedId: id });
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
};
