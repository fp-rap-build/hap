const Income = require('../incomes-model');
//findByRequestId

exports.getByRequestId = async (req, res) => {
  const { requestId } = req.params;
  try {
    const incomes = await Income.findByRequestId(requestId);
    res.status(200).json(incomes);
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
};

exports.createIncome = async (req, res) => {
  const income = req.body;
  try {
    const newIncome = await Income.create(income);
    res.status(200).json(newIncome);
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
};

exports.updateIncome = async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const updated = await Income.update(id, changes);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
};
