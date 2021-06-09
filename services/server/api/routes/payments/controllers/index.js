const Payments = require('../model');

exports.findForTable = async (req, res, next) => {
  try {
    const tableData = await Payments.findForTable();

    res.status(200).json({ payments: tableData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updatePayment = async (req, res, next) => {
  const { id } = req.params;

  const { amount } = req.body;

  try {
    const updatedPayment = await Payments.findByIdAndUpdate(id, { amount });

    res.status(200).json({ payment: updatedPayment });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
