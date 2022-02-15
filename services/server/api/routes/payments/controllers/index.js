const Payments = require('../model');

const Requests = require('../../requests/requestsModel');

const Programs = require('../../programs/model');

const {
  sendConfirmationOfApproval,
} = require('../../../utils/sendGrid/messages');

exports.findForTable = async (req, res, next) => {
  try {
    const tableData = await Payments.findForTable();

    res.status(200).json({ payments: tableData });
  } catch (error) {
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
    providerName,
    providerAddress,
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
      providerName,
      providerAddress,
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
    let payment = await Payments.findById(id);

    if (payment.status === 'approved') {
      return res
        .status(400)
        .json({ message: 'Payment has already been approved' });
    }

    let approvedPayment = await Payments.findByIdAndUpdate(id, {
      status: 'approved',
    });

    let request = await Requests.findById(payment.requestId);

    let program = await Programs.findById(payment.programId);

    request = request[0];
    approvedPayment = approvedPayment[0];

    let emailPayload = {
      renterOrOwner: request.renterOrOwner,
      requestId: `HAP${request.id}`,
      accountNumber: request.accountNumber,
      type: payment.type,
      accountNumber: payment.accountNumber,
      providerName: payment.providerName,
      providerAddress: payment.providerAddress,
      budget: program.budget,
      landlordName: request.landlordName,
      landlordAddress: request.landlordAddress,
      landlordAddress2: request.landlordAddress2,
      landlordCity: request.landlordCity,
      landlordState: request.landlordState,
      landlordZip: request.landlordZip,
      landlordEmail: request.landlordEmail,
      firstName: request.firstName,
      lastName: request.lastName,
      cityName: request.cityName,
      state: request.state,
      address: request.address,
      zipCode: request.zipCode,
      email: request.email,
      budget: program.name,
      amountApproved: payment.amount,
    };

    sendConfirmationOfApproval(emailPayload);

    res.status(200).json({
      payment: approvedPayment[0],
    });

  } catch (error) {
    console.log(error);
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


