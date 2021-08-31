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

  const { amount, monthsBack, monthsForward } = req.body;

  try {
    const updatedPayment = await Payments.findByIdAndUpdate(id, { amount, monthsBack, monthsForward });
    res.status(200).json({ payment: updatedPayment });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error1' });
  }
};

exports.deletePayment = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Payments.findByIdAndDelete(id);

    res.status(204).json({ message: 'Payment has been deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
