import { axiosForPanda } from '../../../../../../../api/axiosForPanda';

import { useState } from 'react';

const fetchTemplateId = async templateName => {
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
};
//Takes built out document info
const createDocument = async documentInfo => {
  try {
    const document = await axiosForPanda()
      .post('/documents', documentInfo)
      .then(res => res.data);
    // setState({ ...state, document: document });
    return document;
  } catch (error) {
    alert('Error creating document');
    console.log(error);
  }
};

const wait = async ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

const sendDocument = async documentId => {
  try {
    //Wait 1s for pandaDoc to process teh doc before sending
    await wait(5000);
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
};

const createDocumentLink = async (documentId, recipientEmail) => {
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
};

const updateDocPayload = (currentUser, selectedCategory, DOCUMENT_SCHEMA) => {
  //Refactor to be return new obj
  DOCUMENT_SCHEMA.name = `${currentUser.lastName}_${selectedCategory}_self_declaration`;
  DOCUMENT_SCHEMA.recipients[0].email = currentUser.email;
  DOCUMENT_SCHEMA.recipients[0].first_name = currentUser.firstName;
  DOCUMENT_SCHEMA.recipients[0].last_name = currentUser.lastName;

  switch (selectedCategory) {
    case 'income':
      DOCUMENT_SCHEMA.fields.income_checkbox.value = true;
      // DOCUMENT_SCHEMA.fields.income_text.value = userText;
      break;
    case 'residency':
      DOCUMENT_SCHEMA.fields.rental_proof_checkbox.value = true;
      // DOCUMENT_SCHEMA.fields.rental_proof_text.value = userText;
      break;
    case 'housingInstability':
      DOCUMENT_SCHEMA.fields.housing_status_checkbox.value = true;
      // DOCUMENT_SCHEMA.fields.housing_status_text.value = userText;
      break;
    case 'covid':
      DOCUMENT_SCHEMA.fields.financial_hardship_checkbox.value = true;
      // DOCUMENT_SCHEMA.fields.financial_hardship_text.value = userText;
      break;
    default:
      console.log('Invalid category');
  }
};

//RETURNS SESSION ID FOR EMBED LINK
const processDocument = async (
  currentUser,
  selectedCategory,
  DOCUMENT_SCHEMA
) => {
  updateDocPayload(currentUser, selectedCategory, DOCUMENT_SCHEMA);

  try {
    //create a draft document
    const document = await createDocument(DOCUMENT_SCHEMA);
    //ISSUE - Document is still in uploaded status - has not been moved to draft
    //Cannot send doc until it is a draft - look for a work around
    //We could also look for the document - if it's status isn't good, call it back again
    //set document to sent - aka ready to be edited
    await sendDocument(document.id);
    //create document link - may run into issue if document status hasn't been updated yet

    const docLinkId = await createDocumentLink(document.id, currentUser.email);

    return docLinkId;
  } catch (error) {
    console.log(error);
  }
};

export { processDocument };
