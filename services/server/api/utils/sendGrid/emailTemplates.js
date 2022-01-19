const rentalAssistanceTemplate = (request, email) => {
  let message = {
    to: email,
    from: 'hap@familypromiseofspokane.org',
    subject: `Rental Assistance for ${request.requestId}`,
    text: `Subject: Rental Assistance for ${request.requestId},  Funding Source: ${
      request.budget
    } , Payment Method: Check, Payee: Landlord, Payee Name: ${
      request.landlordName
    } , Payee Address: ${request.landlordAddress}  ${
      request.landlordAddress2 ? request.landlordAddress2 : ''
    }  ${request.landlordCity}  ${request.landlordState}  ${
      request.landlordZip
    } ,  Payee Email:  ${request.landlordEmail} Payment Amount: ${
      request.amountApproved
    } ,  Check Memo: Rent for tenant  ${request.firstName} ${request.lastName} residing at:${
      request.address
    }   ${request.cityName}, ${request.state} ${request.zipCode} `,
    html: `<p>Rental Assistance for ${request.requestId}</p> <p> Funding Source: ${
      request.budget
    } </p> <p>Payment Method: Check </p>  <p>Payee: Landlord</p> <p>Payee Name: ${
      request.landlordName
    }</p> <p>Payee Address: ${request.landlordAddress}  ${
      request.landlordAddress2 ? request.landlordAddress2 : ''
    }  ${request.landlordCity}  ${request.landlordState}  ${
      request.landlordZip
    } </p> <p> Payee Email:  ${request.landlordEmail} </p><p>Payment Amount: ${
      request.amountApproved
    }</p>  <p> Check Memo: Rent for tenant: ${request.firstName} ${request.lastName} residing at: ${
      request.address
    }   ${request.cityName}, ${request.state} ${request.zipCode} </p> `,
  };

  return message;
};

const utilityAssistanceTemplate = (request, email) => {
  let message = {
    to: email,
    from: 'hap@familypromiseofspokane.org',
    subject: `Utility Assistance for ${request.requestId}`,
    text: `Subject: Utility Assistance for ${request.requestId},  Funding Source: ${
      request.budget
    } , Payment Method: Check, Payee: ${request.providerName},
    } , Payee Address: ${request.providerAddress}  Payment Amount: ${
      request.amountApproved
    } ,  Check Memo: Utility Assistance for  ${request.firstName} ${request.lastName} with account number ${
      request.accountNumber
    } residing at:${
      request.address
    }   ${request.cityName}, ${request.state} ${request.zipCode} `,
    html: `<p>Utility Assistance for ${request.requestId}</p> <p>Account number: ${
      request.accountNumber
    }</p> <p> Utility Provider Name: ${request.providerName ? request.providerName : ''}</p>
    
    <p>
        Utility Provider Address: ${request.providerAddress ? request.providerAddress : ''}
    </p>
    <p> Funding Source: ${
      request.budget
    } </p> <p>Payment Method: Check </p> <p>Payee Name: ${request.providerName}</p> <p>Payee Address: ${request.providerAddress}  </p> <p></p><p>Payment Amount: ${
      request.amountApproved
    }</p>  <p> Check Memo: Utility Payment for  ${request.firstName} ${request.lastName} residing at:${
      request.address
    }   ${request.cityName}, ${request.state} ${request.zipCode} </p> `,
  };

  return message;
};

module.exports = {
  rentalAssistanceTemplate,
  utilityAssistanceTemplate,
};
