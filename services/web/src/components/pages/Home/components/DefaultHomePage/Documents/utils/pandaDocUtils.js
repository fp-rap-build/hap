import { axiosForPanda } from '../../../../../../../api/axiosForPanda';

const pandaUtils = {
  //API calls to PD public api
  fetchTemplateId: async templateName => {
    try {
      const templateId = await axiosForPanda()
        .get('/templates', {
          params: { q: templateName },
        })
        .then(res => res.data);

      return templateId.results[0].id;
      // setState({ ...state, templateId: templateId.results[0].id });
    } catch (error) {
      alert('Error fetching template Id');
      console.log(error);
    }
  },
  //Takes built out document info
  createDocument: async documentInfo => {
    try {
      const document = await axiosForPanda().post('/documents', documentInfo);
      // setState({ ...state, document: document });
      return document;
    } catch (error) {
      alert('Error creating document');
      console.log(error);
    }
  },

  sendDocument: async documentId => {
    try {
      await axiosForPanda().post(`/documents/${documentId}/send`, {
        //test to see if message and subject are required when silent sent to true
        message: 'Hello! This document was sent from the PandaDoc API.',
        subject: 'Please check this test API document from PandaDoc',
        //No need to send email w/ embeded doc
        silent: true,
      });
    } catch (error) {
      alert('Error sending document');
      console.log(error);
    }
  },

  createDocumentLink: async (documentId, recipientEmail) => {
    try {
      const sessionId = await axiosForPanda()
        .post(`documents/${documentId}/session`, {
          recipient: recipientEmail,
          lifetime: 9000,
        })
        .then(res => res.data);

      return sessionId.id;
    } catch (error) {
      alert('Error creating document link');
      console.log(error);
    }
  },
};

export default pandaUtils;
