const INITIAL_STATE = {
  notifications: [],
};

const notificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATIONS':
      return { ...state, notifcations: action.payload };
    default:
      return state;
  }
};

export default notificationReducer;
