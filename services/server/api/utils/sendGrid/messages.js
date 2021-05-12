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

const sendResetPasswordLink = (emailAddress, resetURL) => {
  const msg = {
    to: emailAddress,
    from: 'admin@familypromiseofspokane.org',
    subject: 'Password reset',
    html: `<p>Click here to reset your password <a href="${resetURL}">${resetURL}</a></p>`,
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

const sendPromiseToPayEmail = (emailAddress) => {
  const msg = {
    to: emailAddress,
    from: 'admin@familypromiseofspokane.org',
    subject: 'Approved for Rental Assistance',
    text: `Your tenants request has been approved! We will contact you shortly to go over the details`,
    html: `<p>Your tenants request has been approved! We will contact you shortly to go over the details</p>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error('Failed to send email');
    });
};

const sendConfirmationOfApproval = (request) => {
  let mailingList;
  let msg;

  if (process.env.NODE_ENV === 'production') {
    mailingList = ['fpspokane@bill.com', 'dpeabody@fpspokane.org'];
  } else {
    mailingList = ['jwylie@fpspokane.org'];
  }

  mailingList.forEach((email) => {
    msg = {
      to: email,
      from: 'admin@familypromiseofspokane.org',
      subject: 'Approval',
      text: `Request #${request.id} has been approved`,
      html: `<p>Request #${request.id} has been approved</p>`,
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

module.exports = {
  requestStatusChange,
  sendResetPasswordLink,
  sendPromiseToPayEmail,
  sendConfirmationOfApproval,
};
