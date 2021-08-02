import { useState } from 'react';

import { processLLDoc } from '../../../../utils/pandaDocUtils';

import { Button } from 'antd';

const w9TemplateId = process.env.REACT_APP_W9_TEMPLATE_ID;
const pafTemplateId = process.env.REACT_APP_PAF_TEMPLATE_ID;

export default function Documents({ request, currentUser }) {
  const [documentURL, setDocumentURL] = useState('');

  const today = new Date();
  const date =
    today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear();

  const llStreetAddress = request.landlordAddress2
    ? `${request.landlordAddress}, ${request.landlordAddress2}`
    : request.landlordAddress;

  const tenantStreetAddress = request.addressLine2
    ? `${request.address} ${request.addressLine2}`
    : request.address;

  const w9DocumentPayload = {
    name: `${currentUser.lastName}_W9`,
    template_uuid: w9TemplateId,
    folder_uuid: 'GCinaN9f6mK2PscC3N32ac',
    recipients: [
      {
        email: currentUser.email,
        first_name: currentUser.firstName,
        last_name: currentUser.lastName,
        role: 'landlord',
      },
    ],
    fields: {
      name: {
        value: `${currentUser.firstName} ${currentUser.lastName}`,
      },
      date: {
        value: date,
      },
      address: {
        value: llStreetAddress,
      },
      cityStateZip: {
        value: `${request.landlordCity} ${request.landlordState}, ${request.landlordZip}`,
      },
    },
  };

  const pafDocumentPayload = {
    name: `${currentUser.lastName}_W9`,
    template_uuid: pafTemplateId,
    folder_uuid: 'qWs5jN6q6ZBXNz65zPhLrS',
    recipients: [
      {
        email: currentUser.email,
        first_name: currentUser.firstName,
        last_name: currentUser.lastName,
        role: 'landlord',
      },
    ],
    fields: {
      householdId: {
        value: request.id,
      },
      tenantName: {
        value: `${request.firstName} ${request.lastName}`,
      },
      rentalAddress: {
        //street, city, state, zip
        value: `${tenantStreetAddress}, ${request.cityName}, ${request.state}, ${request.zipCode}`,
      },
      landlordName: {
        value: `${currentUser.firstName} ${currentUser.lastName}`,
      },
      paymentAddress: {
        value: llStreetAddress,
      },
      landlordCityState: {
        value: `${request.landlordCity} / ${request.landlordState}`,
      },
      landlordZip: {
        value: request.landlordZip,
      },
    },
  };

  const createPandaDoc = async docPayload => {
    try {
      const res = await processLLDoc(docPayload);
      setDocumentURL(`https://app.pandadoc.com/s/${res.sessionId}`);
    } catch (error) {
      console.log(error);
      console.log(error);
    }
  };

  return (
    <div>
      <Button onClick={() => createPandaDoc(w9DocumentPayload)}>
        Create W9
      </Button>
      <Button onClick={() => createPandaDoc(pafDocumentPayload)}>
        {' '}
        Create PAF
      </Button>
      {documentURL ? (
        <div className="documentContainer">
          <iframe
            title="Self Dec Embed"
            src={documentURL}
            style={{ height: '70vh', width: '75vw' }}
          ></iframe>
        </div>
      ) : null}
      <p>LL Documents</p>
      <ul>
        <li>Will need status for LL required docs similar to user dash</li>
        <li>Need a fillable W9 - at launch</li>
        <li>
          Need a fillable PAF - this will require input from LL and Tenant and
          needs new info (amounts owed and requests by month)
        </li>
        <li>Additional Docs needed? Upload only vs. PD</li>
        <li>
          Refactor doc state managment?? - will need to plan to see if it's
          worth the time at this stage
        </li>
      </ul>
    </div>
  );
}
