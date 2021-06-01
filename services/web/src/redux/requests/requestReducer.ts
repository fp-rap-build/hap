const INITIAL_STATE = {
  request: {},
  addressDetails: {},
  incomes: [],
  documents: [],
};

const requestReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_REQUEST':
      return { ...state, request: action.payload };
    case 'SET_ADDRESS':
      return { ...state, addressDetails: action.payload };
    case 'SET_INCOMES':
      return { ...state, incomes: action.payload };
    case 'SET_DOCUMENTS':
      return { ...state, documents: action.payload };
    default:
      return state;
  }
};

export default requestReducer;
