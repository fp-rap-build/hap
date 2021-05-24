const INITIAL_STATE = {
  request: {},
  address: {},
};

const requestReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_REQUEST':
      return { ...state, request: action.payload };
    case 'SET_ADDRESS':
      return { ...state, address: action.payload };
    default:
      return state;
  }
};

export default requestReducer;
