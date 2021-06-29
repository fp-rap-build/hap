import { combineReducers } from 'redux';
import globalReducer from './global/globalReducer';
import userReducer from './users/userReducer';
import notificationReducer from './notifications/notificationReducer';
import requestsReducer from './requests/requestReducer';

export default combineReducers({
  global: globalReducer,
  user: userReducer,
  notifications: notificationReducer,
  requests: requestsReducer,
});
