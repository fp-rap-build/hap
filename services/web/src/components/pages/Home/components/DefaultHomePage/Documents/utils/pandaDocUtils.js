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

const wait = async s => {
  return new Promise(resolve => {
    setTimeout(resolve, s * 1000);
  });
};

const sendDocument = async documentId => {
  try {
    //Need to wait 5s for pandaDoc to process the doc before sending
    await wait(5);
    await axiosForPanda().post(`/documents/${documentId}/send`, {
      message: 'Hello! This document was sent from the PandaDoc API.',
      subject: 'Please check this test API document from PandaDoc',
      //Set silent to true, we do not need to send an email b/c we are embedding the doc for immediate signature
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

const updateSelfDecPayload = (
  currentUser,
  userText,
  selectedCategory,
  DOCUMENT_SCHEMA
) => {
  const resSchema = Object.assign({}, DOCUMENT_SCHEMA);

  resSchema.name = `${currentUser.lastName}_${selectedCategory}_self_declaration`;
  resSchema.recipients[0].email = currentUser.email;
  resSchema.recipients[0].first_name = currentUser.firstName;
  resSchema.recipients[0].last_name = currentUser.lastName;

  resSchema.fields.name.value = `${currentUser.firstName} ${currentUser.lastName}`;

  switch (selectedCategory) {
    case 'income':
      resSchema.fields.income_checkbox.value = true;
      resSchema.fields.income_text.value = userText;
      break;
    case 'residency':
      resSchema.fields.rental_proof_checkbox.value = true;
      resSchema.fields.rental_proof_text.value = userText;
      break;
    case 'housingInstability':
      resSchema.fields.housing_status_checkbox.value = true;
      resSchema.fields.housing_status_text.value = userText;
      break;
    case 'covid':
      resSchema.fields.financial_hardship_checkbox.value = true;
      resSchema.fields.financial_hardship_text.value = userText;
      break;
    default:
      console.log('Error creating document - Invalid category');
  }

  return resSchema;
};

//RETURNS SESSION ID FOR EMBED LINK
const processDocument = async (
  currentUser,
  userText,
  selectedCategory,
  DOCUMENT_SCHEMA
) => {
  const docPayload = updateSelfDecPayload(
    currentUser,
    userText,
    selectedCategory,
    DOCUMENT_SCHEMA
  );

  try {
    //create a draft document
    const document = await createDocument(docPayload);
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
