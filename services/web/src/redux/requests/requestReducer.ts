const INITIAL_STATE = {
  request: {},
  addressDetails: {},
};

const requestReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_REQUEST':
      return { ...state, request: action.payload };
    case 'SET_ADDRESS':
      return { ...state, addressDetails: action.payload };
    default:
      return state;
  }
};

export default requestReducer;
