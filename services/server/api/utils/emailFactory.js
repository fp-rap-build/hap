const nodeMailer = require('nodemailer');
const { options } = require('../routes/users/userRouter');

const sendEmail = (options) => {
  const transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};
