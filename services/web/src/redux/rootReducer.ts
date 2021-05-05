import { combineReducers } from 'redux';
import globalReducer from './global/globalReducer';
import userReducer from './users/userReducer';
import notificationReducer from './notifications/notificationReducer';

export default combineReducers({
  global: globalReducer,
  user: userReducer,
  notifications: notificationReducer,
});
