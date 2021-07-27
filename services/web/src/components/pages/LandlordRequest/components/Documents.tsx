import { useState } from 'react';

import { processW9 } from '../../../../utils/pandaDocUtils';

import { Button } from 'antd';

const templateId = process.env.REACT_APP_W9_TEMPLATE_ID;

export default function Documents({ request, currentUser }) {
  const [documentURL, setDocumentURL] = useState('');

  const today = new Date();
  const date =
    today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear();

  const address = request.landlordAddress2
    ? `${request.landlordAddress}, ${request.landlordAddress2}`
    : request.landlordAddress;

  const w9DocumentPayload = {
    name: `${currentUser.lastName}_W9`,
    template_uuid: templateId,
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
        value: address,
      },
      cityStateZip: {
        value: `${request.landlordCity} ${request.landlordState}, ${request.landlordZip}`,
      },
    },
  };

  const createPandaW9 = async docPayload => {
    try {
      const res = await processW9(docPayload);
      setDocumentURL(`https://app.pandadoc.com/s/${res.sessionId}`);
    } catch (error) {
      console.log(error);
      console.log(error);
    }
  };

  return (
    <div>
      <Button onClick={() => createPandaW9(w9DocumentPayload)}>
        Create W9
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
