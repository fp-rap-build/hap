import { useState } from 'react';

import { useSelector } from 'react-redux';

import { Button, Modal, Spin } from 'antd';

import { processUpafDoc } from '../../../../../../../utils/pandaDocUtils';

import styles from '../../../../../../../styles/pages/landlord.module.css';
import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

// #TODO CHANGE TO ENV VARIABLE
const upafTemplateId = '43rnQNvMj4B8bG6pGQC8P3';

export default function UpafUpload({ request, setDocuments }) {
  const currentUser = useSelector(state => state.user.currentUser);

  const today = new Date();

  const date =
    today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear();

  const upafDocumentPayload = {
    name: `${request.lastName}_UPAF`,
    template_uuid: upafTemplateId,
    folder_uuid: 'LqSWF5ynjHHbR8CiDQsqSk',
    recipients: [
      {
        email: currentUser.email,
        first_name: currentUser.firstName,
        last_name: currentUser.lastName,
        role: 'programManager',
      },
    ],
    fields: {
      householdId: {
        value: request.id,
      },
      name: {
        value: `${request.firstName} ${request.lastName}`,
      },
      cityName: {
        value: request.cityName,
      },
      zipCode: {
        value: request.zipCode,
      },
      date: {
        value: date,
      },
    },
  };

  const [documentInfo, setDocumentInfo] = useState({
    sessionId: null,
    docId: null,
    docName: null,
  });

  const [loadingDoc, setLoadingDoc] = useState(false);

  const postDocumentToDB = async () => {
    const document = {
      requestId: request.id,
      name: documentInfo.docName,
      type: 'application/pdf',
      location: process.env.REACT_APP_PLACEHOLDER_LOCATION,
      key: process.env.REACT_APP_PLACEHOLDER_KEY,
      category: 'upaf',
      status: 'received',
      pandaId: documentInfo.docId,
    };

    try {
      await axiosWithAuth()
        .post('/documents', document)
        .then(res => {
          setDocuments(prevState => [...prevState, document]);
        });
    } catch (error) {
      alert('Error saving document');
    }
  };

  const handleModalClose = () => {
    postDocumentToDB();
    setDocumentInfo({ sessionId: null, docId: null, docName: null });
  };

  const createPandaDoc = async docPayload => {
    setLoadingDoc(true);
    try {
      const res = await processUpafDoc(currentUser, docPayload);

      setDocumentInfo(res);
    } catch (error) {
      console.log(error);
      alert('Error creating document');
    } finally {
      setLoadingDoc(false);
    }
  };

  const handleClick = () => {
    createPandaDoc(upafDocumentPayload);
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p>Create</p>
        <Button onClick={handleClick} disabled={loadingDoc}>
          {loadingDoc ? 'Creating..' : 'Create Document'}
        </Button>
      </div>

      <Modal
        maskClosable={false}
        footer={null}
        visible={documentInfo.sessionId}
        bodyStyle={{ height: '85vh', paddingTop: '6%', zIndex: 1000 }}
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
              style={{ height: '77vh', width: '75vw' }}
            ></iframe>
          </div>
        )}
      </Modal>
    </div>
  );
}
