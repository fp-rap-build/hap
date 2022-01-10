import { axiosForPanda } from '../api/axiosForPanda';

//Takes built out document info
const createDocument = async documentInfo => {
  try {
    const document = await axiosForPanda()
      .post('/documents', documentInfo)
      .then(res => res.data);
    return document;
  } catch (error) {
    alert('Error creating document');
    console.log(error);
  }
};

//Wait helper to avoid issue as PD processes the document and moves it into an editable status
const wait = async s => {
  return new Promise(resolve => {
    setTimeout(resolve, s * 1000);
  });
};

const sendDocument = async documentId => {
  try {
    //Need to wait 5s (the uppper limit of their processing time) for pandaDoc to process the doc before sending
    // changing this to 3 seconds, since reports showed all requests were being completed in 2 sec or less
    await wait(3);
    await axiosForPanda().post(`/documents/${documentId}/send`, {
      message: 'Hello! This document was sent from the PandaDoc API.',
      subject: 'Please check this test API document from PandaDoc',
      //Set silent to true, we do not need to send an email b/c we are embedding the doc for immediate signature
      silent: true,
    });
  } catch (error) {
    alert('Error sending document');
    console.log(error.response);
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

  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  resSchema.fields.date.value = date;

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
    //create document link
    const sessionId = await createDocumentLink(document.id, currentUser.email);

    return {
      sessionId: sessionId,
      docId: document.id,
      docName: document.name,
    };
  } catch (error) {
    console.log(error);
  }
};

const processLLDoc = async docPayload => {
  try {
    let document = await createDocument(docPayload);

    await sendDocument(document.id);
    //create document link
    let sessionId = await createDocumentLink(
      document.id,
      docPayload.recipients[0].email
    );

    return {
      sessionId: sessionId,
      docId: document.id,
      docName: document.name,
    };
  } catch (error) {
    console.log('Error processing PD', error);
  }
};

const processUpafDoc = async (currentUser, docPayload) => {
  try {
    let document = await createDocument(docPayload);

    await sendDocument(document.id);
    //create document link
    let sessionId = await createDocumentLink(document.id, currentUser.email);

    return {
      sessionId: sessionId,
      docId: document.id,
      docName: document.name,
    };
  } catch (error) {
    console.log('Error processing UPAF', error);
  }
};

export { processDocument, processLLDoc, processUpafDoc };
