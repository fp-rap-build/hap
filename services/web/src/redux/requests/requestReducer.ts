const INITIAL_STATE = {
  request: {},
};

const requestReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_REQUEST':
      return { ...state, request: action.payload };
    default:
      return state;
  }
};

export default requestReducer;
