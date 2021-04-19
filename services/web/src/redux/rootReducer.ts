import { combineReducers } from 'redux';
import globalReducer from './global/globalReducer';
import userReducer from './users/userReducer';

export default combineReducers({
  global: globalReducer,
  user: userReducer,
});
