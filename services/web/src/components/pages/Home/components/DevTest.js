import { useEffect, useState } from 'react';

import { axiosForPanda } from '../../../../api/axiosForPanda';

import { Button, Input } from 'antd';

const DevTest = () => {
  const [state, setState] = useState({
    templateId: 'K34yjNcgomWu9ANtTevtWo',
    document: {},
    //Placeholder so we don't keep blasting the API creating  the same doc
    createdDocumentId: 'aXiXyf3oz2SiFLVHTfHQJV',
    sessionId: 'YxUqMx9uiEaYiPDoWRAgsF',
  });

  const documentInfo = {
    name: 'Self_Dec Test From Modal',
    template_uuid: state.templateId,
    recipients: [
      {
        email: 'joseph.lasata@gmail.com',
        first_name: 'Joseph',
        last_name: 'Lasata',
        role: 'Applicant',
      },
    ],
    fields: {
      income_checkbox: {
        value: true,
      },
      name: {
        value: 'Joe Test',
      },
      date: {
        value: '2020-06-13T04:04:00.000Z',
      },
      income_text: {
        value:
          'Test text for document creation via API. Test text for document creation via API. Test text for document creation via API. Test text for document creation via API. Test text for document creation via API. ',
      },
    },
  };

  const fetchTemplateId = async () => {
    try {
      const templateId = await axiosForPanda()
        .get('/templates', {
          params: { q: 'self_declaration' },
        })
        .then(res => res.data);

      setState({ ...state, templateId: templateId.results[0].id });
    } catch (error) {
      alert('Error fetching template Id');
      console.log(error);
    }
  };

  const createDocument = async () => {
    try {
      const document = await axiosForPanda().post('/documents', documentInfo);
      setState({ ...state, document: document });
    } catch (error) {
      alert('Error creating document');
      console.log(error);
    }
  };

  //need to move document from draft status to sent
  const sendDocument = async () => {
    try {
      await axiosForPanda().post(`/documents/${state.createdDocumentId}/send`, {
        message: 'Hello! This document was sent from the PandaDoc API.',
        subject: 'Please check this test API document from PandaDoc',
        silent: true,
      });
    } catch (error) {
      alert('Error sending document');
      console.log(error);
    }
  };

  const createDocumentLink = async () => {
    try {
      const sessionId = await axiosForPanda()
        .post(`documents/${state.createdDocumentId}/session`, {
          recipient: 'joseph.lasata@gmail.com',
          lifetime: 9000,
        })
        .then(res => res.data);

      console.log(sessionId);
    } catch (error) {
      alert('Error creating document link');
      console.log(error);
    }
  };

  //New Document ID = aXiXyf3oz2SiFLVHTfHQJV

  let docLink = `https://app.pandadoc.com/s/${state.sessionId}`;

  return (
    <div>
      <Button onClick={fetchTemplateId}>Fetch Template Id</Button>
      <Button onClick={createDocument}>Create Document</Button>
      <Button onClick={sendDocument}>Send Document</Button>
      <Button onClick={createDocumentLink}>Create Session Id</Button>
      <iframe
        title="Self Dec Embed"
        src={docLink}
        style={{ height: '70vh', width: '60vw' }}
      ></iframe>
    </div>
  );
};

export default DevTest;
