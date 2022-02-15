const sgMail = require('@sendgrid/mail');
const {
  rentalAssistanceTemplate,
  utilityAssistanceTemplate,
} = require('./emailTemplates');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendDocumentsDenied = (emailAddress) => {
  const msg = {
    to: emailAddress,
    from: 'hap@familypromiseofspokane.org',
    subject: 'Denied documents',
    html: `<p>Some of your documents have been denied. Please login to your portal and check the comments for further instruction ${process.env.REACT_APP_URI}/login</p>`,
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

const requestStatusChange = (requestStatus, emailAddress) => {
  let text;

  switch (requestStatus) {
    case 'inReview':
      text =
        'Your Family Promise HAP Application status is being reviewed by our team! <p> Please log in regularly at www.SpokaneHousingAssistance.org to check the status of your request';
      break;

    case 'documentsNeeded':
      text = `Your Family Promise HAP Application requires documents to continue forward. <p>Please login to your account at www.SpokaneHousingAssistance.org to view which documents you will need to upload</p>`;

      break;

    case 'verifyingDocuments':
      text = `Our team is currently verifying your documents! <p> You can login to view any new comments here: www.SpokaneHousingAssistance.org (click on "log in to view your status") </p>`;
      break;

    case 'notResponding':
      text =
        'Your Rental or Utilities Assistance application is on hold until you respond - please log in at www.SpokaneHousingAssistance.org as soon as possible to continue your request';
      break;

    case 'denied':
      text =
        'Your Family Promise HAP Application has been denied - please log in at www.SpokaneHousingAssistance.org to view why and/or to reapply';
      break;

    case 'approved':
      text =
        'Your Rental or Utilities Assistance application has been approved! If you have any further questions please call 509-816-2101.';
      break;

    default:
      text = `Your Family Promise HAP Application status has been changed to ${requestStatus} - please log in at www.SpokaneHousingAssistance.org to check for messages from us and/or document requests`;
      break;
  }

  const msg = {
    to: emailAddress,
    from: 'hap@familypromiseofspokane.org',
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
    from: 'hap@familypromiseofspokane.org',
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

const sendPromiseToPayEmail = (request, emailAddress) => {
  const msg = {
    to: emailAddress,
    from: 'hap@familypromiseofspokane.org',
    subject: 'Approved for Rental Assistance',
    text: `Your tenant ${request.firstName} ${request.lastName} at ${request.address} has been approved for rental assistance! If you have any further questions please call 509-816-2101.`,
    html: `<p>Your tenant ${request.firstName} ${request.lastName} at ${request.address} has been approved for rental assistance!</p> <p>If you have any further questions please call 509-816-2101. </p>`,
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
  if(request.budget === 'Live Stories') return;

  let mailingList;

  if (process.env.NODE_ENV === 'production') {
    mailingList = [
      'hap@familypromiseofspokane.org',
      'fpspokane@bill.com'
    ];  // production mailing list

  } else {
    mailingList = ['j.wylie.81@gmail.com'];
  }

  mailingList.forEach((email) => {
    let message;

    if (request.type == 'rental') {
      message = rentalAssistanceTemplate(request, email);
    }

    if (request.type == 'utility') {
      message = utilityAssistanceTemplate(request, email);
    }

    sgMail
      .send(message)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
  requestStatusChange,
  sendResetPasswordLink,
  sendPromiseToPayEmail,
  sendConfirmationOfApproval,
  sendDocumentsDenied,
};
