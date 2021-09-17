import { combineReducers } from 'redux';
import globalReducer from './global/globalReducer';
import userReducer from './users/userReducer';
import notificationReducer from './notifications/notificationReducer';
import requestsReducer from './requests/requestReducer';

const appReducer = combineReducers({
  global: globalReducer,
  user: userReducer,
  notifications: notificationReducer,
  requests: requestsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
