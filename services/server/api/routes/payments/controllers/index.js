const Payments = require('../model');

const Requests = require('../../requests/requestsModel');
const {
  sendConfirmationOfApproval,
} = require('../../../utils/sendGrid/messages');

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

  const {
    amount,
    monthsBack,
    totalArrears,
    monthsForward,
    amountBack,
    amountForward,
    processed,
  } = req.body;

  try {
    const updatedPayment = await Payments.findByIdAndUpdate(id, {
      amount,
      monthsBack,
      monthsForward,
      amountBack,
      totalArrears,
      amountForward,
      processed,
    });
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

exports.approvePayment = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payments.findById(id);

    if (payment.status === 'approved') {
      return res
        .status(400)
        .json({ message: 'Payment has already been approved' });
    }

    const approvedPayment = await Payments.findByIdAndUpdate(id, {
      status: 'approved',
    });

    const request = await Requests.findById(payment.requestId);

    sendConfirmationOfApproval(request[0]);

    res.status(200).json({
      payment: approvedPayment[0],
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Unable to approve payment' });
  }
};

exports.denyPayment = async (req, res) => {
  const { id } = req.params;

  try {
    const deniedPayment = await Payments.findByIdAndUpdate(id, {
      status: 'denied',
    });

    res.status(200).json({ payment: deniedPayment[0] });
  } catch (error) {
    res.status(500).json({ message: 'Unable to deny payment' });
  }
};
