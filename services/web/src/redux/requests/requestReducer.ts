const INITIAL_STATE = {
  request: {},
  requests: [],
  addressDetails: {},
  incomes: [],
  documents: [],
  documentStatuses: {},
};

const requestReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_REQUEST':
      return { ...state, request: action.payload };
    case 'SET_REQUESTS':
      return { ...state, requests: action.payload };
    case 'SET_ADDRESS':
      return { ...state, addressDetails: action.payload };
    case 'SET_INCOMES':
      return { ...state, incomes: action.payload };
    case 'SET_DOCUMENTS':
      return { ...state, documents: action.payload };
    case 'SET_DOCUMENT_STATUSES':
      return { ...state, documentStatuses: action.payload };
    default:
      return state;
  }
};

export default requestReducer;
