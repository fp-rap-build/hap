import { AcUnitOutlined } from '@material-ui/icons';
import { setCurrentUser } from './userActions';

const INITIAL_STATE = {
  isLoggedIn: false,
  currentUser: {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    requests: [],
    subscriptions: [],
  },
  errorMessage: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload, isLoggedIn: true };
    case 'SET_USER_NAME_INFO':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
        },
      };
    case 'ADD_SUBSCRIPTION':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          subscriptions: [...state.currentUser.subscriptions, action.payload],
        },
      };
    case 'DELETE_SUBSCRIPTION':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          subscriptions: state.currentUser.subscriptions.filter(sub => {
            if (sub.id !== action.payload) return sub;
          }),
        },
      };
    case 'SET_ERROR_MESSAGE':
      return { ...state, errorMessage: action.payload };
    case 'LOG_OUT':
      return { ...state, isLoggedIn: false, currentUser: {} };
    default:
      return state;
  }
};

export default userReducer;
