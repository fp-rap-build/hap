const INITIAL_STATE = {
  isLoggedIn: false,
  currentUser: {
    firstName: '',
    lastName: '',
    email: '',
    requests: [],
  },
  errorMessage: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload, isLoggedIn: true };
    case 'SET_ERROR_MESSAGE':
      return { ...state, errorMessage: action.payload };
    case 'LOG_OUT':
      return { ...state, isLoggedIn: false, currentUser: {} };
    default:
      return state;
  }
};

export default userReducer;
