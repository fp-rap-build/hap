const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const requestStatusChange = (requestStatus, emailAddress) => {
  let text;

  switch (requestStatus) {
    case 'inReview':
      text =
        'Your Family Promise HAP Application status is being reviewed by our team! <p> Please log in regularly at www.SpokaneRentHelp.org to check the status of your request';
      break;

    case 'documentsNeeded':
      text = `Your Family Promise HAP Application requires documents to continue forward. <p>Please login to your account at www.SpokaneRentHelp.org to view which documents you will need to upload</p>`;
     
      break;

    case 'verifyingDocuments':
      text = `Our team is currently verifying your documents! <p> You can login to view any new comments here: www.SpokaneRentHelp.org (click on "log in to view your status") </p>`;
      break;

    case 'notResponding':
      text =
        'Our team has decided to put your HAP Application on hold until you respond - please log in at www.SpokaneRentHelp.org as soon as possible to continue your request';
      break;

    case 'denied':
      text = 'Your Family Promise HAP Application has been denied - please log in at www.SpokaneRentHelp.org to view why and/or to reapply';
      break;

    case 'approved':
      text = 'Your Family Promise HAP Application has been approved! - please log in to your account at www.SpokaneRentHelp.org to see what the next steps are.';
      break;

    default:
      text = `Your Family Promise HAP Application status has been changed to ${requestStatus} - please log in at www.SpokaneRentHelp.org to check for messages from us and/or document requests`;
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

const sendPromiseToPayEmail = (emailAddress) => {
  const msg = {
    to: emailAddress,
    from: 'hap@familypromiseofspokane.org',
    subject: 'Approved for Rental Assistance',
    text: `Your tenant's request has been approved! We will contact you shortly to go over the details`,
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
    mailingList = ['fpspokane@bill.com', 'dpeabody@familypromiseofspokane.com', 'jwylie@fpspokane.org'];
  } else {
    mailingList = ['jwylie@fpspokane.org'];
  }

  mailingList.forEach((email) => {
    msg = {
      to: email,
      from: 'hap@familypromiseofspokane.org',
      subject: 'Rental Assistance',
      text: `<p>Rental Assistance</p> <p>Payee Name: ${request.landlordName}</p> <p>Payment Amount: ${request.amountRequested}</p> <p>Payment Address: TBD </p> <p> Payee Email: ${request.landlordEmail} </p> <p> Payment Method: Epay </p> <p> Funding Source: TBD </p> <p> Check Memo: Rent,  ${request.firstName} ${request.lastName} ${request.address}   ${request.cityName}, ${request.state} ${request.zipCode} </p> `,
      html: `<p>Rental Assistance</p> <p>Payee Name: ${request.landlordName}</p> <p>Payment Amount: ${request.amountRequested}</p> <p>Payment Address: TBD </p> <p> Payee Email: ${request.landlordEmail} </p> <p> Payment Method: Epay </p> <p> Funding Source: TBD </p> <p> Check Memo: Rent,  ${request.firstName} ${request.lastName} ${request.address}   ${request.cityName}, ${request.state} ${request.zipCode} </p> `,
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
