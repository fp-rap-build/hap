const templateId = process.env.REACT_APP_SELF_DEC_TEMPLATE_ID;

const SELF_DEC_SCHEMA = {
  name: '',
  template_uuid: templateId,
  //folder id's found on panda doc portal under documents
  folder_uuid: 'iSx4By5SBUBTdyRjXTC4ZK',
  recipients: [
    {
      email: '',
      first_name: '',
      last_name: '',
      role: 'Applicant',
    },
  ],
  fields: {
    name: {
      value: '',
    },
    date: {
      value: '',
    },
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

export default SELF_DEC_SCHEMA;
