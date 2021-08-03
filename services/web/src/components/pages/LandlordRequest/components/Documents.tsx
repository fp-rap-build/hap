import { useState } from 'react';

import { processLLDoc } from '../../../../utils/pandaDocUtils';

import styles from '../../../../styles/pages/landlord.module.css';

import { Button, Card, Typography, Tag } from 'antd';
const { Text, Title } = Typography;

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
      date: {
        value: date,
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
      // RETURNS:
      // sessionId
      // docId
      // docName
      setDocumentURL(`https://app.pandadoc.com/s/${res.sessionId}`);
    } catch (error) {
      console.log(error);
      console.log(error);
    }
  };

  return (
    <div>
      {documentURL ? (
        <div className="documentContainer">
          <iframe
            title="Self Dec Embed"
            src={documentURL}
            style={{ height: '70vh', width: '75vw' }}
          ></iframe>
        </div>
      ) : null}
      <div className={styles.docCardContainer}>
        <Card
          className={styles.documentCard}
          title={
            <Button
              type="link"
              onClick={() => createPandaDoc(w9DocumentPayload)}
              style={{ fontSize: '1.25rem', fontWeight: 'bold' }}
            >
              Create a W9
            </Button>
          }
          extra={
            <div>
              <Text strong style={{ marginRight: '.5rem' }}>
                Status:
              </Text>
              <Tag color="red" className={styles.tag}>
                Missing
              </Tag>
            </div>
          }
        >
          <Text>
            We will need a valid W9 with your signature to process and send
            payments. Clink the link above to create, sign, and submit a W9!
          </Text>
        </Card>

        <Card
          className={styles.documentCard}
          title={
            <Button
              type="link"
              onClick={() => createPandaDoc(pafDocumentPayload)}
              style={{ fontSize: '1.25rem', fontWeight: 'bold' }}
            >
              Create a Payment Agreement Form
            </Button>
          }
          extra={
            <div>
              <Text strong style={{ marginRight: '.5rem' }}>
                Status:
              </Text>
              <Tag color="red" className={styles.tag}>
                Missing
              </Tag>
            </div>
          }
        >
          <Text>
            Rent Payment Agreement Form Version 2. Once complete we will contact
            the tenant to determine elgibility. Submitting this form does not
            guarantee payment.
          </Text>
        </Card>
      </div>
    </div>
  );
}
