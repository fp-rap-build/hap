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
