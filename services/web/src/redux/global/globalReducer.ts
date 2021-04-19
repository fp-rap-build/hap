const INITIAL_STATE = {
  isLoading: false,
  errorMessage: '',
};

const globalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR_MESSAGE':
      return { ...state, errorMessage: action.payload };
    case 'CLEAR_ERROR_MESSAGE':
      return { ...state, errorMessage: '' };
    default:
      return state;
  }
};

export default globalReducer;
