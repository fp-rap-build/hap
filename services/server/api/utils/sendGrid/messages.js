const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const requestStatusChange = (requestStatus, emailAddress) => {
  let text;

  switch (requestStatus) {
    case 'inReview':
      text =
        'Your Family Promise HAP Application status is being reviewed by our team!';
      break;

    case 'documentsNeeded':
      text = `Your Family Promise HAP Application requires documents to continue forward. Please login to your account to view which documents to upload ${process.env.REACT_APP_URI}/login`;
      break;

    case 'verifyingDocuments':
      text = `Our team is currently verifying your documents! You can login to view any new comments here ${process.env.REACT_APP_URI}/login`;
      break;

    case 'notResponding':
      text =
        'Our team has decided to put your HAP Application on hold until you respond';
      break;

    case 'denied':
      text = 'Your Family Promise HAP Application has been denied';
      break;

    case 'approved':
      text = 'Your Family Promise HAP Application has been approved!';
      break;

    default:
      text = `Your Family Promise HAP Application status has been changed to ${requestStatus}`;
      break;
  }

  const msg = {
    to: emailAddress,
    from: 'admin@familypromiseofspokane.org',
    subject: 'Update! Your request status has changed',
    text: text,
    html: `<p>${text}</p>`,
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
