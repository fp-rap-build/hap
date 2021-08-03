import { useState } from 'react';

import { axiosWithAuth } from '../../../../api/axiosWithAuth';

import { processLLDoc } from '../../../../utils/pandaDocUtils';

import styles from '../../../../styles/pages/landlord.module.css';

import { Button, Card, Typography, Tag, Modal, Spin } from 'antd';
const { Text, Title } = Typography;

const w9TemplateId = process.env.REACT_APP_W9_TEMPLATE_ID;
const pafTemplateId = process.env.REACT_APP_PAF_TEMPLATE_ID;

export default function Documents({ request, currentUser }) {
  //Document info populated with resonse from panda docs after creating a document
  const [documentInfo, setDocumentInfo] = useState({
    sessionId: null,
    docId: null,
    docName: null,
  });
  //manages spin component vs. document viewport
  const [loadingDoc, setLoadingDoc] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  // ----------- Organize / Build info for documents ----------------
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

  //--------------- HELPERS -----------------

  const createPandaDoc = async docPayload => {
    setLoadingDoc(true);
    try {
      const res = await processLLDoc(docPayload);
      setDocumentInfo(res);
    } catch (error) {
      console.log(error);
      alert('Error creating document');
    } finally {
      setLoadingDoc(false);
    }
  };

  const postDocumentToDB = async () => {
    const document = {
      requestId: request.id,
      name: documentInfo.docName,
      type: 'application/pdf',
      location: process.env.REACT_APP_PLACEHOLDER_LOCATION,
      key: process.env.REACT_APP_PLACEHOLDER_KEY,
      category: selectedCategory,
      status: 'received',
      pandaId: documentInfo.docId,
    };

    try {
      await axiosWithAuth()
        .post('/documents', document)
        .then(res => res.data);
    } catch (error) {
      alert('Error saving document');
    }
  };

  const handleModalClose = () => {
    postDocumentToDB();
    setDocumentInfo({ sessionId: null, docId: null, docName: null });
    setSelectedCategory('');
  };

  const modalProps = {
    loadingDoc,
    documentInfo,
    handleModalClose,
    selectedCategory,
  };

  return (
    <div>
      <div className={styles.docCardContainer}>
        <W9DocumentCard
          createPandaDoc={createPandaDoc}
          w9DocumentPayload={w9DocumentPayload}
          setSelectedCategory={setSelectedCategory}
        />
        <PAFDocumentCard
          createPandaDoc={createPandaDoc}
          pafDocumentPayload={pafDocumentPayload}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <DocumentModal {...modalProps} />
    </div>
  );
}

const W9DocumentCard = ({
  createPandaDoc,
  w9DocumentPayload,
  setSelectedCategory,
}) => {
  const handleClick = () => {
    createPandaDoc(w9DocumentPayload);
    setSelectedCategory('rpaf');
  };

  return (
    <Card
      className={styles.documentCard}
      title={
        <Button
          type="link"
          onClick={handleClick}
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
  );
};

const PAFDocumentCard = ({
  createPandaDoc,
  pafDocumentPayload,
  setSelectedCategory,
}) => {
  const handleClick = () => {
    createPandaDoc(pafDocumentPayload);
    setSelectedCategory('rpaf');
  };

  return (
    <Card
      className={styles.documentCard}
      title={
        <Button
          type="link"
          onClick={handleClick}
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
        Rent Payment Agreement Form Version 2. Once complete we will contact the
        tenant to determine elgibility. Submitting this form does not guarantee
        payment.
      </Text>
    </Card>
  );
};

const DocumentModal = ({
  loadingDoc,
  documentInfo,
  selectedCategory,
  handleModalClose,
}) => {
  return (
    <>
      <Modal
        maskClosable={false}
        footer={null}
        visible={selectedCategory}
        bodyStyle={{ height: '80vh' }}
        width={'80vw'}
        onCancel={handleModalClose}
      >
        {loadingDoc ? (
          <div className={styles.spinContainer}>
            <Spin tip="Creating your document..." size="large" />
          </div>
        ) : (
          <div className="documentContainer">
            <iframe
              title="Self Dec Embed"
              src={`https://app.pandadoc.com/s/${documentInfo.sessionId}`}
              style={{ height: '70vh', width: '75vw' }}
            ></iframe>
          </div>
        )}
      </Modal>
    </>
  );
};

//Notes:
// Doc Categories landlordW9 & rpaf
