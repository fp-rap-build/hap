const Payments = require('../payments/model');

const Programs = require('../../programs/model')

const sendPayment = async (req, res, next) => {
  const paymentData = req.body;

  try {
    // Create payment
    let payment = await Payments.create(paymentData);

    payment = payment[0];

    // Deduct from programs budget
    const { programId, amount } = payment;

    const program = await Programs.findById(programId)

    const newBudget = program[0].budget - amount

    await Programs.findByIdAndUpdate(programId, { budget: newBudget })

    res.status(201).json({ payment });
  } catch (error) {
      console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  sendPayment,
};
