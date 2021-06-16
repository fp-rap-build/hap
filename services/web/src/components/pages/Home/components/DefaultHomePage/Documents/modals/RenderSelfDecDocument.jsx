import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import pandaUtils from '../utils/pandaDocUtils';

import LoadingComponent from '../../../../../../common/LoadingComponent';

const templateId = process.env.REACT_APP_SELF_DEC_TEMPLATE_ID;

//Document schmea details can be found in pandaDocs API - create document from template
//fields tied to FIELD ID in template
const DOCUMENT_SCHEMA = {
  name: '',
  template_uuid: templateId,
  recipients: [
    {
      email: '',
      first_name: '',
      last_name: '',
      role: 'Applicant',
    },
  ],
  fields: {
    income_checkbox: {
      value: false,
    },
    housing_status_checkbox: {
      value: false,
    },
    financial_hardship_checkbox: {
      value: false,
    },
    rental_proof_checkbox: {
      value: false,
    },
    name: {
      value: '',
    },
    date: {
      value: '',
    },
    income_text: {
      value: '',
    },
    housing_status_text: {
      value: '',
    },
    financial_hardship_text: {
      value: '',
    },
    rental_proof_text: {
      value: '',
    },
  },
};

const RenderSelfDecDocument = ({ selectedCategory, userText }) => {
  const currentUser = useSelector(state => state.user.currentUser);

  const [linkId, setLinkId] = useState('');

  //Build payload to build document from pandaDoc template
  const updateDocPayload = () => {
    DOCUMENT_SCHEMA.name = `${currentUser.lastName}_${selectedCategory}_self_declaration`;
    DOCUMENT_SCHEMA.recipients[0].email = currentUser.email;
    DOCUMENT_SCHEMA.recipients[0].first_name = currentUser.firstName;
    DOCUMENT_SCHEMA.recipients[0].last_name = currentUser.lastName;

    switch (selectedCategory) {
      case 'income':
        DOCUMENT_SCHEMA.fields.income_checkbox = true;
        DOCUMENT_SCHEMA.fields.income_text = userText;
        break;
      case 'residency':
        DOCUMENT_SCHEMA.fields.rental_proof_checkbox = true;
        DOCUMENT_SCHEMA.fields.rental_proof_text = userText;
        break;
      case 'housingInstability':
        DOCUMENT_SCHEMA.fields.housing_status_checkbox = true;
        DOCUMENT_SCHEMA.fields.housing_status_text = userText;
        break;
      case 'covid':
        DOCUMENT_SCHEMA.fields.financial_hardship_checkbox = true;
        DOCUMENT_SCHEMA.fields.financial_hardship_text = userText;
        break;
      default:
        console.log('Invalid category');
    }

    console.log(DOCUMENT_SCHEMA);
  };

  const createDocument = async () => {
    try {
      //create a draft document
      const document = await pandaUtils.createDocument(DOCUMENT_SCHEMA);
      //ISSUE - Document is still in uploaded status - has not been moved to draft
      //Cannot send doc until it is a draft - look for a work around
      //We could also look for the document - if it's status isn't good, call it back again
      //set document to sent - aka ready to be edited
      await pandaUtils.sendDocument(document.id);
      //create document link - may run into issue if document status hasn't been updated yet
      const docLinkId = await pandaUtils.createDocumentLink(
        document.id,
        currentUser.email
      );
      setLinkId(docLinkId.id);
    } catch (error) {
      alert('Error creating document');
      console.log(error);
    }
  };

  useEffect(() => {
    updateDocPayload();
    createDocument();
    //eslint-disable-next-line
  }, []);

  const docUrl = linkId => {
    return `https://app.pandadoc.com/s/${linkId}`;
  };

  return (
    <div>
      {linkId ? (
        <div className="documentContainer">
          <iframe
            title="Self Dec Embed"
            src={docUrl(linkId)}
            style={{ height: '70vh', width: '50vw' }}
          ></iframe>
        </div>
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
};

export default RenderSelfDecDocument;
