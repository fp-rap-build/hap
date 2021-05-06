const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const requestStatusChange = (requestStatus, emailAddress) => {
  const msg = {
    to: emailAddress,
    from: 'admin@familypromiseofspokane.org',
    subject: 'Update! Your request status has changed',
    text: `Your Family Promise HAP Application status has been updated to ${requestStatus}`,
    html: `<p>Your Family Promise HAP Application status has been updated to <strong>${requestStatus}!</strong></p>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
};


const sendResetPasswordLink = (emailAddress, resetURL ,resetToken) => {
  const msg = {
    to: emailAddress,
    from: 'admin@familypromiseofspokane.org',
    subject: 'Password reset',
    html: `<p>Click here to reset your password</p>`,
  }
  sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent');
  })
  .catch((error) => {
    console.error(error);
  });
}

module.exports = { requestStatusChange, sendResetPasswordLink };
